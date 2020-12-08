import { createSlice } from '@reduxjs/toolkit';




export const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedSidebarOption: 'home'
    },
    reducers: {
        setSelectedSidebarOption: (state, action) => {
            state.selectedSidebarOption = action.payload
        },

    },

});

export const { setSelectedSidebarOption } = appSlice.actions;


export const selectSelectedSidebarOption = state => state.app.selectedSidebarOption;

export default appSlice.reducer;
