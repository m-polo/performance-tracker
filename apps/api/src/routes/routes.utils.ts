import { HTTPException } from "hono/http-exception";

export const checkValidationResult = (success: boolean) => {
  {
    if (!success) {
      throw new HTTPException(400, {
        message: "Wrong information sent in the request",
      });
    }
  }
};
