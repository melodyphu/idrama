# iDrama
An interactive digital rehearsal and memorization assistant.

By: Melat Anteneh and Melody Phu (6.835, Intelligent Multimodal User Interfaces)

# Testing Instructions
To get the code onto your local machine, open up a terminal and run `git clone https://github.com/melodyphu/idrama.git` to clone the repository.

Make sure that you have [npm](https://www.npmjs.com/get-npm) installed. You will need this to download all the relevant packages.

Run `npm install` to get the latest versions of all packages required for iDrama.

Run `npm start` to begin a local version of iDrama. We recommend that you use Google Chrome for testing.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# File Organization
The source code can be found under `src`.

We have split up the files into folders named appropriately for each feature that they compile to.

1. `constants`: constant values that are used throughout many parts of the system. Used for modularity.
   - `Colors.js`
   - `Navigation.js`
   - `Speech.js`
   - `Text.js`
   - `Video.js`
2. `home`
   - `HomePage.js`: the home page that a user first sees.
3. `imgs` (images used throughout the system)
4. `practice`
   - `MemorizationAid.js`: where react-speech-recognition and react-speech-kit are used to process voice input and give voice feedback.
   - `PracticeArena.js`: the high level practice arena code. renders all other components in this folder.
   - `Tips.js`: displays all possible commands at the top right of the practice screen.
   - `VideoCapture.js`: captures snapshots from a users webcam and runs them against HandTrack.js to detect the face and raised hand.
5. `summary`
   - `SectionScore.js`: displays the command usage distribution across each section, and then broken down by line.
   - `Summary.js`: the high level screen that shows both feedback tables.
   - `TotalScore.js`: the table that displays the command usage across the entire piece.
6. `toolbar`
   - `AppToolbar.js`: a simple iDrama toolbar that persists throughout the program.
7. `upload`
   - `UploadArena.js`: the main screen for uploading a file, parsing a file, and displaying a file preview.
8. `App.js`: the main file that houses all other components of iDrama
