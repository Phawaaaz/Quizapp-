import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';

interface CardProps extends ViewProps {
  children: ReactNode;
  elevation?: number;
  padded?: boolean;
}

const Card = ({
  children,
  elevation = 1,
  padded = true,
  style,
  ...props
}: CardProps) => {
  return (
    <View 
      style={[
        styles.card, 
        padded && styles.padded,
        elevation === 2 && styles.elevation2,
        elevation === 3 && styles.elevation3,
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  padded: {
    padding: Spacing.md,
  },
  elevation2: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  elevation3: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 6,
  },
});

export default Card;