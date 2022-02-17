import { expect } from "chai";
import { arrangeSong as sut } from "../index.js";

describe("Default Song Arranger", () => {
  const defaultSongStructure = {
    intro: "A",
    choruses: [{ chorus: "C" }],
    refrain: "R",
    refrainRepeat: 1,
    ending: "E",
  };

  it("should return the default expected arrangement", () => {
    const output = sut(defaultSongStructure);

    expect(output).to.equal("ACRE");
  });

  it("should repeat the refrain the correct number of times", () => {
    defaultSongStructure.refrainRepeat = 7;

    const output = sut(defaultSongStructure);

    expect(output).to.match(/[^R]RRRRRRR[^R]/);
  });

  it("should include the repeated refrains after each chorus", () => {
    defaultSongStructure.choruses.push({ chorus: "C1" }, { chorus: "C2" });
    defaultSongStructure.refrainRepeat = 3;

    const output = sut(defaultSongStructure);

    expect(output).to.match(/CRRR[^R]/);
    expect(output).to.match(/C1RRR[^R]/);
    expect(output).to.match(/C2RRR[^R]/);
  });

  it("should not include the refrain if it shouldn't be sung at all", () => {
    defaultSongStructure.refrainRepeat = 0;

    const output = sut(defaultSongStructure);

    expect(output).to.not.include("R");
  });
});
