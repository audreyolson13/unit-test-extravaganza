import { act, renderHook } from "@testing-library/react";
import { useTaskManager } from "./example3";
import { Task } from "./example3";

const defaultTasks: Task[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: false },
  { id: 5, title: "Task 5", completed: true },
  { id: 6, title: "Task 6", completed: true },
];

describe.skip("useTaskManager", () => {
  it("returns tasks", () => {
    const { result } = renderHook(() => useTaskManager([], 5));
    expect(result.current.tasks).toEqual([]);
  });
  it("returns the number of tasks dependent on the page size", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));
    expect(result.current.tasks).toEqual(defaultTasks);
    expect(result.current.filteredTasks).toEqual(defaultTasks);
    expect(result.current.currentPageTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ]);
  });
  it("updates filtered tasks when filter changes", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));

    // Set filter to "completed"
    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.filteredTasks).toEqual([
      { id: 2, title: "Task 2", completed: true },
      { id: 5, title: "Task 5", completed: true },
      { id: 6, title: "Task 6", completed: true },
    ]);

    // Set filter to "pending"
    act(() => {
      result.current.setFilter("pending");
    });

    expect(result.current.filteredTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 3, title: "Task 3", completed: false },
      { id: 4, title: "Task 4", completed: false },
    ]);
  });
  it("updates current page tasks when current page changes", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));

    // Set current page to 2
    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.currentPageTasks).toEqual([
      { id: 3, title: "Task 3", completed: false },
      { id: 4, title: "Task 4", completed: false },
    ]);

    // Set current page to 3
    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.currentPageTasks).toEqual([
      { id: 5, title: "Task 5", completed: true },
      { id: 6, title: "Task 6", completed: true },
    ]);
  });
  it("toggles task completion", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));

    // Toggle completion of Task 1
    act(() => {
      result.current.toggleTaskCompletion(1);
    });

    expect(result.current.tasks[0].completed).toBe(true);

    // Toggle completion of Task 2
    act(() => {
      result.current.toggleTaskCompletion(2);
    });

    expect(result.current.tasks[1].completed).toBe(false);
  });
  it("Calculates total pages correctly", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));

    expect(result.current.totalPages).toBe(3);

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.totalPages).toBe(3);

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.totalPages).toBe(3);
  });
  it("defaults page size to 5 if not provided", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks));
    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentPageTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
      { id: 3, title: "Task 3", completed: false },
      { id: 4, title: "Task 4", completed: false },
      { id: 5, title: "Task 5", completed: true },
    ]);
  });
  it("does not allow setting page to a number less than 1", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));

    expect(result.current.currentPageTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ]);

    act(() => {
      result.current.setPage(0);
    });

    expect(result.current.currentPageTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ]);
  });
  it("does not allow setting page to a number greater than total pages", () => {
    const { result } = renderHook(() => useTaskManager(defaultTasks, 2));

    expect(result.current.currentPageTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ]);

    act(() => {
      result.current.setPage(4);
    });

    expect(result.current.currentPageTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ]);
  });
});
