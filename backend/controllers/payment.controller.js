import stripe from "../stripe/stripeInit.js";
import clubs from "../data/clubs.data.js";
import Payment from "../models/payment.model.js";
import Membership from "../models/order.model.js";

export const paymentHandler = async (req, res) => {
    const baseUrl = process.env.BASE_URL;
    const { id, product_name, product_description, price, imageUrl } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product_name,
                            description: product_description,
                            images: [imageUrl]
                        },
                        unit_amount: price * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            phone_number_collection: {
                enabled: true
            },
            success_url: `${baseUrl}/complete-payment?session_id={CHECKOUT_SESSION_ID}&order_id=${id}`,
            cancel_url: `${baseUrl}/cancel-payment?reason=user_cancelled`,
            metadata: {
                orderId: id,
            },
            allow_promotion_codes: true
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log("Error in paymentHandler", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const confirmMembership = async (req, res) => {
    try {
        const { order_id, session_id, user_id } = req.body;
        
        const product = clubs.find(club => club.id === order_id);
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent.payment_method']
        });

        if (product && session) {
            const newPayment = new Payment({
                product_id: order_id,
                payment_intent_id: session.payment_intent.id,
                name: product.name,
                image_url: product.img,
                sport: product.sport,
                institute: product.institute,
                amount: session.payment_intent.amount / 100,
                customer_name: session.customer_details.name,
                customer_email: session.customer_details.email,
                customer_mobile: session.customer_details.phone,
            });

            if (newPayment) {
                let order = await Membership.findOne({ user: user_id });
                if (!order) {
                    order = await Membership.create({ user: user_id });
                }
                order.clubs.push(newPayment._id);

                await Promise.all([order.save(), newPayment.save()]);
            } else {
                return res.status(400).json({ error: "Could not process payment, Refund will be processed within 5-7 days" });
            }

            if (newPayment) {
                res.status(200).json({
                    product_id: newPayment.product_id,
                    name: newPayment.name,
                    image_url: newPayment.image_url,
                    sport: newPayment.sport,
                    institute: newPayment.institute,
                    amount: newPayment.amount,
                    customer_name: newPayment.customer_name,
                    customer_email: newPayment.customer_email,
                    customer_mobile: newPayment.customer_mobile,
                });
            } else {
                res.status(400).json({ error: "Error in buying the product" });
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}