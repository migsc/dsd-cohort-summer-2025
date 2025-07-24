'use client';
import { buttonVariants } from './ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.log(error);
    };
  };
  return (
    <button
      onClick={handleLogout}
      className={`${buttonVariants({ variant: 'link' })} cursor-pointer`}
    >
      Logout
    </button>
  );
}
