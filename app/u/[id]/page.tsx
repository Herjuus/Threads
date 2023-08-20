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

    return(
        <div className='flex flex-col'>
            <span>{user?.username}</span>
            <span>{user?.email}</span>
            <span>{user?.hashedPassword}</span>
            <span>{user?.id}</span>
        </div>
    )
}