import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  role: string;
  email: string;
  name: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  email: '',
  name: '',
  role: '',
};

export const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    setSignOut: state => {
      state.email = '';
      state.name = '';
      state.role = '';
      state.isLoggedIn = false;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export const selectIsLoggedIn = (state: {userAuth: {isLoggedIn: any}}) =>
  state.userAuth.isLoggedIn;
export const selectEmail = (state: {userAuth: {email: any}}) =>
  state.userAuth.email;
export const selectName = (state: {userAuth: {name: any}}) =>
  state.userAuth.name;
export const selectRole = (state: {userAuth: {role: any}}) =>
  state.userAuth.role;

export default authSlice.reducer;
