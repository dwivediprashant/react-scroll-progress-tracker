import { useEffect, useState } from "react";

import "./ScrollIndicator.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "64%",
  rotation: -90,
  circumference: 360,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  animation: {
    duration: 500,
    easing: "easeOutQuart",
  },
};

function getScrollProgress() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop || 0;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;

  if (scrollHeight <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
}

export function ScrollIndicator({
  size = 100,
  color = "#00ff00",
  trackColor = "rgba(198, 228, 129, 0.42)",
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => setProgress(getScrollProgress());

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const chartData = {
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [color, trackColor],
        hoverOffset: 0,
        spacing: 2,
      },
    ],
  };

  const roundedProgress = Math.round(progress);
  const trackerStyle = {
    "--tracker-size": `${size}px`,
  };

  if (typeof document === "undefined") {
    return null;
  }

  return (
    <aside className="scroll-progress-card" style={trackerStyle}>
      <div
        className="chart-wrap"
        aria-label={`Page scrolled ${roundedProgress} percent`}
      >
        <Doughnut data={chartData} options={chartOptions} />
        <div className="chart-center">
          <span>{roundedProgress}%</span>
        </div>
      </div>
    </aside>
  );
}
