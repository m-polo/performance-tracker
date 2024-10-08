import axios from "axios";

describe("Auth routes integration tests", () => {
  const email: string = "email";
  const name: string = "name";

  test("Get token returns a string", async () => {
    const { data, status } = await axios.get<string>(
      `http://localhost:3000/auth/token?name=${name}&email=${email}`
    );

    expect(status).toBe(200);
    expect(data).toBeDefined();
  });
});
