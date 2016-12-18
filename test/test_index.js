/* eslint-env mocha */
import * as _ from "lodash";
import {expect} from "chai";

import config from "../config";

describe("Config", () => {
  it("reads the test setting", async => {
    expect(config.test).to.equal("This is a client test string");
  });
});
