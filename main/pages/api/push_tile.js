import { connectToDatabase } from "../../util/mongodb";

// export default async (req, res) => {
//     const { db } = await connectToDatabase();
//     let result = { test: true }

//     try {
//         await db
//             .collection("tiles_test")
//             .insertOne(JSON.parse(req.body), (err, result) => {
//                 if (err) { res.json({ error: err }); }
//                 res.json(result);
//             })

//     } catch (error) {
//         res.json({ error })
//     }



// };

module.exports = (req, res) => {
    console.log(req)
    const { text, svg, data } = JSON.parse(req.body);
    console.log("TEXT", text)
    res.json({
        text: text,
        svg: svg,
        data: data,
    })
}