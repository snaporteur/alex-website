const GITHUB_URL = 'https://github.com/snaporteur';

// The site is statically exported, so `redirect()` and next.config redirects
// can't issue a real HTTP redirect. A server-rendered <meta refresh> works
// without any client-side JavaScript.
export default function Page() {
    return (
        <main className="flex h-screen items-center justify-center">
            <meta httpEquiv="refresh" content={`0;url=${GITHUB_URL}`} />
            <h1 className="text-4xl font-bold">
                Redirecting to <a href={GITHUB_URL} rel="noopener noreferrer" className="underline">GitHub</a>...
            </h1>
        </main>
    );
}
