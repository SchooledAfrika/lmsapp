// this is a react hook function that handles everything about uploading things to cloudinary

export const useCloudinary = () => {
  const imageUpload = async (image: Blob): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "school_afrika_images");
    try {
      const result = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloudinaryName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseBody = await result.json();
      const imgUrl = responseBody.secure_url;
      return imgUrl;
      //    here we send a put request to update the users profile photo only
    } catch (error) {
      console.log(error);
    }
  };
  return { imageUpload };
};
