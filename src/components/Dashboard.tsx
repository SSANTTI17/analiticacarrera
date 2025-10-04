import type { Course } from "../types";
import YearSection from "./YearSection";

type Props = {
  courses: Course[];
};

export default function Dashboard({ courses }: Props) {
  const years = Array.from(
    new Set(
      courses.map((c) =>
        c.year === "Electivas" ? "Electivas" : `Año ${c.year}`
      )
    )
  );

  const totalElectiveHours = courses
    .filter((c) => c.year === "Electivas")
    .reduce((s, c) => s + (c.hours || 0), 0);

  return (
    <main>
      <div className="header-row">
        <div className="brand">
          <div className="logo-box">AC</div>
          <div>
            <div className="title">Mi Analítica de Carrera</div>
            <div className="subtitle">Resumen por año y horas de electivas</div>
          </div>
        </div>

        <div className="overview-card">
          <div className="stats">
            <div className="label">Horas electivas acumuladas</div>
            <div className="value">{totalElectiveHours} / 20</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div className="progress-wrap" aria-hidden>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min((totalElectiveHours / 20) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Static version: no add form, no editing */}

      <div className="sections-grid">
        {years
          .sort((a, b) => {
            if (a === "Electivas") return 1;
            if (b === "Electivas") return -1;
            const na = Number(a.replace("Año ", ""));
            const nb = Number(b.replace("Año ", ""));
            return na - nb;
          })
          .map((y) => {
            const coursesForYear = courses.filter((c) =>
              y === "Electivas"
                ? c.year === "Electivas"
                : c.year !== "Electivas" && `Año ${c.year}` === y
            );
            return (
              <div
                key={y}
                className={`card ${y === "Electivas" ? "electivas" : ""}`}
              >
                <YearSection yearLabel={y} courses={coursesForYear} />
              </div>
            );
          })}
      </div>
    </main>
  );
}
