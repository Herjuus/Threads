import getCurrentUser from '@/components/actions/getCurrentUser';
import { JoinThreadButton } from '@/components/joinThread';
import { ThreadDropdown } from '@/components/threadDropdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    const user = await getCurrentUser();

    const text = "How to blablabla\nI want to try out snowboarding lmao rofl"

    return(
        <main>
            {thread ? (
                <div className='space-y-3'>
                    <Separator/>
                    <div className='flex space-x-3'>
                        <div className='flex flex-col space-y-2 w-[63%]'>
                            <div className='pb-1'>
                                {/* <div className='flex flex-col'>
                                    <span className='font-bold text-xl'>t/{thread.title}</span>
                                    <span className='font-light text-md'>{thread.description}</span>
                                </div> */}
                                {user ? (
                                    <div>
                                        {thread?.memberId.includes(user?.id!) ? (
                                            <div className='flex items-center justify-between space-x-2'>
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
                            <Link href={`./${thread.title}/${"post-name"}`}>
                                <Card className='overflow-hidden max-h-96 relative'>
                                    <div className='h-36 bg-gradient-to-t from-white dark:from-black to-transparent top-60 absolute w-full'></div>
                                    <CardHeader>
                                        <CardTitle>
                                            Post title
                                        </CardTitle>
                                        <CardDescription>
                                            User
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className=''>
                                        <div className='whitespace-pre-line'>
                                            {text}
                                        </div>
                                        {/* <img src="https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg" alt="" /> */}
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                        <div className='flex-1'>
                            <Card className=''>
                                <CardHeader>
                                    <CardTitle>
                                        t/{thread.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {thread.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href={`./${thread.title}/members`}><span className='hover:underline'>{thread.memberId.length} {thread.memberId.length !== 1 ? <span>members</span> : <span>member</span>}</span></Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                
            ) : (
                <div className='flex flex-col'>
                    <span>Thread t/{params.id} does not exist.</span>
                </div>
            )}
        </main>
    )
}