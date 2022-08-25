export const getRangeColor = (score: number): string => {
  switch (true) {
    case 79 < score && score < 101:
      return 'range green';
    case 26 < score && score < 80:
      return 'range yellow';
    default:
      return 'range red';
  }
};
