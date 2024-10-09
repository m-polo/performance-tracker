import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { describe, expect, test, vi } from "vitest";
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
  test.only("should render component with only athlete details", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce({ data: athlete })
      .mockResolvedValueOnce({ data: [] });

    render(component);

    await waitFor(() => {
      expect(screen.getByText(athlete.name)).toBeInTheDocument();
      expect(screen.getByText(athlete.team)).toBeInTheDocument();
      expect(screen.getByText("Add new metric")).toBeInTheDocument();
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
