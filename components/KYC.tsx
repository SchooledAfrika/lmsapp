"use client";
import { useState } from "react";
import DocumentUpload from "./ui/teacher-dashboard/finances/kyc/DocumentUpload";
import TakePicture from "./ui/teacher-dashboard/finances/kyc/TakePicture";

const KYC: React.FC = () => {
  const [showDocumentInfo, setShowDocumentInfo] = useState(true);

  const handleShowDocumentInfo = () => {
    setShowDocumentInfo(false);
  };

  return (
    <div>
      {showDocumentInfo ? (
        <DocumentUpload OnclickDocumentInfo={handleShowDocumentInfo} />
      ) : (
        <TakePicture />
      )}
    </div>
  );
};

export default KYC;
