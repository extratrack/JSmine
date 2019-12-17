// 定数クラス
class Const{
    // マウスイベント用
    static LEFT_CLICK = 0;
    static RIGHT_CLICK = 2;

    // セルサイズ
    static CELL_SIZE = 30;

    // 難易度ごとの情報
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

// ゲーム進行を管理するクラス
class Main{
    constructor(gameLevel){
        this.setConstValue(gameLevel);

        this.minesCells = new MinesCells();
        this.maskedCells = new MaskedCells();
    }

    // 闇のゲーム
    start(){
        this.initCanvas();
        this.setMinesPosition();
        this.addListener();
    }

    // イベントリスナー追加
    addListener(){
        // 旗のために右クリックに犠牲になってもらう
        Const.CANVAS.addEventListener("contextmenu", function(e){e.preventDefault();}, false);
        Const.CANVAS.addEventListener("click", this.openCell(event), false);
    }

    // Canvas内描写
    initCanvas(){
        this.resizeCanvasByLevel();
        this.drawCellsByLevel();
    }

    // 初期設定(初期生成？)
    setConstValue(gameLevel){
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
    resizeCanvasByLevel(){
        Const.CANVAS.width = Const.COLUMN * Const.CELL_SIZE;
        Const.CANVAS.height = Const.ROW * Const.CELL_SIZE;
    }

    // 難易度に合わせてセルを描画
    drawCellsByLevel(){
        const context = Const.CANVAS.getContext("2d");
        context.fillStyle = "rgb(160, 160, 160)";

        for(let row = 0; row < Const.ROW; row++){
            for(let col = 0; col < Const.COLUMN; col++){
                context.fillRect(col * Const.CELL_SIZE, row * Const.CELL_SIZE, Const.CELL_SIZE - 1, Const.CELL_SIZE - 1);
            }
        }
    }

    // 地雷の位置設定
    setMinesPosition(){
        this.minesCells.setMinesPosition();
    }

    // セルオープン処理
    openCell(e){
        let mouseClickX = e.pageX;
        let mouseClickY = e.pageY;

        this.maskedCells.openCell(mouseClickX, mouseClickY);
    }
}

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

    // マスをオープン
    openCell(x, y){
        if(y < 24){
            return;
        }

        let row = Math.floor(x / Const.CELL_SIZE);
        let col = Math.floor(y / Const.CELL_SIZE);

        let isOpened = this.cells[row][col];
        
        // マスがオープンされていない場合オープン
        if(!isOpened){
            this.Cells[row][col] = !this.Cells[row][col];
            this.drawCells();
        }
    }

    drawCells(){
        documebnt.write("ussu");
    }
}

// 地雷関連のマス情報を保持するクラス
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

    // 地雷を設置
    setMinesPosition(){
        let notPutMines = Const.MINES;
        while(notPutMines){
            let putMinesRow = Math.floor(Math.random() * Const.ROW);
            let putMinesColumn = Math.floor(Math.random() * Const.COLUMN);
            let isNotPutMines = this.cells[putMinesRow][putMinesColumn];
    
            if(!isNotPutMines){
                this.cells[putMinesRow][putMinesColumn] = Const.MINE_NUMBER;
                notPutMines--;
            }
        }
    }
}

// ゲーム開始
function start(gameLevel){
    let main = new Main(gameLevel);
    main.start();
}