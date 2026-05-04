import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const RESPONSES = [
  { keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'howdy'], reply: "Hey there! 👋 I'm your LockedGate health assistant. Ask me about body composition, exercise plans, nutrition, meditation, sleep tracking, or any general wellness question!" },
  { keywords: ['rfm', 'body fat', 'body composition', 'fat percentage', 'relative fat mass'], reply: "RFM (Relative Fat Mass) is a more accurate measure of body fat than BMI. It uses your height and waist circumference to estimate body fat %. Healthy ranges are 10–20% for men and 18–28% for women. You can view your RFM score on the Dashboard after completing your assessment." },
  { keywords: ['bmi', 'body mass index'], reply: "BMI divides weight by height squared, but it can't distinguish muscle from fat. That's why we also calculate RFM — it uses waist circumference for a far more accurate picture of your metabolic health. Check your Dashboard to compare both scores." },
  { keywords: ['waist', 'whtr', 'waist to height', 'waist-to-height'], reply: "Your Waist-to-Height Ratio (WHtR) is a simple health indicator. A ratio under 0.5 is generally healthy. It's shown on your Dashboard alongside your RFM and other metrics." },
  { keywords: ['whr', 'waist to hip', 'waist-to-hip', 'hip ratio'], reply: "Waist-to-Hip Ratio (WHR) compares your waist to hip measurement. For men, below 0.9 is healthy; for women, below 0.85. It's a good indicator of fat distribution and cardiovascular risk." },
  { keywords: ['exercise', 'workout', 'training', 'exercise protocol', 'weekly plan'], reply: "Your Exercise Protocol page has a personalized weekly training plan! Choose from Strength, Yoga, or Mixed plans. Each day has 5 exercises with video tutorials, difficulty levels, and completion tracking. Check it out from the Exercise tab in the navbar." },
  { keywords: ['yoga', 'vinyasa', 'hatha', 'yin yoga', 'asana'], reply: "Our Yoga plan includes Vinyasa Flow, Yin Yoga, Hatha, Restorative sessions, and Power Yoga/Ashtanga across the week. Each session has guided video tutorials. Select 'Yoga' as your training preference during the assessment to get this plan!" },
  { keywords: ['strength', 'weights', 'muscle', 'lifting', 'push-up', 'pushup', 'squat'], reply: "The Strength plan covers all muscle groups: Chest & Triceps (Mon), Back & Biceps (Wed), Core & Mobility (Thu), and Legs & Shoulders (Fri). Each exercise includes video tutorials and completion tracking. Select 'Strength' during your assessment!" },
  { keywords: ['nutrition', 'meal', 'diet', 'food', 'eating', 'meal plan'], reply: "The Nutrition page provides low-GI Indian meal plans with full macro tracking. You get breakfast, lunch, dinner, and snack suggestions tailored to your caloric needs based on your assessment data. Visit the Nutrition tab!" },
  { keywords: ['calorie', 'calories', 'macro', 'protein', 'carb', 'fat intake'], reply: "Your calorie and macro targets are calculated from your assessment data — age, weight, height, and activity level. The Nutrition page shows your daily protein, carb, and fat goals along with meal suggestions to meet them." },
  { keywords: ['meditation', 'meditate', 'mindfulness', 'breathing', 'timer'], reply: "The Meditation page has a customizable timer for guided meditation sessions. Use it for mindfulness, box breathing, or any focus practice. Regular meditation reduces cortisol, improves sleep, and boosts mental clarity. Try it from the Meditation tab!" },
  { keywords: ['sleep', 'sleep track', 'insomnia', 'rest', 'sleep log'], reply: "The Sleep Tracker on your Dashboard lets you log your daily sleep hours. Tracking sleep helps identify patterns. Adults should aim for 7–9 hours. Poor sleep raises cortisol, increases cravings, and impairs recovery." },
  { keywords: ['weight', 'weight log', 'weight track', 'scale'], reply: "The Weight Log on your Dashboard lets you track your weight over time. Consistent tracking helps you see trends rather than daily fluctuations. Weigh yourself at the same time each day for best accuracy." },
  { keywords: ['stress', 'anxiety', 'anxious', 'overwhelm', 'nervous'], reply: "For quick stress relief, try Box Breathing: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. Repeat 4 times. Also try the 5-4-3-2-1 Grounding technique: Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. Our Meditation page can also help!" },
  { keywords: ['mental health', 'mental wellness', 'depression', 'mood'], reply: "Mental wellness is just as important as physical health. Regular exercise releases endorphins, meditation reduces anxiety, and good sleep improves mood. Our app helps with all three — exercise protocols, meditation timer, and sleep tracking. If you're struggling, please also reach out to a professional. 💚" },
  { keywords: ['metabolism', 'metabolic', 'metabolic rate', 'bmr'], reply: "Your metabolism is influenced by age, muscle mass, activity level, and genetics. Building muscle through strength training increases your resting metabolic rate. Our exercise protocols and nutrition plans are designed to support healthy metabolic function." },
  { keywords: ['assessment', 'bio assessment', 'scan', 'bio-marker', 'biomarker'], reply: "The Bio Assessment collects your height, weight, waist, hip measurements, age, gender, and activity level. From this, we calculate your RFM, BMI, WHtR, WHR, and generate personalized exercise and nutrition plans. You can re-scan anytime from the Dashboard!" },
  { keywords: ['features', 'what can you do', 'what does this app do', 'app features', 'help'], reply: "LockedGate Therapy includes:\n• 📊 RFM Body Composition scoring\n• 🏋️ Personalized Exercise Protocols (Strength/Yoga/Mixed)\n• 🥗 Low-GI Indian Nutrition Plans with macros\n• 🧘 Meditation Timer\n• 😴 Sleep Tracking\n• ⚖️ Weight Logging\n• 💡 Daily Wellness Tips\n\nAsk me about any of these!" },
  { keywords: ['thank', 'thanks', 'awesome', 'great', 'cool', 'nice'], reply: "You're welcome! 😊 I'm always here to help. Keep working on your health goals — consistency is what makes the difference! 💪" },
  { keywords: ['who are you', 'what are you', 'your name'], reply: "I'm the LockedGate AI assistant! I help answer questions about the app's features — body composition, exercise, nutrition, meditation, sleep tracking — and general health and wellness topics. Ask me anything!" },
  { keywords: ['lose weight', 'weight loss', 'fat loss', 'burn fat'], reply: "Sustainable fat loss comes from a moderate calorie deficit, consistent exercise, and good sleep. Our app helps with all three: check your RFM score on the Dashboard, follow your Exercise Protocol, and use the Nutrition page for meal plans. Aim for 0.5–1 kg per week for healthy, lasting results." },
  { keywords: ['gain muscle', 'build muscle', 'bulk', 'muscle gain'], reply: "To build muscle, focus on progressive resistance training (check your Strength protocol!), eat sufficient protein (1.6–2.2g per kg bodyweight), and sleep 7-9 hours. Our Nutrition page helps track your protein intake, and the Exercise page provides structured weekly training." },
  { keywords: ['water', 'hydration', 'drink water'], reply: "Aim for 2.5–3.5 liters of water daily. More if you exercise heavily. Proper hydration improves energy, digestion, skin health, and exercise performance. Try drinking a glass of water first thing in the morning! 💧" },
  { keywords: ['indian', 'desi', 'roti', 'dal', 'rice', 'chapati'], reply: "Our Nutrition page features Indian meal plans with dishes like dal, roti, sabzi, rice, idli, and more — all with full macro breakdowns. We focus on low-GI options to keep your blood sugar stable and energy consistent throughout the day." },
];

const getReply = (message) => {
  const lower = message.toLowerCase();
  
  for (const entry of RESPONSES) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.reply;
    }
  }
  
  return "I can help with questions about:\n• Body composition (RFM, BMI, WHtR)\n• Exercise protocols & workout plans\n• Nutrition & meal planning\n• Meditation & mindfulness\n• Sleep & weight tracking\n• Stress management & wellness\n\nTry asking about any of these topics! 😊";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your LockedGate health assistant. Ask me anything about your plan, body composition, stress, or fitness 💪" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate a brief thinking delay for natural feel
    setTimeout(() => {
      const reply = getReply(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '90px', right: '24px', width: '360px', height: '500px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-secondary)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0, color: 'var(--color-text-primary)' }}>LockedGate AI</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-tertiary)', cursor: 'pointer' }}><X size={20} /></button>
          </div>
          
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', background: m.role === 'user' ? 'var(--color-accent-primary)' : 'var(--color-bg-secondary)', color: m.role === 'user' ? 'var(--color-bg-primary)' : 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '12px', borderBottomRightRadius: m.role === 'user' ? '4px' : '12px', borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '12px', fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask about health or app features..." 
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-elevated)', color: 'var(--color-text-primary)', outline: 'none', fontSize: '14px' }}
              />
              <button type="submit" disabled={isLoading} style={{ background: 'var(--color-accent-primary)', color: 'var(--color-bg-primary)', border: 'none', borderRadius: '8px', padding: '0 16px', fontWeight: 600, cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}>Send</button>
            </form>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'fixed', bottom: '24px', right: '24px', width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-accent-primary)', color: 'var(--color-bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', zIndex: 9999, boxShadow: '0 8px 24px rgba(0,201,167,0.4)', transition: 'transform 0.2s' }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
};

export default Chatbot;
