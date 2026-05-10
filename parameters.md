# HELIX Parameter Reference

**Human Emotional Life Integration Calculus**
*Shronda Jeanine & Company | With Purpose on Purpose*

---

This document is the working reference for every parameter in the HELIX model. Each entry covers the parameter's mathematical role, its default value, its practical range, its clinical interpretation, and notes on how it interacts with other parameters.

For the full mathematical derivation of the governing equations, see [`framework.md`](./framework.md).

---

## Quick Reference Table

| Parameter | Symbol | Default | Min | Max | Equation | What It Controls |
|-----------|--------|---------|-----|-----|----------|-----------------|
| Trauma decay rate | `alpha` | 0.10 | 0.01 | 0.50 | dT/dt | How effectively healing suppresses trauma |
| Trigger amplitude | `beta` | 0.20 | 0.00 | 0.80 | dT/dt | Intensity of trauma resurgence events |
| Trigger frequency | `omega` | 0.50 | 0.10 | 2.00 | dT/dt | How often triggers occur |
| Addiction growth | `gamma` | 0.30 | 0.00 | 1.00 | dA/dt | Self-reinforcement rate of addictive patterns |
| Addiction ceiling | `A_max` | 1.00 | 0.50 | 1.00 | dA/dt | Maximum addiction state |
| Regulation-addiction suppression | `delta` | 0.40 | 0.10 | 1.00 | dA/dt | How strongly regulation counters addiction |
| Healing-regulation gain | `epsilon` | 0.50 | 0.10 | 1.00 | dE/dt | How much healing builds regulation |
| Trauma-regulation erosion | `zeta` | 0.30 | 0.05 | 0.80 | dE/dt | How much trauma degrades regulation |
| Addiction-regulation erosion | `eta` | 0.20 | 0.05 | 0.80 | dE/dt | How much addiction degrades regulation |
| Support level | `support` | 0.70 | 0.10 | 1.00 | dH/dt | External support available (healing ceiling) |
| Healing rate | `theta` | 0.40 | 0.05 | 1.00 | dH/dt | Speed of movement toward support equilibrium |
| Regulation-healing gain | `iota` | 0.30 | 0.05 | 0.80 | dH/dt | How much regulation accelerates healing |
| Resilience sensitivity | `kappa` | 0.50 | 0.10 | 1.00 | dR/dt | Rate of resilience change |
| Initial trauma | `T0` | 0.80 | 0.00 | 1.00 | IC | Starting trauma intensity |
| Initial addiction | `A0` | 0.50 | 0.00 | 1.00 | IC | Starting addiction state |
| Initial regulation | `E0` | 0.30 | 0.00 | 1.00 | IC | Starting regulation capacity |
| Initial healing | `H0` | 0.10 | 0.00 | 1.00 | IC | Starting healing trajectory |
| Initial resilience | `R0` | 0.20 | 0.00 | 1.00 | IC | Starting resilience level |
| Simulation duration | `t_end` | 40 | 10 | 200 | Solver | Length of simulation in time units |
| Step size | `dt` | 0.10 | 0.01 | 0.20 | Solver | RK4 integration step (smaller = more accurate) |

---

## Initial Condition Parameters

Initial conditions define where the system starts at t = 0. They are the most direct way to model a specific person's presenting state.

---

### `T0` — Initial Trauma Intensity

**Default:** 0.80
**Range:** [0.00, 1.00]
**Equation:** Sets T(t=0)

**Description:**
The trauma intensity at the start of the simulation. Represents how actively unprocessed traumatic material is dysregulating the system at the point of initial assessment.

**Clinical interpretation by value range:**

| Range | Interpretation |
|-------|---------------|
| 0.00 – 0.20 | Trauma is minimally active; may be resolved or dormant |
| 0.21 – 0.45 | Moderate activation; some dysregulation but functional |
| 0.46 – 0.65 | Significant activation; regulation is compromised |
| 0.66 – 0.85 | High activation; significant functional impairment |
| 0.86 – 1.00 | Maximum activation; crisis-level traumatic dysregulation |

**Interaction notes:**
High T0 is most damaging when paired with low E0. The combined effect collapses regulation immediately, preventing H(t) from rising. When T0 is high and E0 is also moderate (> 0.35), the system often finds a recovery pathway even if slowly.

---

### `A0` — Initial Addiction State

**Default:** 0.50
**Range:** [0.00, 1.00]
**Equation:** Sets A(t=0)

**Description:**
The addiction state at the start of the simulation. Models the current strength of addictive patterns and their demand on system resources.

**Clinical interpretation by value range:**

| Range | Interpretation |
|-------|---------------|
| 0.00 – 0.15 | Addiction is minimal or in strong remission |
| 0.16 – 0.40 | Early-stage or moderate addictive patterns |
| 0.41 – 0.65 | Active addiction with significant system impact |
| 0.66 – 0.85 | Severe addiction; high erosion of regulation |
| 0.86 – 1.00 | Maximum addiction state; near carrying capacity |

**Interaction notes:**
A0 interacts with gamma (growth rate) and E0 (regulation). High A0 with high gamma and low E0 creates the relapse spiral — the most resistant system configuration. If A0 is high but gamma is low (< 0.2), the addiction stabilizes rather than escalates, making recovery more tractable.

---

### `E0` — Initial Emotional Regulation Capacity

**Default:** 0.30
**Range:** [0.00, 1.00]
**Equation:** Sets E(t=0)

**Description:**
The regulation capacity at the start of the simulation. The most strategically critical initial condition — regulation determines whether the person can make use of available support and resist addictive escalation.

**Clinical interpretation by value range:**

| Range | Interpretation |
|-------|---------------|
| 0.00 – 0.15 | Severe dysregulation; crisis or acute trauma state |
| 0.16 – 0.30 | Low regulation; significant impairment |
| 0.31 – 0.50 | Moderate regulation; functional but constrained |
| 0.51 – 0.70 | Good regulation; adaptive, responsive |
| 0.71 – 1.00 | High regulation; robust, flexible system |

**Interaction notes:**
E0 is the system's bottleneck variable. It determines:
- Whether `iota * E` meaningfully accelerates healing
- Whether `delta * E` meaningfully suppresses addiction
- How quickly E(t) can self-sustain under healing

When E0 < 0.20, even high support levels may fail to produce recovery trajectories because healing cannot build fast enough to compensate for combined trauma and addiction erosion.

---

### `H0` — Initial Healing Trajectory

**Default:** 0.10
**Range:** [0.00, 1.00]
**Equation:** Sets H(t=0)

**Description:**
The healing trajectory value at t=0. Represents how much restorative process is already underway when the simulation begins. Most presentations will have low H0; it increases as therapeutic engagement deepens.

**Clinical interpretation:**
- **H0 < 0.15:** Healing has not yet begun; pre-engagement state
- **H0 = 0.15 – 0.40:** Early engagement; healing is initiated but fragile
- **H0 > 0.40:** Established healing process; significant prior work completed

**Interaction notes:**
H0 interacts directly with alpha: even a modest initial healing value (H0 = 0.15) meaningfully accelerates trauma suppression when alpha is in its standard range, because the trauma decay term is `alpha * T * H` — requiring both variables to be nonzero to function.

---

### `R0` — Initial Resilience

**Default:** 0.20
**Range:** [-0.50, 1.00]
**Equation:** Sets R(t=0)

**Description:**
The resilience level at t=0. Unlike the other initial conditions, R0 can be set below zero to model a system that is already in net deficit — where destabilizing forces exceed protective ones at the point of assessment.

**Clinical interpretation:**
- **R0 < 0:** System is structurally deficit; destabilization exceeds protective capacity
- **R0 = 0.00 – 0.20:** Minimal resilience; system is fragile under stress
- **R0 = 0.21 – 0.50:** Moderate resilience; some structural buffer
- **R0 > 0.50:** Established resilience; significant load-bearing capacity

**Note:** R0 has minimal long-term effect because R(t) is driven almost entirely by the ongoing balance of E, H, T, and A rather than its initial value. R0 affects the beginning of the trajectory more than the end.

---

## Trauma Parameters

These parameters govern the dynamics of T(t) — how trauma decays and how triggers restore it.

---

### `alpha` — Trauma Decay Rate

**Default:** 0.10
**Range:** [0.01, 0.50]
**Equation:** `dT/dt = -alpha * T * H + ...`

**Description:**
The rate at which healing suppresses trauma intensity. Because this term is the product `alpha * T * H`, its effect is non-linear: it is strongest when both trauma and healing are moderate, and weakens as either approaches zero.

**Clinical interpretation by value range:**

| Range | Interpretation |
|-------|---------------|
| 0.01 – 0.05 | Highly treatment-resistant trauma; very slow decay |
| 0.06 – 0.15 | Standard trauma processing rate |
| 0.16 – 0.30 | Good response to healing; trauma diminishes steadily |
| 0.31 – 0.50 | High responsiveness; trauma resolves relatively quickly |

**Modeling uses:**
- Low alpha + high beta: models chronic treatment-resistant PTSD with frequent triggers
- High alpha + moderate support: models good prognosis single-incident trauma
- Very low alpha: models complex developmental trauma where the decay pathway is severely inhibited

**Key insight:** Alpha alone does not determine recovery speed. It determines the *efficiency* of the healing-to-trauma suppression pathway. If H(t) never rises (due to low support or collapsed regulation), high alpha produces no benefit.

---

### `beta` — Trigger Amplitude

**Default:** 0.20
**Range:** [0.00, 0.80]
**Equation:** `dT/dt = ... + beta * sin(omega * t)`

**Description:**
The amplitude of the sinusoidal trigger function — how much each trigger event raises trauma intensity. Beta controls the height of the peaks; omega controls how often they occur.

**Clinical interpretation:**

| Range | Interpretation |
|-------|---------------|
| 0.00 | No external triggers; trauma only decays |
| 0.01 – 0.10 | Mild triggers; minor disruptions to healing progress |
| 0.11 – 0.25 | Moderate triggers; noticeable oscillation in T(t) |
| 0.26 – 0.50 | Strong triggers; periodic destabilization |
| 0.51 – 0.80 | Severe triggers; major trauma resurgence events |

**Modeling uses:**
- **Beta = 0:** Models a trigger-free environment (therapeutic safe space, stable residential setting)
- **High beta + high omega:** Models ongoing abuse or highly traumatic environment
- **High beta + low omega:** Models anniversary reactions or infrequent but severe triggers (e.g., court proceedings, seasonal grief)
- **Reducing beta over time:** Models desensitization therapies (EMDR, prolonged exposure)

---

### `omega` — Trigger Frequency

**Default:** 0.50
**Range:** [0.10, 2.00]
**Equation:** `dT/dt = ... + beta * sin(omega * t)`

**Description:**
The angular frequency of the trigger function. Higher omega means more frequent trigger events. In the simulation's dimensionless time, `omega = 0.5` produces approximately one trigger cycle per 12.6 time units; `omega = 2.0` produces one cycle per 3.1 time units.

**Clinical interpretation:**

| Range | Interpretation |
|-------|---------------|
| 0.10 – 0.30 | Rare triggers; long intervals between resurgence events |
| 0.31 – 0.70 | Moderate frequency; periodic but predictable pattern |
| 0.71 – 1.20 | High frequency; continuous stress environment |
| 1.21 – 2.00 | Very high frequency; near-constant triggering |

**Modeling uses:**
- **Low omega:** Models well-stabilized environments with rare stressors
- **High omega:** Models ongoing domestic violence, active combat, or highly triggering workplace/community environments
- **Omega matching real patterns:** Anniversary reactions (~0.17 for annual events), weekly triggers (~0.88 in simulation units)

**Critical interaction:** When omega is high relative to alpha * H, trauma is re-activated faster than it can be suppressed. This creates oscillatory states where healing is chronically undermined — matching the experience of people who "do all the right things" but cannot sustain progress due to environmental load.

---

## Addiction Parameters

---

### `gamma` — Addiction Growth Rate

**Default:** 0.30
**Range:** [0.00, 1.00]
**Equation:** `dA/dt = gamma * A * (1 - A/A_max) - ...`

**Description:**
The self-reinforcement rate of addictive patterns. Operates via logistic growth: addiction grows fastest at intermediate values and slows near the ceiling. Higher gamma means addiction escalates more aggressively.

**Clinical interpretation:**

| Range | Interpretation |
|-------|---------------|
| 0.00 – 0.10 | Minimal self-reinforcement; addiction is static or declining |
| 0.11 – 0.25 | Low escalation; addiction grows slowly |
| 0.26 – 0.45 | Moderate escalation; standard addictive progression |
| 0.46 – 0.65 | High escalation; rapid tolerance buildup |
| 0.66 – 1.00 | Severe escalation; addiction dominates quickly |

**Modeling uses:**
- **High gamma:** Chemical dependencies with strong physiological reinforcement (opioids, alcohol)
- **Moderate gamma:** Behavioral addictions, process addictions
- **Low gamma:** Mild habitual patterns with weak self-reinforcement

**Key interaction:** Gamma interacts with delta (regulation suppression). When `gamma >> delta * E`, addiction grows despite regulation — modeling the clinical phenomenon where even motivated, regulated individuals struggle with certain highly reinforcing substances or behaviors.

---

### `A_max` — Addiction Ceiling

**Default:** 1.00
**Range:** [0.50, 1.00]
**Equation:** `dA/dt = gamma * A * (1 - A/A_max) - ...`

**Description:**
The maximum state addiction can reach. Models the physical or behavioral carrying capacity of the addictive system — beyond which tolerance, physical limits, or behavioral exhaustion prevent further escalation.

**Note:** In most applications, A_max should remain at 1.00. It is included for completeness and for modeling scenarios where addiction is bounded by external constraints (e.g., supply limitations, incarceration, medical intervention that caps access).

---

### `delta` — Regulation Suppression of Addiction

**Default:** 0.40
**Range:** [0.10, 1.00]
**Equation:** `dA/dt = ... - delta * E`

**Description:**
How effectively emotional regulation capacity suppresses addictive pull. High delta means good regulation strongly inhibits addiction; low delta means regulation has limited direct impact on addictive patterns.

**Clinical interpretation:**

| Range | Interpretation |
|-------|---------------|
| 0.10 – 0.20 | Regulation has minimal direct impact on addiction |
| 0.21 – 0.40 | Standard regulatory suppression |
| 0.41 – 0.65 | Strong regulatory control over addictive patterns |
| 0.66 – 1.00 | High regulatory efficacy; well-developed coping replaces addictive behavior |

**Modeling uses:**
- **High delta:** Models successful dialectical behavior therapy (DBT) outcomes where regulation skills directly substitute for addictive behavior
- **Low delta:** Models chemical dependencies where pharmacological drives exceed behavioral regulation capacity
- **Intervention:** Increasing delta over simulation time could model the effect of skills-based therapies that specifically target the regulation-addiction relationship

---

## Regulation Parameters

---

### `epsilon` — Healing-to-Regulation Gain

**Default:** 0.50
**Range:** [0.10, 1.00]
**Equation:** `dE/dt = epsilon * H - ...`

**Description:**
How much each unit of healing contributes to building regulation capacity. High epsilon means healing rapidly builds the system's regulatory foundation; low epsilon means healing and regulation are relatively decoupled.

**Clinical interpretation:**
- **High epsilon:** Models therapies that explicitly build regulation capacity as part of the healing process (somatic therapy, EMDR, trauma-focused CBT)
- **Low epsilon:** Models healing processes that process trauma content without building regulatory skills (pure talk therapy in early stages, journaling without skills components)

---

### `zeta` — Trauma Erosion of Regulation

**Default:** 0.30
**Range:** [0.05, 0.80]
**Equation:** `dE/dt = ... - zeta * T - ...`

**Description:**
How much active trauma erodes regulation capacity. High zeta means trauma severely degrades the system's ability to self-regulate; low zeta means regulation is relatively insulated from trauma load.

**Clinical interpretation:**
- **High zeta:** Acute PTSD, trauma that directly dysregulates the nervous system
- **Low zeta:** Grief, situational trauma, or trauma that has been partially processed — still present but no longer acutely dysregulating

---

### `eta` — Addiction Erosion of Regulation

**Default:** 0.20
**Range:** [0.05, 0.80]
**Equation:** `dE/dt = ... - eta * A`

**Description:**
How much active addiction erodes regulation capacity. High eta means addiction significantly degrades regulatory function; low eta means addiction and regulation coexist without strong mutual interference.

**Clinical interpretation:**
- **High eta:** Models substances or behaviors that directly impair prefrontal regulatory function (alcohol, dissociative substances, compulsive behavioral patterns with strong neurological reinforcement)
- **Low eta:** Models addictive patterns that are more socially reinforced than neurologically driven, where regulatory capacity is less directly impaired

---

## Healing Parameters

---

### `support` (S) — Support Level

**Default:** 0.70
**Range:** [0.10, 1.00]
**Equation:** `dH/dt = theta * (support - H) + ...`

**Description:**
The aggregate level of external support available to the person. This is the single most powerful parameter in the model — it sets the ceiling toward which H(t) can grow, and no healing rate parameter can drive healing above it.

**Clinical interpretation by value range:**

| Range | Interpretation |
|-------|---------------|
| 0.10 – 0.25 | Minimal support; isolated, resource-poor environment |
| 0.26 – 0.45 | Low support; some resources but significant gaps |
| 0.46 – 0.65 | Moderate support; functional therapeutic and social environment |
| 0.66 – 0.80 | Good support; strong therapeutic relationship, stable environment |
| 0.81 – 1.00 | Exceptional support; comprehensive care, strong community, stable housing and resources |

**What support models:**
Support is not a single intervention. It is the aggregate of:
- Quality and consistency of therapeutic relationship
- Family and community stability
- Housing and economic security
- Access to medical and mental health care
- Peer support and community belonging
- Cultural and spiritual resources

**Critical property:** The first-order relaxation term means H(t) always moves toward `support` but never exceeds it. This is a structural constraint in the model — healing cannot be accelerated beyond what available resources can sustain. It is perhaps the most important policy-relevant prediction HELIX makes.

---

### `theta` — Healing Rate

**Default:** 0.40
**Range:** [0.05, 1.00]
**Equation:** `dH/dt = theta * (support - H) + ...`

**Description:**
How quickly H(t) moves toward the support ceiling. A first-order rate constant — analogous to the rate of exponential approach to equilibrium.

**Clinical interpretation:**

| Range | Interpretation |
|-------|---------------|
| 0.05 – 0.15 | Very slow healing; significant resistance or low engagement |
| 0.16 – 0.35 | Below-average rate; present but slow therapeutic progress |
| 0.36 – 0.55 | Average healing rate; steady progress |
| 0.56 – 0.75 | Above-average rate; strong engagement and readiness |
| 0.76 – 1.00 | High rate; exceptional engagement or intensive treatment |

**Important distinction from support:**
- **Support** determines *where* healing goes
- **Theta** determines *how fast* it gets there

High theta with low support produces rapid but ceiling-limited healing. Low theta with high support produces slow healing that eventually reaches a high ceiling. For most long-term outcomes, support level matters more than healing rate — but for early trajectory, theta dominates.

---

### `iota` — Regulation-to-Healing Gain

**Default:** 0.30
**Range:** [0.05, 0.80]
**Equation:** `dH/dt = ... + iota * E`

**Description:**
How much emotional regulation capacity accelerates healing. Models the clinical reality that a person must have regulatory resources available to make productive use of support and therapeutic work.

**Clinical interpretation:**
- **High iota:** Healing is strongly regulation-dependent; a person with good regulation gets much more from the same support than one with poor regulation
- **Low iota:** Healing is relatively regulation-independent; support is effective even at low regulation levels

**Modeling uses:**
- Adjust iota to model different therapeutic approaches: highly experiential/somatic therapies (high iota) versus more structured/directive approaches that can work with low regulation (lower iota)

---

## Resilience Parameter

---

### `kappa` — Resilience Sensitivity

**Default:** 0.50
**Range:** [0.10, 1.00]
**Equation:** `dR/dt = kappa * (E + H - T - A)`

**Description:**
The rate at which resilience responds to the current system balance. High kappa means resilience tracks the balance quickly; low kappa means resilience is a slow-moving, momentum-carrying variable.

**Clinical interpretation:**
- **High kappa:** Resilience is responsive; it rises quickly with improved balance and falls quickly with deterioration
- **Low kappa:** Resilience is stable; accumulated resilience is hard to lose but also slow to build

**Note:** Kappa is primarily a modeling parameter rather than a clinical one. In most applications, the default value of 0.50 is appropriate. Adjust only when the specific behavior of R(t) relative to the other variables is the focus of analysis.

---

## Solver Parameters

These parameters control the numerical integration and do not have clinical interpretations — they govern accuracy and scope.

---

### `dt` — Step Size

**Default:** 0.10
**Recommended range:** [0.01, 0.20]

**Description:**
The RK4 integration step size. Smaller values produce more accurate results but require more computation. The default of 0.10 provides accuracy well within visual imperceptibility for all standard parameter combinations.

**When to adjust:**
- **Decrease to 0.01–0.05:** When using very high omega (> 1.5), where rapid oscillation requires finer sampling to resolve accurately
- **Increase to 0.15–0.20:** When running many scenarios for comparison and computation time matters — accuracy loss is minimal

**Stability:** RK4 with the HELIX equations remains numerically stable for `dt ≤ 0.25` across the standard parameter space.

---

### `t_end` — Simulation Duration

**Default:** 40
**Range:** [10, 200]

**Description:**
The total duration of the simulation in dimensionless time units. The default of 40 is sufficient to observe full trajectory behavior for most parameter combinations — enough time to see healing crossovers, addiction spirals, or oscillatory states develop and stabilize.

**When to adjust:**
- **t_end = 10–20:** For rapid exploration of initial dynamics
- **t_end = 60–100:** For observing long-term equilibrium behavior, especially with low healing rates
- **t_end = 100–200:** For comparing very slow healing processes or running parameter sensitivity analysis

---

## Scenario Presets

These presets, defined in `model.js`, provide starting configurations for common clinical presentations:

### Crisis State
```
T0=0.95, A0=0.80, E0=0.10, H0=0.05, R0=0.05
support=0.20, theta=0.20, gamma=0.60, beta=0.40
```
Acute crisis: maximum trauma load, severe addiction, collapsed regulation, minimal support. The system's most resistant configuration. Demonstrates the catastrophic failure mode of the regulation bottleneck.

### Early Recovery
```
T0=0.70, A0=0.40, E0=0.35, H0=0.25, R0=0.20
support=0.60, theta=0.40, gamma=0.30, beta=0.20
```
Treatment initiation: significant trauma and addiction, moderate regulation, some healing already underway. The most common clinical presentation at treatment entry. Recovery trajectory is possible but not guaranteed.

### Active Healing
```
T0=0.50, A0=0.20, E0=0.55, H0=0.50, R0=0.45
support=0.80, theta=0.55, gamma=0.15, beta=0.15
```
Mid-recovery: trauma is declining, addiction is low, regulation is strengthening, strong support and healing trajectory. Demonstrates the compounding effect of simultaneous improvements across multiple variables.

### High Resilience
```
T0=0.30, A0=0.10, E0=0.75, H0=0.70, R0=0.70
support=0.90, theta=0.60, gamma=0.10, beta=0.10
```
Established recovery or baseline high-resource state. Demonstrates that even with residual trauma (T0=0.30), high regulation and healing trajectories produce robust recovery outcomes.

### Relapse Pattern
```
T0=0.60, A0=0.70, E0=0.25, H0=0.30, R0=0.20
support=0.45, theta=0.30, gamma=0.55, beta=0.35, omega=1.2
```
High addiction with frequent triggers and moderate-low support: the relapse configuration. Demonstrates the self-reinforcing addiction spiral and the effect of high trigger frequency overwhelming moderate healing capacity.

---

## Parameter Sensitivity Guide

For practitioners and educators adjusting parameters to model specific situations:

**Highest impact parameters (change these first):**
1. `support` — determines healing ceiling; most important for long-term outcomes
2. `T0` + `E0` combination — determines initial system access to recovery
3. `gamma` — determines addiction trajectory aggressiveness
4. `omega` + `beta` — determines environmental trigger load

**Moderate impact parameters:**
5. `theta` — healing speed; important for early trajectory, less so for final state
6. `alpha` — trauma decay efficiency; interacts with support level
7. `delta` — regulation-addiction coupling; important for addiction-specific outcomes

**Lower impact parameters (for fine-tuning):**
8. `epsilon`, `iota`, `zeta`, `eta` — coupling gains; adjust when the relationship between specific variable pairs is the focus
9. `kappa` — resilience tracking; adjust only when R(t) dynamics are the primary interest
10. `A_max` — addiction ceiling; rarely needs adjustment

---

*HELIX — Human Emotional Life Integration Calculus*
*Shronda Jeanine & Company | shrondajeanineco.com | With Purpose on Purpose*
