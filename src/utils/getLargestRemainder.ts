export const getLargestRemainder = (
  values: number[],
  desiredSum: number
): number[] | undefined => {
  if (values.length === 0) return;

  let sum = 0;
  let valueParts = values.map((value: number, index: number) => {
    // Get rounded down integer values.
    const integerValue = value | 0;
    sum += integerValue;
    return {
      integer: integerValue, // Integer part of the value
      decimal: value % 1, // Decimal part of the value
      originalIndex: index // Used to return values in original order.
    };
  });

  if (sum != desiredSum) {
    // Sort values by decimal part
    valueParts = valueParts.sort((x) => x.decimal);

    const diff = desiredSum - sum;
    let i = 0;

    // Distribute the difference.
    while (i < diff) {
      valueParts[i].integer++;
      i++;
    }
  }

  return valueParts.sort((x) => x.originalIndex).map((p) => p.integer);
};
