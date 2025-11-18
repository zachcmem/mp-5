
// use redirect to redirect user to webpage through website
import { redirect } from "next/navigation";
import getCollection from "@/db";

// get function used to get data from mongodb
export async function GET(
    // define for using paramas
    context: {params:Promise<{alias: string}>
}){
    // get what the alias is
    const {alias}= await context.params;
    // gets urls from mongo db
    const url = await getCollection("urls");
    // find alias match
    const new_url = await url.findOne({alias});
    // database error for null case
    if(!new_url){
        throw new Error("URL does not exist")
    }
    //redirect from instructions
    redirect(new_url.longURL)
}