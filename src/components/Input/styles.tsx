import styled from "styled-components";

export const InputMain = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    label{
        font-size: 1.4rem;
        font-weight: bold;
    }

    input{
        width: 30rem;
        border: 3px solid #aaa;
        border-radius: 10px;
        padding: 1rem .5rem;
        font-size: 1.4rem;
    }
`