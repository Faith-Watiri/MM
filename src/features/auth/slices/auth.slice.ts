import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../utlis/store';
import {useSelector} from 'react-redux';

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
    setSignIn: (state, action: PayloadAction<UserState>) => {
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

export const selectIsLoggedIn = (state: RootState) => state.userAuth.isLoggedIn;
export const selectEmail = (state: RootState) => state.userAuth.email;
export const selectName = (state: RootState) => state.userAuth.name;
export const selectRole = (state: RootState) => state.userAuth.role;

export const useUserAuth = () => {
  return useSelector((state: RootState) => state.userAuth);
};

export default authSlice.reducer;
