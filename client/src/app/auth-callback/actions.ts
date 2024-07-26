'use server';

import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();
  if (!sessionUser?.email || !sessionUser.id) throw new Error('Not logged in!');

  const existingUser = await db.user.findFirst({
    where: {
      id: sessionUser.id,
    },
  });

  if (!existingUser) {
    const username = `${sessionUser.given_name} ${sessionUser.family_name}`;
    await db.user.create({
      data: {
        id: sessionUser.id,
        username,
        email: sessionUser.email,
      },
    });
  }

  return { success: true };
};
