# HELIX
## Human Emotional Life Integration Calculus

> *A mathematical framework for modeling the dynamics of trauma, abuse, and addiction as interconnected emotional systems.*

**Created by Shronda Jeanine & Company**
*With Purpose on Purpose*

---

## Overview

**HELIX** is an interactive motion calculus system that models trauma, addiction, and healing not as separate, static conditions — but as **living, coupled mathematical functions** that influence one another across time.

The name carries its meaning fully: the double helix is the structure of life itself, and here it becomes a metaphor for the two intertwining spirals that define every healing journey — the weight of what was, and the momentum of what can be. HELIX makes those spirals visible.

This framework is scientific yet accessible. It was built to serve researchers, clinicians, educators, and individuals alike — anyone who needs to see the dynamics of human emotional experience rendered with precision and compassion.

---

## The Double Helix Metaphor

In biology, the double helix is stable because its two strands are bound together — not despite their differences, but because of them. HELIX applies that same logic to emotional systems:

- **Trauma and healing** are not opposites. They are co-evolving spirals.
- **Addiction and regulation** do not cancel each other — they compete and interact.
- **Resilience** is not the absence of damage. It is an emergent property of the whole system.

When you model these dynamics mathematically, patterns become predictable. And what is predictable can be influenced.

---

## The Mathematical Framework

HELIX is built on a system of **coupled ordinary differential equations (ODEs)** — a standard tool in physics and ecology for modeling how interdependent variables evolve over time. Here, we apply that framework to the landscape of human emotional life.

### The Five Core Functions

| Function | Name | Description |
|----------|------|-------------|
| `T(t)` | **Trauma Intensity** | Decays exponentially under healing conditions, but experiences cyclic resurgence through triggers. Never simply "goes away." |
| `A(t)` | **Addiction State** | Self-reinforcing loop with tolerance buildup. Models the way compulsive patterns resist disruption from the inside. |
| `E(t)` | **Emotional Regulation Capacity** | Directly affected by trauma load and available support. The system's ability to manage its own inputs. |
| `H(t)` | **Healing Trajectory** | An integration over time of support systems and self-regulation capacity. Healing is cumulative — it compounds. |
| `R(t)` | **Dynamic Resilience** | Grows or diminishes based on the current state of all other functions. Not a trait — a system output. |

### The Governing Equations

```
dT/dt = -alpha * T(t) * H(t) + beta * sin(omega * t)       # Trauma decays with healing; triggers are periodic
dA/dt = gamma * A(t) * (1 - A(t)/A_max) - delta * E(t)    # Addiction self-reinforces; regulation suppresses it
dE/dt = epsilon * H(t) - zeta * T(t) - eta * A(t)         # Regulation grows with healing; trauma and addiction erode it
dH/dt = theta * (support - H(t)) + iota * E(t)            # Healing seeks an equilibrium set by support level
dR/dt = kappa * (E(t) + H(t) - T(t) - A(t))               # Resilience is the net system balance
```

### Key Mathematical Properties

- **Coupling** — Every function influences every other. Nothing in the model is isolated, just as nothing in human experience is isolated.
- **Non-linearity** — Trauma impairs regulation; impaired regulation reduces healing capacity; reduced healing allows trauma to persist. The system can spiral — in either direction.
- **Time-dependence** — These are not snapshots. They are trajectories. The model shows *how states evolve*, not just where they start.
- **Intervention modeling** — Adjusting support levels, healing rates, or addiction parameters produces measurable changes in every other function. Therapeutic leverage is visible.

---

## Interactive Features

The HELIX visualization environment lets users:

- **Set initial conditions** — Define starting values for trauma, addiction, and emotional regulation
- **Adjust intervention parameters** — Simulate increases in support level, therapeutic engagement, or healing rate
- **Observe coupled responses** — Watch how changes in one function propagate through the entire system in real time
- **Compare trajectories** — Run multiple scenarios to observe diverging outcomes under different conditions
- **Identify attractors** — See where the system wants to go under different parameter regimes

Higher support levels and healing rates accelerate recovery. Stronger addiction patterns create self-reinforcing cycles that resist change. The visualization makes both dynamics — and the distance between them — concrete.

---

## Why This Matters

Traditional frameworks for understanding trauma, addiction, and healing tend to treat them as sequential or separate: first trauma, then addiction, then recovery. Clinical experience tells a more complicated story.

HELIX is built on the recognition that these states are **simultaneous and interdependent**. A person is not *in* trauma and then *in* addiction. They are living in a system where both dynamics are active and competing — moment to moment, day to day.

By rendering these dynamics mathematically, HELIX:

- Makes **hidden trajectories visible** — you can see where a system is heading before it arrives
- Enables **scenario modeling** — what happens if support increases? If a trigger event occurs? If tolerance builds?
- Supports **therapeutic planning** by identifying where intervention has the highest system-wide leverage
- Provides **a shared language** across disciplines — mathematics as a bridge between clinical, research, and lived experience

> *This is a simplified model of incredibly complex human experiences. But simplification in service of clarity is not reduction — it is respect for the person trying to understand what is happening inside them.*

---

## Project Structure

```
helix/
|-- index.html              # Main entry point
|-- assets/
|   |-- css/
|   |   |-- helix.css       # Core styles and brand theming
|   |-- js/
|   |   |-- model.js        # ODE solver and coupled system logic
|   |   |-- visualization.js # Chart rendering and animation layer
|   |   |-- controls.js     # Interactive parameter UI
|-- docs/
|   |-- framework.md        # Extended mathematical documentation
|   |-- parameters.md       # Parameter reference guide
|-- README.md
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required for the interactive version

### Running Locally

```bash
git clone https://github.com/shrondaj/helix.git
cd helix
open index.html
```

Or serve with any static file server:

```bash
npx serve .
# Navigate to http://localhost:3000
```

---

## Parameters Reference

| Parameter | Symbol | Default | Effect |
|-----------|--------|---------|--------|
| Trauma decay rate | `alpha` | 0.1 | Higher values = faster trauma reduction under healing |
| Trigger frequency | `omega` | 0.5 | Controls how often cyclic triggers occur |
| Trigger amplitude | `beta` | 0.2 | Intensity of trigger events on trauma state |
| Addiction growth | `gamma` | 0.3 | Self-reinforcing rate of addictive patterns |
| Addiction ceiling | `A_max` | 1.0 | Maximum addiction state |
| Regulation suppression of addiction | `delta` | 0.4 | How effectively emotional regulation counters addiction |
| Healing-to-regulation gain | `epsilon` | 0.5 | How much healing builds regulation capacity |
| Trauma erosion of regulation | `zeta` | 0.3 | How much trauma degrades regulation |
| Addiction erosion of regulation | `eta` | 0.2 | How much addiction degrades regulation |
| Support level | `support` | 0.7 | External support available; primary intervention lever |
| Healing rate | `theta` | 0.4 | Rate at which healing moves toward support-set equilibrium |
| Regulation-to-healing gain | `iota` | 0.3 | How much emotional regulation accelerates healing |
| Resilience sensitivity | `kappa` | 0.5 | Rate at which resilience responds to system balance |

---

## Intended Uses

- **Clinical education** — Teaching the interactivity of trauma and addiction to practitioners
- **Client psychoeducation** — Making complex dynamics understandable for people navigating their own healing
- **Research visualization** — Exploring parameter spaces for theoretical modeling
- **Program design** — Identifying high-leverage intervention points in treatment frameworks
- **Public education** — Reducing stigma by making the logic of addiction and trauma visible

---

## Limitations and Ethical Notes

HELIX is a **conceptual modeling tool**, not a diagnostic or clinical instrument. It does not predict individual outcomes or replace professional assessment.

- Parameters are illustrative. They are chosen to produce coherent, meaningful behavior — not calibrated to clinical data.
- Human experience is irreducibly complex. No mathematical model captures it fully. This one is designed to illuminate, not to reduce.
- HELIX should be used to open conversations, not close them.

The goal is not to make people into equations. The goal is to make the equations feel like people.

---

## About Shronda Jeanine & Company

**Shronda Jeanine & Company** is a healing, coaching, and community advocacy brand based in Phoenix, Arizona. Through the **OVERCOME Method**, civic education, content creation, and tools like HELIX, the company creates frameworks that make complex human experiences navigable — for individuals, communities, and practitioners.

*With Purpose on Purpose.*

**Website:** [shrondajeanineco.com](https://shrondajeanineco.com)
**Email:** shrjeacompany@gmail.com
**Phone:** (602) 759-0158
**Ko-fi:** [ko-fi.com/shrondajeanine](https://ko-fi.com/shrondajeanine)
**YouTube:** [@OnPurposeWithPurpose9](https://youtube.com/@OnPurposeWithPurpose9)
**Instagram:** [@shrondajeanine](https://instagram.com/shrondajeanine)
**TikTok:** [@.shronda](https://tiktok.com/@.shronda)

---

## License

This project and its conceptual framework are the intellectual property of **Shronda Jeanine & Company**.

All rights reserved. For licensing inquiries, educational use agreements, or collaboration proposals, contact: shrjeacompany@gmail.com

---

*HELIX — Human Emotional Life Integration Calculus*
*Motion Calculus for Human Emotional Dynamics*
*Created by Shronda Jeanine & Company*
