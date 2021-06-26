import { ChangeEvent, useState } from "react";

type Return<F = unknown> = {
  form: F,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  cleanForm: () => void
}

export default function useForm<I = unknown>(initialValues: I): Return<I> {
  const [ form, setForm ] = useState(initialValues);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  function cleanForm() {
    setForm(initialValues);
  }

  return {
    form,
    handleChange,
    cleanForm
  };
}
