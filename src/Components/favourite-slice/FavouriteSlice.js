// favourite-slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: [],
};

const FavouriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite(state, action) {
      const newItem = action.payload;
      const existingItem = state.favoriteItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.favoriteItems.push({
          id: newItem.id,
          url: newItem.url,
        });
      }
    },

    removeFromFavorite(state, action) {
      const id = action.payload;
      const existingItemIndex = state.favoriteItems.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex !== -1) {
        state.favoriteItems.splice(existingItemIndex, 1);
      }
    },
  },
});

export default FavouriteSlice;
export const favoriteActions = FavouriteSlice.actions;
