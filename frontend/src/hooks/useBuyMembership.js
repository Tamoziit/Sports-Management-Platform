import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useBuyMembership = () => {
    const [payLoading, setLoading] = useState();
    const { authUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const buy = async ({ order_id, session_id }) => {
        const body = {
            order_id: order_id,
            session_id: session_id,
            user_id: authUser._id
        }
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/payments/confirm-membership`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Membership Bought successfully");
                return data;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { payLoading, buy };
}

export default useBuyMembership;