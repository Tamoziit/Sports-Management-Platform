import stripe from "../stripe/stripeInit.js";
import eventsData from "../data/events.data.json" assert { type: 'json' };
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

export const registrationHandler = async (req, res) => {
    const baseUrl = process.env.BASE_URL;
    const { id, product_name, product_description, price, imageUrl, team_name, team_lead_name, team_lead_phone, lead_institute, members } = req.body;

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
            success_url: `${baseUrl}/complete-registration?session_id={CHECKOUT_SESSION_ID}&order_id=${id}`,
            cancel_url: `${baseUrl}/cancel-registration?reason=user_cancelled`,
            metadata: {
                orderId: id,
                team_name,
                team_lead_name,
                team_lead_phone,
                lead_institute,
                members: JSON.stringify(members)
            },
            allow_promotion_codes: true
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log("Error in registrationHandler", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const confirmRegistration = async (req, res) => {
    try {
        const { order_id, session_id, user_id } = req.body;

        const product = eventsData.events.find(event => event.id === order_id);
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent.payment_method']
        });

        if (product && session) {
            const { team_name, team_lead_name, team_lead_phone, lead_institute, members } = session.metadata;
            console

            const newPayment = new Event({
                product_id: order_id,
                payment_intent_id: session.payment_intent.id,
                name: product.name,
                image_url: product.img,
                club: product.club,
                desc: product.desc,
                institute: product.institute,
                amount: session.payment_intent.amount / 100,
                customer_name: session.customer_details.name,
                customer_email: session.customer_details.email,
                customer_mobile: session.customer_details.phone,
                team_name,
                team_lead_name,
                team_lead_phone,
                lead_institute,
                members: JSON.parse(members)
            });

            if (newPayment) {
                let order = await Registration.findOne({ user: user_id });
                if (!order) {
                    order = await Registration.create({ user: user_id });
                }
                order.events.push(newPayment._id);

                await Promise.all([order.save(), newPayment.save()]);
            } else {
                return res.status(400).json({ error: "Could not process payment, Refund will be processed within 5-7 days" });
            }

            res.status(200).json({
                product_id: newPayment.product_id,
                name: newPayment.name,
                image_url: newPayment.image_url,
                club: newPayment.club,
                desc: newPayment.desc,
                institute: newPayment.institute,
                amount: newPayment.amount,
                customer_name: newPayment.customer_name,
                customer_email: newPayment.customer_email,
                customer_mobile: newPayment.customer_mobile,
                team_name: newPayment.team_name,
                team_lead_name: newPayment.team_lead_name,
                team_lead_phone: newPayment.team_lead_phone,
                lead_institute: newPayment.lead_institute,
                members: newPayment.members,
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

