import { createSlice } from '@reduxjs/toolkit';
import { CreateUserModel } from './types';

const initialState: CreateUserModel = {
    mobile: '',
    countryCode: '82',
    username: '',
    centername: '',
    centerCode: '',
};

export const createUserSlice = createSlice({
    name: 'createUser',
    initialState: initialState,
    reducers: {
        setCreateUser: (state, action) => {
            state.mobile = action.payload.mobile;
            state.countryCode = action.payload.countryCode;
            state.username = action.payload.username;
            state.centername = action.payload.centername;
            state.centerCode = action.payload.centerCode;
        }
    }
});

export const { setCreateUser } = createUserSlice.actions;
export default createUserSlice.reducer;