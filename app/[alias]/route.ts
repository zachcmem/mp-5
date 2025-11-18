// from directions, could be useful?

import { redirect } from "next/navigation";
import getCollection from "@/db";

// my vercel wasnt building, and I searched up the error 
// and it pointed to possibly being something wrong with
// the request in the git command

export async function GET(request: Request, 
    context: {params:Promise<{alias: string}>
}){
    const {alias}= await context.params;
    const url = await getCollection("urls");
    const new_url = await url.findOne({alias});
    if(!new_url){
        throw new Error("URL does not exist")
    }
    redirect(new_url.longURL)
}