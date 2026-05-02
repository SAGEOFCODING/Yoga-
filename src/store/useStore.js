import { create } from 'zustand';
import { RISK_LEVELS, THERAPY_PLANS } from '../data/plans';

export const useStore = create((set) => ({
  user: null,
  assessment: {
    age: '',
    weight: '',
    height: '',
    waist: '',
    hip: '',
    gender: 'female',
    lifestyle: 'sedentary',
    symptoms: [],
    familyHistory: false,
    dietaryPreference: 'veg',
    trainingPreference: 'Strength Training',
  },
  riskScore: 0,
  riskLevel: null,
  calories: 0,
  isAssessed: false,
  step: 0,
  activePage: 'dashboard',
  routine: [],
  
  // New Body Composition State
  bodyComp: {
    rfm: 0,
    whtr: 0,
    whr: 0,
    bmi: 0,
    fitnessClass: '',
    bodyShape: '',
    visceralRisk: false,
    summary: '',
    suggestion: '',
    exercisePlan: null
  },

  setStep: (step) => set({ step }),
  setActivePage: (activePage) => set({ activePage }),

  setAssessment: (data) => set((state) => {
    // If trainingPreference changed and we are already assessed, recalculate the exercise plan immediately
    const newState = { assessment: { ...state.assessment, ...data } };
    return newState;
  }),

  addToRoutine: (item) => set((state) => ({
    routine: [...state.routine, { ...item, id: Date.now(), completed: false, time: 'Flexible' }]
  })),

  toggleRoutineItem: (id) => set((state) => ({
    routine: state.routine.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  })),

  calculateRisk: () => set((state) => {
    let score = 0;
    const { 
      age: ageStr, weight: weightStr, height: heightStr, waist: waistStr, hip: hipStr,
      gender, lifestyle, symptoms, familyHistory, trainingPreference
    } = state.assessment;
    
    const age = parseFloat(ageStr) || 25;
    const weight = parseFloat(weightStr) || 60;
    const height = parseFloat(heightStr) || 165;
    const waist = parseFloat(waistStr) || 80;
    const hip = parseFloat(hipStr) || 100;

    // Body Comp Calc
    const bmi = weight / ((height / 100) ** 2);
    let rfm = gender === 'male' ? 64 - (20 * height / waist) : 76 - (20 * height / waist);
    const whtr = waist / height;
    const whr = waist / hip;

    // Fitness Classification
    let fitnessClass = 'Fit';
    if (gender === 'male') {
      if (rfm > 25) fitnessClass = 'Obese';
      else if (rfm >= 20) fitnessClass = 'Overweight';
      else if (rfm >= 18) fitnessClass = 'Borderline';
      else fitnessClass = 'Fit';
    } else {
      if (rfm > 35) fitnessClass = 'Obese';
      else if (rfm >= 28) fitnessClass = 'Overweight';
      else if (rfm >= 25) fitnessClass = 'Borderline';
      else fitnessClass = 'Fit';
    }

    const visceralRisk = whtr > 0.5;
    
    let isApple = false;
    if (gender === 'male') {
      isApple = whr >= 0.90;
    } else {
      isApple = whr >= 0.80;
    }
    const bodyShape = isApple ? 'apple shape' : 'pear shape';

    const summary = `You are in the ${fitnessClass} range${visceralRisk ? ' with high visceral fat risk' : ''} and ${bodyShape} fat distribution.`;

    let suggestion = '';
    if (fitnessClass === 'Fit') suggestion = 'Maintenance plan (balanced diet + strength training 3x/week).';
    else if (fitnessClass === 'Borderline') suggestion = 'Mild caloric deficit (250 kcal/day), cardio 3x/week + strength 2x/week.';
    else if (fitnessClass === 'Overweight') suggestion = 'Moderate deficit (500 kcal/day), cardio 4x/week, reduce refined carbs and sugar.';
    else if (fitnessClass === 'Obese') suggestion = 'Consult a doctor first. Suggest low-impact cardio (walking, swimming), high-protein low-calorie diet, no crash diets.';

    if (isApple || visceralRisk) {
      suggestion += ' Prioritize cardio over strength training, reduce stress (cortisol link), limit alcohol.';
    } else {
      suggestion += ' Strength training for lower body, moderate cardio.';
    }

    // Exercise Plan Matrix
    let exercisePlan = {
      schedule: [],
      explanation: `Based on your ${fitnessClass} classification and preference for ${trainingPreference}.`,
      tips: []
    };

    if (trainingPreference === 'Strength Training') {
      if (fitnessClass === 'Fit') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Push Day (Chest, Shoulders, Triceps)', duration: '60 min' },
          { day: 'Tuesday', activity: 'Pull Day (Back, Biceps)', duration: '60 min' },
          { day: 'Wednesday', activity: 'Rest or Active Recovery', duration: '-' },
          { day: 'Thursday', activity: 'Leg Day (Quads, Hamstrings, Calves)', duration: '60 min' },
          { day: 'Friday', activity: 'Full Body Compound Lifts', duration: '60 min' },
          { day: 'Saturday', activity: 'Rest', duration: '-' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Apply progressive overload: increase weight every 1-2 weeks',
          'Focus on Squats, Deadlifts, Bench Press, Pull-ups',
          'Rest 60-90 seconds between sets to maintain intensity'
        ];
      } else if (fitnessClass === 'Borderline') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Full Body Strength (Moderate)', duration: '45 min' },
          { day: 'Tuesday', activity: 'Light Cardio (Walking/Cycling)', duration: '20 min' },
          { day: 'Wednesday', activity: 'Full Body Strength (Moderate)', duration: '45 min' },
          { day: 'Thursday', activity: 'Rest', duration: '-' },
          { day: 'Friday', activity: 'Full Body Strength (Moderate)', duration: '45 min' },
          { day: 'Saturday', activity: 'Light Cardio', duration: '20 min' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Perform 3 sets of 10-12 reps per exercise',
          'Include Goblet Squats, Dumbbell Rows, Push-ups',
          'Focus on preserving muscle while losing fat'
        ];
      } else if (fitnessClass === 'Overweight') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Light Strength (Bodyweight/Bands)', duration: '30 min' },
          { day: 'Tuesday', activity: 'Brisk Walking', duration: '30 min' },
          { day: 'Wednesday', activity: 'Light Strength (Bodyweight/Bands)', duration: '30 min' },
          { day: 'Thursday', activity: 'Brisk Walking', duration: '30 min' },
          { day: 'Friday', activity: 'Light Strength (Bodyweight/Bands)', duration: '30 min' },
          { day: 'Saturday', activity: 'Brisk Walking', duration: '30 min' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Avoid heavy loading on joints',
          'Try Wall Push-ups, Assisted Squats, Step-ups',
          'Focus on building foundational strength safely'
        ];
      } else { // Obese
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Very Light Resistance (Bands/Chair)', duration: '20 min' },
          { day: 'Tuesday', activity: 'Gentle Walking', duration: '20-30 min' },
          { day: 'Wednesday', activity: 'Rest', duration: '-' },
          { day: 'Thursday', activity: 'Very Light Resistance (Bands/Chair)', duration: '20 min' },
          { day: 'Friday', activity: 'Gentle Walking', duration: '20-30 min' },
          { day: 'Saturday', activity: 'Rest', duration: '-' },
          { day: 'Sunday', activity: 'Gentle Walking', duration: '20 min' }
        ];
        exercisePlan.tips = [
          'Use chair-assisted exercises and resistance bands',
          'Consult a physiotherapist before starting',
          'Focus on activating muscles safely to build the habit'
        ];
      }
    } else if (trainingPreference === 'Yoga') {
      if (fitnessClass === 'Fit') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Vinyasa / Power Yoga', duration: '60 min' },
          { day: 'Tuesday', activity: 'Yin Yoga or Ashtanga', duration: '60 min' },
          { day: 'Wednesday', activity: 'Vinyasa / Power Yoga', duration: '60 min' },
          { day: 'Thursday', activity: 'Yin Yoga or Ashtanga', duration: '60 min' },
          { day: 'Friday', activity: 'Vinyasa / Power Yoga', duration: '60 min' },
          { day: 'Saturday', activity: 'Rest', duration: '-' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Mix dynamic strength-building with deep stretching',
          'Incorporate Warrior series, Crow Pose, Inversions',
          'Focus on balance and mental clarity'
        ];
      } else if (fitnessClass === 'Borderline') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Hatha Yoga Flow', duration: '45 min' },
          { day: 'Tuesday', activity: 'Rest', duration: '-' },
          { day: 'Wednesday', activity: 'Vinyasa Flow', duration: '45 min' },
          { day: 'Thursday', activity: 'Rest', duration: '-' },
          { day: 'Friday', activity: 'Hatha Yoga Flow', duration: '45 min' },
          { day: 'Saturday', activity: 'Gentle Vinyasa', duration: '45 min' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Do Sun Salutations (3 rounds/session), Warrior poses',
          'Add 15 min pranayama at the end of each session',
          'Focus on reducing stress-related cortisol'
        ];
      } else if (fitnessClass === 'Overweight') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Beginner Hatha Yoga', duration: '40 min' },
          { day: 'Tuesday', activity: 'Daily Walking', duration: '15 min' },
          { day: 'Wednesday', activity: 'Restorative Yoga', duration: '40 min' },
          { day: 'Thursday', activity: 'Daily Walking', duration: '15 min' },
          { day: 'Friday', activity: 'Beginner Hatha Yoga', duration: '40 min' },
          { day: 'Saturday', activity: 'Rest', duration: '-' },
          { day: 'Sunday', activity: 'Daily Walking', duration: '15 min' }
        ];
        exercisePlan.tips = [
          'Focus on Cat-Cow, Child\'s Pose, Supine Twist',
          'Avoid deep inversions until comfortable',
          'Use props to support your flexibility'
        ];
      } else { // Obese
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Chair / Gentle Floor Yoga', duration: '20 min' },
          { day: 'Tuesday', activity: 'Rest', duration: '-' },
          { day: 'Wednesday', activity: 'Chair / Gentle Floor Yoga', duration: '20 min' },
          { day: 'Thursday', activity: 'Rest', duration: '-' },
          { day: 'Friday', activity: 'Chair / Gentle Floor Yoga', duration: '20 min' },
          { day: 'Saturday', activity: 'Rest', duration: '-' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Do Seated Mountain Pose, Neck Rolls, Ankle Rotations',
          'Focus heavily on breathwork (Anulom Vilom)',
          'Aim to improve mobility and reduce inflammation safely'
        ];
      }
    } else { // Mixed
      if (fitnessClass === 'Fit') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Heavy Compound Strength', duration: '50 min' },
          { day: 'Tuesday', activity: 'Power Yoga', duration: '45 min' },
          { day: 'Wednesday', activity: 'Heavy Compound Strength', duration: '50 min' },
          { day: 'Thursday', activity: 'Vinyasa Flow', duration: '45 min' },
          { day: 'Friday', activity: 'Heavy Compound Strength', duration: '50 min' },
          { day: 'Saturday', activity: 'Restorative Yoga', duration: '45 min' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'End each strength session with 10 min yoga cool-down',
          'Focus on peak performance and recovery',
          'Listen to your body on yoga days after heavy lifting'
        ];
      } else if (fitnessClass === 'Borderline') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Moderate Full-Body Strength', duration: '45 min' },
          { day: 'Tuesday', activity: 'Hatha Core Yoga', duration: '40 min' },
          { day: 'Wednesday', activity: 'Moderate Full-Body Strength', duration: '45 min' },
          { day: 'Thursday', activity: 'Flow Yoga (Flexibility)', duration: '40 min' },
          { day: 'Friday', activity: 'Moderate Full-Body Strength', duration: '45 min' },
          { day: 'Saturday', activity: 'Rest', duration: '-' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Do dumbbell circuits for strength (3x12)',
          'Focus yoga on core stability and flexibility',
          'Aim for balanced fat loss with muscle preservation'
        ];
      } else if (fitnessClass === 'Overweight') {
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Light Bodyweight Strength', duration: '30 min' },
          { day: 'Tuesday', activity: 'Beginner Hatha Yoga', duration: '30 min' },
          { day: 'Wednesday', activity: 'Light Bodyweight Strength', duration: '30 min' },
          { day: 'Thursday', activity: 'Beginner Hatha Yoga', duration: '30 min' },
          { day: 'Friday', activity: 'Daily Walk', duration: '20 min' },
          { day: 'Saturday', activity: 'Daily Walk', duration: '20 min' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Alternate days, no back-to-back intense sessions',
          'Use bodyweight circuits (Squats, Push-ups, Plank)',
          'Use yoga to build habit and gentle fat loss'
        ];
      } else { // Obese
        exercisePlan.schedule = [
          { day: 'Monday', activity: 'Seated Band Strength', duration: '20 min' },
          { day: 'Tuesday', activity: 'Chair Yoga & Breathwork', duration: '20 min' },
          { day: 'Wednesday', activity: 'Rest', duration: '-' },
          { day: 'Thursday', activity: 'Seated Band Strength', duration: '20 min' },
          { day: 'Friday', activity: 'Chair Yoga & Breathwork', duration: '20 min' },
          { day: 'Saturday', activity: 'Short Walk', duration: '10 min' },
          { day: 'Sunday', activity: 'Rest', duration: '-' }
        ];
        exercisePlan.tips = [
          'Keep sessions to 20-30 min max',
          'Recommend medical clearance before starting',
          'Focus on safe movement and reducing sedentary time'
        ];
      }
    }

    // Modifiers
    if (isApple || visceralRisk) {
      if (trainingPreference === 'Strength Training') {
        exercisePlan.schedule.forEach(s => {
          if (s.activity.includes('Strength') || s.activity.includes('Resistance') || s.activity.includes('Lifts')) {
            s.activity += ' + 20 min Cardio';
          }
        });
      } else if (trainingPreference === 'Yoga') {
        exercisePlan.tips.push('Include more dynamic/flow styles to increase heart rate.');
      } else if (trainingPreference === 'Mixed') {
        // Replace one yoga day with cardio
        const yogaIndex = exercisePlan.schedule.findIndex(s => s.activity.includes('Yoga'));
        if (yogaIndex !== -1) {
          exercisePlan.schedule[yogaIndex].activity = 'HIIT or Cycling Cardio';
        }
      }
    }

    if (age > 50) {
      exercisePlan.tips.push('Add joint mobility warm-up (5-10 min) before every session.');
      if (fitnessClass === 'Obese') {
        exercisePlan.tips.push('Avoid heavy loaded exercises to protect joints.');
      }
      if (trainingPreference === 'Yoga') {
        exercisePlan.tips.push('Favor Yin and restorative over Power/Vinyasa.');
      }
    }

    if (age < 18) {
      exercisePlan.tips.push('Avoid heavy barbell lifts; focus on bodyweight movements.');
    }

    // Keep old logic for riskScore just so app doesn't break
    if (bmi > 25) score += 15;
    if (bmi > 30) score += 15;
    if (age > 45) score += 10;
    if (lifestyle === 'sedentary') score += 20;
    score += symptoms.length * 15;
    if (familyHistory) score += 15;
    if (gender === 'female' && symptoms.includes('Irregular Periods')) score += 10;

    let level = RISK_LEVELS.LOW;
    if (score > 60) level = RISK_LEVELS.HIGH;
    else if (score > 30) level = RISK_LEVELS.MEDIUM;

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;
    let multiplier = 1.2; 
    if (lifestyle === 'moderate') multiplier = 1.55;
    if (lifestyle === 'active') multiplier = 1.725;
    const tdee = Math.round(bmr * multiplier);

    const plan = THERAPY_PLANS[level];
    const initialRoutine = plan ? [
      ...plan.exercises.map((ex, idx) => ({
        id: idx + 1,
        title: ex.name,
        completed: false,
        time: idx === 0 ? '07:00 AM' : idx === 4 ? '09:00 PM' : 'Flexible'
      })),
      { id: 10, title: 'Recipe: ' + (plan.meal_plan?.[0]?.meals?.[0]?.name || 'Health Meal'), completed: false, time: '01:00 PM' },
      { id: 11, title: 'Tip: ' + (plan.tips?.[0]?.text || 'Stay Hydrated'), completed: false, time: 'Daily' }
    ] : [];

    return { 
      riskScore: score, 
      riskLevel: level, 
      calories: tdee, 
      isAssessed: true,
      routine: initialRoutine,
      bodyComp: {
        rfm: rfm.toFixed(1),
        whtr: whtr.toFixed(2),
        whr: whr.toFixed(2),
        bmi: bmi.toFixed(1),
        fitnessClass,
        bodyShape,
        visceralRisk,
        summary,
        suggestion,
        exercisePlan
      }
    };
  }),

  reset: () => set({ 
    isAssessed: false, 
    riskLevel: null, 
    routine: [],
    step: 0,
    activePage: 'dashboard',
    assessment: {
      age: '', weight: '', height: '', waist: '', hip: '', gender: 'female', lifestyle: 'sedentary', symptoms: [], familyHistory: false, dietaryPreference: 'veg', trainingPreference: 'Strength Training'
    },
    bodyComp: {
      rfm: 0, whtr: 0, whr: 0, bmi: 0, fitnessClass: '', bodyShape: '', visceralRisk: false, summary: '', suggestion: '', exercisePlan: null
    }
  })
}));
