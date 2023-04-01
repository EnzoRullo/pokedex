/* export interface RegisterDto {
    email: string;
    password: string;
    nome: string;
} */

export class RegisterDto {
    email: string;
    password: string;
    nome: string;

    constructor(e: string = "", p: string = "", n: string = "") {
        this.email = e;
        this.password = p;
        this.nome = n;
    }
}

export interface LoginDto {
    email: string
    password: string;
}

export interface User {
    email: string;
    id: number;
    nome: string;
}

export interface LoggedUser {
    user: User;
    accessToken: string;
}