import {useState} from "react"
import './Board.css';
import { useEffect } from "react";

class LinkedListNode{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList{
    constructor(value){
        const node = new LinkedListNode(value);
        this.head = node;
        this.tail = node;

    }
}
const Direction={
    UP:'UP',
    RIGHT:'RIGHT',
    DOWN:'DOWN',
    LEFT:'LEFT'
}





const BOARD_SIZE = 10;

const Board = () =>{
const [board,setBoard] = useState(createBoard(BOARD_SIZE));
//every number in this set is cell that is a snake body, start at 44
const[snakeCells, setSnakeCells] = useState(new Set([44]))
const[snake, setSnake] = useState(new SinglyLinkedList(44))
const[direction, setDirection] = useState(Direction.RIGHT)

useEffect(()=>{
    setInterval(()=>{

    }, 1000);





window.addEventListener('keydown', e => {
    const newDirection = getDirectionFromKey(e.key);
    const isValidDirection = newDirection !== '';
    if(isValidDirection) setDirection(newDirection);
})
}, []);

function moveSnake(){
const currentHeadCoords ={
    row: snake.head.value.row,
    col: snake.head.value.col,
};

const nextHeadCoords = getNextHeadCoords(currentHeadCoords, direction);
const nextHeadValue = board[nextHeadCoords.row][nextHeadCoords.col];
const newHead = new LinkedListNode(
    new Cell(nextHeadCoords.row, nextHeadCoords.col, nextHeadValue),
);

const newSnakeCells = new Set(snakeCells);
newSnakeCells.delete(snake.tail.value.value);
newSnakeCells.add(nextHeadValue);

snake.head = newHead


}

const getNextHeadCoords = (currentHeadCoords, direction) =>{
    switch (direction) {
        case Direction.UP:
            return {
                row: currentHeadCoords.row - 1,
                col: currentHeadCoords.col
            };
        case Direction.RIGHT:
            return {
                row: currentHeadCoords.row,
                col: currentHeadCoords.col + 1
            };
        case Direction.DOWN:
            return {
                row: currentHeadCoords.row + 1,
                col: currentHeadCoords.col
            };
        case Direction.LEFT:
            return {
                row: currentHeadCoords.row,
                col: currentHeadCoords.col - 1
            };
        default:
            return currentHeadCoords; // or handle the default case as required
    }
}

return (
<>
<button onClick = {()=> moveSnake()}>Move test</button>
<div className="board">
{board.map((row, rowIdx) => (
    <div key = {rowIdx} className = "row">{
        row.map((cellValue, cellIdx) =>(
            <div
            key = {cellIdx}
            className={`cell 
            ${snakeCells.has(cellValue) ? 'snake-cell' : ''}`}></div>
        ))
    }</div>
))}


</div>
</>

)



}
const createBoard = BOARD_SIZE =>{
    let counter =1;
    const board = [];
    for(let row = 0; row < BOARD_SIZE; row++){
        const currentRow = []
        for (let col = 0; col < BOARD_SIZE; col++){
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board;
}
const getDirectionFromKey = key =>{
    switch (key) {
        case 'ArrowUp':
            return Direction.UP;
        case 'ArrowDown':
            return Direction.DOWN;
        case 'ArrowLeft':
            return Direction.LEFT;
        case 'ArrowRight':
            return Direction.RIGHT;
        default:
            return ''; 
    }
}
export default Board