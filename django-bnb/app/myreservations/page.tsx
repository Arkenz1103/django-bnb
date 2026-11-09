import Image from "next/image";
import Link from "next/link";
import apiService from "../services/apiService";

const MyReservationsPage = async () => {
    const reservations = await apiService.get('/api/auth/myreservations/');

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">  
            <h1 className="my-6 mb-6 text-2xl">My Reservations</h1>
            
            <div className="space-y-4">
                {reservations.map((reservation: any) => {
                    return (
                    <div key={reservation.id} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                    fill
                                    src={reservation.property.image_url.startsWith('http') ? reservation.property.image_url : `http://localhost:8000${reservation.property.image_url}`}
                                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                                    className="hover:scale-110 object-cover transition h-full w-full"
                                    alt={reservation.property.title || 'Property image'}
                                    unoptimized={process.env.NODE_ENV === 'development'}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 nd:col-span-3">
                            <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                            <p className="mb-2"><strong>Check in date</strong> {reservation.start_date}</p>
                            <p className="mb-2"><strong>Check out date</strong> {reservation.end_date}</p>

                            <p className="mb-2"><strong>Number of nights: </strong> {reservation.number_of_nights}</p>
                            <p className="mb-2"><strong>Total price: </strong> {reservation.total_price}</p>

                            <Link 
                                href={`/properties/${reservation.property.id}`} 
                                className="mt-6 inline-block cursor-pointer py-4 px-6 bg-[#ff385c] text-white rounded-xl"
                            >
                                Go to property
                            </Link>
                        </div>
                    </div>
                )
                })}
            </div>         
        </main>
    )
}

export default MyReservationsPage;