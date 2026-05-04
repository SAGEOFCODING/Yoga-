// ⚠️ Add VITE_ANTHROPIC_API_KEY=your_key_here to your .env file
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm your LockedGate health assistant. Ask me anything about your plan, body composition, stress, or fitness 💪" }
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

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
         setMessages(prev => [...prev, { role: 'bot', content: 'API key is missing! Please configure VITE_ANTHROPIC_API_KEY in .env' }]);
         setIsLoading(false);
         return;
      }
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: "You are a helpful assistant for the Locked-Gate Therapy app. Answer questions about the app features: bio assessment, RFM body composition scoring, weekly exercise protocols (Strength, Yoga, Mixed), nutrition meal plans, meditation timer, sleep and weight tracking. Also answer basic health questions about body fat, stress management, mental wellness, metabolism, and fitness. Keep all answers concise, warm, and supportive. Never diagnose medical conditions.",
          messages: [{ role: 'user', content: userMessage }]
        })
      });
      const data = await response.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: 'bot', content: `Error: ${data.error.message}` }]);
      } else {
        const reply = data.content[0].text;
        setMessages(prev => [...prev, { role: 'bot', content: reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, there was an error connecting to the AI.' }]);
    }
    setIsLoading(false);
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
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', background: m.role === 'user' ? 'var(--color-accent-primary)' : 'var(--color-bg-secondary)', color: m.role === 'user' ? 'var(--color-bg-primary)' : 'var(--color-text-primary)', padding: '12px 16px', borderRadius: '12px', borderBottomRightRadius: m.role === 'user' ? '4px' : '12px', borderBottomLeftRadius: m.role === 'bot' ? '4px' : '12px', fontSize: '14px', lineHeight: 1.5 }}>
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
