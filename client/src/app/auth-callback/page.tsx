'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { getAuthStatus } from './actions';

const Page = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (data?.success) {
      router.push('/dashboard/boards');
    }
  }, [data, router]);

  return (
    <div className='w-full h-[100dvh] pt-24 flex justify-center bg-zinc-950 text-zinc-100'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='size-8 animate-spin' />
        <h3 className='font-semibold text-xl'>Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};
export default Page;
