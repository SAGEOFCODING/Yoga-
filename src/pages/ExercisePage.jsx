import React, { useState } from 'react';
import WeeklySchedule from '../components/WeeklySchedule';
import { useStore } from '../store/useStore';

const ExercisePage = () => {
  const [totalCompleted, setTotalCompleted] = useState(0);

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 className="page-heading" style={{ marginBottom: '8px' }}>Exercise Protocol</h2>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>
          Your personalized weekly training plan based on your assessment.
        </p>
      </div>

      <WeeklySchedule onCompletionChange={setTotalCompleted} />
    </div>
  );
};

export default ExercisePage;
