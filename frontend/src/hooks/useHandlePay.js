import { useState } from "react"
import toast from "react-hot-toast";

const useHandlePay = () => {
	const [payLoading, setPayLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	
	const handlePay = async (prodInfo) => {
        const body = {
			id: prodInfo.id,
            product_name: prodInfo.name,
            product_description: `${prodInfo.sport} | ${prodInfo.institute}`,
            price: prodInfo.fees,
            imageUrl: prodInfo.img
        }

        console.log(body);

		setPayLoading(true);
		try {
			const res = await fetch(`${apiUrl}/api/v1/payments/pay`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error)
			}

            console.log(data);
			return data;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setPayLoading(false);
		}
	}

	return { payLoading, handlePay }
}

export default useHandlePay;