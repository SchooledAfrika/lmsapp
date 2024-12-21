import { useState } from "react";

export const useImageSizeChecker = () => {
  // function for getting width and height of an image
  const getWidthAndHeight = (file: File) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const reader = new FileReader();
      const img = new window.Image();

      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        } else {
          reject("Something went wrong while reading the file.");
        }
      };

      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        resolve(dimensions); // Return dimensions via promise
      };

      img.onerror = () => reject("Failed to load image.");
      reader.readAsDataURL(file);
    });
  };

  //   function to get the size of a file in MB format
  const getFileSize = (itemFile: File) => {
    const sizeInMb: number = itemFile.size / (1024 * 1024);
    return sizeInMb;
  };

  return {
    getWidthAndHeight,
    getFileSize,
  };
};
