import { createSlice } from "@reduxjs/toolkit";

const storeStudent = JSON.parse(localStorage.getItem('studentList')) || [];

const initialState = {
    students: storeStudent
};

export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.students.push({ ...action.payload, id: Date.now() });
        },
        deleteStudent: (state, action) => {
            state.students = state.students.filter(teacher => teacher.id !== action.payload);
        },
        updateStudent: (state, action) => {
            const index = state.students.findIndex(student => student.id === action.payload.id);
            if (index !== -1) {
                state.students[index] = { ...state.students[index], ...action.payload };
            }
        },
        deleteStudentsByClass: (state, action) => {
            const classStd = action.payload;
            state.students = state.students.filter(student => student.std !== classStd);
        }
    }
});

export const { addStudent, deleteStudent, updateStudent, deleteStudentsByClass } = studentSlice.actions;
export default studentSlice.reducer;