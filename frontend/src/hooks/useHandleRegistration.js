import { useState } from "react";
import toast from "react-hot-toast";

const useHandleRegistration = () => {
	const [payLoading, setPayLoading] = useState(false);

	const handleRegistration = async (prodInfo) => {
        console.log("prod info: ", prodInfo);
        const body = {
			id: prodInfo.id,
            product_name: prodInfo.name,
            product_description: `${prodInfo.club} | ${prodInfo.desc} | ${prodInfo.institute}`,
            price: prodInfo.fees,
            imageUrl: prodInfo.img,
            team_name: prodInfo.team_name,
            team_lead_name: prodInfo.team_lead_name,
            team_lead_phone: prodInfo.team_lead_phone,
            lead_institute: prodInfo.lead_institute,
            members: prodInfo.members
        };

		setPayLoading(true);
		try {
			const res = await fetch(`/api/v1/payments/register`, {
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

			return data;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setPayLoading(false);
		}
	}

	return { payLoading, handleRegistration };
}

export default useHandleRegistration;
