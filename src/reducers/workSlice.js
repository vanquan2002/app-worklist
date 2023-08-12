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
            const checkCompleted = action.payload.filter(work => work.data.completed === true);
            const checkNotCompleted = action.payload.filter(work => work.data.completed === false);
            state.workCompleted = checkCompleted
            state.workNotCompleted = checkNotCompleted
            state.workData = action.payload;
        },
        setSearch(state, action) {
            state.searchData = action.payload;
        },
        setUser(state, action) {
            state.userData = action.payload;
        },
    }
});

const { actions, reducer } = todoSlice;
export const { setWork, setSearch, setUser} = actions;
export default reducer;