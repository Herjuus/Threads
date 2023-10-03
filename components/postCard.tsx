import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { Post, Thread } from "@prisma/client";
import Image from "next/image";
import prisma from '@/lib/prismadb';

type props = {
    displayThread?: boolean;
    thread: Thread;
    post: Post;
}

async function getPostAuthor(post: Post){
    try {
        const user = await prisma.user.findFirst({
            where: {
                posts: {
                    some: {
                        id: post.id
                    }
                }
            }
        })

        return user?.username;
    } catch {
        return "User doesnt exist";
    }
}

export default async function PostCard(props: props){
    const author = await getPostAuthor(props.post)

    return(
        <Link href={`./${props.thread.title}/${props.post.slug}`}>
            <Card className='overflow-hidden max-h-96 relative'>
                <div className='h-36 bg-gradient-to-t from-white dark:from-black to-transparent top-60 absolute w-full'></div>
                <CardHeader>
                    <CardTitle>
                        {props.post.title}
                    </CardTitle>
                    <CardDescription>
                        {author}
                    </CardDescription>
                </CardHeader>
                <CardContent className=''>
                    {props.post.imgurl && (
                        <Image className="w-full rounded" src={props.post.imgurl} alt={`${props.post.title} image`} width={500} height={0} />
                    )}
                    <div className='whitespace-pre-line'>
                        {props.post.content}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}