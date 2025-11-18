// function that implements the handling to mongodb
//called from post API

import getCollection from "@/db";

// async function for handling db connection

export async function getShortURL(longURL: string, alias: string){
    
    const urls = await getCollection("urls");

    // first, check to see if alias is taken
    const takenURL = await urls.findOne({alias});
    if(takenURL){
        throw new Error("ALIAS_TAKEN")
    }

    // 2: insert into database
    await urls.insertOne({
        alias,
        longURL,
    });

    //return promise, (sent back to api)
    return(
        {alias, longURL}
    );
}