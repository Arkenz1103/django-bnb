import Image from "next/image";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";

const LandlordDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const landlord = await apiService.get(`/api/auth/user/${id}`)
    const userId = await getUserId();


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={landlord.avatar_url || '/profile_pic.png'}
                            width={200}
                            height={200}
                            alt="Landlord name  "
                            className="rounded-full"
                            unoptimized={process.env.NODE_ENV === 'development'}
                        />

                        <h1 className="mt-6 text-2xl">{landlord.name}</h1>

                        <ContactButton
                            userId={userId}
                            landlordId={id}
                        />

                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PropertyList
                            landlord_id={id}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LandlordDetailPage;