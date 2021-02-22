import useSWR from 'swr'
import { useEffect } from 'react'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TileWall() {

    const id = 'test__test'
    const { data, error } = useSWR(`/api/tiles/${id}`, fetcher)


    return (
        <h1>Tile Wall</h1>
    )
}

// export async function getStaticProps(context) {
//     // const res = await fetch(`http://localhost:3000/api/user`)
//     // const res = await fetch(`/api/user`)
//     // const res = await fetch(`https://innovation-and-the-unknown.vercel.app/api/user`)
//     const data = await res.json()
//     console.log("data", data)

//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: { users: data }, // will be passed to the page component as props
//     }
// }