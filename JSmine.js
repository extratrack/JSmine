// 開いていないマス情報を保持するクラス
class MaskedCells{
    constructor(){
       
    }
}

// 開いたマス情報を保持するクラス
class OpenedCells{
    constructor(){

    }
}

// 定数クラス
class Const{
    static CELL_SIZE = 30;

    // 難易度ごとのマス数
    static BASIC_WIDTH = 9;
    static BASIC_HEIGHT = 9;
    static EXPERT_WIDTH = 16;
    static EXPERT_HEIGHT = 16;
    static MASTER_WIDTH = 30;
    static MASTER_HEIGHT = 16;

    set CANVAS(canvas){
        this._canvas = canvas
    }

    get CANVAS(){
        return this._canvas;
        
    }
    
    set WIDTH(width){
        this._width = width;
    }

    get WIDTH(){
        return this._width;
    }

    set HEIGHT(height){
        this._height = height;
    }

    get HEIGHT(){
        return this._height;
    }
}

// 闇のゲーム
function start(level){
    init();
    resizeCanvasByLevel(level);
    drawCellsByLevel(level);
}

// 初期設定(初期生成？)
function init(){
    // マス保持クラス生成
    const maskedCells = new MaskedCells();
    const openedCells = new OpenedCells();

    // Canvas設定
    Const.CANVAS = document.getElementById("minesweeper");
}

// 難易度に合わせてキャンバスをリサイズ
function resizeCanvasByLevel(gameLevel){
    Const.WIDTH = gameLevel === 1 ? Const.BASIC_WIDTH
                : gameLevel === 2 ? Const.EXPERT_WIDTH
                : Const.MASTER_WIDTH;
    Const.HEIGHT = gameLevel === 1 ? Const.BASIC_HEIGHT
                 : gameLevel === 2 ? Const.EXPERT_HEIGHT
                 : Const.MASTER_HEIGHT;

    Const.CANVAS.width = Const.WIDTH * Const.CELL_SIZE;
    Const.CANVAS.height = Const.HEIGHT * Const.CELL_SIZE;
}

// 難易度に合わせてセルを描画
function drawCellsByLevel(gameLevel){
    const context = Const.CANVAS.getContext("2d");
    context.fillStyle = "rgb(200, 200, 200)";

    for(let row = 0; row < Const.HEIGHT; row++){
        for(let col = 0; col < Const.WIDTH; col++){
            context.fillRect(col * Const.CELL_SIZE, row * Const.CELL_SIZE, Const.CELL_SIZE - 1, Const.CELL_SIZE - 1);
        }
    }
}