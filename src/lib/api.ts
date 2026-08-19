/**
 * Resilient API Helper for FutureOps-Tech Academy
 * Safely parses API responses, prevents "Unexpected token 'T'" JSON errors on HTML/404 responses,
 * handles network timeouts, and ensures clean fallback handling in both Development and Production.
 */

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  isJson: boolean;
  rawText?: string;
}

export async function safeFetchApi<T = any>(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 10000
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {})
      }
    });

    clearTimeout(timer);

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const rawText = await res.text();

    if (isJson && rawText.trim()) {
      try {
        const parsed = JSON.parse(rawText);
        if (!res.ok) {
          return {
            ok: false,
            status: res.status,
            error: parsed.error || parsed.message || `Server error (${res.status})`,
            data: parsed,
            isJson: true,
            rawText
          };
        }
        return {
          ok: true,
          status: res.status,
          data: parsed,
          isJson: true,
          rawText
        };
      } catch (parseErr) {
        // Fallback if content-type said JSON but JSON.parse failed
        console.warn(`[API] Expected JSON from ${url} but parse failed:`, parseErr);
      }
    }

    // Handle non-JSON response (e.g. HTML 404, 502 Bad Gateway, or plaintext error page)
    const sanitizedError = !res.ok
      ? `Server returned HTTP ${res.status}. Please check your connection or try again.`
      : 'Received non-JSON response from server.';

    return {
      ok: res.ok,
      status: res.status,
      error: sanitizedError,
      isJson: false,
      rawText
    };

  } catch (err: any) {
    clearTimeout(timer);
    const isAbort = err?.name === 'AbortError';
    const errMsg = isAbort 
      ? 'Request timed out. Please check network connection.'
      : (err?.message || 'Network request failed');

    return {
      ok: false,
      status: 0,
      error: errMsg,
      isJson: false
    };
  }
}
