import styled from "styled-components";

export const TextareaMain = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    label{
        font-size: 1.4rem;
        font-weight: bold;
        flex: 1;
    }

    textarea{
        background-color: #fff;
        flex: 2;
        min-height: 10rem;
        width: 100%;
        border: 3px solid #639ECA;
        border-radius: 10px;
        padding: 1rem .5rem;
        font-size: 1.4rem;
        font-family: inherit;

        &:disabled {
            background-color: #ddd;
            border: 2px solid #f52b2b;
        }
    }
`