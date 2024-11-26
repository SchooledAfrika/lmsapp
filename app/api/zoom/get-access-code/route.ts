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
    console.log(access_token);
    const response = await fetch("https://api.zoom.us/v2/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response);
    // await prisma.meetingInfo.create({
    //   data: {
    //     accessToken: access_token,
    //     refreshToken: refresh_token,
    //     teacherId: userId,
    //   },
    // });
    // return a successful message here
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
  try {
    // here we first get the meeting link from zoom
  } catch (error) {
    return serverError();
  }
}
