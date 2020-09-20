import { useState } from "react";

export default function (initialState) {
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState({});
  const handleOnChange = function (e) {
    const key = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      const newState = { ...prev };
      newState[key] = value.trim();
      return newState;
    });
  };
  return { form, setForm, formError, setFormError, handleOnChange };
}
