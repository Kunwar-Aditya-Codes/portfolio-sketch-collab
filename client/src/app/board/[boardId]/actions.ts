'use server';

import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateBoardImage = async ({
  boardId,
  imageUrl,
}: {
  boardId: string;
  imageUrl: string;
}) => {
  await db.boards.update({
    where: { id: boardId },
    data: {
      image: imageUrl,
    },
  });

  revalidatePath('/dashboard');
  return { success: true };
};

export const addCollaborator = async ({
  emailToAdd,
  boardId,
}: {
  emailToAdd: string;
  boardId: string;
}) => {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();
  if (!sessionUser?.id) redirect('/');

  try {
    const foundUser = await db.user.findFirst({
      where: {
        email: emailToAdd,
      },
    });

    if (!foundUser) throw new Error('User does not exist!');

    await db.collaborators.create({
      data: {
        boardId,
        userId: foundUser.id,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: 'Something went wrong!' };
    }
  }
};
