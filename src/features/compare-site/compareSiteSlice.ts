import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const compareSiteState = {
  keys: [],
};

const compareSiteSlice = createSlice({
  name: 'compareSite',
  initialState: compareSiteState,
  reducers: {
    addKeys: (state, action: PayloadAction<any>) => {
      return { keys: action.payload };
    },
  },
});

export const { addKeys } = compareSiteSlice.actions;
export default compareSiteSlice.reducer;
