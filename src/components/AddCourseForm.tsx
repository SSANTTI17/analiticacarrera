import { useState } from "react";
import type { Course } from "../types";

type Props = {
  onAdd: (c: Course) => void;
};

export default function AddCourseForm({ onAdd }: Props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState<string>("1");
  const [hours, setHours] = useState<string>("0");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const course: Course = {
      id: `c_${Date.now()}`,
      code: code || `NEW${Date.now() % 1000}`,
      name: name || "Nueva materia",
      year: year === "Electivas" ? "Electivas" : Number(year),
      hours: year === "Electivas" ? Number(hours || 0) : undefined,
      grade: null,
      passed: false,
    };
    onAdd(course);
    setCode("");
    setName("");
    setHours("0");
  }

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}
    >
      <input
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="1">Primero</option>
        <option value="2">Segundo</option>
        <option value="3">Tercero</option>
        <option value="4">Cuarto</option>
        <option value="5">Quinto</option>
        <option value="Electivas">Electivas</option>
      </select>
      {year === "Electivas" ? (
        <input
          style={{ width: 80 }}
          type="number"
          min={0}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      ) : null}
      <button type="submit">Agregar</button>
    </form>
  );
}
