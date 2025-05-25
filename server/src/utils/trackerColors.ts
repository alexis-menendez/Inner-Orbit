// File: server/src/utils/trackerColors.ts

export const getMoodColor = (mood: string): string => {
  const colors: Record<string, string> = {
    // 1. Connection / Love
    affectionate: 'rgba(236, 64, 122, 0.85)',
    connected: 'rgba(231, 84, 128, 0.85)',
    horny: 'rgba(136, 14, 79, 0.85)',
    intimate: 'rgba(194, 24, 91, 0.85)',
    loved: 'rgba(212, 61, 110, 0.85)',
    tender: 'rgba(173, 20, 87, 0.85)',
    warm: 'rgba(233, 30, 99, 0.85)',

    // 2. Happy / Energized
    excited: 'rgba(255, 212, 59, 0.85)',
    grateful: 'rgba(255, 173, 0, 0.85)',
    happy: 'rgba(255, 224, 102, 0.85)',
    hopeful: 'rgba(255, 183, 0, 0.85)',
    overjoyed: 'rgba(255, 195, 0, 0.85)',

    // 3. Motivated / Empowered
    confident: 'rgba(255, 165, 0, 0.85)',
    creative: 'rgba(255, 140, 0, 0.85)',
    curious: 'rgba(255, 117, 24, 0.85)',
    empowered: 'rgba(255, 92, 0, 0.85)',
    inspired: 'rgba(255, 111, 0, 0.85)',
    motivated: 'rgba(255, 102, 0, 0.85)',
    proud: 'rgba(255, 75, 0, 0.85)',

    // 4. Surprise / Shock
    alarmed: 'rgba(245, 124, 0, 0.85)',
    amazed: 'rgba(255, 152, 0, 0.85)',
    shocked: 'rgba(255, 145, 77, 0.85)',
    speechless: 'rgba(251, 140, 0, 0.85)',
    startled: 'rgba(255, 167, 38, 0.85)',
    surprised: 'rgba(255, 184, 77, 0.85)',

    // 5. Disgust
    disgusted: 'rgba(85, 139, 47, 0.85)',
    jealous: 'rgba(51, 105, 30, 0.85)',
    repulsed: 'rgba(76, 175, 80, 0.85)',
    judgmental: 'rgba(56, 142, 60, 0.85)',
    suspicious: 'rgba(46, 125, 50, 0.85)',
    resentful: 'rgba(27, 94, 32, 0.85)',

    // 6. Anger
    aggressive: 'rgba(191, 54, 12, 0.85)',
    angry: 'rgba(215, 38, 56, 0.85)',
    annoyed: 'rgba(211, 47, 47, 0.85)',
    enraged: 'rgba(183, 28, 28, 0.85)',
    frustrated: 'rgba(196, 27, 46, 0.85)',
    irritated: 'rgba(229, 57, 53, 0.85)',

    // 7. Shame / Guilt
    ashamed: 'rgba(214, 106, 77, 0.85)',
    embarrassed: 'rgba(178, 71, 29, 0.85)',
    guilty: 'rgba(193, 88, 44, 0.85)',
    humiliated: 'rgba(191, 54, 12, 0.85)',
    insecure: 'rgba(255, 112, 67, 0.85)',
    regretful: 'rgba(230, 74, 25, 0.85)',
    remorseful: 'rgba(244, 81, 30, 0.85)',

    // 8. Fear / Anxiety
    anxious: 'rgba(0, 172, 193, 0.85)',
    confused: 'rgba(0, 151, 167, 0.85)',
    overwhelmed: 'rgba(0, 131, 143, 0.85)',
    stressed: 'rgba(0, 96, 100, 0.85)',

    // 9. Disappointment / Sadness
    blue: 'rgba(63, 81, 181, 0.85)',
    despairing: 'rgba(48, 63, 159, 0.85)',
    disappointed: 'rgba(96, 125, 139, 0.85)',
    down: 'rgba(92, 107, 192, 0.85)',
    heartbroken: 'rgba(57, 73, 171, 0.85)',
    melancholy: 'rgba(40, 53, 147, 0.85)',
    sad: 'rgba(69, 90, 100, 0.85)',

    // 10. Isolation / Longing
    disconnected: 'rgba(63, 81, 181, 0.85)',
    lonely: 'rgba(92, 107, 192, 0.85)',

    // 11. Low Stimulation / Exhaustion
    bored: 'rgba(149, 117, 205, 0.85)',
    nostalgic: 'rgba(126, 87, 194, 0.85)',
    tired: 'rgba(103, 58, 183, 0.85)',

    // 12. Calm / Neutral
    calm: 'rgba(220, 231, 117, 0.85)',
    content: 'rgba(212, 225, 87, 0.85)',
    indifferent: 'rgba(175, 180, 43, 0.85)',
    relaxed: 'rgba(192, 202, 51, 0.85)',
    relieved: 'rgba(158, 157, 36, 0.85)',
    satisfied: 'rgba(130, 119, 23, 0.85)',

    // 13. Mourning / Grief
    bereft: 'rgba(43, 43, 43, 0.85)',
    grieving: 'rgba(0, 0, 0, 0.85)',
    heartache: 'rgba(58, 58, 58, 0.85)',
    mourning: 'rgba(28, 28, 28, 0.85)',
    numb: 'rgba(92, 92, 92, 0.85)',
    yearning: 'rgba(75, 75, 75, 0.85)',

    // Fallback
    default: 'rgba(153, 153, 153, 0.85)',
  };

  return colors[mood.toLowerCase()] || colors.default;
};
