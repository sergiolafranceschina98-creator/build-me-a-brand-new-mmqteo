
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Premium color palette - sophisticated and refined
export const colors = {
  // Primary - Deep indigo with richness
  primary: '#5B4FE8',
  primaryDark: '#4839D4',
  primaryLight: '#7B6FF2',
  
  // Accent colors - carefully balanced
  secondary: '#8B5CF6',
  accent: '#EC4899',
  
  // Backgrounds - layered depth
  background: '#FAFBFD',
  backgroundAlt: '#FFFFFF',
  backgroundElevated: '#F5F7FA',
  
  // Text - high contrast hierarchy
  text: '#0A0E27',
  textSecondary: '#5B6B8C',
  textTertiary: '#8B95A8',
  
  // Cards - subtle elevation
  card: '#FFFFFF',
  cardBorder: '#E8ECF4',
  cardBorderLight: '#F1F4F9',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  
  // Highlights and overlays
  highlight: '#F0EDFF',
  highlightStrong: '#E5DFFF',
  overlay: 'rgba(10, 14, 39, 0.6)',
  
  // Shadows - premium depth
  shadow: 'rgba(91, 79, 232, 0.08)',
  shadowDark: 'rgba(10, 14, 39, 0.12)',
  shadowStrong: 'rgba(91, 79, 232, 0.15)',
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -0.4,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 26,
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
  },
  section: {
    marginBottom: 32,
  },
});
