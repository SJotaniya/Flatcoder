import { configureStore } from "@reduxjs/toolkit";
import classReducer from "../Slices/ClassSlice";
import teacherReducer from "../Slices/TeacherSlice";
import studentReducer from "../Slices/StudentSlice";

export const store = configureStore({
    reducer: {
        classrooms : classReducer,
        teachers : teacherReducer,
        students : studentReducer
    },
});

export default store;