
export default function handler(req, res) {
    const {
        query: { tile },
    } = req

    res.status(200).json({ tile_id: tile })
}
