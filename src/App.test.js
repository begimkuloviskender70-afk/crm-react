import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders CRM layout", () => {
  render(
    <MemoryRouter initialEntries={["/add"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { level: 1, name: /Mini CRM/i })
  ).toBeInTheDocument();
});
