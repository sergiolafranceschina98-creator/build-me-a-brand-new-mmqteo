
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { colors, commonStyles } from "@/styles/commonStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 48 : 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About Reality Check</Text>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol 
            android_material_icon_name="privacy-tip" 
            size={40} 
            color={colors.primary}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.infoTitle}>Privacy First</Text>
          <Text style={styles.infoText}>
            All your decisions and answers are stored locally on your device only. No data is sent to any server or cloud service.
          </Text>
          <Text style={styles.infoText}>
            No account required. No tracking. No analytics. Your thoughts remain completely private.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol 
            android_material_icon_name="offline-bolt" 
            size={40} 
            color={colors.success}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.infoTitle}>Offline First</Text>
          <Text style={styles.infoText}>
            Reality Check works completely offline. No internet connection required at any time.
          </Text>
          <Text style={styles.infoText}>
            Make decisions anywhere, anytime, without worrying about connectivity.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol 
            android_material_icon_name="psychology" 
            size={40} 
            color={colors.secondary}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoText}>
            Reality Check uses structured decision-making frameworks to help you think clearly about difficult choices.
          </Text>
          <Text style={styles.infoText}>
            By breaking down complex decisions into focused questions and priorities, the app helps reduce emotional bias and highlight real-world tradeoffs.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol 
            android_material_icon_name="warning" 
            size={40} 
            color={colors.warning}
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.infoTitle}>Important Disclaimer</Text>
          <Text style={styles.infoText}>
            Reality Check is a thinking tool designed to help you organize your thoughts and gain clarity.
          </Text>
          <Text style={styles.infoText}>
            It is NOT a replacement for professional advice. For legal, medical, financial, or therapeutic decisions, please consult qualified professionals.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Version</Text>
          <Text style={styles.infoText}>Reality Check v1.0</Text>
          <Text style={[styles.infoText, { marginTop: 12 }]}>
            Built with privacy and clarity in mind.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
