/* eslint-disable react/prop-types */
import { MdSportsCricket } from "react-icons/md";
import { IoMdFootball } from "react-icons/io";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    return (
        <div className="flex flex-col gap-2 items-center bg-green-500/30 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-green-500/20 hover:border-4 transition-all duration-300 ease-in-out">
            <img src="logo.png" alt="logo" className="w-[300px] h-[70px]" />
            <img src={event.img} alt={event.id} className="w-[250px] h-[220px] rounded-md" />

            <div className="flex flex-col gap-1 items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">{event.club} presents</span>
                <span className="text-xl font-bold">{event.name}</span>
                <span className="text-lg font-semibold text-gray-700">{event.desc}</span>
                <span className="text-gray-600">{event.price_pool}</span>
                <span className="text-gray-600">Registration Fees: ₹{event.fees}</span>
            </div>

            <Link
                className="flex items-center gap-2 rounded-md bg-green-700 hover:bg-green-500 text-white text-lg p-2 w-[90%] justify-center mt-2"
                to={`/register/${event.id}`}
            ><MdSportsCricket /> Register Now <IoMdFootball /></Link>
        </div>
    )
}

export default EventCard;
