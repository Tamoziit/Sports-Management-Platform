import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useGetMyEvents from "../../hooks/useGetMyEvents";
import RegistrationCard from "../../components/RegistrationCard";
import { IoIosWarning } from "react-icons/io";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const MyRegistrations = () => {
    const { loading, myEvents } = useGetMyEvents();
    const [eventsData, setEventsData] = useState([]);

    const getEvents = async () => {
        const data = await myEvents();
        setEventsData(data);
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
            <Navbar />

            <div className="mt-[80px] w-full">
                <h1 className="text-[30px] lg:text-[50px] font-semibold text-gray-700">My Registered Events</h1>
                <div className="bg-gray-300 w-full h-[1.5px] mb-7"></div>

                {eventsData?.length !== 0 ? (
                    loading ? (
                        <span><Spinner /></span>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {eventsData?.map((event, index) => (
                                <RegistrationCard key={index} event={event} />
                            ))}
                        </div>
                    )
                ) : (
                    <Link className="flex items-center justify-center gap-4" to="/events">
                        <IoIosWarning className="text-2xl text-yellow-600" />
                        <h1 className="text-xl font-semibold text-gray-600 hover:text-green-700">Not Registered in any Events...Register Now!!!</h1>
                        <IoIosWarning className="text-2xl text-yellow-600" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MyRegistrations;
