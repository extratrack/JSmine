// 開いていないマス情報を保持するクラス
class MaskedCells{
    constructor(){
        this.cells = [];
        for(let row = 0; row < Const.ROW; row++){
            this.cells[row] = [];
            for(let col = 0; col < Const.COLUMN; col++){
                this.cells[row][col] = 0;
            }
        }
    }
}

// 開いたマス情報を保持するクラス
class MinesCells{
    constructor(){
        this.cells = [];
        for(let row = 0; row < Const.ROW; row++){
            this.cells[row] = [];
            for(let col = 0; col < Const.COLUMN; col++){
                this.cells[row][col] = 0;
            }
        }
    }
}

// 定数クラス
class Const{
    static CELL_SIZE = 30;

    // 難易度ごとのマス数
    static BASIC_COLUMN = 9;
    static BASIC_ROW = 9;
    static BASIC_MINES = 9;
    static EXPERT_COLUMN = 16;
    static EXPERT_ROW = 16;
    static EXPERT_MINES = 40;
    static MASTER_COLUMN = 30;
    static MASTER_ROW = 16;
    static MASTER_MINES = 99;
    static MINE_NUMBER = 9;

    set CANVAS(canvas){
        this._canvas = canvas
    }

    get CANVAS(){
        return this._canvas;
        
    }
    
    set COLUMN(column){
        this._column = column;
    }

    get COLUMN(){
        return this._column;
    }

    set ROW(row){
        this._row = row;
    }

    get ROW(){
        return this._row;
    }

    set MINES(mines){
        this._mines = mines;
    }

    get MINES(){
        return this._mines;
    }
}

// ENum(雑)
class LevelEnum{
    static BASIC = 1;
    static EXPERT = 2;
    static MASTER = 3;
}

// 闇のゲーム
function start(level){
    setConstValue(level);

    initCanvas();

    let minesCells = createMinesCells();
    let maskedCells = createMaskedCells();
    
    setMinesPosition(minesCells);
}

// Canvas内描写
function initCanvas(){
    resizeCanvasByLevel();
    drawCellsByLevel();
}

function createMinesCells(){
    return new MinesCells();
}

// マス情報を保持するクラス作成
function createMaskedCells(){
    return new MaskedCells();
}

// 初期設定(初期生成？)
function setConstValue(gameLevel){
    // Canvas設定
    Const.CANVAS = document.getElementById("minesweeper");

    Const.COLUMN = gameLevel === LevelEnum.BASIC ? Const.BASIC_COLUMN
                 : gameLevel === LevelEnum.EXPERT ? Const.EXPERT_COLUMN
                 : Const.MASTER_COLUMN;
    Const.ROW = gameLevel === LevelEnum.BASIC ? Const.BASIC_ROW
              : gameLevel === LevelEnum.EXPERT ? Const.EXPERT_ROW
              : Const.MASTER_ROW;
    Const.MINES = gameLevel === LevelEnum.BASIC ? Const.BASIC_MINES
                : gameLevel === LevelEnum.EXPERT ? Const.EXPERT_MINES
                : Const.MASTER_MINES;
}

// 難易度に合わせてキャンバスをリサイズ
function resizeCanvasByLevel(){
    Const.CANVAS.width = Const.COLUMN * Const.CELL_SIZE;
    Const.CANVAS.height = Const.ROW * Const.CELL_SIZE;
}

// 難易度に合わせてセルを描画
function drawCellsByLevel(){
    const context = Const.CANVAS.getContext("2d");
    context.fillStyle = "rgb(160, 160, 160)";

    for(let row = 0; row < Const.ROW; row++){
        for(let col = 0; col < Const.COLUMN; col++){
            context.fillRect(col * Const.CELL_SIZE, row * Const.CELL_SIZE, Const.CELL_SIZE - 1, Const.CELL_SIZE - 1);
        }
    }
}

// 地雷の位置設定
function setMinesPosition(minesCells){
    let notPutMines = Const.MINES;
    while(notPutMines > 0){
        putMinesRow = Math.floor(Math.random() * Const.ROW);
        putMinesColumn = Math.floor(Math.random() * Const.COLUMN);

        if(minesCells.cells[putMinesRow][putMinesColumn] === 0){
            minesCells.cells[putMinesRow][putMinesColumn] = Const.MINE_NUMBER;
            notPutMines--;
        }
    }
}