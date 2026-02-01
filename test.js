const board = document.querySelector(".board");
const width = 6;
const heigth = 6;

let widthArray = [];
let boardArray = [];
const colors = ["red", "yellow", "green", "blue"];


class Cell {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.div = this.createCell();
    }

    createCell() {
        let addDiv = document.createElement("div");

        addDiv.classList.add("cell");
        addDiv.style.backgroundColor = this.color;
        board.appendChild(addDiv);

        addDiv.onclick = () => {
            this.deleteCells();
        }

        return addDiv;
    }

    deleteCells(){
        let check = [];
        this.findCells(this.x, this.y, check, this.color);

        if(check.length >= 3){
            check.forEach((item, index) => {
                check[index].div.classList.add("none");
            });
        }
    }

    findCells(x, y, array, color){

        if(x < 0 || x >= width || y < 0 || y >= heigth){
            return;
        }

        let current = boardArray[y][x];

        if(current.color != color || array.includes(current)){
            return;
        }
        
        array.push(current);

        this.findCells(x + 1, y, array, color);
        this.findCells(x - 1, y, array, color);
        this.findCells(x, y + 1, array, color);
        this.findCells(x, y - 1, array, color);

    }

    

}

function createBoard() {

    for (let i = 0; i < heigth; i++) {

        for (let j = 0; j < width; j++) {

            let random = Math.floor(Math.random() * 4);
            let newCell = new Cell(j, i, colors[random]);

            widthArray.push(newCell);

            if (widthArray.length === width) {
                boardArray.push(widthArray);
                widthArray = [];
            }
        }
    }

}
createBoard();