const url = 'https://www.twinkleai.tw/tw-eval-leaderboard';
export default defineEventHandler(
    () => Response.redirect(url, 302),
);
