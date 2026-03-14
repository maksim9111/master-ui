const STRAPI_URL =
    process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

type FetchOptions = RequestInit & {
    next?: {
        revalidate?: number;
    };
};

export async function fetchStrapi<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const url = `${STRAPI_URL}${path}`;

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    const token = process.env.STRAPI_API_TOKEN;
    if (token && token !== "change_me_after_strapi_setup") {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {
        ...options,
        headers,
        next: options.next ?? { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`Strapi request failed: ${response.status} ${response.statusText} (${url})`);
    }

    const json = await response.json();
    console.log(`[strapi] ${path}`, JSON.stringify(json, null, 2).slice(0, 2000));
    return json;
}
