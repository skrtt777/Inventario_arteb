import { useEffect, useRef } from 'react';

export default function Inventario() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Exemplo: desenhar uma grade leve no canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#e5e7eb'; // gray-200
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Você pode adicionar mais lógica aqui para desenhar itens etc.

  }, []);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300 rounded shadow-md"
      />
    </div>
  );
}
