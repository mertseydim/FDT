const redis = require('redis');

let client = null;
let ready = false;

if (process.env.REDIS_URL) {
  client = redis.createClient({ url: process.env.REDIS_URL });
  client.on('error', (err) => { console.log('Redis hatasi:', err.message); ready = false; });
  client.on('ready', () => { ready = true; });
  client.connect()
    .then(() => console.log('Redis baglandi'))
    .catch((err) => console.log('Redis baglanamadi:', err.message));
}

async function getCache(key) {
  if (!client || !ready) return null;
  try {
    const val = await client.get(key);
    return val ? JSON.parse(val) : null;
  } catch (err) { return null; }
}

async function setCache(key, value, ttlSeconds = 30) {
  if (!client || !ready) return;
  try {
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (err) {}
}

async function clearFeedCache() {
  if (!client || !ready) return;
  try {
    const keys = await client.keys('feed:*');
    if (keys.length) await client.del(keys);
  } catch (err) {}
}

module.exports = { getCache, setCache, clearFeedCache };