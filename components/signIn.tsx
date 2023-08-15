"use client";

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
import { useState } from "react";
import SigninForm from "./signinForm";

export default function SignInButton() {
    const [isRegister, setIsRegister] = useState(false);

    function toggleRegister() {
        setIsRegister(!isRegister);
    }

    return(
        <Dialog>
            <DialogTrigger>
                <Button variant={"outline"}>
                    Sign in
                </Button>
            </DialogTrigger>
            {!isRegister ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                    </DialogHeader>
                    <SigninForm toggleFunction={toggleRegister}/>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Register</DialogTitle>
                    </DialogHeader>
                    <RegisterForm toggleFunction={toggleRegister}/>
                </DialogContent>
            )}
        </Dialog>
    )
}