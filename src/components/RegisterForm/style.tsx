import styled from 'styled-components'

export const MainRegisterForm = styled.section`
    width: 100%;
    padding: 2% 0;
    height: fit-content;
    min-height: calc(100vh - 14rem);
    background-color: #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(119,114,180);
    background: radial-gradient(circle, rgba(119,114,180,1) 0%, rgba(148,187,233,1) 92%); 
`

export const RegisterFormController = styled.form`
    padding: 4rem 2%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 10px;

    h4 {
        text-align: center;
    }

    h2 {
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        text-align: center;
        text-transform: uppercase;
    }
`

export const RegisterFormBody= styled.ul`
    list-style: none;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    li{
        label{
            width: max-content;
            flex: 1;
        }
    
        input, select {
            flex: 2;
            width: 100%;
            max-width: 600px;
        }
    }

    .obsevations{
        input{
            height: 200px;
        }
    }

    .btnContainer{
        display: flex;
        justify-content: center;
        column-gap: 1rem;
        margin-top: 2rem;

        a, button{
            display:flex;
            align-items: center;
            justify-content: center;
            width: 30rem;
            border-radius: 10px;
            padding: 1rem .5rem;
            font-size: 1.8rem;
            cursor: pointer;
            text-decoration: none;
            color: white;
            border: none;
        }

        .cancel {
            background-color: #e94444;
            &:hover{
                background-color: #c43939;
                transition: 1s;
            }
        }

        .send, button {
            background-color: #21be43 !important;
            &:hover{
                background-color: #1b9c37 !important;
                transition: 1s;
            }
        }
    }

`