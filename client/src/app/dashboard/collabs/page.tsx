import AllBoards from '@/components/AllBoards';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();

  if (!sessionUser?.id) return redirect('/');

  const collabBoards = await db.collaborators.findMany({
    where: {
      userId: sessionUser.id,
    },

    select: {
      board: true,
    },
  });

  const boards = collabBoards.map((collab) => collab.board);

  return (
    <>
      {collabBoards.length === 0 ? (
        <div className='mt-16'>
          <p className='text-zinc-400 text-center '>
            You have no collaborations.
          </p>
        </div>
      ) : (
        <AllBoards boards={boards} sessionUserId={sessionUser.id} />
      )}
    </>
  );
};
export default Page;
