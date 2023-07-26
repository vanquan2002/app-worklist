import { configureStore } from "@reduxjs/toolkit";
import workSlice from './reducers/workSlice'
import {actionTypes, firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

const store = configureStore({
    reducer: {
        works: workSlice,
        firebaseReducer,
        firestoreReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
        }
    }),
})

export default store