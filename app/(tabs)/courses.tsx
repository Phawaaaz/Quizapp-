import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/components/Text';
import CourseCard from '@/components/CourseCard';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Course } from '@/types';

// Mock courses data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    year: 2,
    questionCount: 15,
    timeInMinutes: 30,
  },
  {
    id: '2',
    title: 'Object-Oriented Programming',
    year: 1,
    questionCount: 20,
    timeInMinutes: 25,
  },
  {
    id: '3',
    title: 'Computer Architecture',
    year: 2,
    questionCount: 10,
    timeInMinutes: 20,
  },
  {
    id: '4',
    title: 'Database Management',
    year: 3,
    questionCount: 18,
    timeInMinutes: 35,
  },
  {
    id: '5',
    title: 'Software Engineering',
    year: 3,
    questionCount: 25,
    timeInMinutes: 40,
  },
  {
    id: '6',
    title: 'Machine Learning',
    year: 4,
    questionCount: 15,
    timeInMinutes: 30,
  },
  {
    id: '7',
    title: 'Web Development',
    year: 2,
    questionCount: 20,
    timeInMinutes: 25,
  },
];

// Define tab filters
const TABS = ['All', 'Year 1', 'Year 2', 'Year 3', 'Year 4'];

export default function CoursesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0); // 0 = All
  
  // Filter courses based on active tab
  const filteredCourses = mockCourses.filter(course => {
    if (activeTab === 0) return true; // All courses
    return course.year === activeTab; // Year 1, 2, 3, or 4
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading-lg-bold">Courses</Text>
        <Text 
          variant="body-md-regular" 
          color={Colors.mediumGray}
          style={styles.subtitle}
        >
          Select a course to start a quiz
        </Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {TABS.map((tab, index) => (
            <View
              key={index}
              style={[
                styles.tab,
                activeTab === index && styles.activeTab,
              ]}
            >
              <Text
                variant="body-sm-regular"
                color={activeTab === index ? Colors.primary : Colors.mediumGray}
                onPress={() => setActiveTab(index)}
              >
                {tab}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.coursesList}
        contentContainerStyle={styles.coursesContent}
      >
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            title={course.title}
            year={course.year}
            onPress={() => router.push(`/quiz/${course.id}`)}
            onStartQuiz={() => router.push(`/quiz/${course.id}`)}
          />
        ))}
        
        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <Text 
              variant="body-md-regular" 
              color={Colors.mediumGray}
              align="center"
            >
              No courses available for this year.
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingTop: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
  tabsContainer: {
    backgroundColor: Colors.white,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginRight: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  coursesList: {
    flex: 1,
  },
  coursesContent: {
    padding: Spacing.lg,
  },
  emptyState: {
    padding: Spacing.xl * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});