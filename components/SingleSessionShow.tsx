"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import {
  SingleRowNoArray,
  SingleRowWithArray,
} from "./ui/admin-dashboard/sessions/SingleSessionAdmin";
import { useConversion } from "@/data-access/conversion";
import { useQuery, useQueries, useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Noitem } from "./ApplicantsTable";
import { SingleClassSkeleton } from "./SingleClassroom";
import AddTest from "./ui/teacher-dashboard/AddTest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddResource from "./ui/teacher-dashboard/AddResource";
import Link from "next/link";
import { AddMettingModel } from "./ui/student-dashboard/sessions/OneOnOneSession";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IMeetingLink {
  link: string;
}

interface RemoveExamProps {
  examId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}


// interface for the session
interface ISingleSession {
  id: string;
  subject: string[];
  grade: string;
  sectionType: string;
  classStart: string;
  specialNeed: string[];
  learningGoal: string;
  learningDays: string[];
  hoursperday: number;
  duration: string;
  startTime: string;
  resources: string[];
  amt: number;
  createdAt: string;
  updatedAt: string;
  sectionOwner: {
    teacher: {
      name: string;
      details: string;
      email: string;
      profilePhoto: string;
      phoneNo: string;
    };
  };
  student: {
    name: string;
    email: string;
    profilePhoto: string;
    phoneNo: string | null;
    details: string;
  };
  StudentExam: [];
  SingleMeeting: IMeetingLink;
}

// the top left session
export const TopLeftSession: React.FC<{
  dp: string;
  name: string;
  grade: string;
  contact: string;
  isTeacher: boolean;
  teacherDesc: string;
  link: IMeetingLink;
}> = ({ dp, name, grade, contact, isTeacher, teacherDesc, link }) => {
  console.log(link);
  const { id } = useParams();
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div className=" flex flex-col gap-3">
      <div className=" px-4 py-3 rounded-md bg-white flex gap-4">
        <Image
          src={dp}
          alt="dp"
          width={200}
          height={200}
          priority
          className=" w-[100px] aspect-square rounded-md"
        />
        <div className=" flex flex-col gap-2">
          <p className=" text-black font-semibold text-[12px]">{name}</p>
          <p className="  text-slate-700 font-semibold text-[12px] ">{grade}</p>
          <div className=" w-fit px-4 py-2 bg-green-800 text-[12px] text-white rounded-md flex items-center gap-2  ">
            <FaPhoneAlt />
            <p>{contact}</p>
          </div>
        </div>
      </div>
      {!isTeacher && (
        <div className=" w-full flex flex-col gap-2 bg-white rounded-md px-4 py-3">
          <p className=" text-[14px] font-bold">Teachers Desc</p>
          <p className=" text-[12px]">{teacherDesc}</p>
        </div>
      )}
      {isTeacher && link && (
        <div>
          <button
            onClick={() => setShowmodel(true)}
            className=" w-fit px-2 py-2 border border-green-900 text-[10px] rounded-md hover:bg-green-700 hover:text-white transition-all ease-in-out duration-700"
          >
            Edit class Link
          </button>
          <AddMettingModel
            sessionId={id as string}
            showModel={showModel}
            setShowmodel={setShowmodel}
            specialRequest={false}
            isCreate={false}
          />
        </div>
      )}
    </div>
  );
};
// the top middle session
export const TopMiddleSession: React.FC<{
  hours: number;
  duration: string;
  amt: number;
  starts: string;
  mergedday: string;
  grade: string;
  type: string;
}> = ({ hours, duration, amt, starts, mergedday, grade, type }) => {
  const { handleDate } = useConversion();
  return (
    <div className=" h-fit bg-white px-4 py-2 rounded-md flex flex-col gap-3">
      <div className=" w-full flex items-center justify-center">
        <div className=" w-fit px-3 py-1 rounded-md bg-green-800 text-white text-[12px] font-bold">
          <p>{type}</p>
        </div>
      </div>
      <div className=" flex flex-col gap-1">
        <SingleRowNoArray name="hours/day" value={hours + "hrs"} />
        <SingleRowNoArray name="Grade" value={grade} />
        <SingleRowNoArray name="Duration" value={duration} />
        <SingleRowNoArray name="AMT" value={"$" + amt} />
        <SingleRowNoArray name="Starts" value={handleDate(starts)} />
        <SingleRowNoArray name="Merged day" value={handleDate(mergedday)} />
        <SingleRowNoArray name="Curriculum" value={"Nigeria"} />
      </div>
    </div>
  );
};

const SubjectsDiv: React.FC<{ subject: string }> = ({ subject }) => {
  const firstItem = subject.split(" ")[0];
  return (
    <div className=" flex items-center gap-2">
      <Image
        src={
          firstItem === "Sciences"
            ? "/physics.png"
            : `/${firstItem.toLowerCase()}.png`
        }
        alt="subject"
        width={200}
        height={200}
        className=" w-[25px] aspect-square"
      />
      <p className=" text-[14px] font-bold">{subject}</p>
    </div>
  );
};
// the top right session
export const TopRightSession: React.FC<{
  subjects: string[];
  specialNeeds: string[];
  goals: string;
  classDays: string[];
}> = ({ subjects, specialNeeds, goals, classDays }) => {
  const subjectsArray: string[] = ["English", "Physics", "Biology"];
  return (
    <div className=" rounded-md bg-white px-4 py-2 h-fit flex flex-col gap-2">
      <div className=" w-full flex items-center justify-center">
        <div className=" w-fit px-3 py-1 rounded-md bg-[tomato] text-white text-[12px] font-bold">
          <p>More Details</p>
        </div>
      </div>
      {/* subject div */}
      <div>
        <p className="  font-bold underline text-green-700">Subjects:</p>
        <div className=" flex flex-col gap-1">
          {subjects.map((item, index) => (
            <SubjectsDiv key={index} subject={item} />
          ))}
        </div>
      </div>
      {/* specialNeed div */}
      <div className=" flex flex-col gap-1 bg-green-300 px-1 overflow-x-hidden py-2 rounded-md">
        <SingleRowWithArray name="SpecialNeeds" value={specialNeeds} />
        <SingleRowNoArray name="Goals" value={goals} />
        <SingleRowWithArray name="Class-days" value={classDays} />
      </div>
    </div>
  );
};

// the top section div div
export const TopSection: React.FC<{
  infos: ISingleSession;
  isTeacher: boolean;
}> = ({ infos, isTeacher }) => {
  return (
    <div className=" grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <TopLeftSession
        dp={
          isTeacher
            ? infos.student.profilePhoto
            : infos.sectionOwner.teacher.profilePhoto
        }
        name={isTeacher ? infos.student.name : infos.sectionOwner.teacher.name}
        grade={infos.grade}
        contact={
          isTeacher
            ? infos.student.phoneNo!
            : infos.sectionOwner.teacher.phoneNo!
        }
        isTeacher={isTeacher}
        teacherDesc={infos.sectionOwner.teacher.details}
        link={infos.SingleMeeting}
      />
      <TopMiddleSession
        hours={infos.hoursperday}
        grade={infos.grade}
        duration={infos.duration}
        amt={infos.amt}
        starts={infos.startTime}
        mergedday={infos.createdAt}
        type={infos.sectionType}
      />
      <TopRightSession
        subjects={infos.subject}
        specialNeeds={infos.specialNeed}
        goals={infos.learningGoal}
        classDays={infos.learningDays}
      />
    </div>
  );
};

//The Dialog that deletes the exam
const RemoveExam: React.FC<RemoveExamProps> = ({ examId,
  setDialogOpen}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  const { mutate } = useMutation({
    mutationFn: async (examId: string) => {
      const result = await fetch(`/api/exam-for-students`, {
        method: "DELETE",
        body: JSON.stringify({
          examId: examId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["get-single-class-teacher"] });
      if (result.ok) {
        const body = await result.json();
        setLoading(false);
        setDialogOpen(false);
        return toast({
          variant: "default",
          title: "Successfully Deleted!!!",
          description: body.message,
          className: " bg-green-500 text-white",
        });
      } else {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Update error",
          description: "Error updating this teacher's status",
        });
      }
    }
      
  });
  const handleDelete = () => {
    setLoading(true);
    mutate(examId);
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p onClick={() => setDialogOpen(true)} className="inline text-[13px] cursor-pointer  font-semibold">
          <Trash2 className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
          
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Delete Exam</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image
              src="/warn.png"
              alt="warning"
              width={200}
              height={100}
              className="w-[50px]"
            />
          </div>
          <div className="grid  items-center font-header gap-4">
            <p className="font-bold text-[18px]  ">
              Are you sure you want to delete exam?
            </p>
            <p className="text-sm">
              This action can not be reversed, be sure you want to remove before
              you confirm
            </p>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            onClick={handleDelete}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Deleting Exam..." : "Delete Exam"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer/>
    </Dialog>
  );
};


const RenderedExam: React.FC<{ exam: any; setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; dialogOpen: boolean  }> = ({
  exam,
  setDialogOpen,
  dialogOpen
}) => {
  return (
    <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
      <div className=" flex-1 flex items-center text-black text-[14px] gap-1 ">
        <Image
          src={`/${exam?.subject.toLowerCase()}.png`}
          alt="subject"
          width={200}
          height={200}
          className=" w-[25px] aspect-square"
        />
        <p>{exam.subject}</p>
      </div>
      <div className=" flex-1 flex items-center">
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>{exam.title}</p>
        </div>
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>{exam.grade}</p>
        </div>
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p><RemoveExam  examId={exam.id} setDialogOpen={setDialogOpen}/></p>
        </div>
      </div>
    </div>
  );
};
const Exams: React.FC<{
  exams: any[];
  isTeacher: boolean;
  sessionId: string;
}> = ({ exams, isTeacher, sessionId }) => {
  // state to toggle exam submission for this particular session
  const [dialogueOpen, setDialogOpen] = useState<boolean>(false);
  const [removeExamDialogOpen, setRemoveExamDialogOpen] = useState<boolean>(false);
  return (
    <div className=" flex-6 bg-white px-3 py-6 flex flex-col gap-3 h-fit">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-semibold">Assessment </p>
        {isTeacher && (
          <div onClick={() => setDialogOpen(true)}>
            <AddTest
              dialogueOpen={dialogueOpen}
              setDialogOpen={setDialogOpen}
              classId={sessionId}
              isClass={false}
            />
          </div>
        )}
      </div>
      <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
        <div className=" flex-1 ">
          <p>Subject</p>
        </div>
        <div className=" flex-1 flex items-center">
          <div className=" flex-1 flex items-center justify-center">
            <p>Title</p>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <p>Grade</p>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <p>Delete</p>
          </div>
        </div>
      </div>
      {/* render all the exams below here */}
      {exams.length === 0 ? (
        <Noitem desc={`No Exams yet, ${isTeacher && "add exams"}`} />
      ) : (
        <div className=" flex flex-col gap-2">
          {exams.map((exam, index) => (
            <RenderedExam 
            key={index} 
            exam={exam} 
            setDialogOpen={setRemoveExamDialogOpen} 
            dialogOpen={removeExamDialogOpen}
             />
         ))}
          
        </div>
      )}
    </div>
  );
};

const EachResources: React.FC<{ resources: any; setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; dialogOpen: boolean  }> = ({
  resources,
  setDialogOpen,
  dialogOpen
}) => {
  return (
    <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
      <div className=" flex-1 flex items-center text-black text-[14px] gap-1 ">
        {/* <Image
          src={`/${exam?.subject.toLowerCase()}.png`}
          alt="subject"
          width={200}
          height={200}
          className=" w-[25px] aspect-square"
        />
        <p>{exam.subject}</p> */}
      </div>
      <div className=" flex-1 flex items-center">
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          {/* <p>{exam.title}</p> */}
        </div>
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          {/* <p>{exam.grade}</p> */}
        </div>
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          {/* <p><RemoveExam  examId={exam.id} setDialogOpen={setDialogOpen}/></p> */}
        </div>
      </div>
    </div>
  );
};


const Resources: React.FC<{
  resources: any[];
  isTeacher: boolean;
  sessionId: string;
}> = ({ resources, isTeacher, sessionId }) => {
  // state to toggle resource submission for this particular session
  const [dialogueOpen, setDialogOpen] = useState<boolean>(false);
  const [removeResourceDialogOpen, setRemoveResourceDialogOpen] = useState<boolean>(false);
  return (
    <div className=" flex-4  bg-white px-3 py-4">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-semibold">Resources </p>
        {isTeacher && (
          <div onClick={() => setDialogOpen(true)}>
            <AddResource
              classId={sessionId}
              setDialogOpen={setDialogOpen}
              dialogueOpen={dialogueOpen}
              isClass={false}
            />
          </div>
        )}
      </div>
      {/* for table headings */}
      <div className=" flex items-center text-[14px] font-semibold text-slate-500 ">
        <div className=" flex-8 flex items-center">
          <div className=" flex-3">
            <p>Subject</p>
          </div>
          <div className=" flex-7">
            <p>Title</p>
          </div>
        </div>
        <div className=" flex-2">
          <p>View</p>
        </div>
      </div>
      {/* render the resources below here */}
      {resources.length === 0 ? (
  <Noitem desc={`No Resources yet, ${isTeacher && "Add"}`} />
) : (
  <div className=" flex flex-col gap-2">
    {resources.map((resource, index) => (
      <EachResources
        key={index}
        resources={resource}
        setDialogOpen={setRemoveResourceDialogOpen}
        dialogOpen={removeResourceDialogOpen}
      />
    ))}
  </div>
)}
    </div>
  );
};
const DownSection: React.FC<{
  exams: any[];
  resources: string[];
  isTeacher: boolean;
  sessionId: string;
}> = ({ exams, resources, isTeacher, sessionId }) => {
  return (
    <div className=" flex mt-4 flex-col md:flex-row gap-2">
      <Exams sessionId={sessionId} isTeacher={isTeacher} exams={exams} />
      <Resources
        sessionId={sessionId}
        isTeacher={isTeacher}
        resources={resources}
      />
    </div>
  );
};





const SingleSessionShow: React.FC<{isTeacher: boolean; resources?: string[] }> = ({ isTeacher, resources = [] }) => {
  
 
  const { id } = useParams();

  
  const {data: sessionData, isLoading: sessionLoading, isError: sessionError, error: sessionErrorDetails } = useQuery<ISingleSession>({
    queryKey: ["single-section-show"],
    queryFn: async () => {
      const response = await fetch(`/api/one-on-one-section/session/${id}`);
      const result = await response.json();
      return result;
    },
  });

  //console.log(sessionData)
  // return loading while component is still loading
  if (sessionLoading) {
    return <SingleClassSkeleton />;
  }
  // return error if is error
  if (sessionError) {
    return (
      <div className=" mt-8 w-full flex items-center justify-center">
        <p>{sessionErrorDetails.message}</p>
      </div>
    );
  }

  
  /// Always ensure `validResourceIds` is a stable array
  const validResourceIds = Array.isArray(resources) ? resources : [];

  // Use useQueries to fetch resources in parallel
  const queries = useQueries({
    queries: validResourceIds.map((resourceId) => ({
      queryKey: ["resource", resourceId],
      queryFn: async () => {
        const response = await fetch(`/api/get-single-resources/${resourceId}`);
        const result = await response.json();
        return result;
      },
    })),
  });

  // Handle loading state for queries
  const checkFetching = queries.some((item) => item.isLoading);
  if (checkFetching) {
    return <div>Loading resources...</div>;
  }

  const arrayOfResource = queries.map((item) => item.data);

  
  return (
    <div className=" w-full flex flex-col gap-3">
      <div className="flex justify-between my-12">
        <p className="font-bold text-lg">Details</p>
        <Link
          href={
            isTeacher
              ? "/teacher-dashboard/sessions"
              : "/student-dashboard/sessions"
          }
          className="cursor-pointer"
        >
          <Image
            src="/closeAlt.svg"
            alt="cancel"
            width={100}
            height={100}
            className="w-[20px] h-[20px]"
          />
        </Link>
      </div>
      <TopSection isTeacher={isTeacher} infos={sessionData!} />
      <DownSection
        isTeacher={isTeacher}
        exams={sessionData!.StudentExam}
        resources={arrayOfResource}
        sessionId={sessionData!.id}
      />
      <ToastContainer />
    </div>
  );
};

export default SingleSessionShow;
