"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import { signOut } from "next-auth/react";

export default function UserDropdown(props: any) {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="text-base" variant={"outline"}>{props.currentUser.username}<ChevronDown size={15}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}