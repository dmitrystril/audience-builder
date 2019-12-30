import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface CanvasProps {
  width: number;
  height: number;
}

const CustomCanvas = styled.canvas`
  border: 2px dashed blue;
  margin: 0 20px;
`;

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = 'lightblue';
      context.fillRect(10, 10, 150, 100);
    }
  }, []);

  return (
    <CustomCanvas
      ref={canvasRef}
      height={height}
      width={width}
    />
  );
};

Canvas.defaultProps = {
  width: window.innerWidth - 500,
  height: window.innerHeight,
};

export default Canvas;
