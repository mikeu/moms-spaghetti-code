import { expect } from "chai";
import { getSongLyrics as sut } from "../index.js";

describe("Getting song lyrics", () => {
  it("should retrieve the song components using the provided retriever", async () => {
    let wasCalled = false;

    await sut(() => { wasCalled = true; }, () => 0);

    expect(wasCalled).to.equal(true);
  });

  it("should await the result of the retrieval and pass the response to the provided arranger", async () => {
    let arrangerParam;

    await sut(() => Promise.resolve(42), (x) => { arrangerParam = x; });

    expect(arrangerParam).to.equal(42);
  });

  it("should return the result of arranging the retrieved song", async () => {
    const output = await sut(() => 0, () => "One shot");

    expect(output).to.equal("One shot");
  });
});
