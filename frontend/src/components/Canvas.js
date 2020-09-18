import React, { useRef, useEffect } from 'react';

const Canvas = props => {

  const { cornersForDraw, ...rest} = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawAxis(context, canvas);
  }, []);

  useEffect(() => {
    if (cornersForDraw.length > 0){
      drawAxis(canvasRef.current.getContext('2d'), canvasRef.current);
      draw(canvasRef.current.getContext('2d'));
    }
  }, [cornersForDraw]);

  const draw = (ctx) => {
    ctx.beginPath();
    let x = ctx.canvas.width / 2;
    let y = ctx.canvas.height / 2;
    const scale = 10;
    ctx.moveTo(x, y);
    for(let i = 0; i < cornersForDraw.length - 1; i++){
      ctx.moveTo(x + cornersForDraw[i].x * scale, y - cornersForDraw[i].y * scale);
      ctx.lineTo(x + cornersForDraw[i + 1].x * scale, y - cornersForDraw[i + 1].y * scale);
      ctx.stroke();
    }
    ctx.moveTo(x + cornersForDraw[cornersForDraw.length - 1].x * scale, y - cornersForDraw[cornersForDraw.length - 1].y * scale);
    ctx.lineTo(x + cornersForDraw[0].x * scale, y - cornersForDraw[0].y * scale);
    ctx.stroke();
  }

  const drawAxis = (context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    let x = (canvas.width / 2) + 10;
    let y = (canvas.height / 2);
    context.moveTo(x, y);
    context.lineTo(x, y - 3);
    context.moveTo(x, y);
    context.lineTo(x, y + 3)
    x = (canvas.width / 2);
    y = (canvas.height / 2) - 10;
    context.moveTo(x, y);
    context.lineTo(x + 3, y);
    context.moveTo(x, y);
    context.lineTo(x - 3, y);
    context.stroke();
  }

  const canvasRef = useRef(null);
  

  return <canvas ref = {canvasRef} {...rest}/>
}

export default Canvas;