const url = 'https://apps.twinkleai.tw/tw-eval-leaderboard';
export default defineEventHandler(
    () => Response.redirect(url, 301),
);
