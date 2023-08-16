"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
  } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOut, Settings2, ListPlus, PlusSquare, User } from "lucide-react";
import { signOut } from "next-auth/react";


export default function UserDropdown(props: any) {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="text-base" variant={"outline"}>{props.currentUser.username}<ChevronDown size={15}/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Threads</DropdownMenuLabel>
                <DropdownMenuItem className="gap-1"><User size={15}/>Profile</DropdownMenuItem>
                <DropdownMenuItem className="gap-1"><ListPlus size={15}/>New post</DropdownMenuItem>
                <DropdownMenuItem className="gap-1"><PlusSquare size={15}/>New thread</DropdownMenuItem>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem className="gap-1"><Settings2 size={15}/>Settings</DropdownMenuItem>
                <DropdownMenuItem className="gap-1" onClick={() => signOut()}><LogOut size={15}/>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}