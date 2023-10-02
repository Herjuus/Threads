"use client";

import {useState } from "react";
import { uploadFiles } from "@/lib/uploadthing";

export default function ImageUploader(){
    const [file, setFile] = useState("")

    const handleChange = (e: any) =>{
        setFile(e.target.files[0])
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const files = await [
            // @ts-ignore
            new File([file], `${file.name}`, {
              type: "image/jpeg",
            }),
        ];

        const res = await uploadFiles({
            files,
            endpoint: "imageUploader",
        });
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input className="" type="file" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>  
    )
}