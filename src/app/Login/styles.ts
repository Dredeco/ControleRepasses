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
    background-color: #639ECA;
`

export const LoginContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255);
    padding: 3rem 3rem;
    border-radius: 10px;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    gap: 1rem;

    img{
        max-width: 350px;
        object-fit: contain;
        height: auto;
        width: auto;
    }

    button{
        margin-top: 1rem;
        background-color: #1a3a47;
        color: #fff;
        border: none;
        transition: all .4s;

        &:hover{
            color: #1a3a47;
            background-color: #639ECA;
        }
    }
`

export const LoginEmailWrapper = styled.div`
    display: flex;
    align-items: center;

    svg{
        position: absolute;
        margin-left: 1.4rem;
        fill: #639ECA;
    }

    input {
        padding-left: 4rem;
        border: 2px solid #639ECA;
    }
`

export const LoginPasswordWrapper = styled.div`
    display: flex;
    align-items: center;

    svg{
        position: absolute;
        margin-left: 1.4rem;
        fill: #639ECA;
    }

    input {
        padding-left: 4rem;
        border: 2px solid #639ECA;
    }
`