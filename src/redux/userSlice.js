import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  links: [],
  email: '',
  userProfile: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveLinks: (state, action) => {
      state.links = (action.payload);
      console.log(state.links)
    },
    saveEmail: (state, action) => {
      state.email = (action.payload);
      console.log(state.email, 'my need')
    },
    saveProfile: (state, action) => {
      state.userProfile = (action.payload);
      console.log(state.userProfile)
    },
  },
})

export const { saveLinks, saveEmail, saveProfile } = userSlice.actions

export default userSlice.reducer