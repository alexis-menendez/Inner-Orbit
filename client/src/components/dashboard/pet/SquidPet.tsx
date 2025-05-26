import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

import idleAnim from '../../../assets/lottie/squid-idle.json';
import walkAnim from '../../../assets/lottie/squid-walk.json';
import legLiftAnim from '../../../assets/lottie/squid-legLift.json';
import fallAnim from '../../../assets/lottie/squid-fall.json';
import jumpAnim from '../../../assets/lottie/squid-jump.json';
import jumpslamAnim from '../../../assets/lottie/squid-jumpslam.json';
import inksquirtAnim from '../../../assets/lottie/squid-inksquirt.json';
import attackDownAnim from '../../../assets/lottie/squid-attackDown.json';
import attackUpAnim from '../../../assets/lottie/squid-attackUp.json';
import hurtAnim from '../../../assets/lottie/squid-hurt.json';
import dieAnim from '../../../assets/lottie/squid-die.json';
import winAnim from '../../../assets/lottie/squid-win.json';

interface SquidPetProps {
  trigger: AnimationKey;
}

type AnimationKey =
  | 'idle'
  | 'walk'
  | 'legLift'
  | 'fall'
  | 'jump'
  | 'jumpslam'
  | 'inksquirt'
  | 'attackDown'
  | 'attackUp'
  | 'hurt'
  | 'die'
  | 'win';

const animationMap: Record<AnimationKey, any> = {
  idle: idleAnim,
  walk: walkAnim,
  legLift: legLiftAnim,
  fall: fallAnim,
  jump: jumpAnim,
  jumpslam: jumpslamAnim,
  inksquirt: inksquirtAnim,
  attackDown: attackDownAnim,
  attackUp: attackUpAnim,
  hurt: hurtAnim,
  die: dieAnim,
  win: winAnim,
};

const loopableAnimations: AnimationKey[] = ['idle', 'walk'];

const SquidPet: React.FC<SquidPetProps> = ({ trigger }) => {
  const [currentAnim, setCurrentAnim] = useState<AnimationKey>('idle');

  useEffect(() => {
    if (trigger !== currentAnim) {
      setCurrentAnim(trigger);
    }
  }, [trigger]);

  return (
    <Lottie
      animationData={animationMap[currentAnim]}
      loop={loopableAnimations.includes(currentAnim)}
      autoplay
      style={{ width: 256, height: 341 }}
    />
  );
};

export default SquidPet;
