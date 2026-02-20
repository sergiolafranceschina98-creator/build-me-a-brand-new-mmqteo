
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

type DecisionType = 'career' | 'financial' | 'life-change' | 'education' | 'personal-growth' | 'travel' | 'social' | 'ethical' | null;

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
  statusQuoWarning: string;
  nextStep: string;
}

type Step = 'welcome' | 'select-type' | 'define-decision' | 'add-options' | 'guided-questions' | 'priorities' | 'analysis' | 'result';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 260,
    paddingTop: 32,
  },
  header: {
    marginBottom: 48,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: -1.2,
    lineHeight: 48,
  },
  headerSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  welcomeCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 32,
    marginBottom: 24,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.cardBorderLight,
  },
  welcomeIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
    letterSpacing: -0.4,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  typeCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 24,
    padding: 28,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 3,
  },
  typeCardSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
    backgroundColor: colors.highlight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 6,
    transform: [{ scale: 1.02 }],
  },
  typeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
  typeIconContainerSelected: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  typeContent: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  typeDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  exampleCard: {
    backgroundColor: colors.highlight,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  exampleText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontStyle: 'italic',
    letterSpacing: -0.1,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    padding: 20,
    fontSize: 17,
    color: colors.text,
    marginBottom: 18,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 2,
    letterSpacing: -0.1,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: 'top',
    lineHeight: 26,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    padding: 22,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
  },
  optionText: {
    flex: 1,
    fontSize: 17,
    color: colors.text,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 14,
    borderRadius: 12,
    backgroundColor: colors.backgroundElevated,
  },
  addButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  questionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 24,
    padding: 28,
    marginBottom: 24,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 18,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  priorityCard: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 3,
  },
  priorityName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  rankButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rankButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.backgroundElevated,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
  rankButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    transform: [{ scale: 1.1 }],
  },
  rankButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  rankButtonTextSelected: {
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 28,
    padding: 32,
    marginBottom: 28,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 8,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.6,
  },
  resultSubtitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 32,
    letterSpacing: -0.4,
    lineHeight: 30,
  },
  resultSection: {
    marginBottom: 28,
  },
  resultSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  resultSectionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  confidenceBar: {
    height: 12,
    backgroundColor: colors.cardBorder,
    borderRadius: 8,
    marginTop: 14,
    overflow: 'hidden',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 8,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  analysisContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  analysisIconContainer: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 6,
  },
  analysisTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: -0.4,
  },
  analysisSubtitle: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 110,
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    zIndex: 1001,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.cardBorder,
    opacity: 0.5,
    shadowOpacity: 0,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

const decisionTypes = [
  {
    id: 'career' as DecisionType,
    title: 'Career',
    description: 'Job changes, promotions, career pivots, or leaving a position',
    icon: 'work',
    iosIcon: 'briefcase.fill',
    example: 'Should I accept the promotion at my current company or pursue the startup opportunity?',
  },
  {
    id: 'financial' as DecisionType,
    title: 'Financial',
    description: 'Major purchases, investments, or debt management decisions',
    icon: 'payments',
    iosIcon: 'dollarsign.circle.fill',
    example: 'Should I invest in real estate or put more into my retirement fund?',
  },
  {
    id: 'life-change' as DecisionType,
    title: 'Life Change',
    description: 'Relocation, major lifestyle shifts, or personal milestones',
    icon: 'explore',
    iosIcon: 'map.fill',
    example: 'Should I move to a new city for a fresh start or stay close to family?',
  },
  {
    id: 'education' as DecisionType,
    title: 'Education',
    description: 'Pursuing new skills, degrees, certifications, or learning paths',
    icon: 'school',
    iosIcon: 'graduationcap.fill',
    example: 'Should I go back to school for a Master\'s degree or focus on online certifications?',
  },
  {
    id: 'personal-growth' as DecisionType,
    title: 'Personal Growth',
    description: 'Self-improvement, skill development, mindset shifts, or personal transformation',
    icon: 'self-improvement',
    iosIcon: 'figure.mind.and.body',
    example: 'Should I invest time in therapy and self-reflection or focus on building new professional skills?',
  },
  {
    id: 'travel' as DecisionType,
    title: 'Travel & Experience',
    description: 'Planning trips, sabbaticals, gap years, or major experiences',
    icon: 'flight',
    iosIcon: 'airplane',
    example: 'Should I take a gap year to travel the world or save up for a down payment on a house?',
  },
  {
    id: 'social' as DecisionType,
    title: 'Social & Relationships',
    description: 'Friendships, partnerships, family dynamics, or community involvement',
    icon: 'group',
    iosIcon: 'person.3.fill',
    example: 'Should I reconcile with an estranged friend or prioritize new connections?',
  },
  {
    id: 'ethical' as DecisionType,
    title: 'Ethical & Values',
    description: 'Decisions aligned with personal values or moral dilemmas',
    icon: 'balance',
    iosIcon: 'scale.3d',
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
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

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
    
    const result = calculateRecommendation();
    setAnalysisResult(result);
    
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
    setAnalysisResult(null);
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

    if (decisionType === 'personal-growth') {
      return [
        ...baseQuestions,
        { id: 'transformation', text: 'What specific aspect of yourself do you want to transform?' },
        { id: 'support', text: 'What resources or support system will help you achieve this growth?' },
      ];
    }

    return baseQuestions;
  };

  const calculateRecommendation = (): AnalysisResult => {
    console.log('Calculating recommendation with options:', options.length);
    console.log('Priorities:', priorities);
    console.log('Answers:', Object.keys(answers).length);

    if (options.length === 0) {
      return {
        recommendedOption: 'Take action',
        confidence: 50,
        reasoning: 'Without specific options to evaluate, the general recommendation is to take action rather than remain in indecision.',
        statusQuoWarning: 'Staying in analysis paralysis prevents progress. Define clear options to move forward.',
        nextStep: 'Within the next 24 hours: Write down 2-3 specific options you are considering.',
      };
    }

    const optionScores = options.map(option => {
      let score = 0;
      let scoreBreakdown = {
        priorityAlignment: 0,
        positiveOutcome: 0,
        managedRisk: 0,
        worthCost: 0,
        futureRegret: 0,
      };

      const totalPriorityWeight = priorities.reduce((sum, p) => sum + p.rank, 0);
      
      if (totalPriorityWeight > 0) {
        const highestPriority = priorities.reduce((max, p) => p.rank > max.rank ? p : max, priorities[0]);
        const priorityScore = (highestPriority.rank / 5) * 25;
        scoreBreakdown.priorityAlignment = priorityScore;
        score += priorityScore;
      }

      const outcomeAnswer = answers['outcome'] || '';
      const positiveWords = ['good', 'positive', 'success', 'growth', 'better', 'improve', 'opportunity', 'benefit', 'gain', 'achieve'];
      const negativeWords = ['bad', 'negative', 'fail', 'worse', 'decline', 'loss', 'problem', 'difficult', 'struggle'];
      
      const positiveCount = positiveWords.filter(word => outcomeAnswer.toLowerCase().includes(word)).length;
      const negativeCount = negativeWords.filter(word => outcomeAnswer.toLowerCase().includes(word)).length;
      
      if (outcomeAnswer.length > 20) {
        const outcomeScore = Math.min(20, (positiveCount * 5) - (negativeCount * 3));
        scoreBreakdown.positiveOutcome = outcomeScore;
        score += outcomeScore;
      }

      const riskAnswer = answers['risk'] || '';
      const lowRiskWords = ['manageable', 'small', 'minimal', 'low', 'acceptable', 'reversible'];
      const highRiskWords = ['catastrophic', 'severe', 'major', 'irreversible', 'dangerous'];
      
      const lowRiskCount = lowRiskWords.filter(word => riskAnswer.toLowerCase().includes(word)).length;
      const highRiskCount = highRiskWords.filter(word => riskAnswer.toLowerCase().includes(word)).length;
      
      if (riskAnswer.length > 15) {
        const riskScore = Math.min(20, (lowRiskCount * 5) - (highRiskCount * 4));
        scoreBreakdown.managedRisk = riskScore;
        score += riskScore;
      }

      const costAnswer = answers['cost'] || '';
      const affordableWords = ['affordable', 'reasonable', 'worth', 'manageable', 'acceptable'];
      const expensiveWords = ['expensive', 'costly', 'sacrifice', 'overwhelming', 'too much'];
      
      const affordableCount = affordableWords.filter(word => costAnswer.toLowerCase().includes(word)).length;
      const expensiveCount = expensiveWords.filter(word => costAnswer.toLowerCase().includes(word)).length;
      
      if (costAnswer.length > 15) {
        const costScore = Math.min(15, (affordableCount * 4) - (expensiveCount * 3));
        scoreBreakdown.worthCost = costScore;
        score += costScore;
      }

      const regretAnswer = answers['regret'] || '';
      const optionMentioned = regretAnswer.toLowerCase().includes(option.text.toLowerCase().substring(0, 15));
      
      if (regretAnswer.length > 20 && optionMentioned) {
        scoreBreakdown.futureRegret = 20;
        score += 20;
      }

      const answerCompleteness = Object.keys(answers).length / getQuestions().length;
      score = score * (0.7 + (answerCompleteness * 0.3));

      console.log(`Option "${option.text}" score: ${score.toFixed(1)}`, scoreBreakdown);

      return {
        option,
        score,
        scoreBreakdown,
      };
    });

    optionScores.sort((a, b) => b.score - a.score);
    
    const bestOption = optionScores[0];
    const secondBestOption = optionScores[1];
    
    const maxPossibleScore = 100;
    const confidencePercentage = Math.min(95, Math.max(35, Math.round((bestOption.score / maxPossibleScore) * 100)));
    
    let confidenceAdjustment = 0;
    if (secondBestOption && bestOption.score - secondBestOption.score < 10) {
      confidenceAdjustment = -15;
    }
    
    const finalConfidence = Math.max(35, Math.min(95, confidencePercentage + confidenceAdjustment));

    const topPriorities = priorities
      .filter(p => p.rank >= 4)
      .map(p => p.name.toLowerCase())
      .join(' and ');

    const reasoning = topPriorities
      ? `Based on your priorities (${topPriorities}) and your answers to the guided questions, this option shows the strongest alignment with what matters most to you. Your responses indicate positive outcomes with manageable risks.`
      : 'Based on your answers to the guided questions, this option demonstrates the most favorable balance of potential outcomes, manageable risks, and acceptable costs.';

    const statusQuoAnswer = answers['nothing'] || '';
    const statusQuoWarning = statusQuoAnswer.length > 20
      ? `If you do nothing: ${statusQuoAnswer.substring(0, 150)}${statusQuoAnswer.length > 150 ? '...' : ''}`
      : 'Maintaining the status quo may lead to missed opportunities. The current situation is unlikely to improve without deliberate action.';

    const nextStep = decisionType === 'career'
      ? 'Within the next 3 days: Schedule a conversation with someone who has made a similar decision. Ask them what they wish they had known.'
      : decisionType === 'financial'
      ? 'Within the next 5 days: Create a detailed budget or financial projection for this decision. Include best-case and worst-case scenarios.'
      : decisionType === 'education'
      ? 'Within the next week: Research and contact 2-3 people who have completed this educational path. Ask about their experience and outcomes.'
      : 'Within the next 3 days: Write down 3 specific questions you need answered before committing. Then identify who or what can answer them.';

    console.log('Final recommendation:', bestOption.option.text, 'with confidence:', finalConfidence);

    return {
      recommendedOption: bestOption.option.text,
      confidence: finalConfidence,
      reasoning,
      statusQuoWarning,
      nextStep,
    };
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
                  ios_icon_name="lightbulb.fill"
                  android_material_icon_name="lightbulb" 
                  size={40} 
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
                      ios_icon_name={type.iosIcon}
                      android_material_icon_name={type.icon}
                      size={32}
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
              placeholderTextColor={colors.textTertiary}
              value={decisionText}
              onChangeText={setDecisionText}
              multiline
              numberOfLines={4}
            />

            <View style={styles.welcomeCard}>
              <IconSymbol 
                ios_icon_name="info.circle.fill"
                android_material_icon_name="info" 
                size={28} 
                color={colors.primary}
                style={{ marginBottom: 14 }}
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
                    ios_icon_name="trash.fill"
                    android_material_icon_name="delete"
                    size={24}
                    color={colors.danger}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TextInput
              style={styles.input}
              placeholder="Enter an option..."
              placeholderTextColor={colors.textTertiary}
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
                  placeholderTextColor={colors.textTertiary}
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
                ios_icon_name="brain.head.profile"
                android_material_icon_name="psychology" 
                size={64} 
                color={colors.primary}
              />
            </View>
            <Text style={styles.analysisTitle}>Analyzing your decision...</Text>
            <Text style={styles.analysisSubtitle}>
              Evaluating options against your priorities
            </Text>
          </View>
        )}

        {step === 'result' && analysisResult && (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Your Reality Check</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Recommendation</Text>
              <Text style={styles.resultSubtitle}>{analysisResult.recommendedOption}</Text>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Confidence Level</Text>
                <Text style={styles.resultSectionText}>{analysisResult.confidence}% confident</Text>
                <View style={styles.confidenceBar}>
                  <View style={[styles.confidenceFill, { width: `${analysisResult.confidence}%` }]} />
                </View>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Why This Choice</Text>
                <Text style={styles.resultSectionText}>
                  {analysisResult.reasoning}
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>If You Do Nothing</Text>
                <Text style={styles.resultSectionText}>
                  {analysisResult.statusQuoWarning}
                </Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.resultSectionTitle}>Next Step</Text>
                <Text style={styles.resultSectionText}>
                  {analysisResult.nextStep}
                </Text>
              </View>
            </View>

            <View style={styles.welcomeCard}>
              <IconSymbol 
                ios_icon_name="info.circle"
                android_material_icon_name="info" 
                size={26} 
                color={colors.textSecondary}
                style={{ marginBottom: 14 }}
              />
              <Text style={[styles.welcomeText, { fontSize: 14 }]}>
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
