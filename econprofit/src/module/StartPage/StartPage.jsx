import * as React from 'react';
import { Stack } from '@mui/material';
import LocationListContainer from '../LocationListContainer/LocationListContainer';
import Header from '../Header/Header';

export const StartPage = () => (
  <Stack
    // height="100vh"
    // bgcolor="#F4F4FD"
  >
    <Header/>
    <LocationListContainer/>
  </Stack>
);
export default StartPage;