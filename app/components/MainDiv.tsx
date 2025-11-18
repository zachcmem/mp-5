"use client";

import Link from "next/link";
import styled from "styled-components"
import { LinkLabel } from "./LinkLabel";
import { InputLink } from "./InputLink";
import { ButtonLink } from "./ButtonLink";
import {useState} from "react";

// import for "Parameter 'e' implicitly has an 'any' type." error
import type { ChangeEvent } from "react";


const MainWrapper = styled.div`
    text-align: center;
    border: 5px solid;
    border-color: #76ABAE;
    background-color:  #31363F;
    margin-left: 250px;
    margin-right: 250px;
`;

const Title = styled.h1`
    color: #EEEEEE; 
    font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace; 
    font-weight: bold; 
    text-align: center;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 50px
`;



export default function MainDiv(){
    // define use states for inputing link / shortended alias
    const [longURL, setLongURL] = useState("");
    const [alias, setAlias] = useState("");
    const [newURL, setNewURL] = useState("");

        //handleClick, which sends to uRL shortener (hopefully)
    async function handleClick(){
        //remove when done
        console.log("LongURL", longURL);
        console.log("Alias", alias);


        //this took me way to long
        const res = await fetch("/api/shortenURL", {
            method: "POST",
            body: JSON.stringify({
                longURL, alias
            })
        });


        //passes data from json to variable
        const data = await res.json();


        //makes the URL show on screen
        setNewURL(data.shortendURL)
    }
    
    return(
        <MainWrapper>
            <Title>CREATE A SHARABLE LINK</Title>
            <LinkLabel>LONG WEBSITE LINK:: </LinkLabel>
            <InputLink type="text" id="longlink" name="longlink" value={longURL} onChange={(e: ChangeEvent<HTMLInputElement>)=> setLongURL(e.target.value)}/>
            <br/>
            <LinkLabel>ALIAS::        </LinkLabel>
            <InputLink type="text" id="alias" name="alias" value={alias} onChange={(e: ChangeEvent<HTMLInputElement>)=> setAlias(e.target.value)}/>
            <br/>
            <ButtonLink type="button" onClick={handleClick}>GET SHORTENED URL</ButtonLink>
            {newURL ?(
            <p style={{ color: "#EEEEEE", marginTop: "20px", fontFamily: "Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace", fontWeight: "bold"}}>Shortend URL:
            <a href={newURL} style={{color: "#EEEEEE"}}>{newURL}</a>
            </p>
            )
            :(
            <p style={{color: "#EEEEEE", marginTop: "20px", fontFamily: "Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace", fontWeight: "bold"}}>Shortend URL:</p>
            )
            }
        </MainWrapper>  
    );
}