/* eslint-disable react/prop-types */
import formatDate from "../utils/formatDate";

const RegistrationCard = ({ event }) => {
    const date = formatDate(event.createdAt);

    return (
        <div className="flex flex-col gap-2 items-center bg-green-500/30 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-green-500/20 hover:border-4 transition-all duration-300 ease-in-out">
            <img src="logo.png" alt="logo" className="w-[300px] h-[70px]" />
            <img src={event.image_url} alt={event.product_id} className="w-[250px] h-[220px] rounded-md" />

            <div className="flex flex-col gap-1 items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">{event.club} presents</span>
                <span className="text-xl font-bold">{event.name}</span>
                <span className="text-gray-600 font-semibold">{event.desc}</span>
                <span className="text-gray-600">{event.institute}</span>
                <span className="text-gray-600 font-semibold text-lg">Team Details</span>
                <span className="text-gray-600">{event.team_name}</span>
                <span className="text-gray-600">{event.team_lead_name}</span>
                <span className="text-gray-600">{event.team_lead_phone}</span>
                <span className="text-gray-600">Team Strength: {event.members.length}</span>
                <span className="text-gray-600">Date of Purchase: {date}</span>
            </div>
        </div>
    )
}

export default RegistrationCard;
