import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authStatus: false,
    user: null,
    theme: 'light'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.authStatus = true;
            state.user = action.payload
        },
        logout: (state) => {
            state.authStatus = false;
            state.user = null;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})

export const { login, logout, toggleTheme } = authSlice.actions;
export default authSlice.reducer;