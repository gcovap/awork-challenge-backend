import { Steps } from ".";

export const steps: Steps[] = [
  { id: '1',label: 'Step 1', completed: false },
  { id: '2',label: 'Step 2', completed: false },
  { id: '3',label: 'Step 3', completed: false },
  { id: '4',label: 'Step 4', completed: false },
  { id: '5',label: 'Step 5', completed: false },
]

const messages = [
  { progress: 0, message: "Time to kick things off! 🚀" },
  { progress: 25, message: "Making progress—don't get too comfortable yet!" },
  { progress: 50, message: "Halfway there... or are you just stalling? 😉" },
  { progress: 75, message: "Almost there, but don't get cocky!" },
  { progress: 100, message: "Boom! You're a superstar! 🎉" },
];

export function generateMotivationalmessage(completedSteps: Steps[] = []): string {
  const progress = Math.round((completedSteps.filter(step => step.completed).length / steps.length) * 100);
  
  if (progress >= 0 && progress <= 100) {
    const motivationMessage = messages
      .sort((a,b) => a.progress - b.progress)
      .find((message) => message.progress === progress || progress < message.progress);

      return motivationMessage?.message || ''
  }
  return ''
}

