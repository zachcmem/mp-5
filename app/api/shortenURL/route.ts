// function that connects backend to frontend 

// im pretty sure a post function is needed here to do this 
// but if it doesnt work, try GET

import { getShortURL} from "@/app/getShortURL";
import getCollection from "@/db";

export async function POST(request: Request){
    // grabs longURL and alias
    const{longURL, alias} = await request.json();

    // I had to look up how to get this code, but this should
    // return the websites URL, for concatenation

    //https://medium.com/@sarfarazahmed1012/how-to-easily-get-the-base-url-in-react-or-next-js-9c49c7ccb883
    const webURL = process.env.WEBSITE_URL!;
    
    //calls getShortURL function for longURL, alias
    const returned = await getShortURL(longURL, alias); 

    const shortendURL = `${webURL}/${returned.alias}`;

    // returns response. try JSON.stringify
    return new Response(JSON.stringify({shortendURL}))

}