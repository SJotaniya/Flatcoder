import { createSlice } from "@reduxjs/toolkit";

const storeClass = JSON.parse(localStorage.getItem('classList')) || [];

const initialState = {
  classes: storeClass
};

export const classSlice = createSlice({
  name: 'classrooms',
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push({ ...action.payload, id: Date.now() });
    },
    deleteClass: (state, action) => {
      state.classes = state.classes.filter(cls => cls.id !== action.payload);
    },
    updateClass: (state, action) => {
      const index = state.classes.findIndex(cls => cls.id === action.payload.id);
      if (index !== -1) {
        state.classes[index] = { ...state.classes[index], ...action.payload };
      }
    }
  }
});

export const { addClass, deleteClass, updateClass } = classSlice.actions;
export default classSlice.reducer;
