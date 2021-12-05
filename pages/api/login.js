export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    throw new Error("something went wrong");
  }
  return new Promise((resolve, reject) => {
    resolve(res);
    reject({ errMessage: "something went wrong" });
  });
  // the rest of your code
}
