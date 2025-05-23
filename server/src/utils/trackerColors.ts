// File: server/src/utils/trackerColors.ts

export const getMoodColor = (mood: string): string => {
  const colors: Record<string, string> = {
    // 1. Connection / Love
    affectionate: '#EC407A',
    connected: '#E75480',
    horny: '#880E4F',
    intimate: '#C2185B',
    loved: '#D43D6E',
    tender: '#AD1457',
    warm: '#E91E63',

    // 2. Happy / Energized
    excited: '#FFD43B',
    grateful: '#FFAD00',
    happy: '#FFE066',
    hopeful: '#FFB700',
    overjoyed: '#FFC300',

    // 3. Motivated / Empowered
    confident: '#FFA500',
    creative: '#FF8C00',
    curious: '#FF7518',
    empowered: '#FF5C00',
    inspired: '#FF6F00',
    motivated: '#FF6600',
    proud: '#FF4B00',

    // 4. Surprise / Shock
    alarmed: '#F57C00',
    amazed: '#FF9800',
    shocked: '#FF914D',
    speechless: '#FB8C00',
    startled: '#FFA726',
    surprised: '#FFB84D',

    // 5. Disgust
    disgusted: '#558B2F',
    jealous: '#33691E',
    repulsed: '#4CAF50',
    judgmental: '#388E3C',
    suspicious: '#2E7D32',
    resentful: '#1B5E20',

    // 6. Anger
    aggressive: '#BF360C',
    angry: '#D72638',
    annoyed: '#D32F2F',
    enraged: '#B71C1C',
    frustrated: '#C41B2E',
    irritated: '#E53935',

    // 7. Shame / Guilt
    ashamed: '#D66A4D',
    embarrassed: '#B2471D',
    guilty: '#C1582C',
    humiliated: '#BF360C',
    insecure: '#FF7043',
    regretful: '#E64A19',
    remorseful: '#F4511E',

    // 8. Fear / Anxiety
    anxious: '#00ACC1',
    confused: '#0097A7',
    overwhelmed: '#00838F',
    stressed: '#006064',

    // 9. Disappointment / Sadness
    blue: '#3F51B5',
    despairing: '#303F9F',
    disappointed: '#607D8B',
    down: '#5C6BC0',
    heartbroken: '#3949AB',
    melancholy: '#283593',
    sad: '#455A64',

    // 10. Isolation / Longing
    disconnected: '#3F51B5',
    lonely: '#5C6BC0',

    // 11. Low Stimulation / Exhaustion
    bored: '#9575CD',
    nostalgic: '#7E57C2',
    tired: '#673AB7',

    // 12. Calm / Neutral
    calm: '#DCE775',
    content: '#D4E157',
    indifferent: '#AFB42B',
    relaxed: '#C0CA33',
    relieved: '#9E9D24',
    satisfied: '#827717',

    // 13. Mourning / Grief
    bereft: '#2B2B2B',
    grieving: '#000000',
    heartache: '#3A3A3A',
    mourning: '#1C1C1C',
    numb: '#5C5C5C',
    yearning: '#4B4B4B',

    // Fallback
    default: '#999999',
  };

  return colors[mood.toLowerCase()] || colors.default;
};
