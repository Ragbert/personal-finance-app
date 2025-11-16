/* assets/js/transactions.js
	CRUD y filtros de transacciones en el cliente.
*/
document.addEventListener("DOMContentLoaded", ()=> {
	// Si la página tiene formulario de agregar
	const addForm = document.getElementById("add-transaction-form");
	if(addForm) addForm.addEventListener("submit", handleAddTransaction);

	const editForm = document.getElementById("edit-transaction-form");
	if(editForm) {
		// cargar datos en inputs
		const txId = new URLSearchParams(location.search).get("id");
		if(txId) populateEditForm(txId);
		editForm.addEventListener("submit", handleEditTransaction);
	}

	const listContainer = document.getElementById("transactions-list");
	if(listContainer) renderTransactionsList();

	// filters
	const filterForm = document.getElementById("filter-form");
	if(filterForm) {
		filterForm.addEventListener("submit", (e)=>{ e.preventDefault(); renderTransactionsList(); });
		document.getElementById("clear-filters")?.addEventListener("click", (e)=>{ e.preventDefault(); filterForm.reset(); renderTransactionsList(); });
	}
});

/** Manejar añadir transacción */
function handleAddTransaction(e){
	e.preventDefault();
	const session = getSession();
	if(!session.userId){ showNotification("Sesión inválida","error"); return; }

	const type = e.target.type.value;
	const amount = parseFloat(e.target.amount.value);
	const category = e.target.category.value;
	const date = e.target.date.value;
	const note = e.target.note.value;

	if(!type || isNaN(amount) || !date || !category){ showNotification("Complete los campos requeridos","error"); return; }

	const tx = {
		id: uid("t_"),
		userId: session.userId,
		type, // "income" | "expense"
		amount: Math.abs(amount),
		category,
		date, // YYYY-MM-DD
		note: note || "",
		createdAt: new Date().toISOString()
	};
	addTransaction(tx);
	showNotification("Transacción agregada");
	setTimeout(()=> window.location.href = "transactions.html", 400);
}

/** Poblado del formulario de edición */
function populateEditForm(id){
	const txs = getTransactionsByUser(getSession().userId);
	const tx = txs.find(t => t.id === id);
	if(!tx){ showNotification("Transacción no encontrada","error"); return; }
	const f = document.getElementById("edit-transaction-form");
	if(!f) return;
	f.idHidden.value = tx.id;
	f.type.value = tx.type;
	f.amount.value = tx.amount;
	f.category.value = tx.category;
	f.date.value = tx.date;
	f.note.value = tx.note;
}

/** Manejar edición */
function handleEditTransaction(e){
	e.preventDefault();
	const id = e.target.idHidden.value;
	const type = e.target.type.value;
	const amount = parseFloat(e.target.amount.value);
	const category = e.target.category.value;
	const date = e.target.date.value;
	const note = e.target.note.value;

	if(!id || !type || isNaN(amount) || !category || !date){ showNotification("Complete los campos","error"); return; }

	const updated = {
		id,
		userId: getSession().userId,
		type,
		amount: Math.abs(amount),
		category,
		date,
		note,
		updatedAt: new Date().toISOString()
	};
	updateTransaction(updated);
	showNotification("Transacción actualizada");
	setTimeout(()=> window.location.href = "transactions.html", 400);
}

/** Render lista con filtros y orden */
function renderTransactionsList(page = 1){
	const container = document.getElementById("transactions-list");
	if(!container) return;
	const session = getSession();
	if(!session.userId){ container.innerHTML = "<div class='card'>Sin sesión</div>"; return; }
	let txs = getTransactionsByUser(session.userId);

	// filtros del formulario
	const f = document.getElementById("filter-form");
	if(f){
		const category = f.category.value;
		const type = f.type.value;
		const dateFrom = f.dateFrom.value;
		const dateTo = f.dateTo.value;
		const orderBy = f.orderBy.value;

		if(category) txs = txs.filter(t => t.category === category);
		if(type) txs = txs.filter(t => t.type === type);
		if(dateFrom) txs = txs.filter(t => parseDate(t.date) >= parseDate(dateFrom));
		if(dateTo) txs = txs.filter(t => parseDate(t.date) <= parseDate(dateTo));
		if(orderBy === "date_desc") txs = txs.sort((a,b)=> new Date(b.date) - new Date(a.date));
		if(orderBy === "date_asc") txs = txs.sort((a,b)=> new Date(a.date) - new Date(b.date));
		if(orderBy === "amount_desc") txs = txs.sort((a,b)=> b.amount - a.amount);
		if(orderBy === "amount_asc") txs = txs.sort((a,b)=> a.amount - b.amount);
	} else {
		txs = txs.sort((a,b)=> new Date(b.date) - new Date(a.date));
	}

	// render
	if(txs.length === 0){
		container.innerHTML = `<div class="card center">No hay transacciones.</div>`;
		return;
	}

	const rows = txs.map(tx => {
		const cls = tx.type === "income" ? "transaction-income" : "transaction-expense";
		return `<tr class="fade-in">
			<td>${tx.date}</td>
			<td>${tx.category}</td>
			<td class="${cls}">${tx.type === "income" ? "+" : "-"} ${formatNumber(tx.amount)}</td>
			<td class="small muted">${tx.note || ""}</td>
			<td>
				<div class="row">
					<a class="action-btn btn ghost" href="edit-transaction.html?id=${tx.id}">Editar</a>
					<button class="action-btn btn" onclick="confirmDelete('${tx.id}')">Eliminar</button>
				</div>
			</td>
		</tr>`;
	}).join("");

	container.innerHTML = `
		<div class="card">
			<table class="table">
				<thead>
					<tr><th>Fecha</th><th>Categoría</th><th>Monto</th><th>Nota</th><th>Acciones</th></tr>
				</thead>
				<tbody>
					${rows}
				</tbody>
			</table>
		</div>
	`;
}

/** Confirmar eliminación */
function confirmDelete(id){
	if(!confirm("Eliminar transacción? Esto no se puede deshacer.")) return;
	deleteTransaction(id);
	showNotification("Transacción eliminada");
	renderTransactionsList();
}
