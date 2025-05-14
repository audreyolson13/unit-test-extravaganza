//TODO:
// 1. Figure out the different use cases for the useTaskManager hook, and stub out the tests.
// 2. With the help of copilot, write the tests.
// 3. run tests, ensure they pass, and check coverage.
// 4. If coverage is not 100%, use the coverage report to figure out what use cases are missing and fill in tests.

//NOTE: try to aim for best practices
//        wrap actions in act() 

import { renderHook } from "@testing-library/react";
import { useTaskManager } from "./example3";

describe("useTaskManager", () => {
  it("returns tasks", () => {
    const { result } = renderHook(() => useTaskManager([], 5));
    expect(result.current.tasks).toEqual([]);
  });
});
