// File: client/src/components/dashboard/pet/SquidPet.tsx

import React from 'react';

type AnimationKey = 'idle' | 'walk' | 'legLift' | 'fall' | 'jump' | 'jumpslam';

interface SquidPetProps {
  trigger: AnimationKey;
}

const SquidPet: React.FC<SquidPetProps> = ({ trigger }) => {
  return (
    <div>
      <p>🐙 SquidPet Placeholder Since I don't have the code: {trigger}</p>
    </div>
  );
};

export default SquidPet;
