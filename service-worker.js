self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open("app-v1").then( cache => {
            console.log("open cache");
            return cache.addAll([
                "./app.js",
                "./main.css",
                "./serviceWorker.html"
            ])
        })
    )
})

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then( function (res) {
            if (res) {
                return res;
            } else {
                // 通过fetch方法向网络发起请求
                // fetch(url).then(function (res) {
                //     if (res) {

                //     } else {

                //     }
                // })
            }
        })
    )
})