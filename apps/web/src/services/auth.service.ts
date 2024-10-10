import { ApiClientType } from "../App";

export function getToken(client: ApiClientType, name: string, email: string) {
  return client.auth.token.$get({ query: { name, email } });
}
