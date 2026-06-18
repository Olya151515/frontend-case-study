import {UserDto} from "@/models/user/userDto.ts";

export type ticketsOrderDto = {
    ticketTypeId:string;
    seatId:string;
}

export interface OrderRequest {
    eventId:string,
    tickets: ticketsOrderDto[],
    user:UserDto,
}

export interface OrderResponse {
    message: string,
    orderId:string,
    tickets: ticketsOrderDto[],
    user: UserDto,
    totalAmount: number,
}