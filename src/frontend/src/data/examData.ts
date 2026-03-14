export interface Question {
  id: string;
  text: string;
  answer: string;
  marks: number;
}

export interface ExamPaper {
  id: string;
  title: string;
  year: number;
  classId: string;
  subject: string;
  questions: Question[];
  duration: string;
  totalMarks: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ClassInfo {
  id: string;
  label: string;
  level: "primary" | "middle" | "secondary" | "senior";
}

export const CLASSES: ClassInfo[] = [
  { id: "class1", label: "Class 1", level: "primary" },
  { id: "class2", label: "Class 2", level: "primary" },
  { id: "class3", label: "Class 3", level: "primary" },
  { id: "class4", label: "Class 4", level: "primary" },
  { id: "class5", label: "Class 5", level: "primary" },
  { id: "class6", label: "Class 6", level: "middle" },
  { id: "class7", label: "Class 7", level: "middle" },
  { id: "class8", label: "Class 8", level: "middle" },
  { id: "class9", label: "Class 9", level: "secondary" },
  { id: "class10", label: "Class 10", level: "secondary" },
  { id: "class11", label: "Class 11", level: "senior" },
  { id: "class12", label: "Class 12", level: "senior" },
];

const SUBJECTS_BY_LEVEL: Record<string, Subject[]> = {
  primary: [
    {
      id: "maths",
      name: "Mathematics",
      icon: "📐",
      color: "bg-blue-50 text-blue-700",
    },
    {
      id: "english",
      name: "English",
      icon: "📖",
      color: "bg-green-50 text-green-700",
    },
    {
      id: "evs",
      name: "Environment Studies",
      icon: "🌿",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      id: "hindi",
      name: "Hindi",
      icon: "🗣️",
      color: "bg-orange-50 text-orange-700",
    },
  ],
  middle: [
    {
      id: "maths",
      name: "Mathematics",
      icon: "📐",
      color: "bg-blue-50 text-blue-700",
    },
    {
      id: "science",
      name: "Science",
      icon: "🔬",
      color: "bg-purple-50 text-purple-700",
    },
    {
      id: "english",
      name: "English",
      icon: "📖",
      color: "bg-green-50 text-green-700",
    },
    {
      id: "social",
      name: "Social Studies",
      icon: "🌍",
      color: "bg-amber-50 text-amber-700",
    },
    {
      id: "hindi",
      name: "Hindi",
      icon: "🗣️",
      color: "bg-orange-50 text-orange-700",
    },
  ],
  secondary: [
    {
      id: "maths",
      name: "Mathematics",
      icon: "📐",
      color: "bg-blue-50 text-blue-700",
    },
    {
      id: "science",
      name: "Science",
      icon: "🔬",
      color: "bg-purple-50 text-purple-700",
    },
    {
      id: "english",
      name: "English",
      icon: "📖",
      color: "bg-green-50 text-green-700",
    },
    {
      id: "social",
      name: "Social Studies",
      icon: "🌍",
      color: "bg-amber-50 text-amber-700",
    },
    {
      id: "hindi",
      name: "Hindi",
      icon: "🗣️",
      color: "bg-orange-50 text-orange-700",
    },
    {
      id: "sanskrit",
      name: "Sanskrit",
      icon: "📜",
      color: "bg-red-50 text-red-700",
    },
  ],
  senior: [
    {
      id: "maths",
      name: "Mathematics",
      icon: "📐",
      color: "bg-blue-50 text-blue-700",
    },
    {
      id: "physics",
      name: "Physics",
      icon: "⚡",
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: "⚗️",
      color: "bg-purple-50 text-purple-700",
    },
    {
      id: "biology",
      name: "Biology",
      icon: "🧬",
      color: "bg-green-50 text-green-700",
    },
    {
      id: "english",
      name: "English",
      icon: "📖",
      color: "bg-teal-50 text-teal-700",
    },
    {
      id: "economics",
      name: "Economics",
      icon: "📊",
      color: "bg-amber-50 text-amber-700",
    },
    {
      id: "accounts",
      name: "Accountancy",
      icon: "🧾",
      color: "bg-rose-50 text-rose-700",
    },
    {
      id: "cs",
      name: "Computer Science",
      icon: "💻",
      color: "bg-slate-50 text-slate-700",
    },
  ],
};

export function getSubjectsForClass(classId: string): Subject[] {
  const cls = CLASSES.find((c) => c.id === classId);
  if (!cls) return [];
  return SUBJECTS_BY_LEVEL[cls.level] || [];
}

// Sample questions helper
function q(id: string, text: string, answer: string, marks = 5): Question {
  return { id, text, answer, marks };
}

export const EXAM_PAPERS: ExamPaper[] = [
  // CLASS 10 Mathematics
  {
    id: "c10-math-2024",
    classId: "class10",
    subject: "maths",
    title: "Mathematics Board Exam 2024",
    year: 2024,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Find the HCF of 26 and 91 using Euclid's division algorithm.",
        "Apply Euclid's division algorithm: 91 = 26×3 + 13, then 26 = 13×2 + 0. Since remainder is 0, HCF(26, 91) = 13.",
      ),
      q(
        "q2",
        "Prove that √2 is irrational.",
        "Assume √2 = p/q where p, q are coprime integers. Then 2q² = p², so p² is even, hence p is even. Write p = 2m. Then 2q² = 4m², so q² = 2m², meaning q is even. This contradicts p, q being coprime. Hence √2 is irrational.",
      ),
      q(
        "q3",
        "Solve: 2x + 3y = 11 and 2x – 4y = -24. Find x and y.",
        "Subtract the equations: 7y = 35, so y = 5. Substituting: 2x + 15 = 11, 2x = -4, x = -2. Therefore x = -2, y = 5.",
      ),
      q(
        "q4",
        "The sum of first n terms of an AP is 3n² + 5n. Find the AP.",
        "S₁ = 3(1)² + 5(1) = 8 = a₁. S₂ = 3(4)+10 = 22 = a₁+a₂, so a₂ = 14. Common difference d = 14 - 8 = 6. AP: 8, 14, 20, 26, ...",
      ),
      q(
        "q5",
        "A ladder 10 m long reaches a window 6 m above the ground. Find the distance of the foot of the ladder from the base of the wall.",
        "Using Pythagoras theorem: base² = 10² - 6² = 100 - 36 = 64. Base = 8 m. The foot of the ladder is 8 m from the wall.",
      ),
      q(
        "q6",
        "Find the coordinates of the centroid of the triangle whose vertices are (4, -3), (-9, 7) and (2, 3).",
        "Centroid = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3) = ((4-9+2)/3, (-3+7+3)/3) = (-3/3, 7/3) = (-1, 7/3).",
      ),
      q(
        "q7",
        "A box contains 5 red balls, 8 white balls and 4 green balls. One ball is taken out at random. What is the probability of getting a white ball?",
        "Total balls = 5 + 8 + 4 = 17. P(white) = 8/17 ≈ 0.47.",
      ),
    ],
  },
  {
    id: "c10-math-2023",
    classId: "class10",
    subject: "maths",
    title: "Mathematics Board Exam 2023",
    year: 2023,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Find the quadratic polynomial whose sum and product of zeroes are -3 and 2 respectively.",
        "p(x) = x² - (sum)x + product = x² - (-3)x + 2 = x² + 3x + 2.",
      ),
      q(
        "q2",
        "If the system of equations 2x + 3y = 7 and (a+b)x + (2a-b)y = 21 has infinite solutions, find a and b.",
        "For infinite solutions: 2/(a+b) = 3/(2a-b) = 7/21. From 7/21 = 1/3: 2/(a+b) = 1/3, so a+b = 6. And 3/(2a-b) = 1/3, so 2a-b = 9. Solving: a = 5, b = 1.",
      ),
      q(
        "q3",
        "Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact.",
        "Let O be the centre, P the point of tangency, and AB the tangent. Take any point Q on AB other than P. Q lies outside the circle (since AB is tangent), so OQ > OP. This holds for every point on AB except P, so OP is the shortest distance from O to AB. Hence OP ⊥ AB.",
      ),
      q(
        "q4",
        "Find the area of the sector of a circle with radius 4 cm and angle 30°. (Use π = 3.14)",
        "Area = (θ/360) × πr² = (30/360) × 3.14 × 16 = (1/12) × 50.24 ≈ 4.19 cm².",
      ),
      q(
        "q5",
        "A hemispherical depression is cut out from one face of a cubical wooden block of side 7 cm. Find the total surface area. (Use π = 22/7)",
        "TSA = 6a² - πr² + 2πr² = 6(49) - (22/7)(49/4) + 2(22/7)(49/4) = 294 + (22×7/4) = 294 + 38.5 = 332.5 cm² (approx). Full working: TSA = 5a² + πr² + 2πr² where r = 7/2. = 5(49) + (22/7)(49/4) + ... ≈ 332.5 cm².",
      ),
    ],
  },
  {
    id: "c10-math-2022",
    classId: "class10",
    subject: "maths",
    title: "Mathematics Board Exam 2022",
    year: 2022,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Express 156 as a product of its prime factors.",
        "156 = 2 × 78 = 2 × 2 × 39 = 2 × 2 × 3 × 13 = 2² × 3 × 13.",
      ),
      q(
        "q2",
        "Find the discriminant of x² + 5x + 6 = 0 and find the nature of roots.",
        "D = b² - 4ac = 25 - 24 = 1. Since D > 0, the roots are real and distinct.",
      ),
      q(
        "q3",
        "In triangle ABC, DE ∥ BC. If AD/DB = 3/5 and AC = 5.6 cm, find AE.",
        "By BPT, AD/DB = AE/EC = 3/5. So AE = (3/8) × AC = (3/8) × 5.6 = 2.1 cm.",
      ),
    ],
  },
  // CLASS 10 Science
  {
    id: "c10-sci-2024",
    classId: "class10",
    subject: "science",
    title: "Science Board Exam 2024",
    year: 2024,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        'Define the term "refraction" and state Snell\'s law.',
        "Refraction is the bending of light as it passes from one transparent medium to another due to change in speed. Snell's Law: n₁ sin θ₁ = n₂ sin θ₂, where n₁, n₂ are refractive indices and θ₁, θ₂ are angles of incidence and refraction.",
      ),
      q(
        "q2",
        "What is the difference between a gene and a chromosome?",
        "A gene is a specific segment of DNA that codes for a particular protein or trait. A chromosome is a thread-like structure made up of DNA and protein, containing many genes. Humans have 46 chromosomes arranged in 23 pairs, each containing thousands of genes.",
      ),
      q(
        "q3",
        "Explain the process of photosynthesis with equation.",
        "Photosynthesis is the process by which green plants make food using sunlight. It occurs in chloroplasts. Equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Light energy is absorbed by chlorophyll, CO₂ from air through stomata, water from soil through roots.",
      ),
      q(
        "q4",
        "What is meant by Ohm's Law? Write its mathematical expression.",
        "Ohm's Law states that the current flowing through a conductor is directly proportional to the potential difference across its ends, provided temperature and other physical conditions remain constant. Mathematically: V = IR, where V = voltage, I = current, R = resistance.",
      ),
      q(
        "q5",
        "List three effects of the magnetic field produced by a current-carrying conductor.",
        "1. Magnetic effect: A current-carrying conductor produces a magnetic field around it (demonstrated by deflection of a compass needle). 2. Heating effect: When current passes through a resistance, heat is produced (H = I²Rt). 3. Chemical effect: Current can cause electrolysis of solutions.",
      ),
      q(
        "q6",
        "What is meant by sustainable management of natural resources? Why is it necessary?",
        "Sustainable management means using natural resources carefully so they last for present and future generations. It is necessary because: 1. Resources like fossil fuels are limited. 2. Over-exploitation leads to environmental degradation. 3. Biodiversity must be preserved. 4. Future generations must have equal access.",
      ),
    ],
  },
  {
    id: "c10-sci-2023",
    classId: "class10",
    subject: "science",
    title: "Science Board Exam 2023",
    year: 2023,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Differentiate between autotrophic and heterotrophic nutrition with examples.",
        "Autotrophic nutrition: organism prepares own food from inorganic substances using sunlight (photosynthesis). Examples: green plants, algae, cyanobacteria. Heterotrophic nutrition: organism depends on other organisms for food. Examples: humans, animals, fungi. Subtypes include holozoic (animals), saprophytic (fungi), parasitic (tapeworm).",
      ),
      q(
        "q2",
        "What happens to the image formed by a concave mirror as the object is moved from infinity to the focus?",
        "At infinity: image at F, highly diminished, real, inverted. Beyond C: image between F and C, diminished, real, inverted. At C: image at C, same size, real, inverted. Between C and F: image beyond C, enlarged, real, inverted. At F: image at infinity. Between F and P: image behind mirror, enlarged, virtual, erect.",
      ),
    ],
  },
  {
    id: "c10-sci-2022",
    classId: "class10",
    subject: "science",
    title: "Science Board Exam 2022",
    year: 2022,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "What is the difference between physical and chemical change? Give two examples of each.",
        "Physical change: Change in form, no new substance formed, reversible. Examples: melting of ice, tearing paper. Chemical change: New substance formed, usually irreversible, change in chemical properties. Examples: burning of wood, rusting of iron.",
      ),
      q(
        "q2",
        "Describe the structure of the human heart and explain how blood is pumped.",
        "The heart has 4 chambers: right atrium, right ventricle, left atrium, left ventricle. Deoxygenated blood enters right atrium → right ventricle → lungs (pulmonary circulation). Oxygenated blood returns to left atrium → left ventricle → body (systemic circulation). Valves prevent backflow. Average 72 beats/minute.",
      ),
    ],
  },
  // CLASS 12 Mathematics
  {
    id: "c12-math-2024",
    classId: "class12",
    subject: "maths",
    title: "Mathematics Board Exam 2024",
    year: 2024,
    duration: "3 Hours",
    totalMarks: 100,
    questions: [
      q(
        "q1",
        "Find the principal value of sin⁻¹(-√3/2).",
        "sin⁻¹(-√3/2) = -sin⁻¹(√3/2) = -π/3. The principal value is -π/3 (or -60°).",
      ),
      q(
        "q2",
        "If A = [[1,2],[3,4]], find A + Aᵀ.",
        "Aᵀ = [[1,3],[2,4]]. A + Aᵀ = [[2,5],[5,8]]. The result is a symmetric matrix.",
      ),
      q(
        "q3",
        "Differentiate f(x) = sin(x²) with respect to x.",
        "Using chain rule: f'(x) = cos(x²) × 2x = 2x·cos(x²).",
      ),
      q(
        "q4",
        "Evaluate: ∫ x·eˣ dx",
        "Using integration by parts: ∫ x·eˣ dx = x·eˣ - ∫ eˣ dx = x·eˣ - eˣ + C = eˣ(x - 1) + C.",
      ),
      q(
        "q5",
        "Find the equation of the line passing through (2, -3) and parallel to x = 2y - 1.",
        "Rewrite: x = 2y - 1 → y = (x+1)/2. Slope = 1/2. Parallel line through (2,-3): y + 3 = (1/2)(x - 2) → 2y + 6 = x - 2 → x - 2y - 8 = 0.",
      ),
      q(
        "q6",
        "A bag contains 4 red and 5 black balls. Two balls are drawn at random. What is the probability that both are red?",
        "P(both red) = C(4,2)/C(9,2) = 6/36 = 1/6.",
      ),
      q(
        "q7",
        "Solve the differential equation dy/dx = (1 + y²)/(1 + x²).",
        "Separating variables: dy/(1+y²) = dx/(1+x²). Integrating both sides: tan⁻¹(y) = tan⁻¹(x) + C.",
      ),
      q(
        "q8",
        "Find the area bounded by y = x² and y = x.",
        "Intersection: x² = x → x = 0 or x = 1. Area = ∫₀¹ (x - x²) dx = [x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 1/6 sq. units.",
      ),
    ],
  },
  {
    id: "c12-math-2023",
    classId: "class12",
    subject: "maths",
    title: "Mathematics Board Exam 2023",
    year: 2023,
    duration: "3 Hours",
    totalMarks: 100,
    questions: [
      q(
        "q1",
        "Show that the relation R in the set A = {1,2,3,4,5} defined as R = {(a,b): |a-b| is even} is an equivalence relation.",
        "Reflexive: |a-a|=0 (even) ✓. Symmetric: If |a-b| is even, |b-a| = |a-b| is even ✓. Transitive: If |a-b| and |b-c| are even, |a-c| = |(a-b)+(b-c)| is even (sum of even numbers) ✓. Hence R is equivalence relation.",
      ),
      q(
        "q2",
        "If f(x) = (4x+3)/(6x-4), x ≠ 2/3, show that fof(x) = x.",
        "fof(x) = f(f(x)) = f((4x+3)/(6x-4)) = (4·(4x+3)/(6x-4)+3)/(6·(4x+3)/(6x-4)-4) = (16x+12+18x-12)/(24x+18-24x+16) = 34x/34 = x. Hence fof(x) = x, so f is its own inverse.",
      ),
    ],
  },
  {
    id: "c12-math-2022",
    classId: "class12",
    subject: "maths",
    title: "Mathematics Board Exam 2022",
    year: 2022,
    duration: "3 Hours",
    totalMarks: 100,
    questions: [
      q(
        "q1",
        "Find the value of cos⁻¹(cos(7π/6)).",
        "7π/6 is not in [0, π]. cos(7π/6) = cos(π + π/6) = -cos(π/6) = -√3/2. cos⁻¹(-√3/2) = π - π/6 = 5π/6.",
      ),
      q(
        "q2",
        "Using Cramer's rule, solve: 2x - y = 5, x + 3y = -4.",
        "D = |2,-1;1,3| = 6+1 = 7. Dₓ = |5,-1;-4,3| = 15-4 = 11. Dᵧ = |2,5;1,-4| = -8-5 = -13. x = 11/7, y = -13/7.",
      ),
      q(
        "q3",
        "Find the value of k if f(x) = kx² - 3x + k is strictly increasing on R.",
        "f'(x) = 2kx - 3. For strictly increasing, f'(x) > 0 for all x. This requires k > 0 and discriminant < 0: 9 - 8k² < 0 → k² > 9/8 → k > 3/(2√2). So k > 3√2/4.",
      ),
    ],
  },
  // CLASS 12 Physics
  {
    id: "c12-phy-2024",
    classId: "class12",
    subject: "physics",
    title: "Physics Board Exam 2024",
    year: 2024,
    duration: "3 Hours",
    totalMarks: 70,
    questions: [
      q(
        "q1",
        "State and explain Gauss's law in electrostatics. Derive the electric field due to an infinite plane sheet of charge.",
        "Gauss's Law: The total electric flux through any closed surface is equal to 1/ε₀ times the total charge enclosed. φ = Q_enc/ε₀. For infinite plane sheet with surface charge density σ: choose a cylindrical Gaussian surface perpendicular to sheet. Flux = E×A + E×A = 2EA. Charge enclosed = σA. So 2EA = σA/ε₀, E = σ/(2ε₀). The field is uniform and perpendicular to the sheet.",
      ),
      q(
        "q2",
        'Define the term "drift velocity" and derive an expression for it.',
        "Drift velocity is the average velocity with which free electrons in a conductor move opposite to the direction of applied electric field. In absence of field, electrons move randomly. When E is applied, acceleration a = eE/m. With relaxation time τ, drift velocity vd = eEτ/m. Current I = nAevd = nAe²Eτ/m. This gives Ohm's law with ρ = m/(ne²τ).",
      ),
      q(
        "q3",
        "Explain the working of a transformer and derive the transformation ratio.",
        "A transformer works on electromagnetic induction. Primary coil connected to AC source, secondary to load. Changing current in primary creates changing flux which induces EMF in secondary. For ideal transformer: Vs/Vp = Ns/Np = Is/Ip (inverse for current). Step-up: Ns > Np, step-down: Ns < Np. Efficiency = Power output/Power input × 100%.",
      ),
    ],
  },
  {
    id: "c12-phy-2023",
    classId: "class12",
    subject: "physics",
    title: "Physics Board Exam 2023",
    year: 2023,
    duration: "3 Hours",
    totalMarks: 70,
    questions: [
      q(
        "q1",
        "What is the photoelectric effect? State Einstein's photoelectric equation.",
        "Photoelectric effect is the emission of electrons from a metal surface when light of sufficient frequency falls on it. Einstein's equation: KE_max = hν - φ, where h = Planck's constant, ν = frequency of incident light, φ = work function of metal. Key features: instantaneous emission, threshold frequency, KE independent of intensity.",
      ),
      q(
        "q2",
        "Derive the expression for energy stored in a capacitor.",
        "Energy stored in capacitor: Work done to charge it. dW = V dq = (q/C) dq. Total work W = ∫₀^Q (q/C) dq = Q²/(2C) = CV²/2 = QV/2. Energy density u = ε₀E²/2. This energy is stored in the electric field between the plates.",
      ),
    ],
  },
  {
    id: "c12-phy-2022",
    classId: "class12",
    subject: "physics",
    title: "Physics Board Exam 2022",
    year: 2022,
    duration: "3 Hours",
    totalMarks: 70,
    questions: [
      q(
        "q1",
        "State Ampere's circuital law and apply it to find magnetic field inside a solenoid.",
        "Ampere's law: ∮ B·dl = μ₀I_enc. For a solenoid with n turns/length, choose rectangular Amperian loop: B·L + 0 + 0 + 0 = μ₀nLI. Therefore B = μ₀nI. The field inside a solenoid is uniform and parallel to axis.",
      ),
    ],
  },
  // CLASS 9
  {
    id: "c9-math-2024",
    classId: "class9",
    subject: "maths",
    title: "Mathematics Annual Exam 2024",
    year: 2024,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Is zero a rational number? Can you write it in the form p/q, where p and q are integers and q ≠ 0?",
        "Yes, zero is a rational number. It can be written as 0/1, 0/2, 0/(-3), etc. In general, 0 = 0/q for any non-zero integer q.",
      ),
      q(
        "q2",
        "Find five rational numbers between 3/5 and 4/5.",
        "Convert: 3/5 = 30/50, 4/5 = 40/50. Five rational numbers: 31/50, 32/50, 33/50, 34/50, 35/50 (which simplifies to 7/10).",
      ),
      q(
        "q3",
        "Factorise: x³ - 2x² - x + 2.",
        "Group: x²(x-2) - 1(x-2) = (x²-1)(x-2) = (x+1)(x-1)(x-2).",
      ),
      q(
        "q4",
        "A point lies on the x-axis at a distance of 7 units from the y-axis to the right. What are its coordinates?",
        "The point is at (7, 0).",
      ),
      q(
        "q5",
        "In a triangle ABC, ∠A = 50° and ∠B = 70°. Find ∠C.",
        "∠A + ∠B + ∠C = 180°. 50° + 70° + ∠C = 180°. ∠C = 60°.",
      ),
    ],
  },
  {
    id: "c9-math-2023",
    classId: "class9",
    subject: "maths",
    title: "Mathematics Annual Exam 2023",
    year: 2023,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Simplify: (√5 + √2)² .",
        "(√5 + √2)² = 5 + 2√10 + 2 = 7 + 2√10.",
      ),
      q(
        "q2",
        "Find the value of the polynomial 5x − 4x² + 3 at x = 2.",
        "p(2) = 5(2) - 4(4) + 3 = 10 - 16 + 3 = -3.",
      ),
      q(
        "q3",
        "Write the linear equation 2x + 3y = 6 in the form ax + by + c = 0 and indicate the values of a, b and c.",
        "2x + 3y - 6 = 0. So a = 2, b = 3, c = -6.",
      ),
    ],
  },
  {
    id: "c9-math-2022",
    classId: "class9",
    subject: "maths",
    title: "Mathematics Annual Exam 2022",
    year: 2022,
    duration: "3 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Rationalise the denominator of 1/(√7 - √6).",
        "Multiply by (√7+√6)/(√7+√6): = (√7+√6)/(7-6) = (√7+√6)/1 = √7+√6.",
      ),
      q(
        "q2",
        "State and prove the Triangle Inequality theorem.",
        "Theorem: Sum of any two sides of a triangle is greater than the third side. Proof: Extend side BC to D such that CD = CA. Then in triangle ABD, AB + AD > BD (exterior angle). Since AD = AC, AB + AC > BC. Similarly for other sides.",
      ),
    ],
  },
  // CLASS 8
  {
    id: "c8-math-2024",
    classId: "class8",
    subject: "maths",
    title: "Mathematics Annual Exam 2024",
    year: 2024,
    duration: "2.5 Hours",
    totalMarks: 80,
    questions: [
      q("q1", "Solve: 2x + 5 = 11.", "2x = 11 - 5 = 6. x = 3.", 2),
      q(
        "q2",
        "Find the percentage: 60 is what percent of 240?",
        "(60/240) × 100 = 25%. So 60 is 25% of 240.",
        3,
      ),
      q(
        "q3",
        "A sum of ₹10000 is invested at 8% per annum simple interest. Find interest after 2 years.",
        "SI = PRT/100 = 10000 × 8 × 2/100 = ₹1600.",
        3,
      ),
      q(
        "q4",
        "Find the volume of a cube with side 4 cm.",
        "Volume = a³ = 4³ = 64 cm³.",
        2,
      ),
      q("q5", "Factorise: a² - 9.", "a² - 9 = a² - 3² = (a+3)(a-3).", 3),
    ],
  },
  {
    id: "c8-sci-2024",
    classId: "class8",
    subject: "science",
    title: "Science Annual Exam 2024",
    year: 2024,
    duration: "2.5 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "What is combustion? Name the three types of combustion.",
        "Combustion is a chemical process in which a substance reacts with oxygen to give off heat and light. Three types: 1. Rapid combustion (burns fast, like LPG). 2. Spontaneous combustion (occurs on its own, like burning of phosphorus). 3. Explosive combustion (occurs very fast with a bang, like firecrackers).",
        5,
      ),
      q(
        "q2",
        "What are microorganisms? Name the major groups.",
        "Microorganisms are tiny organisms that cannot be seen with naked eye. Major groups: 1. Bacteria (round, rod, spiral shapes). 2. Fungi (mushroom, yeast, mould). 3. Protozoa (Amoeba, Paramecium). 4. Algae (Spirogyra). 5. Viruses (not cells but replicate like living organisms).",
        5,
      ),
      q(
        "q3",
        "Differentiate between cell division by mitosis and meiosis.",
        "Mitosis: Occurs in somatic (body) cells, produces 2 daughter cells, chromosome number same as parent (diploid), used for growth and repair. Meiosis: Occurs in reproductive cells, produces 4 daughter cells, chromosome number halved (haploid), used for sexual reproduction.",
        5,
      ),
    ],
  },
  {
    id: "c8-math-2023",
    classId: "class8",
    subject: "maths",
    title: "Mathematics Annual Exam 2023",
    year: 2023,
    duration: "2.5 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "What is the additive inverse of -5/9?",
        "Additive inverse of -5/9 is 5/9 (because -5/9 + 5/9 = 0).",
        2,
      ),
      q("q2", "Solve: 3(x-2) = 2(x+1).", "3x - 6 = 2x + 2. x = 8.", 3),
    ],
  },
  {
    id: "c8-math-2022",
    classId: "class8",
    subject: "maths",
    title: "Mathematics Annual Exam 2022",
    year: 2022,
    duration: "2.5 Hours",
    totalMarks: 80,
    questions: [
      q(
        "q1",
        "Find the cube root of 343.",
        "343 = 7³. Cube root of 343 = 7.",
        2,
      ),
      q(
        "q2",
        "If the cost price is ₹400 and selling price is ₹500, find profit percentage.",
        "Profit = SP - CP = 500 - 400 = ₹100. Profit% = (100/400) × 100 = 25%.",
        3,
      ),
    ],
  },
  // CLASS 5
  {
    id: "c5-math-2024",
    classId: "class5",
    subject: "maths",
    title: "Mathematics Annual Exam 2024",
    year: 2024,
    duration: "2 Hours",
    totalMarks: 50,
    questions: [
      q(
        "q1",
        "Write the number 25673 in words.",
        "Twenty-five thousand six hundred and seventy-three.",
        2,
      ),
      q(
        "q2",
        "Find the LCM of 12 and 18.",
        "Multiples of 12: 12, 24, 36, 48... Multiples of 18: 18, 36, 54... LCM = 36.",
        3,
      ),
      q(
        "q3",
        "A rectangle has length 12 cm and breadth 7 cm. Find its perimeter.",
        "Perimeter = 2(l + b) = 2(12 + 7) = 2 × 19 = 38 cm.",
        3,
      ),
      q("q4", "Divide 256 by 8.", "256 ÷ 8 = 32.", 2),
      q(
        "q5",
        "What fraction of an hour is 20 minutes?",
        "20 minutes out of 60 minutes = 20/60 = 1/3. So 20 minutes = 1/3 of an hour.",
        3,
      ),
    ],
  },
  {
    id: "c5-math-2023",
    classId: "class5",
    subject: "maths",
    title: "Mathematics Annual Exam 2023",
    year: 2023,
    duration: "2 Hours",
    totalMarks: 50,
    questions: [
      q(
        "q1",
        "Round off 47856 to the nearest thousand.",
        "47856 rounded to nearest thousand is 48000 (since the hundreds digit 8 ≥ 5).",
        2,
      ),
      q(
        "q2",
        "Find the area of a square with side 9 cm.",
        "Area = side × side = 9 × 9 = 81 cm².",
        2,
      ),
    ],
  },
  {
    id: "c5-math-2022",
    classId: "class5",
    subject: "maths",
    title: "Mathematics Annual Exam 2022",
    year: 2022,
    duration: "2 Hours",
    totalMarks: 50,
    questions: [
      q("q1", "Add: 43267 + 28541.", "43267 + 28541 = 71808.", 2),
      q(
        "q2",
        "The temperature in a city at 8 AM was 5°C and at 12 noon it was 15°C. What is the rise in temperature?",
        "Rise in temperature = 15 - 5 = 10°C.",
        2,
      ),
    ],
  },
  // CLASS 6
  {
    id: "c6-math-2024",
    classId: "class6",
    subject: "maths",
    title: "Mathematics Annual Exam 2024",
    year: 2024,
    duration: "2.5 Hours",
    totalMarks: 60,
    questions: [
      q(
        "q1",
        "Find all factors of 42.",
        "Factors of 42: 1, 2, 3, 6, 7, 14, 21, 42.",
        3,
      ),
      q(
        "q2",
        "Using the property, solve: 38 × 102.",
        "38 × 102 = 38 × (100 + 2) = 3800 + 76 = 3876. (Distributive property)",
        3,
      ),
      q(
        "q3",
        "Simplify: (-3) + (-8) + 5.",
        "(-3) + (-8) + 5 = -11 + 5 = -6.",
        2,
      ),
      q(
        "q4",
        "A book costs ₹85. How much will 15 such books cost?",
        "Cost = 85 × 15 = ₹1275.",
        3,
      ),
    ],
  },
  {
    id: "c6-sci-2024",
    classId: "class6",
    subject: "science",
    title: "Science Annual Exam 2024",
    year: 2024,
    duration: "2.5 Hours",
    totalMarks: 60,
    questions: [
      q(
        "q1",
        "What are the components of food? Why do we need to eat different kinds of food?",
        "Components of food (nutrients): Carbohydrates, Proteins, Fats, Vitamins, Minerals, Water, Roughage. We need different foods because each nutrient serves different purpose: carbohydrates/fats for energy, proteins for growth and repair, vitamins/minerals for protection against diseases. No single food contains all nutrients.",
        5,
      ),
      q(
        "q2",
        "What is the function of the skeleton in the human body?",
        "Functions of skeleton: 1. Gives shape and support to body. 2. Protects vital organs (skull protects brain, rib cage protects heart and lungs). 3. Helps in movement along with muscles. 4. Red blood cells are formed in bone marrow.",
        5,
      ),
    ],
  },
  {
    id: "c6-math-2023",
    classId: "class6",
    subject: "maths",
    title: "Mathematics Annual Exam 2023",
    year: 2023,
    duration: "2.5 Hours",
    totalMarks: 60,
    questions: [
      q(
        "q1",
        "Write the prime factorization of 72.",
        "72 = 2 × 36 = 2 × 2 × 18 = 2 × 2 × 2 × 9 = 2 × 2 × 2 × 3 × 3 = 2³ × 3².",
        3,
      ),
    ],
  },
  {
    id: "c6-math-2022",
    classId: "class6",
    subject: "maths",
    title: "Mathematics Annual Exam 2022",
    year: 2022,
    duration: "2.5 Hours",
    totalMarks: 60,
    questions: [
      q(
        "q1",
        "Identify the type of angle: 145°.",
        "145° is an obtuse angle (greater than 90° but less than 180°).",
        2,
      ),
    ],
  },
];

export function getPapersForClassSubject(
  classId: string,
  subjectId: string,
): ExamPaper[] {
  return EXAM_PAPERS.filter(
    (p) => p.classId === classId && p.subject === subjectId,
  );
}

export function getPaperById(id: string): ExamPaper | undefined {
  return EXAM_PAPERS.find((p) => p.id === id);
}
