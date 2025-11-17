
"use client";

import Link from "next/link";
import styled from "styled-components"

const HeaderWrapper = styled.header`
    height: 120px;
    border: 5px solid;
    border-color: #76ABAE;
    background-color: #31363F;

`;

const Title = styled.h1`
    color: #EEEEEE; 
    // font-family: New Century Schoolbook, TeX Gyre Schola, serif; 
    font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace; 
    font-weight: bold; 
    font-size: 50px;
    text-align: center;
    
`;

export default function Header(){
    return(
        <HeaderWrapper>
            <Title>URL SHORTENER</Title>
        </HeaderWrapper>  
    );
}