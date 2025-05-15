import { QueryClient } from '@tanstack/react-query';

/**
 * Helper function to throw an error if a response is not OK
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    try {
      const json = JSON.parse(errorText);
      if (json.message) {
        throw new Error(json.message);
      }
    } catch (e) {
      // Not JSON or no message property
    }
    throw new Error(`HTTP Error ${res.status}: ${res.statusText || errorText}`);
  }
}

/**
 * Generic API request function with error handling
 */
export async function apiRequest<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  });
  
  await throwIfResNotOk(res);
  
  // For non-GET requests with 204 (No Content) status, return empty object
  if (res.status === 204) {
    return {} as T;
  }
  
  return res.json();
}

/**
 * Type for how to handle 401 responses
 */
type UnauthorizedBehavior = "returnNull" | "throw";

/**
 * Function to create a query function with custom 401 handling
 */
export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
} = { on401: "throw" }) => {
  return async ({ queryKey }: { queryKey: readonly (string | number)[] }) => {
    try {
      const path = queryKey.join('/');
      return await apiRequest<T>(path);
    } catch (error: any) {
      if (error?.status === 401 && options.on401 === "returnNull") {
        return null;
      }
      throw error;
    }
  };
};

/**
 * QueryClient instance with default configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});