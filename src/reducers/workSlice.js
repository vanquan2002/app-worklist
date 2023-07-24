import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    workCompleted: [],
    workNotCompleted: []
}

const todoSlice = createSlice({
    name: 'works',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.userData = action.payload;
        },
        setCompleted(state, action) {
            state.workCompleted = action.payload;
        },
        setNotCompleted(state, action) {
            state.workNotCompleted = action.payload;
        },
    }
});

const { actions, reducer } = todoSlice;
export const { setUser, setCompleted, setNotCompleted } = actions;
export default reducer;