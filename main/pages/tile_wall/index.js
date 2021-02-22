import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TileWall() {
    const { data, error } = useSWR('/api/user', fetcher)
    console.log({ data })

    return (
        <h1>Tile Wall</h1>
    )
}

// export async function getStaticProps(context) {
//     // const res = await fetch(`http://localhost:3000/api/user`)
//     const res = await fetch(`/api/user`)
//     // const res = await fetch(`https://innovation-and-the-unknown.vercel.app/api`)
//     const data = await res.json()

//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: { data: data }, // will be passed to the page component as props
//     }
// }