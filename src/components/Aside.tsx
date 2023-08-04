import React, { useState, useEffect } from 'react';
import { useSelection } from './SelectionManager';
import useFields, { Field } from './fields/useFields';

function Aside() {
  const [selectedId, selectField] = useSelection();
  const [editedField, setEditedField] = useState<Field | null>(null);
  const { fields } = useFields(); // Access the fields data from the useFields hook

  // Function to handle form submission when the user makes changes to the field properties
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    if (editedField) {
      // Here, you can call the onSubmit handler to handle field updates.
      // For now, we'll just log the editedField object to the console.
      console.log('Edited Field:', editedField);
    }
  };

  // Function to handle changes to the field properties in the form
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedField) {
      const { name, value } = event.target;
      setEditedField((prevField) => ({
        ...prevField,
        [name]: value,
      }));
    }
  };

  // When the selected field changes, update the editedField to the selected field
  useEffect(() => {
    // Access the selected field data based on selectedId and set it to editedField
    if (selectedId) {
      const selectedField = fields.find((field) => field.id === selectedId);
      setEditedField(selectedField || null);
    } else {
      setEditedField(null); // No field selected, reset editedField
    }
  }, [selectedId, fields]);

  return (
    <aside className='h-full border-l border-gray-200 w-1/6 px-4 py-10'>
      <h3 className='text-lg border-b border-gray-100'>Properties</h3>
      <div className='mt-2' />
      <form onSubmit={handleFormSubmit}>
        {/* Display the form based on the selected field */}
        {editedField && (
          <>
            <label htmlFor='type'>Type:</label>
            <input
              type='text'
              name='type'
              value={editedField.type}
              onChange={handleFieldChange}
            />
            <label htmlFor='label'>Label:</label>
            <input
              type='text'
              name='label'
              value={editedField.label}
              onChange={handleFieldChange}
            />
            <label htmlFor='placeholder'>Placeholder:</label>
            <input
              type='text'
              name='placeholder'
              value={editedField.placeholder}
              onChange={handleFieldChange}
            />
          </>
        )}
        {/* Use input fields or other form elements to allow editing */}
        <button type='submit'>Save</button>
      </form>
    </aside>
  );
}

export default Aside;
