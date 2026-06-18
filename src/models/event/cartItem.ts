import {SeatDTO} from "@/models/event/seat.ts";
import {TicketType} from "@/models/event/ticketType.ts";
import {UserDto} from "@/models/user/userDto.ts";

export interface CartItem{
    seat:SeatDTO,
    ticketType:TicketType,
}

export interface CartSummaryProps{
    cart:CartItem[],
    user:UserDto | null,
    eventId: string,
    clearCart: () => void,
}
