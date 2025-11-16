/* assets/js/charts.js
	Gráficos con Chart.js (CDN incluido en la HTML que carga este script)
*/

/**
	* Genera datos de gastos por mes para mostrar en barra.
	* transactions: array de transacciones del usuario
	*/
function computeMonthlyTotals(transactions){
	// retornar mes en formato 'YYYY-MM'
	const map = {};
	transactions.forEach(t => {
		const m = t.date.slice(0,7); // YYYY-MM
		if(!map[m]) map[m] = 0;
		if(t.type === "expense") map[m] += t.amount;
	});
	// ordenar
	const keys = Object.keys(map).sort();
	const vals = keys.map(k => map[k]);
	return { labels: keys, values: vals };
}

/** Gastos por categoría (torta) */
function computeCategoryDistribution(transactions){
	const map = {};
	transactions.forEach(t => {
		if(t.type === "expense"){
			map[t.category] = (map[t.category] || 0) + t.amount;
		}
	});
	return {
		labels: Object.keys(map),
		values: Object.values(map)
	};
}

/** Balance evolution (suma ingresos-gastos por mes) */
function computeBalanceEvolution(transactions){
	const map = {};
	transactions.forEach(t => {
		const m = t.date.slice(0,7);
		map[m] = map[m] || 0;
		map[m] += (t.type === "income" ? t.amount : -t.amount);
	});
	const keys = Object.keys(map).sort();
	const values = keys.map(k => map[k]);
	return { labels: keys, values };
}

/** Crear gráfico (barra) */
function renderBarChart(canvasEl, transactions){
	const ctx = canvasEl.getContext('2d');
	const data = computeMonthlyTotals(transactions);
	return new Chart(ctx, {
		type: 'bar',
		data: {
			labels: data.labels,
			datasets: [{
				label: 'Gastos por mes',
				data: data.values,
				borderRadius: 6,
				borderSkipped: false,
				tension: 0.3
			}]
		},
		options: {
			responsive: true,
			plugins: { legend: { display: false } }
		}
	});
}

/** Crear gráfica de torta (categorías) */
function renderPieChart(canvasEl, transactions){
	const ctx = canvasEl.getContext('2d');
	const data = computeCategoryDistribution(transactions);
	return new Chart(ctx, {
		type: 'pie',
		data: {
			labels: data.labels,
			datasets: [{ data: data.values }]
		},
		options: { responsive: true }
	});
}

/** Línea de balance */
function renderLineChart(canvasEl, transactions){
	const ctx = canvasEl.getContext('2d');
	const data = computeBalanceEvolution(transactions);
	return new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.labels,
			datasets: [{ label: 'Evolución balance', data: data.values, fill: true, tension: 0.25 }]
		},
		options: { responsive: true }
	});
}
