import {LoginResponse} from "@/models/user/userDto.ts";
import axios from "axios";
import {baseUrl} from "@/constants/url/urls.ts";

const axiosInstance = axios.create({
    baseURL:baseUrl
});

const authService ={
    login:async (email: string, password: string):Promise<LoginResponse> => (
        await  axiosInstance.post<LoginResponse>(
            "/login",
            {
                email,
                password
            }
        )
    ).data
}

export default authService;