import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';

// Define middleware to persist Redux state to local storage
const localStorageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

// Subscribe to store changes and update local storage
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;