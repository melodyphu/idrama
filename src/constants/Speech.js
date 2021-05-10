export const VOICE_COMMANDS = {
  stop: 0,
  start: 1,
  pause: 2,
  resume: 3,
  line: 4,
  repeat: 5,
  previous: 6,
  skip: 7,
};

export const LINE_COMMANDS = {};

export const MESSAGE_TYPES = {
  line: 0,
  question: 1,
  response: 2,
  speech: 3,
};

export const TIP_INFO = [
  ["from beginning", "start practicing from the very top"],
  ["restart section*", "restart the current section"],

  ["line", "ask iDrama for the current line"],
  ["previous line", "ask iDrama for the previous line"],
  ["next line", "skip to the next line"],

  ["previous section*", "start the beginning of the previous section"],
  ["next section*", "move to the start of the next section"],

  ["yes/no", "confirm or cancel a restart"],

];

//   ["iDrama pause", "pause at the current line you are on"],
//   ["iDrama resume", "start practicing at the most recent line"],
