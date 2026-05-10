/* ============================================================
   HELIX — controls.js
   Motion Calculus for Human Emotional Dynamics
   Interactive Controls — Sliders, Presets, Simulation Loop
   Shronda Jeanine & Company | With Purpose on Purpose
   ============================================================ */

'use strict';

const HelixControls = (() => {

  /* ----------------------------------------------------------
     SLIDER CONFIGURATION
     Maps each slider element ID to:
       - param:   the HelixModel parameter name it controls
       - fillId:  the CSS fill bar element ID
       - valId:   the displayed value span element ID
       - min/max: for fill-percentage calculation
  ---------------------------------------------------------- */
  const SLIDER_MAP = [
    /* Initial Conditions */
    {
      sliderId: 'init-trauma',
      param:    'T0',
      fillId:   'fill-init-trauma',
      valId:    'val-init-trauma',
      min: 0, max: 1,
    },
    {
      sliderId: 'init-addiction',
      param:    'A0',
      fillId:   'fill-init-addiction',
      valId:    'val-init-addiction',
      min: 0, max: 1,
    },
    {
      sliderId: 'init-regulation',
      param:    'E0',
      fillId:   'fill-init-regulation',
      valId:    'val-init-regulation',
      min: 0, max: 1,
    },

    /* Intervention Parameters */
    {
      sliderId: 'support-level',
      param:    'support',
      fillId:   'fill-support-level',
      valId:    'val-support-level',
      min: 0, max: 1,
    },
    {
      sliderId: 'healing-rate',
      param:    'theta',
      fillId:   'fill-healing-rate',
      valId:    'val-healing-rate',
      min: 0.05, max: 1,
    },
    {
      sliderId: 'trigger-frequency',
      param:    'omega',
      fillId:   'fill-trigger-frequency',
      valId:    'val-trigger-frequency',
      min: 0.1, max: 2,
    },
    {
      sliderId: 'addiction-strength',
      param:    'gamma',
      fillId:   'fill-addiction-strength',
      valId:    'val-addiction-strength',
      min: 0, max: 1,
    },
  ];

  /* ----------------------------------------------------------
     STATE
     Holds current parameter values gathered from sliders.
  ---------------------------------------------------------- */
  let currentConfig = {};
  let simResult     = null;
  let isRunning     = false;

  /* ----------------------------------------------------------
     READ ALL SLIDERS
     Builds a config object from current slider positions.
  ---------------------------------------------------------- */
  function readSliders() {
    const config = {};
    SLIDER_MAP.forEach(({ sliderId, param }) => {
      const el = document.getElementById(sliderId);
      if (el) config[param] = parseFloat(el.value);
    });
    return config;
  }

  /* ----------------------------------------------------------
     UPDATE FILL BAR + LABEL for a single slider
  ---------------------------------------------------------- */
  function updateSliderUI(entry) {
    const slider = document.getElementById(entry.sliderId);
    const fill   = document.getElementById(entry.fillId);
    const val    = document.getElementById(entry.valId);

    if (!slider) return;

    const v    = parseFloat(slider.value);
    const pct  = ((v - entry.min) / (entry.max - entry.min)) * 100;

    if (fill) fill.style.width = pct.toFixed(1) + '%';
    if (val)  val.textContent  = v.toFixed(2);
  }

  /* ----------------------------------------------------------
     BIND SLIDER EVENTS
  ---------------------------------------------------------- */
  function bindSliders() {
    SLIDER_MAP.forEach(entry => {
      const slider = document.getElementById(entry.sliderId);
      if (!slider) return;

      updateSliderUI(entry);

      slider.addEventListener('input', () => {
        updateSliderUI(entry);
      });
    });
  }

  /* ----------------------------------------------------------
     BIND PRESET BUTTONS
     Injects a preset selector UI below the controls heading
     and wires up each preset to populate sliders.
  ---------------------------------------------------------- */
  function buildPresetUI() {
    const container = document.querySelector('.viz-controls');
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'presets-wrapper';
    wrapper.innerHTML = `
      <h3 class="controls__heading controls__heading--mt">Scenario Presets</h3>
      <div class="presets-grid" role="group" aria-label="Scenario presets"></div>
    `;

    const grid = wrapper.querySelector('.presets-grid');

    Object.entries(HelixModel.PRESETS).forEach(([key, preset]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-btn';
      btn.textContent = preset.label;
      btn.setAttribute('data-preset', key);
      btn.setAttribute('aria-label', `Load preset: ${preset.label}`);

      btn.addEventListener('click', () => {
        applyPreset(key);
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('preset-btn--active'));
        btn.classList.add('preset-btn--active');
      });

      grid.appendChild(btn);
    });

    const actionsEl = container.querySelector('.controls__actions');
    if (actionsEl) {
      container.insertBefore(wrapper, actionsEl);
    } else {
      container.appendChild(wrapper);
    }

    injectPresetStyles();
  }

  function applyPreset(key) {
    const preset = HelixModel.PRESETS[key];
    if (!preset) return;

    const paramToSlider = {};
    SLIDER_MAP.forEach(e => { paramToSlider[e.param] = e; });

    Object.entries(preset).forEach(([param, value]) => {
      if (param === 'label') return;
      const entry = paramToSlider[param];
      if (!entry) return;

      const slider = document.getElementById(entry.sliderId);
      if (!slider) return;

      slider.value = value;
      updateSliderUI(entry);
    });
  }

  function injectPresetStyles() {
    if (document.getElementById('helix-preset-styles')) return;

    const style = document.createElement('style');
    style.id = 'helix-preset-styles';
    style.textContent = `
      .presets-wrapper { margin-top: 0.25rem; }
      .presets-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin-top: 0.5rem;
      }
      .preset-btn {
        background: rgba(124,58,237,0.08);
        border: 1px solid rgba(201,168,76,0.18);
        border-radius: 6px;
        color: #c4bae8;
        font-family: 'Cinzel', serif;
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 0.45rem 0.4rem;
        cursor: pointer;
        transition: all 0.25s ease;
        text-align: center;
        line-height: 1.3;
      }
      .preset-btn:hover {
        background: rgba(201,168,76,0.1);
        border-color: rgba(201,168,76,0.4);
        color: #e0c060;
      }
      .preset-btn--active {
        background: rgba(201,168,76,0.15);
        border-color: #c9a84c;
        color: #c9a84c;
      }
    `;
    document.head.appendChild(style);
  }

  /* ----------------------------------------------------------
     RUN SIMULATION
     Reads sliders -> runs model -> renders charts.
  ---------------------------------------------------------- */
  function runSimulation() {
    if (isRunning) return;
    isRunning = true;

    const runBtn = document.getElementById('btn-run');
    if (runBtn) {
      runBtn.textContent = 'Computing…';
      runBtn.disabled    = true;
    }

    HelixViz.setLoading(true);

    setTimeout(() => {
      try {
        currentConfig = readSliders();
        simResult     = HelixModel.runSimulation(currentConfig);
        HelixViz.render(simResult);
      } catch (err) {
        console.error('[HELIX] Simulation error:', err);
        const statusEl = document.getElementById('chart-status');
        if (statusEl) {
          statusEl.textContent = 'Simulation error — check console for details.';
          statusEl.style.color = '#ef4444';
        }
      } finally {
        isRunning = false;
        if (runBtn) {
          runBtn.textContent = 'Run Simulation';
          runBtn.disabled    = false;
        }
      }
    }, 30);
  }

  /* ----------------------------------------------------------
     RESET
     Restores all sliders to DEFAULTS and clears charts.
  ---------------------------------------------------------- */
  function reset() {
    const defaults = HelixModel.DEFAULTS;

    const paramToSlider = {};
    SLIDER_MAP.forEach(e => { paramToSlider[e.param] = e; });

    SLIDER_MAP.forEach(entry => {
      const slider = document.getElementById(entry.sliderId);
      if (!slider) return;

      const defaultVal = defaults[entry.param];
      if (defaultVal !== undefined) slider.value = defaultVal;
      updateSliderUI(entry);
    });

    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('preset-btn--active'));

    HelixViz.clear();
    simResult = null;
  }

  /* ----------------------------------------------------------
     KEYBOARD SHORTCUTS
     Space = run, R = reset, 1-5 = load presets
  ---------------------------------------------------------- */
  function bindKeyboard() {
    const presetKeys = Object.keys(HelixModel.PRESETS);

    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        runSimulation();
      } else if (e.key === 'r' || e.key === 'R') {
        reset();
      } else if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1;
        const key = presetKeys[idx];
        if (key) {
          applyPreset(key);
          document.querySelectorAll('.preset-btn').forEach((b, i) => {
            b.classList.toggle('preset-btn--active', i === idx);
          });
        }
      }
    });
  }

  /* ----------------------------------------------------------
     FUNCTION CARD HOVER HIGHLIGHT
     Dims non-highlighted datasets on the main chart
     when hovering function cards in the model section.
  ---------------------------------------------------------- */
  function bindFunctionCardHovers() {
    const fnOrder = ['T', 'A', 'E', 'H', 'R'];

    document.querySelectorAll('.function-card[data-fn]').forEach(card => {
      const fn = card.getAttribute('data-fn');

      card.addEventListener('mouseenter', () => {
        highlightDataset(fn, fnOrder);
      });

      card.addEventListener('mouseleave', () => {
        restoreDatasets();
      });
    });
  }

  function highlightDataset(activeFn, order) {
    const chart = HelixViz._mainChartRef ? HelixViz._mainChartRef : null;
    if (!chart || !chart.data.datasets.length) return;

    chart.data.datasets.forEach((ds, i) => {
      const key = order[i];
      ds.borderWidth = (key === activeFn) ? 3 : 0.8;
      ds.borderColor = (key === activeFn)
        ? HelixViz.COLORS[key].line
        : hexToRgba(HelixViz.COLORS[key].line, 0.2);
    });

    chart.update('none');
  }

  function restoreDatasets() {
    const chart = HelixViz._mainChartRef;
    if (!chart || !chart.data.datasets.length) return;

    const fnOrder = ['T', 'A', 'E', 'H', 'R'];
    chart.data.datasets.forEach((ds, i) => {
      const key = fnOrder[i];
      ds.borderWidth = 2;
      ds.borderColor = HelixViz.COLORS[key].line;
    });

    chart.update('none');
  }

  /* ----------------------------------------------------------
     TOOLTIP — narrative overlay
     Appends a small tooltip below the metrics row
     after each simulation run.
  ---------------------------------------------------------- */
  function renderNarrativeTooltip(result) {
    let tooltipEl = document.getElementById('helix-narrative-tooltip');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'helix-narrative-tooltip';
      tooltipEl.style.cssText = `
        margin-top: 0.75rem;
        padding: 1rem 1.25rem;
        background: rgba(15,13,42,0.6);
        border: 1px solid rgba(201,168,76,0.18);
        border-radius: 12px;
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 1rem;
        line-height: 1.7;
        backdrop-filter: blur(12px);
      `;

      const chartArea = document.querySelector('.viz-chart-area');
      if (chartArea) chartArea.appendChild(tooltipEl);
    }

    const summary = HelixModel.Analysis.narrativeSummary(result);
    const peak    = HelixModel.Analysis.peakTrauma(result);
    const crossover = HelixModel.Analysis.healingCrossoverTime(result);

    const colorMap = {
      'Active Recovery':   '#22c55e',
      'Early Recovery':    '#c9a84c',
      'High Resilience':   '#22c55e',
      'High Load State':   '#ef4444',
      'Unresolved Trauma': '#f97316',
      'Complex State':     '#a855f7',
    };
    const stateColor = colorMap[summary.trajectory] || '#c4bae8';

    const crossoverStr = crossover !== null
      ? `Healing exceeded trauma at <strong style="color:#22c55e">t = ${crossover}</strong>.`
      : `Healing did not consistently exceed trauma during this simulation.`;

    tooltipEl.innerHTML = `
      <p style="font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase; color:${stateColor}; margin-bottom:0.5rem;">
        ${summary.trajectory}
      </p>
      <p style="color:#c4bae8; margin-bottom:0.4rem;">${summary.detail}</p>
      <p style="color:#7b72a8; font-size:0.9rem;">
        Peak trauma: <strong style="color:#ef4444; font-family:'JetBrains Mono',monospace">${peak.value.toFixed(2)}</strong> at t&nbsp;=&nbsp;${peak.time}.
        ${crossoverStr}
        Recovery Index: <strong style="color:#c9a84c; font-family:'JetBrains Mono',monospace">${summary.recoveryIndex.toFixed(3)}</strong>.
      </p>
    `;
  }

  /* ----------------------------------------------------------
     SCROLL-TO VISUALIZATION on Run click (if above fold)
  ---------------------------------------------------------- */
  function scrollToViz() {
    const vizSection = document.getElementById('visualization');
    if (!vizSection) return;

    const rect = vizSection.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      vizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ----------------------------------------------------------
     HELPERS
  ---------------------------------------------------------- */
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /* ----------------------------------------------------------
     INIT — entry point, called when DOM is ready
  ---------------------------------------------------------- */
  function init() {
    HelixViz.initMainChart();
    HelixViz.initMiniCharts();

    bindSliders();
    buildPresetUI();
    bindKeyboard();
    bindFunctionCardHovers();

    const runBtn = document.getElementById('btn-run');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        scrollToViz();
        runSimulation();
        setTimeout(() => {
          if (simResult) renderNarrativeTooltip(simResult);
        }, 200);
      });
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        reset();
        const tooltip = document.getElementById('helix-narrative-tooltip');
        if (tooltip) tooltip.remove();
      });
    }

    window.addEventListener('resize', () => {
      HelixViz.handleResize();
    }, { passive: true });

    runSimulation();
    setTimeout(() => {
      if (simResult) renderNarrativeTooltip(simResult);
    }, 300);
  }

  /* ----------------------------------------------------------
     BOOT
     Wait for DOM, then initialize.
  ---------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */
  return {
    init,
    runSimulation,
    reset,
    applyPreset,
    getCurrentResult: () => simResult,
    getCurrentConfig: () => currentConfig,
  };

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelixControls;
}
