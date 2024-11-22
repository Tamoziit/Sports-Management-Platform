import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMyMemberships = () => {
    const [loading, setLoading] = useState();
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const memberships = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/events/my-clubs/${authUser._id}`, {
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
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, memberships }
}

export default useGetMyMemberships;