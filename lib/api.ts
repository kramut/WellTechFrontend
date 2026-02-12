/**
 * API Client per WellTech Backend
 * Configura NEXT_PUBLIC_API_URL nel .env.local
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function apiRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Costruisci URL con query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Products
  products: {
    getAll: (params?: { category?: string }) =>
      apiRequest('/api/products', { params }),
    getById: (id: number) => apiRequest(`/api/products/${id}`),
    create: (data: any) =>
      apiRequest('/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: any) =>
      apiRequest(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiRequest(`/api/products/${id}`, {
        method: 'DELETE',
      }),
  },

  // Articles
  articles: {
    getAll: (params?: { category?: string; published?: boolean }) =>
      apiRequest('/api/articles', { params }),
    getById: (id: number) => apiRequest(`/api/articles/${id}`),
    getBySlug: (slug: string) => apiRequest(`/api/articles/slug/${slug}`),
    create: (data: any) =>
      apiRequest('/api/articles', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: any) =>
      apiRequest(`/api/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiRequest(`/api/articles/${id}`, {
        method: 'DELETE',
      }),
  },

  // Videos
  videos: {
    getAll: (params?: { articleId?: number }) =>
      apiRequest('/api/videos', { params }),
    getById: (id: number) => apiRequest(`/api/videos/${id}`),
    create: (data: any) =>
      apiRequest('/api/videos', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: any) =>
      apiRequest(`/api/videos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiRequest(`/api/videos/${id}`, {
        method: 'DELETE',
      }),
    render: (id: number) =>
      apiRequest<any>(`/api/videos/${id}/render-and-wait`, {
        method: 'POST',
      }),
    renderAsync: (id: number) =>
      apiRequest<any>(`/api/videos/${id}/render`, {
        method: 'POST',
      }),
    renderStatus: (id: number, renderId: string) =>
      apiRequest<any>(`/api/videos/${id}/render-status/${renderId}`),
  },

  // Affiliate Earnings
  earnings: {
    getAll: (params?: { productId?: number }) =>
      apiRequest('/api/affiliate-earnings', { params }),
    getById: (id: number) => apiRequest(`/api/affiliate-earnings/${id}`),
    getStats: () => apiRequest('/api/affiliate-earnings/stats'),
    create: (data: any) =>
      apiRequest('/api/affiliate-earnings', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: number, data: any) =>
      apiRequest(`/api/affiliate-earnings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      apiRequest(`/api/affiliate-earnings/${id}`, {
        method: 'DELETE',
      }),
  },

  // Analytics
  analytics: {
    getDashboard: () => apiRequest('/api/analytics/dashboard'),
  },

  // Product Candidates
  candidates: {
    getAll: (params?: { status?: string; category?: string }) =>
      apiRequest<any[]>('/api/product-candidates', { params }),
    getById: (id: number) =>
      apiRequest<any>(`/api/product-candidates/${id}`),
    getAnalysis: (id: number) =>
      apiRequest<any>(`/api/product-candidates/${id}/analysis`),
    approve: (id: number, approvedBy?: string) =>
      apiRequest<any>(`/api/product-candidates/${id}/approve`, {
        method: 'POST',
        body: JSON.stringify({ approvedBy: approvedBy || 'admin' }),
      }),
    reject: (id: number, rejectionReason: string) =>
      apiRequest<any>(`/api/product-candidates/${id}/reject`, {
        method: 'POST',
        body: JSON.stringify({ rejectionReason }),
      }),
    analyze: (id: number) =>
      apiRequest<any>(`/api/product-candidates/${id}/analyze`, {
        method: 'POST',
      }),
    analyzeAll: () =>
      apiRequest<any>('/api/product-candidates/analyze-all', {
        method: 'POST',
      }),
    generateContent: (id: number) =>
      apiRequest<any>(`/api/product-candidates/${id}/generate-content`, {
        method: 'POST',
      }),
    generateArticle: (id: number) =>
      apiRequest<any>(`/api/product-candidates/${id}/generate-article`, {
        method: 'POST',
      }),
    generateVideo: (id: number) =>
      apiRequest<any>(`/api/product-candidates/${id}/generate-video`, {
        method: 'POST',
      }),
    delete: (id: number) =>
      apiRequest(`/api/product-candidates/${id}`, {
        method: 'DELETE',
      }),
  },
};

export default api;






