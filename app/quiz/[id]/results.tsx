import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Text from '@/components/Text';
import Button from '@/components/Button';
import QuizResultCircle from '@/components/QuizResultCircle';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Check, X } from 'lucide-react-native';

export default function QuizResultsScreen() {
  const router = useRouter();
  const { id, correct, total } = useLocalSearchParams<{ 
    id: string;
    correct: string;
    total: string;
  }>();
  
  const correctCount = parseInt(correct || '0', 10);
  const totalCount = parseInt(total || '1', 10);
  const percentage = Math.round((correctCount / totalCount) * 100);
  
  // Feedback based on score
  const getFeedbackText = () => {
    if (percentage >= 80) {
      return { text: 'Excellent work!', color: Colors.green };
    } else if (percentage >= 60) {
      return { text: 'Good job!', color: Colors.primary };
    } else {
      return { text: 'Give it another try!', color: Colors.red };
    }
  };
  
  const feedback = getFeedbackText();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text 
          variant="heading-lg-bold" 
          align="center"
          style={styles.title}
        >
          Quiz Complete
        </Text>
        
        <Text 
          variant="heading-md-semibold"
          color={feedback.color}
          align="center"
          style={styles.feedbackText}
        >
          {feedback.text}
        </Text>
        
        <View style={styles.resultCircleContainer}>
          <QuizResultCircle 
            correct={correctCount} 
            total={totalCount} 
          />
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconCorrect}>
              <Check size={24} color={Colors.green} />
            </View>
            <Text variant="body-md-regular">
              {correctCount} Correct Answers
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIconIncorrect}>
              <X size={24} color={Colors.red} />
            </View>
            <Text variant="body-md-regular">
              {totalCount - correctCount} Incorrect Answers
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <Button
            title="Retake Quiz"
            fullWidth
            onPress={() => router.replace(`/quiz/${id}`)}
            style={styles.retakeButton}
          />
          
          <Button
            title="Back to Courses"
            variant="secondary"
            fullWidth
            onPress={() => router.push('/courses')}
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: Spacing.lg,
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  title: {
    marginBottom: Spacing.md,
  },
  feedbackText: {
    marginBottom: Spacing.xl,
  },
  resultCircleContainer: {
    marginVertical: Spacing.xl,
  },
  statsContainer: {
    width: '100%',
    marginVertical: Spacing.xl,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statIconCorrect: {
    backgroundColor: `${Colors.green}20`,
    padding: Spacing.sm,
    borderRadius: Spacing.md,
    marginRight: Spacing.md,
  },
  statIconIncorrect: {
    backgroundColor: `${Colors.red}20`,
    padding: Spacing.sm,
    borderRadius: Spacing.md,
    marginRight: Spacing.md,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  retakeButton: {
    marginBottom: Spacing.md,
  },
  backButton: {
    marginTop: Spacing.sm,
  },
});