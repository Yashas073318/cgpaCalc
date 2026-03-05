import React, { useMemo, useState } from 'react';
import './app.css';
import { SEMESTER_COUNT } from './constants';
import { calculateCgpaValue, createSgpaErrorFlags, hasInvalidEntries, parseSgpaInput } from './utils';

const App: React.FC = () => {
  const [sgpa_values, setSgpaValues] = useState<Array<number | null>>(Array(SEMESTER_COUNT).fill(null));
  const [cgpa_value, setCgpaValue] = useState<number | null>(null);

  const handleChange = (index: number, value: string) => {
    const parsed_value = parseSgpaInput(value);
    setSgpaValues((previous_values) => {
      const updated_values = [...previous_values];
      updated_values[index] = parsed_value;
      return updated_values;
    });
  };

  const sgpa_error_flags = useMemo(() => createSgpaErrorFlags(sgpa_values), [sgpa_values]);

  const has_missing_entries = sgpa_values.includes(null);
  const has_invalid_entries = hasInvalidEntries(sgpa_error_flags);

  const calculateCgpa = () => {
    if (has_missing_entries || has_invalid_entries) {
      setCgpaValue(null);
      return;
    }

    const calculated_cgpa = calculateCgpaValue(sgpa_values);
    setCgpaValue(calculated_cgpa);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-16 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">CGPA Calculator</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {sgpa_values.map((sgpa_value, index) => (
            <div key={index} className="p-4 border bg-gray-300 border-gray-300 rounded-lg hover:bg-gray-600 transition duration-200">
              <div className="hover:bg-gray-600 hover:text-white">
                <label className="block bold text-gray-1000 mb-2 md:mb-4">
                  Semester {index + 1} SGPA
                </label>
              </div>
              <input
                type="number"
                step="1"
                value={sgpa_value === null ? '' : sgpa_value}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="0"
                className="w-full px-2 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg"
              />
              {sgpa_error_flags[index] && (
                <p className="text-red-500 text-sm mt-2">Please enter a valid SGPA (0-10).</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={calculateCgpa}
          disabled={has_missing_entries || has_invalid_entries}
          className={`w-full bg-blue-500 text-white py-2 md:py-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4 md:mt-8 ${
            has_missing_entries || has_invalid_entries ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Calculate CGPA
        </button>
        {cgpa_value !== null && (
          <div className="mt-4 md:mt-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold">Your CGPA is: {cgpa_value.toFixed(2)}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
