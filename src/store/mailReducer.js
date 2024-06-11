import { createSlice } from '@reduxjs/toolkit';

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    sentMails: [],
    error: null,
  },
  reducers: {
    sendMailSuccess: (state, action) => {
      state.sentMails.push(action.payload);
      state.error = null;
    },
    sendMailError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { sendMailSuccess, sendMailError } = mailSlice.actions;
export default mailSlice.reducer;
