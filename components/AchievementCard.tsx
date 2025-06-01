import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Card from './Card';
import { Check } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { Spacing } from '../constants/Layout';

interface AchievementCardProps {
  title: string;
  description: string;
  completed: boolean;
}

const AchievementCard = ({ 
  title, 
  description, 
  completed 
}: AchievementCardProps) => {
  return (
    <Card 
      style={[
        styles.container,
        completed ? styles.completedContainer : {}
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.textContainer}>
          <Text 
            variant="body-md-regular" 
            style={styles.title}
            color={completed ? Colors.green : Colors.darkGray}
          >
            {title}
          </Text>
          <Text 
            variant="caption-sm" 
            color={Colors.mediumGray}
          >
            {description}
          </Text>
        </View>
        
        {completed && (
          <View style={styles.checkContainer}>
            <Check color={Colors.green} size={20} />
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  completedContainer: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.green,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
  },
  checkContainer: {
    marginLeft: Spacing.md,
  },
});

export default AchievementCard;