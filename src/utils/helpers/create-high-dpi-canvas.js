'use strict';

module.exports = {
    createHiDPICanvas: function(canvas, ratio) {
        if (!canvas) {
            canvas = document.createElement('canvas');
        }
        const orgWidth = canvas.width;
        const orgHeight = canvas.height;
        canvas.width = orgWidth * ratio;
        canvas.height = orgHeight * ratio;
        canvas.style.width = `${orgWidth}px`;
        canvas.style.height = `${orgHeight}px`;
        canvas.getContext('2d').scale(ratio, ratio);
        return canvas;
    },
    animateCircle: function(current, canvasProps, context, curPerc, endPercent, xCoord, yCoord, circleCanvas) {
        context.clearRect(0, 0, circleCanvas.width, circleCanvas.height);

        // draw the green circle.
        context.strokeStyle = canvasProps.colorCoreGreen;
        context.lineWidth = 4;
        context.beginPath();
        context.arc(xCoord, yCoord, circleCanvas.dataset.radius, -(canvasProps.quarterCircle),
            ((canvasProps.completeCircle) * current) - canvasProps.quarterCircle, canvasProps.counterClockwise);
        context.stroke();
        curPerc++;
        if (curPerc <= endPercent) {
            requestAnimationFrame(() => {
                this.animateCircle(curPerc / 100, canvasProps, context, curPerc, endPercent, xCoord, yCoord, circleCanvas);
            });
        }
    }
};
