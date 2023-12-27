import styled from "styled-components";

export const SidebarMain = styled.aside`
  width: 320px;
  background: #639ECA;
  color: #fff;
  padding: 2rem 1rem;
  border-right: 2px solid #ccc;

  ul{
    gap: 1rem;
    display: flex;
    flex-direction: column;

    li{
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;

      .selected{
        color: #1a3a47;
        font-weight: bold;
      }

      > :hover{
        font-weight: bold;
      }
    }
  }
`