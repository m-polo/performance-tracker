import { IonApp } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import AthleteDeletionModal from "./AthleteDeletionModal";

const queryClient: QueryClient = new QueryClient();

const onDeletion: Mock = vi.fn();
const onDeletionCancelled: Mock = vi.fn();

const component: JSX.Element  = (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AthleteDeletionModal
        onDeletion={onDeletion}
        onDeletionCancelled={onDeletionCancelled}
      />
    </IonApp>
  </QueryClientProvider>
);

describe("AthleteDeletionModal tests", () => {
  beforeEach(() => {
    onDeletion.mockClear();
    onDeletionCancelled.mockClear();
  });

  test("should not fire delete event when discarding deleting", () => {
    render(component);

    const submitButton = screen.getByText("No, keep it");
    fireEvent.click(submitButton);

    expect(onDeletion.mock.calls.length).toBe(0);
    expect(onDeletionCancelled.mock.calls.length).toBe(1);
  });

  test("should fire delete event when confirming deleting", () => {
    render(component);

    const submitButton = screen.getByText("Yes, delete it");
    fireEvent.click(submitButton);

    expect(onDeletionCancelled.mock.calls.length).toBe(0);
    expect(onDeletion.mock.calls.length).toBe(1);
  });
});
