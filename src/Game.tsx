type Array2D = number[][];

class Game {
  private context: CanvasRenderingContext2D;
  private rowAmount: number;
  private columnAmount: number;
  private cellSize: number;
  private initialExistenceProbability: number;
  private generationInterval: number;
  private intervalId: number = NaN;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellSize = 5,
    initialExistenceProbability = 20,
    generationInterval: number = 1000,
  ) {
    this.context = context;
    this.rowAmount = height / cellSize;
    this.columnAmount = width / cellSize;
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

  public end = () => {
    clearInterval(this.intervalId);
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

        if (gameMatrix[i][k] === 0 && adjucentAliveCellsCount === 3) {
          gameMatrix[i][k] = 1;
        } else if (gameMatrix[i][k] === 1 && (adjucentAliveCellsCount < 2 || adjucentAliveCellsCount > 3)) {
          gameMatrix[i][k] = 0;
        }
      }
    }

    return gameMatrix;
  };

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
    this.context.fillStyle = (state === 0 ? 'black' : 'white');
    this.context.arc(x + this.cellSize / 2, y + this.cellSize / 2, this.cellSize / 2, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.stroke();
  }
};

export default Game;
