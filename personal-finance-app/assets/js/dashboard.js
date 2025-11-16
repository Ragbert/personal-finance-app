/* assets/js/dashboard.js
	Lógica para mostrar métricas y últimos movimientos en dashboard.
*/
document.addEventListener("DOMContentLoaded", ()=> {
	if(document.getElementById("dashboard-root")){
		renderDashboard();
	}

	// Export / Import
	const exportBtn = document.getElementById("export-data");
	if(exportBtn) exportBtn.addEventListener("click", ()=> {
		const data = exportAllData();
		const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `pf-data-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
		showNotification("Datos exportados");
	});

	const importInput = document.getElementById("import-data");
	if(importInput){
		importInput.addEventListener("change", (e)=> {
			const file = e.target.files[0];
			if(!file) return;
			const reader = new FileReader();
			reader.onload = function(evt){
				try{
					const parsed = JSON.parse(evt.target.result);
					if(confirm("Importar reemplazará los datos actuales. Confirmar?")){
						importData(parsed);
						showNotification("Datos importados. Recargando...");
						setTimeout(()=> location.reload(), 800);
					}
				} catch(err){
					showNotification("Archivo JSON inválido","error");
				}
			};
			reader.readAsText(file);
		});
	}

	// Delete account
	const deleteAccBtn = document.getElementById("delete-account");
	if(deleteAccBtn){
		deleteAccBtn.addEventListener("click", ()=> {
			if(!confirm("¿Eliminar tu cuenta? Esto borrará todas tus transacciones. Confirmar.")) return;
			const session = getSession();
			removeUserById(session.userId);
			clearSession();
			showNotification("Cuenta eliminada");
			setTimeout(()=> location.href = "index.html", 700);
		});
	}
});

/** Renderiza métricas y charts */
function renderDashboard(){
	const session = getSession();
	if(!session.userId) { window.location.href = "index.html"; return; }
	const txs = getTransactionsByUser(session.userId).sort((a,b)=> new Date(b.date) - new Date(a.date));
	// Totales
	const totalIncome = txs.filter(t=>t.type==="income").reduce((s,t)=> s + t.amount,0);
	const totalExpense = txs.filter(t=>t.type==="expense").reduce((s,t)=> s + t.amount,0);
	const balance = totalIncome - totalExpense;
	document.getElementById("total-income").textContent = `+ ${formatNumber(totalIncome)}`;
	document.getElementById("total-expense").textContent = `- ${formatNumber(totalExpense)}`;
	document.getElementById("balance").textContent = `${formatNumber(balance)}`;

	// últimas transacciones
	const last = txs.slice(0,8);
	const list = document.getElementById("recent-list");
	list.innerHTML = last.map(t=> {
		return `<div class="row" style="justify-content:space-between;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,0.03)">
			<div>
				<div><strong>${t.category}</strong> <span class="muted small">• ${t.date}</span></div>
				<div class="muted small">${t.note || ""}</div>
			</div>
			<div class="${t.type==='income' ? 'transaction-income' : 'transaction-expense'}">${t.type==='income' ? '+' : '-'} ${formatNumber(t.amount)}</div>
		</div>`;
	}).join("");

	// charts (destroy previous if exists)
	const barCanvas = document.getElementById("chart-bar");
	const pieCanvas = document.getElementById("chart-pie");
	const lineCanvas = document.getElementById("chart-line");
	// require Chart globally (loaded via CDN)
	if(window.Chart){
		// Clean canvas
		if(window._barChart) window._barChart.destroy();
		if(window._pieChart) window._pieChart.destroy();
		if(window._lineChart) window._lineChart.destroy();
		window._barChart = renderBarChart(barCanvas, txs);
		window._pieChart = renderPieChart(pieCanvas, txs);
		window._lineChart = renderLineChart(lineCanvas, txs);
	}
}
