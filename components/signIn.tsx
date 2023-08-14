import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "./ui/button"
import RegisterForm from "./registerForm"

export default function SignInButton() {
    return(
        <Dialog>
            <DialogTrigger>
                <Button variant={"secondary"}>
                    Sign in
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <RegisterForm/>
            </DialogContent>
        </Dialog>
    )
}