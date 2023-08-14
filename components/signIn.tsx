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

export default function SignInButton() {
    const [isRegister, setIsRegister] = useState(false);

    return(
        <Dialog>
            <DialogTrigger>
                <Button variant={"secondary"}>
                    Sign in
                </Button>
            </DialogTrigger>
            {!isRegister ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                    </DialogHeader>
                    <RegisterForm/>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Register</DialogTitle>
                    </DialogHeader>
                    <RegisterForm/>
                </DialogContent>
            )}
        </Dialog>
    )
}