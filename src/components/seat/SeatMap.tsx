import {Seat} from "@/components/Seat.tsx";
import {TicketResponse} from "@/models/event/ticketresponce.ts";
import {SeatDTO} from "@/models/event/seat.ts";
import {TicketType} from "@/models/event/ticketType.ts";
interface SeatMapProps {
    ticketData: TicketResponse;
    cart: SeatDTO[];
    onToggle: (seat: SeatDTO, ticketType:TicketType ) => void;
}

const SeatMap = ({ticketData, cart, onToggle}: SeatMapProps) =>{
    const {ticketTypes, seatRows} = ticketData;
    const maxPlace = Math.max(...seatRows.flatMap(row => row.seats.map(s => s.place)));
    return (
        <div className="bg-white rounded-md grow  p-3 self-stretch shadow-sm flex flex-col gap-2" style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
            gridAutoRows: '30px'
        }}>
            {seatRows.map(row => {
                const seatMap = new Map(
                    row.seats.map(seat => [seat.place, seat])
                );
                return (<div key={row.seatRow} className="flex items-center gap-1">

                        <span className="text-xs text-zinc-450 w-7 text-right shrink-0"> R {row.seatRow}</span>
                        <div className="flex gap-1 flex-wrap">
                            {
                               Array.from({length: maxPlace}, (_,i) => i+1)
                                   .map(place => {
                                       const seat = seatMap.get(place);
                                       if (!seat) {
                                           return (
                                               <div
                                                   key={place}
                                                   className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs text-zinc-480"
                                               >{place}</div>
                                           );
                                       }

                                       const ticketType = ticketTypes.find(
                                           tt => tt.id === seat.ticketTypeId
                                       );

                                       if (!ticketType) return null;
                                       return(
                                           <Seat
                                               key={seat.seatId}
                                               seat={seat}
                                               seatRow={row.seatRow}
                                               ticketType={ticketType}
                                               onToggle={onToggle}
                                               isInCart={cart.some(s => s.seatId === seat.seatId)}
                                           />
                                       )
                                   })
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SeatMap;