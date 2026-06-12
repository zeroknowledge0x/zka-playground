/*
 * coi-serviceworker.js
 * Cross-Origin Isolation via Service Worker
 * Injects COOP/COEP headers so SharedArrayBuffer works on GitHub Pages
 * Based on: https://github.com/nicolo-ribaudo/coi-serviceworker
 */
let coepCredentialless = true;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("message", (ev) => {
  if (ev.data && ev.data.type === "deregister") {
    self.registration
      .unregister()
      .then(() => self.clients.matchAll())
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      });
  }
});

self.addEventListener("fetch", function (e) {
  const r = e.request;
  if (r.cache === "only-if-cached" && r.mode !== "same-origin") {
    return;
  }

  const request =
    coepCredentialless && r.mode === "no-cors"
      ? new Request(r, { credentials: "omit" })
      : r;

  e.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 0) {
          return response;
        }

        const newHeaders = new Headers(response.headers);
        newHeaders.set(
          "Cross-Origin-Embedder-Policy",
          coepCredentialless ? "credentialless" : "require-corp"
        );
        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      })
      .catch((e) => console.error(e))
  );
});
