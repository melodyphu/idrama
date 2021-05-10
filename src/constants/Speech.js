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
  ["(iDrama) previous line", "ask iDrama for the previous line"],
  ["(iDrama) line", "ask iDrama for the current line"],
  ["(iDrama) next line", "skip to the next line"],
  ["(iDrama) previous section", "start the beginning of the previous section"],
  ["(iDrama) restart section", "restart the current section"],
  ["(iDrama) next section", "move to the start of the next section"],
  ["(iDrama) from beginning", "start practicing from the very top"],
];

export const COMMAND_NAMES = ["previous line", "line", "next line", "previous section", "restart section", "next section", "from beginning"]


export const CONFIRM_TYPES = {
  restart_all: 0,
  restart_section: 1,
  previous_section: 2,
  next_section: 3,
}

//   ["iDrama pause", "pause at the current line you are on"],
//   ["iDrama resume", "start practicing at the most recent line"],
