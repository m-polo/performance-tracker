import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { describe, expect, test, vi } from "vitest";
import { Athlete, Metric, METRIC_TYPES, UNITS } from "../../shared/interfaces";
import AthleteCompleteInfoModal from "./AthleteCompleteInfoModal";

const queryClient: QueryClient = new QueryClient();

const metrics: Metric[] = [
  {
    id: 1,
    unit: UNITS.KG,
    value: 3,
    metricType: METRIC_TYPES.HORIZONTAL_JUMP,
  },
];

const athlete: Athlete = {
  id: 1,
  name: "name",
  age: 1,
  team: "team",
  metrics,
};

const athleteId: number = 1;

const component: JSX.Element = (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AthleteCompleteInfoModal athleteId={athleteId} />
    </IonApp>
  </QueryClientProvider>
);

describe("AthleteCompleteInfoModal tests", () => {
  test("should render component with only athlete details", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce({ data: athlete })
      .mockResolvedValueOnce({ data: [] });

    render(component);

    await waitFor(() => {
      expect(screen.getByText(athlete.name)).toBeInTheDocument();
      expect(screen.getByText(athlete.team)).toBeInTheDocument();
      expect(() => screen.getByText("Metric type")).toThrow();
      expect(() => screen.getByText("Value")).toThrow();
      expect(() => screen.getByText("Unit")).toThrow();
      expect(() => screen.getByText("Add new metric")).toThrow();
    });
  });

  test("should render component with metrics when athlete has some", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce({ data: athlete })
      .mockResolvedValueOnce({ data: metrics });

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
