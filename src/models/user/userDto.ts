export interface UserDto{
    firstName: string;
    lastName: string;
    email: string;
}

export interface Login{
    email: string;
    password: string;
}

export interface LoginResponse{
    message: string;
    user: UserDto;
}
