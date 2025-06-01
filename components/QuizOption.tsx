import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Text from './Text';
import Colors from '../constants/Colors';
import { Spacing, BorderRadius } from '../constants/Layout';

interface QuizOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  optionKey: string; // Like "A", "B", "C", "D"
}

const QuizOption = ({ 
  label, 
  selected, 
  onSelect,
  optionKey
}: QuizOptionProps) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={[styles.optionKey, selected && styles.optionKeySelected]}>
        <Text 
          variant="body-sm-regular" 
          color={selected ? Colors.primary : Colors.mediumGray}
        >
          {optionKey}
        </Text>
      </View>
      <Text 
        style={styles.optionText} 
        variant="body-md-regular"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  optionSelected: {
    backgroundColor: Colors.softBlue,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  optionKey: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  optionKeySelected: {
    backgroundColor: Colors.softBlue,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  optionText: {
    flex: 1,
  }
});

export default QuizOption;