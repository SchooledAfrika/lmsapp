import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import clsx from "clsx";

const Logo = ({className, ...props}) => {
  return (
   <Link href='/'>
      <Image src={logo} alt='logo' className={clsx("w-[180px] h-[180px] font-bold duration-300", className)}
        {...props}
       />
   </Link>
  )
}

export default Logo