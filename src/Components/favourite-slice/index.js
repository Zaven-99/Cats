import { configureStore } from "@reduxjs/toolkit";

import FavoriteSlice from "./FavouriteSlice";

const store = configureStore({
  reducer: {
    favorite: FavoriteSlice.reducer,
  },
});

export default store;
