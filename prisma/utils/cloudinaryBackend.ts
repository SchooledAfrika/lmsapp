import cloudinary from "cloudinary";
import { v4 as uuid } from "uuid";
import { promisify } from "util";
import path from "path";
import fs from "fs";

export type CloudinaryItypes = "image" | "video" | "raw" | "auto" | undefined;

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const { CLOUDINARY_KEY, CLOUDINARY_SECRET, NEXT_PUBLIC_cloudinaryName } =
  process.env;
cloudinary.v2.config({
  cloud_name: NEXT_PUBLIC_cloudinaryName,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

// run cloudinary server side upload
export const cloudinaryUpload = async (
  data: Blob,
  itemType: CloudinaryItypes
): Promise<string> => {
  const tempFilePath = path.join(
    process.cwd(),
    `${uuid()}.${data.type.split("/")[1]}`
  );
  try {
    // Write Blob data to a temporary file
    const buffer = Buffer.from(await data.arrayBuffer());
    await writeFile(tempFilePath, new Uint8Array(buffer));
    const result = await cloudinary.v2.uploader.upload(tempFilePath, {
      resource_type: itemType,
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong uploading to cloudinary");
  } finally {
    await unlink(tempFilePath);
  }
};
