export default function WavyEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;

  // fixed number of waves
  const amplitude = 10;
  const frequency = 40;

  // Build smooth sine wave path
  const points = [];
  for (let i = 0; i <= frequency; i++) {
    const t = i / frequency;
    const x = sourceX + dx * t;
    const y =
      sourceY +
      dy * t +
      Math.sin(t * Math.PI * 2) * amplitude; // 6 = number of waves

    points.push(`${x},${y}` as unknown as never);
  }

  const path = `M${points.join(" L")}`;

  return (
    <svg className="absolute overflow-visible pointer-events-none">
      <path
        d={path}
        className="reactflow-wave"
        fill="none"
        stroke="#6366f1"
        strokeWidth={2}
      />
    </svg>
  );
}
