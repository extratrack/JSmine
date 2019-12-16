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

    set canvas(canvas){
        this._canvas = canvas
    }

    get canvas(){
        return this._canvas;
        
    }  
}

function start(level){
    init();
    resizeCanvasByLevel(level);
}

function init(){
    // マス保持クラス生成
    const maskedCells = new MaskedCells();
    const openedCells = new OpenedCells();

    // Canvas設定
    Const.canvas = document.getElementById("minesweeper");
}

// 難易度に合わせてキャンバスをリサイズ
function resizeCanvasByLevel(gameLevel){
    const width = gameLevel === 1 ? Const.BASIC_WIDTH
                : gameLevel === 2 ? Const.EXPERT_WIDTH
                : Const.MASTER_WIDTH;
    const height = gameLevel === 1 ? Const.BASIC_HEIGHT
                 : gameLevel === 2 ? Const.EXPERT_HEIGHT
                 : Const.MASTER_HEIGHT;

    Const.canvas.width = width * Const.CELL_SIZE;
    Const.canvas.height = height * Const.CELL_SIZE;
}