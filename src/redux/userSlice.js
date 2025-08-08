import { createSlice } from '@reduxjs/toolkit'

let persistedState = JSON.parse(sessionStorage.getItem('reduxState'));
const { email, links, userProfile } = persistedState?.user || {}

const initialState = {
  links: links || [],
  email: email || '',
  userProfile: userProfile || {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveLinks: (state, action) => {
      state.links = (action.payload);
    },
    saveEmail: (state, action) => {
      state.email = (action.payload);
    },
    saveProfile: (state, action) => {
      state.userProfile = (action.payload);
    },
    resetUser: () => initialState 
  },
})

export const { saveLinks, saveEmail, saveProfile, resetUser } = userSlice.actions

export default userSlice.reducer