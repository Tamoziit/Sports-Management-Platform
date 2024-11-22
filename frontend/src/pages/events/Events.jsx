import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useGetClubs from "../../hooks/useGetClubs"; ``
import ClubCard from "../../components/ClubCard";
import useGetEvents from "../../hooks/useGetEvents";
import EventCard from "../../components/EventCard";
import Spinner from "../../components/Spinner";

const Events = () => {
  const { loading, clubs } = useGetClubs();
  const { enLoading, events } = useGetEvents();
  const [clubData, setClubData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  const getClubs = async () => {
    const data = await clubs();
    setClubData(data);
  }

  const getEvents = async () => {
    const data = await events();
    setEventsData(data);
  }

  useEffect(() => {
    getClubs();
    getEvents();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
      <Navbar />

      <div className="mt-[80px]">
        <h1 className="text-[30px] lg:text-[50px] font-semibold text-gray-700">Clubs</h1>
        <div className="bg-gray-300 w-full h-[1.5px] mb-7"></div>

        {loading ? (
          <span>Loading...</span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {clubData?.map((club, index) => (
              <ClubCard key={index} club={club} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-[40px]">
        <h1 className="text-[30px] lg:text-[50px] font-semibold text-gray-700">Events</h1>
        <div className="bg-gray-300 w-full h-[1.5px] mb-7"></div>

        {enLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eventsData?.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Events