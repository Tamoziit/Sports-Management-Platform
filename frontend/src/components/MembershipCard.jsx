/* eslint-disable react/prop-types */
import formatDate from "../utils/formatDate";

const MembershipCard = ({ club }) => {
    const date = formatDate(club.createdAt);

    return (
        <div className="flex flex-col gap-2 items-center bg-green-500/30 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-green-500/20 hover:border-4 transition-all duration-300 ease-in-out">
            <img src="logo.png" alt="logo" className="w-[300px] h-[70px]" />
            <img src={club.image_url} alt={club.product_id} className="w-[250px] h-[220px] rounded-md" />

            <div className="flex flex-col gap-1 items-center justify-center">
                <span className="text-xl font-bold">{club.name}</span>
                <span className="text-lg font-semibold text-gray-700">{club.sport}</span>
                <span className="text-gray-600">{club.institute}</span>
                <span className="text-gray-600">Membership Fees (per month): ₹{club.amount}</span>
                <span className="text-gray-600">Date of Purchase: {date}</span>
            </div>
        </div>
    )
}

export default MembershipCard;
