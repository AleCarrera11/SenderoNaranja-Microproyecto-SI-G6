import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm", () => {
  it("renders the form with all required elements", () => {
    render(<RegistrationForm />);

    // Check for main title
    expect(screen.getByText("Registra tu cuenta")).toBeInTheDocument();

    // Check for input fields
    expect(
      screen.getByPlaceholderText("Ingresa tu nombre..."),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingresa tu apellido..."),
    ).toBeInTheDocument();

    // Check for registration type buttons
    expect(screen.getByText("Estudiante")).toBeInTheDocument();
    expect(screen.getByText("Guía")).toBeInTheDocument();

    // Check for social login buttons
    expect(screen.getByText("Usar Google")).toBeInTheDocument();
    expect(screen.getByText("Usar Facebook")).toBeInTheDocument();
  });

  it("renders the logo image", () => {
    render(<RegistrationForm />);
    const logo = screen.getByAltText("Sendero Naranja Logo");
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe("IMG");
  });

  it("renders all form input fields with correct types", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText("Email (institucional):")).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByLabelText("Número de teléfono:")).toHaveAttribute(
      "type",
      "tel",
    );
    expect(screen.getByLabelText("Contraseña:")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByLabelText("Confirma tu contraseña:")).toHaveAttribute(
      "type",
      "password",
    );
  });
});
