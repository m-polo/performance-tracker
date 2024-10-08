import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { athletes } from "../../test-data";
import AthletesDashboard from "./AthletesDashboard";

const queryClient: QueryClient = new QueryClient();

const component: React.JSX.Element = (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AthletesDashboard />
    </IonApp>
  </QueryClientProvider>
);

describe("AthletesDashboard tests", () => {
  test("should present component with a list of athletes", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: athletes });

    render(component);

    await waitFor(() => {
      expect(screen.getByText("name")).toBeInTheDocument();
      expect(screen.getByText("name2")).toBeInTheDocument();
    });
  });

  test("should present AthleteDetailsModal when plus button is clicked", async () => {
    render(component);

    fireEvent.click(screen.getByTestId("create-modal-button"));

    await waitFor(() => {
      expect(screen.getByTestId("athlete-details-modal")).toBeInTheDocument();
    });
  });
});
