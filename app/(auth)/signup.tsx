import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/components/Text';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { User, Mail, Key, CreditCard, ArrowLeft } from 'lucide-react-native';
import useAuth from '@/hooks/useAuthContext';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name) newErrors.name = 'Name is required';
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    else if (!email.includes('.edu')) newErrors.email = 'Must be a university email';
    
    if (!studentId) newErrors.studentId = 'Student ID is required';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;
    
    try {
      await signUp(name, email, studentId, password);
      router.push('/(tabs)');
    } catch (error: any) {
      console.error('Signup error:', error);
      // Handle specific error messages from the API
      if (error.message.includes('email')) {
        setErrors({ email: error.message });
      } else if (error.message.includes('password')) {
        setErrors({ password: error.message });
      } else if (error.message.includes('studentId')) {
        setErrors({ studentId: error.message });
      } else {
        setErrors({ email: 'Failed to create account. Please try again.' });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.darkGray} size={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text variant="heading-lg-bold">Create Account</Text>
          <Text 
            variant="body-md-regular" 
            color={Colors.mediumGray}
            style={styles.subtitle}
          >
            Join CSQuiz to test your knowledge
          </Text>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            autoCapitalize="words"
            leftIcon={<User size={20} color={Colors.mediumGray} />}
            value={name}
            onChangeText={setName}
            error={errors.name}
          />
          
          <Input
            label="University Email"
            placeholder="university@email.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.mediumGray} />}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          
          <Input
            label="Student ID"
            placeholder="Enter your student ID"
            keyboardType="number-pad"
            leftIcon={<CreditCard size={20} color={Colors.mediumGray} />}
            value={studentId}
            onChangeText={setStudentId}
            error={errors.studentId}
          />
          
          <Input
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            leftIcon={<Key size={20} color={Colors.mediumGray} />}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            leftIcon={<Key size={20} color={Colors.mediumGray} />}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
          />
          
          <Button
            title="Create Account"
            fullWidth
            onPress={handleSignup}
            isLoading={isLoading}
            style={styles.signupButton}
          />
        </View>
        
        <View style={styles.footer}>
          <Text variant="body-md-regular" color={Colors.mediumGray}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text variant="body-md-regular" color={Colors.primary}>
              Sign in
            </Text>
          </TouchableOpacity>
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
  header: {
    padding: Spacing.lg,
  },
  backButton: {
    padding: Spacing.sm,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  titleContainer: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  form: {
    marginBottom: Spacing.lg,
  },
  signupButton: {
    marginTop: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
});