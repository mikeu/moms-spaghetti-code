import { expect } from "chai";
import { momsSpagetti, OG } from "../index.js";

describe("Mom's Spaghetti", () => {
  it("should equal the original output", async () => {
    const ogOutput = OG.momsSpagetti(OG.lyrics);

    const output = await momsSpagetti(OG.lyrics);

    expect(output).to.equal(ogOutput);
  });
});
