import { ApiClientType } from "../App";
import { AthleteBasicsDetails } from "../shared/interfaces";
import { authHeader } from "../shared/utils";

export function getAllAthletes(client: ApiClientType, searchText: string) {
  return client.athletes.$get({ query: { searchText } });
}

export function getAthleteById(client: ApiClientType, id: number) {
  return client.athletes[":id"].$get({
    param: {
      id: id.toString(),
    },
  });
}

export function addNewAthlete(
  client: ApiClientType,
  athlete: AthleteBasicsDetails,
  token: string
) {
  return client.athletes.$post(
    {
      json: { ...athlete, age: athlete.age.toString() },
    },
    authHeader(token)
  );
}

export function deleteAthlete(
  client: ApiClientType,
  id: number,
  token: string
) {
  return client.athletes[":id"].$delete(
    { param: { id: id.toString() } },
    authHeader(token)
  );
}

export function editAthlete(
  client: ApiClientType,
  athlete: AthleteBasicsDetails,
  token: string
) {
  return client.athletes[":id"].$put(
    {
      json: { ...athlete, id: athlete.id! },
      param: { id: athlete.id!.toString() },
    },
    authHeader(token)
  );
}
