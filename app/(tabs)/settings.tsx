import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import Text from '@/components/Text';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Colors from '@/constants/Colors';
import { Spacing } from '@/constants/Layout';
import { User, LogOut } from 'lucide-react-native';
import useAuth from '@/hooks/useAuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, save to API and update context
    // Just for demo purposes, we'll just simulate the save
    
    setIsSaving(false);
  };

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading-lg-bold">Settings</Text>
      </View>
      
      <Card style={styles.settingsCard}>
        <Text variant="heading-md-semibold" style={styles.sectionTitle}>
          Account Information
        </Text>
        
        <Input
          label="Student Name"
          value={name}
          onChangeText={setName}
          leftIcon={<User size={20} color={Colors.mediumGray} />}
        />
        
        <View style={styles.toggleItem}>
          <Text variant="body-md-regular">Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: Colors.mediumGray, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
        
        <Button
          title="Save Settings"
          fullWidth
          onPress={handleSaveSettings}
          isLoading={isSaving}
          style={styles.saveButton}
        />
        
        <View style={styles.divider} />
        
        <Button
          title="Log Out"
          variant="danger"
          fullWidth
          onPress={handleLogout}
          icon={<LogOut size={18} color={Colors.red} />}
        />
      </Card>
      
      <View style={styles.footer}>
        <Text 
          variant="caption-sm" 
          color={Colors.mediumGray}
          align="center"
        >
          CSQuiz v1.0.0
        </Text>
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
    paddingTop: Spacing.xl,
  },
  settingsCard: {
    margin: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  saveButton: {
    marginTop: Spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: Spacing.xl,
  },
  footer: {
    padding: Spacing.lg,
    marginTop: 'auto',
    marginBottom: Spacing.xl,
  },
});