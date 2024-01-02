import styled from "styled-components";

export const SelectMain = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    
    label{
        font-size: 1.4rem;
        font-weight: bold;
    }

    select{
        background-color: #fff;
        width: 30rem;
        border: 3px solid #639ECA;
        border-radius: 10px;
        padding: 1rem .5rem;
        font-size: 1.4rem;

        &:disabled {
            background-color: #ddd;
            border: 2px solid #f52b2b;
        }
    }
`