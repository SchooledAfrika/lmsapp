// here, we will be able to use the code we get from the frontend
// and get access token and refresh token we need
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { getQuery } from "@/prisma/utils/utils";
import axios from "axios";
import qs from "query-string";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";
// ZOOM_OAUTH_URL
export async function GET(req: Request) {
  const {
    ZOOM_OAUTH_URL,
    NEXT_PUBLIC_ZOOM_REDIRECT_URL,
    NEXT_PUBLIC_ZOOM_CLIENT_ID,
    ZOOM_USER_SECRET,
  } = process.env;
  // getting the zoom code from query parameter code
  const code = getQuery(req.url, "code");
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  //   first, lets check if the user has connected to our application before
  //   return an error messages once the user is connected before
  // to prevent it triggering the create functionality in the database
  const checkOutConnections = await prisma.meetingInfo.findFirst({
    where: {
      teacherId: userId,
    },
  });
  if (checkOutConnections) {
    return new Response(
      JSON.stringify({ message: "you are already connected to zoom before" }),
      { status: 404 }
    );
  }
  try {
    const zoomAuthRequest = await axios.post(
      ZOOM_OAUTH_URL!,
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: NEXT_PUBLIC_ZOOM_REDIRECT_URL,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${NEXT_PUBLIC_ZOOM_CLIENT_ID!}:${ZOOM_USER_SECRET!}`
          ).toString("base64")}`,
        },
      }
    );
    // below are the gotten access and refresh tokens from zoom,
    // then we will create the meetingInfo of the user immediately now
    const { access_token, refresh_token } = await zoomAuthRequest.data;
    // making sure we getting the id of the current user, so we can use it
    // while creating a meeting for classes or one on one
    const response = await fetch("https://api.zoom.us/v2/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const result = await response.json();
    await prisma.meetingInfo.create({
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        teacherId: userId,
        zoomId: result.id,
      },
    });
    return new Response(JSON.stringify({ message: "successfully created" }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}

// here, we will make a post request to create a zoom meeting,
// this link generated can be for both classes, one on one sections and special requests
export async function POST(req: Request) {
  const { type, id } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  console.log(id);
  // check for authentication
  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  // we will proceed fetching the zoom detail of the user first
  // if it does not exist, lets throw an error message back to the frontend
  const userZoomDetails = await prisma.meetingInfo.findFirst({
    where: {
      teacherId: userId,
    },
  });
  if (!userZoomDetails) {
    return new Response(
      JSON.stringify({ message: "user has not zoom details" }),
      { status: 404 }
    );
  }
  try {
    // making use of condition to check if the teacher is creating link for class
    // or if is creating links for one on one section or special requests
    if (type === "class") {
      // creating the meeting link first
      const createdMeetings = await fetch(
        `${process.env.ZOOM_API_BASE_URL}${userZoomDetails.zoomId}/meetings`,
        {
          method: "POST",
          body: JSON.stringify({
            duration: 120,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userZoomDetails.accessToken}`,
          },
        }
      );
      const result = await createdMeetings.json();
      // start_url join_url
      await prisma.classLink.upsert({
        where: { classesId: id },
        update: {
          startUrl: result.start_url,
          joinUrl: result.join_url,
          updatedAt: new Date(),
        },
        create: {
          startUrl: result.start_url,
          joinUrl: result.join_url,
          classesId: id,
        },
      });
    }
    return new Response(JSON.stringify({ message: "sent successfully" }), {
      status: 200,
    });
    // here we first get the meeting link from zoom
  } catch (error) {
    return serverError();
  }
}
