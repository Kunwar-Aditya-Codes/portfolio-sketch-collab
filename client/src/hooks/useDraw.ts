import { useEffect, useState, useRef } from 'react';

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
  handleSave: () => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);
  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = () => setMouseDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleSave();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const currentPoint = { x, y };

      const ctx = canvas.getContext('2d');
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const mouseUpHandler = () => {
      if (!mouseDown) return;
      setMouseDown(false);
      prevPoint.current = null;
      handleSave();
    };

    // canvasRef.current?.addEventListener('mousemove', handler);
    // window.addEventListener('mouseup', mouseUpHandler);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handler);
      canvas.addEventListener('mouseup', mouseUpHandler);
    }
    return () => {
      // canvasRef.current?.removeEventListener('mousemove', handler);
      // window.removeEventListener('mouseup', mouseUpHandler);

      if (canvas) {
        canvas.removeEventListener('mousemove', handler);
        canvas.removeEventListener('mouseup', mouseUpHandler);
      }
    };
  }, [onDraw, handleSave, mouseDown]);

  return { canvasRef, onMouseDown, clear };
};
