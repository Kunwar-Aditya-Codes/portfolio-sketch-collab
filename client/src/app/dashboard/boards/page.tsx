import AllBoards from '@/components/AllBoards';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Board() {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();

  if (!sessionUser?.id) return redirect('/');

  const boards = await db.boards.findMany({
    where: {
      userId: sessionUser.id,
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <>
      {boards.length === 0 ? (
        <div className='mt-16'>
          <p className='text-zinc-400 text-center '>You have no boards.</p>
          <p className='text-center text-zinc-400 mt-0.5'>
            Start by creating one by clicking on{' '}
            <span className='text-white ml-0.5'>New Board </span>.
          </p>
        </div>
      ) : (
        <AllBoards boards={boards} sessionUserId={sessionUser.id} />
      )}
    </>
  );
}
