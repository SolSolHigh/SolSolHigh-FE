export const getImgSrc = (gender: string, type: string) => {
  const baseSrc =
    'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/models/';

  if (gender === 'MALE') {
    if (type === 'PARENT') return baseSrc + 'man1.png';
    else return baseSrc + 'boy1.png';
  } else {
    if (type === 'PARENT') return baseSrc + 'woman1.png';
    else return baseSrc + 'girl1.png';
  }
};
