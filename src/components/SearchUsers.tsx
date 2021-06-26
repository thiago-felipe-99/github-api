import { FormEvent } from "react";
import useForm from "../hooks/useForm";

export default function SearchUsers(): JSX.Element {
  const { form, handleChange, cleanForm } = useForm({ name: "" });

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);
    cleanForm();
  }

  return (
    <form onSubmit={submitForm}>
      <input name="name" value={form.name} onChange={handleChange} required/>
      <button>Procurar</button>
    </form>
  );
}
