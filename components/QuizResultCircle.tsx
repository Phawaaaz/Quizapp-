import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Colors from '../constants/Colors';
import Svg, { Circle } from 'react-native-svg';

interface QuizResultCircleProps {
  correct: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

const QuizResultCircle = ({
  correct,
  total,
  size = 120,
  strokeWidth = 12,
}: QuizResultCircleProps) => {
  const percentage = (correct / total) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on score percentage
  let color = Colors.primary; // Default: blue for normal scores
  
  if (percentage >= 80) {
    color = Colors.green; // Green for high scores
  } else if (percentage < 50) {
    color = Colors.red; // Red for low scores
  }

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.lightGray}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      
      <View style={styles.textContainer}>
        <Text variant="heading-md-semibold" color={color}>
          {correct}/{total}
        </Text>
        <Text variant="body-sm-regular" color={Colors.mediumGray}>
          {percentage.toFixed(0)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizResultCircle;