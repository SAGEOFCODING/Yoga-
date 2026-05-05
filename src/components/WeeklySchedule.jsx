import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { CheckCircle2, PlayCircle, Clock, Activity } from 'lucide-react';

const STRENGTH_PLAN = {
  MON: { name: 'Chest & Triceps', tasks: [
    { id:'s-m1', title:'Wall Push-ups', duration:'3 sets x 15 reps', rest:'60s', difficulty:'Beginner', desc:'Low joint impact chest builder.', youtubeId:'L_xrDAtykMI' },
    { id:'s-m2', title:'Push-ups', duration:'3 sets x 10 reps', rest:'60s', difficulty:'Beginner', desc:'Core and chest strength.', youtubeId:'IODxDxX7oi4' },
    { id:'s-m3', title:'Tricep Dips', duration:'3 sets x 12 reps', rest:'60s', difficulty:'Intermediate', desc:'Targets back of arms using a chair.', youtubeId:'0326dy_-CzM' },
    { id:'s-m4', title:'Brisk Walking', duration:'20 mins', rest:'None', difficulty:'Beginner', desc:'Steady state cardio for fat burn.', youtubeId:'oHkNMJTDjMk' },
    { id:'s-m5', title:'Jumping Jacks', duration:'3 sets x 30 sec', rest:'30s', difficulty:'Beginner', desc:'Full body cardio burst.', youtubeId:'iSSAk4XCsRA' },
  ]},
  TUE: { name: 'Rest + Brisk Walk', tasks: [
    { id:'s-t1', title:'Brisk Walking', duration:'30 mins', rest:'None', difficulty:'Beginner', desc:'Zone 2 cardio for fat oxidation.', youtubeId:'oHkNMJTDjMk' },
    { id:'s-t2', title:'Cat-Cow Stretch', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Spinal mobility recovery.', youtubeId:'kqnua4rHVVA' },
    { id:'s-t3', title:'Child\'s Pose', duration:'3 mins', rest:'None', difficulty:'Beginner', desc:'Lower back release.', youtubeId:'qZ_KFBxXBuQ' },
    { id:'s-t4', title:'Seated Forward Fold', duration:'3 mins', rest:'None', difficulty:'Beginner', desc:'Hamstring stretch.', youtubeId:'NgNT7ewHpKg' },
    { id:'s-t5', title:'Supine Twist', duration:'3 mins/side', rest:'None', difficulty:'Beginner', desc:'Spinal decompression.', youtubeId:'OsAQCny0_Uo' },
  ]},
  WED: { name: 'Back & Biceps', tasks: [
    { id:'s-w1', title:'Dumbbell Rows', duration:'4 sets x 12 reps', rest:'60s', difficulty:'Intermediate', desc:'Back thickness builder.', youtubeId:'roCP6wCXPqo' },
    { id:'s-w2', title:'Bicep Curls', duration:'3 sets x 15 reps', rest:'60s', difficulty:'Beginner', desc:'Isolates the biceps.', youtubeId:'ykJmrZ5v0Oo' },
    { id:'s-w3', title:'Pull-ups', duration:'3 sets x max reps', rest:'90s', difficulty:'Intermediate', desc:'Full back compound move.', youtubeId:'eGo4IYlbE5g' },
    { id:'s-w4', title:'Plank', duration:'3 sets x 45 sec', rest:'60s', difficulty:'Intermediate', desc:'Core stability.', youtubeId:'pSHjTRCQxIw' },
    { id:'s-w5', title:'Step-ups', duration:'3 sets x 12/leg', rest:'60s', difficulty:'Intermediate', desc:'Cardio and leg endurance.', youtubeId:'dQqApCGd5Ss' },
  ]},
  THU: { name: 'Core & Mobility', tasks: [
    { id:'s-th1', title:'Plank', duration:'3 sets x 60 sec', rest:'60s', difficulty:'Intermediate', desc:'Core endurance.', youtubeId:'pSHjTRCQxIw' },
    { id:'s-th2', title:'Bridge Pose', duration:'3 sets x 15 reps', rest:'45s', difficulty:'Beginner', desc:'Glutes and core.', youtubeId:'nNzCEEMSCpA' },
    { id:'s-th3', title:'Cat-Cow', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Spinal mobility.', youtubeId:'5E-MKMxLwYo' },
    { id:'s-th4', title:'Surya Namaskar', duration:'5 rounds', rest:'As needed', difficulty:'Beginner', desc:'Full body flow.', youtubeId:'Ckp_TBGkfqE' },
    { id:'s-th5', title:'Anulom Vilom', duration:'10 mins', rest:'None', difficulty:'Beginner', desc:'Breathing exercise.', youtubeId:'8bRSKqpLmKU' },
  ]},
  FRI: { name: 'Legs & Shoulders', tasks: [
    { id:'s-f1', title:'Squats', duration:'4 sets x 15 reps', rest:'60s', difficulty:'Beginner', desc:'Fundamental lower body.', youtubeId:'aclHkVaku9U' },
    { id:'s-f2', title:'Lunges', duration:'3 sets x 10/leg', rest:'60s', difficulty:'Intermediate', desc:'Balance and leg strength.', youtubeId:'QOVaHwm-Q6U' },
    { id:'s-f3', title:'Shoulder Press', duration:'3 sets x 12 reps', rest:'60s', difficulty:'Beginner', desc:'Shoulder strength.', youtubeId:'qEwKCR5JCog' },
    { id:'s-f4', title:'Goblet Squat', duration:'3 sets x 12 reps', rest:'60s', difficulty:'Intermediate', desc:'Deep squat pattern.', youtubeId:'MeIiIdhvXT4' },
    { id:'s-f5', title:'Overhead Press', duration:'3 sets x 10 reps', rest:'60s', difficulty:'Intermediate', desc:'Upper body push.', youtubeId:'2yjwXTZQDDI' },
  ]},
  SAT: { name: 'Active Recovery', tasks: [
    { id:'s-sa1', title:'Brisk Walking', duration:'20 mins', rest:'None', difficulty:'Beginner', desc:'Light cardio.', youtubeId:'oHkNMJTDjMk' },
    { id:'s-sa2', title:'Child\'s Pose', duration:'3 mins', rest:'None', difficulty:'Beginner', desc:'Relaxation.', youtubeId:'3an8OFpFzkI' },
    { id:'s-sa3', title:'Savasana', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Full body rest.', youtubeId:'1VYlOKygdqQ' },
    { id:'s-sa4', title:'Kapalbhati', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Breathing exercise.', youtubeId:'V1jAzJHfOVM' },
    { id:'s-sa5', title:'Supine Twist', duration:'3 mins/side', rest:'None', difficulty:'Beginner', desc:'Spinal release.', youtubeId:'B_hC-kAJKFg' },
  ]},
  SUN: { name: 'Rest', tasks: [] }
};

const YOGA_PLAN = {
  MON: { name: 'Morning Vinyasa Flow', tasks: [
    { id:'y-m1', title:'Surya Namaskar', duration:'10 rounds', rest:'As needed', difficulty:'Beginner', desc:'Full body sun salutation.', youtubeId:'Ckp_TBGkfqE' },
    { id:'y-m2', title:'Warrior I', duration:'3 holds x 30s/side', rest:'15s', difficulty:'Beginner', desc:'Hip opener and leg strength.', youtubeId:'FHyHQOaEiX0' },
    { id:'y-m3', title:'Warrior II', duration:'3 holds x 30s/side', rest:'15s', difficulty:'Beginner', desc:'Builds stamina and focus.', youtubeId:'4M5HECQMnRk' },
    { id:'y-m4', title:'Triangle Pose', duration:'3 holds x 30s/side', rest:'15s', difficulty:'Intermediate', desc:'Side body stretch.', youtubeId:'yXVkE3eTvB4' },
    { id:'y-m5', title:'Savasana', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Final relaxation.', youtubeId:'1VYlOKygdqQ' },
  ]},
  TUE: { name: 'Yin Yoga + Pranayama', tasks: [
    { id:'y-t1', title:'Yin Yoga Full Session', duration:'20 mins', rest:'None', difficulty:'Beginner', desc:'Deep passive holds.', youtubeId:'sTANio_2E0Q' },
    { id:'y-t2', title:'Seated Forward Fold', duration:'3 mins', rest:'None', difficulty:'Beginner', desc:'Hamstring release.', youtubeId:'KKJoNXmDfX0' },
    { id:'y-t3', title:'Supine Twist', duration:'3 mins/side', rest:'None', difficulty:'Beginner', desc:'Spinal detox.', youtubeId:'B_hC-kAJKFg' },
    { id:'y-t4', title:'Anulom Vilom', duration:'10 mins', rest:'None', difficulty:'Beginner', desc:'Alternate nostril breathing.', youtubeId:'8bRSKqpLmKU' },
    { id:'y-t5', title:'Kapalbhati', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Skull shining breath.', youtubeId:'V1jAzJHfOVM' },
  ]},
  WED: { name: 'Hatha Yoga + Core', tasks: [
    { id:'y-w1', title:'Tadasana', duration:'2 mins', rest:'None', difficulty:'Beginner', desc:'Mountain pose alignment.', youtubeId:'H0Q9vGHiDcI' },
    { id:'y-w2', title:'Vrikshasana', duration:'1 min/side', rest:'None', difficulty:'Beginner', desc:'Balance and focus.', youtubeId:'MEoYBpMFkJo' },
    { id:'y-w3', title:'Boat Pose', duration:'3 holds x 30s', rest:'30s', difficulty:'Intermediate', desc:'Core strength.', youtubeId:'0T7jrBaTNRk' },
    { id:'y-w4', title:'Bridge Pose', duration:'3 sets x 15', rest:'30s', difficulty:'Beginner', desc:'Glute and core.', youtubeId:'nNzCEEMSCpA' },
    { id:'y-w5', title:'Cat-Cow', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Spinal mobility.', youtubeId:'5E-MKMxLwYo' },
  ]},
  THU: { name: 'Restorative Yoga', tasks: [
    { id:'y-th1', title:'Restorative Yoga Session', duration:'25 mins', rest:'None', difficulty:'Beginner', desc:'Deep relaxation.', youtubeId:'BiWDHDdMgpg' },
    { id:'y-th2', title:'Child\'s Pose', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Calming forward fold.', youtubeId:'3an8OFpFzkI' },
    { id:'y-th3', title:'Supine Twist', duration:'3 mins/side', rest:'None', difficulty:'Beginner', desc:'Detox stretch.', youtubeId:'B_hC-kAJKFg' },
    { id:'y-th4', title:'Seated Forward Fold', duration:'3 mins', rest:'None', difficulty:'Beginner', desc:'Hamstring release.', youtubeId:'KKJoNXmDfX0' },
    { id:'y-th5', title:'Savasana', duration:'10 mins', rest:'None', difficulty:'Beginner', desc:'Deep body scan.', youtubeId:'1VYlOKygdqQ' },
  ]},
  FRI: { name: 'Power Yoga / Ashtanga', tasks: [
    { id:'y-f1', title:'Vinyasa Flow', duration:'20 mins', rest:'None', difficulty:'Intermediate', desc:'Dynamic flow sequence.', youtubeId:'CLrgFi6JC6A' },
    { id:'y-f2', title:'Crow Pose', duration:'5 attempts x 15s', rest:'30s', difficulty:'Advanced', desc:'Arm balance.', youtubeId:'VtGVMVKnJ-k' },
    { id:'y-f3', title:'Wheel Pose', duration:'3 holds x 20s', rest:'45s', difficulty:'Advanced', desc:'Full backbend.', youtubeId:'4Km9YtPYoEc' },
    { id:'y-f4', title:'Warrior I', duration:'3 holds x 30s/side', rest:'15s', difficulty:'Beginner', desc:'Foundation pose.', youtubeId:'FHyHQOaEiX0' },
    { id:'y-f5', title:'Plank', duration:'3 sets x 60s', rest:'30s', difficulty:'Intermediate', desc:'Core endurance.', youtubeId:'pSHjTRCQxIw' },
  ]},
  SAT: { name: 'Breathwork + Meditation', tasks: [
    { id:'y-sa1', title:'Anulom Vilom', duration:'10 mins', rest:'None', difficulty:'Beginner', desc:'Calming breath.', youtubeId:'8bRSKqpLmKU' },
    { id:'y-sa2', title:'Kapalbhati', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Energizing breath.', youtubeId:'V1jAzJHfOVM' },
    { id:'y-sa3', title:'Tadasana', duration:'3 mins', rest:'None', difficulty:'Beginner', desc:'Grounding pose.', youtubeId:'H0Q9vGHiDcI' },
    { id:'y-sa4', title:'Savasana', duration:'10 mins', rest:'None', difficulty:'Beginner', desc:'Body scan meditation.', youtubeId:'1VYlOKygdqQ' },
    { id:'y-sa5', title:'Child\'s Pose', duration:'5 mins', rest:'None', difficulty:'Beginner', desc:'Closing posture.', youtubeId:'3an8OFpFzkI' },
  ]},
  SUN: { name: 'Rest', tasks: [] }
};

const MIXED_PLAN = {
  MON: { name: 'Strength — Upper Body', tasks: STRENGTH_PLAN.MON.tasks.map(t => ({...t, id: 'mx-'+t.id})) },
  TUE: { name: 'Yoga — Vinyasa Flow', tasks: YOGA_PLAN.MON.tasks.map(t => ({...t, id: 'mx-'+t.id})) },
  WED: { name: 'Strength — Lower Body', tasks: STRENGTH_PLAN.FRI.tasks.map(t => ({...t, id: 'mxw-'+t.id})) },
  THU: { name: 'Yoga — Yin + Pranayama', tasks: YOGA_PLAN.TUE.tasks.map(t => ({...t, id: 'mxth-'+t.id})) },
  FRI: { name: 'Strength — Full Body', tasks: STRENGTH_PLAN.WED.tasks.map(t => ({...t, id: 'mxf-'+t.id})) },
  SAT: { name: 'Yoga — Restorative', tasks: YOGA_PLAN.THU.tasks.map(t => ({...t, id: 'mxsa-'+t.id})) },
  SUN: { name: 'Rest', tasks: [] }
};

const CARD = { background: '#FFFFFF', border: '2px solid #000000', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: '4px 4px 0px #000000' };
const PILL = (active) => ({ border: '2px solid #000000', borderRadius: '12px', padding: '10px 16px', fontSize: '13px', fontWeight: 900, cursor: 'pointer', background: active ? 'var(--color-lavender)' : '#FFFFFF', color: '#000000', transition: 'all 0.2s ease', boxShadow: active ? '2px 2px 0px #000000' : 'none' });

const ExerciseRow = ({ session, isCompleted, onToggle }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = session.youtubeId || 'dQw4w9WgXcQ';
  
  return (
    <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '16px 20px', marginBottom: '12px', transition: 'all 0.2s ease', opacity: isCompleted ? 0.6 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
          <div onClick={onToggle} style={{ cursor: 'pointer', marginTop: '4px', border: '2px solid #000000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? 'var(--color-lavender)' : 'transparent', flexShrink: 0 }}>
            {isCompleted && <CheckCircle2 size={24} color="#fff" />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{session.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-blue)', color: '#000000', padding: '2px 10px', borderRadius: '6px', border: '2px solid #000000', fontWeight: 900 }}><Activity size={12} /> {session.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-green)', color: '#000000', padding: '2px 10px', borderRadius: '6px', border: '2px solid #000000', fontWeight: 900 }}><Clock size={12} /> Rest: {session.rest}</span>
              <span style={{ background: 'var(--color-pink)', color: '#000000', padding: '2px 10px', borderRadius: '6px', border: '2px solid #000000', fontWeight: 900 }}>{session.difficulty}</span>
            </div>
            <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>{session.desc}</p>
          </div>
        </div>
        <button onClick={() => setShowVideo(!showVideo)} style={{ 
          background: '#FFFFFF', 
          border: '2px solid #000000', 
          display: 'flex', alignItems: 'center', gap: '6px', 
          color: '#000000', 
          fontSize: '12px', fontWeight: 900, padding: '8px 12px', borderRadius: '10px', flexShrink: 0, cursor: 'pointer', 
          transition: 'all 0.3s ease',
          boxShadow: '2px 2px 0px #000000'
        }}>
          <PlayCircle size={16} /> {showVideo ? 'Hide' : 'Tutorial'}
        </button>
      </div>

      {showVideo && (
        <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', background: '#000', aspectRatio: '16/9' }}>
          <iframe 
            width="100%" height="100%" 
            src={`https://www.youtube.com/embed/${videoId}`} 
            title={session.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      )}
    </div>
  );
};

const WeeklySchedule = ({ onCompletionChange }) => {
  const { assessment } = useStore();
  const [viewMode, setViewMode] = useState('daily');
  const days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [completionState, setCompletionState] = useState({});

  const pref = assessment.trainingPreference;
  const plan = pref === 'Yoga' ? YOGA_PLAN : pref === 'Mixed' ? MIXED_PLAN : STRENGTH_PLAN;

  const toggleExercise = (day, id) => {
    setCompletionState(prev => {
      const daySet = new Set(prev[day] || []);
      daySet.has(id) ? daySet.delete(id) : daySet.add(id);
      const next = { ...prev, [day]: daySet };
      if (onCompletionChange) {
        let total = 0;
        Object.values(next).forEach(s => total += s.size);
        onCompletionChange(total);
      }
      return next;
    });
  };

  const dayCompleted = (completionState[selectedDay] || new Set()).size;
  const dayTotal = plan[selectedDay].tasks.length;

  return (
    <section id="therapy-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 className="page-heading" style={{ marginBottom: '8px' }}>Exercise Protocol</h3>
          <p style={{ color: '#000000', fontSize: '15px', fontWeight: 700 }}>
            <span style={{ background: 'var(--color-lavender)', padding: '2px 8px', borderRadius: '6px', border: '2px solid #000000', fontWeight: 900 }}>{pref === 'Yoga' ? 'Yoga-focused' : pref === 'Mixed' ? 'Hybrid strength + yoga' : 'Strength-focused'}</span> weekly split
            {viewMode === 'daily' && dayTotal > 0 ? ` · ${dayCompleted} / ${dayTotal} completed` : ''}
          </p>
        </div>
        <div style={{ background: 'var(--color-bg-elevated)', borderRadius: '12px', padding: '4px', display: 'inline-flex', border: '1px solid var(--color-border)' }}>
          {['daily','weekly'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{ ...PILL(viewMode === mode), padding: '6px 18px' }}>
              {mode}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'daily' ? (
        <>
          <div style={{ overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '16px', marginBottom: '16px', scrollbarWidth: 'none' }}>
            {days.map((d, i) => {
              const isActive = selectedDay === d;
              const accentColor = isActive ? 'var(--color-lavender)' : '#FFFFFF';
              return (
                <button key={d} onClick={() => setSelectedDay(d)} style={{ flexShrink: 0, background: accentColor, border: '2px solid #000000', borderRadius: '24px', padding: '8px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', transition: 'all 0.2s ease', minWidth: '70px', boxShadow: isActive ? '4px 4px 0px #000000' : '2px 2px 0px rgba(0,0,0,0.1)' }}>
                  <span style={{ fontSize: '10px', color: '#000000', fontWeight: 900 }}>{d}</span>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#000000' }}>{i + 1}</span>
                </button>
              );
            })}
          </div>
          <h4 style={{ color: '#000000', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>{selectedDay} — {plan[selectedDay].name}</h4>
          <AnimatePresence mode="wait">
            <motion.div key={selectedDay} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
              {plan[selectedDay].tasks.length > 0 ? plan[selectedDay].tasks.map(s => (
                <ExerciseRow key={s.id} session={s} isCompleted={(completionState[selectedDay] || new Set()).has(s.id)} onToggle={() => toggleExercise(selectedDay, s.id)} />
              )) : (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)', borderRadius: '14px', background: 'var(--color-bg-elevated)' }}>Rest day — recover and recharge.</div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {days.map(day => (
            <div key={day} style={{ background: 'var(--color-bg-elevated)', borderRadius: '14px', border: '1px solid var(--color-border)', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--color-separator)', paddingBottom: '12px' }}>
                <h4 style={{ color: 'var(--color-accent-secondary)', fontSize: '16px', fontWeight: 600 }}>{day} — {plan[day].name}</h4>
                <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>{plan[day].tasks.length} exercises</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan[day].tasks.map(t => (
                  <li key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="var(--color-accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>{t.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>{t.duration} · {t.difficulty}</div>
                    </div>
                  </li>
                ))}
                {plan[day].tasks.length === 0 && <li style={{ color: 'var(--color-text-tertiary)', fontSize: '14px' }}>Rest day</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WeeklySchedule;
