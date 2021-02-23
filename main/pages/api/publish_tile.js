import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    let result = { test: true }

    try {
        await db
            .collection("tiles_test")
            .insertOne(JSON.parse(req.body), (err, result) => {
                if (err) { res.json({ error: err }); }
                res.json(result);
            })

    } catch (error) {
        res.json({ error })
    }



};