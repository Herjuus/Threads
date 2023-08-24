import prisma from '@/lib/prismadb';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `/u/${"Herjus"} | Threads`,
    description: '',
}

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
        <div>
            {user ? (
                <div className='flex flex-col'>
                    <span>{user?.username}</span>
                    <span>{user?.description}</span>
                </div>
            ) : (
                <div className='flex flex-col'>
                    <span>User "{params.id}" doesn't exist.</span>
                </div>
            )}
        </div>
        
        
    )
}