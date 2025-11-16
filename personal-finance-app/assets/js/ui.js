/* assets/js/ui.js
	Controles de UI: tema, menú, etc.
*/
document.addEventListener("DOMContentLoaded", ()=>{
	// apply theme
	const prefs = getPrefs();
	const theme = prefs.theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	applyTheme(theme);

	const themeToggle = document.getElementById("theme-toggle");
	if(themeToggle){
		themeToggle.addEventListener("click", ()=> {
			const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
			const next = current === "dark" ? "light" : "dark";
			applyTheme(next);
			setPrefs({ theme: next });
		});
	}
});

/** Aplica el tema al documento */
function applyTheme(theme){
	if(theme === "dark"){
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		document.documentElement.setAttribute("data-theme", "light");
	}
}

/** Protege rutas: deberías usar data-protected="true" en body de páginas privadas */
function requireAuthOrRedirect(){
	const s = getSession();
	if(!s || !s.userId) window.location.href = "index.html";
}
