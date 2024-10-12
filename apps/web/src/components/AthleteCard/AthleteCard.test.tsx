import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ClientResponse } from "hono/client";
import React from "react";
import { describe, expect, Mock, test, vi } from "vitest";
import * as athleteService from "../../services/athlete.service";
import { Athlete } from "../../shared/interfaces";
import { athlete } from "../../test-data";
import AthleteCard from "./AthleteCard";

const queryClient: QueryClient = new QueryClient();

const onAthleteDelete: Mock = vi.fn();
const onAthleteEdit: Mock = vi.fn();

const component: React.JSX.Element = (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AthleteCard
        athleteInfo={athlete}
        onAthleteDelete={onAthleteDelete}
        onAthleteEdit={onAthleteEdit}
      />
    </IonApp>
  </QueryClientProvider>
);

describe("AthleteCard tests", () => {
  test("should present component with athlete details", async () => {
    render(component);

    await waitFor(() => {
      expect(screen.getByText(athlete.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${athlete.team}, ${athlete.age} years`)
      ).toBeInTheDocument();
    });
  });

  test("should present AthleteDeletionModal when trash button is clicked", async () => {
    render(component);

    fireEvent.click(screen.getByTestId("delete-modal-button"));

    await waitFor(() =>
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument()
    );
  });

  test("should present AthleteCompleteInfoModal when eye button is clicked", async () => {
    vi.spyOn(athleteService, "getAthleteById").mockResolvedValueOnce({
      json: vi.fn(() => athlete),
    } as unknown as ClientResponse<Required<Athlete>, 200, "json">);

    render(component);

    fireEvent.click(screen.getByTestId("complete-info-modal-button"));

    await waitFor(() =>
      expect(screen.getByTestId("complete-info-modal")).toBeInTheDocument()
    );
  });

  test("should present AthleteDetailsModal when edit button is clicked", async () => {
    render(component);

    fireEvent.click(screen.getByTestId("edit-modal-button"));

    await waitFor(() =>
      expect(screen.getByTestId("athlete-details-modal")).toBeInTheDocument()
    );
  });
});
