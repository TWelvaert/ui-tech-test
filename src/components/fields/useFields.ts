
import {create} from 'zustand';

export type Submit = {
  type: 'submit';
  text: string;
  id: string;
  label?: never;
  placeholder?: never;
};

export type Input = {
  type: 'text' | 'date' | 'number';
  text?: never;
  placeholder: string;
  id: string;
  label: string | null;
};

export type Combobox = {
  type: 'country';
  text?: never;
  id: string;
  label: string | null;
  placeholder: string;
};

export type Field = Input | Submit | Combobox;

type State = {
  fields: Field[];
  handleFieldUpdate: (fieldId: string) => void;
};

let idCounter = 1;

const useFieldsStore = create<State>((set) => ({
  fields: [
    { type: 'text', placeholder: 'Name', label: null, id: (idCounter++).toString() },
    { type: 'number', placeholder: 'Age', label: null, id: (idCounter++).toString() },
    { type: 'date', placeholder: 'Date of Birth', label: null, id: (idCounter++).toString() },
    { type: 'country', placeholder: 'Country', label: null, id: (idCounter++).toString() },
    { type: 'submit', text: 'submit', id: (idCounter++).toString() },
  ],
  handleFieldUpdate: (fieldId) => {
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === fieldId ? { ...field, label: fieldId } : field
      ),
    }));
  },
}));

function useFields() {
  const fields = useFieldsStore((state) => state.fields);
  const handleFieldUpdate = useFieldsStore((state) => state.handleFieldUpdate);

  return { fields, handleFieldUpdate };
}

export default useFields;