import { ModeToggle } from "./ModeToggle";
import getCurrentUser from "./actions/getCurrentUser";
import SignInButton from "./signIn";
import Link from "next/link";
import UserDropdown from "./userDropdown";
import { Button } from "./ui/button";
import { Search, PlusSquare } from "lucide-react";

export default async function Header(){
    const user = await getCurrentUser();

    return(
        <header className="flex justify-between items-center py-3">
            <Link href={"/"} className="text-3xl font-light">THREADS</Link>
            <div className="flex items-center gap-2">
                {user ? (
                    <div className="flex items-center gap-2">
                        <UserDropdown currentUser={user} />
                    </div>
                ) : (
                    <SignInButton/>
                )}
                <Button variant={"outline"} size={"icon"}>
                    <Search className="h-[1.2rem] w-[1.2rem]"/>
                    <span className="sr-only">Search</span>
                </Button>
                <ModeToggle/>
            </div>
        </header>
    )
}