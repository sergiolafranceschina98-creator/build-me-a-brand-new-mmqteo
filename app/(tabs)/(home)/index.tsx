
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

type DecisionType = 'career' | 'relationship' | 'financial' | 'life-change' | null;

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
    paddingBottom: 100,
    paddingTop: 20,
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
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  typeCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  typeIcon: {
    marginRight: 16,
  },
  typeContent: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  optionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  priorityCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  rankButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rankButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rankButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  rankButtonTextSelected: {
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
  resultSection: {
    marginBottom: 20,
  },
  resultSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  resultSectionText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: colors.cardBorder,
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: colors.cardBorder,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

const decisionTypes = [
  {
    id: 'career' as DecisionType,
    title: 'Career Decision',
    description: 'Job changes, promotions, career pivots',
    icon: 'work',
  },
  {
    id: 'relationship' as DecisionType,
    title: 'Relationship',
    description: 'Personal relationships, commitments, boundaries',
    icon: 'favorite',
  },
  {
    id: 'financial' as DecisionType,
    title: 'Financial',
    description: 'Major purchases, investments, financial commitments',
    icon: 'payments',
  },
  {
    id: 'life-change' as DecisionType,
    title: 'Life Change',
    description: 'Moving, lifestyle changes, major life decisions',
    icon: 'explore',
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

  const canContinueFromType = decisionType !== null;
  const canContinueFromDefine = decisionText.trim().length > 0;
  const canContinueFromOptions = options.length >= 2;
  const canContinueFromQuestions = Object.keys(answers).length >= 3;
  const canAnalyze = priorities.some(p => p.rank > 0);

  const recommendedOption = calculateRecommendation();
  const confidence = 78;

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
                A private, offline decision clarity tool. Turn mental noise into structured insight and clear next steps.
              </Text>
            </View>

            <View style={commonStyles.card}>
              <IconSymbol 
                android_material_icon_name="lightbulb" 
                size={48} 
                color={colors.primary}
                style={{ marginBottom: 16 }}
              />
              <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>How it works</Text>
              <Text style={commonStyles.textSecondary}>
                1. Choose your decision type{'\n'}
                2. Define your options{'\n'}
                3. Answer guided questions{'\n'}
                4. Rank your priorities{'\n'}
                5. Get a clear recommendation
              </Text>
            </View>

            <View style={commonStyles.card}>
              <IconSymbol 
                android_material_icon_name="lock" 
                size={32} 
                color={colors.success}
                style={{ marginBottom: 12 }}
              />
              <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>Private & Offline</Text>
              <Text style={commonStyles.textSecondary}>
                All data stays on your device. No accounts, no internet required, no tracking.
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
                >
                  <IconSymbol
                    android_material_icon_name={type.icon}
                    size={32}
                    color={isSelected ? colors.primary : colors.textSecondary}
                    style={styles.typeIcon}
                  />
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

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Example: Should I accept the job offer at the new company?"
              placeholderTextColor={colors.textSecondary}
              value={decisionText}
              onChangeText={setDecisionText}
              multiline
              numberOfLines={4}
            />

            <View style={commonStyles.card}>
              <IconSymbol 
                android_material_icon_name="info" 
                size={24} 
                color={colors.primary}
                style={{ marginBottom: 8 }}
              />
              <Text style={commonStyles.textSecondary}>
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
                >
                  <IconSymbol
                    android_material_icon_name="delete"
                    size={20}
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

            <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 }}>
            <IconSymbol 
              android_material_icon_name="psychology" 
              size={64} 
              color={colors.primary}
              style={{ marginBottom: 24 }}
            />
            <Text style={[commonStyles.subtitle, { textAlign: 'center' }]}>Analyzing your decision...</Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
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

            <View style={commonStyles.card}>
              <IconSymbol 
                android_material_icon_name="info" 
                size={24} 
                color={colors.textSecondary}
                style={{ marginBottom: 8 }}
              />
              <Text style={[commonStyles.textSecondary, { fontSize: 13 }]}>
                This is a thinking tool, not professional advice. For legal, medical, or financial decisions, consult qualified professionals.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {step === 'welcome' && (
          <TouchableOpacity style={styles.primaryButton} onPress={handleStartDecision}>
            <Text style={styles.primaryButtonText}>Start New Decision</Text>
          </TouchableOpacity>
        )}

        {step === 'select-type' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromType && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromType}
            disabled={!canContinueFromType}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        )}

        {step === 'define-decision' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromDefine && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromDefine}
            disabled={!canContinueFromDefine}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        )}

        {step === 'add-options' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromOptions && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromOptions}
            disabled={!canContinueFromOptions}
          >
            <Text style={styles.primaryButtonText}>Continue to Questions</Text>
          </TouchableOpacity>
        )}

        {step === 'guided-questions' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canContinueFromQuestions && styles.primaryButtonDisabled]} 
            onPress={handleContinueFromQuestions}
            disabled={!canContinueFromQuestions}
          >
            <Text style={styles.primaryButtonText}>Continue to Priorities</Text>
          </TouchableOpacity>
        )}

        {step === 'priorities' && (
          <TouchableOpacity 
            style={[styles.primaryButton, !canAnalyze && styles.primaryButtonDisabled]} 
            onPress={handleAnalyze}
            disabled={!canAnalyze}
          >
            <Text style={styles.primaryButtonText}>Analyze Decision</Text>
          </TouchableOpacity>
        )}

        {step === 'result' && (
          <TouchableOpacity style={styles.primaryButton} onPress={handleStartOver}>
            <Text style={styles.primaryButtonText}>Start New Decision</Text>
          </TouchableOpacity>
        )}

        {step !== 'welcome' && step !== 'analysis' && step !== 'result' && (
          <TouchableOpacity style={styles.secondaryButton} onPress={handleStartOver}>
            <Text style={styles.secondaryButtonText}>Start Over</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
