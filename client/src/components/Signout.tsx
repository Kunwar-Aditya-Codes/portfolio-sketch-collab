'use client';

import { useRouter } from 'next/router';
import { Button } from './ui/button';

const Signout = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/api/auth/logout')}
      className='bg-transparent border border-zinc-800 text-zinc-500 hover:bg-transparent hover:text-zinc-300 hover:border-zinc-500'
      size={'sm'}
    >
      Logout
    </Button>
  );
};
export default Signout;
