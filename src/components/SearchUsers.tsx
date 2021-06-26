import { FormEvent } from "react";
import { useUsersSetters } from "../contexts/Users";
import useForm from "../hooks/useForm";

export default function SearchUsers(): JSX.Element {
  const { form, handleChange, cleanForm } = useForm({ name: "" });
  const { setSearch } = useUsersSetters();

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch?.(form.name);
    cleanForm();
  }

  return (
    <form onSubmit={submitForm}>
      <input name="name" value={form.name} onChange={handleChange} required/>
      <button>Procurar</button>
    </form>
  );
}
