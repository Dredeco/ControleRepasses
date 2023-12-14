import styled from "styled-components";
import Bg from "@/assets/bg.png"

export const LoginMain = styled.main`
    width: 100%;
    height: calc(100vh - 14rem);
    min-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: contain;
    background: rgb(119,114,180);
    background: radial-gradient(circle, rgba(119,114,180,1) 0%, rgba(148,187,233,1) 92%); 
`

export const LoginContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    svg{
        position: relative;
        align-self: flex-start;
        top: 2.9rem;
        left: 1rem;
        fill: #1a3a47;
    }

    label{
        position: relative;
        align-self: flex-start;
        bottom: -0.8rem;
        font-weight: bold;
        left: 0.2rem;
    }

    input{
        background-color: #efefff;
        padding-left: 4rem !important;
        border: none;
        background-color: rgba(255, 255, 255, 0.6);
    }

    h1{
        margin-bottom: 1rem;
    }

    button{
        margin-top: 2rem;
        border: none;
        background-color: #1a3a47;
        color: #fff;
        &:hover{
            transition: all;
            transition-duration: 2s;
            background-color: #0A171C;
        }
    }

    div{
        display: flex;
        gap: .5rem;
    }
`