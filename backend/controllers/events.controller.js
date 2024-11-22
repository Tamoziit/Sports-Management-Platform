import events from "../data/events.data.js";
import clubs from "../data/clubs.data.js";
import Event from "../models/event.model.js";
import Membership from "../models/order.model.js";
import Payment from "../models/payment.model.js";
import Registration from "../models/registration.model.js";

export const getClubs = (req, res) => {
    try {
        const data = clubs;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getClubById = (req, res) => {
    try {
        const id = req.params.id;
        const data = clubs.find(club => club.id === id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "No such club found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getMyClubs = async (req, res) => {
    try {
        const userClubs = await Membership.findOne({ user: req.params.id });
        if (!userClubs) {
            return;
        }

        const clubIds = userClubs.clubs;
        const clubs = await Payment.find({ _id: { $in: clubIds } });

        if (clubs) {
            res.status(200).json(clubs);
        } else {
            res.status(400).json({ error: "Error in Fetching orders" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getEvents = (req, res) => {
    try {
        const data = events;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getEventById = (req, res) => {
    try {
        const id = req.params.id;
        const data = events.find(event => event.id === id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "No such event found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getMyRegistrations = async (req, res) => {
    try {
        const userRegs = await Registration.findOne({ user: req.params.id });
        if (!userRegs) {
            return;
        }

        const eventIds = userRegs.events;
        const events = await Event.find({ _id: { $in: eventIds } });

        if (events) {
            res.status(200).json(events);
        } else {
            res.status(400).json({ error: "Error in Fetching orders" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
}