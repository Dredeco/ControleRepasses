import styled from "styled-components";

export const LoginMain = styled.main`
    width: 100%;
    height: calc(100vh - 14rem);
    min-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        margin-bottom: 1rem;
    }

    button{
        margin-top: 2rem;
        border: none;
        background-color: #222;
        color: #fff;
        &:hover{
            background-color: #000;
        }
    }

    div{
        display: flex;
        gap: .5rem;
    }
`