import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useGetEvents from "../../hooks/useGetEvents";
import NoticeCard from "../../components/NoticeCard";
import Spinner from "../../components/Spinner";

const NoticeBoard = () => {
  const { enLoading, events } = useGetEvents();
  const [eventsData, setEventsData] = useState([]);

  const getEvents = async () => {
    const data = await events();
    setEventsData(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
        <Navbar />

        <div className="mt-[80px]">
        <h1 className="text-[30px] lg:text-[50px] font-semibold text-gray-700">Upcoming Events</h1>
        <div className="bg-gray-300 w-full h-[1.5px] mb-7"></div>

        {enLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eventsData?.map((event, index) => (
              <NoticeCard key={index} event={event} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default NoticeBoard