export const isSP = () => {
  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    console.log('SP版です');
    return true;
  }
  console.log('PC版です');
  return false;
};

export const isPC = () => {
  // 雑
  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    console.log('SP版です');
    return false;
  }
  console.log('PC版です');
  return true;
};
