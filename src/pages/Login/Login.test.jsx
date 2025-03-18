import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputDesign from "./Login";

describe("InputDesign Component", () => {
  it("renders the login page correctly", () => {
    render(<InputDesign />);

    // Check for main elements
    expect(screen.getByText("Sendero Naranja")).toBeInTheDocument();
    expect(screen.getByText("Inicia sesión en tu cuenta")).toBeInTheDocument();
    expect(screen.getByText("¿Aún no tienes una cuenta?")).toBeInTheDocument();
    expect(screen.getByText("Registrate gratis")).toBeInTheDocument();

    // Check for form elements
    expect(screen.getByLabelText(/Email Id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText("Inicia sesión")).toBeInTheDocument();

    // Check for social login buttons
    expect(screen.getByText("Usar Google")).toBeInTheDocument();
    expect(screen.getByText("Usar Facebook")).toBeInTheDocument();
  });

  it("has the correct input values", () => {
    render(<InputDesign />);

    const emailInput = screen.getByLabelText(/Email Id/i);
    expect(emailInput.value).toBe("info@unimet.edu.ve");

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    expect(passwordInput.placeholder).toBe("Ingresa tu contraseña");
  });

  it("has the correct image sources", () => {
    render(<InputDesign />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3); // Logo, hiking image, and social icons

    const hikingImage = screen.getByAlt("Hikers on a trail");
    expect(hikingImage).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/41007c487891c9396fd337d8ea04e94832186146",
    );

    const logo = screen.getByAlt("Logo");
    expect(logo).toHaveAttribute(
      "src",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/da593ca05f2b903555358f7595b378924927d53e",
    );
  });

  it("has clickable buttons", async () => {
    const user = userEvent.setup();
    render(<InputDesign />);

    const loginButton = screen.getByText("Inicia sesión");
    expect(loginButton).toBeInTheDocument();

    const googleButton = screen.getByText("Usar Google");
    expect(googleButton).toBeInTheDocument();

    const facebookButton = screen.getByText("Usar Facebook");
    expect(facebookButton).toBeInTheDocument();

    // Test button clicks (no actual functionality in this component)
    await user.click(loginButton);
    await user.click(googleButton);
    await user.click(facebookButton);
  });
});
