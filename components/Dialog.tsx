import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export function DialogButton() {
  return (
    <Dialog>
      <DialogTrigger className="font-subtext" asChild>
        <Button variant="outline" className="bg-white w-28 rounded-lg border-lightGreen hover:bg-lightGreen text-lightGreen hover:text-white text-sm md:mt-3 mt-3 px-3  mr-2  md:py-2 text-center lg:block" >Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-subtext">
        <DialogHeader className="">
          <DialogTitle className="text-center">Contact Form</DialogTitle>
          <DialogDescription className="text-center">
            Fill in form to contact the tutor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col">
            <Label htmlFor="message" className="text-justify ">
              Message
            </Label>
            <br />
            <Textarea cols={30} className="p-8"/>
           
          </div>
          <div className="flex flex-col">
           
            <Input
              id="name"
              type="file"
              className=""
            /> 
            <p className="text-sm">Lorem ipsum, dolor sit amet.</p>
          </div>
         
        </div>
        <DialogFooter>
          <Button type="submit" className="w-[50%] mx-auto bg-lightGreen">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
