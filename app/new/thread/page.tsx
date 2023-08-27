import getCurrentUser from "@/components/actions/getCurrentUser";
import { Button } from "@/components/ui/button";

export default async function NewThreadPage(){
    const user = await getCurrentUser();

    return(
        <main>
            
        </main>
    )
}