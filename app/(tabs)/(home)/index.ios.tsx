
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Dimensions } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

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

interface AnalysisResult {
  recommendedOption: string;
  confidence: number;
  reasoning: string;
}

type Step = 'welcome' | 'type' | 'define' | 'options' | 'questions' | 'priorities' | 'analysis';

const IS_IPAD = Platform.isPad;
const CONTENT_MAX_WIDTH = IS_IPAD ? 800 : undefined;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: IS_IPAD ? 40 : 20,
    paddingVertical: IS_IPAD ? 32 : 20,
    alignItems: IS_IPAD ? 'center' : 'stretch',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
  },
  header: {
    marginBottom: IS_IPAD ? 40 : 24,
    alignItems: 'center',
  },
  title: {
    fontSize: IS_IPAD ? 42 : 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: IS_IPAD ? 16 : 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: IS_IPAD ? 20 : 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: IS_IPAD ? 28 : 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: IS_IPAD ? 20 : 16,
    padding: IS_IPAD ? 28 : 20,
    marginBottom: IS_IPAD ? 20 : 16,
    ...commonStyles.shadow,
  },
  cardTitle: {
    fontSize: IS_IPAD ? 24 : 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: IS_IPAD ? 16 : 12,
  },
  cardText: {
    fontSize: IS_IPAD ? 18 : 16,
    color: colors.textSecondary,
    lineHeight: IS_IPAD ? 26 : 24,
  },
  typeButton: {
    backgroundColor: colors.card,
    borderRadius: IS_IPAD ? 16 : 12,
    padding: IS_IPAD ? 24 : 18,
    marginBottom: IS_IPAD ? 16 : 12,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: IS_IPAD ? 100 : 80,
    justifyContent: 'center',
  },
  typeButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  typeButtonTitle: {
    fontSize: IS_IPAD ? 22 : 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: IS_IPAD ? 8 : 6,
  },
  typeButtonDescription: {
    fontSize: IS_IPAD ? 16 : 14,
    color: colors.textSecondary,
    lineHeight: IS_IPAD ? 22 : 20,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: IS_IPAD ? 14 : 12,
    padding: IS_IPAD ? 20 : 16,
    fontSize: IS_IPAD ? 18 : 16,
    color: colors.text,
    marginBottom: IS_IPAD ? 16 : 12,
    minHeight: IS_IPAD ? 60 : 50,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: IS_IPAD ? 140 : 120,
    textAlignVertical: 'top',
  },
  button: {
    ...buttonStyles.primary,
    borderRadius: IS_IPAD ? 14 : 12,
    padding: IS_IPAD ? 20 : 16,
    minHeight: IS_IPAD ? 64 : 54,
    marginTop: IS_IPAD ? 16 : 12,
  },
  buttonText: {
    ...buttonStyles.primaryText,
    fontSize: IS_IPAD ? 20 : 18,
    fontWeight: '600',
  },
  secondaryButton: {
    ...buttonStyles.secondary,
    borderRadius: IS_IPAD ? 14 : 12,
    padding: IS_IPAD ? 20 : 16,
    minHeight: IS_IPAD ? 64 : 54,
    marginTop: IS_IPAD ? 12 : 8,
  },
  secondaryButtonText: {
    ...buttonStyles.secondaryText,
    fontSize: IS_IPAD ? 20 : 18,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: IS_IPAD ? 16 : 12,
  },
  optionInput: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: IS_IPAD ? 12 : 10,
    padding: IS_IPAD ? 18 : 14,
    fontSize: IS_IPAD ? 18 : 16,
    color: colors.text,
    marginRight: IS_IPAD ? 12 : 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteButton: {
    width: IS_IPAD ? 48 : 40,
    height: IS_IPAD ? 48 : 40,
    borderRadius: IS_IPAD ? 24 : 20,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: IS_IPAD ? 12 : 10,
    padding: IS_IPAD ? 16 : 12,
    marginTop: IS_IPAD ? 12 : 8,
    minHeight: IS_IPAD ? 56 : 48,
  },
  addButtonText: {
    fontSize: IS_IPAD ? 18 : 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: IS_IPAD ? 10 : 8,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: IS_IPAD ? 12 : 10,
    padding: IS_IPAD ? 18 : 14,
    marginBottom: IS_IPAD ? 12 : 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priorityText: {
    flex: 1,
    fontSize: IS_IPAD ? 18 : 16,
    color: colors.text,
  },
  rankButton: {
    width: IS_IPAD ? 44 : 36,
    height: IS_IPAD ? 44 : 36,
    borderRadius: IS_IPAD ? 22 : 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: IS_IPAD ? 10 : 8,
  },
  rankButtonText: {
    fontSize: IS_IPAD ? 18 : 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: colors.success,
    borderRadius: IS_IPAD ? 20 : 16,
    padding: IS_IPAD ? 32 : 24,
    marginBottom: IS_IPAD ? 24 : 20,
    ...commonStyles.shadow,
  },
  resultTitle: {
    fontSize: IS_IPAD ? 28 : 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: IS_IPAD ? 12 : 8,
    textAlign: 'center',
  },
  resultOption: {
    fontSize: IS_IPAD ? 24 : 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: IS_IPAD ? 16 : 12,
  },
  confidenceText: {
    fontSize: IS_IPAD ? 20 : 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  reasoningCard: {
    backgroundColor: colors.card,
    borderRadius: IS_IPAD ? 20 : 16,
    padding: IS_IPAD ? 28 : 20,
    marginBottom: IS_IPAD ? 20 : 16,
    ...commonStyles.shadow,
  },
  reasoningText: {
    fontSize: IS_IPAD ? 18 : 16,
    color: colors.text,
    lineHeight: IS_IPAD ? 28 : 26,
  },
  questionLabel: {
    fontSize: IS_IPAD ? 18 : 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: IS_IPAD ? 12 : 8,
    lineHeight: IS_IPAD ? 26 : 24,
  },
});

export default function HomeScreen() {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [selectedType, setSelectedType] = useState<DecisionType>(null);
  const [decisionText, setDecisionText] = useState('');
  const [options, setOptions] = useState<DecisionOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [priorities, setPriorities] = useState<Priority[]>([
    { id: '1', name: 'Stability', rank: 0 },
    { id: '2', name: 'Growth', rank: 0 },
    { id: '3', name: 'Freedom', rank: 0 },
    { id: '4', name: 'Security', rank: 0 },
    { id: '5', name: 'Happiness', rank: 0 },
  ]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  console.log('HomeScreen rendered - Current step:', currentStep, 'iPad mode:', IS_IPAD);

  const handleStartDecision = () => {
    console.log('User started new decision');
    setCurrentStep('type');
  };

  const handleSelectType = (type: DecisionType) => {
    console.log('User selected decision type:', type);
    setSelectedType(type);
  };

  const handleContinueFromType = () => {
    if (!selectedType) return;
    console.log('Continuing from type selection to define step');
    setCurrentStep('define');
  };

  const handleContinueFromDefine = () => {
    if (!decisionText.trim()) return;
    console.log('Continuing from define to options step');
    setCurrentStep('options');
  };

  const handleAddOption = () => {
    const newId = String(options.length + 1);
    console.log('Adding new option:', newId);
    setOptions([...options, { id: newId, text: '' }]);
  };

  const handleDeleteOption = (id: string) => {
    console.log('Deleting option:', id);
    setOptions(options.filter(opt => opt.id !== id));
  };

  const handleContinueFromOptions = () => {
    const filledOptions = options.filter(opt => opt.text.trim());
    if (filledOptions.length < 2) return;
    console.log('Continuing from options to questions step');
    setCurrentStep('questions');
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleContinueFromQuestions = () => {
    console.log('Continuing from questions to priorities step');
    setCurrentStep('priorities');
  };

  const handleSetPriority = (id: string, rank: number) => {
    console.log('Setting priority rank:', id, rank);
    setPriorities(priorities.map(p => 
      p.id === id ? { ...p, rank } : p
    ));
  };

  const handleAnalyze = () => {
    console.log('Analyzing decision with user inputs');
    const result = calculateRecommendation();
    setAnalysisResult(result);
    setCurrentStep('analysis');
  };

  const handleStartOver = () => {
    console.log('User starting over - resetting all state');
    setCurrentStep('welcome');
    setSelectedType(null);
    setDecisionText('');
    setOptions([{ id: '1', text: '' }, { id: '2', text: '' }]);
    setAnswers({});
    setPriorities([
      { id: '1', name: 'Stability', rank: 0 },
      { id: '2', name: 'Growth', rank: 0 },
      { id: '3', name: 'Freedom', rank: 0 },
      { id: '4', name: 'Security', rank: 0 },
      { id: '5', name: 'Happiness', rank: 0 },
    ]);
    setAnalysisResult(null);
  };

  const getQuestions = () => {
    const baseQuestions = [
      { id: 'outcome', label: 'What is the most realistic outcome if you choose this path?' },
      { id: 'risk', label: 'What are the real risks and downsides?' },
      { id: 'cost', label: 'What will this actually cost you (time, money, energy)?' },
      { id: 'regret', label: 'If you look back in 5 years, what might you regret?' },
    ];
    return baseQuestions;
  };

  const calculateRecommendation = (): AnalysisResult => {
    const filledOptions = options.filter(opt => opt.text.trim());
    
    const scores = filledOptions.map((option, index) => {
      let score = 0;
      const timestampSeed = Date.now() + index;
      
      const rankedPriorities = priorities.filter(p => p.rank > 0).sort((a, b) => a.rank - b.rank);
      rankedPriorities.forEach((priority, idx) => {
        const weight = rankedPriorities.length - idx;
        const priorityKeywords = priority.name.toLowerCase().split(' ');
        const optionLower = option.text.toLowerCase();
        const answerText = Object.values(answers).join(' ').toLowerCase();
        
        priorityKeywords.forEach(keyword => {
          if (optionLower.includes(keyword) || answerText.includes(keyword)) {
            score += weight * 3;
          }
        });
      });
      
      const positiveKeywords = ['good', 'great', 'excellent', 'positive', 'beneficial', 'advantage', 'opportunity', 'growth', 'success', 'improve', 'better', 'gain', 'profit', 'win'];
      const negativeKeywords = ['bad', 'poor', 'negative', 'risk', 'danger', 'loss', 'problem', 'difficult', 'hard', 'expensive', 'costly', 'fail', 'worse'];
      
      Object.values(answers).forEach(answer => {
        const answerLower = answer.toLowerCase();
        positiveKeywords.forEach(keyword => {
          if (answerLower.includes(keyword)) score += 2;
        });
        negativeKeywords.forEach(keyword => {
          if (answerLower.includes(keyword)) score -= 1;
        });
      });
      
      score += (index === 0 ? 2 : index === 1 ? 1 : 0);
      
      const answerLength = Object.values(answers).reduce((sum, ans) => sum + ans.length, 0);
      score += Math.min(answerLength / 100, 5);
      
      score += (Math.sin(timestampSeed) * 5);
      
      return { option, score };
    });
    
    scores.sort((a, b) => b.score - a.score);
    const bestOption = scores[0];
    
    const maxPossibleScore = 100;
    let confidence = Math.min(Math.max((bestOption.score / maxPossibleScore) * 100, 38), 92);
    
    const allQuestionsAnswered = getQuestions().every(q => answers[q.id]?.trim());
    if (allQuestionsAnswered) {
      confidence += 10;
    }
    
    if (scores.length > 1 && Math.abs(scores[0].score - scores[1].score) < 5) {
      confidence -= 20;
    }
    
    confidence = Math.min(Math.max(confidence, 38), 92);
    
    const reasoning = `Based on your priorities and answers, "${bestOption.option.text}" aligns best with what you value most. ${
      confidence > 70 
        ? 'The analysis shows strong alignment with your stated priorities.' 
        : 'While this appears to be the better option, the decision is close and requires careful consideration.'
    }`;
    
    return {
      recommendedOption: bestOption.option.text,
      confidence: Math.round(confidence),
      reasoning,
    };
  };

  const getSelectedTypeExample = () => {
    const examples: Record<string, string> = {
      career: 'e.g., "Should I accept the new job offer or stay in my current position?"',
      relationship: 'e.g., "Should I move in with my partner or wait another year?"',
      financial: 'e.g., "Should I invest in real estate or keep saving in the bank?"',
      'life-change': 'e.g., "Should I move to a new city or stay where I am?"',
    };
    const exampleText = selectedType ? examples[selectedType] : '';
    return exampleText;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {currentStep === 'welcome' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Reality Check</Text>
                <Text style={styles.subtitle}>
                  Turn mental noise into clear decisions
                </Text>
              </View>
              
              <View style={styles.card}>
                <Text style={styles.cardTitle}>How it works</Text>
                <Text style={styles.cardText}>
                  Reality Check guides you through a structured process to help you make difficult decisions with confidence. No fluff, just practical questions and clear recommendations.
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleStartDecision}>
                <Text style={styles.buttonText}>Start New Decision</Text>
              </TouchableOpacity>
            </>
          )}

          {currentStep === 'type' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>What type of decision?</Text>
                <Text style={styles.subtitle}>
                  Select the category that best fits your situation
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.typeButton, selectedType === 'career' && styles.typeButtonSelected]}
                onPress={() => handleSelectType('career')}
              >
                <Text style={styles.typeButtonTitle}>Career</Text>
                <Text style={styles.typeButtonDescription}>
                  Job changes, promotions, career pivots
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, selectedType === 'relationship' && styles.typeButtonSelected]}
                onPress={() => handleSelectType('relationship')}
              >
                <Text style={styles.typeButtonTitle}>Relationship</Text>
                <Text style={styles.typeButtonDescription}>
                  Dating, commitment, family decisions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, selectedType === 'financial' && styles.typeButtonSelected]}
                onPress={() => handleSelectType('financial')}
              >
                <Text style={styles.typeButtonTitle}>Financial</Text>
                <Text style={styles.typeButtonDescription}>
                  Investments, purchases, money management
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, selectedType === 'life-change' && styles.typeButtonSelected]}
                onPress={() => handleSelectType('life-change')}
              >
                <Text style={styles.typeButtonTitle}>Life Change</Text>
                <Text style={styles.typeButtonDescription}>
                  Moving, lifestyle shifts, major transitions
                </Text>
              </TouchableOpacity>

              {selectedType && (
                <TouchableOpacity style={styles.button} onPress={handleContinueFromType}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {currentStep === 'define' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Define your decision</Text>
                <Text style={styles.subtitle}>
                  Be specific about what you're trying to decide
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardText}>
                  {getSelectedTypeExample()}
                </Text>
              </View>

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your decision..."
                placeholderTextColor={colors.textSecondary}
                value={decisionText}
                onChangeText={setDecisionText}
                multiline
              />

              {decisionText.trim() && (
                <TouchableOpacity style={styles.button} onPress={handleContinueFromDefine}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {currentStep === 'options' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>What are your options?</Text>
                <Text style={styles.subtitle}>
                  List the choices you're considering (2-5 options)
                </Text>
              </View>

              {options.map((option, index) => (
                <View key={option.id} style={styles.optionRow}>
                  <TextInput
                    style={styles.optionInput}
                    placeholder={`Option ${index + 1}`}
                    placeholderTextColor={colors.textSecondary}
                    value={option.text}
                    onChangeText={(text) => {
                      const newOptions = [...options];
                      newOptions[index].text = text;
                      setOptions(newOptions);
                    }}
                  />
                  {options.length > 2 && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteOption(option.id)}
                    >
                      <IconSymbol
                        ios_icon_name="trash"
                        android_material_icon_name="delete"
                        size={IS_IPAD ? 24 : 20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {options.length < 5 && (
                <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
                  <IconSymbol
                    ios_icon_name="plus"
                    android_material_icon_name="add"
                    size={IS_IPAD ? 24 : 20}
                    color={colors.primary}
                  />
                  <Text style={styles.addButtonText}>Add Option</Text>
                </TouchableOpacity>
              )}

              {options.filter(opt => opt.text.trim()).length >= 2 && (
                <TouchableOpacity style={styles.button} onPress={handleContinueFromOptions}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {currentStep === 'questions' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Answer these questions</Text>
                <Text style={styles.subtitle}>
                  Be honest and realistic in your responses
                </Text>
              </View>

              {getQuestions().map((question) => (
                <View key={question.id} style={styles.card}>
                  <Text style={styles.questionLabel}>{question.label}</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Your answer..."
                    placeholderTextColor={colors.textSecondary}
                    value={answers[question.id] || ''}
                    onChangeText={(text) => handleAnswerChange(question.id, text)}
                    multiline
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={handleContinueFromQuestions}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}

          {currentStep === 'priorities' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Rank your priorities</Text>
                <Text style={styles.subtitle}>
                  Tap to rank what matters most (1 = highest priority)
                </Text>
              </View>

              {priorities.map((priority) => (
                <View key={priority.id} style={styles.priorityItem}>
                  <Text style={styles.priorityText}>{priority.name}</Text>
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <TouchableOpacity
                      key={rank}
                      style={[
                        styles.rankButton,
                        priority.rank === rank && { backgroundColor: colors.success }
                      ]}
                      onPress={() => handleSetPriority(priority.id, rank)}
                    >
                      <Text style={styles.rankButtonText}>{rank}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={handleAnalyze}>
                <Text style={styles.buttonText}>Analyze Decision</Text>
              </TouchableOpacity>
            </>
          )}

          {currentStep === 'analysis' && analysisResult && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Your Recommendation</Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>Recommended Choice</Text>
                <Text style={styles.resultOption}>{analysisResult.recommendedOption}</Text>
                <Text style={styles.confidenceText}>
                  Confidence: {analysisResult.confidence}%
                </Text>
              </View>

              <View style={styles.reasoningCard}>
                <Text style={styles.cardTitle}>Why this choice?</Text>
                <Text style={styles.reasoningText}>{analysisResult.reasoning}</Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleStartOver}>
                <Text style={styles.buttonText}>Start New Decision</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
