import express from "express";
import bcrypt from "bcrypt";
import db from "../../db";
import tokens from "../../utilities/tokens";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || typeof email !== "string" || email.length < 7 || email.length > 100) {
            return res.status(400).json({ message: "Email must be between 7 and 100 characters" });
        }

        if (!password || typeof password !== "string" || password.length < 12 || password.length > 120) {
            return res.status(400).json({ message: "Password must be between 12 and 120 characters" });
        }

        if (!name || typeof name !== "string" || name.length < 2 || name.length > 32) {
            return res.status(400).json({ message: "Name must be between 2 and 32 characters" });
        }

        const hashed = await bcrypt.hash(password, 12);

        const results = await db.users.create({ name, email, password: hashed, role: "user" });
        const id = results.insertedId;

        const token = tokens.sign({ id, email, role: "user" });

        res.status(201).json({ message: "Successfully registered!", id, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Andrew broke the database, tell him to check the logs" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || typeof email !== "string" || email.length < 7 || email.length > 100) {
            return res.status(400).json({ message: "Email must be between 7 and 100 characters" });
        }

        if (!password || typeof password !== "string") {
            return res.status(400).json({ message: "Password must be provided" });
        }

        const user = await db.users.find(email);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = tokens.sign({ email, id: user._id, role: user.role });

        res.json({ message: "Nice!", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Andrew broke the database, tell him to check the logs" });
    }
});

export default router;
