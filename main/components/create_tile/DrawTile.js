
export default function DrawTile({ data, setSVG }) {

    return (
        <>
            <h1>Data (future svg)</h1>
            <p>{JSON.stringify(data, 2, null)}</p>
        </>
    )
}