export const createClientId = (): string => {
  let result = '';
  while (result.length < 20) {
    const randStr = Math.random().toString(36).substr(2);
    result += randStr.substr(0, 20 - result.length);
  }
  return result;
};
