import clsx from "clsx";

const Title = ({ title, className, ...props }) => {
  return (
    <h2
      className={clsx("font-medium leading-6 tracking-tight", className)}
      {...props}
    >
      {title}
    </h2>
  );
};

export default Title;