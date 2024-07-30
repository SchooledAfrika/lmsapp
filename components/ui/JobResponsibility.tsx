import { useState } from "react";

import Container from "../Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { IjobListing } from "@/components/JobNewList"
import { Input } from "@/components/ui/input";

import {
  useFieldArray, Controller, Control, FieldValues, UseFormRegister, UseFormClearErrors, UseFieldArrayReturn
} from "react-hook-form";


interface FieldArrayManagerProps {
  register: UseFormRegister<IjobListing>;
  control?: Control<IjobListing>;
  clearErrors: UseFormClearErrors<IjobListing>;
  fields: UseFieldArrayReturn<IjobListing>['fields'];
  append: UseFieldArrayReturn<IjobListing>['append'];
  prepend: UseFieldArrayReturn<IjobListing>['prepend'];
  remove: UseFieldArrayReturn<IjobListing>['remove'];
}
const JobResponsibility: React.FC<FieldArrayManagerProps> = ({
  control, fields, append, prepend, remove, register,  clearErrors
}) => {
 

  return (
    <section className="my-[80px] md:my-6  w-[500px]">
      <div className="md:pl-[100px] w-[500px]">
        <label className="font-bold text-[18px]">Job Responsibilities</label>
        <br />

        <div>
     
            
        {fields.map((field, index) => (
          <section key={field.id}>
            
              <input
               id="name"
               {...register("responsibility")}
                placeholder="responsibility"
               
                name="responsibility"
                 className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[80vh] bg-white"
                
              /> 
             
              {/* <Controller
              render={({ field }) => <input {...field} />}
              name="responsibility"
              control={control}
            /> */}
            <button className="font-bold text-[12px] hover:bg-green-200 rounded p-4 mt-2"  type="button" onClick={() => remove(index)}>Delete </button>
          </section>
         
        ))}
      
      
           
        
         
       
     
      <button  className="font-bold text-[12px] hover:bg-green-200 rounded p-4 mt-2" type="button" onClick={() => append({ value: 'Responsibility', name: '' })}>
      Add More Responsibilities +
      </button>
     
    
       
    </div>

        {/* {responsibility.map((item, index) => (
          <Input
            key={index}
            type="text"
            id="name"
            {...register("responsibility")}
            name="responsibility"
            onChange={() => clearErrors("responsibility")}
            className="p-4 md:w-[500px] text-black  rounded-[8px]  outline-none my-2 "
            placeholder="Responsibility"
          />
        ))}

        {errors.responsibility && (
          <small className="text-red-600">
            {errors.responsibility.message}
          </small>
        )}

        <button
          type="button"
          onClick={addInputField}
          className="p-4 mt-2 font-bold rounded text-[12px] hover:bg-green-200"
        >
          Add More Responsibilities +
        </button> */}
      </div>
    </section>
  );
};

export default JobResponsibility;
