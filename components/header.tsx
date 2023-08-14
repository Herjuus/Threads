import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Link from "next/link"

export default function Header(){
    return(
        <div className="flex justify-between items-center py-1">
            <Link href={"/"} className="text-3xl font-light">THREADS</Link>
            <div className="flex items-center gap-2">
                <Button variant={"secondary"}>
                    Sign in
                </Button>
                <ModeToggle/>
            </div>
        </div>
    )
}