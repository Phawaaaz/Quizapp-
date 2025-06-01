import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Text from '@/components/Text';
import Button from '@/components/Button';
import QuizOption from '@/components/QuizOption';
import Colors from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Layout';
import { ArrowLeft } from 'lucide-react-native';

// Mock questions data
const mockQuestions = [
  {
    id: '1',
    text: 'What is the time complexity of binary search?',
    options: [
      { id: 'a', text: 'O(n)' },
      { id: 'b', text: 'O(log n)' },
      { id: 'c', text: 'O(n²)' },
      { id: 'd', text: 'O(n log n)' },
    ],
    correctOptionId: 'b',
  },
  {
    id: '2',
    text: 'Which data structure uses LIFO ordering?',
    options: [
      { id: 'a', text: 'Queue' },
      { id: 'b', text: 'Stack' },
      { id: 'c', text: 'Linked List' },
      { id: 'd', text: 'Array' },
    ],
    correctOptionId: 'b',
  },
  {
    id: '3',
    text: 'What is the primary purpose of normalization in database design?',
    options: [
      { id: 'a', text: 'To improve query performance' },
      { id: 'b', text: 'To reduce storage requirements' },
      { id: 'c', text: 'To eliminate data redundancy' },
      { id: 'd', text: 'To enable distributed databases' },
    ],
    correctOptionId: 'c',
  },
  {
    id: '4',
    text: 'Which sorting algorithm has the best average-case time complexity?',
    options: [
      { id: 'a', text: 'Bubble Sort' },
      { id: 'b', text: 'Insertion Sort' },
      { id: 'c', text: 'Quick Sort' },
      { id: 'd', text: 'Selection Sort' },
    ],
    correctOptionId: 'c',
  },
  {
    id: '5',
    text: 'What is the result of 2 << 3 in most programming languages?',
    options: [
      { id: 'a', text: '8' },
      { id: 'b', text: '16' },
      { id: 'c', text: '10' },
      { id: 'd', text: '32' },
    ],
    correctOptionId: 'b',
  },
];

export default function QuizQuestionsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{[questionId: string]: string}>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  
  const currentQuestion = mockQuestions[currentQuestionIndex];

  useEffect(() => {
    // Set if this is the last question
    setIsLastQuestion(currentQuestionIndex === mockQuestions.length - 1);
    
    // Timer functionality
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(selectedOptions).length < mockQuestions.length) {
      Alert.alert(
        'Unanswered Questions',
        'You have not answered all questions. Are you sure you want to submit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Submit Anyway', onPress: submitQuiz },
        ]
      );
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    // Calculate score
    const correctAnswers = mockQuestions.filter(
      q => selectedOptions[q.id] === q.correctOptionId
    ).length;
    
    // Navigate to results screen
    router.replace({
      pathname: `/quiz/${id}/results`,
      params: {
        correct: correctAnswers.toString(),
        total: mockQuestions.length.toString(),
      },
    });
  };

  const confirmExit = () => {
    Alert.alert(
      'Exit Quiz',
      'Are you sure you want to exit? Your progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => router.push('/courses') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={confirmExit} style={styles.backButton}>
          <ArrowLeft color={Colors.darkGray} size={24} />
        </TouchableOpacity>
        
        <View style={styles.timerContainer}>
          <Text 
            variant="body-md-regular"
            color={timeLeft < 300 ? Colors.red : Colors.darkGray}
          >
            {formatTime(timeLeft)}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Text variant="body-sm-regular" color={Colors.mediumGray}>
            {currentQuestionIndex + 1} of {mockQuestions.length}
          </Text>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="heading-md-semibold" style={styles.questionText}>
          {currentQuestion.text}
        </Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <QuizOption
              key={option.id}
              label={option.text}
              optionKey={String.fromCharCode(65 + index)} // A, B, C, D...
              selected={selectedOptions[currentQuestion.id] === option.id}
              onSelect={() => handleSelectOption(option.id)}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={isLastQuestion ? "Submit" : "Next"}
          fullWidth
          onPress={isLastQuestion ? handleSubmit : handleNext}
          disabled={!selectedOptions[currentQuestion.id]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backButton: {
    padding: Spacing.sm,
  },
  timerContainer: {
    backgroundColor: Colors.lightGray,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  progressContainer: {
    paddingHorizontal: Spacing.md,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 120, // Extra space for the fixed button
  },
  questionText: {
    marginBottom: Spacing.xl,
  },
  optionsContainer: {
    marginTop: Spacing.lg,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});