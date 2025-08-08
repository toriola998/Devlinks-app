import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';

// Define middleware to persist Redux state to session storage
const sessionStorageMiddleware = store => next => action => {
  const result = next(action);
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sessionStorageMiddleware),
})

// Subscribe to store changes and update session storage
store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;