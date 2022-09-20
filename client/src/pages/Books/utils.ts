const truncate = (text: string): string => {
  return `${text.substring(0, 110)}...`;
};

export { truncate };
