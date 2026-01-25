const baseUrl = 'https://apps.twinkleai.tw/tw-eval-leaderboard';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const lang = query.lang || 'zh-TW';
  const redirectUrl = `${baseUrl}?lang=${lang}`;
  return Response.redirect(redirectUrl, 301);
});
