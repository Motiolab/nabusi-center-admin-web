import { configureStore } from '@reduxjs/toolkit';
import { createUserSlice } from '@/entities/createUser/model/reducer';
import { roleFunctionListSlice } from '@/entities/rolefunctionlist/model/reducer';
import { selectedCenterIdSlice } from '@/entities/selectedCenterId/model/reducer';
import { redirectUrlAfterLoginSlice } from '@/entities/redirectUrlAfterLogin/model/reducer';


export const store = configureStore({
    reducer: {
        createUser: createUserSlice.reducer,
        roleFunctionList: roleFunctionListSlice.reducer,
        selectedCenterId: selectedCenterIdSlice.reducer,
        redirectUrlAfterLogin: redirectUrlAfterLoginSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;