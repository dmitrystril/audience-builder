import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const CustomCanvas = styled.canvas`
  border: 2px dashed blue;
  background-color: red;
  width: calc(100% - 44px);
  height: calc(100% - 44px);
  margin: 20px;
`;

const drawCanvas = (context: CanvasRenderingContext2D) => {
  context.fillStyle = 'lightblue';
  context.fillRect(10, 10, 100, 100);
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    const context = canvas.getContext('2d');
    if (context) {
      // canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight;
      drawCanvas(context);
    }
  }, []);

  return (
    <CustomCanvas ref={canvasRef} />
  );
};

export default Canvas;
