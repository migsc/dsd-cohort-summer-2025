import PortalHeader from '@/components/ui/custom/portalHeader';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Settings() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user) {
        redirect('/login');
    };
    
    return (
        <div className="mx-1 sm:mx-10">
            <PortalHeader 
                pageName='Settings' 
                userName={session.user.name || "Customer"}
            />
        </div>
    )
}