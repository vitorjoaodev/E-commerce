import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

/**
 * Helper function to throw an error if a response is not OK
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
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
    credentials: 'include'
  });
  
  await throwIfResNotOk(res);
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
}): QueryFunction<T, QueryKey> => {
  return async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (options.on401 === "returnNull" && res.status === 401) {
      return null as unknown as T;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };
};

/**
 * QueryClient instance with default configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn<unknown>({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});