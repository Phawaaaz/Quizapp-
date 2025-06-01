import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Text from '@/components/Text';
import Card from '@/components/Card';
import StatsCard from '@/components/StatsCard';
import AchievementCard from '@/components/AchievementCard';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Award, Clock, Trophy, Zap } from 'lucide-react-native';
import { Achievement } from '@/types';
import useAuth from '@/hooks/useAuthContext';

// Mock achievements data
const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Quiz Completed',
    description: 'Completed your first quiz',
    completed: true,
  },
  {
    id: '2',
    title: 'Perfect Score',
    description: 'Got 100% on any quiz',
    completed: true,
  },
  {
    id: '3',
    title: '5-Day Streak',
    description: 'Completed quizzes for 5 consecutive days',
    completed: true,
  },
  {
    id: '4',
    title: 'Quiz Master',
    description: 'Complete 20 quizzes',
    completed: false,
  },
  {
    id: '5',
    title: 'CS Expert',
    description: 'Score 90%+ on all courses',
    completed: false,
  },
];

export default function ProfileScreen() {
  const { user } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="heading-lg-bold">Profile</Text>
        </View>
        
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text variant="heading-md-semibold">{user?.name || 'Student Name'}</Text>
              <Text variant="body-sm-regular" color={Colors.mediumGray}>
                {user?.email || 'student@university.edu'}
              </Text>
              <View style={styles.idContainer}>
                <Text variant="caption-sm" color={Colors.mediumGray}>
                  Student ID: {user?.studentId || '12345678'}
                </Text>
              </View>
            </View>
          </View>
        </Card>
        
        <View style={styles.statsContainer}>
          <StatsCard 
            icon={<Trophy size={24} color="#FF9F43" />} 
            title="Quizzes Taken" 
            value={14} 
            color="#FF9F43"
          />
          <StatsCard 
            icon={<Award size={24} color={Colors.green} />} 
            title="Best Score" 
            value="95%" 
            color={Colors.green}
          />
          <StatsCard 
            icon={<Clock size={24} color={Colors.primary} />} 
            title="Study Time" 
            value="8h" 
            color={Colors.primary}
          />
          <StatsCard 
            icon={<Zap size={24} color="#EA5455" />} 
            title="Streak" 
            value={5} 
            color="#EA5455"
          />
        </View>
        
        <View style={styles.section}>
          <Text variant="heading-md-semibold" style={styles.sectionTitle}>
            Achievements
          </Text>
          
          <View style={styles.achievementsList}>
            {achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                completed={achievement.completed}
              />
            ))}
          </View>
        </View>
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
  profileCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  idContainer: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  section: {
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  achievementsList: {
    marginTop: Spacing.sm,
  },
});