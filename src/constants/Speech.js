export const VOICE_COMMANDS = {
    stop: 0,
    start: 1,
    pause: 2,
    resume: 3,
    line: 4,
    repeat: 5,
    previous: 6, 
    skip: 7,
}

export const LINE_COMMANDS = {
    
}

export const MESSAGE_TYPES = {
    line: 0,
    question: 1,
    response: 2,
    speech: 3
}

export const TIP_INFO = [
    ["iDrama start", "start practicing from the top"],
    ["iDrama stop", "stop practicing"],
    ["iDrama pause", "pause at the current line you are on"],
    ["iDrama resume", "start practicing at the most recent line"],
    ["iDrama line", "ask iDrama for the next line"],
    ["iDrama repeat line", "ask for iDrama to repeat your current line"],
    ["iDrama previous line", "ask for the previous line"],
    ["iDrama skip line", "skip the line you are current on"]
]