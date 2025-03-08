# Performance Optimization

This guide covers performance optimization techniques for Canopy Charts visualizations. With the **code-ownership model**, you have complete control over performance optimizations.

## Code Ownership Advantage

Traditional libraries often make performance tradeoffs to support a wide range of use cases. With Canopy Charts:

- You can **optimize specifically for your use case**
- You can **modify rendering logic** directly
- You can **implement custom optimizations** not available in generic libraries
- You have **direct access to D3's performance features**

## Core Optimization Techniques

### 1. Data Processing Optimization

```tsx
// Before optimization - processing on every render
function MyChart({ data }) {
	const processedData = heavyDataProcessing(data);
	// ...rendering logic
}

// After optimization - memoized processing
function MyChart({ data }) {
	const processedData = useMemo(() => {
		return heavyDataProcessing(data);
	}, [data]);
	// ...rendering logic
}
```

### 2. Render Optimization

```tsx
// Optimize D3 selections to minimize DOM operations
function optimizedRender(svg, data) {
	// Use D3's enter/update/exit pattern
	const bars = d3.select(svg).selectAll('.bar').data(data);

	// Enter new elements
	bars
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.merge(bars) // Merge with update selection
		.attr('x', (d) => xScale(d.label))
		.attr('y', (d) => yScale(d.value))
		.attr('width', xScale.bandwidth())
		.attr('height', (d) => height - yScale(d.value));

	// Remove old elements
	bars.exit().remove();
}
```

### 3. Canvas Rendering for Large Datasets

For datasets with thousands of points, you can switch from SVG to Canvas rendering:

```tsx
// In your chart component
const canvasRef = useRef(null);

useEffect(() => {
	if (!canvasRef.current) return;
	const ctx = canvasRef.current.getContext('2d');

	// Clear canvas
	ctx.clearRect(0, 0, width, height);

	// Draw data points
	data.forEach((point) => {
		ctx.beginPath();
		ctx.arc(xScale(point.x), yScale(point.y), 3, 0, 2 * Math.PI);
		ctx.fill();
	});
}, [data, width, height]);

return (
	<canvas
		ref={canvasRef}
		width={width}
		height={height}
	/>
);
```

### 4. Virtualization for Large Datasets

```tsx
import { FixedSizeList } from 'react-window';

function VirtualizedChart({ data }) {
	return (
		<FixedSizeList
			height={500}
			width={800}
			itemCount={data.length}
			itemSize={30}
		>
			{({ index, style }) => (
				<div style={style}>
					<BarItem data={data[index]} />
				</div>
			)}
		</FixedSizeList>
	);
}
```

### 5. Web Workers for Heavy Computations

```tsx
// In your component
useEffect(() => {
	const worker = new Worker('data-processor.worker.js');

	worker.postMessage({ data, options });

	worker.onmessage = (e) => {
		setProcessedData(e.data);
	};

	return () => worker.terminate();
}, [data, options]);

// In data-processor.worker.js
self.onmessage = (e) => {
	const { data, options } = e.data;
	const processed = heavyDataProcessing(data, options);
	self.postMessage(processed);
};
```

## Measuring Performance

To identify bottlenecks:

1. Use the **React Profiler** to identify component render issues
2. Use **Chrome DevTools Performance** tab to profile rendering
3. Add **custom timing measurements**:

```tsx
function MyChart({ data }) {
	useEffect(() => {
		console.time('chart-render');
		// Rendering logic
		console.timeEnd('chart-render');
	}, [data]);

	// ...
}
```

## Custom Optimizations

With the code-ownership model, you can implement custom optimizations specific to your use case:

1. **Data sampling** for extremely large datasets
2. **Level-of-detail** rendering based on zoom level
3. **Progressive loading** of visualization elements
4. **Custom caching** of computed values

## Next Steps

- Explore the [examples directory](../examples/advanced/) for performance examples
- Check out the [architecture documentation](ARCHITECTURE.md) for technical details
- See the [LLM Guide](../LLM-GUIDE.md) for help with performance optimizations
