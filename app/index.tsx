import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuthContext';

export default function Index() {
  const { user, isLoading } = useAuth();
  
  // Show a loading screen while checking auth status
  if (isLoading) {
    return null;
  }
  
  // Redirect based on authentication status
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)" />;
}