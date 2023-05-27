import { createSlice } from '@reduxjs/toolkit';

export const mainReducer = createSlice({
    name: 'main',
    initialState: {
        board: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        score: 0,
        highestScore: 0,
    },
    reducers: {
        updateBoard: (state, action) => {
            state.board = action.payload;
        },
        setScore: (state, action) => {
            state.score = action.payload;
        },
        setHighestScore: (state, action) => {
            state.highestScore = action.payload;
        },
    },
});

export const { updateBoard, setScore, setHighestScore } = mainReducer.actions;
export default mainReducer.reducer;
