type Array2D = number[][];

type Resolution = {
  width: number;
  height: number;
};

class Game {
  static ALIVE_CELL_COLOR = '#FFFFFF';
  static DEAD_CELL_COLOR = '#000000';

  private context: CanvasRenderingContext2D;
  private rowAmount: number;
  private columnAmount: number;
  private cellSize: number;
  private initialExistenceProbability: number;
  private generationInterval: number;
  private intervalId: number = NaN;

  constructor(
    context: CanvasRenderingContext2D,
    resolution: Resolution,
    cellSize = 12,
    initialExistenceProbability = 15,
    generationInterval: number = 100,
  ) {
    this.context = context;
    this.rowAmount = resolution.height / cellSize;
    this.columnAmount = resolution.width / cellSize;
    this.cellSize = cellSize;
    this.initialExistenceProbability = initialExistenceProbability;
    this.generationInterval = generationInterval;
  }

  public start = () => {
    let gameMatrix: Array2D = this.initMatrix();

    this.intervalId = setInterval(
      () => {
        this.drawScene(gameMatrix);
        gameMatrix = this.nextMatrix(gameMatrix);
      })
    , this.generationInterval;
  }

  private initMatrix = () => {
    let matrix: Array2D = [];

    for (let i = 0; i < this.columnAmount; i++) {
      let innerArray = [];
      for (let k = 0; k < this.rowAmount; k++) {
        const randomValue = Math.floor(Math.random() * Math.floor(this.initialExistenceProbability));
        innerArray.push(randomValue === 1 ? 1 : 0);
      }
      matrix.push(innerArray);
    }

    return matrix;
  }

  private nextMatrix = (gameMatrix: Array2D) => {
    for (let i = 0; i < this.columnAmount; i++) {
      for (let k = 0; k < this.rowAmount; k++) {
        const adjucentAliveCellsCount = this.getNumberOfAdjucentAliveCells(gameMatrix, i, k);

        if (this.shouldCellRevive(gameMatrix[i][k], adjucentAliveCellsCount)) {
          gameMatrix[i][k] = 1;
        } else if (this.shouldCellDie(gameMatrix[i][k], adjucentAliveCellsCount)) {
          gameMatrix[i][k] = 0;
        }
      }
    }

    return gameMatrix;
  };

  private shouldCellRevive = (cellValue: number, neightboursCount: number) => {
    return cellValue === 0 && neightboursCount === 3;
  }

  private shouldCellDie = (cellValue: number, neightboursCount: number) => {
    return cellValue === 1 && (neightboursCount < 2 || neightboursCount > 3);
  }

  private getNumberOfAdjucentAliveCells = (gameMatrix: Array2D, x: number, y: number) => {
    let count = 0;

    count += this.inArray(gameMatrix, x - 1, y - 1) ? gameMatrix[x - 1][y - 1] : 0;
    count += this.inArray(gameMatrix, x, y - 1) ? gameMatrix[x][y - 1] : 0;
    count += this.inArray(gameMatrix, x + 1, y - 1) ? gameMatrix[x + 1][y - 1] : 0;
    count += this.inArray(gameMatrix, x - 1, y) ? gameMatrix[x - 1][y] : 0;
    count += this.inArray(gameMatrix, x + 1, y) ? gameMatrix[x + 1][y] : 0;
    count += this.inArray(gameMatrix, x - 1, y + 1) ? gameMatrix[x - 1][y + 1] : 0;
    count += this.inArray(gameMatrix, x, y + 1) ? gameMatrix[x][y + 1] : 0;
    count += this.inArray(gameMatrix, x + 1, y + 1) ? gameMatrix[x + 1][y + 1] : 0;

    return count;
  }

  private inArray = (gameMatrix: Array2D, x: number, y: number) => {
    return (x >= 0 && x <= gameMatrix.length) && (y >= 0 && y <= gameMatrix[x].length);
  }

  private drawScene = (gameMatrix: Array2D) => {
    for (let i = 0; i < this.columnAmount; i++) {
      for (let k = 0; k < this.rowAmount; k++) {
        this.drawCell(i * this.cellSize, k * this.cellSize, gameMatrix[i][k]);
      }
    }
  }

  private drawCell = (
    x: number,
    y: number,
    state: number,
  ) => {
    this.context.beginPath();
    this.context.fillStyle = (state === 0 ? Game.DEAD_CELL_COLOR : Game.ALIVE_CELL_COLOR);
    this.context.arc(x + this.cellSize / 2, y + this.cellSize / 2, this.cellSize / 2, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.stroke();
  }

  public end = () => {
    clearInterval(this.intervalId);
  }
};

export default Game;
