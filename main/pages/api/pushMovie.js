import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    console.log(req.body)
    const { db } = await connectToDatabase();
    let result = { test: true }

    try {
        await db
            .collection("tiles_test")
            .insertOne(JSON.parse(req.body), (err, result) => {
                if (err) { throw err; }
                res.json(result);
                // result = res;
            })

    } catch (error) {
        res.json({ error: true })
    }



};