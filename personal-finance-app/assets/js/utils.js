/* assets/js/utils.js */
/* Utilidades pequeñas usadas por la app */

/**
    * Formatea número a moneda local (sin símbolo)
    * @param {number} n
    * @returns {string}
    */
function formatNumber(n){
    if(isNaN(n)) return "0.00";
    return Number(n).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
}

/** Generador simple de IDs */
function uid(prefix = "") {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

/** Mostrar notificación simple (interna) */
function showNotification(message, type = "success", timeout = 2000) {
    const el = document.createElement("div");
    el.className = `alert ${type==="success" ? "success" : "error"}`;
    el.textContent = message;
    el.style.position = "fixed";
    el.style.right = "18px";
    el.style.bottom = "18px";
    el.style.zIndex = 9999;
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), timeout);
}

/** Parse date ISO-friendly */
function parseDate(dateStr) {
    // dateStr expected YYYY-MM-DD
    return new Date(dateStr + "T00:00:00");
}
