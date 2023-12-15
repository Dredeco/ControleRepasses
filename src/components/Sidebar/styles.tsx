import styled from "styled-components";

export const SidebarMain = styled.aside`
  min-width: 220px;
  background: rgb(119,114,180);
  background: linear-gradient(180deg, rgba(119,114,180,1) 0%, rgba(148,187,233,1) 100%); 
  color: #fff;

  ul{
    padding: 2rem 2%;
    gap: 1rem;
    display: flex;
    flex-direction: column;

    li{
      cursor: pointer;
      display: flex;
      gap: 1rem;

      .selected{
        color: #9debda;
        font-weight: bold;
      }

      > :hover{
        color: #1a3a47;
        font-weight: bold;
      }
    }
  }
`