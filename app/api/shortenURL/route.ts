// function that connects backend to frontend 

// im pretty sure a post function is needed here to do this 
// but if it doesnt work, try GET

import { getShortURL} from "@/app/getShortURL";
import { NextResponse} from "next/server"; //searched up error, says it could be due to my Response Packasge

//URL constructor per piazza @130
// source for syntax https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function checkURL(url : string): boolean{ //take longURL as URL
    try{
        const urlCheck = new URL(url); //create using URL constructor class
    return urlCheck.protocol === "http:" || urlCheck.protocol === "https:";
    } catch{
        return false;
    }
}
    

export async function POST(request: Request){
    // grabs longURL and alias
    //error catching for vercel "Failed to load resource: the server responded with a status of 500 ()" error
    try{
        // pass into varibles
        const{longURL, alias} = await request.json();

        // first, check if theres a valid URL
        if(!checkURL(longURL)){
            return NextResponse.json(
                {error: "URL NOT VALID"},
                {status: 400}
            )
        }

        // I had to look up how to get this code, but this should
        // return the websites URL, for concatenation
        //https://medium.com/@sarfarazahmed1012/how-to-easily-get-the-base-url-in-react-or-next-js-9c49c7ccb883
        const webURL = process.env.WEBSITE_URL!;
        console.log("WEB URL", webURL);

        //calls getShortURL function for longURL, alias
        const returned = await getShortURL(longURL, alias); 
        console.log("getshortenedurl", returned);

        const shortendURL = `${webURL}/${returned.alias}`;
        // returns response. try JSON.stringify
        return NextResponse.json({shortendURL})

    } catch (err:any){

        return NextResponse.json(
            {error: err?.message ?? "error"},
            {status : 400}
        );

    }

}