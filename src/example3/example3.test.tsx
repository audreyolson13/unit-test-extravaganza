import { renderHook } from "@testing-library/react";
import { useTaskManager } from "./example3";

describe("useTaskManager", () => {
  it("returns tasks", () => {
    const { result } = renderHook(() => useTaskManager([], 5));
    expect(result.current.tasks).toEqual([]);
  });
});
