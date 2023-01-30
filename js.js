const maxSequence = function (arr) {
  // ...
  if (arr.length === 0) { return 0; }

  while (changes) {
    for (let i = 0; i < arr.length; i++) {
      if (arr.slice(0, i).reduce((a, b) => a + b, 0) < 0) {
        arr.splice(0, i); i = -1;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr.slice(-i).reduce((a, b) => a + b, 0) < 0) {
        arr.splice(-i); i = -1;
      }
    }
  }

  const sum = arr.reduce((a, b) => a + b, 0);

  if (sum > 0) { return sum; }
  return 0;
};

console.log(maxSequence(
  [34, 44, -11, -47, 35, 20, -21, -5, 26, -23, 39, -48, -25, -28, 27, -11, 16, -26, -32, -34],
));
