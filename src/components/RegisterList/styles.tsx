import styled from "styled-components"

export const DashboardMain = styled.section`
  width: 100%;
  padding: 2rem 2%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
`

export const DashboardContainer = styled.div`
  width: 100%;
`

export const DashboardWrapper = styled.ul`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  word-wrap: break-word;

  > :nth-child(1){
    font-weight: bold;
  }

  > :nth-child(2n + 1){
    background-color: #e6e6e6;
  }

  li{
    display: flex;
    width: 100%;
    flex-direction: row;
    font-size: 1.2rem;
    text-align: center;
    align-items: center;

    span, a{
      padding: .5rem .5rem;
      flex: 1;
      min-width: 50px;
    }

  }
  li + li {
    border-top: 1px solid #000;
  }
`