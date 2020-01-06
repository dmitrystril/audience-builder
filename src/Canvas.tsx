import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Game from './Game';

const CustomCanvas = styled.canvas`
  background-color: black;
`;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    let game: Game;

    if (context) {
      let parentWidth = canvasRef?.current?.parentElement?.clientWidth;
      let parentHeight = canvasRef?.current?.parentElement?.clientHeight;

      const canvasWidth = parentWidth ? parentWidth : 800;
      const canvasHeight = parentHeight ? parentHeight : 600;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      game = new Game(context, canvasWidth, canvasHeight, 12, 15, 100);
      game.start();
    }

    return () => {
      game.end();
    };
  }, []);

  return (
    <CustomCanvas ref={canvasRef} />
  );
};

export default Canvas;
