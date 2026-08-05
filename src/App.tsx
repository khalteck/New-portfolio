import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";

interface AppProps {
  staticLocation?: string;
}

export function App({ staticLocation }: AppProps) {
  if (staticLocation) {
    return (
      <MemoryRouter initialEntries={[staticLocation]}>
        <AppShell />
      </MemoryRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
