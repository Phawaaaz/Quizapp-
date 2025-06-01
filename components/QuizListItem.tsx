import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import Colors from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Layout';
import { formatDistanceToNow } from 'date-fns';

interface QuizListItemProps {
  title: string;
  date: Date;
  score: number;
  onPress: () => void;
}

const QuizListItem = ({ title, date, score, onPress }: QuizListItemProps) => {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  
  // Determine score color
  const scoreColor = score >= 80 ? Colors.green : score >= 60 ? Colors.primary : Colors.red;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <Text variant="body-md-regular" style={styles.title}>
            {title}
          </Text>
          <Text 
            variant="caption-sm" 
            color={Colors.mediumGray} 
            style={styles.date}
          >
            {formattedDate}
          </Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text 
            variant="body-md-regular" 
            color={scoreColor}
            style={styles.score}
          >
            {score}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  contentContainer: {
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  date: {
    marginTop: 2,
  },
  scoreContainer: {
    paddingLeft: Spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: Colors.lightGray,
  },
  score: {
    fontWeight: '600',
  }
});

export default QuizListItem;