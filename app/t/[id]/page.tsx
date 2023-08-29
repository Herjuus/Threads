import prisma from '@/lib/prismadb';

async function getThread(title: string){
    try{
        const thread = await prisma.thread.findUnique({
            where: {
                title: title,
            }
        })
    
        if (!thread){
            return null;
        }
    
        return thread;
    } catch {
        return null;
    }
    
}

export default async function ThreadPage({ params }: any){
    const thread = await getThread(params.id);

    return(
        <div>
            {thread ? (
                <div className='flex flex-col'>
                    <span>{thread.title}</span>
                    <span>{thread.description}</span>
                </div>
            ) : (
                <div className='flex flex-col'>
                    <span>Thread "{params.id}" doesn't exist.</span>
                </div>
            )}
        </div>
        
        
    )
}