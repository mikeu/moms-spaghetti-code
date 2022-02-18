import { getSongLyrics, OG } from "./index.js";

const startLyricGroup = (name) => {
  console.log(`\n\n${name}`);
  console.log("\nLOSE YOURSELF by EMINEM");
  console.log("-----------------------");
};

getSongLyrics(() => OG.lyrics)
  .then((loseYourself) => {
    startLyricGroup("Refactored");
    console.log(loseYourself);
    console.groupEnd();
  })
  .then(() => {
    startLyricGroup("Original");
    console.log(OG.momsSpagetti(OG.lyrics));
  });
