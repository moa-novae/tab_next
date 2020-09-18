import { useState } from "react";

export default function (initialState) {
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState({});
  
}
