export const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

export const shorten = (
  str: string,
  maxLen: number,
  separator = " "
): string => {
  if (str.length <= maxLen) return str;
  return str.substring(0, str.lastIndexOf(separator, maxLen));
};

export const generateColor = () => {
  return "#" + Math.random().toString(10).slice(2, 8);
};
