import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const TOTAL_MARGIN = 44;

const CustomCanvas = styled.canvas`
  border: 2px dashed blue;
  background-color: red;
  margin: 20px;
`;

const drawCanvas = (context: CanvasRenderingContext2D) => {
  context.lineWidth = 1;
  context.strokeStyle = "blue";
  context.rect(5, 5, 290, 140);
  context.fillStyle = 'lightblue';
  context.fillRect(5, 5, 290, 140);
  context.stroke();
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
      let parentWidth = canvasRef?.current?.parentElement?.clientWidth;
      let parentHeight = canvasRef?.current?.parentElement?.clientHeight || 600;
      canvas.width = parentWidth ? parentWidth - TOTAL_MARGIN : 800;
      canvas.height = parentHeight ? parentHeight - TOTAL_MARGIN : 800;
      drawCanvas(context);
    }
  }, []);

  return (
    <CustomCanvas ref={canvasRef} />
  );
};

export default Canvas;
