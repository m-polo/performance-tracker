import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ClientResponse } from "hono/client";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import * as athleteService from "../../services/athlete.service";
import * as metricService from "../../services/metric.service";
import { Athlete, Metric } from "../../shared/interfaces";
import { athlete, metrics } from "../../test-data";
import AthleteCompleteInfoModal from "./AthleteCompleteInfoModal";

const queryClient: QueryClient = new QueryClient();

const component: React.JSX.Element = (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AthleteCompleteInfoModal athleteId={athlete.id!} />
    </IonApp>
  </QueryClientProvider>
);

describe("AthleteCompleteInfoModal tests", () => {
  vi.spyOn(athleteService, "getAthleteById").mockResolvedValueOnce({
    json: vi.fn(() => athlete),
  } as unknown as ClientResponse<Required<Athlete>, 200, "json">);

  test("should render component with only athlete details", async () => {
    vi.spyOn(
      metricService,
      "getFilteredMetricsFromAthlete"
    ).mockResolvedValueOnce({
      json: vi.fn(() => []),
    } as unknown as ClientResponse<
      (Required<Metric> & { athleteId: number; timestamp: string })[],
      200,
      "json"
    >);

    render(component);

    await waitFor(() => {
      expect(screen.getByText(athlete.name)).toBeInTheDocument();
      expect(screen.getByText(athlete.team)).toBeInTheDocument();
      expect(screen.getByText("Add new metric")).toBeInTheDocument();
    });
  });

  test("should render component with metrics when athlete has some", async () => {
    vi.spyOn(
      metricService,
      "getFilteredMetricsFromAthlete"
    ).mockResolvedValueOnce({
      json: vi.fn(() => metrics),
    } as unknown as ClientResponse<
      (Required<Metric> & { athleteId: number; timestamp: string })[],
      200,
      "json"
    >);

    render(component);

    await waitFor(() => {
      expect(screen.getByText("Metric type")).toBeInTheDocument();
      expect(screen.getByText("Value")).toBeInTheDocument();
      expect(screen.getByText("Unit")).toBeInTheDocument();
      expect(screen.getByText("Add new metric")).toBeInTheDocument();
      expect(() => screen.getByText("Save")).toThrow();
      expect(() => screen.getByText("Cancel")).toThrow();
    });
  });

  test("should render component with save and cancel buttons when form is shown", async () => {
    render(component);

    fireEvent.click(screen.getByText("Add new metric"));

    await waitFor(() => {
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(() => screen.getByText("Add new metric")).toThrow();
    });
  });
});
