import {Button} from "@/components/ui/button.tsx";
import {EventResponse} from "@/models/event/eventResponse.ts";
import {FC} from "react";
type EventRes ={
    event:EventResponse
}
const EventInfo:FC<EventRes> = ({ event }) =>{

    if(!event){
        return <div>loading...</div>;
    }
    return (
        <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
            {/* event header image placeholder */}
            {/*<div className="bg-zinc-100 rounded-md h-32"/>*/}
            <img
                src={event.headerImageUrl}
                alt={event.namePub}
                className="rounded-md h-32 w-full object-cover"
            />
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">{event.namePub}</h1>
            {/* event description */}
            <p className="text-sm text-zinc-500">{event.description}</p>
            {/* add to calendar button */}
            <Button variant="secondary" disabled>
                Add to calendar
            </Button>
        </aside>
    );
};

export default EventInfo;