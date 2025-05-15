import { QueryClient } from '@tanstack/react-query';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Failed with status: ${res.status}`);
  }
}

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

  return res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}) => {
  return async (params: { queryKey: readonly (string | number)[] }): Promise<T | null> => {
    // Convert array key to path
    const path = params.queryKey.join('/');
    
    try {
      const res = await fetch(path);
      
      if (res.status === 401 && options.on401 === "returnNull") {
        return null;
      }
      
      await throwIfResNotOk(res);
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching ${path}:`, error);
      throw error;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      queryFn: getQueryFn<any>({ on401: "throw" }),
    },
  },
});