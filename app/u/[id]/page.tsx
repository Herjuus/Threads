import prisma from '@/lib/prismadb';

async function getUser(username: string){
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            }
        })
    
        if (!user){
            return null;
        }
    
        return user;
    } catch {
        return null;
    }
    
}

export default async function UserPage({ params }: any){
    const user = await getUser(params.id);

    const threads = await prisma.thread.findMany({
        where: {
            members: {
                every: {
                    username: user?.username
                }
            }
        }
    })

    return(
        <div>
            {user ? (
                <div className='flex flex-col'>
                    <span>{user?.username}</span>
                    <span>{user?.description}</span>
                    <span>{threads.length}</span>
                    <span>{threads.map((thread) => (
                        thread.title
                    ))}</span>
                </div>
            ) : (
                <div className='flex flex-col'>
                    <span>User "{params.id}" doesn't exist.</span>
                </div>
            )}
        </div>
        
        
    )
}