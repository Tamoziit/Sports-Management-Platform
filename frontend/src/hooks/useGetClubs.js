import { useState } from "react";
import toast from "react-hot-toast";

const useGetClubs = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const clubs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/events/get-clubs`, {
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
        } finally {
            setLoading(false);
        }
    }
    return { loading, clubs }
}

export default useGetClubs;