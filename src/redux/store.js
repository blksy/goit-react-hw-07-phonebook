import { configureStore } from '@reduxjs/toolkit';
import myFilterSlice from './myFilterSlice';
import { сontactApi } from './myContactsSlice';

export const store = configureStore({
  reducer: {
    [сontactApi.reducerPath]: сontactApi.reducer,
    filter: myFilterSlice,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    сontactApi.middleware,
  ],
});
