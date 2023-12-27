import styled from 'styled-components'

export const MainRegisterForm = styled.section`
    width: 100%;
    height: 100%;
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
    min-height: 100%;
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
`

export const RegisterFormHeader = styled.div`
    h1 {
        margin-bottom: 3rem;
        text-align: center;
        text-transform: uppercase;

        text-decoration: underline 2px;
        text-decoration-color: #639ECA;
        text-underline-offset: 1.2rem;
        text-decoration-thickness: .5rem;
}
`

export const RegisterFormBody= styled.ul`
    list-style: none;
    width: 100%;
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
                transition: .4s;
            }
        }

        .send, button {
            background-color: #21be43 !important;
            &:hover{
                background-color: #1b9c37 !important;
                transition: .4s;
            }
        }
    }

`