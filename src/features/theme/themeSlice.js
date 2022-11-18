import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		value: 'Dark'
	},
	reducers: {
		update: (state, payload) => {
			state.value = payload
		}
	}
})

export const { update } = themeSlice.actions

export default themeSlice.reducer