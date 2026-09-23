
const VERSION='e2b1e3c3a756';
const PREFIX='still-available:'+new URL(self.registration.scope).pathname+':';
const CACHE=PREFIX+VERSION;
const FILES=["assets/bicycle.svg","assets/chair.svg","assets/console.svg","assets/drawers.svg","assets/drill.svg","assets/index-BGuD1BJr.css","assets/index-sHgGFnMs.js","assets/items/amber.svg","assets/items/bedside.svg","assets/items/bigsofa.svg","assets/items/bmx.svg","assets/items/clock.svg","assets/items/coffee.svg","assets/items/desk.svg","assets/items/drill2.svg","assets/items/fern.svg","assets/items/gamepad.svg","assets/items/handdrill.svg","assets/items/mint.svg","assets/items/mower.svg","assets/items/mower2.svg","assets/items/oak.svg","assets/items/pixel.svg","assets/items/planter.svg","assets/items/pocket.svg","assets/items/redbike.svg","assets/items/retro.svg","assets/items/road.svg","assets/items/scrapmower.svg","assets/items/side.svg","assets/items/speakers.svg","assets/items/stereo.svg","assets/items/stool.svg","assets/items/tools.svg","assets/items/tourer.svg","assets/items/velvet.svg","assets/items/wobblysofa.svg","assets/lamp.svg","assets/mower.svg","assets/plant.svg","assets/radio.svg","assets/sofa.svg","assets/speaker.svg","assets/table.svg","favicon.svg","icons/icon-192.png","icons/icon-512.png","index.html","manifest.webmanifest","THIRD_PARTY_NOTICES.txt"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(f=>new URL(f,self.registration.scope).href)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(event.request.mode==='navigate')return (await cache.match(new URL('index.html',self.registration.scope).href))||fetch(event.request);
  const found=await cache.match(event.request,{ignoreVary:true});
  if(found)return found;
  return fetch(event.request);
 })());
});
