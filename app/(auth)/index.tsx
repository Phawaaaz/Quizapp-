import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Cpu } from 'lucide-react-native';

export default function AuthLanding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.iconBackground}>
            <Cpu size={48} color={Colors.primary} />
          </View>
          <Text 
            variant="heading-lg-bold" 
            color={Colors.primary} 
            align="center"
            style={styles.title}
          >
            CSQuiz
          </Text>
          <Text 
            variant="body-md-regular" 
            color={Colors.mediumGray} 
            align="center"
            style={styles.subtitle}
          >
            Test your computer science knowledge
          </Text>
        </View>
        
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg' }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Sign In" 
            fullWidth
            onPress={() => router.push('/login')}
            style={styles.button}
          />
          <Button 
            title="Create Account" 
            variant="secondary"
            fullWidth
            onPress={() => router.push('/signup')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl * 2,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.softBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  subtitle: {
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
  },
  button: {
    marginBottom: Spacing.md,
  },
});