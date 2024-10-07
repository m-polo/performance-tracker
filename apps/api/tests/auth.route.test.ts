import assert from "assert";
import app from "../src/app";

describe("Auth routes tests", () => {
  const email: string = "email";
  const name: string = "name";

  test("Get token returns a string", async () => {
    assert(2);

    const res = await app.request(`auth/token?name=${name}&email=${email}`, {
      method: "GET",
    });

    expect(res.status).toBe(200);
    expect(await res.text()).toBeDefined();
  });

  test("Get token returns an error when there is secret", async () => {
    assert(2);

    process.env = {};

    const res = await app.request(`auth/token?name=${name}&email=${email}`, {
      method: "GET",
    });

    expect(res.status).toBe(500);
    expect(await res.text()).toBe("Error getting JWT token");
  });
});
