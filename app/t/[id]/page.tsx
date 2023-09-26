import getCurrentUser from '@/components/actions/getCurrentUser';
import { JoinThreadButton } from '@/components/joinThread';
import { ThreadDropdown } from '@/components/threadDropdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prismadb';
import Link from 'next/link';

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
    const user = await getCurrentUser()

    return(
        <main>
            {thread ? (
                <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col'>
                            <span className='font-bold text-xl'>t/{thread.title}</span>
                            <span className='font-light text-md'>{thread.description}</span>
                        </div>
                        {user ? (
                            <div>
                                {thread?.memberId.includes(user?.id!) ? (
                                    <div className='flex items-center space-x-2'>
                                        <Button>
                                            New post
                                        </Button>
                                        <ThreadDropdown thread={thread} user={user}/>
                                    </div>
                                ) : (
                                    <JoinThreadButton thread={thread} user={user}/>
                                )}
                            </div>
                        ): (
                            <div>
                                <Button disabled>
                                    Sign in to post
                                </Button>
                            </div>
                        )}
                    </div>
                    <Separator/>
                    <div className='flex flex-col space-y-1'>
                        <Link href={`/p/${"post-name"}`}>
                            <Card>
                                <CardContent className='flex flex-row p-4 space-x-5'>
                                    <div className='flex flex-col w-2/6 md:w-1/6'>
                                        <span className='font-semibold'>Post name</span>
                                        <span className='font-light'>User</span>
                                    </div>
                                    <span className='flex-1 line-clamp-2 font-extralight'>fr</span>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href={`/`}>
                            <Card>
                                <CardContent className='flex flex-row p-4 space-x-5'>
                                    <div className='flex flex-col w-2/6 md:w-1/6'>
                                        <span className='font-semibold'>Post name</span>
                                        <span className='font-light'>User</span>
                                    </div>
                                    <span className='flex-1 line-clamp-2 font-extralight'>fr</span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
                
            ) : (
                <div className='flex flex-col'>
                    <span>Thread t/{params.id} doesn't exist.</span>
                </div>
            )}
        </main>
    )
}