import { createSlice } from "@reduxjs/toolkit";

const storeTeacher = JSON.parse(localStorage.getItem('teacherList')) || [];

const initialState = {
    teachers: storeTeacher
};

export const teacherSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        addTeacher: (state, action) => {
            state.teachers.push({ ...action.payload, id: Date.now() });
        },
        deleteTeacher: (state, action) => {
            state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload);
        },
        updateTeacher: (state, action) => {
            const index = state.teachers.findIndex(teacher => teacher.id === action.payload.id);
            if (index !== -1) {
                state.teachers[index] = { ...state.teachers[index], ...action.payload };
            }
        }
    }
});

export const { addTeacher, deleteTeacher, updateTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;