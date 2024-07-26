'use client';

import { Boards } from '@prisma/client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Loader2, Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { deleteBoard } from '@/app/dashboard/actions';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

const AllBoards = ({
  boards,
  sessionUserId,
}: {
  boards: Boards[];
  sessionUserId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-board'],
    mutationFn: deleteBoard,
    onSuccess: ({ success }) => {
      if (success) {
        toast.success('Board deleted successfully!', { duration: 1000 });
      }
    },
  });

  const handleDelete = ({ boardId }: { boardId: string }) => {
    mutate({ boardId });
  };

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    boardId: string
  ) => {
    setInputValues({
      ...inputValues,
      [boardId]: e.target.value,
    });
  };

  const isInputValid = (boardId: string, boardTitle: string) => {
    return inputValues[boardId] === boardTitle;
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-12'>
      {boards.map((board) => (
        <div key={board.id} className='border border-zinc-800 rounded-xl '>
          <Link href={`/board/${board.id}`} className=' '>
            <div className='h-[10rem] object-cover border-0 rounded-t-lg hover:border-[0.5px] hover:border-zinc-500  object-center'>
              {board.image !== null && (
                <img src={board.image} alt={board.title} className=' h-full ' />
              )}
            </div>
          </Link>

          <div className='bg-zinc-900 flex items-center justify-between rounded-b-xl gap-y-px p-3'>
            <div className='flex flex-col gap-y-px'>
              <span className=' text-zinc-200'>{board.title}</span>
              <span className='text-sm text-zinc-400'>
                {format(new Date(board.createdAt), 'MM/dd/yyyy')}
              </span>
            </div>

            {sessionUserId === board.userId ? (
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      className='hover:bg-zinc-800'
                    >
                      <Trash className='size-4 text-red-600' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='bg-zinc-950 text-zinc-200'>
                    <DialogHeader>
                      <DialogTitle className='text-2xl text-red-600 font-bold'>
                        Danger Zone
                      </DialogTitle>
                      <DialogDescription className='text-zinc-400'>
                        This action can&apos;t be revert back and will delete
                        all your board data.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='mt-4 '>
                      <label htmlFor='boardTitle' className='text-zinc-400'>
                        Enter title{' '}
                        <strong className='text-zinc-100 mx-1.5'>
                          {board.title}
                        </strong>
                        in the input field to delete the board .
                      </label>

                      <input
                        type='text'
                        name='boardTitle'
                        value={inputValues[board.id] || ''}
                        onChange={(e) => handleInputChange(e, board.id)}
                        className='bg-transparent border w-full p-2 mt-2.5 rounded-md border-zinc-700'
                      />
                    </div>
                    <div className='mt-4 flex justify-end'>
                      <Button
                        disabled={
                          !isInputValid(board.id, board.title) || isPending
                        }
                        onClick={() =>
                          handleDelete({
                            boardId: board.id,
                          })
                        }
                        variant={'destructive'}
                        className='w-full'
                      >
                        {isPending ? (
                          <Loader2 className='size-5 animate-spin' />
                        ) : (
                          <span>Delete Board</span>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllBoards;
