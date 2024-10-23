// the function to handle the copy logics
import { useState } from "react";

export const useCopy = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const copyText = (text: string) => {
    setCopied(true);
    window.navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return {
    copied,
    copyText,
  };
};
