'use client';

import { Boards } from '@prisma/client';
import { Button } from './ui/button';
import { Loader2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addCollaborator } from '@/app/board/[boardId]/actions';
import { toast } from 'sonner';

const AddCollaborators = ({ board }: { board: Boards }) => {
  const [email, setEmail] = useState<string>('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['add-collaborator'],
    mutationFn: addCollaborator,

    onSuccess: (data) => {
      if (data.success === true) {
        toast.success('Collaborator added successfully!', {
          duration: 1000,
        });
        setEmail('');
      } else if (data.success === false) {
        toast.error(data.error, {
          duration: 1000,
        });
      }
    },

    onError: () => {
      toast.error('Something went wrong! Try again.', {
        duration: 1000,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || email.length === 0) return;

    mutate({
      emailToAdd: email,
      boardId: board.id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <p className='border border-zinc-800 font-semibold py-2 px-3 w-full rounded-md text-sm'>
          Add collaborator
        </p>
      </DialogTrigger>
      <DialogContent className='bg-zinc-950 text-zinc-200'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Add Collaborator</DialogTitle>
        </DialogHeader>
        <div className='mt-4 '>
          <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='title'
              placeholder='Enter email'
              className='p-2.5 bg-zinc-900 outline-none border-none rounded-lg text-sm'
            />
            <Button
              disabled={isPending}
              type='submit'
              className='w-[4rem] bg-zinc-200 text-zinc-950 hover:bg-white'
              size={'sm'}
            >
              {isPending ? (
                <Loader2 className='size-5 animate-spin text-zinc-900' />
              ) : (
                'Add'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddCollaborators;
