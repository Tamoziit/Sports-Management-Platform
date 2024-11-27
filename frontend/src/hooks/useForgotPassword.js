import { useState } from 'react';
import toast from 'react-hot-toast';
import createOTP from '../utils/createOTP';

const useForgotPassword = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
   
    const sendOTP = async (email) => {
        const generatedOTP = createOTP();
        const emailData = {
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_USER_ID,
            template_params: {
                from_name: "TheSportsEdge.com",
                from_email: "atestemail@gmail.com",
                to_name: email,
                to_email: email,
                message: generatedOTP
            }
        };

        setLoading(true);
        try {
            const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            });
            const data = await res.text();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                setOtp(generatedOTP);
                setOtpSent(true);
                toast.success('OTP has been sent to your email.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = (enteredOtp) => {
        if (enteredOtp === otp) {
            toast.success('OTP verified');
            return true;
        } else {
            toast.error('Invalid OTP');
            return false;
        }
    };

    const resetPassword = async (email, newPassword) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/v1/auth/update-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password: newPassword })
            });

            if (response.ok) {
                toast.success('Password has been reset.');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to reset password');
            }
        } catch (error) {
            toast.error('Failed to reset password');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { sendOTP, verifyOTP, resetPassword, otpSent, loading };
};

export default useForgotPassword;
