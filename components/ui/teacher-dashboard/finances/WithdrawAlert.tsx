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
  
  export function WithdrawAlert() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button type="submit" className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700">Process Request</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:w-[400px] w-[300px] font-header">
          <AlertDialogHeader>
            <AlertDialogTitle>Successful Withdrawal!!</AlertDialogTitle>
            <AlertDialogDescription>
              Your withdrawal was successful, it may take some time for your transaction to reflect. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-lightGreen text-white">Cancel</AlertDialogCancel>
           
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  