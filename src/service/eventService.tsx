import axios from "axios";
import {baseUrl} from "@/constants/url/urls.ts";
import {EventResponse} from "@/models/event/eventResponse.ts";
import {TicketResponse} from "@/models/event/ticketresponce.ts";

const axiosInstance = axios.create({
    baseURL:baseUrl
});
const eventService = {
    getEvent:async ():Promise<EventResponse> =>
        (await axiosInstance.get<EventResponse>('https://nfctron-frontend-seating-case-study-2024.vercel.app/event')).data,

    getTicketsAndSeats:async (eventId: string):Promise<TicketResponse> =>{
        let responce = await axiosInstance.get<TicketResponse>('https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=' + eventId);
        return responce.data;
    },
};

export {
    eventService
}