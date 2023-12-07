import { IUser } from "@/types/User";
import jwt from "jsonwebtoken"

const axios = require('axios').default;

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