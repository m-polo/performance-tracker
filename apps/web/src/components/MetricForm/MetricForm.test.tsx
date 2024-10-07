import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { METRIC_TYPES, UNITS } from "../../shared/interfaces";
import MetricForm from "./MetricForm";

const queryClient: QueryClient = new QueryClient();
const formRef: React.RefObject<HTMLFormElement> =
  React.createRef<HTMLFormElement>();

const onMetricCreate: Mock = vi.fn();

const component: JSX.Element = (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <MetricForm formRef={formRef} onMetricCreate={onMetricCreate} />
    </IonApp>
  </QueryClientProvider>
);

describe("MetricForm tests", () => {
  beforeEach(() => {
    onMetricCreate.mockClear();
  });

  test("should show form error when required fields are empty", async () => {
    render(component);

    formRef.current?.dispatchEvent(
      new Event("submit", {
        cancelable: true,
        bubbles: true,
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Metric type must be added")).toBeInTheDocument();
      expect(screen.getByText("Value must be added")).toBeInTheDocument();
      expect(screen.getByText("Unit must be added")).toBeInTheDocument();

      expect(onMetricCreate.mock.calls.length).toBe(0);
    });
  });

  test("should submit form when required fields are filled", async () => {
    render(component);

    const metricType: HTMLElement = screen.getByTestId("value-input");
    const unit: HTMLElement = screen.getByTestId("metric-type-select");
    const value: HTMLElement = screen.getByTestId("unit-select");

    fireEvent.change(metricType, { target: { value: METRIC_TYPES.POWER } });
    fireEvent.change(unit, { target: { value: UNITS.KG } });
    fireEvent.change(value, { target: { value: 2 } });

    formRef.current?.dispatchEvent(
      new Event("submit", {
        cancelable: true,
        bubbles: true,
      })
    );

    await waitFor(() => {
      expect(() => screen.getByText("Metric type must be added")).toThrow();
      expect(() => screen.getByText("Value must be added")).toThrow();
      expect(() => screen.getByText("Unit must be added")).toThrow();
    });
  });
});
