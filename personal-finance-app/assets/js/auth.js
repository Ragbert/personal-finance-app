/* assets/js/auth.js
    Manejo de registro, login, protección de páginas y logout.
*/

document.addEventListener("DOMContentLoaded", ()=> {
    // Si estamos en login/register se ejecutan ciertos listeners
    const loginForm = document.getElementById("login-form");
    if(loginForm){
        loginForm.addEventListener("submit", handleLogin);
    }
    const registerForm = document.getElementById("register-form");
    if(registerForm){
        registerForm.addEventListener("submit", handleRegister);
    }

    // Logout links/buttons
    const logoutBtn = document.getElementById("logout-btn");
    if(logoutBtn) logoutBtn.addEventListener("click", ()=> {
        clearSession();
        window.location.href = "index.html";
    });

    // Protege páginas que requieren sesión
    const protectedPages = document.body.dataset.protected;
    if(protectedPages === "true"){
        const session = getSession();
        if(!session || !session.userId){
            window.location.href = "index.html";
        } else {
            // inyectar info de usuario si existe
            const user = findUserById(session.userId);
            if(user){
                const el = document.getElementById("current-user-email");
                if(el) el.textContent = user.email;
            }
        }
    }
});

/** Maneja el registro */
function handleRegister(e){
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    if(!name || !email || !password){ showNotification("Complete todos los campos","error"); return; }
    if(findUserByEmail(email)){ showNotification("Email ya registrado","error"); return; }

    const user = {
        id: uid("u_"),
        name,
        email,
        password // NOTA: en producción nunca en texto plano
    };
    addUser(user);
    // auto-login
    setSession({ userId: user.id, loggedAt: Date.now() });
    showNotification("Registro exitoso");
    setTimeout(()=> window.location.href = "dashboard.html", 600);
}

/** Maneja login */
function handleLogin(e){
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    if(!email || !password){ showNotification("Complete todos los campos","error"); return; }
    const user = findUserByEmail(email);
    if(!user || user.password !== password){ showNotification("Credenciales inválidas","error"); return; }
    setSession({ userId: user.id, loggedAt: Date.now() });
    showNotification("Bienvenido de nuevo");
    setTimeout(()=> window.location.href = "dashboard.html", 500);
}
