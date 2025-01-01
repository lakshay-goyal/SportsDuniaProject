export const CALCULATE_PAYOUTS = 'CALCULATE_PAYOUTS';
export const UPDATE_PAYOUT_RATE = 'UPDATE_PAYOUT_RATE';
export const updatePayoutRate = (rate) => ({
  type: UPDATE_PAYOUT_RATE,
  payload: rate,
});

export const calculatePayouts = (articles, rate) => {
  console.log('Calculate Payouts Action - Received articles:', articles);
  console.log('Calculate Payouts Action - Payout rate:', rate);

  const payouts = articles.map(article => ({
    articleId: article.id,
    author: article.author,
    amount: rate,
    articleTitle: article.title,
    date: new Date().toISOString()
  }));

  console.log('Calculate Payouts Action - Created payouts:', payouts);

  return {
    type: CALCULATE_PAYOUTS,
    payload: payouts
  };
};

