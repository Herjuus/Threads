import { ModeToggle } from "./ModeToggle";
import getCurrentUser from "./actions/getCurrentUser";
import SignInButton from "./signIn";
import SignOutButton from "./signOut";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Header(){
    const user = await getCurrentUser();

    return(
        <div className="flex justify-between items-center py-1">
            <Link href={"/"} className="text-3xl font-light">THREADS</Link>
            <div className="flex items-center gap-2">
                {user ? (
                    <SignOutButton/>
                ) : (
                    <SignInButton/>
                )}
                <ModeToggle/>
            </div>
        </div>
    )
}