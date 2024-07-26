import AddBoard from '@/components/AddBoard';
import Signout from '@/components/Signout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();

  if (!sessionUser?.id) redirect('/');

  return (
    <div className='bg-zinc-950 min-h-[100dvh] text-zinc-100 px-8 md:px-16 py-12'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl'>Dashboard</h1>

        <Signout />
      </div>
      <div className='mt-10'>
        <div className='border-b border-b-zinc-800 flex  items-center justify-between pb-2'>
          <div className='flex items-center gap-x-2'>
            <nav className='hover:bg-zinc-900/50 px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 w-full'>
              <Link href={'/dashboard/boards'}>Boards</Link>
            </nav>
            <Separator
              className='border border-zinc-800 h-[1.5rem]'
              orientation='vertical'
            />
            <nav className='hover:bg-zinc-900/50 px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 w-full'>
              <Link href={'/dashboard/collabs'}>Collabs</Link>
            </nav>
          </div>
          <AddBoard sessionUserId={sessionUser.id} />
        </div>
        {children}
      </div>
    </div>
  );
}
