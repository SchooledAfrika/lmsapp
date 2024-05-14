import { useState } from "react";
import JobDescription from "./JobDescription";
import JobResponsibility from "./ui/JobResponsibility";
import JobQualification from "./JobQualification";
import JobFinalization from "./JobFinalization";

const JobNewList: React.FC = () => {
  const [currentView, setCurrentView] = useState("description");

  const [canTransition, setCanTransition] = useState(true);

  const handleCurrentView = (view: string) => {
    if (canTransition) {
      setCurrentView(view);

      if (view === "finalization") {
        setCanTransition(false);
      }
    }
  };
  return (
    <div>
      {currentView === "description" && (
        <JobDescription onClickCurrentView={handleCurrentView} />
      )}
      {currentView === "responsibility" && (
        <JobResponsibility onClickCurrentView={handleCurrentView} />
      )}
      {currentView === "qualification" && (
        <JobQualification onClickCurrentView={handleCurrentView} />
      )}
      {currentView === "finalization" && <JobFinalization />}
    </div>
  );
};

export default JobNewList;
