import type { Course } from "../types";

type Props = {
  yearLabel: string;
  courses: Course[];
};

export default function YearSection({ yearLabel, courses }: Props) {
  const isElectivas = yearLabel === "Electivas";

  const totalHours = isElectivas
    ? courses.reduce((s, c) => s + (c.hours || 0), 0)
    : 0;

  const avgGrade =
    courses.filter((c) => typeof c.grade === "number").length > 0
      ? (
          courses
            .filter((c) => typeof c.grade === "number")
            .reduce((s, c) => s + (c.grade || 0), 0) /
          courses.filter((c) => typeof c.grade === "number").length
        ).toFixed(2)
      : "N/A";

  return (
    <section className="year-section">
      <div className="year-header">
        <h3>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 8 }}
          >
            <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#g)" />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#0ea5a4" />
              </linearGradient>
            </defs>
          </svg>
          {yearLabel}
        </h3>
        {isElectivas ? (
          <div className="electivas-right">
            <div className="year-stats">
              <span className="year-stats-label">Horas: {totalHours} / 20</span>
            </div>
            <div className="progress-container">
              <div className="progress-wrap" aria-hidden>
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min((totalHours / 20) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="year-stats">
        <span>Promedio: {avgGrade}</span>
      </div>

      <table className="courses-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Materia</th>
            {isElectivas ? <th>Horas</th> : null}
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td style={{ width: 90 }}>
                <span className="code-with-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#1f2937" />
                  </svg>
                  {c.code}
                </span>
              </td>
              <td>{c.name}</td>
              {isElectivas ? (
                <td style={{ width: 64 }}>{c.hours ?? "-"}</td>
              ) : null}
              <td style={{ width: 64 }}>
                {typeof c.grade === "number" ? c.grade : "-"}
              </td>
              <td style={{ width: 140 }}>
                {(() => {
                  /*
                    // Determinar estado base
                    let statusClass = "no-puede-cursar";
                    let statusLabel = "No puede cursar";

                    // Condiciones de cambio (ajustá según tu lógica)
                    if (c.cumpleCorrelativas) {
                        statusClass = "puede-cursar";
                        statusLabel = "Puede cursar";
                    }

                    if (c.cursando) {
                        statusClass = "cursando";
                        statusLabel = "Cursando";
                    }

                    if (c.regular) {
                        statusClass = "regular";
                        statusLabel = "Regular";
                    }

                    if (c.promocionado) {
                        statusClass = "promocionado";
                        statusLabel = "Promocionado";
                    }

                    if (c.aprobado) {
                        statusClass = "aprobado";
                        statusLabel = "Aprobado";
                    }

                    return <span className={`badge ${statusClass}`}>{statusLabel}</span>;


                    */

                  // Normalize status class and label
                  const hasStatus =
                    typeof c.status === "string" && c.status.trim().length > 0;
                  const statusClass = hasStatus
                    ? c.status!.toLowerCase().replace(/\s+/g, "-")
                    : c.passed
                    ? "aprobado"
                    : "failed";

                  const rawLabel = hasStatus
                    ? c.status!
                    : c.passed
                    ? "Aprobado"
                    : "No aprobada";
                  const statusLabel = rawLabel
                    .replace(/-/g, " ")
                    .split(" ")
                    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
                    .join(" ");

                  return (
                    <span className={`badge ${statusClass}`}>
                      {statusLabel}
                    </span>
                  );
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
