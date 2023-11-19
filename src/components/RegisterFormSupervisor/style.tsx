import styled from 'styled-components'

export const MainRegisterForm = styled.section`
    width: 100%;
    background-color: #e2e2e2;
    display: flex;
    justify-content: center;
`

export const RegisterFormController = styled.form`
    padding: 4rem 2%;
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const RegisterFormHeader = styled.div`
    margin-bottom: 2rem;
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

        a{
            text-align: center;
            width: 30rem;
            border: 3px solid #aaa;
            border-radius: 10px;
            padding: 1rem .5rem;
            font-size: 1.8rem;
            cursor: pointer;
            text-decoration: none;
            color: #fff;
        }

        button{
            color: #fff;
        }

        :nth-child(1){
            background-color: #e94444;
        }

        :nth-child(2){
            background-color: #21be43;
        }
    }

`