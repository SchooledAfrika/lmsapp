export const serverError = () => {
  throw new Error(JSON.stringify({ message: "something went wrong" }));
};
