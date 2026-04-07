export interface TieredLine {
  text: string;
  tier: "free" | "pro";
}

export interface LinePick {
  text: string;
  index: number;
}

// WARNING: Do not reorder lines. MP3 files are matched by array index (index N → (N+1).padStart(2,'0').mp3)
export const dadLines: TieredLine[] = [
  { text: "Jaysus, Mary, and Joseph. I didn't raise you to be pushing code like that. Your mother would be turning in her grave, and she's not even dead.", tier: "free" },
  { text: "Right. Grand. I'm not angry. I'm just going to sit here in silence and think about where I went wrong as a father.", tier: "free" },
  { text: "You know your cousin Declan? Works at Google now. Never had a failing test in his life. Just saying.", tier: "free" },
  { text: "I spent thirty years working the farm so you could go to university and write code that doesn't even compile. Thirty. Years.", tier: "free" },
  { text: "Oh brilliant, another red test. Sure why would I expect anything different? Hope is a dangerous thing in this house.", tier: "free" },
  { text: "Do you know what your grandfather would say if he saw that code? Nothing. He'd just look at you. And that would be enough.", tier: "free" },
  { text: "I'm going to go put the kettle on. And when I come back, I want that fixed. Don't make me come back to more red.", tier: "free" },
  { text: "See that? That right there? That's the exact moment I stopped telling the lads at the pub that my kid's a software engineer.", tier: "free" },
  { text: "I once fixed a tractor engine in the rain with nothing but a spanner and a prayer. And you can't even pass a unit test with the entire internet at your fingertips.", tier: "free" },
  { text: "Right, I'm ringing your mother. She needs to know what's happening here. This is a two-parent problem now.", tier: "free" },
  { text: "You know what, I'm not even going to say it. You already know. Look at the screen. Look at it. That's your legacy right there.", tier: "pro" },
  { text: "When I was your age, I was carrying bags of cement up three flights of stairs. And here you are, defeated by a missing semicolon.", tier: "pro" },
  { text: "That's grand. That's absolutely grand. I'll just add it to the list of disappointments. Right under the time you forgot Mother's Day.", tier: "pro" },
  { text: "I told the lads at the pub you were working on something big. Please don't make a liar out of me. I have a reputation.", tier: "pro" },
  { text: "Sweet mother of God, did you even look at what you wrote? Read it back to yourself. Slowly. Out loud. And then apologize.", tier: "pro" },
  { text: "You know what the worst part is? I actually believed in you this time. I thought, this is it, the kid's finally got it. But no.", tier: "pro" },
  { text: "I'm going for a walk. A long one. Down by the sea. And I'm going to think about all the other careers you could have chosen.", tier: "pro" },
  { text: "Right, that's it. I'm writing you out of the will and leaving everything to the dog. At least the dog doesn't push broken code.", tier: "pro" },
  { text: "Do you know how much your education cost me? I could have bought a boat. A nice one. With a cabin and everything.", tier: "pro" },
  { text: "I'm not saying I'm disappointed. I'm saying if disappointment was a sport, you'd finally be world class at something.", tier: "pro" },
];

export const dadLineTexts = dadLines.map((l) => l.text);

export function getRandomDadLine(pro: boolean): LinePick {
  const eligible = dadLines
    .map((l, i) => ({ ...l, index: i }))
    .filter((l) => pro || l.tier === "free");
  const pick = eligible[Math.floor(Math.random() * eligible.length)];
  return { text: pick.text, index: pick.index };
}
