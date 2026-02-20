
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";

const IS_IPAD = Platform.isPad;
const CONTENT_MAX_WIDTH = IS_IPAD ? 800 : undefined;

export default function ProfileScreen() {
  const theme = useTheme();

  console.log('ProfileScreen rendered - iPad mode:', IS_IPAD);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          IS_IPAD && styles.contentContainerIPad
        ]}
      >
        <View style={styles.contentWrapper}>
          <GlassView style={styles.profileHeader} glassEffectStyle="regular">
            <IconSymbol 
              ios_icon_name="person.circle.fill" 
              android_material_icon_name="account-circle" 
              size={IS_IPAD ? 100 : 80} 
              color={theme.colors.primary} 
            />
            <Text style={[styles.name, { color: theme.colors.text }]}>John Doe</Text>
            <Text style={[styles.email, { color: theme.dark ? '#98989D' : '#666' }]}>john.doe@example.com</Text>
          </GlassView>

          <GlassView style={styles.section} glassEffectStyle="regular">
            <View style={styles.infoRow}>
              <IconSymbol 
                ios_icon_name="phone.fill" 
                android_material_icon_name="phone" 
                size={IS_IPAD ? 28 : 24} 
                color={theme.dark ? '#98989D' : '#666'} 
              />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>+1 (555) 123-4567</Text>
            </View>
            <View style={styles.infoRow}>
              <IconSymbol 
                ios_icon_name="location.fill" 
                android_material_icon_name="location-on" 
                size={IS_IPAD ? 28 : 24} 
                color={theme.dark ? '#98989D' : '#666'} 
              />
              <Text style={[styles.infoText, { color: theme.colors.text }]}>San Francisco, CA</Text>
            </View>
          </GlassView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: IS_IPAD ? 40 : 20,
  },
  contentContainerIPad: {
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
  },
  profileHeader: {
    alignItems: 'center',
    borderRadius: IS_IPAD ? 20 : 12,
    padding: IS_IPAD ? 48 : 32,
    marginBottom: IS_IPAD ? 24 : 16,
    gap: IS_IPAD ? 16 : 12,
  },
  name: {
    fontSize: IS_IPAD ? 32 : 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: IS_IPAD ? 20 : 16,
  },
  section: {
    borderRadius: IS_IPAD ? 20 : 12,
    padding: IS_IPAD ? 28 : 20,
    gap: IS_IPAD ? 16 : 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: IS_IPAD ? 16 : 12,
  },
  infoText: {
    fontSize: IS_IPAD ? 20 : 16,
  },
});
