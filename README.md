# Personal Finance — Aplicación de Gestión Financiera

Aplicación web moderna para administrar ingresos, gastos y visualizar análisis financiero con autenticación de usuario, CRUD de transacciones, filtros avanzados y gráficos dinámicos.

## Descripción

**Personal Finance** es una solución integral de gestión de finanzas personales desarrollada con HTML5, CSS3 y JavaScript vanilla. La aplicación permite a los usuarios registrarse, autenticarse, crear transacciones (ingresos y gastos), visualizar un dashboard con métricas en tiempo real y generar gráficos analíticos para entender mejor sus patrones de gasto.

La interfaz utiliza un diseño moderno con tema claro/oscuro, componentes interactivos, y se apoya en **Chart.js** para visualizaciones avanzadas. Todos los datos se almacenan localmente en el navegador usando `localStorage`, garantizando privacidad y sin necesidad de servidor backend.

## Características

- ✅ **Sistema de Autenticación** — Registro y login de usuarios con validación
- ✅ **Gestión de Transacciones (CRUD)** — Crear, leer, editar y eliminar transacciones
- ✅ **Categorización** — Organizar ingresos/gastos en categorías predefinidas
- ✅ **Filtros Avanzados** — Filtrar por categoría, tipo, rango de fechas y ordenamiento
- ✅ **Dashboard Interactivo** — Resumen de ingresos, gastos, balance y últimas transacciones
- ✅ **Gráficos Dinámicos** — Visualización con Chart.js (barras, pastel, línea)
- ✅ **Tema Claro/Oscuro** — Toggle para cambiar entre temas (persistencia local)
- ✅ **Exportar/Importar Datos** — Descargar y cargar datos en JSON
- ✅ **Diseño Responsivo** — Compatible con dispositivos móviles
- ✅ **Almacenamiento Local** — Sin servidor; datos guardados en localStorage
- ✅ **Interfaz Moderna** — Gradient, glassmorphism, animaciones suaves

## Estructura del Proyecto

```
personal-finance-app/
├── index.html                  (Página de login)
├── register.html               (Página de registro)
├── dashboard.html              (Panel principal con métricas y gráficos)
├── add-transaction.html        (Formulario para nueva transacción)
├── edit-transaction.html       (Editar transacción existente)
├── transactions.html           (Listado con filtros y CRUD)
├── assets/
│   ├── css/
│   │   └── style.css          (Estilos globales, temas, componentes)
│   └── js/
│       ├── auth.js            (Autenticación, login, registro, logout)
│       ├── storage.js         (Manejo de localStorage, CRUD usuarios/transacciones)
│       ├── dashboard.js       (Lógica del dashboard, cálculos de métricas)
│       ├── charts.js          (Generación de gráficos con Chart.js)
│       ├── transactions.js    (CRUD y filtrado de transacciones)
│       ├── ui.js              (Helpers UI, notificaciones, temas)
│       └── utils.js           (Utilidades: generadores de IDs, helpers)
└── .editorconfig               (Configuración del editor)
```

## Archivos

### HTML

| Archivo | Descripción |
|---------|-----------|
| **index.html** | Página de login — Formulario de autenticación |
| **register.html** | Página de registro — Crear nueva cuenta de usuario |
| **dashboard.html** | Panel principal — Métricas, gráficos y resumen financiero |
| **transactions.html** | Listado de transacciones — CRUD con filtros avanzados |
| **add-transaction.html** | Agregar transacción — Formulario para nuevo ingreso/gasto |
| **edit-transaction.html** | Editar transacción — Modificar transacción existente |

### CSS

| Archivo | Descripción |
|---------|-----------|
| **assets/css/style.css** | Estilos principales — Variables de tema, componentes, layout, responsivo |

### JavaScript

| Archivo | Descripción |
|---------|-----------|
| **assets/js/auth.js** | Autenticación — Registro, login, logout, protección de páginas |
| **assets/js/storage.js** | Almacenamiento — CRUD en localStorage para usuarios y transacciones |
| **assets/js/dashboard.js** | Dashboard — Cálculos de métricas, renderizado de recientes |
| **assets/js/charts.js** | Gráficos — Inicialización y actualización de Chart.js |
| **assets/js/transactions.js** | Transacciones — CRUD, filtros, búsqueda, validación |
| **assets/js/ui.js** | UI — Notificaciones, tema, helpers de DOM |
| **assets/js/utils.js** | Utilidades — Generadores de IDs, funciones auxiliares |

## Cómo Usar

### 1. **Acceso Inicial**

1. Abre `index.html` en tu navegador
2. Si es tu primera vez, haz clic en **"Crear cuenta"**
3. Completa el formulario de registro (nombre, email, contraseña)
4. Verás el mensaje: *"Se guardará localmente en tu navegador"*
5. Una vez registrado, podrás iniciar sesión

### 2. **Dashboard**

Después de iniciar sesión verás:
- **Ingresos totales** — Suma de todas las transacciones de tipo ingreso
- **Gastos totales** — Suma de todas las transacciones de tipo gasto
- **Balance** — Ingresos - Gastos
- **Últimas transacciones** — Lista de los últimos movimientos
- **Gráficos:**
  - Gasto por mes (barras)
  - Gasto por categoría (pastel)
  - Evolución del balance (línea)
- **Acciones:**
  - Exportar datos a JSON
  - Importar datos desde JSON
  - Eliminar cuenta

### 3. **Agregar Transacción**

1. Haz clic en **"+ Nueva"** o ve a `add-transaction.html`
2. Selecciona el tipo: **Ingreso** o **Gasto**
3. Ingresa el monto (ej: 150.50)
4. Selecciona la categoría:
   - Comida
   - Transporte
   - Salud
   - Entretenimiento
   - Salario
   - Otros
5. Selecciona la fecha
6. Opcionalmente, añade una nota
7. Haz clic en **"Guardar"**

### 4. **Gestionar Transacciones**

En `transactions.html` puedes:
- **Filtrar por categoría** — Selecciona una categoría específica
- **Filtrar por tipo** — Solo ingresos o solo gastos
- **Filtrar por rango de fechas** — Especifica fecha inicial y final
- **Ordenar** — Por fecha (asc/desc) o monto (asc/desc)
- **Ver, editar o eliminar** — Cada transacción tiene acciones
- **Buscar** — (Disponible en listado)

### 5. **Tema Claro/Oscuro**

- Haz clic en botón **"Tema"** o **"Toggle tema"** en la esquina superior derecha
- La preferencia se guarda en localStorage
- Se aplica a todas las páginas

### 6. **Exportar/Importar Datos**

**Exportar:**
- En el dashboard, haz clic en botón **"Exportar"**
- Se descargará un archivo `finance-data.json` con todas tus transacciones

**Importar:**
- Haz clic en **"Importar"** y selecciona un archivo JSON previamente exportado
- Se cargarán todas las transacciones al navegador

### 7. **Cerrar Sesión**

- Haz clic en **"Cerrar sesión"** en cualquier página protegida
- Volverás a `index.html`

### 8. **Eliminar Cuenta**

- En el dashboard, botón **"Eliminar cuenta"**
- Elimina todos tus datos y cuentas del navegador

## Validaciones Implementadas

| Validación | Regla |
|-----------|-------|
| **Nombre** | Requerido, mínimo 3 caracteres |
| **Email** | Formato válido (regex), único en el sistema |
| **Contraseña** | Requerida, mínimo 6 caracteres |
| **Monto** | Número positivo, hasta 2 decimales |
| **Categoría** | Una de las 6 predefinidas |
| **Fecha** | Formato ISO (YYYY-MM-DD) |
| **Autenticación** | Protección de páginas; si no hay sesión, redirecciona a login |

## Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Flexbox, Grid, variables CSS, animaciones, gradients
- **JavaScript Vanilla** — Sin frameworks; DOM manipulation puro
- **Chart.js** — Visualización de gráficos (CDN)
- **Tailwind CSS** — CDN opcional para utilidades (no obligatorio en versión base)
- **localStorage** — Persistencia de datos local

## Flujo de Datos

```
┌─ index.html (Login)
│  └─→ Validar email/password con storage.js
│      └─→ setSession() en localStorage
│
├─ register.html (Registro)
│  └─→ Crear usuario en localStorage
│      └─→ setSession() + redirect a dashboard
│
├─ dashboard.html (Protegido)
│  ├─→ auth.js verifica sesión
│  ├─→ dashboard.js calcula métricas
│  ├─→ charts.js renderiza gráficos
│  └─→ Botones: logout, exportar, importar, eliminar
│
├─ add-transaction.html (Protegido)
│  └─→ transactions.js → storage.js → añadir transacción
│
├─ transactions.html (Protegido)
│  ├─→ transactions.js carga y filtra transacciones
│  ├─→ ui.js renderiza tabla
│  └─→ Acciones: editar (redirect a edit-transaction), eliminar
│
└─ edit-transaction.html (Protegido)
   └─→ Carga transacción existente
       └─→ Editar y guardar cambios
```

## Almacenamiento (localStorage)

**Estructura de datos:**

```javascript
// Usuarios
localStorage.users = [
  { id: "u_xxxxx", name: "Juan", email: "juan@example.com", password: "hashed?" }
]

// Sesión activa
localStorage.session = { userId: "u_xxxxx", email: "juan@example.com" }

// Transacciones
localStorage.transactions = [
  {
    id: "t_xxxxx",
    userId: "u_xxxxx",
    type: "income",
    amount: 3000.00,
    category: "Salario",
    date: "2025-11-15",
    note: "Salario mensual",
    createdAt: "2025-11-15T10:30:00Z"
  }
]

// Tema
localStorage.theme = "dark" // o "light"
```

## Flujo de Autenticación

1. **Registro:**
   - Usuario completa name, email, password en `register.html`
   - `auth.js` valida datos
   - `storage.js` guarda usuario en `localStorage.users`
   - Crea sesión automática
   - Redirecciona a `dashboard.html`

2. **Login:**
   - Usuario completa email, password en `index.html`
   - `auth.js` valida contra `localStorage.users`
   - Si coincide, crea sesión en `localStorage.session`
   - Redirecciona a `dashboard.html`

3. **Protección de Páginas:**
   - Al cargar página con `data-protected="true"`, `auth.js` verifica sesión
   - Si no hay sesión, redirecciona a `index.html`
   - Si hay sesión, inyecta email del usuario

4. **Logout:**
   - Botón "Cerrar sesión" ejecuta `clearSession()`
   - Limpia `localStorage.session`
   - Redirecciona a `index.html`

## Categorías Disponibles

- 🍽️ **Comida**
- 🚗 **Transporte**
- 🏥 **Salud**
- 🎬 **Entretenimiento**
- 💰 **Salario**
- 📦 **Otros**

## Ejemplo de Uso

**Crear una cuenta:**
```
Nombre: María García
Email: maria@example.com
Contraseña: SecurePass123
[Crear cuenta] → Redirige a dashboard
```

**Agregar un gasto:**
```
Tipo: Gasto
Monto: 45.50
Categoría: Comida
Fecha: 2025-11-15
Nota: Almuerzo en restaurante
[Guardar] → Transacción creada
```

**Filtrar transacciones:**
```
Categoría: Comida
Tipo: Gasto
Fecha desde: 2025-10-01
Fecha hasta: 2025-11-15
Ordenar por: Monto (desc)
[Aplicar] → Muestra solo gastos de comida del rango
```

## Notas Técnicas

- **Sin Server Backend:** Todo funciona localmente en el navegador. Si cambias de navegador o computadora, deberás registrarte de nuevo.
- **localStorage Límite:** ~5-10 MB según navegador. Para miles de transacciones puede ser un límite.
- **Importar/Exportar:** Permite respaldar datos localmente en archivo JSON.
- **Tema Persistente:** El tema elegido se recuerda en futuras visitas (localStorage).
- **Contraseñas:** Se guardan en texto plano en localStorage (no es seguro para producción). Para producción, usar hash + backend.
- **Validación Solo Cliente:** No hay validación en servidor. Se recomienda agregar backend para seguridad real.

## Mejoras Futuras

- [ ] Backend Node.js + Express para almacenamiento seguro
- [ ] Autenticación con OAuth (Google, GitHub)
- [ ] Encriptación de contraseñas (bcrypt)
- [ ] API REST para sincronización multi-dispositivo
- [ ] Categorías personalizadas
- [ ] Metas de gastos (presupuesto por categoría)
- [ ] Notificaciones de límite de presupuesto
- [ ] Exportar a CSV/Excel
- [ ] Soporte multimoneda
- [ ] Análisis avanzado (tendencias, predicciones)
- [ ] Categorización automática por IA
- [ ] Aplicación móvil (React Native / Flutter)
- [ ] Sincronización con banca (open banking)
- [ ] Reportes mensuales/anuales en PDF
- [ ] Compartir gasto con otros usuarios
- [ ] Dashboard colaborativo

## Licencia

MIT License © 2025 Ragbert Polanco

Permiso libre para usar, copiar, modificar y distribuir este software bajo los términos de la licencia MIT.
