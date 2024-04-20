import clsx from "clsx";

interface Props {
  title: string;
  className: string;
}

const Title = ({ title, className, ...props }:Props) => {
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