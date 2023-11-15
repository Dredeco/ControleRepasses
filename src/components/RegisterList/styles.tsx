import styled from "styled-components"

export const DashboardMain = styled.section`
  width: 100vh;
  padding: 2rem 2%;
  display: flex;
  justify-content: center;
`

export const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1440px;
`

export const DashboardWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > :nth-child(1){
    font-weight: bold;
  }

  > :nth-child(2n + 1){
    background-color: #cccccc;
  }

  li{
    display: flex;
    width: 100%;
    flex-direction: row;
    font-size: 1.2rem;
    text-align: center;
    align-items: center;

    span{
      padding: .5rem .5rem;
      flex: 1;
      min-width: 50px;
      word-wrap: break-word;
    }

  }
  li + li {
    border-top: 1px solid #000;
  }
`