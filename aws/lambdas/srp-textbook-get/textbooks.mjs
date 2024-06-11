const textbooks = [
    {
        "textbookId": "0",
        "name": "Calculus",
        "authors": "James Stewart",
        "chapters": [
         "1: Functions and Models",
         "2: Limits and Derivatives",
         "3: Differentiation Rules",
         "4: Applications of Differentiation",
         "5: Integrals",
         "6: Applications of Integration",
         "7: Techniques of Integration",
         "8: Further Applications of Integration",
         "9: Differential Equations",
         "10: Parametric Equations And Polar Coordinates",
         "11: Infinite Sequences And Series",
         "12: Vectors and The Geometry of Space",
         "13: Vector Functions",
         "14: Partial Derivatives",
         "15: Multiple Integrals",
         "16: Vector Calculus",
         "17: Second-Order Differential Equations"
        ],
        "ISBNs": [
         9781285740621,
         9781285740621
        ],
        "sections": [
         [
          "1.1: Four Ways to Represent a Function",
          "1.2: Mathematical Models- A Catalog of Essential Functions",
          "1.3: New Functions from Old Functions",
          "1.4: Exponential Functions",
          "1.5: Inverse Functions and Logarithms"
         ],
         [
          "2.1: The Tangent and Velocity Problems",
          "2.2: The Limit of a Function",
          "2.3: Calculating Limits Using the Limit Laws",
          "2.4: The Precise Definition of a Limit",
          "2.5: Continuity",
          "2.6: Limits at Infinity; Horizontal Asymptotes",
          "2.7: Derivatives and Rates of Change",
          "2.8: The Derivative as a Function"
         ],
         [
          "3.1: Derivatives of Polynomials and Exponential Functions",
          "3.2: The Product and Quotient Rules",
          "3.3: Derivatives of Trigonometric Functions",
          "3.4: The Chain Rule",
          "3.5: Implicit Differentiation",
          "3.6: Derivatives of Logarithmic Functions",
          "3.7: Rates of Change in the Natural and Social Sciences",
          "3.8: Exponential Growth and Decay",
          "3.9: Related Rates",
          "3.10: Linear Approximations and Differentials",
          "3.11: Hyperbolic Functions"
         ],
         [
          "4.1: Maximum and Minimum Values",
          "4.2: The Mean Value Theorem",
          "4.3: How Derivatives Affect the Shape of a Graph",
          "4.4: Indeterminate Forms and l'Hospital's Rule",
          "4.5: Summary of Curve Sketching",
          "4.6: Graphing with Calculus and Calculators",
          "4.7: Optimization Problems",
          "4.8: Newton's Method",
          "4.9: Antiderivatives"
         ],
         [
          "5.1: Areas and Distances",
          "5.2: The Definite Integral",
          "5.3: The Fundamental Theorem of Calculus",
          "5.4: Indefinite Integrals and the Net Change Theorem",
          "5.5: The Substitution Rule"
         ],
         [
          "6.1: Areas Between Curves",
          "6.2: Volumes",
          "6.3: Volumes by Cylindrical Shells",
          "6.4: Work",
          "6.5: Average Value of a Function"
         ],
         [
          "7.1: Integration by Parts",
          "7.2: Trigonometric Integrals",
          "7.3: Trigonometric Substitution",
          "7.4: Integration of Rational Functions by Partial Fractions",
          "7.5: Strategy for Integration",
          "7.6: Integration Using Tables and Computer Algebra Systems",
          "7.7: Approximate Integration",
          "7.8: Improper Integrals"
         ],
         [
          "8.1: Arc Length",
          "8.2: Area of a Surface of Revolution",
          "8.3: Applications to Physics and Engineering",
          "8.4: Applications to Economics and Biology",
          "8.5: Probability"
         ],
         [
          "9.1: Modeling with Differential Equations",
          "9.2: Direction Fields and Euler's Method",
          "9.3: Separable Equations",
          "9.4: Models for Population Growth",
          "9.5: Linear Equations",
          "9.6: Predator-Prey Systems"
         ],
         [
          "10.1: Curves Defined by Parametric Equations",
          "10.2: Calculus with Parametric Curves",
          "10.3: Polar Coordinates",
          "10.4: Areas and Lengths in Polar Coordinates",
          "10.5: Conic Sections",
          "10.6: Conic Sections in Polar Coordinates"
         ],
         [
          "11.1: Sequences",
          "11.2: Series",
          "11.3: The Integral Test and Estimates of Sums",
          "11.4: The Comparison Tests",
          "11.5: Alternating Series",
          "11.6: Absolute Convergence and the Ratio and Root Test",
          "11.7: Strategy for Testing Series",
          "11.8: Power Series",
          "11.9: Representations of Functions as Power Series",
          "11.10: Taylor and Maclaurin Series",
          "11.11: Applications of Taylor Polynomials"
         ],
         [
          "12.1: Three-Dimensional Coordinate Systems",
          "12.2: Vectors",
          "12.3: The Dot Product",
          "12.4: The Cross Product",
          "12.5: Equations of Lines and Planes",
          "12.6: Cylinders and Quadric Surfaces"
         ],
         [
          "13.1: Vector Functions and Space Curves",
          "13.2: Derivatives and Integrals of Vector Functions",
          "13.3: Arc Length and Curvature",
          "13.4: Motion in Space- Velocity and Acceleration"
         ],
         [
          "14.1: Functions of Several Variables",
          "14.2: Limits and Continuity",
          "14.3: Partial Derivatives",
          "14.4: Tangent Planes and Linear Approximations",
          "14.5: The Chain Rule",
          "14.6: Directional Derivatives and the Gradient Vector",
          "14.7: Maximum and Minimum Values",
          "14.8: Lagrange Multipliers"
         ],
         [
          "15.1: Double Integrals over Rectangles",
          "15.2: Double Integrals over General Regions",
          "15.3: Double Integrals in Polar Coordinates",
          "15.4: Applications of Double Integrals",
          "15.5: Surface Area",
          "15.6: Triple Integrals",
          "15.7: Triple Integrals in Cylindrical Coordinates",
          "15.8: Triple Integrals in Spherical Coordinates",
          "15.9: Change of Variables in Multiple Integrals"
         ],
         [
          "16.1: Vector Fields",
          "16.2: Line Integrals",
          "16.3: The Fundamental Theorem for Line Integrals",
          "16.4: Green's Theorem",
          "16.5: Curl and Divergence",
          "16.6: Parametric Surfaces and Their Areas",
          "16.7: Surface Integrals",
          "16.8: Stokes' Theorem",
          "16.9: The Divergence Theorem"
         ],
         [
          "17.1: Second-Order Linear Equations",
          "17.2: Nonhomogeneous Linear Equations",
          "17.3: Applications of Second-Order Differential Equations",
          "17.4: Series Solutions of Differential Equations"
         ]
        ]
    }
]

export default textbooks;