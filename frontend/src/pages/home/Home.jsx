import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../context/AuthContext";
import useGetMyMemberships from "../../hooks/getMyMemberships";
import MembershipCard from "../../components/MembershipCard";
import { IoIosWarning } from "react-icons/io";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const Home = () => {
    const { authUser } = useAuthContext();
    const { loading, memberships } = useGetMyMemberships();
    const [clubData, setClubData] = useState([]);

    const getMemberships = async () => {
        const data = await memberships();
        setClubData(data);
    };

    useEffect(() => {
        getMemberships();
    }, []);

    return (
        <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center">
            <Navbar />

            <div className="flex items-center justify-around w-full p-4 mt-10">
                <div className="flex flex-col">
                    <span className="lg:text-[65px] md:text-[45px] font-bold text-green-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.75)]">Welcome</span>
                    <span className="lg:text-[85px] md:text-[60px] font-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.75)]">{authUser.name}</span>
                </div>
                <img src="master.png" alt="master bg" className="lg:w-[700px] md:w-[500px]" />
            </div>

            <div className="flex flex-col w-full p-4">
                <h1 className="text-[30px] lg:text-[50px] font-semibold text-gray-700">My Clubs</h1>
                <div className="bg-gray-300 w-full h-[1.5px] mb-7"></div>

                {clubData?.length ? (
                    loading ? (
                        <Spinner />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {clubData?.slice().reverse().map((club, index) => (
                                <MembershipCard key={index} club={club} />
                            ))}
                        </div>
                    )
                ) : (
                    <Link className="flex items-center justify-center gap-4" to="/events">
                        <IoIosWarning className="text-2xl text-yellow-600" />
                        <h1 className="text-xl font-semibold text-gray-600 hover:text-green-700">Not Enrolled in any Club...Enroll Now!!!</h1>
                        <IoIosWarning className="text-2xl text-yellow-600" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Home;
