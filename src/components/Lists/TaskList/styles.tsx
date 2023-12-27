import styled from "styled-components"

export const DashboardMain = styled.section`
  width: fit-content;
  min-width: 100%;
  min-height: 50%;
  max-height: 50%;
  padding: 2rem 2%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 1rem;
`

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  div{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title{
      display: flex;
      gap: .5rem;
      align-items: center;

      button {
        cursor: pointer;
        background-color: transparent;

        :hover{
          fill: green;
        }
      }
    }

    input {
      font-size: 1.2rem;
    }
    h1 {
      font-size: 2rem;
      color: #ee4a75;
    }
  }

`

export const DashboardWrapper = styled.table`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  word-break: break-all;
  padding-right: 2rem;

  thead{
    border-start-start-radius: 10px;
    border-start-end-radius: 10px;
  }

  > thead {
    background-color: #ee4a75;
    tr {
      font-size: 1.35rem;
      color: #fff;
    }
  }

  > thead, tbody {
    > :nth-child(2n + 2){
      background-color: #ddd;
    }
  }


  tr{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-size: 1.2rem;
    word-break: break-all;
    border-bottom: 1px solid #000;

    th, td {
      background-color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20rem;
      max-width: 20rem;
      padding: .5rem .5rem;
    }

    :nth-child(2){
    font-weight: bold;
    }
    
    :nth-child(3){
    font-weight: bold;
    }
  }

`