import { IUser } from "@/types/User";
import jwt from "jsonwebtoken"

const axios = require('axios').default;

export const getUsers = async() => {
    const response = await axios.get('https://cr-api.onrender.com/api/user')
    .then((res: Response) => res)

    const {users} = response.data

    return users
}

export const getUser = async(key: string) => {
    const response = await axios.get(`https://cr-api.onrender.com/api/user/${key}`)
    .then((res: Response) => res)

    const {user} = response.data

    return user
}

export const createUser = async (user: IUser) => {
    const response = await axios.post('https://cr-api.onrender.com/api/user', {
        key: user.key,
        name: user.name,
        role: user.role
    }).
    then((res: Response) => res)

    return alert("Usuário criado com sucesso.")
}

export const login = async (user: string, password: string) => {
    const data = {
        username: `${user}`,
        password: `${password}`
    }
    const token = await fetch("https://access-control.devgu.infraticampos.com.br/api-ac/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "alg": "HS256",
            "typ": "JWT"
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()).then((res) => res.access_token)

    const logedUser = jwt.decode(token)

    return logedUser
}