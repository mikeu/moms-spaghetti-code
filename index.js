/* eslint-disable */
// Task:
// Create a refactored version of the following code at the bottom of this file using ES6 conventions
// Also leave a commented section breifly outlining some of the techniques, style choice, and reasons for your refactoring choices
// The refactored version of this code should be promise based and consider standard linting practices

// DO NOT REFACTOR THIS SECTION //
const lyrics = {
  intro: "Look\
  If you had\
  One shot\
  Or one opportunity\
  To seize everything you ever wanted\
  In one moment\
  Would you capture\
  Or just let it slip?",
  choruses: [{
    chorus: "Yo\
      His palms are sweaty, knees weak, arms are heavy\
      There's vomit on his sweater already, mom's spaghetti\
      He's nervous, but on the surface he looks calm and ready\
      To drop bombs, but he keeps on forgettin'\
      What he wrote down, the whole crowd goes so loud\
      He opens his mouth, but the words won't come out\
      He's chokin', how, everybody's jokin' now\
      The clocks run out, times up, over, blaow!\
      Snap back to reality, oh there goes gravity\
      Oh, there goes Rabbit, he choked\
      He's so mad, but he won't give up that easy? No\
      He won't have it, he knows his whole back city's ropes\
      It don't matter, he's dope, he knows that, but he's broke\
      He's so stacked that he knows, when he goes back to his mobile home, that's when its\
      Back to the lab again yo, this whole rhapsody\
      He better go capture this moment and hope it don't pass him",
  },
  {
    chorus: "The souls escaping, through this hole that its gaping\
      This world is mine for the taking\
      Make me king, as we move toward a, new world order\
      A normal life is borin', but super stardom's close to post mortem\
      It only grows harder, only grows hotter\
      He blows us all over these hoes is all on him\
      Coast to coast shows, he's known as the globetrotter\
      Lonely roads, God only knows, he's grown farther from home, he's no father\
      He goes home and barely knows his own daughter\
      But hold your nose 'cause here goes the cold water\
      His hoes don't want him no mo, he's cold product\
      They moved on to the next schmo who flows, he nose dove and sold nada\
      So the soap opera is told and unfolds, I suppose it's old partna, but the beat goes on\
      Da da dumb da dumb da da",
  },
  {
    chorus: "No more games, I'm a change what you call rage\
      Tear this roof off like two dogs caged\
      I was playin' in the beginnin', the mood all changed\
      I been chewed up and spit out and booed off stage\
      But I kept rhymin' and stepwritin' the next cipher\
      Best believe somebody's payin' the pied piper\
      All the pain inside amplified by the\
      Fact that I can't get by with my nine to\
      Five and I can't provide the right type of\
      Life for my family 'cause man, these God damn food stamps don't buy diapers\
      And its no movie, there's no Mekhi Phifer\
      This is my life and these times are so hard\
      And it's getting even harder tryin' to feed and water my seed, plus\
      See dishonor caught up between bein' a father and a prima-donna\
      Baby mama drama screamin' on and too much\
      For me to want to say in one spot, another jam or not\
      Has gotten me to the point, I'm like a snail I've got\
      To formulate a plot fore I end up in jail or shot\
      Success is my only option, failures not\
      Mom, I love you, but this trail has got to go, I cannot grow old in Salem's lot\
      So here I go is my shot\
      Feet fail me not 'cause maybe the only opportunity that I got",
  }],
  refrain: 'You better lose yourself in the music, the moment \
  You own it, you better never let it go \
  You only get one shot, do not miss your chance to blow \
  This opportunity comes once in a lifetime you better',
  refrainRepeat: 2, // number of times that refrain get repeated between choruses
  ending: 'You can do anything you set your mind to, man',
};
// DO NOT REFACTOR THIS SECTION //

// REFACTOR THIS CODE //
// This code assembles the above object into a string with the lyrics for Eminem's "lose Yourself".
// The result should look like https://www.google.ca/search?rlz=1C5CHFA_enCA764CA764&ei=4iFbWs_VG43CjwOJ465Q&q=lose+yourself+lyrics&oq=lose+yoursle&gs_l=psy-ab.3.0.0i10k1l10.6780.11717.0.12640.28.24.0.2.2.0.275.2686.4j13j2.20.0....0...1c.1.64.psy-ab..15.12.1403.0..0j0i67k1j0i131k1j0i131i67k1.234.XSGvMUvV4XY
function momsSpagetti(lyrics) {
  let loseYourself;
  let internalCounter = 0;
  loseYourself = lyrics.intro;

  for (let i = 0; i < lyrics.choruses.length; i++) {
    loseYourself += lyrics.choruses[i].chorus;
    if (internalCounter == 0) {
      internalCounter++;
      loseYourself += lyrics.refrain;
    }
    if (internalCounter == 1) {
      internalCounter++;
      loseYourself += lyrics.refrain;
    }
    if (internalCounter == 2) {
      internalCounter = 0;
    }
  }

  loseYourself += lyrics.ending;

  return loseYourself;
}

// REFACTORED VERSION HERE //
/* eslint-enable */

// In refactoring the above code, I first got a test environment set up to ensure that
// new output matched old. I then wrote a replacement to the existing logic using more
// modern JavaScript functionality, including destructuring assignments, native string
// and array methods, and the spread operator.
//   This reduced the ~20 lines of the original method to essentially four statements,
// which I think also have the benefit of being more easily reasoned through by future
// developers should they ever need to revisit this code. Next, I extracted this newly
// written routine to a more generic method available to arrange any song presented in
// the appropriate object format. At the same time I added type-hinting for components
// of that format.
//   The final version presented here uses inversion of control to allow any consumers
// of the new `getSongLyrics` API to swap in as-yet-unwritten functions to obtain song
// components, such as using async fetch requests to API endpoints or file systems. It
// also provides a sane default method for arranging songs, in `arrangeSong`.

/**
 * @typedef {Object} SongChorus
 * @property {string} chorus Lyrics to this chorus
 *
 * @typedef {Object} SongStructure
 * @property {string} intro Lyrics of the intro to this song
 * @property {SongChorus[]} choruses Ordered array of choruses in this song
 * @property {string} refrain Lyrics to the refrain of this song
 * @property {number} refrainRepeat Number of times the refrain repeats after each chorus
 * @property {string} ending Lyrics to the outro of this song
 *
 * @typedef {function():Promise<SongStructure>} SongRetriever
 * @typedef {function(SongStructure):string} SongArranger
 */

/**
 * Arranges the given set of song components into a single string containing the complete
 * lyrics of the song, based on default assumptions about the structure and ordering.
 *
 * @type {SongArranger}
 * @param {SongStructure} songStructure Song components to arrange
 * @returns {string}
 */
const arrangeSong = (songStructure) => {
  const {
    intro, refrain, choruses, ending, refrainRepeat,
  } = songStructure;

  const repeatedRefrains = refrain.repeat(refrainRepeat);
  const chorusesWithRefrains = choruses.map(({ chorus }) => chorus + repeatedRefrains);
  const allVerses = [intro, ...chorusesWithRefrains, ending];

  return allVerses.join("");
};

/**
 * Asynchronously obtains the structure of a song, then arranges the constituent parts
 * into a single lyrics string, which is returned. If no `SongArranger` function is
 * provided, the default `arrangeSong` defined above is used to process the retrieved
 * song component data.
 *
 * @param {SongRetriever} songRetriever Method by which to retrieve song components
 * @param {SongArranger} songArranger Method with which to convert components to lyrics
 * @returns {string}
 */
const getSongLyrics = async (songRetriever, songArranger) => {
  const structure = await songRetriever();
  const arranger = songArranger || arrangeSong;

  return arranger(structure);
};

/**
 * Wraps the more generic `getSongLyrics` method to expose the same API for building
 * the lyrics to _Lose Yourself_ as the legacy function above. While this method
 * exists as an easy drop-in replacement, its use in new code should be avoided in
 * favour of the async-ready methods now available.
 *
 * @deprecated
 * @param {SongStructure} songStructure Original lyrics object
 * @returns
 */
const momsSpaghetti = (songStructure) => getSongLyrics(() => songStructure, arrangeSong);

// Expose the previous method and data. Primarily for testing purposes, until it can be
// removed entirely.
const OG = { momsSpagetti, lyrics };
export {
  arrangeSong,
  getSongLyrics,
  momsSpaghetti as momsSpagetti,
  OG,
};
