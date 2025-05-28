// file: client/src/utils/API.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface RequestOptions extends RequestInit {
  token?: string;
}

const fetchAPI = async (
  endpoint: string,
  options: RequestOptions = {}
): Promise<any> => {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error (${res.status}): ${errorBody}`);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
};

export const get = (endpoint: string, token?: string) =>
  fetchAPI(endpoint, { method: 'GET', token });

export const post = (endpoint: string, body: any, token?: string) =>
  fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    token,
  });

export const put = (endpoint: string, body: any, token?: string) =>
  fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    token,
  });

export const del = (endpoint: string, token?: string) =>
  fetchAPI(endpoint, {
    method: 'DELETE',
    token,
  });
