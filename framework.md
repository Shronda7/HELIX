# HELIX Framework — Extended Mathematical Documentation

**Human Emotional Life Integration Calculus**
*Shronda Jeanine & Company | With Purpose on Purpose*

---

## Table of Contents

1. [Theoretical Foundation](#theoretical-foundation)
2. [The Double Helix Metaphor](#the-double-helix-metaphor)
3. [Why Differential Equations?](#why-differential-equations)
4. [The Five State Variables](#the-five-state-variables)
5. [The Governing Equations](#the-governing-equations)
6. [Coupling Structure](#coupling-structure)
7. [The RK4 Numerical Solver](#the-rk4-numerical-solver)
8. [System Behavior and Attractors](#system-behavior-and-attractors)
9. [Intervention Modeling](#intervention-modeling)
10. [Analytical Metrics](#analytical-metrics)
11. [Clinical and Educational Applications](#clinical-and-educational-applications)
12. [Limitations and Ethical Scope](#limitations-and-ethical-scope)
13. [Mathematical Notation Reference](#mathematical-notation-reference)

---

## Theoretical Foundation

HELIX is built on the recognition that trauma, addiction, and healing are not isolated, sequential states. They are simultaneous, interacting dynamics operating within a single human system at all times.

Conventional models of mental health and recovery tend toward linear narratives: trauma precedes addiction, treatment follows diagnosis, recovery succeeds treatment. This sequence is clinically useful but mathematically inadequate. It cannot account for relapse, for the way trauma resurfaces under stress, for why some interventions accelerate healing while others plateau, or for the non-obvious leverage points where small changes produce large systemic shifts.

HELIX borrows the conceptual and mathematical language of **dynamical systems theory** — the branch of mathematics used to model ecological population dynamics, epidemic spread, chemical reaction kinetics, and planetary motion — and applies it to the landscape of human emotional experience.

The core claim is simple: human emotional states evolve continuously, they influence each other, and those influences can be expressed mathematically. Once expressed mathematically, they can be visualized, analyzed, and used to reason about the effects of intervention.

---

## The Double Helix Metaphor

The name HELIX is precise, not decorative.

In biology, the DNA double helix consists of two strands wound around a common axis — complementary, opposing, and structurally inseparable. Remove one strand and the molecule loses its integrity. The two strands are not merely adjacent; they are constitutively bound.

HELIX applies this structure to emotional dynamics:

- **Strand One:** Trauma and addiction — the weight-bearing load, the force of accumulated damage
- **Strand Two:** Healing and regulation — the countervailing momentum, the force of accumulated recovery

These two spirals are not opposites in the sense of canceling each other out. They are opponents in the sense of a tensioned system: each constrains and shapes the other. The system's behavior at any moment is the product of their interaction, not the simple sum of their separate values.

Resilience emerges from this interaction — it is not a third strand but a property of the bond between the two, a measure of the system's structural integrity under load.

---

## Why Differential Equations?

A differential equation describes how a quantity *changes* relative to another quantity — typically time. Rather than saying "trauma is 0.7," a differential equation says "trauma is changing at a rate determined by healing, triggers, and time."

This distinction is fundamental. Static models capture state. Differential equations capture dynamics — the forces that produce state, and that will produce future states.

For emotional systems, this matters because:

**1. Past states determine present states.**
A person's current level of emotional regulation is not independent of their trauma history. It is a product of it. Differential equations encode this dependency directly.

**2. Intervention effects are path-dependent.**
The same support level applied at t=5 versus t=25 produces different outcomes depending on where the other variables are at that moment. Static models cannot capture this. Coupled ODEs can.

**3. Non-linear interactions create emergent behavior.**
When trauma impairs regulation, which reduces healing, which allows trauma to persist — that is a feedback loop. Feedback loops produce behaviors (oscillation, bifurcation, catastrophic transition) that cannot be predicted by examining any single variable alone.

**4. Trajectories, not snapshots, are clinically meaningful.**
A person at T=0.7 who has been declining from T=0.95 is in a very different situation than a person at T=0.7 who has been rising from T=0.3. The value is the same; the trajectory is opposite. Differential equations represent trajectory as their native output.

---

## The Five State Variables

All five variables are dimensionless, defined on the interval `[0, 1]` unless driven outside that range by system dynamics. Values near 1 indicate maximum intensity; values near 0 indicate minimal presence.

### T(t) — Trauma Intensity

Represents the current magnitude of unprocessed traumatic material and its active effect on the system. This is not a count of traumatic events but a measure of how actively the accumulated trauma is influencing current functioning.

- **T = 0.0:** Trauma is not currently dysregulating the system
- **T = 0.5:** Moderate trauma load; regulation is affected but not overwhelmed
- **T = 1.0:** Maximum trauma activation; system capacity is severely constrained

T(t) is the only variable subject to external forcing (triggers), modeled as a sinusoidal function to capture the periodic nature of trauma resurgence.

### A(t) — Addiction State

Represents the current strength of addictive patterns — behavioral, chemical, or psychological — and their demand on system resources. Modeled with logistic self-reinforcement to capture the tolerance and escalation dynamics characteristic of addictive processes.

- **A = 0.0:** No addictive pull on the system
- **A = 0.5:** Moderate addiction; competing significantly with regulation
- **A = 1.0:** Addiction at carrying capacity; dominating system behavior

The logistic term `A(1 - A/A_max)` means addiction grows fastest at intermediate values and slows as it approaches its ceiling — matching observed patterns of tolerance buildup and diminishing returns.

### E(t) — Emotional Regulation Capacity

Represents the system's ability to modulate its own inputs — to tolerate distress without being overwhelmed, to maintain executive function under load, to access higher-order coping. This is the system's internal governor.

- **E = 0.0:** Regulation is completely overwhelmed; reactive, dysregulated state
- **E = 0.5:** Partial regulation; functioning but constrained
- **E = 1.0:** Full regulation capacity; adaptive, flexible, responsive

E(t) is the most sensitive variable in the system — it receives inputs from all other variables and is typically the fastest to shift in response to intervention.

### H(t) — Healing Trajectory

Represents the cumulative movement toward integration, meaning, and reduced trauma load. H(t) models healing not as the absence of trauma but as the active presence of restorative processes — therapy, community, self-understanding, meaningful action.

- **H = 0.0:** No healing process active
- **H = 0.5:** Healing is present and moderately effective
- **H = 1.0:** Healing trajectory fully developed; approaching support-level equilibrium

H(t) is bounded above by the available support level `S` — healing cannot exceed the resources that sustain it. This is a critical design choice: it encodes the reality that healing is not an internal capacity alone but a function of available relational and structural support.

### R(t) — Dynamic Resilience

Represents the current structural integrity of the system under load — its capacity to absorb disruption without catastrophic failure. R(t) is not set as an initial condition in the same way as the others; it is an emergent output of the balance between protective and destabilizing forces.

- **R < 0:** System is net-destabilized; resilience is being eroded
- **R = 0:** System in dynamic equilibrium; no net change in structural integrity
- **R > 0:** System is net-building resilience; protective forces dominate

R(t) is the system's summary statistic — the single value that most directly captures whether the system as a whole is moving toward or away from stability.

---

## The Governing Equations

```
dT/dt = -alpha * T(t) * H(t)  +  beta * sin(omega * t)

dA/dt =  gamma * A(t) * (1 - A(t)/A_max)  -  delta * E(t)

dE/dt =  epsilon * H(t)  -  zeta * T(t)  -  eta * A(t)

dH/dt =  theta * (support - H(t))  +  iota * E(t)

dR/dt =  kappa * (E(t) + H(t) - T(t) - A(t))
```

### Reading the Equations

Each equation has the form `dX/dt = [growth terms] - [decay terms]`, read as "the rate of change of X is driven by these forces."

**Trauma (dT/dt):**
Trauma decays at a rate proportional to both its current intensity and the current healing level — the product `alpha * T * H` means that neither healing alone nor trauma alone produces recovery; they must be simultaneously present. The sinusoidal term `beta * sin(omega * t)` injects periodic triggers regardless of system state, modeling the involuntary nature of trauma resurgence.

**Addiction (dA/dt):**
The logistic term `gamma * A * (1 - A/A_max)` creates self-reinforcing growth that slows as addiction approaches its ceiling — capturing escalation. The subtracted term `delta * E` means emotional regulation directly suppresses addictive pull; a person with higher regulation capacity is less susceptible to addictive escalation. This is the most behaviorally intuitive coupling in the model.

**Regulation (dE/dt):**
Regulation grows proportionally to healing and decays proportionally to both trauma and addiction. This equation encodes the clinical observation that regulation capacity is the most contested variable in the system — it is simultaneously built by healing, eroded by trauma, and eroded by addiction. When both T and A are high, regulation can become negative (driven below zero), representing severe dysregulation.

**Healing (dH/dt):**
The first-order relaxation term `theta * (support - H)` means healing always moves toward the equilibrium set by the support level — slowly if theta is small, quickly if large. The additive term `iota * E` means regulation accelerates healing. This captures the therapeutic principle that a person must have some regulatory capacity to make use of available support.

**Resilience (dR/dt):**
Resilience is simply the net system balance: the sum of protective forces (E + H) minus destabilizing forces (T + A), scaled by kappa. This is deliberately transparent — resilience grows when healing and regulation together exceed trauma and addiction, and erodes when they do not.

---

## Coupling Structure

The five equations form a directed coupling graph. Each arrow represents a direct influence:

```
                    [triggers]
                        |
                        v
        T(t) <-------- H(t) ---------> E(t)
         |              ^               |
         |              |               |
         v              |               v
        A(t) ---------->               H(t)
         |                              |
         +---------> R(t) <------------+
                       ^
                       |
                   [E(t), H(t)]
```

More precisely:

| Source | Target | Direction | Mechanism |
|--------|--------|-----------|-----------|
| H(t)   | T(t)   | Suppressive | Healing reduces trauma decay rate |
| E(t)   | A(t)   | Suppressive | Regulation reduces addictive pull |
| H(t)   | E(t)   | Generative  | Healing builds regulation |
| T(t)   | E(t)   | Suppressive | Trauma erodes regulation |
| A(t)   | E(t)   | Suppressive | Addiction erodes regulation |
| E(t)   | H(t)   | Generative  | Regulation accelerates healing |
| S      | H(t)   | Generative  | Support provides healing ceiling |
| E, H, T, A | R(t) | Composite | Balance determines resilience |

The most important structural feature is the **regulation bottleneck**: E(t) is the only pathway through which trauma suppression, addiction suppression, and healing acceleration all flow. A system with collapsed regulation cannot make use of available support (iota * E → 0) and cannot suppress addiction (delta * E → 0). This creates a catastrophic failure mode that matches clinical observations of treatment resistance.

---

## The RK4 Numerical Solver

The governing equations form a system of coupled nonlinear ODEs with no closed-form analytical solution. HELIX integrates them numerically using the **4th-order Runge-Kutta method (RK4)**.

### Why RK4?

The simplest numerical integrator — Euler's method — approximates each step as:

```
x(t + dt) ≈ x(t) + dt * dx/dt
```

This accumulates large errors in nonlinear systems, especially with the coupled feedback loops in HELIX. RK4 improves accuracy dramatically by computing four slope estimates per step and taking their weighted average:

```
k1 = f(t,        x)
k2 = f(t + dt/2, x + dt/2 * k1)
k3 = f(t + dt/2, x + dt/2 * k2)
k4 = f(t + dt,   x + dt   * k3)

x(t + dt) = x(t) + (dt/6) * (k1 + 2*k2 + 2*k3 + k4)
```

RK4 achieves O(h^4) local truncation error versus O(h^2) for Euler — meaning halving the step size reduces error by a factor of 16 rather than 4. For the default step size `dt = 0.1`, RK4 provides accuracy more than adequate for visualization and conceptual modeling.

### Step Size Selection

The default step size of `dt = 0.1` was chosen by testing stability across the full parameter space:

- **Stability condition:** The system remains stable for `dt ≤ 0.2` across most parameter combinations
- **Accuracy condition:** `dt ≤ 0.1` keeps trajectory error visually imperceptible at chart resolution
- **Performance condition:** `t_end = 40` with `dt = 0.1` requires 400 steps — computationally trivial in modern JavaScript

### Clamping

State variables are clamped to `[-2, 2]` after each step to prevent numerical divergence under extreme parameter combinations. In practice, well-parameterized simulations remain within `[0, 1]` throughout.

---

## System Behavior and Attractors

The coupled system exhibits several qualitatively distinct behavioral regimes depending on parameter values.

### Stable Recovery Attractor

When support is high (> 0.7), healing rate is moderate (> 0.35), and addiction strength is low (< 0.3):

- T(t) decays exponentially toward zero despite periodic triggers
- H(t) rises toward the support ceiling
- E(t) stabilizes at a moderate-to-high level
- A(t) collapses as E(t) rises
- R(t) trends strongly positive

The system is attracted to a fixed point where `(T, A) → (low, low)` and `(E, H, R) → (high, high, high)`.

### Trauma Dominance

When initial trauma is high (> 0.75), support is low (< 0.4), and regulation is low (< 0.25):

- T(t) decays slowly but is repeatedly reinforced by triggers
- E(t) collapses under combined trauma and addiction load
- H(t) never rises above support ceiling (which is low) and remains ineffective
- A(t) may escalate if gamma is high
- R(t) trends negative

The system is trapped in a high-trauma attractor — resistant to change because the regulation bottleneck is collapsed.

### Oscillatory State

When trigger frequency (omega) is high and healing rate is moderate:

- T(t) oscillates with significant amplitude
- E(t) and R(t) fluctuate in response
- The system neither recovers fully nor deteriorates — it cycles

This matches clinical observations of trauma that responds to some interventions but resurfaces cyclically, associated with seasonal patterns, anniversary reactions, or environmental triggers.

### Relapse Pattern

When addiction strength is high (gamma > 0.5) and regulation is moderate:

- A(t) rises rapidly via self-reinforcement
- E(t) is eroded by rising A(t), which reduces its capacity to suppress A further
- This creates a positive feedback loop: A rises → E falls → A rises faster
- H(t) is impaired because iota * E → 0
- T(t) may rise as healing capacity collapses

This is the model's clearest demonstration of why addiction is self-reinforcing: the mechanism that would suppress it (regulation) is the same mechanism that addiction degrades.

---

## Intervention Modeling

HELIX models three primary intervention levers:

### Support Level (S)

The most direct and powerful lever. Support sets the ceiling toward which healing trajectories. Doubling support from 0.35 to 0.70 roughly doubles the eventual healing equilibrium, which propagates through regulation and into trauma suppression.

**Interpretation:** Support level models the aggregate external resource available to the person — therapeutic relationship quality, family and community stability, economic security, housing stability, access to care. It is not any single intervention but the composite restorative environment.

### Healing Rate (theta)

Controls how quickly H(t) moves toward the support ceiling. High theta with low support produces rapid but ceiling-limited healing. Low theta with high support produces slow but potentially deep healing.

**Interpretation:** Healing rate models therapeutic intensity, engagement, and the person's readiness to use available support. Two people with identical support levels may heal at very different rates based on internal readiness and the quality of therapeutic fit.

### Trigger Frequency and Amplitude (omega, beta)

These parameters model the traumatic environment — how often and how intensely trauma is re-activated. Reducing omega models environmental stabilization (removing from abusive situation, changing environment). Reducing beta models desensitization (EMDR, exposure therapy, somatic processing).

**Critical insight:** High trigger frequency overwhelms even high healing rates because T(t) is re-activated before H(t) can suppress it. Environmental stabilization often must precede therapeutic work — a prediction the model makes explicit.

---

## Analytical Metrics

The following metrics are computed by `model.js` via the `Analysis` module:

### Recovery Index (RI)

```
RI = (1/N) * sum(H(t_i) - T(t_i)) for all i
```

The average system-wide advantage of healing over trauma across the entire simulation. Positive RI indicates a net-recovery trajectory; negative RI indicates net deterioration.

### Healing Crossover Time

The first time step at which H(t) > T(t) and remains above for five consecutive steps. This metric identifies the transition point — the moment at which healing becomes structurally dominant over trauma. It is often the most clinically meaningful number in the output.

### Peak Trauma

The maximum value of T(t) and the time at which it occurs. Identifies the system's most destabilized moment — useful for understanding when intervention is most critical.

### Balance Series

```
Balance(t) = H(t) + E(t) - T(t) - A(t)
```

The net difference between protective and destabilizing forces at each time step. Equivalent to dR/dt / kappa. When positive, the system is building structural integrity. When negative, it is eroding.

### Narrative Trajectory

A qualitative classification of the final system state into one of five categories:
- **Active Recovery:** H(t_final) > T(t_final), E(t_final) > 0.4, RI > 0.15
- **Early Recovery:** H(t_final) > T(t_final), RI > 0
- **High Load State:** T(t_final) > 0.6 and A(t_final) > 0.5
- **Unresolved Trauma:** T(t_final) > H(t_final)
- **Complex State:** All other conditions

---

## Clinical and Educational Applications

### Psychoeducation

HELIX is designed to be shown, not just described. When a person in recovery can see their own dynamics represented as interacting trajectories — when they can see why regulation collapse makes addiction harder to resist, or why healing accelerates after a crossover point — the model functions as a mirror that reduces shame and increases self-understanding.

The equations explain *why* recovery is non-linear without requiring the person to understand the mathematics.

### Treatment Planning

Clinicians can use HELIX to reason about intervention sequencing. The model suggests that:

1. Environmental stabilization (reduce omega, beta) often must precede therapeutic work
2. Regulation-building interventions (increase epsilon, reduce eta) create the most systemic leverage
3. Support level determines the ceiling — no healing rate can exceed the available support
4. Addiction-focused intervention must address regulation (delta) not just the addiction directly

These are not prescriptions. They are hypotheses the model generates that a skilled clinician can test against a specific person's actual trajectory.

### Research and Training

HELIX provides a shared mathematical language for researchers, clinicians, and educators. Concepts that are difficult to communicate across disciplines — the feedback loop between addiction and regulation, the ceiling effect of support on healing — become visually and quantitatively concrete.

---

## Limitations and Ethical Scope

### What HELIX Is Not

HELIX is a **conceptual modeling tool**, not a diagnostic instrument, a clinical protocol, or a predictive model for individual outcomes. The following limitations are inherent to its design:

**Parameters are illustrative.** The numerical values assigned to alpha, gamma, theta, and all other parameters are chosen to produce coherent, meaningful behavior — not calibrated to empirical clinical data. Real parameter values for individual people or populations would require extensive longitudinal research.

**The model is a simplification.** Human emotional experience is irreducibly complex. Five variables cannot capture the full dimensionality of a person's inner life. HELIX represents a projection of that complexity onto a five-dimensional mathematical space — useful for reasoning, inadequate for complete description.

**The model is deterministic.** Real systems include stochasticity — random variation that can shift trajectories in ways the model cannot predict. A stochastic extension (adding noise terms to each equation) would be more realistic but less interpretable.

**Time is not calendar time.** The simulation runs from t=0 to t=40 in dimensionless time units. There is no direct mapping from simulation time to weeks, months, or years. The model describes trajectory shapes, not timelines.

### Ethical Use

HELIX should be used to open conversations, not to close them. It should be used to generate hypotheses, not to render verdicts. It should reduce shame by making the logic of suffering visible — never to pathologize, reduce, or diminish the full humanity of the person it is used to discuss.

If HELIX is used in a clinical or educational context, it must always be accompanied by human relationship, professional judgment, and the recognition that the model describes dynamics, not destiny.

---

## Mathematical Notation Reference

| Symbol | Name | Equation Role |
|--------|------|---------------|
| T(t) | Trauma Intensity | State variable |
| A(t) | Addiction State | State variable |
| E(t) | Emotional Regulation | State variable |
| H(t) | Healing Trajectory | State variable |
| R(t) | Dynamic Resilience | State variable |
| alpha (α) | Trauma decay rate | dT/dt |
| beta (β) | Trigger amplitude | dT/dt |
| omega (ω) | Trigger frequency | dT/dt |
| gamma (γ) | Addiction growth rate | dA/dt |
| A_max | Addiction ceiling | dA/dt |
| delta (δ) | Regulation suppression of addiction | dA/dt |
| epsilon (ε) | Healing-to-regulation gain | dE/dt |
| zeta (ζ) | Trauma erosion of regulation | dE/dt |
| eta (η) | Addiction erosion of regulation | dE/dt |
| S | Support level | dH/dt |
| theta (θ) | Healing rate | dH/dt |
| iota (ι) | Regulation-to-healing gain | dH/dt |
| kappa (κ) | Resilience sensitivity | dR/dt |
| dt | Integration step size | Solver |
| t | Time (dimensionless) | All |

---

*HELIX — Human Emotional Life Integration Calculus*
*Shronda Jeanine & Company | shrondajeanineco.com | With Purpose on Purpose*
