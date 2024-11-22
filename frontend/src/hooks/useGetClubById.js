import { useState } from "react";
import toast from "react-hot-toast";

const useGetClubById = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const club = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/events/get-club/${id}`, {
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
    return { loading, club }
}

export default useGetClubById;