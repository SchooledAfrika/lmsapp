import React, { useState } from "react";
import BookSessionByParents from "./BookSessionByParents";
import BookSessionByStudent from "./BookSessionByStudent";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const BookSession: React.FC<{
  sessionId: string;
  tutorName: string;
  tutorImg: string;
  tutorLang: string[];
}> = ({ sessionId, tutorImg, tutorLang, tutorName }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { data, status } = useSession();
  const router = useRouter();
  //   function to return error message if the user is not logged in or not student or parents
  const handleShow = () => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    if (data?.user.role === "Student") {
      return setShowDialog(true);
    }
    if (data?.user.role === "Parents") {
      return setShowDialog(true);
    }
    return toast.error("only students and parents can book a session");
  };
  return (
    <div className=" max-ss:w-full">
      <div
        onClick={handleShow}
        className=" max-ss:w-full text-white w-full  bg-green-700 rounded-md px-4 py-4 sm:py-4 text-[14px] flex items-center justify-center cursor-pointer"
      >
        <p>Book Session</p>
      </div>
      {data?.user.role === "Student" && showDialog && (
        <BookSessionByStudent
          sessionId={sessionId}
          tutorImg={tutorImg}
          tutorLang={tutorLang}
          tutorName={tutorName}
          setShowDialog={setShowDialog}
        />
      )}
      {data?.user.role === "Parents" && showDialog && (
        <BookSessionByParents
          sessionId={sessionId}
          tutorImg={tutorImg}
          tutorLang={tutorLang}
          tutorName={tutorName}
          setShowDialog={setShowDialog}
        />
      )}
    </div>
  );
};

export default BookSession;
