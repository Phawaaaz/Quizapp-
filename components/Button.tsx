import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps, 
  ActivityIndicator,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { Spacing, BorderRadius } from '../constants/Layout';
import Typography from '../constants/Typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  style,
  ...props
}: ButtonProps) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? Colors.primary : Colors.white}
          size="small"
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: 'transparent',
  },
  small: {
    height: 36,
  },
  medium: {
    height: 48,
  },
  large: {
    height: 56,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...Typography['button-md'],
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.primary,
  },
  dangerText: {
    color: Colors.red,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

export default Button;