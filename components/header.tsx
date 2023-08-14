"use client";

import { ModeToggle } from "./ModeToggle";
import SignInButton from "./signIn";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from 'next-auth/react';

export default function Header(){
    return(
        <div className="flex justify-between items-center py-1">
            <Link href={"/"} className="text-3xl font-light">THREADS</Link>
            <div className="flex items-center gap-2">
                <Button onClick={() => signOut()}>
                    Sign out
                </Button>
                <SignInButton/>
                <ModeToggle/>
            </div>
        </div>
    )
}