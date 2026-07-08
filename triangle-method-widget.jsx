import React, { useEffect, useRef, useState } from "react";

const C = {
  paper: "#F3EAD8",
  paper2: "#ECE0C9",
  card: "#FBF5E9",
  ink: "#241509",
  inkSoft: "#7A6A55",
  line: "#D8C8AA",

  red: "#C9401C",
  redDeep: "#A8330F",
  redTint: "#FBE2DA",
  teal: "#0E6B66",
  tealTint: "#DDF0EC",
  gold: "#E0A12B",
  goldTint: "#FBE9C2",
  green: "#2E7D32",
  greenTint: "#E1F0DC",
};

const RUN_MS = 120000;

const METHOD_OPTIONS = [
  {
    id: "pythagoras",
    name: "Pythagoras' theorem",
    formula: "a² + b² = c²",
    cue: "right angle, two sides",
  },
  {
    id: "sohcahtoa",
    name: "SOH CAH TOA",
    formula: "sin θ = O/H · cos θ = A/H · tan θ = O/A",
    cue: "right angle, side-angle ratio",
  },
  {
    id: "sine-rule",
    name: "Sine rule",
    formula: "a/sin A = b/sin B",
    cue: "opposite side-angle pair",
  },
  {
    id: "cosine-rule-side",
    name: "Cosine rule: side",
    formula: "a² = b² + c² − 2bc cos A",
    cue: "two sides and included angle",
  },
  {
    id: "cosine-rule-angle",
    name: "Cosine rule: angle",
    formula: "cos A = (b² + c² − a²)/(2bc)",
    cue: "three sides, missing angle",
  },
  {
    id: "area",
    name: "Area of a triangle",
    formula: "A = ½ab sin C",
    cue: "two sides and included angle",
  },
];

const METHOD_BY_ID = Object.fromEntries(METHOD_OPTIONS.map((option) => [option.id, option]));

const QUESTION_BANK = [
  {
    id: "pythagoras-hypotenuse",
    method: "pythagoras",
    tag: "missing side",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "right",
      rightAngle: "A",
      sides: {
        AB: "8 cm",
        AC: "6 cm",
        BC: "x cm",
      },
      angles: {},
    },
    explanation:
      "The triangle is right-angled and two sides are known, so the missing side is found with Pythagoras' theorem.",
  },
  {
    id: "pythagoras-leg",
    method: "pythagoras",
    tag: "missing side",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "right",
      rightAngle: "A",
      sides: {
        AB: "12 m",
        AC: "x m",
        BC: "15 m",
      },
      angles: {},
    },
    explanation:
      "A right angle is given and the question is about side lengths only, so Pythagoras' theorem is the first formula to use.",
  },
  {
    id: "soh-side-opposite",
    method: "sohcahtoa",
    tag: "right-angle trig",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "right",
      rightAngle: "A",
      sides: {
        AC: "x cm",
        BC: "14 cm",
      },
      angles: {
        B: "38°",
      },
    },
    explanation:
      "This is a right-angled triangle with an acute angle and a side, so a sine, cosine or tangent ratio is needed.",
  },
  {
    id: "soh-angle",
    method: "sohcahtoa",
    tag: "right-angle trig",
    prompt: "Find the missing angle θ.",
    diagram: {
      layout: "right",
      rightAngle: "A",
      sides: {
        AB: "7 cm",
        AC: "5 cm",
      },
      angles: {
        B: "θ",
      },
    },
    explanation:
      "The triangle is right-angled and two sides are known, so inverse SOH CAH TOA is used to find the angle.",
  },
  {
    id: "sine-rule-side-a",
    method: "sine-rule",
    tag: "non-right triangle",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "oblique",
      sides: {
        AC: "13 cm",
        BC: "x cm",
      },
      angles: {
        A: "42°",
        B: "67°",
      },
    },
    explanation:
      "There is a known opposite side-angle pair and another angle, so the sine rule links the matching pairs.",
  },
  {
    id: "sine-rule-side-b",
    method: "sine-rule",
    tag: "non-right triangle",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "oblique",
      sides: {
        AB: "16 km",
        AC: "x km",
      },
      angles: {
        B: "51°",
        C: "74°",
      },
    },
    explanation:
      "A complete opposite side-angle pair is available, which is the key signal for the sine rule.",
  },
  {
    id: "sine-rule-angle-a",
    method: "sine-rule",
    tag: "non-right triangle",
    prompt: "Find the missing angle θ.",
    diagram: {
      layout: "oblique",
      sides: {
        AC: "12 cm",
        BC: "9 cm",
      },
      angles: {
        A: "38°",
        B: "θ",
      },
    },
    explanation:
      "A side and its opposite angle are known, and another opposite side is known, so the sine rule can find the angle.",
  },
  {
    id: "sine-rule-angle-b",
    method: "sine-rule",
    tag: "non-right triangle",
    prompt: "Find the missing angle θ.",
    diagram: {
      layout: "oblique",
      sides: {
        AB: "18 m",
        BC: "11 m",
      },
      angles: {
        A: "35°",
        C: "θ",
      },
    },
    explanation:
      "The useful information is arranged as opposite side-angle pairs, so this is a sine rule angle problem.",
  },
  {
    id: "cosine-side-a",
    method: "cosine-rule-side",
    tag: "included angle",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "oblique",
      sides: {
        AB: "11 cm",
        AC: "7 cm",
        BC: "x cm",
      },
      angles: {
        A: "54°",
      },
    },
    explanation:
      "Two sides and the included angle are known, so use the side version of the cosine rule.",
  },
  {
    id: "cosine-side-b",
    method: "cosine-rule-side",
    tag: "included angle",
    prompt: "Find the missing side x.",
    diagram: {
      layout: "oblique",
      sides: {
        AB: "8 km",
        BC: "10 km",
        AC: "x km",
      },
      angles: {
        B: "118°",
      },
    },
    explanation:
      "The missing side is opposite a known included angle between two known sides, so use the cosine rule for a side.",
  },
  {
    id: "cosine-angle-a",
    method: "cosine-rule-angle",
    tag: "three sides",
    prompt: "Find the missing angle θ.",
    diagram: {
      layout: "oblique",
      sides: {
        AB: "13 cm",
        AC: "10 cm",
        BC: "8 cm",
      },
      angles: {
        A: "θ",
      },
    },
    explanation:
      "All three sides are known and the angle is missing, so use the angle version of the cosine rule.",
  },
  {
    id: "area-included-angle",
    method: "area",
    tag: "triangle area",
    prompt: "Find the area of the triangle.",
    diagram: {
      layout: "oblique",
      areaLabel: "Area = ?",
      sides: {
        AB: "12 cm",
        AC: "9 cm",
      },
      angles: {
        A: "63°",
      },
    },
    explanation:
      "Two sides and their included angle are given, and the target is area, so use A = ½ab sin C.",
  },
  {
    id: "area-included-angle-b",
    method: "area",
    tag: "triangle area",
    prompt: "Find the area of the triangle.",
    diagram: {
      layout: "oblique",
      areaLabel: "Area = ?",
      sides: {
        AB: "15 m",
        BC: "10 m",
      },
      angles: {
        B: "72°",
      },
    },
    explanation:
      "The question asks for area and gives two sides with the included angle, which matches the triangle area formula.",
  },
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function isTargetLabel(value) {
  return /x|\u03b8|\?/.test(value);
}

function randomSideLength(unit) {
  const pools = {
    cm: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18],
    m: [6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 22],
    km: [3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16],
  };
  return pick(pools[unit] || pools.cm);
}

function randomizeSideLabel(label) {
  if (isTargetLabel(label)) return label;
  return label.replace(/(\d+)\s*(cm|km|m)/, (_, __, unit) => `${randomSideLength(unit)} ${unit}`);
}

function randomAngleValues(layout, count) {
  if (count <= 0) return [];
  if (layout === "right") {
    return Array.from({ length: count }, () => randInt(24, 68));
  }
  if (count === 1) return [randInt(34, 118)];

  const first = randInt(34, 68);
  const second = randInt(38, Math.min(84, 152 - first));
  return [first, second, ...Array.from({ length: count - 2 }, () => randInt(32, 74))];
}

function randomizeAngles(angles, layout) {
  const entries = Object.entries(angles || {});
  const knownCount = entries.filter(([, label]) => !isTargetLabel(label)).length;
  const values = randomAngleValues(layout, knownCount);
  let nextValue = 0;

  return Object.fromEntries(
    entries.map(([vertex, label]) => {
      if (isTargetLabel(label)) return [vertex, label];
      const value = values[nextValue] ?? randInt(32, 84);
      nextValue += 1;
      return [vertex, `${value}\u00b0`];
    })
  );
}

function randomizeDiagram(diagram) {
  const variants = DIAGRAM_VARIANTS[diagram.layout] || [];
  return {
    ...diagram,
    variant: variants.length ? randInt(0, variants.length - 1) : 0,
    sides: Object.fromEntries(
      Object.entries(diagram.sides || {}).map(([edge, label]) => [edge, randomizeSideLabel(label)])
    ),
    angles: randomizeAngles(diagram.angles, diagram.layout),
  };
}

function cloneQuestion(q) {
  return {
    ...q,
    id: `${q.id}-${Math.random().toString(36).slice(2)}`,
    diagram: randomizeDiagram(q.diagram),
  };
}

function genRun() {
  return shuffle(QUESTION_BANK).map(cloneQuestion);
}

function drawQuestion(queue) {
  const nextQueue = queue.length ? queue.slice() : genRun();
  const [question, ...rest] = nextQueue;
  return { question, queue: rest };
}

function fmt(ms) {
  const totalCs = Math.max(0, Math.floor(ms / 10));
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60);
  const sec = m > 0 ? String(s).padStart(2, "0") : String(s);
  return `${m > 0 ? `${m}:` : ""}${sec}.${String(cs).padStart(2, "0")}`;
}

function statScore(score) {
  return score == null ? "-" : score;
}

function makeReviewQuestion(q) {
  return `${q.prompt} (${q.tag})`;
}

function FormulaFraction({ top, bottom }) {
  return (
    <span className="tm-formula-frac">
      <span className="tm-formula-frac-top">{top}</span>
      <span className="tm-formula-frac-line" />
      <span className="tm-formula-frac-bottom">{bottom}</span>
    </span>
  );
}

function FormulaDisplay({ methodId }) {
  if (methodId === "pythagoras") {
    return (
      <>
        a² + b² = c²
      </>
    );
  }

  if (methodId === "sohcahtoa") {
    return (
      <span className="tm-formula-row">
        <span>sin θ = </span>
        <FormulaFraction top="O" bottom="H" />
        <span> cos θ = </span>
        <FormulaFraction top="A" bottom="H" />
        <span> tan θ = </span>
        <FormulaFraction top="O" bottom="A" />
      </span>
    );
  }

  if (methodId === "sine-rule") {
    return (
      <span className="tm-formula-row">
        <FormulaFraction top="a" bottom="sin A" />
        <span> = </span>
        <FormulaFraction top="b" bottom="sin B" />
      </span>
    );
  }

  if (methodId === "cosine-rule-side") {
    return (
      <>
        a² = b² + c² − 2bc cos A
      </>
    );
  }

  if (methodId === "cosine-rule-angle") {
    return (
      <span className="tm-formula-row">
        <span>cos A = </span>
        <FormulaFraction top="b² + c² − a²" bottom="2bc" />
      </span>
    );
  }

  return (
    <span className="tm-formula-row">
      <span>A = </span>
      <FormulaFraction top="1" bottom="2" />
      <span>ab sin C</span>
    </span>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="tm-stat" style={{ "--accent": accent }}>
      <div className="tm-stat-value">{value}</div>
      <div className="tm-stat-label">{label}</div>
    </div>
  );
}

const DIAGRAMS = {
  right: {
    vertices: {
      A: { x: 52, y: 292 },
      B: { x: 328, y: 292 },
      C: { x: 52, y: 60 },
    },
    sideLabels: {
      AB: { x: 190, y: 321, anchor: "middle" },
      AC: { x: 25, y: 180, anchor: "middle" },
      BC: { x: 215, y: 165, anchor: "middle" },
    },
    angleLabels: {
      A: { x: 78, y: 267, anchor: "start" },
      B: { x: 294, y: 268, anchor: "middle" },
      C: { x: 71, y: 94, anchor: "start" },
    },
    area: { x: 142, y: 215, anchor: "middle" },
  },
  oblique: {
    vertices: {
      A: { x: 45, y: 292 },
      B: { x: 340, y: 292 },
      C: { x: 150, y: 58 },
    },
    sideLabels: {
      AB: { x: 192, y: 321, anchor: "middle" },
      AC: { x: 79, y: 174, anchor: "middle" },
      BC: { x: 265, y: 166, anchor: "middle" },
    },
    angleLabels: {
      A: { x: 79, y: 267, anchor: "start" },
      B: { x: 303, y: 267, anchor: "middle" },
      C: { x: 150, y: 100, anchor: "middle" },
    },
    area: { x: 172, y: 214, anchor: "middle" },
  },
};

const DIAGRAM_VARIANTS = {
  right: [
    DIAGRAMS.right,
    {
      vertices: {
        A: { x: 60, y: 292 },
        B: { x: 350, y: 292 },
        C: { x: 60, y: 78 },
      },
      sideLabels: {
        AB: { x: 205, y: 321, anchor: "middle" },
        AC: { x: 32, y: 185, anchor: "middle" },
        BC: { x: 222, y: 175, anchor: "middle" },
      },
      angleLabels: {
        A: { x: 86, y: 267, anchor: "start" },
        B: { x: 314, y: 268, anchor: "middle" },
        C: { x: 80, y: 112, anchor: "start" },
      },
      area: { x: 156, y: 214, anchor: "middle" },
    },
    {
      vertices: {
        A: { x: 70, y: 288 },
        B: { x: 318, y: 288 },
        C: { x: 70, y: 44 },
      },
      sideLabels: {
        AB: { x: 194, y: 318, anchor: "middle" },
        AC: { x: 38, y: 172, anchor: "middle" },
        BC: { x: 214, y: 153, anchor: "middle" },
      },
      angleLabels: {
        A: { x: 96, y: 263, anchor: "start" },
        B: { x: 286, y: 264, anchor: "middle" },
        C: { x: 91, y: 80, anchor: "start" },
      },
      area: { x: 152, y: 204, anchor: "middle" },
    },
  ],
  oblique: [
    DIAGRAMS.oblique,
    {
      vertices: {
        A: { x: 42, y: 292 },
        B: { x: 348, y: 292 },
        C: { x: 244, y: 58 },
      },
      sideLabels: {
        AB: { x: 195, y: 321, anchor: "middle" },
        AC: { x: 132, y: 165, anchor: "middle" },
        BC: { x: 307, y: 172, anchor: "middle" },
      },
      angleLabels: {
        A: { x: 78, y: 267, anchor: "start" },
        B: { x: 314, y: 267, anchor: "middle" },
        C: { x: 238, y: 101, anchor: "middle" },
      },
      area: { x: 210, y: 214, anchor: "middle" },
    },
    {
      vertices: {
        A: { x: 58, y: 292 },
        B: { x: 340, y: 292 },
        C: { x: 112, y: 70 },
      },
      sideLabels: {
        AB: { x: 199, y: 321, anchor: "middle" },
        AC: { x: 66, y: 174, anchor: "middle" },
        BC: { x: 245, y: 172, anchor: "middle" },
      },
      angleLabels: {
        A: { x: 91, y: 267, anchor: "start" },
        B: { x: 302, y: 267, anchor: "middle" },
        C: { x: 113, y: 111, anchor: "middle" },
      },
      area: { x: 165, y: 218, anchor: "middle" },
    },
  ],
};

function TriangleDiagram({ q }) {
  const diagram = q.diagram;
  const variants = DIAGRAM_VARIANTS[diagram.layout] || [DIAGRAMS[diagram.layout]];
  const spec = variants[diagram.variant % variants.length] || variants[0];
  const { A, B, C: vertexC } = spec.vertices;
  const sides = diagram.sides || {};
  const angles = diagram.angles || {};
  const labelIsTarget = isTargetLabel;

  return (
    <svg
      className="tm-diagram"
      viewBox="0 0 390 340"
      role="img"
      aria-label={`Triangle diagram. ${q.prompt}`}
    >
      <polygon
        className="tm-triangle-fill"
        points={`${A.x},${A.y} ${B.x},${B.y} ${vertexC.x},${vertexC.y}`}
      />
      <line className="tm-triangle-side" x1={A.x} y1={A.y} x2={B.x} y2={B.y} />
      <line className="tm-triangle-side" x1={A.x} y1={A.y} x2={vertexC.x} y2={vertexC.y} />
      <line className="tm-triangle-side" x1={B.x} y1={B.y} x2={vertexC.x} y2={vertexC.y} />

      {diagram.rightAngle === "A" && (
        <path className="tm-right-angle" d={`M ${A.x + 21} ${A.y} L ${A.x + 21} ${A.y - 21} L ${A.x} ${A.y - 21}`} />
      )}

      {Object.entries(sides).map(([edge, label]) => {
        const point = spec.sideLabels[edge];
        return (
          <text
            key={edge}
            className={`tm-diagram-label ${labelIsTarget(label) ? "is-target" : ""}`}
            x={point.x}
            y={point.y}
            textAnchor={point.anchor}
          >
            {label}
          </text>
        );
      })}

      {Object.entries(angles).map(([vertex, label]) => {
        const point = spec.angleLabels[vertex];
        return (
          <text
            key={vertex}
            className={`tm-angle-label ${labelIsTarget(label) ? "is-target" : ""}`}
            x={point.x}
            y={point.y}
            textAnchor={point.anchor}
          >
            {label}
          </text>
        );
      })}

      {diagram.areaLabel && (
        <text
          className="tm-area-label is-target"
          x={spec.area.x}
          y={spec.area.y}
          textAnchor={spec.area.anchor}
        >
          {diagram.areaLabel}
        </text>
      )}
    </svg>
  );
}

function MethodOptions({ selected, result, onSelect }) {
  return (
    <div className="tm-options" aria-label="formula choices">
      {METHOD_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`tm-option ${selected === option.id ? "is-selected" : ""} ${
            result && result.expectedId === option.id ? "is-answer" : ""
          } ${result && result.selectedId === option.id && !result.correct ? "is-miss" : ""}`}
          onClick={() => onSelect(option.id)}
          disabled={Boolean(result)}
        >
          <span className="tm-option-name">{option.name}</span>
          <span className="tm-option-formula" aria-label={option.formula}>
            <FormulaDisplay methodId={option.id} />
          </span>
        </button>
      ))}
    </div>
  );
}

function Feedback({ result }) {
  if (!result) return null;

  return (
    <div className={`tm-feedback ${result.correct ? "is-correct" : "is-miss"}`}>
      <div>
        <span>{result.correct ? "Correct" : "Incorrect"}</span>
        <strong>{result.expectedName}</strong>
      </div>
      <p>{result.explanation}</p>
    </div>
  );
}

function ReviewRow({ item, index }) {
  return (
    <div className={`tm-review-row ${item.correct ? "is-correct" : "is-miss"}`}>
      <div className="tm-review-number">{index + 1}</div>
      <div className="tm-review-main">
        <div className="tm-review-question">{item.question}</div>
        <div className="tm-review-kind">{item.kind}</div>
      </div>
      <div className="tm-review-values">
        <span>
          Selected <strong>{item.selectedName}</strong>
        </span>
        <span>
          Formula <strong>{item.expectedName}</strong>
        </span>
      </div>
    </div>
  );
}

function WidgetStyle() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=JetBrains+Mono:wght@400;600;700;800&display=swap');

.tm-root, .tm-root * {
  box-sizing: border-box;
}

.tm-root {
  min-height: calc(100vh - 54px);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 12px;
  background: var(--paper);
  color: var(--ink);
  font-family: "Bricolage Grotesque", system-ui, sans-serif;
}

.tm-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .52;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(circle at 50% 22%, #000 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 22%, #000 0%, transparent 78%);
}

.tm-card {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 6px;
  box-shadow: 7px 8px 0 var(--ink);
  padding: 22px 24px 28px;
  transition: max-width .25s ease;
  animation: tm-riseIn 450ms cubic-bezier(.2,.8,.2,1);
}

.tm-card.is-running,
.tm-card.is-review {
  max-width: 1120px;
}

.tm-title {
  margin: 0;
  font-family: "Fraunces", Georgia, serif;
  font-size: 30px;
  line-height: 1.1;
  font-weight: 600;
  color: var(--ink);
}

.tm-title span {
  color: var(--teal);
  font-style: italic;
  font-weight: 500;
}

.tm-subtitle {
  margin: 7px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 500;
}

.tm-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: 24px;
  text-align: center;
}

.tm-button {
  min-height: 48px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  padding: 13px 22px;
  font: 700 15px/1 "Bricolage Grotesque", system-ui, sans-serif;
  color: var(--ink);
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
}

.tm-button:disabled {
  cursor: not-allowed;
  opacity: .45;
}

.tm-button:focus-visible,
.tm-option:focus-visible,
.tm-timer-toggle:focus-within {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

.tm-button.primary {
  min-width: 210px;
  background: var(--red);
  box-shadow: 4px 4px 0 var(--ink);
}

.tm-button.submit {
  width: 100%;
  margin-top: 14px;
  background: var(--ink);
  color: var(--card);
  box-shadow: 4px 4px 0 var(--gold);
}

.tm-button.secondary {
  background: var(--paper2);
  box-shadow: 3px 3px 0 var(--ink);
}

.tm-button.link {
  min-height: 0;
  width: 100%;
  margin-top: 12px;
  padding: 8px 10px;
  border: 0;
  background: transparent;
  box-shadow: none;
  color: var(--ink-soft);
  text-decoration: underline;
}

.tm-timer-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: min(100%, 330px);
  padding: 12px 14px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--paper);
  box-shadow: 3px 3px 0 var(--gold);
  color: var(--ink);
  cursor: pointer;
}

.tm-timer-toggle input {
  width: 20px;
  height: 20px;
  margin: 0;
  accent-color: var(--teal);
  cursor: pointer;
}

.tm-timer-toggle span {
  flex: 1 1 auto;
  text-align: left;
  font-size: 14px;
  font-weight: 700;
}

.tm-timer-toggle strong {
  color: var(--teal);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 13px;
  font-weight: 800;
}

.tm-stats {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.tm-stat {
  min-width: 118px;
  flex: 1 1 118px;
  max-width: 154px;
  padding: 12px 14px 13px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--paper);
  box-shadow: 3px 3px 0 var(--accent);
  text-align: left;
  animation: tm-popIn 500ms cubic-bezier(.2,.8,.2,1);
}

.tm-stat-value {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 23px;
  line-height: 1;
  font-weight: 800;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.tm-stat-label {
  margin-top: 7px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}

.tm-tagline {
  max-width: 470px;
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.45;
  font-weight: 500;
}

.tm-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 2px solid var(--line);
}

.tm-time,
.tm-practice-label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: clamp(28px, 7vw, 40px);
  line-height: 1;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.tm-practice-label {
  color: var(--teal);
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-weight: 600;
}

.tm-time-label {
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

.tm-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 9px;
  min-width: 132px;
}

.tm-progress-label {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

.tm-run-counts {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.tm-run-counts span {
  padding: 5px 8px;
  border: 2px solid var(--ink);
  background: var(--gold-tint);
  box-shadow: 2px 2px 0 var(--gold);
  border-radius: 6px;
  color: var(--ink);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
  font-weight: 800;
}

.tm-stage {
  display: grid;
  grid-template-columns: minmax(320px, .9fr) minmax(0, 1.1fr);
  gap: 18px;
  align-items: start;
  margin-top: 18px;
}

.tm-diagram-panel,
.tm-work-panel {
  min-width: 0;
}

.tm-diagram-panel {
  padding: 12px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--paper);
  box-shadow: 4px 4px 0 var(--teal);
}

.tm-diagram {
  display: block;
  width: 100%;
  aspect-ratio: 390 / 340;
}

.tm-triangle-fill {
  fill: var(--card);
  stroke: none;
}

.tm-triangle-side {
  stroke: var(--ink);
  stroke-width: 4;
  stroke-linecap: round;
}

.tm-right-angle {
  fill: none;
  stroke: var(--teal);
  stroke-width: 3;
  stroke-linejoin: round;
}

.tm-diagram-label,
.tm-angle-label,
.tm-area-label {
  fill: var(--ink);
  stroke: var(--paper);
  stroke-width: 8px;
  paint-order: stroke;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.tm-diagram-label {
  font-size: 18px;
}

.tm-angle-label {
  font-size: 17px;
}

.tm-area-label {
  font-size: 20px;
}

.tm-diagram-label.is-target,
.tm-angle-label.is-target,
.tm-area-label.is-target {
  fill: var(--red);
}

.tm-question-wrap {
  min-height: 130px;
  padding: 16px 16px 18px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--paper);
  box-shadow: 4px 4px 0 var(--gold);
  animation: tm-qIn 300ms cubic-bezier(.2,.9,.3,1);
}

.tm-type {
  margin: 0 0 10px;
  color: var(--gold);
  font-size: 13px;
  font-weight: 700;
}

.tm-prompt {
  margin: 0;
  color: var(--ink);
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(25px, 4.4vw, 34px);
  line-height: 1.1;
  font-weight: 600;
}

.tm-hint {
  margin: 10px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.35;
  font-weight: 700;
}

.tm-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.tm-option {
  min-height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 12px 13px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--paper2);
  color: var(--ink);
  box-shadow: 3px 3px 0 var(--ink);
  cursor: pointer;
  text-align: left;
  transition: background-color 150ms ease, box-shadow 150ms ease;
}

.tm-option:disabled {
  cursor: default;
}

.tm-option.is-selected {
  background: var(--teal-tint);
  box-shadow: 3px 3px 0 var(--teal);
}

.tm-option.is-answer {
  background: var(--green-tint);
  box-shadow: 3px 3px 0 var(--green);
}

.tm-option.is-miss {
  background: var(--red-tint);
  box-shadow: 3px 3px 0 var(--red);
}

.tm-option-name {
  font-size: 14px;
  line-height: 1.1;
  font-weight: 800;
}

.tm-option-formula {
  display: block;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 13px;
  line-height: 1.25;
  font-weight: 800;
}

.tm-formula-row {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px;
}

.tm-formula-frac {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-width: 1.6ch;
  margin: 0 1px;
  line-height: 1;
  vertical-align: middle;
}

.tm-formula-frac-top,
.tm-formula-frac-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1em;
  padding: 0 4px;
  white-space: nowrap;
}

.tm-formula-frac-line {
  width: 100%;
  border-top: 2px solid currentColor;
  margin: 2px 0;
}

.tm-feedback {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding: 12px;
  border: 2px solid var(--feedback-color);
  border-radius: 6px;
  background: var(--feedback-bg);
  animation: tm-popIn 250ms cubic-bezier(.2,.8,.2,1);
}

.tm-feedback.is-correct {
  --feedback-color: var(--green);
  --feedback-bg: var(--green-tint);
}

.tm-feedback.is-miss {
  --feedback-color: var(--red-deep);
  --feedback-bg: var(--red-tint);
}

.tm-feedback div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.tm-feedback span {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

.tm-feedback strong {
  color: var(--feedback-color);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 15px;
  font-weight: 800;
  text-align: right;
}

.tm-feedback p {
  margin: 0;
  color: var(--ink);
  font-size: 13px;
  line-height: 1.4;
  font-weight: 700;
}

.tm-review {
  padding-top: 22px;
}

.tm-review-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 18px;
  border-top: 2px solid var(--line);
}

.tm-stamp {
  display: inline-block;
  padding: 7px 18px 10px;
  border: 3px solid var(--red-deep);
  border-radius: 6px;
  color: var(--red-deep);
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(32px, 8vw, 48px);
  line-height: 1;
  font-style: italic;
  font-weight: 600;
  transform: rotate(-2deg);
  animation: tm-stampIn 550ms cubic-bezier(.2,.9,.3,1.2);
}

.tm-review-note {
  margin: 8px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
  font-weight: 700;
}

.tm-review-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.tm-review-list {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.tm-review-row {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) minmax(220px, 330px);
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--paper);
  box-shadow: 3px 3px 0 var(--row-accent);
}

.tm-review-row.is-correct {
  --row-accent: var(--green);
}

.tm-review-row.is-miss {
  --row-accent: var(--red);
}

.tm-review-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--gold-tint);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-weight: 800;
}

.tm-review-question {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 16px;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.tm-review-kind {
  margin-top: 4px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}

.tm-review-values {
  display: grid;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
}

.tm-review-values span {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--card);
}

.tm-review-values strong {
  color: var(--ink);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-weight: 800;
  text-align: right;
}

.tm-empty-review {
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-weight: 700;
}

@keyframes tm-riseIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes tm-popIn {
  from { opacity: 0; transform: scale(.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes tm-qIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes tm-stampIn {
  from { opacity: 0; transform: rotate(-8deg) scale(.9); }
  to { opacity: 1; transform: rotate(-2deg) scale(1); }
}

@media (max-width: 900px) {
  .tm-root {
    align-items: flex-start;
    padding-top: 12px;
  }

  .tm-card {
    padding: 18px 16px 22px;
  }

  .tm-stage {
    grid-template-columns: 1fr;
  }

  .tm-diagram {
    max-height: 420px;
  }
}

@media (max-width: 640px) {
  .tm-topbar,
  .tm-review-head {
    align-items: stretch;
    flex-direction: column;
  }

  .tm-progress {
    align-items: flex-start;
  }

  .tm-run-counts {
    justify-content: flex-start;
  }

  .tm-options {
    grid-template-columns: 1fr;
  }

  .tm-feedback div {
    display: block;
  }

  .tm-feedback strong {
    display: block;
    margin-top: 5px;
    text-align: left;
  }

  .tm-review-row {
    grid-template-columns: 36px minmax(0, 1fr);
  }

  .tm-review-values {
    grid-column: 1 / -1;
  }
}
    `}</style>
  );
}

export function TriangleMethodWidget() {
  const [phase, setPhase] = useState("home");
  const [queue, setQueue] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState([]);
  const [review, setReview] = useState([]);
  const [bestTimed, setBestTimed] = useState(null);
  const [recentResult, setRecentResult] = useState(null);
  const [currentCorrect, setCurrentCorrect] = useState(0);
  const [currentMisses, setCurrentMisses] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [lastWasBest, setLastWasBest] = useState(false);
  const startRef = useRef(0);

  const q = question;
  const isRunning = phase === "running";
  const isReview = phase === "review";
  const remainingMs = Math.max(0, RUN_MS - elapsed);
  const answered = history.length;

  const finishRun = (score = currentCorrect, entries = history) => {
    const summary = `${score} in 2:00`;
    const isNewBest = bestTimed == null || score > bestTimed;
    if (isNewBest) setBestTimed(score);
    setRecentResult(summary);
    setLastWasBest(isNewBest);
    setReview(entries);
    setElapsed(RUN_MS);
    setResult(null);
    setSelected(null);
    setPhase("review");
  };

  useEffect(() => {
    if (phase !== "running") return undefined;
    let raf;
    const tick = () => {
      const nextElapsed = performance.now() - startRef.current;
      if (nextElapsed >= RUN_MS) {
        finishRun(currentCorrect, history);
        return;
      }
      setElapsed(nextElapsed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, currentCorrect, history, bestTimed]);

  const start = () => {
    const next = drawQuestion([]);
    setQuestion(next.question);
    setQueue(next.queue);
    setSelected(null);
    setResult(null);
    setElapsed(0);
    setHistory([]);
    setReview([]);
    setCurrentCorrect(0);
    setCurrentMisses(0);
    setLastWasBest(false);
    setTotalAttempts((count) => count + 1);
    startRef.current = performance.now();
    setPhase("running");
  };

  const goHome = () => {
    setPhase("home");
    setQuestion(null);
    setSelected(null);
    setResult(null);
  };

  const moveToNextQuestion = (sourceQueue = queue) => {
    const next = drawQuestion(sourceQueue);
    setQuestion(next.question);
    setQueue(next.queue);
    setSelected(null);
    setResult(null);
  };

  const submit = () => {
    if (!q || !selected || result) return;
    if (performance.now() - startRef.current >= RUN_MS) {
      finishRun(currentCorrect, history);
      return;
    }

    const selectedMethod = METHOD_BY_ID[selected];
    const expectedMethod = METHOD_BY_ID[q.method];
    const correct = selected === q.method;
    const entry = {
      id: q.id,
      question: makeReviewQuestion(q),
      kind: q.tag,
      selectedId: selected,
      selectedName: selectedMethod.name,
      expectedId: q.method,
      expectedName: expectedMethod.name,
      expectedFormula: expectedMethod.formula,
      explanation: q.explanation,
      correct,
    };
    const nextHistory = [...history, entry];
    const nextCorrect = currentCorrect + (correct ? 1 : 0);
    const nextMisses = currentMisses + (correct ? 0 : 1);

    setHistory(nextHistory);
    setCurrentCorrect(nextCorrect);
    setCurrentMisses(nextMisses);
    if (correct) setTotalCorrect((count) => count + 1);
    setResult(entry);
  };

  const continueRun = () => {
    moveToNextQuestion();
  };

  const vars = {
    "--paper": C.paper,
    "--paper2": C.paper2,
    "--card": C.card,
    "--ink": C.ink,
    "--ink-soft": C.inkSoft,
    "--line": C.line,
    "--red": C.red,
    "--red-deep": C.redDeep,
    "--red-tint": C.redTint,
    "--teal": C.teal,
    "--teal-tint": C.tealTint,
    "--gold": C.gold,
    "--gold-tint": C.goldTint,
    "--green": C.green,
    "--green-tint": C.greenTint,
  };

  return (
    <div className="tm-root" style={vars}>
      <WidgetStyle />
      <div className="tm-bg" />
      <main className={`tm-card ${isRunning ? "is-running" : ""} ${isReview ? "is-review" : ""}`}>
        <header>
          <h1 className="tm-title">
            Triangle Methods <span>· Formula Choice</span>
          </h1>
          <p className="tm-subtitle">
            Pythagoras, SOH CAH TOA, sine rule, cosine rule, and area
          </p>
        </header>

        {phase === "home" && (
          <section className="tm-home">
            <button type="button" className="tm-button primary" onClick={start}>
              Start 2 minutes
            </button>

            <div className="tm-stats" aria-label="session stats">
              <StatCard label="Best 2 min" value={statScore(bestTimed)} accent={C.teal} />
              <StatCard label="Last review" value={statScore(recentResult)} accent={C.gold} />
              <StatCard label="Correct so far" value={totalCorrect} accent={C.green} />
              <StatCard label="Attempts" value={totalAttempts} accent={C.redDeep} />
            </div>

            <p className="tm-tagline">
              Students choose the formula they would apply first. The run lasts two minutes
              and mixes right-angled triangles, non-right-angled triangles, missing sides,
              missing angles and area.
            </p>
          </section>
        )}

        {phase === "running" && q && (
          <section>
            <div className="tm-topbar">
              <div>
                <div className="tm-time">{fmt(remainingMs)}</div>
                <div className="tm-time-label">time left</div>
              </div>
              <div className="tm-progress">
                <div className="tm-progress-label">Correct {currentCorrect}</div>
                <div className="tm-run-counts">
                  <span>Misses {currentMisses}</span>
                  <span>Answered {answered}</span>
                </div>
              </div>
            </div>

            <div className="tm-stage">
              <div className="tm-diagram-panel">
                <TriangleDiagram q={q} />
              </div>

              <div className="tm-work-panel">
                <div className="tm-question-wrap" key={q.id}>
                  <p className="tm-type">{q.tag}</p>
                  <p className="tm-prompt">{q.prompt}</p>
                  <p className="tm-hint">Select the formula you would apply before calculating.</p>
                </div>

                <MethodOptions selected={selected} result={result} onSelect={setSelected} />
                <Feedback result={result} />

                {result ? (
                  <button type="button" className="tm-button submit" onClick={continueRun}>
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="tm-button submit"
                    onClick={submit}
                    disabled={!selected}
                  >
                    Submit
                  </button>
                )}

                <button type="button" className="tm-button link" onClick={() => finishRun(currentCorrect, history)}>
                  End and review
                </button>
              </div>
            </div>
          </section>
        )}

        {phase === "review" && (
          <section className="tm-review">
            <div className="tm-review-head">
              <div>
                <div className="tm-stamp">{currentCorrect} correct</div>
                <p className="tm-review-note">
                  Two-minute run
                  {lastWasBest ? " - new best 2 min" : ""}
                </p>
              </div>
              <div className="tm-review-actions">
                <button type="button" className="tm-button primary" onClick={start}>
                  Try again
                </button>
                <button type="button" className="tm-button secondary" onClick={goHome}>
                  Home
                </button>
              </div>
            </div>

            {review.length > 0 ? (
              <div className="tm-review-list">
                {review.map((item, index) => (
                  <ReviewRow key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <p className="tm-empty-review">No submitted answers in this run.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default TriangleMethodWidget;
