export const renderColor = (numValue: number) => {
  switch (numValue) {
    case 1:
      return '#FA4836';
    case 2:
      return '#fab362';
    case 3:
      return '#fad64e';
    case 4:
      return '#9dd4e8';
    case 5:
      return '#57b4dd';
    default:
      return '#4cbb17';
  }
};

export const renderEmoji = (numValue: number) => {
  switch (numValue) {
    case 1:
      return require('assets/images/emoji/A.png');
    case 2:
      return require('assets/images/emoji/B.png');
    case 3:
      return require('assets/images/emoji/C.png');
    case 4:
      return require('assets/images/emoji/D.png');
    case 5:
      return require('assets/images/emoji/E.png');
    default:
      return require('assets/images/emoji/C.png');
  }
};
