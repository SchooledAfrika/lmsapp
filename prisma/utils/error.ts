export const serverError = () => {
  throw new Error(JSON.stringify({ message: "something went wrong" }));
};
// user not authenticated error
export const notAuthenticated = () => {
  return new Response(
    JSON.stringify({ message: "you are not authenticated" }),
    { status: 400 }
  );
};
