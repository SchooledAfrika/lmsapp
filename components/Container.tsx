import clsx from 'clsx'

interface Props {
  className?: string
  children: React.ReactNode
}


const Container = ({children, className, ...props}:Props) => {
  return (
    <div className={clsx("max-w-screen mx-auto px-4", className)}
       {...props}
     
    >{children}</div>
  )
}

export default Container