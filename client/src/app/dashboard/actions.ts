'use server';

import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createBoard = async ({
  kindeId,
  title,
}: {
  kindeId: string;
  title: string;
}) => {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();
  if (!sessionUser?.id) redirect('/');

  await db.boards.create({
    data: {
      title,
      userId: kindeId,
    },
  });

  revalidatePath('/dashboard');

  return { success: true };
};

export const deleteBoard = async ({ boardId }: { boardId: string }) => {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();
  if (!sessionUser?.id) redirect('/');

  await db.$transaction(async (prisma) => {
    await prisma.collaborators.deleteMany({
      where: {
        boardId,
      },
    });

    await prisma.boards.delete({
      where: {
        id: boardId,
      },
    });
  });

  revalidatePath('/dashboard');
  return { success: true };
};
