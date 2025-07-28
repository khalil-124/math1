document.addEventListener('DOMContentLoaded', function() {
    const exampleBoxes = document.querySelectorAll('.example-box');
    exampleBoxes.forEach(box => {
        const title = box.querySelector('.example-title');
        const steps = box.querySelectorAll('.example-step');
        if (title && steps.length > 0) {
            title.style.cursor = 'pointer';
            title.innerHTML += ' <span class="toggle-indicator">(Show Steps)</span>';
            steps.forEach(step => step.style.display = 'none');

            title.addEventListener('click', () => {
                const isHidden = steps[0].style.display === 'none';
                steps.forEach(step => {
                    step.style.display = isHidden ? 'block' : 'none';
                });
                title.querySelector('.toggle-indicator').textContent = isHidden ? ' (Hide Steps)' : ' (Show Steps)';
            });
        }
    });

    const canvas = document.getElementById('unitCircleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        const angle = -Math.PI / 4; // A generic angle for demonstration

        // Point on circle
        const pX = centerX + radius * Math.cos(angle);
        const pY = centerY + radius * Math.sin(angle);

        // Draw X-Axis (Blue)
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.strokeStyle = '#005f73'; // Darker Blue
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Y-Axis (Red)
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Unit Circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#581c87'; // Darker Purple
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Radius line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pX, pY);
        ctx.strokeStyle = '#4b5563'; // Gray-600
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw triangle legs (bold and colored)
        // Horizontal leg (x-component) - Blue
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pX, centerY);
        ctx.strokeStyle = '#1e40af'; // Dark Blue
        ctx.lineWidth = 2;
        ctx.stroke();

        // Vertical leg (y-component) - Red
        ctx.beginPath();
        ctx.moveTo(pX, centerY);
        ctx.lineTo(pX, pY);
        ctx.strokeStyle = '#b91c1c'; // Dark Red
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Angle Arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, angle, true);
        ctx.strokeStyle = '#10b981'; // Emerald-500
        ctx.stroke();

        // Add Labels
        ctx.font = 'bold 14px Inter';
        ctx.fillStyle = '#005f73'; // Darker Blue
        ctx.fillText('x', canvas.width - 15, centerY - 8);
        ctx.fillStyle = '#9b2226'; // Darker Red
        ctx.fillText('y', centerX + 8, 15);

        ctx.font = 'bold 14px Inter';
        ctx.fillStyle = '#1f2937'; // Black
        ctx.fillText('θ', centerX + 30, centerY - 10);

        ctx.fillStyle = '#005f73'; // Darker Blue for x-related labels
        ctx.fillText('x', centerX + (pX - centerX) / 2, centerY + 15);

        ctx.fillStyle = '#9b2226'; // Darker Red for y-related labels
        ctx.fillText('y', pX + 8, centerY + (pY - centerY) / 2);

        ctx.fillStyle = '#1f2937'; // Black for point label
        ctx.font = 'bold 12px Inter';
        ctx.fillText('(x, y)', pX, pY - 8);
    }

    const exampleCanvas = document.getElementById('unitCircleExampleCanvas');
    if (exampleCanvas) {
        const ctx = exampleCanvas.getContext('2d');
        const centerX = exampleCanvas.width / 2;
        const centerY = exampleCanvas.height / 2;
        const radius = 100;
        const angle = -Math.PI / 4; // Specific angle for the example

        // Point on circle
        const pX = centerX + radius * Math.cos(angle);
        const pY = centerY + radius * Math.sin(angle);

        // Draw Axes
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(exampleCanvas.width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, exampleCanvas.height);
        ctx.strokeStyle = '#d1d5db';
        ctx.stroke();

        // Draw Unit Circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#581c87'; // Darker Purple
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Radius line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pX, pY);
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw triangle legs
        // Horizontal leg (x-component)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pX, centerY);
        ctx.strokeStyle = '#1e40af'; // Dark Blue
        ctx.lineWidth = 2;
        ctx.stroke();
        // Vertical leg (y-component)
        ctx.beginPath();
        ctx.moveTo(pX, centerY);
        ctx.lineTo(pX, pY);
        ctx.strokeStyle = '#b91c1c'; // Dark Red
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Angle Arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, angle, true);
        ctx.strokeStyle = '#10b981'; // Emerald-500
        ctx.stroke();

        // Add Labels
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px Inter';
        ctx.fillText('π/4', centerX + 30, centerY - 10);
        ctx.font = 'bold 14px Inter';
        ctx.fillText('(√2/2, √2/2)', pX + 5, pY - 5);
    }

    const sineGraphCanvas = document.getElementById('sineGraphCanvas');
    if (sineGraphCanvas) {
        const ctx = sineGraphCanvas.getContext('2d');
        const width = sineGraphCanvas.width;
        const height = sineGraphCanvas.height;
        const centerY = height / 2;
        const centerX = 40;

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height); // Y-axis
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY); // X-axis
        ctx.strokeStyle = '#d1d5db';
        ctx.stroke();

        // Draw sine wave
        ctx.beginPath();
        ctx.strokeStyle = '#581c87'; // Darker Purple
        ctx.lineWidth = 2;
        const amplitude = 80;
        const frequency = 0.015;
        const periodX = (2 * Math.PI) / frequency;

        for (let x = 0; x < width - centerX; x++) {
            const y = Math.sin(x * frequency) * amplitude;
            ctx.lineTo(centerX + x, centerY - y);
        }
        ctx.stroke();

        // Draw Amplitude line and label
        ctx.beginPath();
        ctx.setLineDash([3, 4]);
        ctx.moveTo(centerX + periodX / 4, centerY - amplitude);
        ctx.lineTo(centerX + periodX / 4, centerY);
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.stroke();

        ctx.fillStyle = '#9b2226';
        ctx.font = 'bold 14px Inter';
        ctx.fillText('Amplitude |A|', centerX + periodX / 4 + 12, centerY - amplitude / 2);

        // Draw Period line and label
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 25);
        ctx.lineTo(centerX + periodX, centerY + 25);
        ctx.strokeStyle = '#005f73'; // Darker Green
        ctx.stroke();
        ctx.moveTo(centerX + periodX, centerY + 25);
        ctx.lineTo(centerX + periodX - 5, centerY + 20);
        ctx.moveTo(centerX + periodX, centerY + 25);
        ctx.lineTo(centerX + periodX - 5, centerY + 30);
        ctx.stroke();

        ctx.fillStyle = '#059669';
        ctx.font = 'bold 14px Inter';
        ctx.fillText('Period (2π/|B|)', centerX + periodX / 2 - 60, centerY + 45);
        ctx.setLineDash([]);
    }

    const transformationCanvas = document.getElementById('transformationCanvas');
    if (transformationCanvas) {
        const ctx = transformationCanvas.getContext('2d');
        const width = transformationCanvas.width;
        const height = transformationCanvas.height;

        // Transformation parameters
        const scaleX = 20;
        const scaleY = 15;
        const originX = width / 2 - 30;
        const originY = height - 80;

        // Function to convert graph coords to canvas coords
        const toCanvasX = (x) => originX + x * scaleX;
        const toCanvasY = (y) => originY - y * scaleY;

        // Draw Axes
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(width, originY); // X-axis
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, height); // Y-axis
        ctx.strokeStyle = '#d1d5db';
        ctx.stroke();

        // Draw Parent Function: f(x) = x^2 (dashed grey)
        ctx.beginPath();
        ctx.strokeStyle = '#9ca3af';
        ctx.setLineDash([4, 4]);
        for (let x = -10; x <= 10; x += 0.1) {
            const y = x * x;
            ctx.lineTo(toCanvasX(x), toCanvasY(y));
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Transformed Function: g(x) = -2(x+3)^2 + 4 (solid purple)
        ctx.beginPath();
        ctx.strokeStyle = '#581c87'; // Darker Purple
        ctx.lineWidth = 2;
        for (let x = -10; x <= 10; x += 0.1) {
            const y = -2 * Math.pow(x + 3, 2) + 4;
            ctx.lineTo(toCanvasX(x), toCanvasY(y));
        }
        ctx.stroke();
        ctx.lineWidth = 1;

        // Draw shift arrows and labels
        ctx.setLineDash([2, 2]);
        // Horizontal shift arrow
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.lineTo(toCanvasX(-3), toCanvasY(0));
        ctx.strokeStyle = '#005f73'; // Darker Blue
        ctx.stroke();

        // Vertical shift arrow
        ctx.beginPath();
        ctx.moveTo(toCanvasX(-3), toCanvasY(0));
        ctx.lineTo(toCanvasX(-3), toCanvasY(4));
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.stroke();
        ctx.setLineDash([]);

        // Add text labels for shifts
        ctx.fillStyle = '#005f73';
        ctx.font = '12px Inter';
        ctx.fillText('Shift Left 3', toCanvasX(-1.5) - 30, toCanvasY(0) + 15);
        ctx.fillStyle = '#9b2226';
        ctx.fillText('Shift Up 4', toCanvasX(-3) + 8, toCanvasY(2));
    }

    // --- Systems of Equations Graphs ---
    const drawSystemGraph = (canvasId, drawLines) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas and set background
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, width, height);

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2); // X-axis
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height); // Y-axis
        ctx.strokeStyle = '#e5e7eb'; // Gray-200
        ctx.stroke();

        // Call the specific line drawing function
        drawLines(ctx, width, height);
    };

    // 1. One Solution
    drawSystemGraph('oneSolutionCanvas', (ctx, width, height) => {
        ctx.lineWidth = 2;
        // Line 1
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(width - 20, height - 20);
        ctx.strokeStyle = '#005f73'; // Darker Blue
        ctx.stroke();

        // Line 2
        ctx.beginPath();
        ctx.moveTo(20, height - 20);
        ctx.lineTo(width - 20, 20);
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.stroke();
    });

    // 2. No Solution
    drawSystemGraph('noSolutionCanvas', (ctx, width, height) => {
        ctx.lineWidth = 2;
        // Line 1
        ctx.beginPath();
        ctx.moveTo(20, 50);
        ctx.lineTo(width - 20, 100);
        ctx.strokeStyle = '#005f73'; // Darker Blue
        ctx.stroke();

        // Line 2 (parallel)
        ctx.beginPath();
        ctx.moveTo(20, 80);
        ctx.lineTo(width - 20, 130);
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.stroke();
    });

    // 3. Infinite Solutions
    drawSystemGraph('infiniteSolutionCanvas', (ctx, width, height) => {
        ctx.lineWidth = 3;
        // Draw one line to represent both
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(width - 20, height - 20);
        ctx.strokeStyle = '#581c87'; // Darker Violet
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
    });

    // --- Linear-Quadratic System Graphs ---

    const drawParabola = (ctx, originX, originY, a, k) => {
        ctx.beginPath();
        ctx.strokeStyle = '#581c87'; // Darker Purple
        ctx.lineWidth = 2;
        for (let x = -originX; x < originX; x += 2) {
            const y = a * x * x + k;
            ctx.lineTo(originX + x, originY - y);
        }
        ctx.stroke();
    };

    drawSystemGraph('lqTwoSolutionsCanvas', (ctx, width, height) => {
        const originX = width / 2;
        const originY = height - 20;

        // Draw Parabola y = 0.02x^2 + 20
        drawParabola(ctx, originX, originY, 0.02, 20);

        // Draw intersecting line
        ctx.beginPath();
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.lineWidth = 2;
        ctx.moveTo(0, originY - 80);
        ctx.lineTo(width, originY - 60);
        ctx.stroke();
    });

    drawSystemGraph('lqOneSolutionCanvas', (ctx, width, height) => {
        const originX = width / 2;
        const originY = height - 20;

        // Draw Parabola y = 0.02x^2 + 40
        drawParabola(ctx, originX, originY, 0.02, 40);

        // Draw tangent line
        ctx.beginPath();
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.lineWidth = 2;
        ctx.moveTo(0, originY - 40);
        ctx.lineTo(width, originY - 40);
        ctx.stroke();
    });

    drawSystemGraph('lqNoSolutionsCanvas', (ctx, width, height) => {
        const originX = width / 2;
        const originY = height - 20;

        // Draw Parabola y = 0.02x^2 + 80
        drawParabola(ctx, originX, originY, 0.02, 80);

        // Draw non-intersecting line
        ctx.beginPath();
        ctx.strokeStyle = '#9b2226'; // Darker Red
        ctx.lineWidth = 2;
        ctx.moveTo(0, originY - 40);
        ctx.lineTo(width, originY - 40);
        ctx.stroke();
    });
});
