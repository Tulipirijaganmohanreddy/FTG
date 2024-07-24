import { Box, Divider, Flex, Img } from '@chakra-ui/react';
import React from 'react';
import Heading5 from '../../../FitnessComponents/FitnessTexts/Heading5';
import fitnessnewlogo from '../../../../assets/Images/SignInPageImages/fitnessnewlogo.png';

const FitnessHeadingComponent = (props) => {
  const { reportHeading } = props;

  return (
    <>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading5>{reportHeading}</Heading5>

        <Img
          src={fitnessnewlogo}
          w={{ base: '60vw', md: '35vw', lg: '35vw' }}
          h='7vh'
          objectFit="contain"
        />
      </Flex>

      <Box mx='1' mt='2'>
        <Divider border='2px solid #020005' mb='4' />
      </Box>
    </>
  );
};

export default FitnessHeadingComponent;
