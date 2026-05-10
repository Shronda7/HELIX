/* ============================================================
   HELIX — visualization.js
   Motion Calculus for Human Emotional Dynamics
   Chart.js Rendering Layer — Main Chart + Mini Charts
   Shronda Jeanine & Company | With Purpose on Purpose
   ============================================================ */

'use strict';

const HelixViz = (() => {

  /* ----------------------------------------------------------
     PALETTE
     Matches helix.css function colors exactly.
  ---------------------------------------------------------- */
  const COLORS = {
    T: { line: '#ef4444', fill: 'rgba(239,68,68,0.08)',   label: 'T(t) — Trauma'      },
    A: { line: '#f97316', fill: 'rgba(249,115,22,0.08)',  label: 'A(t) — Addiction'   },
    E: { line: '#a855f7', fill: 'rgba(168,85,247,0.08)',  label: 'E(t) — Regulation'  },
    H: { line: '#22c55e', fill: 'rgba(34,197,94,0.08)',   label: 'H(t) — Healing'     },
    R: { line: '#c9a84c', fill: 'rgba(201,168,76,0.08)',  label: 'R(t) — Resilience'  },
  };

  /* ----------------------------------------------------------
     SHARED CHART.JS DEFAULTS
  ---------------------------------------------------------- */
  const CHART_FONT = "'JetBrains Mono', 'Courier New', monospace";

  function baseChartOptions(opts = {}) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: opts.animDuration ?? 900,
        easing: 'easeInOutQuart',
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: opts.showLegend ?? true,
          position: 'top',
          labels: {
            color: '#c4bae8',
            font: { family: CHART_FONT, size: 11 },
            boxWidth: 10,
            boxHeight: 10,
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          backgroundColor: 'rgba(15,13,42,0.92)',
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          titleColor: '#c9a84c',
          bodyColor: '#c4bae8',
          titleFont: { family: CHART_FONT, size: 11 },
          bodyFont: { family: CHART_FONT, size: 11 },
          padding: 12,
          displayColors: true,
          callbacks: {
            title: (items) => `t = ${parseFloat(items[0].label).toFixed(1)}`,
            label: (item) => {
              const v = parseFloat(item.raw).toFixed(3);
              return ` ${item.dataset.label}: ${v}`;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          title: {
            display: opts.showAxisLabels ?? true,
            text: 'Time (t)',
            color: '#7b72a8',
            font: { family: CHART_FONT, size: 10 },
          },
          ticks: {
            color: '#7b72a8',
            font: { family: CHART_FONT, size: 10 },
            maxTicksLimit: 8,
            callback: (v) => v.toFixed(0),
          },
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false,
          },
          border: { display: false },
        },
        y: {
          title: {
            display: opts.showAxisLabels ?? true,
            text: 'Magnitude',
            color: '#7b72a8',
            font: { family: CHART_FONT, size: 10 },
          },
          ticks: {
            color: '#7b72a8',
            font: { family: CHART_FONT, size: 10 },
            maxTicksLimit: 6,
            callback: (v) => v.toFixed(2),
          },
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false,
          },
          border: { display: false },
          suggestedMin: -0.1,
          suggestedMax:  1.1,
        },
      },
    };
  }

  function makeDataset(key, xData, yData, opts = {}) {
    const c = COLORS[key];
    return {
      label: c.label,
      data: xData.map((x, i) => ({ x, y: yData[i] })),
      borderColor: c.line,
      backgroundColor: c.fill,
      borderWidth: opts.borderWidth ?? 2,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: c.line,
      fill: opts.fill ?? false,
      tension: 0.35,
      parsing: false,
    };
  }

  /* ----------------------------------------------------------
     CHART INSTANCES (module-level references for updates)
  ---------------------------------------------------------- */
  let mainChart    = null;
  const miniCharts = {};

  /* ----------------------------------------------------------
     INIT MAIN CHART
     Called once on page load with empty data.
     Returns the Chart.js instance.
  ---------------------------------------------------------- */
  function initMainChart() {
    const canvas = document.getElementById('helix-main-chart');
    if (!canvas) return null;

    if (mainChart) {
      mainChart.destroy();
      mainChart = null;
    }

    const ctx = canvas.getContext('2d');

    mainChart = new Chart(ctx, {
      type: 'line',
      data: { datasets: [] },
      options: {
        ...baseChartOptions({ showLegend: true, showAxisLabels: true }),
        plugins: {
          ...baseChartOptions().plugins,
          annotation: {},
        },
      },
    });

    return mainChart;
  }

  /* ----------------------------------------------------------
     INIT MINI CHARTS
     One per function: trauma, addiction, regulation, healing, resilience.
  ---------------------------------------------------------- */
  function initMiniCharts() {
    const miniDefs = [
      { id: 'chart-trauma',     key: 'T' },
      { id: 'chart-addiction',  key: 'A' },
      { id: 'chart-regulation', key: 'E' },
      { id: 'chart-healing',    key: 'H' },
      { id: 'chart-resilience', key: 'R' },
    ];

    miniDefs.forEach(({ id, key }) => {
      const canvas = document.getElementById(id);
      if (!canvas) return;

      if (miniCharts[key]) {
        miniCharts[key].destroy();
        delete miniCharts[key];
      }

      const ctx = canvas.getContext('2d');
      const c   = COLORS[key];

      miniCharts[key] = new Chart(ctx, {
        type: 'line',
        data: { datasets: [] },
        options: {
          ...baseChartOptions({
            showLegend: false,
            showAxisLabels: false,
            animDuration: 600,
          }),
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          scales: {
            x: {
              type: 'linear',
              display: false,
              parsing: false,
            },
            y: {
              display: false,
              suggestedMin: -0.1,
              suggestedMax:  1.1,
            },
          },
          elements: {
            line: {
              borderColor: c.line,
              borderWidth: 1.5,
            },
          },
        },
      });
    });
  }

  /* ----------------------------------------------------------
     RENDER — update charts with new simulation result.
     Called by controls.js after each runSimulation().
  ---------------------------------------------------------- */
  function render(result) {
    if (!result || !result.t) return;

    const sampled = HelixModel.downsample(result, 200);
    const { t, T, A, E, H, R } = sampled;

    /* -- Main chart -- */
    if (mainChart) {
      mainChart.data.datasets = [
        makeDataset('T', t, T, { fill: false }),
        makeDataset('A', t, A, { fill: false }),
        makeDataset('E', t, E, { fill: false }),
        makeDataset('H', t, H, { fill: false }),
        makeDataset('R', t, R, { fill: false }),
      ];
      mainChart.update('active');
    }

    /* -- Mini charts -- */
    const miniData = { T, A, E, H, R };
    Object.entries(miniCharts).forEach(([key, chart]) => {
      chart.data.datasets = [
        makeDataset(key, t, miniData[key], {
          borderWidth: 1.5,
          fill: {
            target: 'origin',
            above: COLORS[key].fill,
          },
        }),
      ];
      chart.update('active');
    });

    /* -- Metrics row -- */
    renderMetrics(result);

    /* -- Narrative status -- */
    renderNarrative(result);
  }

  /* ----------------------------------------------------------
     RENDER METRICS
     Populates the five outcome metric cards.
  ---------------------------------------------------------- */
  function renderMetrics(result) {
    const fin = HelixModel.Analysis.finalValues(result);

    const map = {
      'm-trauma':     fin.T,
      'm-addiction':  fin.A,
      'm-regulation': fin.E,
      'm-healing':    fin.H,
      'm-resilience': fin.R,
    };

    Object.entries(map).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;

      const formatted = value.toFixed(2);
      el.textContent  = formatted;

      el.style.color = metricColor(id, value);
    });
  }

  function metricColor(id, value) {
    if (id === 'm-trauma'    || id === 'm-addiction')  {
      if (value > 0.6) return '#ef4444';
      if (value > 0.35) return '#f97316';
      return '#22c55e';
    }
    if (id === 'm-regulation' || id === 'm-healing' || id === 'm-resilience') {
      if (value > 0.6) return '#22c55e';
      if (value > 0.35) return '#c9a84c';
      return '#ef4444';
    }
    return '#c9a84c';
  }

  /* ----------------------------------------------------------
     RENDER NARRATIVE
     Updates the chart subtitle with the system state summary.
  ---------------------------------------------------------- */
  function renderNarrative(result) {
    const statusEl = document.getElementById('chart-status');
    if (!statusEl) return;

    const summary = HelixModel.Analysis.narrativeSummary(result);
    statusEl.textContent = `${summary.trajectory} — RI: ${summary.recoveryIndex.toFixed(2)}`;

    const colorMap = {
      'Active Recovery':   '#22c55e',
      'Early Recovery':    '#c9a84c',
      'High Resilience':   '#22c55e',
      'High Load State':   '#ef4444',
      'Unresolved Trauma': '#f97316',
      'Complex State':     '#a855f7',
    };
    statusEl.style.color = colorMap[summary.trajectory] || '#c4bae8';
  }

  /* ----------------------------------------------------------
     LOADING STATE
     Shown while simulation is computing.
  ---------------------------------------------------------- */
  function setLoading(isLoading) {
    const statusEl = document.getElementById('chart-status');
    if (!statusEl) return;

    if (isLoading) {
      statusEl.textContent = 'Computing trajectories…';
      statusEl.style.color = '#7b72a8';
    }
  }

  /* ----------------------------------------------------------
     CLEAR CHARTS
     Resets all charts to empty state.
  ---------------------------------------------------------- */
  function clear() {
    if (mainChart) {
      mainChart.data.datasets = [];
      mainChart.update();
    }

    Object.values(miniCharts).forEach(chart => {
      chart.data.datasets = [];
      chart.update();
    });

    const metricIds = ['m-trauma','m-addiction','m-regulation','m-healing','m-resilience'];
    metricIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = '\u2014';
        el.style.color = '';
      }
    });

    const statusEl = document.getElementById('chart-status');
    if (statusEl) {
      statusEl.textContent = 'Configure parameters and run the simulation';
      statusEl.style.color = '';
    }
  }

  /* ----------------------------------------------------------
     RESIZE HANDLER
     Chart.js handles most of this, but we force a resize event
     on container layout changes.
  ---------------------------------------------------------- */
  function handleResize() {
    if (mainChart) mainChart.resize();
    Object.values(miniCharts).forEach(c => c.resize());
  }

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */
  return {
    initMainChart,
    initMiniCharts,
    render,
    setLoading,
    clear,
    handleResize,
    COLORS,
  };

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelixViz;
}
