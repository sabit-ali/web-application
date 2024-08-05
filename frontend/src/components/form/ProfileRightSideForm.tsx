import { Button } from "../ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import ProfileUpdateForm from "./ProfileUpdateForm"
import UpdateAvatar from "./UpdateAvatar"

export function ProfileRightSideForm() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
           <div className=" mb-5">
            <UpdateAvatar/>
           <ProfileUpdateForm/>
           </div>
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
