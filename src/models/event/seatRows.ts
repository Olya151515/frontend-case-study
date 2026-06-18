import {SeatDTO} from "@/models/event/seat.ts";

export interface SeatRow{
    "seatRow":number,
    "seats": SeatDTO[]
}