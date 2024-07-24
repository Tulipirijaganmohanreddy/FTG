import { Box, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import LayoutPage from '../Layout/Pages/LayoutPage';

// import LayoutPage from './LayoutPage';

const SharedLayout = () => {
  return (
    <>
  

      <Box w='auto'
      
      // maxWidth='1920px'
      
      margin='auto'>
        {/* <MainPage /> */}
        <LayoutPage />
      </Box>
    </>
  );
};

export default SharedLayout;
