import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/components/Text';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { Mail, Lock, ArrowLeft } from 'lucide-react-native';
import useAuth from '@/hooks/useAuthContext';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateInputs = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    
    try {
      await signIn(email, password);
      router.push('/(tabs)');
    } catch (error: any) {
      console.error('Login error:', error);
      // Handle specific error messages from the API
      if (error.message.includes('email')) {
        setErrors({ email: error.message });
      } else if (error.message.includes('password')) {
        setErrors({ password: error.message });
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    }
  };

  return (
    <SafeAreaWrapper backgroundColor={Colors.white}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={Colors.darkGray} size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.titleContainer}>
          <Text variant="heading-lg-bold">Welcome Back!</Text>
          <Text 
            variant="body-md-regular" 
            color={Colors.mediumGray}
            style={styles.subtitle}
          >
            Sign in to continue
          </Text>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="university@email.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.mediumGray} />}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            leftIcon={<Lock size={20} color={Colors.mediumGray} />}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          
          <Button
            title="Sign In"
            fullWidth
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
          />
        </View>
        
        <View style={styles.footer}>
          <Text variant="body-md-regular" color={Colors.mediumGray}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text variant="body-md-regular" color={Colors.primary}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
    alignSelf: 'flex-start',
  },
  titleContainer: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
  form: {
    marginBottom: Spacing.lg,
  },
  loginButton: {
    marginTop: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: Spacing.xl,
  },
});