import { Icon } from '@chakra-ui/react';
import React from 'react';

const NavbarCardIcon = (props) => {
  const { elementIcon, changeIconColor, changeCursor, color } = props;

  return (
    <>
      <Icon
        as={elementIcon}
        boxSize={{ base: '15px', md: '20px', lg: '20px' }}
        cursor={changeCursor !== undefined ? changeCursor : 'pointer'}
        fill = {changeIconColor !== undefined && changeIconColor}
        color = {color ? color :""}
      />
    </>
  );
};

export default NavbarCardIcon;
