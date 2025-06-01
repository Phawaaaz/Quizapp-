import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';

interface CustomTextProps extends TextProps {
  variant?: keyof typeof Typography;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

const Text = ({
  variant = 'body-md-regular',
  style,
  color = Colors.darkGray,
  align = 'auto',
  children,
  ...props
}: CustomTextProps) => {
  return (
    <RNText
      style={[
        Typography[variant],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;