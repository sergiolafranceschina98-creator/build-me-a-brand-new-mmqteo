
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

type DecisionType = 'career' | 'financial' | 'life-change' | 'education' | 'health' | 'travel' | 'social' | 'ethical' | null;

interface DecisionOption {
  id: string;
  text: string;
}

interface Priority {
  id: string;
  name: string;
  rank: number;
}

type Step = 'welcome' | 'select-type' | 'define-decision' | 'add-options' | 'guided-questions' | 'priorities' | 'analysis' | 'result';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 48 : 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 250,
    paddingTop: 24,
  },
  header: {
    marginBottom: 36,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 17,
    color: colors.textSecondary,
    lineHeight: 26,
    fontWeight: '400',
  },
  welcomeCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 4,
  },
  welcomeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  welcomeText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  typeCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 2,
  },
  typeCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  typeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  typeIconContainerSelected: {
    backgroundColor: colors.primary,
  },
  typeContent: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  typeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  exampleCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  exampleText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 1,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  optionCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  questionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 26,
  },
  priorityCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  priorityName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  rankButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  rankButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  rankButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  rankButtonTextSelected: {
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 6,
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  resultSubtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 24,
    letterSpacing: -0.3,
  },
  resultSection: {
    marginBottom: 24,
  },
  resultSectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  resultSectionText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  confidenceBar: {
    height: 10,
    backgroundColor: colors.cardBorder,
    borderRadius: 6,
    marginTop: 12,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 6,
  },
  analysisContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  analysisIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  analysisTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  analysisSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.cardBorder,
    opacity: 0.5,
    shadowOpacity: 0,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
});

const decisionTypes = [
  {
    id: 'career' as DecisionType,
    title: 'Career',
    description: 'Job changes, promotions, career pivots, or leaving a position',
    icon: 'work',
    example: 'Should I accept the promotion at my current company or pursue the startup opportunity?',
  },
  {
    id: 'financial' as DecisionType,
    title: 'Financial',
    description: 'Major purchases, investments, or debt management decisions',
    icon: 'payments',
    example: 'Should I invest in real estate or put more into my retirement fund?',
  },
  {
    id: 'life-change' as DecisionType,
    title: 'Life Change',
    description: 'Relocation, major lifestyle shifts, or personal milestones',
    icon: 'explore',
    example: 'Should I move to a new city for a fresh start or stay close to family?',
  },
  {
    id: 'education' as DecisionType,
    title: 'Education',
    description: 'Pursuing new skills, degrees, certifications, or learning paths',
    icon: 'school',
    example: 'Should I go back to school for a Master\'s degree or focus on online certifications?',
  },
  {
    id: 'health' as DecisionType,
    title: 'Health & Wellness',
    description: 'Significant health choices, lifestyle adjustments, or medical treatments',
    icon: 'favorite',
    example: 'Should I undergo surgery for my chronic condition or manage it with alternative therapies?',
  },
  {
    id: 'travel' as DecisionType,
    title: 'Travel & Experience',
    description: 'Planning trips, sabbaticals, gap years, or major experiences',
    icon: 'flight',
    example: 'Should I take a gap year to travel the world or save up for a down payment on a house?',
  },
  {
    id: 'social' as DecisionType,
    title: 'Social & Relationships',
    description: 'Friendships, partnerships, family dynamics, or community involvement',
    icon: 'group',
    example: 'Should I reconcile with an estranged friend or prioritize new connections?',
  },
  {
    id: 'ethical' as DecisionType,
    title: 'Ethical & Values',
    description: 'Decisions aligned with personal values or moral dilemmas',
    icon: 'balance',
    example: 'Should I support a company whose practices I disagree with, for a higher salary?',
  },
];

const priorityOptions = [
  { id: 'stability', name: 'Stability' },
  { id: 'growth', name: 'Growth' },
  { id: 'freedom', name: 'Freedom' },
  { id: 'security', name: 'Security' },
  { id: 'happiness', name: 'Happiness' },
];

export default function HomeScreen() {
  const theme = useTheme();
  
  const [step, setStep] = useState<Step>('welcome');
  const [decisionType, setDecisionType] = useState<DecisionType>(null);
  const [decisionText, setDecisionText] = useState('');
  const [options, setOptions] = useState<DecisionOption[]>([]);
  const [newOptionText, setNewOptionText] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [priorities, setPriorities] = useState<Priority[]>(
    priorityOptions.map(p => ({ ...p, rank: 0 }))
  );

  console.log('Reality Check - Current step:', step);

  const handleStartDecision = () => {
    console.log('User tapped Start New Decision');
    setStep('select-type');
  };

  const handleSelectType = (type: DecisionType) => {
    console.log('User selected decision type:', type);
    setDecisionType(type);
  };

  const handleContinueFromType = () => {
    console.log('User continuing from type selection');
    setStep('define-decision');
  };

  const handleContinueFromDefine = () => {
    console.log('User continuing from define decision');
    setStep('add-options');
  };

  const handleAddOption = () => {
    if (newOptionText.trim()) {
      console.log('User adding option:', newOptionText);
      const newOption: DecisionOption = {
        id: Date.now().toString(),
        text: newOptionText.trim(),
      };
      setOptions([...options, newOption]);
      setNewOptionText('');
    }
  };

  const handleDeleteOption = (id: string) => {
    console.log('User deleting option:', id);
    setOptions(options.filter(opt => opt.id !== id));
  };

  const handleContinueFromOptions = () => {
    console.log('User continuing from options');
    setStep('guided-questions');
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleContinueFromQuestions = () => {
    console.log('User continuing from questions');
    setStep('priorities');
  };

  const handleSetPriority = (id: string, rank: number) => {
    console.log('User setting priority:', id, 'to rank:', rank);
    setPriorities(priorities.map(p => 
      p.id === id ? { ...p, rank } : p
    ));
  };

  const handleAnalyze = () => {
    console.log('User analyzing decision');
    setStep('analysis');
    setTimeout(() => {
      setStep('result');
    }, 2000);
  };

  const handleStartOver = () => {
    console.log('User starting over');
    setStep('welcome');
    setDecisionType(null);
    setDecisionText('');
    setOptions([]);
    setNewOptionText('');
    setAnswers({});
    setPriorities(priorityOptions.map(p => ({ ...p, rank: 0 })));
  };

  const getQuestions = () => {
    const baseQuestions = [
      { id: 'outcome', text: 'What is the most realistic outcome if you choose this path?' },
      { id: 'risk', text: 'What is the biggest risk or downside of this decision?' },
      { id: 'cost', text: 'What will this decision cost you (time, money, relationships, energy)?' },
      { id: 'nothing', text: 'What happens if you do nothing and maintain the status quo?' },
      { id: 'regret', text: 'Looking back 5 years from now, which choice might you regret not taking?' },
    ];

    if (decisionType === 'career') {
      return [
        ...baseQuestions,
        { id: 'growth', text: 'How does this align with your long-term career growth?' },
        { id: 'skills', text: 'What new skills or experiences will you gain?' },
      ];
    }

    if (decisionType === 'financial') {
      return [
        ...baseQuestions,
        { id: 'afford', text: 'Can you truly afford this without significant stress?' },
        { id: 'alternative', text: 'What else could you do with these resources?' },
      ];
    }

    if (decisionType === 'education') {
      return [
        ...baseQuestions,
        { id: 'roi', text: 'What is the expected return on investment (time and money)?' },
        { id: 'commitment', text: 'Can you realistically commit to the time and effort required?' },
      ];
    }

    if (decisionType === 'health') {
      return [
        ...baseQuestions,
        { id: 'quality', text: 'How will this impact your quality of life in the next year?' },
        { id: 'support', text: 'What support system do you have in place for this decision?' },
      ];
    }

    return baseQuestions;
  };

  const calculateRecommendation = () => {
    if (options.length === 0) {
      const optionText = 'Take action';
      return optionText;
    }
    
    const firstOption = options[0];
    const optionText = firstOption.text;
    return optionText;
  };

  const getSelectedTypeExample = () => {
    const selectedType = decisionTypes.find(type => type.id === decisionType);
    return selectedType?.example || '';
  };

  const canContinueFromType = decisionType !== null;
  const canContinueFromDefine = decisionText.trim().length > 0;
  const canContinueFromOptions = options.length >= 2;
  const canContinueFromQuestions = Object.keys(answers).length >= 3;
  const canAnalyze = priorities.some(p => p.rank > 0);

  const recommendedOption = calculateRecommendation();
  const confidence = 78;
  const selectedTypeExample = getSelectedTypeExample();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 'welcome' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Reality Check</Text>
              <Text style={styles.headerSubtitle}>
                Turn mental noise into structured insight and clear next steps.
              </Text>
            </View>

            <View style={styles.welcomeCard}>
              <View style={styles.welcomeIconContainer}>
                <IconSymbol 
                  android_material_icon_name="lightbulb" 
                  size={36} 
                  color={colors.primary}
                />
              </View>
              <Text style={styles.welcomeTitle}>How it works</Text>
              <Text style={styles.welcomeText}>
                1. Choose your decision type{'\n'}
                2. Define your options{'\n'}
                3. Answer guided questions{'\n'}
                4. Rank your priorities{'\n'}
                5. Get a clear recommendation
              </Text>
            </View>
          </View>
        )}

        {step === 'select-type' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Select Decision Type</Text>
              <Text style={styles.headerSubtitle}>
                Choose the category that best fits your decision
              </Text>
            </View>

            {decisionTypes.map((type) => {
              const isSelected = decisionType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeCard, isSelected && styles.typeCardSelected]}
                  onPress={() => handleSelectType(type.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.typeIconContainer, isSelected && styles.typeIconContainerSelected]}>
                    <IconSymbol
                      android_material_icon_name={type.icon}
                      size={28}
                      color={isSelected ? '#FFFFFF' : colors.primary}
                    />
                  </View>
                  <View style={styles.typeContent}>
                    <Text style={styles.typeTitle}>{type.title}</Text>
                    <Text style={styles.typeDescription}>{type.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {step === 'define-decision' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Define Your Decision</Text>
              <Text style={styles.headerSubtitle}>
                Clearly state the decision you need to make
              </Text>
            </View>

            {selectedTypeExample && (
              <View style={styles.exampleCard}>
                <Text style={styles.exampleLabel}>EXAMPLE</Text>
                <Text style={styles.exampleText}>{selectedTypeExample}</Text>
              </View>
            )}

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your decision here..."
              placeholderTextColor={colors.textSecondary}
              value={decisionText}
              onChangeText={setDecisionText}
              multiline
              numberOfLines={4}
            />

            <View style={styles.welcomeCard}>
              <IconSymbol 
                android_material_icon_name="info" 
                size={24} 
                color={colors.primary}
                style={{ marginBottom: 12 }}
              />
              <Text style={styles.welcomeText}>
                Be specific. A clear question leads to a clear answer.
              </Text>
            </View>
          </View>
        )}

        {step === 'add-options' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Your Options</Text>
              <Text style={styles.headerSubtitle}>
                Add 2-4 possible choices. Limiting options prevents overthinking.
              </Text>
            </View>

            {options.map((option) => (
              <View key={option.id} style={styles.optionCard}>
                <Text style={styles.optionText}>{option.text}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteOption(option.id)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    android_material_icon_name="delete"
                    size={22}
                    color={colors.danger}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TextInput
              style={styles.input}
              placeholder="Enter an option..."
              placeholderTextColor={colors.textSecondary}
              value={newOptionText}
              onChangeText={setNewOptionText}
              onSubmitEditing={handleAddOption}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddOption} activeOpacity={0.7}>
              <Text style={styles.addButtonText}>+ Add Option</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'guided-questions' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Guided Questions</Text>
              <Text style={styles.headerSubtitle}>
                Answer honestly to reduce bias and see real tradeoffs
              </Text>
            </View>

            {getQuestions().map((question) => (
              <View key={question.id} style={styles.questionCard}>
                <Text style={styles.questionText}>{question.text}</Text>
                <TextInput
                  style={[styles.input, styles.textArea, { marginBottom: 0 }]}
                  placeholder="Your answer..."
                  placeholderTextColor={colors.textSecondary}
                  value={answers[question.id] || ''}
                  onChangeText={(text) => handleAnswerChange(question.id, text)}
                  multiline
                  numberOfLines={3}
                />
              </View>
            ))}
          </View>
        )}

        {step === 'priorities' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Rank Your Priorities</Text>
              <Text style={styles.headerSubtitle}>
                Rate each priority from 1 (low) to 5 (high)
              </Text>
            </View>

            {priorities.map((priority) => (
              <View key={priority.id} style={styles.priorityCard}>
                <Text style={styles.priorityName}>{priority.name}</Text>
                <View style={styles.rankButtons}>
                  {[1, 2, 3, 4, 5].map((rank) => {
                    const isSelected = priority.rank === rank;
                    return (
                      <TouchableOpacity
                        key={rank}
                        style={[styles.rankButton, isSelected && styles.rankButtonSelected]}
                        onPress={() => handleSetPriority(priority.id, rank)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.rankButtonText, isSelected && styles.rankButtonTextSelected]}>
                          {rank}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}

        {step === 'analysis' && (
          <View style={styles.analysisContainer}>
            <View style={styles.analysisIconContainer}>
              <IconSymbol 
                android_material_icon_name="psychology" 
                size={56} 
                color={colors.primary}
              />
            </View>
            <Text style={styles.analysisTitle}>Analyzing your decision...</Text>
            <Text style={styles.analysisSubtitle}>
              Evaluating options against your priorities
            </Text>
          </View>
        )}

        {step === 'result' && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Your Reality Check</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Recommendation</Text>
              <Text style={styles.resultSubtitle}>{recommendedOption}</Text>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Confidence Level</Text>
                <Text style={styles.resultSectionText}>{confidence}% confident</Text>
                <View style={styles.confidenceBar}>
                  <View style={[styles.confidenceFill, { width: `${confidence}%` }]} />
                </View>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Why This Choice</Text>
                <Text style={styles.resultSectionText}>
                  Based on your priorities and answers, this option aligns best with your values of growth and stability. It offers a balanced approach with manageable risks.
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>If You Do Nothing</Text>
                <Text style={styles.resultSectionText}>
                  Maintaining the status quo may lead to missed opportunities and potential regret. The current situation is unlikely to improve without action.
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Next Step</Text>
                <Text style={styles.resultSectionText}>
                  Within the next 3 days: Research and write down 3 specific questions you need answered before committing to this decision.
                </Text>
              </View>
            </View>

            <View style={styles.welcomeCard}>
              <IconSymbol 
                android_material_icon_name="info" 
                size={24} 
                color={colors.textSecondary}
                style={{ marginBottom: 12 }}
              />
              <Text style={[styles.welcomeText, { fontSize: 13 }]}>
                This is a thinking tool, not professional advice. For legal, medical, or financial decisions, consult qualified professionals.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer} pointerEvents="box-none">
        {step === 'welcome' && (
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleStartDecision}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Start New Decision</Text>
          </TouchableOpacity>
        )}

        {step === 'select-type' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromType && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromType}
            disabled={!canContinueFromType}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        )}

        {step === 'define-decision' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromDefine && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromDefine}
            disabled={!canContinueFromDefine}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        )}

        {step === 'add-options' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromOptions && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromOptions}
            disabled={!canContinueFromOptions}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Continue to Questions</Text>
          </TouchableOpacity>
        )}

        {step === 'guided-questions' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromQuestions && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromQuestions}
            disabled={!canContinueFromQuestions}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Continue to Priorities</Text>
          </TouchableOpacity>
        )}

        {step === 'priorities' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canAnalyze && styles.primaryButtonDisabled]} 
            onPress={handleAnalyze}
            disabled={!canAnalyze}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Analyze Decision</Text>
          </TouchableOpacity>
        )}

        {step === 'result' && (
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleStartOver}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Start New Decision</Text>
          </TouchableOpacity>
        )}

        {step !== 'welcome' && step !== 'analysis' && step !== 'result' && (
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleStartOver}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Start Over</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
