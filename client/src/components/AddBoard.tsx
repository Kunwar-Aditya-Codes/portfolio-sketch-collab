'use client';

import { createBoard } from '@/app/dashboard/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const AddBoard = ({ sessionUserId }: { sessionUserId: string }) => {
  const [title, setTitle] = useState<string>('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['add-board'],
    mutationFn: createBoard,
    onSuccess: ({ success }) => {
      if (success === true) {
        toast.success('Board created successfully!', {
          duration: 1000,
        });
        setTitle('');
      }
    },

    onError: () => {
      toast.error('Something went wrong! Try again.', {
        duration: 1000,
      });
    },
  });

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || title.length === 0) {
      return;
    }
    mutate({ kindeId: sessionUserId, title });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-x-1'>
          <Plus className='size-4' />
          <span>New board</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-zinc-950 text-zinc-200'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Create board</DialogTitle>
        </DialogHeader>
        <div className='mt-4 '>
          <form className='flex flex-col gap-y-4' onSubmit={handleForm}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              name='title'
              placeholder='Enter board title'
              className='p-2.5 bg-zinc-900 outline-none border-none rounded-lg text-sm'
            />
            <Button
              disabled={isPending}
              type='submit'
              className='w-[5rem] bg-zinc-200 text-zinc-950 hover:bg-white'
              size={'sm'}
            >
              {isPending ? (
                <Loader2 className='size-5 animate-spin text-zinc-900' />
              ) : (
                'Create'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddBoard;
