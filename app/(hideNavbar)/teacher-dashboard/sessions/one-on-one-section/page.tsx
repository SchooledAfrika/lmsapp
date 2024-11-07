import OneOnOneSession from "@/components/ui/student-dashboard/sessions/OneOnOneSession";

const page = () => {
    return (
      <div>
        <div>
          <OneOnOneSession isTeacher={true} />
        </div>
      </div>
    );
  };
  
  export default page;