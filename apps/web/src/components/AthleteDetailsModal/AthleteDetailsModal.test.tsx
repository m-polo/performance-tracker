import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { Athlete } from "../../shared/interfaces";
import AthleteDetailsModal from "./AthleteDetailsModal";

const queryClient: QueryClient = new QueryClient();

const onAthleteSubmit: Mock = vi.fn();

const component = (athlete?: Athlete) => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AthleteDetailsModal
        athlete={athlete}
        onAthleteSubmit={onAthleteSubmit}
      />
    </IonApp>
  </QueryClientProvider>
);

describe("AthleteDetailsModal tests", () => {
  beforeEach(() => {
    onAthleteSubmit.mockClear();
  });

  test("should not submit form when required fields are empty", async () => {
    render(component(undefined));

    fireEvent.submit(screen.getByText("Save"));

    await waitFor(() => {
      expect(onAthleteSubmit.mock.calls.length).toBe(0);
    });
  });

  test("should load athlete info in form and submit when athlete info has been passed", async () => {
    const athlete: Athlete = {
      id: 1,
      name: "name",
      age: 1,
      team: "team",
    };

    render(component(athlete));

    fireEvent.submit(screen.getByText("Save"));

    await waitFor(() => {
      expect(onAthleteSubmit.mock.calls.length).toBe(1);
    });
  });
});
