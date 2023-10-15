import Link from "next/link"

export default function notFound() {
    return (
        <main className="text-center">
            <h2 className="text-3xl text-orange mt-10">
                Oeps, deze pagina bestaat niet...
            </h2>
            
            <Link href="/" className="text-darkBlue">
                <button className='inline-block mt-7 px-4 py-2 bg-darkBlue text-white text-sm uppercase font-medium rounded hover:bg-gray-800 hover:text-orange focus:outline-none focus:bg-blue-500 flex-none'>
                    terug naar home
                </button>
            </Link>
        </main>
    )
}