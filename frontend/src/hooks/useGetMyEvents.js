import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMyEvents = () => {
    const [loading, setLoading] = useState();
    const { authUser } = useAuthContext()

    const myEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/events/my-registrations/${authUser._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, myEvents }
}

export default useGetMyEvents;