import Sidebar from '../components/sidebar/Sidebar.jsx';
import Board from '../components/board/Board.jsx';
import {
    setHighestScore,
    setScore,
    updateBoard,
} from '../redux/mainReducer.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MainHoc = () => {
    const dispatch = useDispatch();

    const [popupActive, setPopupActive] = useState(false);
    const score = useSelector((state) => state.mainReducer.score);
    const highestScore = useSelector((state) => state.mainReducer.highestScore);

    const isFull = (newBoard) => {
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[0].length; j++) {
                if (newBoard[i][j] === 0) return false;
            }
        }
        return true;
    };

    useEffect(() => {
        if (highestScore < score) dispatch(setHighestScore(score));
    }, [score]);

    const newGame = () => {
        const newBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        addRandom(newBoard);
        dispatch(updateBoard(newBoard));
        dispatch(setScore(0));
        setPopupActive(false);
    };

    const addRandom = (newBoard) => {
        if (isFull(newBoard)) {
            setPopupActive(true);
            return;
        }

        let row, col;
        let created = false;

        while (!created) {
            row = Math.floor(Math.random() * newBoard.length);
            col = Math.floor(Math.random() * newBoard[0].length);

            if (newBoard[row][col] === 0) {
                newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
                dispatch(updateBoard(newBoard));
                created = true;
            }
        }
    };

    return (
        <>
            <Sidebar
                score={score}
                highestScore={highestScore}
                newGame={newGame}
            />
            <Board
                popupActive={popupActive}
                setPopupActive={setPopupActive}
                newGame={newGame}
                score={score}
                addRandom={addRandom}
            />
        </>
    );
};

export default MainHoc;
