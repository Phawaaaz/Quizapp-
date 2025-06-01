import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Clock, CircleHelp as HelpCircle, ArrowLeft } from 'lucide-react-native';

// Mock courses data (simplified version from the courses screen)
const mockCourses = [
  { id: '1', title: 'Data Structures & Algorithms', questionCount: 15, timeInMinutes: 30 },
  { id: '2', title: 'Object-Oriented Programming', questionCount: 20, timeInMinutes: 25 },
  { id: '3', title: 'Computer Architecture', questionCount: 10, timeInMinutes: 20 },
  { id: '4', title: 'Database Management', questionCount: 18, timeInMinutes: 35 },
  { id: '5', title: 'Software Engineering', questionCount: 25, timeInMinutes: 40 },
];

export default function QuizIntroScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Find the course by ID
  const course = mockCourses.find(c => c.id === id);
  
  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="heading-md-semibold" color={Colors.red}>
            Course not found
          </Text>
          <Button
            title="Back to Courses"
            onPress={() => router.push('/courses')}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Back"
          variant="secondary"
          icon={<ArrowLeft size={18} color={Colors.primary} />}
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </View>
      
      <View style={styles.content}>
        <Card style={styles.infoCard}>
          <Text 
            variant="heading-lg-bold" 
            color={Colors.primary} 
            align="center"
            style={styles.courseTitle}
          >
            {course.title}
          </Text>
          
          <View style={styles.quizInfo}>
            <View style={styles.infoItem}>
              <HelpCircle size={24} color={Colors.primary} />
              <Text 
                variant="body-md-regular"
                style={styles.infoText}
              >
                {course.questionCount} Questions
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <Clock size={24} color={Colors.primary} />
              <Text 
                variant="body-md-regular"
                style={styles.infoText}
              >
                {course.timeInMinutes} Minutes
              </Text>
            </View>
          </View>
          
          <Text 
            variant="body-sm-regular" 
            color={Colors.mediumGray}
            align="center"
            style={styles.description}
          >
            You're about to start the {course.title} quiz. You'll have {course.timeInMinutes} minutes to answer {course.questionCount} questions.
          </Text>
          
          <Button
            title="Start Quiz"
            fullWidth
            onPress={() => router.push(`/quiz/${id}/questions`)}
            style={styles.startButton}
          />
          
          <Button
            title="Back to Courses"
            variant="secondary"
            fullWidth
            onPress={() => router.push('/courses')}
            style={styles.backToCourses}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  header: {
    padding: Spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  infoCard: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  courseTitle: {
    marginBottom: Spacing.xl,
  },
  quizInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  infoText: {
    marginLeft: Spacing.sm,
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: Colors.mediumGray,
  },
  description: {
    marginBottom: Spacing.xl,
  },
  startButton: {
    marginBottom: Spacing.md,
  },
  backToCourses: {
    marginTop: Spacing.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
});