import { configureStore } from "@reduxjs/toolkit";
import workSlice from './reducers/workSlice'

const store = configureStore({
    reducer: {
        works: workSlice,
    },
})

export default store