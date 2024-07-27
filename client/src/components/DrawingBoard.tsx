'use client';

import { updateBoardImage } from '@/app/board/[boardId]/actions';
import { useDraw } from '@/hooks/useDraw';
import { drawLine } from '@/lib/utils';
import { Boards, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { Wheel } from '@uiw/react-color';
import { ArrowLeft, Check, Loader2, Save, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AddCollaborators from './AddCollaborators';
import { Button } from './ui/button';

// Use appropriate URL for your socket server
const socket = io('https://draw-backend-zo82.onrender.com');

type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

const DrawingBoard = ({
  boardId,
  collaboratedUsers,
  board,
}: {
  boardId: string;
  board: Boards;
  collaboratedUsers: User[];
}) => {
  const [color, setColor] = useState<string>('#ffffff');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-image'],
    mutationFn: updateBoardImage,
  });

  const saveImageToDatabase = () => {
    const dataUrl = canvasRef.current?.toDataURL();
    if (dataUrl) {
      mutate({ boardId, imageUrl: dataUrl });
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    socket.emit('join-room', boardId);
    socket.emit('client-ready', boardId);

    socket.on('get-canvas-state', () => {
      const dataUrl = canvasRef.current?.toDataURL();
      if (dataUrl) {
        socket.emit('canvas-state', { boardId, state: dataUrl });
      }
    });

    socket.on('canvas-state-from-server', (state) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          ctx.drawImage(img, 0, 0);
        }
      };
    });

    socket.on(
      'draw-line',
      ({ color, currentPoint, prevPoint }: DrawLineProps) => {
        if (ctx) drawLine({ prevPoint, currentPoint, color, ctx });
      }
    );

    socket.on('clear', () => {
      clear();
    });

    return () => {
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('draw-line');
      socket.off('clear');
    };
  }, [canvasRef, boardId, clear]);

  useEffect(() => {
    if (board.image !== null) {
      const image = new Image();
      image.src = board.image;

      image.onload = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && canvasRef.current) {
          ctx?.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
          ctx.drawImage(
            image,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
        }
      };
    }
  }, [board.image, canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit('draw-line', { boardId, prevPoint, currentPoint, color });
    drawLine({ prevPoint, color, ctx, currentPoint });
  }

  return (
    <div className='overflow-hidden flex h-screen'>
      <div className='w-[18rem] pr-10 flex flex-col gap-y-8 h-full p-4 top-4'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-x-4'>
            <Link href={'/dashboard'}>
              <Button className='bg-zinc-900 rounded-md' size={'icon'}>
                <ArrowLeft className='size-5' />
              </Button>
            </Link>
            <Button
              onClick={saveImageToDatabase}
              className='bg-zinc-900 rounded-md'
              size={'icon'}
            >
              <Save className='size-5' />
            </Button>
          </div>
          <div className=' '>
            {isPending ? (
              <Loader2 className='size-5 animate-spin text-white' />
            ) : (
              <span className='font-light  italic text-zinc-400 flex items-center'>
                Last Saved at {board.updatedAt.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-9'>
          <div>
            <p className='text-zinc-100 font-semibold'>Collaborators</p>
            <div className='mt-2.5'>
              {collaboratedUsers.map((user) => (
                <p
                  key={user.id}
                  className='bg-zinc-900/60 text-center w-full p-2 rounded-md text-sm'
                >
                  {user.username}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className='text-zinc-100 font-semibold'>Brush Color</p>
            <div className='mt-2.5 flex items-center object-contain'>
              <Wheel
                color={color}
                width={150}
                height={150}
                className='bg-transparent text-white'
                onChange={(color) => setColor(color.hex)}
              />
            </div>
          </div>
          <div>
            <div className='flex items-center gap-x-2 mb-1'>
              <p className='text-zinc-100 font-semibold'>Actions</p>
            </div>
            <div className='mt-2 gap-y-2.5 flex flex-col'>
              <button
                onClick={() => {
                  socket.emit('clear', boardId);
                  clear();
                }}
                className='border border-zinc-800 font-semibold py-2 px-3 w-full rounded-md text-sm'
              >
                Clear
              </button>
              <AddCollaborators board={board} />
            </div>
          </div>
          <div className='bg-white text-zinc-950 p-2 rounded-md'>
            <p className='text-sm font-semibold'>
              <TriangleAlert className='size-5' />
              Save before closing to prevent data loss.
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={window.innerWidth - 316}
          height={window.innerHeight - 50}
          className='bg-zinc-950 border border-zinc-800 rounded-lg'
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
