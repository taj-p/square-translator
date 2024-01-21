# Square Renderer WebApp

## Overview

This web application dynamically renders squares on the page and allows the user to modify
the rendering behavior and the number of squares via query parameters. We simulate drawing
many squares on a DOM to understand page load and dragging interaction performance.

The app can render squares using Vanilla JavaScript, React with reconciliation, or React while skipping
reconciliation (by running event listeners directly on a `ref`).
