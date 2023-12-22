import styled from "styled-components"

export const DashboardMain = styled.section`
  width: 95%;
  min-width: 95%;
  min-height: 30rem;
  max-height: 40rem;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 1rem;
  margin: 0 auto;
`

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 2%;

  div{
    display: flex;
    gap: 1rem;
    align-items: center;

      button {
        cursor: pointer;
        background-color: transparent;

        :hover{
          fill: green;
        }
      }

      h1 {
        font-size: 2rem;
        color: #5b9e91;
      }
  }

`

export const DashboardWrapper = styled.table`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  text-align: center;
  padding-right: 2rem;

  > thead {
    background-color: #ade4d9;
    tr {
      font-size: 1.35rem;
    }
  }

  > tbody {
    > :nth-child(2n + 2){
      background-color: #ade4d9;
    }
  }


  tr{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-size: 1.2rem;
    border-bottom: 1px solid #000;

    th, td {
      background-color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20rem;
      max-width: 20rem;
      padding: .5rem .5rem;

      p {
        font-weight: bold;
        padding-left: 5px;
      }
    }

    :nth-child(2){
    font-weight: bold;
    }
    
    :nth-child(3){
    font-weight: bold;
    }
  }
`