import styled from "styled-components"

export const DashboardMain = styled.section`
  width: 98%;
  min-width: 98%;
  margin: 0 auto;
  min-height: 30rem;
  max-height: 40rem;
  padding: 2rem 2%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
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

    input {
      font-size: 1.2rem;
    }
    h1 {
      font-size: 2rem;
      color: #e789a1;
    }
  }

`

export const DashboardWrapper = styled.table`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  word-break: break-all;

  > thead {
    background-color: #f7d1db;
  }

  > thead, tbody {
    > :nth-child(2n + 2){
      background-color: #f7d1db;
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
  }

`