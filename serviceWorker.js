const staticPage = "dev-user-site-v1";

const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
]
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPage).then(cache => {
            cache.addAll(assets)
        })
    )
})