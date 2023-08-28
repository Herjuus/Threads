import getCurrentUser from "@/components/actions/getCurrentUser";
import NewThreadForm from "@/components/newThreadForm";
import { Button } from "@/components/ui/button";

export default async function NewThreadPage(){
    return(
        <main>
            <NewThreadForm/>
        </main>
    )
}