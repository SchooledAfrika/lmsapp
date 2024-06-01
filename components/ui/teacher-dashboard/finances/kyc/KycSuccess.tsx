import Link from "next/link"
import Image from "next/image"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { KycVerificationAlert } from "./KycVerificationAlert"
import { MdVerified } from "react-icons/md"
  
  export function KycSuccess() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-secondary hover:bg-green-700 w-full text-white text-[16px] px-6 py-7 my-3">Proceed</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:w-[400px] w-[300px] font-header">
          <AlertDialogHeader>
            <AlertDialogCancel className="border-none hover:border-none flex justify-end">
               <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[10px] h-[10px] float-right"  />
            </AlertDialogCancel>
          {/* <Link href="/teacher-dashboard/finance/kyc" className="cursor-pointer"> 
           
            </Link> */}
            
            <AlertDialogTitle className="text-[14px] inline font-bold"><MdVerified className="inline text-green-700 text-[16px]"/> KYC Submitted Successfully</AlertDialogTitle>
            <AlertDialogDescription className="text-[11.5px] text-black font-semibold">
              Your Documents have been submitted successfully
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
           
           
                <KycVerificationAlert/>
           
           
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  