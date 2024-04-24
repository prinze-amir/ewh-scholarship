import { Switch } from '@chakra-ui/react';

const CustomSwitch = (props) => {

  return (
    <Switch
      {...props}
      sx={{
        // Track styles
        '.chakra-switch__track': {
          _checked: {
            bg: props.bgcolor, // Your custom color
          },
        },
        // Thumb styles when checked
        '.chakra-switch__thumb': {
          _checked: {
            borderColor: 'white', // Optional: custom border color when checked
          },
        },
      }}
    />
  );
};

export default CustomSwitch;
