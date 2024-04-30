import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    city: "Sylhet",
    suggestions: [],
    showSuggestions: false,
    place: "Sylhet",
    error: "",
    loading: false
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload
        },

        setSuggestions: (state, action) => {
            state.suggestions = []
            state.suggestions.push(action.payload)
        },

        setShowSuggestions: (state, action) => {
            state.showSuggestions = action.payload
        },

        setPlace: (state, action) => {
            state.place = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

export const { setCity, setSuggestions, setShowSuggestions, setPlace, setError, setLoading } = dataSlice.actions

export default dataSlice.reducer