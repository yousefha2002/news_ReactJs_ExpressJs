import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type adminState ={
  admin:{
    id:number,
    email: string,
    updatedAt:string,
    createdAt:string,
  } | null,
  token:string
}

const initialState = {} as adminState;

export const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {
    loginAdmin: (state , action: PayloadAction<adminState>) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    logoutAdmin: (state ) => {
      state.admin = null;
      state.token = '';
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginAdmin , logoutAdmin} = adminSlice.actions

export default adminSlice.reducer