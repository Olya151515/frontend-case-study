import {TicketType} from "@/models/event/ticketType.ts";
import {SeatRow} from "@/models/event/seatRows.ts";

export interface TicketResponse {
    "ticketTypes":TicketType[],
    "seatRows": SeatRow[]
}