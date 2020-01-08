import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Game from './Game';

const CustomCanvas = styled.canvas`
  background-color: black;
`;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const DEFAULT_RESOLUTION = {
    width: 800,
    height: 600,
  };

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

      const canvasWidth = parentWidth ? parentWidth : DEFAULT_RESOLUTION.width;
      const canvasHeight = parentHeight ? parentHeight : DEFAULT_RESOLUTION.height;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      game = new Game(
        context,
        {
          width: canvasWidth,
          height: canvasHeight,
        },
      );
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
