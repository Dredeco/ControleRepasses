import styled from "styled-components";

export const SidebarMain = styled.aside`
  width: 100%;
  max-width: 200px;
  background-color: #222222dd;
  color: #fff;

  ul{
    padding: 2rem 2%;
    gap: 1rem;
    display: flex;
    flex-direction: column;

    li{
      cursor: pointer;

      > :hover{
        color: #ccc;
      }
    }
  }
`