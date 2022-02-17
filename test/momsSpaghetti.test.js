import { expect } from 'chai';
import { momsSpaghetti, OG } from '../index.js';

describe("Mom's Spaghetti", () => {
  it('should equal the original output', async () => {
    const ogOutput = OG.momsSpagetti(OG.lyrics);

    const output = await momsSpaghetti(OG.lyrics);

    expect(output).to.equal(ogOutput);
  });
});
