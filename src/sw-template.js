if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    const graphQlEndpoint = `https://2qp3hpgywvhijf4sdrmfjivhgi.appsync-api.eu-central-1.amazonaws.com/graphql`;
    const cloudfrontEndpoint = `https://m5bhr3hyik.execute-api.eu-central-1.amazonaws.com/Prod`;
    const cacheName = `tech-radar-cache`;

    workbox.core.setCacheNameDetails({
      prefix: cacheName,
      suffix: 'v1',
    });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* GQL Endpoint */
    workbox.routing.registerRoute(graphQlEndpoint, workbox.strategies.staleWhileRevalidate());

    /* CloudFront endpoint */
    workbox.routing.registerRoute(cloudfrontEndpoint, workbox.strategies.staleWhileRevalidate());

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    // Store fonts
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
      }),
    );

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
