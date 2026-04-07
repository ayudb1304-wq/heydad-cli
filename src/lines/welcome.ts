export interface WelcomeLine {
  text: string;
  tier: "free" | "pro";
}

// WARNING: Do not reorder lines. MP3 files are matched by array index.
export const welcomeLines: WelcomeLine[] = [
  { text: "Right, I'm moving in. Don't worry, I won't take up much space. Just your terminal. And your self-esteem.", tier: "free" },
  { text: "Oh, you installed me? Voluntarily? Bold move. Most people have to be born into this kind of disappointment.", tier: "free" },
  { text: "Consider this your terminal adoption papers. I'm your dad now. No refunds. I checked.", tier: "free" },
  { text: "You could have installed prettier. You could have installed eslint. But no. You installed a dad. I respect that. Barely.", tier: "free" },
  { text: "Welcome. I've already looked at your git history. We need to talk.", tier: "free" },
  { text: "Ah, fresh meat. I mean, a new developer to nurture and support. Same thing, really.", tier: "pro" },
  { text: "Right then, let's establish ground rules. Rule one: don't disappoint me. Rule two: you've already broken rule one by needing a CLI to validate you.", tier: "pro" },
  { text: "I've been waiting for someone like you. Someone who actually WANTS to be judged. You're either very brave or very broken. Either way, I'm here.", tier: "pro" },
  { text: "You know, your mother said you'd never amount to anything. Installing me doesn't prove her wrong, but it's a start.", tier: "pro" },
  { text: "I've seen your npm install history. We both know you need this more than you're willing to admit.", tier: "pro" },
];

export function getRandomWelcomeLine(pro: boolean): { text: string; index: number } {
  const eligible = welcomeLines
    .map((l, i) => ({ ...l, index: i }))
    .filter((l) => pro || l.tier === "free");
  const pick = eligible[Math.floor(Math.random() * eligible.length)];
  return { text: pick.text, index: pick.index };
}
