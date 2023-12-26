import { styled } from "styled-components";

export const ClosedRegistersMain = styled.section`
  width: 100%;
  min-width: calc(100% - 320px);
  overflow-x: auto;
  min-height: 100%;
  display: flex;
  background: #222;
  padding: 1.5rem 1rem;

  .list-container{
    row-gap: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
`