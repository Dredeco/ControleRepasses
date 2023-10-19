import { IUser } from "@/types/User";

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