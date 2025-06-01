import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Card from '@/components/Card';
import StatsCard from '@/components/StatsCard';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Trophy, Clock, Target } from 'lucide-react-native';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaWrapper backgroundColor={Colors.lightGray}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text variant="heading-lg-bold">Welcome Back!</Text>
        </View>

        <View style={styles.statsContainer}>
          <StatsCard
            icon={<Trophy color={Colors.primary} />}
            value="85%"
            title="Average Score"
          />
          <StatsCard
            icon={<Clock color={Colors.primary} />}
            value="12"
            title="Quizzes Taken"
          />
          <StatsCard
            icon={<Target color={Colors.primary} />}
            value="3"
            title="Achievements"
          />
        </View>

        <View style={styles.section}>
          <Text variant="heading-md-bold" style={styles.sectionTitle}>
            Continue Learning
          </Text>
          <Card style={styles.quizListCard}>
            <View style={styles.quizList}>
              <Text>Your quiz list content will go here</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="heading-md-bold" style={styles.sectionTitle}>
            Recommended Quizzes
          </Text>
          <Button
            title="Take Random Quiz"
            onPress={() => router.push('/quiz/random')}
            style={styles.randomButton}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  section: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  randomButton: {
    marginTop: Spacing.sm,
  },
  quizListCard: {
    overflow: 'hidden',
    marginHorizontal: -Spacing.md,
  },
  quizList: {
    padding: Spacing.md,
  },
});