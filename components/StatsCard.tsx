import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';

interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  title: string;
  color?: string;
}

export default function StatsCard({ icon, value, title, color = Colors.primary }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          {icon}
        </View>
        <Text variant="heading-md-bold" color={color}>
          {value}
        </Text>
        <Text variant="body-sm-regular" color={Colors.mediumGray} align="center">
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.sm,
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  topSection: {
    alignItems: 'center',
  },
  iconContainer: {
    padding: Spacing.xs,
    borderRadius: 8,
    marginBottom: Spacing.xs,
  },
});