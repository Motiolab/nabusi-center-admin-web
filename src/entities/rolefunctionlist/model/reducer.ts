import { createSlice } from '@reduxjs/toolkit';

const initialState: Array<IRoleFunction> = [];

export const roleFunctionListSlice = createSlice({
    name: 'roleFunctionList',
    initialState: initialState,
    reducers: {
        setRoleFunctionList: (state, action) => state = action.payload
    }
});

export const { setRoleFunctionList } = roleFunctionListSlice.actions;
export default roleFunctionListSlice.reducer;