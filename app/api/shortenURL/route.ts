// function that connects backend to frontend 

// im pretty sure a post function is needed here to do this 
// but if it doesnt work, try GET

import { getShortURL} from "@/app/getShortURL";
import { NextResponse} from "next/server"; //searched up error, says it could be due to my Response Packasge

export async function POST(request: Request){
    // grabs longURL and alias
    //error catching for vercel "Failed to load resource: the server responded with a status of 500 ()" error
    try{
        const{longURL, alias} = await request.json();

        if(!longURL){
            return NextResponse.json(
                {error: "longURL not here fam"}
            );
        }
        // I had to look up how to get this code, but this should
        // return the websites URL, for concatenation

        //https://medium.com/@sarfarazahmed1012/how-to-easily-get-the-base-url-in-react-or-next-js-9c49c7ccb883
        const webURL = process.env.WEBSITE_URL!;
        if(!webURL){
            return NextResponse.json(
                {error: "webURL not here fam"}
            );
        }


        //calls getShortURL function for longURL, alias
        const returned = await getShortURL(longURL, alias); 

        const shortendURL = `${webURL}/${returned.alias}`;

        // returns response. try JSON.stringify
        return NextResponse.json({shortendURL})
    } catch (err){
        return NextResponse.json(
            {error: "this is the error"}
        );

    }

}