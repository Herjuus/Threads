"use client";

import { Button } from "./ui/button"
import { signOut } from 'next-auth/react';

export default function SignOutButton(){
    return(
        <Button variant={"outline"} onClick={() => signOut()}>
            Sign out
        </Button>
    )
}