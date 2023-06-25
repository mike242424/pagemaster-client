export const capitalizeLettersOfFirstWord = (string) => {
  const words = string.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const capitalizedStr = capitalizedWords.join(" ");

  return capitalizedStr;
};
