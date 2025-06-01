import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Text from './Text';
import Button from './Button';
import Colors from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Layout';

interface CourseCardProps {
  title: string;
  year: number;
  onStartQuiz: () => void;
  onPress?: () => void;
}

const CourseCard = ({ 
  title, 
  year, 
  onStartQuiz,
  onPress,
}: CourseCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View>
          <Text variant="heading-md-semibold">{title}</Text>
          <Text 
            variant="caption-sm" 
            color={Colors.mediumGray}
            style={styles.yearLabel}
          >
            Year {year}
          </Text>
        </View>
        <Button
          title="Start Quiz"
          variant="primary"
          size="small"
          onPress={(e) => {
            e.stopPropagation();
            onStartQuiz();
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: Spacing.md,
  },
  content: {
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearLabel: {
    marginTop: Spacing.xs,
  },
});

export default CourseCard;