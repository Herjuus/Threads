import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export function handleSignin(email: string, password: string) {
    const { toast } = useToast();

    const router = useRouter();

    signIn('credentials', {
        email,
        password,
        redirect: false,
    })
    .then((callback) => {
        if (callback?.ok) {
            console.log("Logged in")
            toast({
                title: "Successfully signed in!"
            })
            router.refresh();
        }
        if (callback?.error) {
            console.log("Wrong credentials")
            toast({
                title: "Wrong email/password.",
                description: "Please try again.",
            })
        }
    })
}