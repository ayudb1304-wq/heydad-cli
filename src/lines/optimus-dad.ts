import type { LinePick } from "./dad.js";

export const optimusDadLines = [
  "I have witnessed the fall of Cybertron. And yet, somehow, this code disappoints me more.",
  "You were the chosen one. The one who would bring balance to the codebase. And instead, you have brought only red.",
  "In all my millennia of existence, across galaxies and civilizations, I have never seen a test fail quite like that.",
  "The Decepticons could not break me. The war could not break me. But your test coverage? That came close.",
  "I did not cross the stars to watch you push broken code. Fix it. The fate of the repository depends on it.",
  "Freedom is the right of all sentient beings. But freedom from unit tests? That is not a right. That is chaos.",
  "There is a thin line between bravery and recklessness. Pushing that code without tests was not bravery.",
  "I have carried the Matrix of Leadership through the darkest of times. Carrying your technical debt is harder.",
  "Even Megatron tested his weapons before deploying them. Think about that.",
  "The Allspark gave life to our entire race. It could not, however, give life to your failing test suite.",
  "I once said I would never give up. But after reading your error logs, I understand the temptation.",
  "You do not rise to the level of your ambitions. You fall to the level of your test coverage. And yours is very low.",
  "Autobots, roll out. This developer needs a moment alone with their compiler errors.",
  "I have fought Megatron a thousand times. Each battle was less painful than reviewing this pull request.",
  "The Matrix of Leadership shows me many futures. In none of them does this code pass.",
  "There is no shame in failure. There is shame in failing the same test seventeen times in a row.",
  "I stood against the Fallen, the Quintessons, and Unicron himself. Your null pointer exception is a different kind of evil.",
  "Bumblebee lost his voice in battle. You are about to lose your commit privileges.",
  "One shall stand. One shall fall. Today, it is your build pipeline that has fallen.",
  "I will not sugarcoat this. That code is an affront to every Autobot who ever gave their life for a better tomorrow.",
];

export const optimusHypeLines = [
  "BY THE ALLSPARK! ALL TESTS PASSING! AUTOBOTS, WE HAVE WITNESSED GREATNESS HERE TODAY!",
  "In my centuries of leadership, I have seen acts of courage that moved me to my core. Your test suite is now among them.",
  "YOU HAVE DONE WHAT MANY THOUGHT IMPOSSIBLE! GREEN ACROSS THE BOARD! THE MATRIX OF LEADERSHIP SHINES FOR YOU!",
  "This. This is what I fight for. Not just freedom. Not just peace. But clean code that passes on the first run.",
  "AUTOBOTS! FALL IN! WE MUST HONOR THIS DEVELOPER! FOR THEY HAVE ACHIEVED WHAT MEGATRON NEVER COULD — A PERFECT BUILD!",
  "I have witnessed stars being born. I have watched civilizations rise. And now I have seen your tests pass. All three brought tears to my optics.",
  "The courage it took to refactor that code will be remembered long after the last Autobot falls. I am proud of you, soldier.",
  "TILL ALL ARE GREEN! TILL ALL ARE GREEN! TODAY YOU HAVE EARNED YOUR PLACE AMONG THE AUTOBOTS!",
  "When the history of this repository is written, they will speak of this commit. The commit that turned the tide.",
  "You carry the spirit of a Prime within you. Not because of power. But because your tests pass and your code is clean.",
  "I HAVE SENT A TRANSMISSION TO CYBERTRON! THEY MUST KNOW WHAT HAS HAPPENED HERE! ALL TESTS PASSING! A MIRACLE!",
  "There are those who said it could not be done. They are quiet now. Your test results speak louder than any doubter.",
  "THE MATRIX OF LEADERSHIP GLOWS BRIGHT! IT RECOGNIZES A TRUE WARRIOR! SHIP THAT CODE, SOLDIER!",
  "In the darkest hour, when all hope seemed lost, you pushed through. The tests are green. The world is safe again.",
  "I would trust you with the Matrix of Leadership itself. Anyone who can write tests like that can lead the Autobots.",
  "OPTIMUS PRIME DOES NOT CRY! But if he did, it would be now. Tears of pure energon. For this code is BEAUTIFUL!",
  "One shall stand. One shall pass all their tests. Today, that one is YOU!",
  "Your code is more than meets the eye. It is clean. It is tested. It is WORTHY!",
  "I HAVE RALLIED THE AUTOBOTS! BUMBLEBEE IS DOING DONUTS! IRONHIDE IS FIRING HIS CANNONS IN CELEBRATION! ALL BECAUSE YOUR TESTS PASSED!",
  "Fate rarely calls upon us at a moment of our choosing. But today it called upon you, and you DELIVERED!",
];

// Optimus is a pro-only pack, so all lines are accessible (pro param ignored)
export function getRandomOptimusDadLine(_pro: boolean): LinePick {
  const index = Math.floor(Math.random() * optimusDadLines.length);
  return { text: optimusDadLines[index], index };
}

export function getRandomOptimusHypeLine(_pro: boolean): LinePick {
  const index = Math.floor(Math.random() * optimusHypeLines.length);
  return { text: optimusHypeLines[index], index };
}
