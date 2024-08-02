'use client'
import { IJobSub } from "./JobDescription";

const JobFinalization: React.FC<IJobSub> = ({
  register, clearErrors, errors
}) => {
  return (
    <section className="my-[80px] md:my-6  ">
      <div className="md:pl-[100px] w-full">
      <label className="font-bold text-[18px]">Additional Notes</label>
      <textarea
               id="name"
               {...register("note")}
               name="note"
               onChange={() => clearErrors("note")}
                rows={6}
                cols={7}
                className="p-4 md:w-[500px] outline-none my-1"
                placeholder="Additional Notes"
              />
              {errors.note && (
                  <small className="text-red-600">
                    {errors.note.message}
                  </small>
                )}
    
            
        
        </div>
     
    </section>
  );
};

export default JobFinalization;
