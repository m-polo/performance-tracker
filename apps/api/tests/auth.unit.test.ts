import { getToken } from "../src/services/auth.service";

describe("Auth routes tests", () => {
  const email: string = "email";
  const name: string = "name";

  test("Get token returns a string", async () => {
    process.env = { JWT_SECRET: "mysecretkey" };

    const result: string = await getToken(name, email);

    expect(result).toBeDefined();
  });

  test("Get token returns an error when there is secret", async () => {
    process.env = {};

    expect(getToken(name, email)).rejects.toThrow(
      "JWT_SECRET env variable not provided"
    );
  });
});
