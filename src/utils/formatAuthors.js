export const formatAuthors = (arr) => {
  let formattedAuthor = "";

  if (arr === null || arr.length === 0) {
    return "No Authors Provided";
  } else if (arr.length === 1) {
    return (formattedAuthor = arr[0]);
  } else if (arr.length === 2) {
    return (formattedAuthor = arr.join(" & "));
  }
};
