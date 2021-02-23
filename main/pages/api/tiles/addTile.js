const Datastore = require('nedb')
const db = new Datastore({ filename: 'database.db' });

export default function handler(req, res) {
    db.loadDatabase().then((err) => {
        if (err) console.log("err ->", err)
        console.log("success")
    })
    console.log("1. hello", database.loadDatabase())
    // const {
    //     query: { tile },
    // } = req

    res.status(200).json({ tile_id: 'tile' })
}
