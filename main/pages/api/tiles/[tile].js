
export default function handler(req, res) {
    console.log(req)
    const {
        query: { tile },
    } = req

    res.status(200).json({ tile_id: tile })
}
