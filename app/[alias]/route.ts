// from directions, could be useful?

import { redirect } from "next/navigation";
import getCollection from "@/db";

export async function GET(request: Request, 
    {params}:{params: {alias: string}
}){
    const {alias}=params;
    const url = await getCollection("urls");
    const new_url = await url.findOne({alias});
    if(!new_url){
        throw new Error("URL does not exist")
    }
    redirect(new_url.longURL)
}