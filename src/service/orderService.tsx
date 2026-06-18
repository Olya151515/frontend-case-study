import axios from "axios";
import {baseUrl} from "@/constants/url/urls.ts";
import {OrderRequest, OrderResponse} from "@/models/order/orderDto.ts";

const axiosInstance = axios.create({
    baseURL:baseUrl
});

const orderService = {
    createOrder: async (order: OrderRequest):Promise<OrderResponse> => (
        await axiosInstance.post<OrderResponse>(
            "/order",
            order
        )
    ).data

};

export default orderService;