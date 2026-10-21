```javascript
"use strict";

/*
 * SHARKY DASHBOARD
 * Frontend para GitHub Pages.
 *
 * IMPORTANTE:
 * - No almacena tokens de Discord.
 * - No finge que los ajustes se aplican al bot.
 * - Las preferencias de demostración se guardan localmente.
 */

const SHARKY_API = "https://sharkydashboardapi.onrender.com";

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

function feedback(message, type = "info") {
    let element = $(".demo-feedback");

    if (!element) {
        element = document.createElement("div");
        element.className = "demo-feedback";
        element.setAttribute("role", "status");
        element.setAttribute("aria-live", "polite");
        document.body.appendChild(element);
    }

    element.textContent = message;
    element.dataset.type = type;
    element.classList.add("show");

    clearTimeout(window.sharkyFeedbackTimer);

    window.sharkyFeedbackTimer = setTimeout(() => {
        element.classList.remove("show");
    }, 3000);
}

async function apiRequest(path, options = {}) {
    const response = await fetch(`${SHARKY_API}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.headers || {})
        },
        credentials: "include"
    });

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
        ? await response.json()
        : {};

    if (!response.ok) {
        throw new Error(
            data.error || `La API respondió con el código ${response.status}.`
        );
    }

    return data;
}

/* Año actual */

$$("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
});

/* Navegación móvil */

const navToggle = $(".nav-toggle");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        const links = $(".nav-links");

        if (!links) return;

        const open = links.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", String(open));
    });
}

/* Navegación del dashboard */

$$("[data-section-link]").forEach(link => {
    link.addEventListener("click", () => {
        $$(".side-link").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        const target = document.getElementById(
            link.dataset.sectionLink
        );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* Preferencias locales de demostración */

$$("[data-setting]").forEach(input => {
    const key = `sharky-setting-${input.dataset.setting}`;

    try {
        const saved = localStorage.getItem(key);

        if (saved !== null) {
            input.checked = saved === "true";
        }
    } catch {
        // La página sigue funcionando aunque localStorage no esté disponible.
    }

    input.addEventListener("change", () => {
        try {
            localStorage.setItem(key, String(input.checked));
        } catch {
            // No bloquear la interfaz por un error de almacenamiento.
        }

        feedback(
            `${input.dataset.label || input.dataset.setting}: ` +
            `${input.checked ? "activado" : "desactivado"} (demo)`
        );
    });
});

/* Idioma de demostración */

const langSelect = $("[data-language]");

if (langSelect) {
    try {
        const savedLanguage = localStorage.getItem(
            "sharky-demo-language"
        );

        if (savedLanguage) {
            langSelect.value = savedLanguage;
        }
    } catch {
        // El selector continúa funcionando sin almacenamiento local.
    }

    langSelect.addEventListener("change", () => {
        try {
            localStorage.setItem(
                "sharky-demo-language",
                langSelect.value
            );
        } catch {
            // No bloquear la interfaz.
        }

        feedback("Idioma de demostración actualizado.");
    });
}

/* Acciones de demostración */

$$("[data-demo-action]").forEach(button => {
    button.addEventListener("click", () => {
        feedback(button.dataset.demoAction);
    });
});

/* Inicio de sesión con Discord */

$$("[data-discord-login]").forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = `${SHARKY_API}/login`;
    });
});

/* Cerrar sesión */

$$("[data-discord-logout]").forEach(button => {
    button.addEventListener("click", async () => {
        try {
            await apiRequest("/logout", {
                method: "POST"
            });

            feedback("Sesión cerrada.");
            await refreshDiscordSession();
        } catch (error) {
            feedback(error.message, "error");
        }
    });
});

/* Mostrar el usuario autenticado */

async function refreshDiscordSession() {
    const loginButtons = $$("[data-discord-login]");
    const logoutButtons = $$("[data-discord-logout]");
    const userContainers = $$("[data-discord-user]");
    const statusElements = $$("[data-discord-status]");

    try {
        const result = await apiRequest("/api/me");

        loginButtons.forEach(button => {
            button.hidden = true;
        });

        logoutButtons.forEach(button => {
            button.hidden = false;
        });

        userContainers.forEach(container => {
            container.hidden = false;

            const username = $("[data-discord-username]", container);

            if (username) {
                username.textContent =
                    result.user.global_name ||
                    result.user.username;
            }

            const avatar = $("[data-discord-avatar]", container);

            if (avatar) {
                if (result.user.avatar) {
                    avatar.src =
                        `https://cdn.discordapp.com/avatars/` +
                        `${result.user.id}/${result.user.avatar}.png`;

                    avatar.hidden = false;
                } else {
                    avatar.hidden = true;
                }
            }
        });

        statusElements.forEach(element => {
            element.textContent = "Conectado con Discord";
        });

        return result;
    } catch {
        loginButtons.forEach(button => {
            button.hidden = false;
        });

        logoutButtons.forEach(button => {
            button.hidden = true;
        });

        userContainers.forEach(container => {
            container.hidden = true;
        });

        statusElements.forEach(element => {
            element.textContent = "No has iniciado sesión";
        });

        return null;
    }
}

/* Consultar servidores de Discord */

async function loadDiscordServers() {
    const serverSelect = $("[data-discord-servers]");

    if (!serverSelect) return;

    serverSelect.disabled = true;
    serverSelect.innerHTML = "<option>Cargando servidores...</option>";

    try {
        const result = await apiRequest("/api/guilds");

        serverSelect.innerHTML = "";

        if (!result.guilds || result.guilds.length === 0) {
            serverSelect.innerHTML =
                "<option>No hay servidores administrables</option>";

            return;
        }

        result.guilds.forEach(guild => {
            const option = document.createElement("option");

            option.value = guild.id;
            option.textContent = guild.name;

            serverSelect.appendChild(option);
        });

        feedback("Servidores de Discord cargados.");
    } catch (error) {
        serverSelect.innerHTML =
            "<option>Inicia sesión para consultar tus servidores</option>";

        feedback(error.message, "error");
    } finally {
        serverSelect.disabled = false;
    }
}

/* Resultado del retorno de OAuth */

const query = new URLSearchParams(window.location.search);

if (query.get("login") === "success") {
    feedback("Discord ha devuelto el inicio de sesión.");

    history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
} else if (query.get("login") === "cancelled") {
    feedback("Cancelaste el inicio de sesión.", "error");

    history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}

/* Inicialización */

document.addEventListener("DOMContentLoaded", async () => {
    const healthElements = $$("[data-api-status]");

    try {
        const result = await apiRequest("/api/health");

        healthElements.forEach(element => {
            element.textContent =
                result.status === "ok"
                    ? "API disponible"
                    : "API no disponible";
        });
    } catch {
        healthElements.forEach(element => {
            element.textContent = "API no disponible";
        });
    }

    await refreshDiscordSession();
});
```
