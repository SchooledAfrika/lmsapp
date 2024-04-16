import FadeIn, { FadeInStagger } from "./FadeIn";
import clsx from "clsx";


export function GridList({ className, children }) {
  return (
    <FadeInStagger>
      <ul
        role="list"
        className={clsx(
          "grid grid-cols-1  justify-center gap-10 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {children}
      </ul>
    </FadeInStagger>
  );
}

export function GridListItem({Image, title, children, className, invert = false }) {
  return (
    <li
      className={clsx(
        "text-xl sm:text-base my-3 ",
        invert
          ? "text-neutral-300 before:bg-white after:bg-white/10"
          : "text-neutral-600 before:bg-neutral-950 after:bg-neutral-100",
        className
      )}
    >
      <FadeIn>
       
          <strong
            className={clsx(
              "font-semibold text-3xl sm:text-xl",
              invert ? "text-white" : "text-neutral-950"
            )}
          >
            {Image} 
            {title} {" "}
          </strong> {" "}
          {children}
        
      </FadeIn>
    </li>
  );
}
