// import FadeIn, { FadeInStagger } from "./FadeIn";
import clsx from "clsx";

interface Props {
  
  children: React.ReactNode;
  className?: string;
  Image?: string;
  title?: string;
 
  
  
  
}


export function GridList({ className,  children }:Props) {
  return (
   
      <ul
        role="list"
        className={clsx(
          "grid grid-cols-1  justify-center gap-10 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {children}
      </ul>
   
  );
}

export function GridListItem({Image, title, children, className }:Props) {
  return (
    <li
      className={clsx(
        "text-xl sm:text-base my-3 ",
        // invert
        //   ? "text-neutral-300 before:bg-white after:bg-white/10"
        //   : "text-neutral-600 before:bg-neutral-950 after:bg-neutral-100",
        className
      )}
    >
    
        <div>
        <strong
            className={clsx(
              "font-semibold text-3xl sm:text-xl",
             
            )}
          >
            {Image} 
            {title} {" "}
          </strong> {" "}
          {children}

        </div>
       
          
        
     
    </li>
  );
}
