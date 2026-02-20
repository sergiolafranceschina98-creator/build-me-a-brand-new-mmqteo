
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#6366F1',      // Indigo - clarity and focus
  primaryDark: '#4F46E5',  // Darker indigo for depth
  secondary: '#8B5CF6',    // Purple - wisdom and insight
  accent: '#EC4899',       // Pink - emotional awareness
  background: '#F8F9FC',   // Slightly blue-tinted light gray
  backgroundAlt: '#FFFFFF', // White - clarity
  text: '#0F172A',         // Darker for better contrast
  textSecondary: '#64748B', // Slate gray - subtle
  card: '#FFFFFF',         // White cards
  cardBorder: '#E2E8F0',   // Softer border
  success: '#10B981',      // Green - positive outcome
  warning: '#F59E0B',      // Amber - caution
  danger: '#EF4444',       // Red - risk
  highlight: '#EEF2FF',    // Light indigo - emphasis
  shadow: 'rgba(99, 102, 241, 0.08)', // Primary color shadow
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 3,
  },
  section: {
    marginBottom: 24,
  },
});
