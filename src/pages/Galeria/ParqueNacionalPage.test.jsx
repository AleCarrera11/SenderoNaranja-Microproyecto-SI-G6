import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ParqueNacionalPage } from "./ParqueNacionalPage";

describe("ParqueNacionalPage", () => {
  it("renders all main sections", () => {
    render(<ParqueNacionalPage />);

    expect(screen.getByText("GALERÍA DE FOTOS")).toBeInTheDocument();
    expect(screen.getByText("SECCIÓN INFORMATIVA")).toBeInTheDocument();
    expect(screen.getByText("Parque Nacional El Ávila")).toBeInTheDocument();
    expect(
      screen.getByText("Importancia de la conservación"),
    ).toBeInTheDocument();
    expect(screen.getByText("Tips para hacer senderismo")).toBeInTheDocument();
  });

  it("renders all images with correct alt text", () => {
    render(<ParqueNacionalPage />);

    expect(screen.getByAlt("Vista del parque")).toBeInTheDocument();
    expect(screen.getByAlt("Montañas")).toBeInTheDocument();
    expect(screen.getByAlt("Sendero")).toBeInTheDocument();
    expect(screen.getByAlt("Vista panorámica")).toBeInTheDocument();
  });

  it('renders "Ver más..." link', () => {
    render(<ParqueNacionalPage />);
    expect(screen.getByText("Ver más...")).toBeInTheDocument();
  });
});
