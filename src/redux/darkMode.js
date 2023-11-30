import { createSlice } from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: localStorage.getItem('dark-mode') === 'true',
  },
  reducers: {
    toggleDarkMode: (state) => {
        state.isDarkMode = !state.isDarkMode
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer