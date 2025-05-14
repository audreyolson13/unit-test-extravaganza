// Description: This file contains the test cases for the useGetTasks hook.
// It uses the MockedProvider from Apollo Client to mock the GraphQL queries and responses.
// The tests cover various scenarios including successful data fetching, error handling, and infinite loading.
// The tests use the renderHook utility from @testing-library/react to test the custom hook in isolation.

import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { renderHook, waitFor } from "@testing-library/react";
import useGetTasks, { GET_TASKS } from "./useGetTasks";

const defaultTasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

// Mocked response for the GET_TASKS query
// This is used to simulate the response from the GraphQL server when the GET_TASKS query is executed.
const mockGetTasks = {
  request: {
    query: GET_TASKS,
  },
  result: {
    data: {
      tasks: defaultTasks,
    },
  },
};

describe("useGetTasks", () => {
  it("should return mocked data", async () => {
    // This test checks if the useGetTasks hook returns the mocked data correctly.
    // The MockedProvider is used to provide the mocked response for the GET_TASKS query.
    // The renderHook utility is used to test the custom hook in isolation.
    // You can also pull this out into a helper function if you want to reuse it.
    const { result } = renderHook(() => useGetTasks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[mockGetTasks]} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({
        tasks: defaultTasks,
      });
      expect(result.current.error).toBeUndefined();
    });
  });
  it("returns error", async () => {
    const errorMock = {
      request: {
        query: GET_TASKS,
      },
      error: new Error("An error occurred"),
    };

    const { result } = renderHook(() => useGetTasks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[errorMock]} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toEqual(new Error("An error occurred"));
    });
  });
  it("returns infinite loading", async () => {
    const infiniteLoadingMock = {
      request: {
        query: GET_TASKS,
      },
      delay: Infinity,
      result: {
        data: {
          tasks: [],
        },
      },
    };

    const { result } = renderHook(() => useGetTasks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[infiniteLoadingMock]} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
    });
  });
});
