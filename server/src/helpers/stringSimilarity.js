function stringSizeComparison(s1, s2) {
  return s1.length < s2.length ? [s1, s2] : [s2, s1];
}

function editDistance(s1, s2) {
  const costs = [];
  for (let i = 0; i <= s1.length; i += 1) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j += 1) {
      if (i === 0) costs[j] = j;
      else if (j > 0) {
        // eslint-disable-next-line operator-linebreak
        const newValue =
          s1.charAt(i - 1) !== s2.charAt(j - 1)
            ? Math.min(Math.min(costs[j - 1], lastValue), costs[j]) + 1
            : costs[j - 1];
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(string1, string2) {
  const [shorter, longer] = stringSizeComparison(string1.toLowerCase(), string2.toLowerCase());
  return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

module.exports = similarity;
