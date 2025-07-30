document.addEventListener('DOMContentLoaded', function() {
    // --- Table of Contents & Back to Top Button Logic ---
    const toc = document.getElementById('table-of-contents');
    const backToTopBtn = document.getElementById('backToTopBtn');
    setupNavigation(toc, backToTopBtn);

    // --- Drawing Functions ---
    drawTransversalGraph('transversalCanvas');
    draw306090Triangle('triangle306090Canvas');
    draw454590Triangle('triangle454590Canvas');
    drawSimilarTriangles('similarTrianglesCanvas');
    drawGeneralTriangle('generalTriangleCanvas');
    drawTrapezoid('trapezoidCanvas');
    drawRhombusDiagonals('rhombusCanvas');
    drawCircleAngles('circleAnglesCanvas');
    drawSector('sectorCanvas');
    drawTangent('tangentCanvas');
    drawCircleEquationGraph('circleEquationCanvas');
    drawParallelExample1('parallelExample1Canvas');
    drawParallelExample2('parallelExample2Canvas');
    drawIsoscelesTriangle('isoscelesTriangleCanvas');
    drawEquilateralTriangle('equilateralTriangleCanvas');
    drawLawOfSinesExample('lawOfSinesExampleCanvas');
    drawAreaFormulaExample('areaFormulaExampleCanvas');
    drawPentagonExample('pentagonExampleCanvas');
    drawParallelogramExample('parallelogramExampleCanvas');
    drawRhombusAreaExample('rhombusAreaCanvas');
    drawExteriorAnglesExample('exteriorAnglesExampleCanvas');
    drawTrapezoidMedianExample('trapezoidMedianCanvas');
    drawTrapezoidAreaExample('trapezoidAreaCanvas');
    drawCircleFromGraph('circleFromGraphCanvas');
    drawInscribedAngleExample1('inscribedAngleExample1Canvas');
    drawInscribedAngleExample2('inscribedAngleExample2Canvas');
    drawTangentSegmentExample('tangentSegmentExampleCanvas');
    drawSectorAreaExample('sectorAreaExampleCanvas');
    drawArcLengthExample('arcLengthExampleCanvas');
    drawSemicircleTriangleExample('semicircleTriangleCanvas');
    drawTangentCirclesExample('tangentCirclesCanvas');

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
});

function setupNavigation(toc, backToTopBtn) {
    if (toc) {
        toc.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    if (backToTopBtn && toc) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            toc.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function drawTransversalGraph(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    // Line positions
    const y1 = height * 0.35;
    const y2 = height * 0.65;
    const x_start = 50;
    const x_end = width - 50;

    // Transversal line coordinates
    const t_start = { x: width * 0.25, y: 10 };
    const t_end = { x: width * 0.75, y: height - 10 };

    // Draw parallel lines
    ctx.beginPath();
    ctx.moveTo(x_start, y1);
    ctx.lineTo(x_end, y1);
    ctx.moveTo(x_start, y2);
    ctx.lineTo(x_end, y2);
    ctx.strokeStyle = '#4b5563'; // Gray-600
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw transversal
    ctx.beginPath();
    ctx.moveTo(t_start.x, t_start.y);
    ctx.lineTo(t_end.x, t_end.y);
    ctx.strokeStyle = '#7e22ce'; // Purple-700
    ctx.lineWidth = 2;
    ctx.stroke();

    // --- Calculate Intersection Points and Angle ---
    const m_t = (t_end.y - t_start.y) / (t_end.x - t_start.x);
    const c_t = t_start.y - m_t * t_start.x;
    const p1 = { x: (y1 - c_t) / m_t, y: y1 };
    const p2 = { x: (y2 - c_t) / m_t, y: y2 };
    const transversalAngle = Math.atan2(t_end.y - t_start.y, t_end.x - t_start.x);

    // --- Angle Drawing ---
    const arcRadius = 15;
    const labelRadius = 28;
    const obtuseColor = '#dc2626'; // Red-600
    const acuteColor = '#2563eb'; // Blue-600

    ctx.font = 'bold 14px Inter';
    ctx.lineWidth = 1.5;

    function drawAngle(center, startRad, endRad, color, label) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, arcRadius, startRad, endRad);
        ctx.strokeStyle = color;
        ctx.stroke();

        const midRad = (startRad + endRad) / 2;
        const labelX = center.x + labelRadius * Math.cos(midRad);
        const labelY = center.y + labelRadius * Math.sin(midRad);

        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, labelX, labelY);
    }

    // Angles at top intersection (p1)
    drawAngle(p1, 0, transversalAngle, acuteColor, 'b'); // Top-right
    drawAngle(p1, transversalAngle, Math.PI, obtuseColor, 'a'); // Top-left
    drawAngle(p1, Math.PI, Math.PI + transversalAngle, acuteColor, 'b'); // Bottom-left
    drawAngle(p1, Math.PI + transversalAngle, 2 * Math.PI, obtuseColor, 'a'); // Bottom-right

    // Angles at bottom intersection (p2)
    drawAngle(p2, 0, transversalAngle, acuteColor, 'b'); // Top-right
    drawAngle(p2, transversalAngle, Math.PI, obtuseColor, 'a'); // Top-left
    drawAngle(p2, Math.PI, Math.PI + transversalAngle, acuteColor, 'b'); // Bottom-left
    drawAngle(p2, Math.PI + transversalAngle, 2 * Math.PI, obtuseColor, 'a'); // Bottom-right
}

function drawAngleArc(ctx, center, p1, p2, color, label) {
    const arcRadius = 20;
    const labelRadius = 30;

    const startAngle = Math.atan2(p1.y - center.y, p1.x - center.x);
    const endAngle = Math.atan2(p2.y - center.y, p2.x - center.x);

    ctx.beginPath();
    ctx.arc(center.x, center.y, arcRadius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    let midAngle = (startAngle + endAngle) / 2;
    // Handle angle crossing the -PI/PI boundary
    if (Math.abs(startAngle - endAngle) > Math.PI) {
         midAngle += Math.PI;
    }

    const labelX = center.x + labelRadius * Math.cos(midAngle);
    const labelY = center.y + labelRadius * Math.sin(midAngle);

    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, labelX, labelY);
}

function draw306090Triangle(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const p1 = { x: 50, y: height - 40 }; // 90° corner
    const p2 = { x: 50, y: 40 }; // 30° corner
    const p3 = { x: 50 + 100 * Math.sqrt(3), y: height - 40 }; // 60° corner

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw right angle symbol
    ctx.strokeRect(p1.x, p1.y - 15, 15, 15);

    // Draw angle arcs and labels
    ctx.font = 'bold 14px Inter';
    drawAngleArc(ctx, p2, p3, p1, '#3b82f6', '30°');
    drawAngleArc(ctx, p3, p1, p2, '#ef4444', '60°');

    // Draw side labels
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('x', p1.x - 21, (p1.y + p2.y) / 2); // Positioned outside the short leg
    ctx.fillText('x√3', (p1.x + p3.x) / 2, p1.y + 21); // Positioned below the long leg
    ctx.save();
    ctx.translate((p2.x + p3.x) / 2, (p2.y + p3.y) / 2);
    const angle = Math.atan2(p3.y - p2.y, p3.x - p2.x);
    ctx.rotate(angle);
    ctx.fillText('2x', 0, -20); // Rotated and positioned away from the hypotenuse
    ctx.restore();
}

function draw454590Triangle(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const height = canvas.height;

    const side = 120;
    const p1 = { x: 60, y: height - 40 }; // 90° corner
    const p2 = { x: 60, y: height - 40 - side }; // Top 45° corner
    const p3 = { x: 60 + side, y: height - 40 }; // Bottom-right 45° corner

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw right angle symbol
    ctx.strokeRect(p1.x, p1.y - 15, 15, 15);

    // Draw angle arcs and labels
    ctx.font = 'bold 14px Inter';
    const angleColor = '#10b981'; // Green
    drawAngleArc(ctx, p2, p3, p1, angleColor, '45°');
    drawAngleArc(ctx, p3, p1, p2, angleColor, '45°');

    // Draw side labels
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('x', p1.x - 21, (p1.y + p2.y) / 2); // Positioned outside the left leg
    ctx.fillText('x', (p1.x + p3.x) / 2, p1.y + 21); // Positioned below the bottom leg
    ctx.save();
    ctx.translate((p2.x + p3.x) / 2, (p2.y + p3.y) / 2);
    const angle = Math.atan2(p3.y - p2.y, p3.x - p2.x);
    ctx.rotate(angle);
    ctx.fillText('x√2', 0, -20); // Rotated and positioned away from the hypotenuse
    ctx.restore();
}

function drawSimilarTriangles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // --- Triangle 1 (Blue) ---
    const t1 = { p1: {x: 50, y: 150}, p2: {x: 150, y: 150}, p3: {x: 150, y: 50} };
    ctx.beginPath();
    ctx.moveTo(t1.p1.x, t1.p1.y); ctx.lineTo(t1.p2.x, t1.p2.y); ctx.lineTo(t1.p3.x, t1.p3.y); ctx.closePath();
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.stroke();

    // --- Triangle 2 (Red, larger) ---
    const scale = 1.5;
    const t2 = { p1: {x: 220, y: 150}, p2: {x: 220 + 100*scale, y: 150}, p3: {x: 220 + 100*scale, y: 150 - 100*scale} };
    ctx.beginPath();
    ctx.moveTo(t2.p1.x, t2.p1.y); ctx.lineTo(t2.p2.x, t2.p2.y); ctx.lineTo(t2.p3.x, t2.p3.y); ctx.closePath();
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke();

    // --- Labels ---
    const labelFont = 'bold 16px Inter';
    const labelColor = '#1f2937';
    const kColor = '#d97706'; // Amber-600 for the constant k

    ctx.font = labelFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Labels for Triangle 1
    ctx.fillStyle = labelColor;
    ctx.fillText('a', t1.p3.x + 20, (t1.p2.y + t1.p3.y) / 2);
    ctx.fillText('b', (t1.p1.x + t1.p2.x) / 2, t1.p1.y + 20);
    ctx.save();
    ctx.translate((t1.p1.x + t1.p3.x) / 2, (t1.p1.y + t1.p3.y) / 2);
    ctx.rotate(Math.atan2(t1.p3.y - t1.p1.y, t1.p3.x - t1.p1.x));
    ctx.fillText('c', 0, -20);
    ctx.restore();

    // Labels for Triangle 2 (with colored 'k')
    ctx.fillText('a', t2.p3.x + 26.5, (t2.p2.y + t2.p3.y) / 2);
    ctx.fillStyle = kColor; ctx.fillText('k', t2.p3.x + 15, (t2.p2.y + t2.p3.y) / 2); ctx.fillStyle = labelColor;
    ctx.fillText('b', (t2.p1.x + t2.p2.x) / 2 + 8, t2.p1.y + 20);
    ctx.fillStyle = kColor; ctx.fillText('k', (t2.p1.x + t2.p2.x) / 2 - 5, t2.p1.y + 20); ctx.fillStyle = labelColor;
    ctx.save();
    ctx.translate((t2.p1.x + t2.p3.x) / 2, (t2.p1.y + t2.p3.y) / 2);
    ctx.rotate(Math.atan2(t2.p3.y - t2.p1.y, t2.p3.x - t2.p1.x));
    ctx.fillText('c', 8, -20);
    ctx.fillStyle = kColor; ctx.fillText('k', -5, -20);
    ctx.restore();
}

function drawGeneralTriangle(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pA = {x: 150, y: 30}, pB = {x: 50, y: 170}, pC = {x: 250, y: 170};

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y); ctx.lineTo(pB.x, pB.y); ctx.lineTo(pC.x, pC.y); ctx.closePath();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Labels
    ctx.font = 'bold 16px Inter'; ctx.fillStyle = '#1f2937'; ctx.textAlign = 'center';
    ctx.fillText('A', pA.x, pA.y - 15);
    ctx.fillText('B', pB.x - 15, pB.y + 5);
    ctx.fillText('C', pC.x + 15, pC.y + 5);

    ctx.font = 'italic 16px Inter';
    ctx.fillText('a', (pB.x + pC.x)/2, pB.y + 15);
    ctx.fillText('b', (pA.x + pC.x)/2 + 10, (pA.y + pC.y)/2);
    ctx.fillText('c', (pA.x + pB.x)/2 - 10, (pA.y + pB.y)/2);
}

function drawTrapezoid(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const p1 = { x: 40, y: height - 40 };
    const p2 = { x: width - 40, y: height - 40 };
    const p3 = { x: width - 80, y: 40 };
    const p4 = { x: 80, y: 40 };

    // Draw trapezoid
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw height (dashed)
    const h_x = 100;
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(h_x, p1.y);
    ctx.lineTo(h_x, p4.y);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('b₁', (p1.x + p2.x) / 2, p1.y + 15);
    ctx.fillText('b₂', (p3.x + p4.x) / 2, p3.y - 15);
    ctx.fillStyle = '#b91c1c';
    ctx.fillText('h', h_x + 15, (p1.y + p4.y) / 2);
}

function drawRhombusDiagonals(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const d1_half = 100; // half horizontal diagonal
    const d2_half = 60;  // half vertical diagonal

    const p1 = { x: centerX - d1_half, y: centerY };
    const p2 = { x: centerX, y: centerY - d2_half };
    const p3 = { x: centerX + d1_half, y: centerY };
    const p4 = { x: centerX, y: centerY + d2_half };

    // Draw rhombus
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.closePath();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke(); // Back to neutral color

    // Draw diagonals (dashed)
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y);
    ctx.strokeStyle = '#3b82f6';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y); ctx.lineTo(p4.x, p4.y);
    ctx.strokeStyle = '#ef4444';
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw right angle symbol
    ctx.strokeStyle = '#4b5563';
    ctx.strokeRect(centerX - 8, centerY, 8, -8);

    // Labels
    ctx.font = 'bold 16px Inter'; // Larger font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Label for full horizontal diagonal d1
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('d₁', centerX+20, centerY );

    // Label for full vertical diagonal d2
    ctx.fillStyle = '#ef4444';
    ctx.fillText('d₂', centerX , centerY-15);

    ctx.save();
    ctx.translate((p2.x + p3.x) / 2, (p2.y + p3.y) / 2);
    ctx.rotate(Math.atan2(p3.y - p2.y, p3.x - p2.x));
    ctx.fillStyle = '#7e22ce'; // Purple for side s
    ctx.fillText('s', 0, -20); // Adjusted position
    ctx.restore();
}

function drawCircleAngles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const angle1 = -Math.PI / 6;
    const angle2 = Math.PI / 3;
    const pA = { x: centerX + radius * Math.cos(angle1), y: centerY + radius * Math.sin(angle1) };
    const pB = { x: centerX + radius * Math.cos(angle2), y: centerY + radius * Math.sin(angle2) };
    const pC = { x: centerX + radius * Math.cos(Math.PI), y: centerY }; // Inscribed angle vertex

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.stroke();

    // Draw intercepted arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, angle1, angle2);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.stroke();

    // Draw central angle lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); ctx.lineTo(pA.x, pA.y);
    ctx.moveTo(centerX, centerY); ctx.lineTo(pB.x, pB.y);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Draw inscribed angle lines
    ctx.beginPath();
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pA.x, pA.y);
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pB.x, pB.y);
    ctx.stroke();

    // Draw angle arcs
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, angle1, angle2);
    ctx.strokeStyle = '#b91c1c';
    ctx.stroke();

    const inscribedAngle1 = Math.atan2(pA.y - pC.y, pA.x - pC.x);
    const inscribedAngle2 = Math.atan2(pB.y - pC.y, pB.x - pC.x);
    ctx.beginPath();
    ctx.arc(pC.x, pC.y, 25, inscribedAngle1, inscribedAngle2);
    ctx.strokeStyle = '#1f2937';
    ctx.stroke();

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Central Angle Label
    ctx.fillStyle = '#b91c1c';
    const centralMidAngle = (angle1 + angle2) / 2;
    ctx.fillText('2θ', centerX + 35 * Math.cos(centralMidAngle), centerY + 35 * Math.sin(centralMidAngle));

    // Inscribed Angle Label
    ctx.fillStyle = '#1f2937';
    const inscribedMidAngle = (inscribedAngle1 + inscribedAngle2) / 2;
    ctx.fillText('θ', pC.x + 35 * Math.cos(inscribedMidAngle), pC.y + 35 * Math.sin(inscribedMidAngle));

    ctx.fillStyle = '#b91c1c'; // Red for Central Angle text
    ctx.fillText('Central Angle', centerX, centerY + 40);
    ctx.fillStyle = '#1f2937'; // Black for Inscribed Angle text
    ctx.fillText('Inscribed Angle', pC.x, pC.y - 40);
}

function drawSector(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const startAngle = -Math.PI / 6;
    const endAngle = Math.PI / 3;
    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.stroke();

    // Draw and fill sector
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(168, 85, 247, 0.1)'; // Light purple fill
    ctx.fill();
    ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.stroke();

    // Draw arc for angle label
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, startAngle, endAngle);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('θ', centerX + 40, centerY + 5);
    ctx.fillText('r', centerX + radius / 2, centerY - 25);
    ctx.fillStyle = '#a855f7';
    ctx.fillText('L', centerX + radius - 5, centerY + 40);
}

function drawTangent(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const pT = { x: centerX, y: centerY - radius }; // Point of tangency
    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw tangent line
    ctx.beginPath();
    ctx.moveTo(20, pT.y);
    ctx.lineTo(canvas.width - 20, pT.y);
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.stroke();

    // Draw radius to tangent point
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pT.x, pT.y);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.stroke();

    // Draw right angle symbol
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(pT.x + 2, pT.y + 2, 10, 10);

    // Label
    ctx.font = '12px Inter';
    ctx.fillStyle = '#1d4ed8';
    ctx.fillText('Tangent Line', 45, pT.y - 10);
}

function drawCircleEquationGraph(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Increased scale and adjusted origin for better fit
    const originX = 60;
    const originY = height - 60;
    const scale = 30;

    const toCanvasX = (x) => originX + x * scale;
    const toCanvasY = (y) => originY - y * scale;

    // Draw Axes
    ctx.beginPath();
    ctx.moveTo(0, originY); ctx.lineTo(width, originY); // X-axis
    ctx.moveTo(originX, 0); ctx.lineTo(originX, height); // Y-axis
    ctx.strokeStyle = '#d1d5db';
    ctx.stroke();

    // Circle parameters
    const h = 4, k = 4, r = 3;
    const center = { x: toCanvasX(h), y: toCanvasY(k) };

    // Point on circle
    const angle = Math.PI / 4;
    const point = { x: toCanvasX(h + r * Math.cos(angle)), y: toCanvasY(k + r * Math.sin(angle)) };
    const corner = { x: point.x, y: center.y };

    // Draw circle (dashed)
    ctx.beginPath();
    ctx.arc(center.x, center.y, r * scale, 0, 2 * Math.PI);
    ctx.strokeStyle = '#a855f7'; // Purple
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw the right triangle
    ctx.beginPath();
    ctx.moveTo(center.x, center.y); ctx.lineTo(point.x, point.y); ctx.lineTo(corner.x, corner.y); ctx.closePath();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw right angle symbol
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(corner.x - 10, corner.y, 10, -10);

    // --- Labels ---
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Point labels
    ctx.fillStyle = '#1f2937';
    ctx.fillText('(h, k)', center.x - 15, center.y + 20);
    ctx.fillText('(x, y)', point.x + 25, point.y - 15);

    // Side labels (color-coded)
    ctx.fillStyle = '#3b82f6'; // Blue for x-h
    ctx.fillText('x - h', (center.x + corner.x) / 2, corner.y + 18);

    ctx.fillStyle = '#ef4444'; // Red for y-k
    ctx.fillText('y - k', corner.x + 25, (center.y + point.y) / 2);

    ctx.fillStyle = '#7e22ce'; // Purple for r
    ctx.save();
    ctx.translate((center.x + point.x) / 2, (center.y + point.y) / 2);
    ctx.rotate(Math.atan2(point.y - center.y, point.x - center.x));
    ctx.fillText('r', 0, -18);
    ctx.restore();
}

function drawParallelExample1(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const x_start = 50;
    const x_end = width - 50;
    const y1 = height * 0.35;
    const y2 = height * 0.65;

    // Transversal line coordinates
    const t_start = { x: width * 0.25, y: 10 };
    const t_end = { x: width * 0.75, y: height - 10 };

    // Draw parallel lines
    ctx.beginPath();
    ctx.moveTo(x_start, y1); ctx.lineTo(x_end, y1);
    ctx.moveTo(x_start, y2); ctx.lineTo(x_end, y2);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw transversal
    ctx.beginPath();
    ctx.moveTo(t_start.x, t_start.y);
    ctx.lineTo(t_end.x, t_end.y);
    ctx.strokeStyle = '#7e22ce'; ctx.lineWidth = 2; ctx.stroke();

    // Intersection points
    const m_t = (t_end.y - t_start.y) / (t_end.x - t_start.x);
    const c_t = t_start.y - m_t * t_start.x;
    const p1 = { x: (y1 - c_t) / m_t, y: y1 };
    const p2 = { x: (y2 - c_t) / m_t, y: y2 };

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('L', x_start - 20, y1 + 5);
    ctx.fillText('M', x_start - 20, y2 + 5);

    // --- Draw angle arcs and labels ---
    // Points to define the horizontal lines for the angles
    const p1_left = { x: p1.x - 50, y: p1.y };
    const p2_left = { x: p2.x - 50, y: p2.y };

    // Draw the 110° angle (top-left)
    drawAngleArc(ctx, p1, t_end, p1_left, '#dc2626', '110°');

    // Draw the x angle (bottom-left)
    drawAngleArc(ctx, p2, t_end, p2_left, '#2563eb', 'x');
}

function drawParallelExample2(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const x_start = 50;
    const x_end = width - 50;
    const y1 = height * 0.35;
    const y2 = height * 0.65;

    // Transversal line coordinates (sloping the other way)
    const t_start = { x: width * 0.75, y: 10 };
    const t_end = { x: width * 0.25, y: height - 10 };

    // Draw parallel lines
    ctx.beginPath();
    ctx.moveTo(x_start, y1); ctx.lineTo(x_end, y1);
    ctx.moveTo(x_start, y2); ctx.lineTo(x_end, y2);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw transversal
    ctx.beginPath();
    ctx.moveTo(t_start.x, t_start.y);
    ctx.lineTo(t_end.x, t_end.y);
    ctx.strokeStyle = '#7e22ce'; ctx.lineWidth = 2; ctx.stroke();

    // Intersection points
    const m_t = (t_end.y - t_start.y) / (t_end.x - t_start.x);
    const c_t = t_start.y - m_t * t_start.x;
    const p1 = { x: (y1 - c_t) / m_t, y: y1 };
    const p2 = { x: (y2 - c_t) / m_t, y: y2 };

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('L', x_start - 20, y1 + 5);
    ctx.fillText('M', x_start - 20, y2 + 5);

    // --- Draw angle arcs and labels ---
    const p1_left = { x: p1.x - 50, y: p1.y };
    const p2_left = { x: p2.x - 50, y: p2.y };
    const p2_right = { x: p2.x + 50, y: p2.y };

    // Draw the 120° angle (top-left, obtuse)
    drawAngleArc(ctx, p1, t_end, p1_left, '#2563eb', '120°');
    // Draw the y angle (bottom-right, obtuse) - alternate exterior
    drawAngleArc(ctx, p2, p2_right, t_end, '#dc2626', 'y');
    // Draw the x angle (bottom-left, acute) - linear pair
    drawAngleArc(ctx, p2, t_end, p2_left, '#2563eb', 'x');
}

function drawIsoscelesTriangle(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const p1 = { x: width / 2, y: 40 }; // Top vertex
    const p2 = { x: 60, y: height - 40 }; // Bottom-left, moved inwards
    const p3 = { x: width - 60, y: height - 40 }; // Bottom-right, moved inwards
    const equalSideColor = '#ef4444'; // Red
    const baseColor = '#4b5563'; // Gray

    // Draw the two equal sides in red
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.moveTo(p1.x, p1.y); // Go back to the start point to draw the other line
    ctx.lineTo(p3.x, p3.y);
    ctx.strokeStyle = equalSideColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the base in gray
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mark equal sides
    const markLength = 10;
    const mid12 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const mid13 = { x: (p1.x + p3.x) / 2, y: (p1.y + p3.y) / 2 };
    const angle12 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const angle13 = Math.atan2(p3.y - p1.y, p3.x - p1.x);

    ctx.save();
    ctx.translate(mid12.x, mid12.y);
    ctx.rotate(angle12 + Math.PI / 2);
    ctx.beginPath(); ctx.moveTo(-markLength, 0); ctx.lineTo(markLength, 0); ctx.strokeStyle = equalSideColor; ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(mid13.x, mid13.y);
    ctx.rotate(angle13 + Math.PI / 2);
    ctx.beginPath(); ctx.moveTo(-markLength, 0); ctx.lineTo(markLength, 0); ctx.strokeStyle = equalSideColor;
    ctx.stroke();
    ctx.restore();

    // Mark equal angles
    const angleColor = '#3b82f6'; // Blue
    drawAngleArc(ctx, p2, p1, p3, angleColor, '');
    drawAngleArc(ctx, p3, p2, p1, angleColor, '');
}

function drawEquilateralTriangle(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const sideLength = 160;
    const triHeight = sideLength * Math.sqrt(3) / 2;
    const p1 = { x: width / 2, y: (height - triHeight) / 2 + 10 }; // Top vertex
    const p2 = { x: (width - sideLength) / 2, y: (height + triHeight) / 2 + 10 }; // Bottom-left
    const p3 = { x: (width + sideLength) / 2, y: (height + triHeight) / 2 + 10 }; // Bottom-right

    const sideColor = '#ef4444'; // Red

    // Draw triangle sides in red
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath();
    ctx.strokeStyle = sideColor; ctx.lineWidth = 2; ctx.stroke();

    // Mark equal sides
    const markLength = 10;
    const mid12 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const mid23 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
    const mid13 = { x: (p1.x + p3.x) / 2, y: (p1.y + p3.y) / 2 };

    const angle12 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const angle23 = Math.atan2(p3.y - p2.y, p3.x - p2.x);
    const angle13 = Math.atan2(p3.y - p1.y, p3.x - p1.x);

    function drawMark(midPoint, angle) {
        ctx.save();
        ctx.translate(midPoint.x, midPoint.y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.beginPath(); ctx.moveTo(-markLength, 0); ctx.lineTo(markLength, 0);
        ctx.strokeStyle = sideColor; ctx.stroke();
        ctx.restore();
    }

    drawMark(mid12, angle12);
    drawMark(mid23, angle23);
    drawMark(mid13, angle13);

    // Mark equal angles
    const angleColor = '#3b82f6'; // Blue
    drawAngleArc(ctx, p1, p3, p2, angleColor, '60°');
    drawAngleArc(ctx, p2, p1, p3, angleColor, '60°');
    drawAngleArc(ctx, p3, p2, p1, angleColor, '60°');
}

function drawLawOfSinesExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pX = { x: 280, y: height - 40 };
    const pZ = { x: 40, y: height - 40 };
    const pY = { x: width / 2 + 20, y: 40 };

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(pX.x, pX.y);
    ctx.lineTo(pY.x, pY.y);
    ctx.lineTo(pZ.x, pZ.y);
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label vertices
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('X', pX.x + 15, pX.y);
    ctx.fillText('Y', pY.x, pY.y - 15);
    ctx.fillText('Z', pZ.x - 15, pZ.y);

    // Label sides
    ctx.font = 'italic 16px Inter';
    ctx.fillStyle = '#c026d3'; // Fuchsia color for labels
    // Side x (opposite X)
    ctx.fillText('10', (pY.x + pZ.x) / 2 - 12, (pY.y + pZ.y) / 2);
    // Side y (opposite Y)
    ctx.fillText('8', (pX.x + pZ.x) / 2, pX.y + 15);

    // Label angles
    drawAngleArc(ctx, pX, pZ, pY, '#dc2626', '50°');
    drawAngleArc(ctx, pY, pX, pZ, '#2563eb', 'Y');
}

function drawAreaFormulaExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pB = { x: 280, y: height - 40 };
    const pC = { x: 40, y: height - 40 };
    const pA = { x: 80, y: 40 };

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label vertices
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', pA.x, pA.y - 15);
    ctx.fillText('B', pB.x + 15, pB.y);
    ctx.fillText('C', pC.x - 15, pC.y);

    // Label sides
    ctx.font = 'italic 16px Inter';
    ctx.fillStyle = '#c026d3'; // Fuchsia color for labels
    // Side a (opposite A)
    ctx.fillText('a = 10', (pB.x + pC.x) / 2, pB.y + 15);
    // Side b (opposite B)
    ctx.fillText('b = 8', (pA.x + pC.x) / 2 - 23, (pA.y + pC.y) / 2 + 10);

    // Label angle C
    drawAngleArc(ctx, pC, pA, pB, '#dc2626', 'C');

    // Label Area
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#059669'; // Green
    ctx.fillText('Area = 20', width / 2, height / 2 + 20);
}

function drawPentagonExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const p1 = { x: 150, y: 30 };  // Top point
    const p2 = { x: 270, y: 100 }; // Right point
    const p3 = { x: 220, y: 220 }; // Bottom-right point
    const p4 = { x: 80, y: 220 };  // Bottom-left point
    const p5 = { x: 30, y: 100 };  // Left point

    const points = [p1, p2, p3, p4, p5];

    // Draw pentagon
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < 5; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels for angles
    const labels = ['110°', '120°', 'x', '130°', '90°'];
    const labelColors = ['#1f2937', '#1f2937', '#dc2626', '#1f2937', '#1f2937'];
    const labelOffsets = [
        { x: 0, y: 20 },   // p1
        { x: -20, y: 0 },  // p2
        { x: 0, y: -20 },  // p3
        { x: 20, y: -15 }, // p4
        { x: 23, y: 0 }    // p5
    ];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < 5; i++) {
        if (labels[i] === 'x') {
            ctx.font = 'bold 18px Inter'; // Make 'x' bigger
        } else {
            ctx.font = 'bold 14px Inter'; // Default font
        }
        ctx.fillStyle = labelColors[i];
        ctx.fillText(labels[i], points[i].x + labelOffsets[i].x, points[i].y + labelOffsets[i].y);

        if (labels[i] === '90°' || labels[i] === 'x') { // x is 90
            const p_curr = points[i];
            const p_prev = points[(i + 4) % 5];
            const p_next = points[(i + 1) % 5];
            const size = 12;

            const v1 = { x: p_prev.x - p_curr.x, y: p_prev.y - p_curr.y };
            const v1_mag = Math.sqrt(v1.x*v1.x + v1.y*v1.y);
            const u1 = { x: v1.x / v1_mag, y: v1.y / v1_mag };

            const v2 = { x: p_next.x - p_curr.x, y: p_next.y - p_curr.y };
            const v2_mag = Math.sqrt(v2.x*v2.x + v2.y*v2.y);
            const u2 = { x: v2.x / v2_mag, y: v2.y / v2_mag };

            const sq_p1 = { x: p_curr.x + size * u1.x, y: p_curr.y + size * u1.y };
            const sq_p2 = { x: p_curr.x + size * u2.x, y: p_curr.y + size * u2.y };
            const sq_p3 = { x: sq_p1.x + size * u2.x, y: sq_p1.y + size * u2.y };

            ctx.beginPath();
            ctx.moveTo(sq_p1.x, sq_p1.y); ctx.lineTo(sq_p3.x, sq_p3.y); ctx.lineTo(sq_p2.x, sq_p2.y);
            ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();
        }
    }
}

function drawParallelogramExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pA = { x: 50, y: height - 50 };
    const pB = { x: 130, y: 50 };
    const pC = { x: 300, y: 50 };
    const pD = { x: 220, y: height - 50 };

    // Draw parallelogram
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.lineTo(pD.x, pD.y);
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label vertices
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', pA.x - 15, pA.y);
    ctx.fillText('B', pB.x - 10, pB.y - 15);
    ctx.fillText('C', pC.x + 15, pC.y);
    ctx.fillText('D', pD.x + 10, pD.y + 15);

    // Label angles
    ctx.font = '14px Inter';
    ctx.fillStyle = '#dc2626'; // Red for expressions
    ctx.fillText('(5x - 20)°', pA.x + 105, pA.y - 70);
    ctx.fillText('(3x + 40)°', pC.x - 105, pC.y + 75);
    ctx.fillText('y°', pD.x + 50, pD.y - 90);

    // Draw angle arcs for B, C, and D
    drawAngleArc(ctx, pB, pC, pA, '#dc2626', '');
    drawAngleArc(ctx, pC, pD, pB, '#dc2626', '');
    drawAngleArc(ctx, pD, pA, pC, '#dc2626', '');
}

function drawExteriorAnglesExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const p1 = { x: 100, y: 50 };
    const p2 = { x: 250, y: 80 };
    const p3 = { x: 220, y: 200 };
    const p4 = { x: 80, y: 180 };
    const points = [p1, p2, p3, p4];

    // Draw polygon
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Function to draw exterior angles
    function drawExteriorAngle(p_curr, p_next, p_prev, label, color) {
        const extensionLength = 40;

        const v_ext = { x: p_curr.x - p_prev.x, y: p_curr.y - p_prev.y };
        const v_ext_mag = Math.sqrt(v_ext.x*v_ext.x + v_ext.y*v_ext.y);
        const u_ext = { x: v_ext.x / v_ext_mag, y: v_ext.y / v_ext_mag };
        const p_ext = { x: p_curr.x + extensionLength * u_ext.x, y: p_curr.y + extensionLength * u_ext.y };

        // Draw extended line
        ctx.beginPath();
        ctx.moveTo(p_curr.x, p_curr.y);
        ctx.lineTo(p_ext.x, p_ext.y);
        ctx.setLineDash([2, 3]);
        ctx.strokeStyle = '#9ca3af';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        drawAngleArc(ctx, p_curr, p_ext, p_next, color, label);
    }

    // Draw the exterior angles
    drawExteriorAngle(points[0], points[1], points[3], '80°', '#1f2937');
    drawExteriorAngle(points[1], points[2], points[0], '100°', '#1f2937');
    drawExteriorAngle(points[2], points[3], points[1], '90°', '#1f2937');
    drawExteriorAngle(points[3], points[0], points[2], 'x', '#dc2626');
}

function drawTrapezoidMedianExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pD = { x: 50, y: height - 40 };
    const pC = { x: width - 50, y: height - 40 };
    const pA = { x: 100, y: 40 };
    const pB = { x: width - 100, y: 40 };

    // Draw trapezoid
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.lineTo(pD.x, pD.y);
    ctx.closePath();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Calculate and draw median EF
    const pE = { x: (pA.x + pD.x) / 2, y: (pA.y + pD.y) / 2 };
    const pF = { x: (pB.x + pC.x) / 2, y: (pB.y + pC.y) / 2 };
    ctx.beginPath();
    ctx.moveTo(pE.x, pE.y);
    ctx.lineTo(pF.x, pF.y);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#dc2626'; // Red for median
    ctx.stroke();
    ctx.setLineDash([]);

    // Label vertices
    ctx.font = 'bold 16px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', pA.x, pA.y - 15);
    ctx.fillText('B', pB.x, pB.y - 15);
    ctx.fillText('C', pC.x + 15, pC.y);
    ctx.fillText('D', pD.x - 15, pD.y);
    ctx.fillText('E', pE.x - 15, pE.y);
    ctx.fillText('F', pF.x + 15, pF.y);

    // Label lengths
    ctx.font = '16px Inter';
    ctx.fillStyle = '#1d4ed8'; // Blue for expressions
    ctx.fillText('x + 2', (pA.x + pB.x) / 2, pA.y - 15);
    ctx.fillText('3x - 2', (pD.x + pC.x) / 2, pD.y + 15);
    ctx.fillStyle = '#b91c1c'; // Red for median length
    ctx.fillText('14', (pE.x + pF.x) / 2, pE.y + 15);
}

function drawTrapezoidAreaExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pD = { x: 50, y: height - 40 };
    const pC = { x: width - 50, y: height - 40 };
    const pA = { x: 100, y: 40 };
    const pB = { x: 250, y: 40 };

    // Draw trapezoid and fill
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.lineTo(pD.x, pD.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(167, 139, 250, 0.1)'; // Light purple fill
    ctx.fill();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw height (dashed)
    const h_x = width / 2;
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(h_x, pD.y);
    ctx.lineTo(h_x, pA.y);
    ctx.strokeStyle = '#ef4444'; // Red
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // Label lengths
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#1d4ed8'; // Blue for bases
    ctx.fillText('b₁ = 10', (pA.x + pB.x) / 2, pA.y - 15);
    ctx.fillText('b₂ = 18', (pD.x + pC.x) / 2, pD.y + 15);

    ctx.fillStyle = '#b91c1c'; // Red for height
    ctx.fillText('h = 7', h_x + 25, (pA.y + pD.y) / 2);
}

function drawRhombusAreaExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const d1_half = 80;  // half vertical diagonal
    const d2_half = 100; // half horizontal diagonal

    const pA = { x: centerX, y: centerY - d1_half }; // Top vertex
    const pB = { x: centerX + d2_half, y: centerY }; // Right vertex
    const pC = { x: centerX, y: centerY + d1_half }; // Bottom vertex
    const pD = { x: centerX - d2_half, y: centerY }; // Left vertex
    const pO = { x: centerX, y: centerY }; // Center

    // Draw rhombus
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y); ctx.lineTo(pB.x, pB.y); ctx.lineTo(pC.x, pC.y); ctx.lineTo(pD.x, pD.y); ctx.closePath();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2; ctx.stroke();

    // Draw diagonals (dashed)
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y); ctx.lineTo(pC.x, pC.y);
    ctx.strokeStyle = '#3b82f6'; // Blue
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pB.x, pB.y); ctx.lineTo(pD.x, pD.y);
    ctx.strokeStyle = '#ef4444'; // Red
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw right angle symbol
    ctx.strokeStyle = '#4b5563';
    ctx.strokeRect(centerX, centerY, 8, -8);

    // Labels
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Label vertices
    ctx.fillStyle = '#1f2937';
    ctx.fillText('O', pO.x - 10, pO.y - 10);

    // Label half-diagonal lengths
    ctx.fillStyle = '#1e40af'; // Dark Blue
    ctx.fillText('15', (pC.x + pO.x) / 2 + 15, (pC.y + pO.y) / 2);
    ctx.fillStyle = '#b91c1c'; // Dark Red
    ctx.fillText('8', (pB.x + pO.x) / 2, (pB.y + pO.y) / 2 - 15);
}

function drawCircleFromGraph(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // --- Setup Coordinate System ---
    const originX = width / 2;
    const originY = height / 2;
    const scale = 30; // pixels per unit

    const toCanvasX = (x) => originX + x * scale;
    const toCanvasY = (y) => originY - y * scale;

    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb'; // light gray
    ctx.lineWidth = 1;
    for (let x = -Math.floor(width / (2 * scale)); x <= Math.floor(width / (2 * scale)); x++) {
        ctx.moveTo(toCanvasX(x), 0);
        ctx.lineTo(toCanvasX(x), height);
    }
    for (let y = -Math.floor(height / (2 * scale)); y <= Math.floor(height / (2 * scale)); y++) {
        ctx.moveTo(0, toCanvasY(y));
        ctx.lineTo(width, toCanvasY(y));
    }
    ctx.stroke();

    // Draw Axes
    ctx.beginPath();
    ctx.moveTo(0, originY); ctx.lineTo(width, originY); // X-axis
    ctx.moveTo(originX, 0); ctx.lineTo(originX, height); // Y-axis
    ctx.strokeStyle = '#9ca3af'; // darker gray
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // --- Circle Parameters ---
    const h = -2, k = 1, r = 3;
    const center = { x: toCanvasX(h), y: toCanvasY(k) };

    // Draw circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, r * scale, 0, 2 * Math.PI);
    ctx.strokeStyle = '#a855f7'; // Purple
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw center point
    ctx.beginPath();
    ctx.arc(center.x, center.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ef4444'; // Red
    ctx.fill();

    // --- Labels ---
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Label center
    ctx.fillStyle = '#b91c1c'; // Dark Red
    ctx.fillText('(-2, 1)', center.x, center.y + 20);

    // Label axes numbers
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter';
    for (let i = -5; i <= 5; i++) {
        if (i !== 0) {
            if (toCanvasX(i) > 10 && toCanvasX(i) < width - 10) ctx.fillText(i, toCanvasX(i), originY + 15); // x-axis numbers
            if (toCanvasY(i) > 10 && toCanvasY(i) < height - 10) ctx.fillText(i, originX - 15, toCanvasY(i)); // y-axis numbers
        }
    }
}

function drawInscribedAngleExample1(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;
    const angle1 = -Math.PI / 4;
    const angle2 = Math.PI / 4;
    const pA = { x: centerX + radius * Math.cos(angle1), y: centerY + radius * Math.sin(angle1) };
    const pB = { x: centerX + radius * Math.cos(angle2), y: centerY + radius * Math.sin(angle2) };
    const pC = { x: centerX + radius * Math.cos(Math.PI * 0.8), y: centerY + radius * Math.sin(Math.PI * 0.8) };

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.stroke();

    // Draw central angle lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); ctx.lineTo(pA.x, pA.y);
    ctx.moveTo(centerX, centerY); ctx.lineTo(pB.x, pB.y);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Draw inscribed angle lines
    ctx.beginPath();
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pA.x, pA.y);
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pB.x, pB.y);
    ctx.stroke();

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('O', centerX, centerY);
    ctx.fillText('A', pA.x + 15, pA.y);
    ctx.fillText('B', pB.x + 15, pB.y);
    ctx.fillText('C', pC.x - 15, pC.y);

    // Angle labels
    drawAngleArc(ctx, {x: centerX, y: centerY}, pA, pB, '#dc2626', '70°');
    drawAngleArc(ctx, pC, pA, pB, '#2563eb', 'x');
}

function drawInscribedAngleExample2(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;

    // Points for the arc
    const angleA = Math.PI * 1.2;
    const angleB = Math.PI * 1.8;
    const pA = { x: centerX + radius * Math.cos(angleA), y: centerY + radius * Math.sin(angleA) };
    const pB = { x: centerX + radius * Math.cos(angleB), y: centerY + radius * Math.sin(angleB) };

    // Points for the inscribed angles
    const angleC = Math.PI * 0.2;
    const angleD = Math.PI * 0.8;
    const pC = { x: centerX + radius * Math.cos(angleC), y: centerY + radius * Math.sin(angleC) };
    const pD = { x: centerX + radius * Math.cos(angleD), y: centerY + radius * Math.sin(angleD) };

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.stroke();

    // Draw intercepted arc AB in a different color
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, angleA, angleB);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.stroke();

    // Draw lines for angle ACB and ADB
    ctx.beginPath();
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pA.x, pA.y); ctx.moveTo(pC.x, pC.y); ctx.lineTo(pB.x, pB.y);
    ctx.moveTo(pD.x, pD.y); ctx.lineTo(pA.x, pA.y); ctx.moveTo(pD.x, pD.y); ctx.lineTo(pB.x, pB.y);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Labels for points
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1f2937';
    ctx.fillText('A', pA.x - 10, pA.y + 15); ctx.fillText('B', pB.x + 10, pB.y + 15);
    ctx.fillText('C', pC.x + 15, pC.y); ctx.fillText('D', pD.x - 15, pD.y);

    // Angle labels
    drawAngleArc(ctx, pC, pA, pB, '#2563eb', 'x');
    drawAngleArc(ctx, pD, pA, pB, '#dc2626', '40°');
}

function drawTangentSegmentExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Increased scale for a bigger drawing and better layout
    const scale = 12;

    // Position the tangent point near the top-left to allow space for the triangle
    const pP = { x: 80, y: 50 };
    const pO = { x: pP.x, y: pP.y + 5 * scale }; // Center O is below P
    const pQ = { x: pP.x + 12 * scale, y: pP.y }; // Point Q is to the right

    // Draw circle
    ctx.beginPath();
    ctx.arc(pO.x, pO.y, 5 * scale, 0, 2 * Math.PI);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Draw triangle OPQ
    ctx.beginPath();
    ctx.moveTo(pO.x, pO.y); ctx.lineTo(pP.x, pP.y); // Radius
    ctx.lineTo(pQ.x, pQ.y); // Tangent segment
    ctx.lineTo(pO.x, pO.y); // Hypotenuse
    ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 2; ctx.stroke();

    // Draw tangent line extension
    ctx.beginPath();
    ctx.moveTo(pQ.x, pQ.y);
    ctx.lineTo(pQ.x + 30, pQ.y); // Extend to the right
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1; ctx.stroke();
    ctx.setLineDash([]);

    // Draw right angle symbol at P
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(pP.x, pP.y, 12, 12);

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Point labels
    ctx.fillStyle = '#1f2937';
    ctx.fillText('O', pO.x, pO.y + 15);
    ctx.fillText('P', pP.x - 15, pP.y);
    ctx.fillText('Q', pQ.x + 15, pQ.y);

    // Length labels
    ctx.fillStyle = '#1d4ed8'; // Blue
    ctx.fillText('5', (pO.x + pP.x) / 2 - 15, (pO.y + pP.y) / 2); // Radius
    ctx.fillStyle = '#b91c1c'; // Red
    ctx.fillText('x', (pP.x + pQ.x) / 2, pP.y - 15); // Tangent segment
    ctx.fillStyle = '#059669'; // Green
    ctx.save();
    ctx.translate((pO.x + pQ.x) / 2, (pO.y + pQ.y) / 2);
    ctx.rotate(Math.atan2(pQ.y - pO.y, pQ.x - pO.x));
    ctx.fillText('13', 0, -15); // Hypotenuse
    ctx.restore();
    ctx.fillText('13', (pO.x + pQ.x) / 2 + 15, (pO.y + pQ.y) / 2 - 15); // Hypotenuse
}

function drawSectorAreaExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const angleDegrees = 40;
    const startAngle = -Math.PI / 2; // Start at the top
    const endAngle = startAngle + (angleDegrees * Math.PI / 180);

    // Draw circle outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.stroke();

    // Draw and fill sector
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(168, 85, 247, 0.2)'; // Light purple fill
    ctx.fill();
    ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.stroke();

    // Draw angle arc for label
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, startAngle, endAngle);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Angle and Radius Labels
    const midAngle = (startAngle + endAngle) / 2;
    ctx.fillStyle = '#1f2937';
    ctx.fillText(angleDegrees + '°', centerX + 45 * Math.cos(midAngle), centerY + 45 * Math.sin(midAngle));
    ctx.fillStyle = '#1d4ed8'; // Blue for radius
    ctx.fillText('r = 9', centerX - 20, centerY - radius / 2);
}

function drawArcLengthExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;
    const angleDegrees = 150;
    const startAngle = -Math.PI / 2 - (angleDegrees * Math.PI / 180) / 2;
    const endAngle = -Math.PI / 2 + (angleDegrees * Math.PI / 180) / 2;

    // Draw circle outline
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.stroke();

    // Draw sector lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY); ctx.lineTo(centerX + radius * Math.cos(startAngle), centerY + radius * Math.sin(startAngle));
    ctx.moveTo(centerX, centerY); ctx.lineTo(centerX + radius * Math.cos(endAngle), centerY + radius * Math.sin(endAngle));
    ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.stroke();

    // Draw the arc itself, highlighted
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.stroke();

    // Draw angle arc for label
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, startAngle, endAngle);
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1.5; ctx.stroke();

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const midAngle = (startAngle + endAngle) / 2;
    ctx.fillStyle = '#1f2937';
    ctx.fillText(angleDegrees + '°', centerX + 45 * Math.cos(midAngle), centerY + 45 * Math.sin(midAngle));
    ctx.fillStyle = '#1d4ed8'; // Blue for radius
    ctx.fillText('r = 12', centerX + 50 * Math.cos(startAngle + 0.4), centerY + 50 * Math.sin(startAngle + 0.4));
    ctx.fillStyle = '#b91c1c'; // Red for arc length
    ctx.fillText('L = ?', centerX + (radius + 15) * Math.cos(midAngle), centerY + (radius + 15) * Math.sin(midAngle));
}

function drawSemicircleTriangleExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height - 60; // Place center near bottom
    const radius = 110;

    // Points for diameter
    const pA = { x: centerX - radius, y: centerY };
    const pB = { x: centerX + radius, y: centerY };

    // Point on the semicircle
    const angle = Math.PI * 1.6; // A point on the arc
    const pC = { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };

    // Draw semicircle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false); // Top half
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw diameter
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.stroke();

    // Draw triangle sides
    ctx.beginPath();
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pA.x, pA.y);
    ctx.moveTo(pC.x, pC.y); ctx.lineTo(pB.x, pB.y);
    ctx.strokeStyle = '#a855f7'; // Purple
    ctx.stroke();

    // Draw right angle symbol at C
    const size = 12;
    const v1 = { x: pA.x - pC.x, y: pA.y - pC.y }; const v1_mag = Math.sqrt(v1.x*v1.x + v1.y*v1.y); const u1 = { x: v1.x / v1_mag, y: v1.y / v1_mag };
    const v2 = { x: pB.x - pC.x, y: pB.y - pC.y }; const v2_mag = Math.sqrt(v2.x*v2.x + v2.y*v2.y); const u2 = { x: v2.x / v2_mag, y: v2.y / v2_mag };
    const sq_p1 = { x: pC.x + size * u1.x, y: pC.y + size * u1.y }; const sq_p2 = { x: pC.x + size * u2.x, y: pC.y + size * u2.y }; const sq_p3 = { x: sq_p1.x + size * u2.x, y: sq_p1.y + size * u2.y };
    ctx.beginPath();
    ctx.moveTo(sq_p1.x, sq_p1.y); ctx.lineTo(sq_p3.x, sq_p3.y); ctx.lineTo(sq_p2.x, sq_p2.y);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5; ctx.stroke();

    // Labels
    ctx.font = 'bold 14px Inter';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('A', pA.x - 15, pA.y);
    ctx.fillText('B', pB.x + 15, pB.y);
    ctx.fillText('C', pC.x, pC.y - 15);
}

function drawTangentCirclesExample(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const r_draw = 60; // radius for drawing
    const side = 2 * r_draw;
    const tri_h = side * Math.sqrt(3) / 2;

    const c1 = { x: width / 2, y: (height - tri_h) / 2 + 10 };
    const c2 = { x: (width - side) / 2, y: c1.y + tri_h };
    const c3 = { x: (width + side) / 2, y: c1.y + tri_h };
    const centers = [c1, c2, c3];

    // Draw circles
    ctx.beginPath();
    centers.forEach(center => {
        ctx.moveTo(center.x + r_draw, center.y); // moveTo to start new arc path
        ctx.arc(center.x, center.y, r_draw, 0, 2 * Math.PI);
    });
    ctx.strokeStyle = '#9ca3af'; // Gray
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw triangle connecting centers
    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.lineTo(c3.x, c3.y);
    ctx.closePath();
    ctx.strokeStyle = '#ef4444'; // Red
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw radii and labels
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw line from c1 to tangent point with c2
    const angle12 = Math.atan2(c2.y - c1.y, c2.x - c1.x);
    const t12 = { x: c1.x + r_draw * Math.cos(angle12), y: c1.y + r_draw * Math.sin(angle12) };
    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(t12.x, t12.y);
    ctx.strokeStyle = '#1d4ed8'; // Blue
    ctx.stroke();
    ctx.fillStyle = '#1d4ed8';
    ctx.fillText('5', (c1.x + t12.x) / 2 + 15, (c1.y + t12.y) / 2 - 5);

    // Label side length
    ctx.fillStyle = '#b91c1c'; // Red
    ctx.fillText('10', (c2.x + c3.x) / 2, c2.y + 20);
}
