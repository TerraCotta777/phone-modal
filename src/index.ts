export async function setPhone(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("phone");
    }, 1000);
  });
}
