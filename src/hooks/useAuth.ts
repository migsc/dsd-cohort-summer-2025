// hook to check if user is logged in -- can use anywhere
import { authClient } from "@/lib/auth-client";

export function useAuth() {
    const { data: session, isPending } = authClient.useSession();
    
    return {
        user: session?.user || null,
        session,
        isLoggedIn: !!session,
        isLoading: isPending,
    };
}