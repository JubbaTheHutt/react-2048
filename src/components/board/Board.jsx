import Cell from './cell/Cell.jsx';
import s from './board.module.css';
import { useEffect } from 'react';
import Popup from './popup/Popup.jsx';
import cloneDeep from 'lodash.clonedeep';
import NewGameBtn from '../common/NewGameBtn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setScore } from '../../redux/mainReducer.jsx';
import PropTypes from 'prop-types';

const Board = ({ addRandom, score, newGame, popupActive, setPopupActive }) => {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.mainReducer.board);

    useEffect(() => {
        moveTiles();
    }, []);

    const moveTiles = (direction) => {
        const newBoard = cloneDeep(board);

        switch (direction) {
            case 'left':
                moveLeft(newBoard);
                break;
            case 'right':
                moveRight(newBoard);
                break;
            case 'up':
                moveUp(newBoard);
                break;
            case 'down':
                moveDown(newBoard);
                break;
            default:
                break;
        }

        addRandom(newBoard);
    };

    const moveLeft = (newBoard) => {
        for (let i = 0; i < 4; i++) {
            let row = newBoard[i];
            for (let j = 0; j < 4; j++) {
                if (row[j] !== 0) {
                    for (let k = 0; k < j; k++) {
                        if (
                            (row[k] === row[j] && row[k + 1] === 0) ||
                            (row[k] === row[j] && row[k + 1] === row[j])
                        ) {
                            row[k] *= 2;
                            if (
                                row[k] === row[j + 1] ||
                                row[k] === row[j + 2]
                            ) {
                                row[j] = row[j + 1];
                                row[j + 1] = 0;
                            } else {
                                row[j] = 0;
                            }
                            dispatch(setScore(score + row[k]));
                            break;
                        } else if (row[k] === 0) {
                            row[k] = row[j];
                            row[j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    };

    const moveRight = (newBoard) => {
        for (let i = 0; i < 4; i++) {
            let row = newBoard[i];
            for (let j = 3; j >= 0; j--) {
                if (row[j] !== 0) {
                    for (let k = 3; k > j; k--) {
                        if (
                            (row[k] === row[j] && row[k - 1] === 0) ||
                            (row[k] === row[j] && row[k - 1] === row[j])
                        ) {
                            row[k] *= 2;
                            if (
                                row[k] === row[j - 1] ||
                                row[k] === row[j - 2]
                            ) {
                                row[j] = row[j - 1];
                                row[j - 1] = 0;
                            } else {
                                row[j] = 0;
                            }
                            dispatch(setScore(score + row[k]));
                            break;
                        } else if (row[k] === 0) {
                            row[k] = row[j];
                            row[j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    };

    const moveUp = (newBoard) => {
        for (let j = 0; j < 4; j++) {
            let column = [
                newBoard[0][j],
                newBoard[1][j],
                newBoard[2][j],
                newBoard[3][j],
            ];

            for (let i = 1; i < 4; i++) {
                if (column[i] !== 0) {
                    for (let k = 0; k < i; k++) {
                        if (column[k] === 0) {
                            column[k] = column[i];
                            column[i] = 0;
                            break;
                        } else if (
                            (column[k] === column[i] && column[k + 1] === 0) ||
                            (column[k] === column[i] &&
                                column[k + 1] === column[i])
                        ) {
                            column[k] *= 2;
                            if (
                                column[k] === column[i + 1] ||
                                column[k] === column[i + 2]
                            ) {
                                column[i] = column[i + 1];
                                column[i + 1] = 0;
                            } else {
                                column[i] = 0;
                            }
                            dispatch(setScore(score + column[k]));
                            break;
                        }
                    }
                }
            }
            newBoard[0][j] = column[0];
            newBoard[1][j] = column[1];
            newBoard[2][j] = column[2];
            newBoard[3][j] = column[3];
        }
    };

    const moveDown = (newBoard) => {
        for (let j = 0; j < 4; j++) {
            let column = [
                newBoard[0][j],
                newBoard[1][j],
                newBoard[2][j],
                newBoard[3][j],
            ];
            for (let i = 3; i >= 0; i--) {
                if (column[i] !== 0) {
                    for (let k = 3; k > i; k--) {
                        if (
                            (column[k] === column[i] && column[k - 1] === 0) ||
                            (column[k] === column[i] &&
                                column[k - 1] === column[i])
                        ) {
                            column[k] *= 2;
                            if (
                                column[k] === column[i - 1] ||
                                column[k] === column[i - 2]
                            ) {
                                column[i] = column[i - 1];
                                column[i - 1] = 0;
                            } else {
                                column[i] = 0;
                            }
                            dispatch(setScore(score + column[k]));
                            break;
                        } else if (column[k] === 0) {
                            column[k] = column[i];
                            column[i] = 0;
                            break;
                        }
                    }
                }
            }
            newBoard[0][j] = column[0];
            newBoard[1][j] = column[1];
            newBoard[2][j] = column[2];
            newBoard[3][j] = column[3];
        }
    };

    useEffect(() => {
        const handleUserInput = (e) => {
            switch (e.keyCode) {
                case 37:
                case 65:
                    moveTiles('left');
                    break;
                case 38:
                case 87:
                    moveTiles('up');
                    break;
                case 39:
                case 68:
                    moveTiles('right');
                    break;
                case 40:
                case 83:
                    moveTiles('down');
                    break;
                case 82:
                    newGame();
                    break;
                case 27:
                    setPopupActive(false);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleUserInput);
        return () => window.removeEventListener('keydown', handleUserInput);
    }, [board]);

    return (
        <div className={s.boardContainer}>
            <div className={s.board}>
                {board.map((item) => {
                    return item.map((val, idx) => (
                        <Cell key={`cell-${idx}`} value={val} />
                    ));
                })}
            </div>

            <Popup active={popupActive} setActive={setPopupActive}>
                <div className={s.popup}>
                    <div className={s.gameOver}>
                        <span>GAME OVER</span>
                    </div>
                    <div className={s.restart}>
                        <NewGameBtn newGame={newGame} />
                        <p className={s.info}>
                            Press "New Game" button or "R" on your keyboard to
                            restart <br /> Press "ESC" to close popup
                        </p>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

Board.propTypes = {
    popupActive: PropTypes.bool,
    score: PropTypes.number,
    newGame: PropTypes.func,
    addRandom: PropTypes.func,
    setPopupActive: PropTypes.func,
};

export default Board;
