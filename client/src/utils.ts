const truncate = (text: string): string => {
  return `${text.substring(0, 110)}...`;
};

const firstLetterUppercase = (text: string): string => {
  const splitText = text.split("");
  return `${splitText[0].toUpperCase()}${splitText
    .join("")
    .substring(1, splitText.length)}`;
};

export { firstLetterUppercase, truncate };
