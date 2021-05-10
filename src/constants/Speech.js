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
  ["restart", "start practicing again from the top"],
  ["confirm", "confirm request to restart at the top"],
//   ["iDrama pause", "pause at the current line you are on"],
//   ["iDrama resume", "start practicing at the most recent line"],
  ["line", "ask iDrama for the current line"],
  ["previous", "ask iDrama for the previous line"],
  ["skip", "skip to the next line"],
  ["yes/no", "confirm or cancel a restart"],
];
