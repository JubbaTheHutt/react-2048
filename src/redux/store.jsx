import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainReducer.jsx';

export default configureStore({
    reducer: {
        mainReducer,
    },
});
