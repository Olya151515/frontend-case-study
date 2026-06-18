import './App.css';
import HeaderComponent from "@/components/header/HeaderComponent.tsx";
import SeatMap from "@/components/seat/SeatMap.tsx";
import EventInfo from "@/components/event/EventInfo.tsx";
import CartSummary from "@/components/cart/CartSummary.tsx";
import {EventResponse} from "@/models/event/eventResponse.ts";
import {useEffect, useState} from "react";
import {eventService} from "@/service/eventService.tsx";
import {SeatDTO} from "@/models/event/seat.ts";
import {TicketType} from "@/models/event/ticketType.ts";
import {TicketResponse} from "@/models/event/ticketresponce.ts";
import {CartItem} from "@/models/event/cartItem.ts";
import {UserDto} from "@/models/user/userDto.ts";
import authService from "@/service/authService.tsx";


function App() {
	const [event, setEvent] = useState<EventResponse | null>(null);
	const[cart, setCart] = useState<CartItem[]>([]);
	const [user, setUser] = useState<UserDto | null>(null);
	const [ticket, setTicket] = useState<TicketResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadEvent = async () =>{
			try{
				setLoading(true);
				const eventData =  await eventService.getEvent();
				setEvent(eventData);

				const ticketData = await eventService.getTicketsAndSeats(eventData.eventId);
				setTicket(ticketData);
			}catch (error){
				setError('Nepodařilo se načíst data');
				console.log(error);

			}finally {
				setLoading(false);
			}

		};
		loadEvent();
	}, []);
	const login = async () =>{
		try{
			const response = await authService.login("frontend@nfctron.com","Nfctron2025");

			setUser((response.user));
		}catch (error){
			console.log(error);
		}
	}
	const logout = () =>{
		setUser(null);
	}


	const toggleSeat = (seat:SeatDTO, ticketType:TicketType) => {
		setCart(prevState =>
			 prevState.some(item => item.seat.seatId === seat.seatId)
			? prevState.filter(item => item.seat.seatId !== seat.seatId)
				 : [...prevState, {seat, ticketType}]
		);
	}
	if(loading){
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-zinc-500">Načítání...</p>
			</div>
		);
	}
	if(error){
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-red-500">{error}</p>
			</div>
		)
	}
	return (
		<div className="flex flex-col grow">
			<HeaderComponent user={user} onLogin={login} onLogout={logout}
			/>
			{/* main body (wrapper) */}
			<main className="grow flex flex-col justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
					{/* seating card */}
					{ticket &&(
						<SeatMap
							ticketData={ticket}
							cart={cart.map(item => item.seat)}
							onToggle={toggleSeat}
						/>
					)}
					{/* event info */}
					{event && <EventInfo event={event} />}
				</div>
			</main>
			
			{/* bottom cart affix (wrapper) */}
			<CartSummary
				cart={cart}
				user={user}
				eventId={event?.eventId ?? ""}
				clearCart={() => setCart([])}
			/>
		</div>
	);
}

export default App;
