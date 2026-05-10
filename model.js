/* ============================================================
   HELIX — model.js
   Motion Calculus for Human Emotional Dynamics
   ODE Solver: 4th-Order Runge-Kutta Integration
   Shronda Jeanine & Company | With Purpose on Purpose
   ============================================================ */

'use strict';

const HelixModel = (() => {

  /* ----------------------------------------------------------
     DEFAULT PARAMETERS
     All values are dimensionless [0..1] except where noted.
     Each can be overridden via runSimulation(config).
  ---------------------------------------------------------- */
  const DEFAULTS = {
    /* --- Initial Conditions --- */
    T0: 0.80,   // Trauma intensity at t=0
    A0: 0.50,   // Addiction state at t=0
    E0: 0.30,   // Emotional regulation at t=0
    H0: 0.10,   // Healing trajectory at t=0
    R0: 0.20,   // Dynamic resilience at t=0

    /* --- Trauma parameters --- */
    alpha:  0.10,   // Trauma decay rate (healing suppresses trauma)
    beta:   0.20,   // Trigger amplitude (cyclic resurgence intensity)
    omega:  0.50,   // Trigger frequency (how often triggers occur)

    /* --- Addiction parameters --- */
    gamma:  0.30,   // Addiction self-reinforcement rate
    A_max:  1.00,   // Addiction carrying capacity (ceiling)
    delta:  0.40,   // Regulation's suppression of addiction

    /* --- Regulation parameters --- */
    epsilon: 0.50,  // Healing-to-regulation gain
    zeta:    0.30,  // Trauma erosion of regulation
    eta:     0.20,  // Addiction erosion of regulation

    /* --- Healing parameters --- */
    support: 0.70,  // External support level (primary intervention lever)
    theta:   0.40,  // Healing rate toward support equilibrium
    iota:    0.30,  // Regulation-to-healing gain

    /* --- Resilience parameters --- */
    kappa:   0.50,  // Resilience sensitivity to system balance

    /* --- Solver settings --- */
    t_start:  0,
    t_end:   40,    // Simulation duration (time units)
    dt:       0.1,  // Step size — smaller = more accurate, slower
  };

  /* ----------------------------------------------------------
     GOVERNING EQUATIONS (coupled ODEs)

     dT/dt = -alpha * T * H  +  beta * sin(omega * t)
     dA/dt =  gamma * A * (1 - A/A_max)  -  delta * E
     dE/dt =  epsilon * H  -  zeta * T  -  eta * A
     dH/dt =  theta * (support - H)  +  iota * E
     dR/dt =  kappa * (E + H - T - A)
  ---------------------------------------------------------- */
  function derivatives(t, state, p) {
    const { T, A, E, H, R } = state;

    const dT = -p.alpha * T * H  +  p.beta * Math.sin(p.omega * t);
    const dA =  p.gamma * A * (1 - A / p.A_max)  -  p.delta * E;
    const dE =  p.epsilon * H  -  p.zeta * T  -  p.eta * A;
    const dH =  p.theta * (p.support - H)  +  p.iota * E;
    const dR =  p.kappa * (E + H - T - A);

    return { dT, dA, dE, dH, dR };
  }

  /* ----------------------------------------------------------
     RK4 — ONE STEP
     Classic 4th-order Runge-Kutta integration step.
     Provides O(h^4) local truncation error — far more accurate
     than Euler for coupled nonlinear systems.
  ---------------------------------------------------------- */
  function rk4Step(t, state, dt, p) {
    const clamp = (v) => Math.max(-2, Math.min(2, v));

    function addScaled(s, d, h) {
      return {
        T: s.T + h * d.dT,
        A: s.A + h * d.dA,
        E: s.E + h * d.dE,
        H: s.H + h * d.dH,
        R: s.R + h * d.dR,
      };
    }

    const k1 = derivatives(t,          state,                   p);
    const k2 = derivatives(t + dt/2,   addScaled(state, k1, dt/2), p);
    const k3 = derivatives(t + dt/2,   addScaled(state, k2, dt/2), p);
    const k4 = derivatives(t + dt,     addScaled(state, k3, dt),   p);

    return {
      T: clamp(state.T + (dt/6) * (k1.dT + 2*k2.dT + 2*k3.dT + k4.dT)),
      A: clamp(state.A + (dt/6) * (k1.dA + 2*k2.dA + 2*k3.dA + k4.dA)),
      E: clamp(state.E + (dt/6) * (k1.dE + 2*k2.dE + 2*k3.dE + k4.dE)),
      H: clamp(state.H + (dt/6) * (k1.dH + 2*k2.dH + 2*k3.dH + k4.dH)),
      R: clamp(state.R + (dt/6) * (k1.dR + 2*k2.dR + 2*k3.dR + k4.dR)),
    };
  }

  /* ----------------------------------------------------------
     RUN SIMULATION
     Integrates the system from t_start to t_end.

     Returns:
       {
         t:    [t0, t1, t2, ...],     // time axis
         T:    [T(t0), T(t1), ...],
         A:    [...],
         E:    [...],
         H:    [...],
         R:    [...],
         meta: { finalState, params, steps }
       }
  ---------------------------------------------------------- */
  function runSimulation(userConfig = {}) {
    const p = Object.assign({}, DEFAULTS, userConfig);

    let state = {
      T: clampInit(p.T0),
      A: clampInit(p.A0),
      E: clampInit(p.E0),
      H: clampInit(p.H0),
      R: clampInit(p.R0),
    };

    const result = {
      t: [], T: [], A: [], E: [], H: [], R: [],
    };

    let t = p.t_start;
    const steps = Math.round((p.t_end - p.t_start) / p.dt);

    for (let i = 0; i <= steps; i++) {
      result.t.push(parseFloat(t.toFixed(3)));
      result.T.push(parseFloat(state.T.toFixed(4)));
      result.A.push(parseFloat(state.A.toFixed(4)));
      result.E.push(parseFloat(state.E.toFixed(4)));
      result.H.push(parseFloat(state.H.toFixed(4)));
      result.R.push(parseFloat(state.R.toFixed(4)));

      state = rk4Step(t, state, p.dt, p);
      t += p.dt;
    }

    result.meta = {
      finalState: { ...state },
      params: { ...p },
      steps,
    };

    return result;
  }

  /* ----------------------------------------------------------
     ANALYSIS HELPERS
     Derived metrics computed on a completed simulation result.
  ---------------------------------------------------------- */
  const Analysis = {

    /* Final values of all five functions */
    finalValues(result) {
      const last = result.t.length - 1;
      return {
        T: result.T[last],
        A: result.A[last],
        E: result.E[last],
        H: result.H[last],
        R: result.R[last],
      };
    },

    /* Peak trauma value and the time it occurred */
    peakTrauma(result) {
      let max = -Infinity, time = 0;
      result.T.forEach((v, i) => {
        if (v > max) { max = v; time = result.t[i]; }
      });
      return { value: parseFloat(max.toFixed(3)), time: parseFloat(time.toFixed(2)) };
    },

    /* First time healing H(t) exceeds trauma T(t) and stays above for 5+ steps */
    healingCrossoverTime(result) {
      const streak = 5;
      let count = 0;
      for (let i = 0; i < result.t.length; i++) {
        if (result.H[i] > result.T[i]) {
          count++;
          if (count >= streak) {
            return parseFloat(result.t[i - streak + 1].toFixed(2));
          }
        } else {
          count = 0;
        }
      }
      return null;
    },

    /* System balance score at each time step (H + E - T - A) */
    balanceSeries(result) {
      return result.t.map((_, i) =>
        parseFloat((result.H[i] + result.E[i] - result.T[i] - result.A[i]).toFixed(4))
      );
    },

    /* Overall recovery index: area under H(t) minus area under T(t), normalized */
    recoveryIndex(result) {
      let sum = 0;
      const n = result.t.length;
      for (let i = 0; i < n; i++) {
        sum += (result.H[i] - result.T[i]);
      }
      return parseFloat((sum / n).toFixed(3));
    },

    /* Whether the system is trending toward recovery at end of simulation */
    isRecovering(result) {
      const fin = this.finalValues(result);
      return (fin.H > fin.T) && (fin.E > 0.4) && (fin.R > 0);
    },

    /* Narrative summary of the final system state */
    narrativeSummary(result) {
      const fin = this.finalValues(result);
      const recovering = this.isRecovering(result);
      const ri = this.recoveryIndex(result);

      let trajectory, detail;

      if (recovering && ri > 0.15) {
        trajectory = 'Active Recovery';
        detail = 'Healing is outpacing trauma. Regulation capacity is building. The system is moving toward resilience.';
      } else if (recovering && ri > 0) {
        trajectory = 'Early Recovery';
        detail = 'Healing has begun to exceed trauma, but the system remains fragile. Sustained support is critical.';
      } else if (fin.T > 0.6 && fin.A > 0.5) {
        trajectory = 'High Load State';
        detail = 'Trauma and addiction are both elevated and mutually reinforcing. Significant intervention is needed.';
      } else if (fin.T > fin.H) {
        trajectory = 'Unresolved Trauma';
        detail = 'Trauma remains dominant. Healing is present but insufficient to shift the system balance.';
      } else {
        trajectory = 'Complex State';
        detail = 'The system is in tension between competing dynamics. Outcomes remain sensitive to intervention levels.';
      }

      return {
        trajectory,
        detail,
        recoveryIndex: ri,
        finalValues: fin,
      };
    },
  };

  /* ----------------------------------------------------------
     SCENARIO PRESETS
     Common clinical scenarios for quick exploration.
  ---------------------------------------------------------- */
  const PRESETS = {
    crisis: {
      label: 'Crisis State',
      T0: 0.95, A0: 0.80, E0: 0.10, H0: 0.05, R0: 0.05,
      support: 0.20, theta: 0.20, gamma: 0.60, beta: 0.40,
    },
    earlyRecovery: {
      label: 'Early Recovery',
      T0: 0.70, A0: 0.40, E0: 0.35, H0: 0.25, R0: 0.20,
      support: 0.60, theta: 0.40, gamma: 0.30, beta: 0.20,
    },
    activeHealing: {
      label: 'Active Healing',
      T0: 0.50, A0: 0.20, E0: 0.55, H0: 0.50, R0: 0.45,
      support: 0.80, theta: 0.55, gamma: 0.15, beta: 0.15,
    },
    resilience: {
      label: 'High Resilience',
      T0: 0.30, A0: 0.10, E0: 0.75, H0: 0.70, R0: 0.70,
      support: 0.90, theta: 0.60, gamma: 0.10, beta: 0.10,
    },
    relapse: {
      label: 'Relapse Pattern',
      T0: 0.60, A0: 0.70, E0: 0.25, H0: 0.30, R0: 0.20,
      support: 0.45, theta: 0.30, gamma: 0.55, beta: 0.35, omega: 1.2,
    },
  };

  /* ----------------------------------------------------------
     HELPERS
  ---------------------------------------------------------- */
  function clampInit(v) {
    return Math.max(0, Math.min(1, parseFloat(v) || 0));
  }

  /* Downsample result arrays for chart rendering (max N points) */
  function downsample(result, maxPoints = 200) {
    const total = result.t.length;
    if (total <= maxPoints) return result;

    const step = Math.ceil(total / maxPoints);
    const keys = ['t', 'T', 'A', 'E', 'H', 'R'];
    const out = { meta: result.meta };

    keys.forEach(k => {
      out[k] = result[k].filter((_, i) => i % step === 0);
    });

    return out;
  }

  /* ----------------------------------------------------------
     PUBLIC API
  ---------------------------------------------------------- */
  return {
    DEFAULTS,
    PRESETS,
    Analysis,
    runSimulation,
    downsample,
  };

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelixModel;
}
