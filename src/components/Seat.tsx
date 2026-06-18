import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import React from 'react';
import {SeatDTO} from "@/models/event/seat.ts";
import {TicketType} from "@/models/event/ticketType.ts";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
	seat: SeatDTO,
	seatRow: number,
	ticketType:TicketType,
	isInCart:boolean,
	onToggle: (seat: SeatDTO, ticketType: TicketType) => void,
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(({seat, seatRow ,ticketType, onToggle, isInCart, className}, ref) => {
	 //isInCart = true;
	return (
		<Popover>
			<PopoverTrigger>
				<div className={cn('size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color',
					isInCart? 'bg-green-500'
						: 'bg-zinc-100 hover:bg-zinc-200'
					,className)}
				     ref={ref}>
					<span className={cn("text-xs text-zinc-405 font-medium",
						isInCart? 'text-white'
							: 'bg-zinc-100 hover:bg-zinc-200'
						)}>{seat.place}</span>
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex  flex-col gap-1">
					<span>Row: {seatRow}, place {seat.place}</span>
					<span>Type: {ticketType.name}</span>
					<span>Price: {ticketType.price}</span>
				</div>
				
				<footer className="flex flex-col">{
					isInCart ? (
						<Button onClick={() => onToggle(seat, ticketType)}  variant="destructive" size="sm" >
							Remove from cart
						</Button>
					) : (
						<Button onClick={() => onToggle(seat, ticketType)}  variant="default" size="sm" >
							Add to cart
						</Button>
					)
				}</footer>
			</PopoverContent>
		</Popover>
	);
});
