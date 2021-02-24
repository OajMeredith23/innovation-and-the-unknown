import { connectToDatabase } from "../../util/mongodb";

module.exports = async (req, res) => {

    const { db } = await connectToDatabase();
    let result = { test: true }
    console.log(req.body)

    try {
        const tile = await db
            .collection("tiles_test")
            .find({ _id: req.body._id });

        console.log(tile)
        res.json(tile)

    } catch (error) {
        console.log("error ", error)
        res.json({ error })
    }

    // res.json({ result: true })

}