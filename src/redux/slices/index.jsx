import {createSlice} from '@reduxjs/toolkit';
import { authApis } from '../services/authService';
import { mainApis } from '../services/mainService';
const initialState = {
  token: null,
  user: {},
};
export const Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      // .addMatcher(Apis.endpoints.verifyOTP.matchFulfilled, (state, action) => {
      //   console.log('aaaaa', action);
      //   if (action.payload?.data) {
      //     console.log('accc', action);
      //     state.user = action.payload.data;
      //     state.token = action.payload.accessToken;
      //   }
      // })
      .addMatcher(authApis.endpoints.login.matchFulfilled, (state, action) => {
        console.log('action:-', action);
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      // .addMatcher(
      //   Apis.endpoints.updateProfile.matchFulfilled,
      //   (state, action) => {
      //     if (action.payload?.data) {
      //       state.user = action.payload.data;
      //     }
      //   },
      // )
      .addMatcher(
        mainApis.endpoints.deleteUser.matchFulfilled,
        (state, action) => {
          console.log('action:-',action.payload)
          if (action.payload?.success) {
            state.user = {};
            state.token = null;
          }
        },
      );
  },
});
export const {logout} = Slice.actions;
export default Slice.reducer;