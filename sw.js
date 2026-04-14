importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDKWorker.js');

// ... Phía dưới này giữ nguyên các hàm cũ của Mỹ ...
// sw.js - Service Worker cho Sắc Màu
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Đã cài đặt');
});

self.addEventListener('fetch', (e) => {
  // Tạm thời để trống để Web luôn lấy dữ liệu mới nhất từ server
  e.respondWith(fetch(e.request));
});