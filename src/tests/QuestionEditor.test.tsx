import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { QuestionEditor } from "../components/survey/QuestionEditor";

describe("QuestionEditor", () => {
  it("convierte tildes y comas en options para MULTIPLE", async () => {
    const onAdd = vi.fn();
    render(<QuestionEditor onAdd={onAdd} />);

    await userEvent.type(screen.getByPlaceholderText("Pregunta"), "¿Color?");
    await userEvent.selectOptions(screen.getByRole("combobox"), "MULTIPLE");
    await userEvent.type(screen.getByPlaceholderText("opcion1,opcion2,opcion3"), "rojo, azul, verde");
    await userEvent.click(screen.getByRole("button", { name: "Agregar pregunta" }));

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({
      type: "MULTIPLE",
      options: ["rojo", "azul", "verde"],
    }));
  });
});
