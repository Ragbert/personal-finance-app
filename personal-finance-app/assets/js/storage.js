/* assets/js/storage.js
	Abstracción simple para localStorage con la estructura:
	{
		users: [],
		transactions: [],
		session: {}
	}
*/

const STORAGE_KEY = "pf_app_v1";

/** Crea estructura inicial si no existe */
function ensureStorage(){
	const raw = localStorage.getItem(STORAGE_KEY);
	if(!raw){
		const base = { users: [], transactions: [], session: {}, prefs: {} };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
		return base;
	}
	try {
		return JSON.parse(raw);
	} catch(e) {
		// si está corrupto, reiniciar
		const base = { users: [], transactions: [], session: {}, prefs: {} };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
		return base;
	}
}

/** Persistir */
function saveStorage(obj){
	localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

/** Helpers */
function getAllUsers(){
	return ensureStorage().users;
}
function getAllTransactions(){
	return ensureStorage().transactions;
}
function getSession(){
	return ensureStorage().session || {};
}
function setSession(sessionObj){
	const s = ensureStorage();
	s.session = sessionObj;
	saveStorage(s);
}
function clearSession(){
	const s = ensureStorage();
	s.session = {};
	saveStorage(s);
}

/** Usuarios */
function addUser(user){
	const s = ensureStorage();
	s.users.push(user);
	saveStorage(s);
	}
function findUserByEmail(email){
	return ensureStorage().users.find(u => u.email.toLowerCase() === email.toLowerCase());
}
function findUserById(id){
	return ensureStorage().users.find(u => u.id === id);
}
function removeUserById(id){
	const s = ensureStorage();
	s.users = s.users.filter(u => u.id !== id);
	// borrar también transacciones del usuario
	s.transactions = s.transactions.filter(t => t.userId !== id);
	saveStorage(s);
}

/** Transacciones */
function addTransaction(tx){
	const s = ensureStorage();
	s.transactions.push(tx);
	saveStorage(s);
}
function updateTransaction(updated){
	const s = ensureStorage();
	s.transactions = s.transactions.map(t => t.id === updated.id ? updated : t);
	saveStorage(s);
}
function deleteTransaction(id){
	const s = ensureStorage();
	s.transactions = s.transactions.filter(t => t.id !== id);
	saveStorage(s);
	}
function getTransactionsByUser(userId){
	return ensureStorage().transactions.filter(t => t.userId === userId);
}

/** Preferences */
function getPrefs(){
	const s = ensureStorage();
	return s.prefs || {};
}
function setPrefs(prefs){
	const s = ensureStorage();
	s.prefs = Object.assign({}, s.prefs, prefs);
	saveStorage(s);
}

/** Export / Import */
function exportAllData(){
	return ensureStorage();
}
function importData(obj){
	if(!obj || typeof obj !== "object") throw new Error("Formato inválido");
	// se pueden realizar validaciones más estrictas
	localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}
