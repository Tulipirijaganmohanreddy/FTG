import { Box, Flex, Input, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from 'react-router-dom';
import PositiveButton from '../../../components/PositiveButton';
import { EmailSettingsData } from './settingsData';
import { getEmailSettings } from '../../../DistrictAdminApis/districtAdminSlice';

const EmailSettings = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.profile.userId);
  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const token = useSelector((state) => state.profile.token);

  const [emailData, setEmailData] = useState();

  const emailSettngsList = useSelector(
    (state) => state?.district?.emailSettings
  );

  const handleSelectEmailList = (e) => {
    setEmailData(e.target.value);
    dispatch(
      getEmailSettings({ body: { emailSettings: [e.target.value] }, token })
    );
  };

  useEffect(() => {
    !emailSettngsList?.length && dispatch(getEmailSettings({ userId, token }));
  }, []);
  return (
    <Flex direction='column' gap='4'>
      <Text>E-MAIL SETTINGS</Text>
      {EmailSettingsData.map((item, index) => {
        return (
          <Box inlineSize='sm'>
            {item.inputType == 'radio' ? (
              <Flex direction='column'>
                <Text mb='2'>{item.lable}</Text>
                <RadioGroup>
                  {item.radioOptions.map((lable, index) => {
                    return (
                      <Radio value={lable} ml='4'>
                        {lable}
                      </Radio>
                    );
                  })}
                </RadioGroup>
              </Flex>
            ) : (
              <Box>
                <Text mb='2'>{item.lable}</Text>
                <Input type={item.inputType} />
              </Box>
            )}
          </Box>
        );
      })}

      <Box>
        <PositiveButton text='Save Settings' />
      </Box>
    </Flex>
  );
};

export default EmailSettings;
