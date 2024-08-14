"use client";
import { IJobSub } from "./JobDescription";

const JobFinalization: React.FC<IJobSub> = ({
  register,
  clearErrors,
  errors,
}) => {
  return (
    <section className="w-full md:w-2/3">
      <div className="w-full flex flex-col gap-3">
        <label className="font-bold text-[18px]">Additional Notes</label>
        <div className=" flex flex-col gap-2">
          <textarea
            id="name"
            {...register("note")}
            name="note"
            onChange={() => clearErrors("note")}
            rows={6}
            cols={7}
            className="p-4 w-full outline-none"
            placeholder="Additional Notes"
          />
          {errors.note && (
            <small className="text-red-600">{errors.note.message}</small>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobFinalization;
