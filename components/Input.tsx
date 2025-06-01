import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TextInputProps, 
  TouchableOpacity 
} from 'react-native';
import Text from './Text';
import { Eye, EyeOff } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Layout';
import Typography from '../constants/Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = ({
  label,
  error,
  placeholder,
  secureTextEntry,
  leftIcon,
  style,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View 
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error ? styles.error : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            secureTextEntry && styles.inputWithRightIcon,
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGray}
          secureTextEntry={secureTextEntry ? !isPasswordVisible : false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? 
              <EyeOff size={20} color={Colors.mediumGray} /> : 
              <Eye size={20} color={Colors.mediumGray} />
            }
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText} variant="caption-sm">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
    width: '100%',
  },
  label: {
    marginBottom: Spacing.xs,
    color: Colors.darkGray,
    ...Typography['body-sm-regular'],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  input: {
    flex: 1,
    ...Typography['body-md-regular'],
    color: Colors.darkGray,
    padding: 0, // Remove default padding
    height: '100%',
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  leftIconContainer: {
    marginRight: Spacing.sm,
  },
  eyeIcon: {
    padding: Spacing.sm,
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
  },
  focused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    marginTop: Spacing.xs,
  },
});

export default Input;