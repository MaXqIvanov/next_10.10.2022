import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugin/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

export const getIpCLient = createAsyncThunk(
  'learn/getIpCLient',
  async (params, {getState}) => {
    console.log(params);
    const response = await api.post(`backend/api/parser/prepair_learning_data/`, params)
    return {response, params}
  },
)



const ipClientSlice = createSlice({
  name: 'ip_client',
  initialState: {
    ip_clients_all: [],
    // choose_request: {},
    // pagination
    count_page: 1,
    current_page: 1,
  },
  reducers: {
    chooseRequest(state, action) {
      state.choose_request = action.payload
    },
    setPage(state,action){
      state.current_page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIpCLient.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getIpCLient.fulfilled, (state,  { payload }) => {
      console.log(payload); 
      if(payload.response.status === 200){
        // state.count_page = Math.round(payload.response.data.count / 30)
        state.ip_clients_all = payload.response.data
      }
      state.loading = false
    });
    builder.addCase(getIpCLient.rejected, (state) => {
        state.loading = false
    });
  },
});

export default ipClientSlice.reducer;
export const { chooseRequest, setPage } = ipClientSlice.actions;