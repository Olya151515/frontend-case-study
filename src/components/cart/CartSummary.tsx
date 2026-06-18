import {Button} from "@/components/ui/button.tsx";
import {CartSummaryProps} from "@/models/event/cartItem.ts";
import orderService from "@/service/orderService.tsx";

const CartSummary = ({cart , user, eventId, clearCart}:CartSummaryProps) =>{

    const ticketCount = cart.length;
    const totalPrice = cart.reduce(
        (sum,item) => sum + item.ticketType.price,0
    )

    const isLoginIn = user !== null;
    const createOrder = async () =>{
        if(!isLoginIn){
            alert(" Please login before checkout");
            return;
        }
        try{
            const response = await orderService.createOrder({
                eventId,
                tickets: cart.map(item => ({
                    ticketTypeId:item.ticketType.id,
                    seatId: item.seat.seatId
                })),
                user: {
                    email:user?.email,
                    firstName: user?.firstName,
                    lastName: user?.lastName
                }
            });

            alert(response.message);
            clearCart();
        }catch (error){
            console.log(error);
            alert("Failed to create order");
        }
    }

    return (
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <div className="flex flex-col">
                    <span>Total for {ticketCount} tickets</span>
                    <span className="text-2xl font-semibold">{totalPrice} CZK</span>
                </div>


                {/* checkout button */}
                <Button  variant="default"
                         disabled={cart.length === 0}
                onClick={createOrder}>
                    Checkout now
                </Button>

            </div>
        </nav>
    );
};

export default CartSummary;