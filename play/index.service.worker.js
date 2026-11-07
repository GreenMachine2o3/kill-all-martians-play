// Retired: an earlier build installed a service worker that kept serving stale files. This replacement clears its
// caches, unregisters itself and reloads open pages, so phones always get the current build.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({type: 'window'})) c.navigate(c.url);
})()));
