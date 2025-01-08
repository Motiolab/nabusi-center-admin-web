import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = "redirectUrlAfterLogin"

const getInitialState = (): string => {
    return "";
};

export const redirectUrlAfterLoginSlice = createSlice({
    name: 'redirectUrlAfterLogin',
    initialState: getInitialState(),
    reducers: {
        setRedirectUrlAfterLogin: (state, action) => action.payload
    }
});

export const { setRedirectUrlAfterLogin, } = redirectUrlAfterLoginSlice.actions;
export default redirectUrlAfterLoginSlice.reducer;
export { LOCAL_STORAGE_KEY }