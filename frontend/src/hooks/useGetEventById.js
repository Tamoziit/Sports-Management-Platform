import { useState } from "react";
import toast from "react-hot-toast";

const useGetEventById = () => {
    const [loading, setLoading] = useState();
  
    const event = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/events/get-event/${id}`, {
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
    return { loading, event }
}

export default useGetEventById;