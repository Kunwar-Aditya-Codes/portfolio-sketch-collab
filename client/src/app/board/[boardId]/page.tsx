import { db } from '@/db';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const DynamicBoard = dynamic(() => import('@/components/DrawingBoard'), {
  ssr: false,
});

const Page = async ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  const boardId = params.boardId;

  const board = await db.boards.findFirst({
    where: {
      id: boardId,
    },
    include: {
      user: true,
      Collaborators: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!board) redirect('/dashboard');

  const collaboratedUsers = board.Collaborators.map((collab) => collab.user);

  return (
    <div className='min-h-screen overflow-hidden bg-zinc-950 text-white'>
      <DynamicBoard
        boardId={boardId}
        board={board}
        collaboratedUsers={collaboratedUsers}
      />
    </div>
  );
};
export default Page;
