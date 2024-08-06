import { Skeleton } from "@/components/ui/skeleton"
 
export function TableSkeleton() {
  return (
    <div className="flex flex-col space-y-1 bg-gray-100">
      <Skeleton className="h-[50px] w-full rounded-xl bg-gray-200" />
        <hr className="rounded-xl my-0"/>
        <Skeleton className="h-[50px] w-full bg-gray-200" />
        <hr className="rounded-xl my-0"/>
        <Skeleton className="h-[50px] w-full bg-gray-200" />
       
     
    </div>
  )
}