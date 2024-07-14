import { Skeleton } from "@/components/ui/skeleton"
 
export function TableSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-full rounded-xl bg-gray-200" />
      {/* <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-full bg-slate-200" />
      </div> */}
    </div>
  )
}