import { ModeToggle } from "./ModeToggle";
import getCurrentUser from "./actions/getCurrentUser";
import SignInButton from "./signIn";
import SignOutButton from "./signOut";
import Link from "next/link";
import UserDropdown from "./userDropdown";

export default async function Header(){
    const user = await getCurrentUser();

    return(
        <div className="flex justify-between items-center py-3">
            <Link href={"/"} className="text-3xl font-light">THREADS</Link>
            <div className="flex items-center gap-2">
                {user ? (
                    <div>
                        {/* <SignOutButton/> */}
                        <UserDropdown currentUser={user} />
                    </div>
                ) : (
                    <SignInButton/>
                )}
                <ModeToggle/>
            </div>
        </div>
    )
}