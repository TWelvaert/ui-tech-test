
import InputField from "../../components/fields/InputField";
import ButtonField from "../../components/fields/SubmitField";
import Label from "../../components/fields/Label";
import useFields, { Submit, Input } from "../../components/fields/useFields";
import FieldWrapper from "../../components/fields/FieldWrapper";
import { Form } from "react-router-dom";
import { useMode } from "../../components/ModeSwitch";
import ModeSwitch from "../../components/ModeSwitch/ModeSwitch";
import Aside from "../../components/Aside";

export default function Designer() {
  const { fields } = useFields();
  const [mode] = useMode(); // Use the useMode hook to get the current mode

  return (
    <div className="h-screen w-screen flex items-stretch">
      <main className="max-w-xl mx-auto mt-10 grow">
        <div className="flex justify-between">
          <h1 className="text-xl">Mini form builder</h1>
          <ModeSwitch />
        </div>
        <Form method="POST" action="/response" className="mt-10">
          {/* Render the fields based on their type */}
          {fields.map((f) => {
            switch (f.type) {
              case "date":
              case "number":
              case "text":
                return (
                  <FieldWrapper id={f.id} key={f.id}>
                    <Label defaultValue={f.label} />
                    <InputField {...f as Input} />
                  </FieldWrapper>
                );
              case "submit":
                return (
                  <FieldWrapper id={f.id} key={f.id} className="mt-4">
                    <ButtonField {...f as Submit} />
                  </FieldWrapper>
                );
              default:
                return null;
            }
          })}
          {/* Add a new field */}
          {mode === "edit" && (
            <fieldset className="mt-4 rounded p-1 ml-12">
              <legend className="text-sm text-gray-400 uppercase font-medium">
                Add Field
              </legend>
              <div className="mt-1 grid grid-cols-3 gap-1">
                <button
                  type="button"
                  className="block px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded"
                >
                  Submit Button
                </button>
                <button
                  type="button"
                  className="block px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded"
                >
                  Text Field
                </button>
                <button
                  type="button"
                  className="block px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded"
                >
                  Date Field
                </button>
                <button
                  type="button"
                  className="block px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded"
                >
                  Number Field
                </button>
              </div>
            </fieldset>
          )}
        </Form>
      </main>
      <Aside />
    </div>
  );
}


