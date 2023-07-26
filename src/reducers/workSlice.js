import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    workData: [],
    searchData: {},
    userData: null,
    workCompleted: [],
    workNotCompleted: []
}

const todoSlice = createSlice({
    name: 'works',
    initialState: initialState,
    reducers: {
        setWork(state, action) {
            state.workData = action.payload;
        },
        setSearch(state, action) {
            state.searchData = action.payload;
        },
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
export const { setWork, setSearch, setUser, setCompleted, setNotCompleted } = actions;
export default reducer;