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
import { FaUserPen } from "react-icons/fa6"

const EditProfile = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-3 inline shadow-xl" variant="outline"><FaUserPen className="inline w-5 h-5"/> Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] font-header">
        <DialogHeader>
          <DialogTitle className="">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email:
            </Label>
            <Input id="email" type="email" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Contact:
            </Label>
            <Input id="phone" type="phone" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State:
            </Label>
            <Input id="state" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country:
            </Label>
            <Input id="country" value="" className="col-span-3" />
          </div>
          <p className="text-[14px]">Visit settings for more profile updates</p>
        </div>
        <DialogFooter>
          <Button className="bg-lightGreen" type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile

