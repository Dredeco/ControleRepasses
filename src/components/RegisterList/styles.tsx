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
  width: inherit;
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

export const DashboardWrapper = styled.ul`
  min-width: 120rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > :nth-child(1){
    font-weight: bold;
  }

  > :nth-child(2n + 1){
    background-color: #f3c3cf;
  }

  li{
    display: flex;
    width: 100%;
    flex-direction: row;
    font-size: 1.2rem;
    text-align: center;
    align-items: center;

    :nth-child(2){
    font-weight: bold;
    }

    span, a{
      padding: .5rem .5rem;
      flex: 1;
      min-width: 50px;
    }

    a {
      :hover {
        svg {
          stroke: red !important;
        }
      }
    }

  }
  li + li {
    border-top: 1px solid #000;
  }

`