"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
  } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOut, Settings2, ListPlus, PlusSquare, User, FolderSearch, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { DialogTrigger, Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "./ui/dialog";
import NewThreadForm from "./newThreadForm";
import { useState } from "react";



export default function UserDropdown(props: any) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    function closeDialog(){
        setOpen(false);
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button disabled={loading} className="text-base flex items-center gap-1" variant={"outline"}>
                        {loading && (
                            <>
                                <Loader2 className="w-4 animate-spin"/>
                            </>
                        )}
                        <span>
                            {props.currentUser.username}
                        </span>
                        <ChevronDown size={15}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Threads</DropdownMenuLabel>
                    <Link href={`/u/${props.currentUser.username}`}>
                        <DropdownMenuItem className="gap-1"><User size={15}/>Profile</DropdownMenuItem>
                    </Link>
                    <Link href={`/discover`}>
                        <DropdownMenuItem className="gap-1"><FolderSearch size={15}/>Discover</DropdownMenuItem>
                    </Link>
                    <DialogTrigger>
                        <DropdownMenuItem className="gap-1"><PlusSquare size={15}/>New thread</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <Link href={'/settings'}>
                        <DropdownMenuItem className="gap-1"><Settings2 size={15}/>Settings</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="gap-1" onClick={() => {setLoading(true); signOut().finally(() => {setLoading(false)});}}><LogOut size={15}/>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New thread
                    </DialogTitle>
                    <DialogDescription>
                        Customize your new thread here
                    </DialogDescription>
                </DialogHeader>
                <NewThreadForm closeFunction={closeDialog}/>
            </DialogContent>
        </Dialog>
    )
}