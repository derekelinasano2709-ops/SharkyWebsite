
/* =========================================================
   SHARKY MEGALODON — DASHBOARD ENGINE
   Idiomas · Temas · Animaciones · Preferencias · Discord API
   ========================================================= */

(() => {
    "use strict";

    const API_URL = "https://sharkydashboardapi.onrender.com";

    const STORAGE = {
        language: "sharky-language",
        theme: "sharky-theme",
        settings: "sharky-settings"
    };

    const $ = (selector, root = document) =>
        root.querySelector(selector);

    const $$ = (selector, root = document) =>
        [...root.querySelectorAll(selector)];

    const state = {
        language: localStorage.getItem(STORAGE.language) || "es",
        theme: localStorage.getItem(STORAGE.theme) || "dark",
        user: null,
        guilds: [],
        currentGuild: null
    };

    /* =====================================================
       1. TRADUCCIONES
       ===================================================== */

    const translations = {
        es: {
            "nav.workspace": "ESPACIO DE TRABAJO",
            "nav.overview": "Resumen",
            "nav.security": "Seguridad",
            "nav.moderation": "Moderación",
            "nav.tools": "Herramientas",
            "nav.preferences": "Preferencias",

            "brand.subtitle": "Sharky Control Center",

            "header.eyebrow": "CENTRO DE CONTROL",
            "header.title": "Dashboard",
            "header.description":
                "Administra la seguridad y la moderación de tus servidores.",
            "header.server": "Servidor de Discord",

            "login": "Iniciar sesión con Discord",
            "logout": "Cerrar sesión",
            "website": "← Sitio web",

            "notice.welcome":
                "Bienvenido a Sharky. Inicia sesión con Discord para consultar los servidores que puedes administrar.",

            "notice.connected":
                "Sesión de Discord activa. Selecciona un servidor para continuar.",

            "notice.noServers":
                "Tu sesión está activa, pero no encontramos servidores administrables.",

            "notice.connectionError":
                "No se pudo conectar con la API. Comprueba que el servicio de Render esté disponible.",

            "notice.demo":
                "Estás viendo las preferencias locales. Los interruptores todavía no modifican el bot real.",

            "session.active": "SESIÓN ACTIVA",

            "stats.members": "Miembros",
            "stats.membersFoot": "Estadísticas pendientes de conexión.",
            "stats.moderation": "Acciones de moderación",
            "stats.moderationFoot": "Historial pendiente de conexión.",
            "stats.security": "Alertas de seguridad",
            "stats.securityFoot": "Sin datos ficticios.",
            "stats.bot": "Estado de Sharky",
            "stats.botFoot": "El estado real requiere consultar el bot.",
            "stats.unknown": "Sin verificar",

            "security.title": "Escudo de seguridad",
            "security.description":
                "Estos controles son preferencias locales. Todavía no modifican la configuración del bot.",
            "security.links": "Filtro de enlaces",
            "security.linksDesc": "Control de enlaces no permitidos.",
            "security.spam": "Protección antispam",
            "security.spamDesc": "Detección de mensajes repetidos.",
            "security.raid": "Modo anti-raid",
            "security.raidDesc": "Protección frente a entradas masivas.",
            "security.words": "Filtro de palabras",
            "security.wordsDesc": "Moderación de frases configuradas.",

            "tools.title": "Herramientas rápidas",
            "tools.description": "Accesos rápidos de la interfaz.",
            "tools.moderation": "Moderación",
            "tools.moderationDesc": "Herramientas de administración",
            "tools.security": "Seguridad",
            "tools.securityDesc": "Protecciones del servidor",
            "tools.logs": "Registros",
            "tools.logsDesc": "Historial de actividad",
            "tools.setup": "Configurar",
            "tools.setupDesc": "Configuración del servidor",

            "language.title": "Idioma del panel",
            "theme.title": "Apariencia",
            "theme.dark": "Modo oscuro",
            "theme.light": "Modo claro",
            "theme.toggle": "Cambiar tema",

            "moderation.title": "Preferencias de moderación",
            "moderation.description":
                "Preferencias locales de la interfaz.",
            "moderation.confirm": "Confirmar acciones delicadas",
            "moderation.confirmDesc":
                "Solicitar confirmación antes de acciones críticas.",
            "moderation.logs": "Registro de moderación",
            "moderation.logsDesc": "Guardar un historial de acciones.",
            "moderation.notifications": "Notificaciones de actividad",
            "moderation.notificationsDesc":
                "Preferencia visual de notificaciones.",

            "activity.title": "Actividad reciente",
            "activity.description":
                "El historial real estará disponible al conectar los registros.",
            "activity.ready": "Dashboard preparado",
            "activity.readyDesc": "Interfaz de Sharky.",
            "activity.discord": "Conexión con Discord",
            "activity.discordDesc": "Pendiente de verificar.",
            "activity.protection": "Protecciones del servidor",
            "activity.protectionDesc":
                "Pendientes de conectar al bot.",

            "footer":
                "Sharky Megalodon · Dashboard. Nunca introduzcas tu token de bot en esta página.",

            "settings.enabled": "activado",
            "settings.disabled": "desactivado",
            "settings.local": "Preferencia local guardada.",
            "settings.reset": "Preferencias restauradas.",
            "settings.resetConfirm":
                "¿Quieres restaurar las preferencias de este navegador?",

            "action.pending":
                "Esta herramienta todavía está en desarrollo.",
            "action.moderation":
                "Las herramientas de moderación todavía están en desarrollo.",
            "action.security":
                "La configuración de seguridad todavía no está conectada al bot.",
            "action.logs":
                "El registro estará disponible cuando conectemos el backend.",
            "action.setup":
                "El asistente de configuración todavía está en desarrollo.",

            "discord.loading": "Conectando con Discord...",
            "discord.connected": "Discord conectado",
            "discord.disconnected": "Sin sesión de Discord",
            "discord.loginRequired": "Inicia sesión para consultar tus servidores",
            "discord.serverLoaded": "Servidores cargados correctamente.",
            "discord.serverSelected": "Servidor seleccionado.",
            "discord.logoutSuccess": "Sesión cerrada.",
            "discord.loadError": "No se pudieron cargar los servidores.",

            "theme.changed": "Apariencia actualizada.",
            "language.changed": "Idioma actualizado."
        },

        en: {
            "nav.workspace": "WORKSPACE",
            "nav.overview": "Overview",
            "nav.security": "Security",
            "nav.moderation": "Moderation",
            "nav.tools": "Tools",
            "nav.preferences": "Preferences",

            "brand.subtitle": "Sharky Control Center",

            "header.eyebrow": "CONTROL CENTER",
            "header.title": "Dashboard",
            "header.description":
                "Manage security and moderation for your servers.",
            "header.server": "Discord server",

            "login": "Sign in with Discord",
            "logout": "Log out",
            "website": "← Website",

            "notice.welcome":
                "Welcome to Sharky. Sign in with Discord to view servers you can manage.",

            "notice.connected":
                "Discord session active. Select a server to continue.",

            "notice.noServers":
                "Your session is active, but no manageable servers were found.",

            "notice.connectionError":
                "Could not connect to the API. Check whether the Render service is available.",

            "notice.demo":
                "You are viewing local preferences. These switches do not modify the live bot yet.",

            "session.active": "ACTIVE SESSION",

            "stats.members": "Members",
            "stats.membersFoot": "Statistics not connected yet.",
            "stats.moderation": "Moderation actions",
            "stats.moderationFoot": "History not connected yet.",
            "stats.security": "Security alerts",
            "stats.securityFoot": "No fabricated data.",
            "stats.bot": "Sharky status",
            "stats.botFoot": "Real status requires querying the bot.",
            "stats.unknown": "Unverified",

            "security.title": "Security shield",
            "security.description":
                "These are local preferences. They do not modify the bot configuration yet.",
            "security.links": "Link filter",
            "security.linksDesc": "Control disallowed links.",
            "security.spam": "Anti-spam protection",
            "security.spamDesc": "Detect repeated messages.",
            "security.raid": "Anti-raid mode",
            "security.raidDesc": "Protection against mass joins.",
            "security.words": "Word filter",
            "security.wordsDesc": "Moderate configured phrases.",

            "tools.title": "Quick tools",
            "tools.description": "Quick interface shortcuts.",
            "tools.moderation": "Moderation",
            "tools.moderationDesc": "Administration tools",
            "tools.security": "Security",
            "tools.securityDesc": "Server protections",
            "tools.logs": "Logs",
            "tools.logsDesc": "Activity history",
            "tools.setup": "Configure",
            "tools.setupDesc": "Server configuration",

            "language.title": "Dashboard language",
            "theme.title": "Appearance",
            "theme.dark": "Dark mode",
            "theme.light": "Light mode",
            "theme.toggle": "Toggle theme",

            "moderation.title": "Moderation preferences",
            "moderation.description": "Local interface preferences.",
            "moderation.confirm": "Confirm sensitive actions",
            "moderation.confirmDesc":
                "Ask for confirmation before critical actions.",
            "moderation.logs": "Moderation logs",
            "moderation.logsDesc": "Keep a history of actions.",
            "moderation.notifications": "Activity notifications",
            "moderation.notificationsDesc":
                "Visual notification preference.",

            "activity.title": "Recent activity",
            "activity.description":
                "Real history will be available after connecting the logs.",
            "activity.ready": "Dashboard ready",
            "activity.readyDesc": "Sharky interface.",
            "activity.discord": "Discord connection",
            "activity.discordDesc": "Pending verification.",
            "activity.protection": "Server protections",
            "activity.protectionDesc": "Waiting to connect to the bot.",

            "footer":
                "Sharky Megalodon · Dashboard. Never enter your bot token on this page.",

            "settings.enabled": "enabled",
            "settings.disabled": "disabled",
            "settings.local": "Local preference saved.",
            "settings.reset": "Preferences restored.",
            "settings.resetConfirm":
                "Restore preferences in this browser?",

            "action.pending": "This tool is still in development.",
            "action.moderation":
                "Moderation tools are still in development.",
            "action.security":
                "Security settings are not connected to the bot yet.",
            "action.logs":
                "Logs will be available after connecting the backend.",
            "action.setup":
                "The setup assistant is still in development.",

            "discord.loading": "Connecting to Discord...",
            "discord.connected": "Discord connected",
            "discord.disconnected": "Not connected to Discord",
            "discord.loginRequired": "Sign in to view your servers",
            "discord.serverLoaded": "Servers loaded successfully.",
            "discord.serverSelected": "Server selected.",
            "discord.logoutSuccess": "Logged out.",
            "discord.loadError": "Could not load servers.",

            "theme.changed": "Appearance updated.",
            "language.changed": "Language updated."
        },

        fr: {
            "nav.workspace": "ESPACE DE TRAVAIL",
            "nav.overview": "Vue d'ensemble",
            "nav.security": "Sécurité",
            "nav.moderation": "Modération",
            "nav.tools": "Outils",
            "nav.preferences": "Préférences",

            "brand.subtitle": "Centre de contrôle Sharky",

            "header.eyebrow": "CENTRE DE CONTRÔLE",
            "header.title": "Tableau de bord",
            "header.description":
                "Gérez la sécurité et la modération de vos serveurs.",
            "header.server": "Serveur Discord",

            "login": "Se connecter avec Discord",
            "logout": "Se déconnecter",
            "website": "← Site web",

            "notice.welcome":
                "Bienvenue sur Sharky. Connectez-vous avec Discord pour voir les serveurs que vous pouvez gérer.",

            "notice.connected":
                "Session Discord active. Sélectionnez un serveur pour continuer.",

            "notice.noServers":
                "Votre session est active, mais aucun serveur administrable n'a été trouvé.",

            "notice.connectionError":
                "Connexion à l'API impossible. Vérifiez la disponibilité du service Render.",

            "notice.demo":
                "Vous consultez les préférences locales. Ces options ne modifient pas encore le bot.",

            "session.active": "SESSION ACTIVE",

            "stats.members": "Membres",
            "stats.membersFoot": "Statistiques non connectées.",
            "stats.moderation": "Actions de modération",
            "stats.moderationFoot": "Historique non connecté.",
            "stats.security": "Alertes de sécurité",
            "stats.securityFoot": "Aucune donnée fictive.",
            "stats.bot": "État de Sharky",
            "stats.botFoot": "L'état réel nécessite une vérification du bot.",
            "stats.unknown": "Non vérifié",

            "security.title": "Bouclier de sécurité",
            "security.description":
                "Ces options sont locales et ne modifient pas encore le bot.",
            "security.links": "Filtre de liens",
            "security.linksDesc": "Contrôle des liens interdits.",
            "security.spam": "Protection antispam",
            "security.spamDesc": "Détection des messages répétés.",
            "security.raid": "Mode anti-raid",
            "security.raidDesc": "Protection contre les arrivées massives.",
            "security.words": "Filtre de mots",
            "security.wordsDesc": "Modération des expressions configurées.",

            "tools.title": "Outils rapides",
            "tools.description": "Raccourcis de l'interface.",
            "tools.moderation": "Modération",
            "tools.moderationDesc": "Outils d'administration",
            "tools.security": "Sécurité",
            "tools.securityDesc": "Protections du serveur",
            "tools.logs": "Journaux",
            "tools.logsDesc": "Historique d'activité",
            "tools.setup": "Configurer",
            "tools.setupDesc": "Configuration du serveur",

            "language.title": "Langue du tableau de bord",
            "theme.title": "Apparence",
            "theme.dark": "Mode sombre",
            "theme.light": "Mode clair",
            "theme.toggle": "Changer de thème",

            "moderation.title": "Préférences de modération",
            "moderation.description": "Préférences locales de l'interface.",
            "moderation.confirm": "Confirmer les actions sensibles",
            "moderation.confirmDesc":
                "Demander confirmation avant les actions critiques.",
            "moderation.logs": "Journal de modération",
            "moderation.logsDesc": "Conserver un historique des actions.",
            "moderation.notifications": "Notifications d'activité",
            "moderation.notificationsDesc":
                "Préférence visuelle des notifications.",

            "activity.title": "Activité récente",
            "activity.description":
                "L'historique sera disponible après la connexion des journaux.",
            "activity.ready": "Tableau de bord prêt",
            "activity.readyDesc": "Interface Sharky.",
            "activity.discord": "Connexion Discord",
            "activity.discordDesc": "Vérification en attente.",
            "activity.protection": "Protections du serveur",
            "activity.protectionDesc": "En attente de connexion au bot.",

            "footer":
                "Sharky Megalodon · Tableau de bord. Ne saisissez jamais le jeton du bot ici.",

            "settings.enabled": "activé",
            "settings.disabled": "désactivé",
            "settings.local": "Préférence locale enregistrée.",
            "settings.reset": "Préférences réinitialisées.",
            "settings.resetConfirm":
                "Réinitialiser les préférences de ce navigateur ?",

            "action.pending": "Cet outil est encore en développement.",
            "action.moderation":
                "Les outils de modération sont en développement.",
            "action.security":
                "Les paramètres de sécurité ne sont pas encore connectés au bot.",
            "action.logs":
                "Les journaux seront disponibles après connexion du backend.",
            "action.setup":
                "L'assistant de configuration est en développement.",

            "discord.loading": "Connexion à Discord...",
            "discord.connected": "Discord connecté",
            "discord.disconnected": "Discord non connecté",
            "discord.loginRequired": "Connectez-vous pour voir vos serveurs",
            "discord.serverLoaded": "Serveurs chargés.",
            "discord.serverSelected": "Serveur sélectionné.",
            "discord.logoutSuccess": "Déconnexion effectuée.",
            "discord.loadError": "Impossible de charger les serveurs.",

            "theme.changed": "Apparence mise à jour.",
            "language.changed": "Langue mise à jour."
        },

        pt: {
            "nav.workspace": "ESPAÇO DE TRABALHO",
            "nav.overview": "Visão geral",
            "nav.security": "Segurança",
            "nav.moderation": "Moderação",
            "nav.tools": "Ferramentas",
            "nav.preferences": "Preferências",

            "brand.subtitle": "Central de Controle Sharky",

            "header.eyebrow": "CENTRAL DE CONTROLE",
            "header.title": "Painel",
            "header.description":
                "Gerencie a segurança e a moderação dos seus servidores.",
            "header.server": "Servidor do Discord",

            "login": "Entrar com Discord",
            "logout": "Sair",
            "website": "← Site",

            "notice.welcome":
                "Bem-vindo ao Sharky. Entre com o Discord para consultar os servidores que você pode administrar.",

            "notice.connected":
                "Sessão do Discord ativa. Selecione um servidor para continuar.",

            "notice.noServers":
                "Sua sessão está ativa, mas nenhum servidor administrável foi encontrado.",

            "notice.connectionError":
                "Não foi possível conectar à API. Verifique se o serviço Render está disponível.",

            "notice.demo":
                "Você está vendo preferências locais. Essas opções ainda não modificam o bot.",

            "session.active": "SESSÃO ATIVA",

            "stats.members": "Membros",
            "stats.membersFoot": "Estatísticas ainda não conectadas.",
            "stats.moderation": "Ações de moderação",
            "stats.moderationFoot": "Histórico ainda não conectado.",
            "stats.security": "Alertas de segurança",
            "stats.securityFoot": "Sem dados fictícios.",
            "stats.bot": "Status do Sharky",
            "stats.botFoot": "O status real exige consultar o bot.",
            "stats.unknown": "Não verificado",

            "security.title": "Escudo de segurança",
            "security.description":
                "Estas opções são locais e ainda não modificam o bot.",
            "security.links": "Filtro de links",
            "security.linksDesc": "Controle de links não permitidos.",
            "security.spam": "Proteção antispam",
            "security.spamDesc": "Detecção de mensagens repetidas.",
            "security.raid": "Modo anti-raid",
            "security.raidDesc": "Proteção contra entradas em massa.",
            "security.words": "Filtro de palavras",
            "security.wordsDesc": "Moderação de frases configuradas.",

            "tools.title": "Ferramentas rápidas",
            "tools.description": "Atalhos da interface.",
            "tools.moderation": "Moderação",
            "tools.moderationDesc": "Ferramentas de administração",
            "tools.security": "Segurança",
            "tools.securityDesc": "Proteções do servidor",
            "tools.logs": "Registros",
            "tools.logsDesc": "Histórico de atividade",
            "tools.setup": "Configurar",
            "tools.setupDesc": "Configuração do servidor",

            "language.title": "Idioma do painel",
            "theme.title": "Aparência",
            "theme.dark": "Modo escuro",
            "theme.light": "Modo claro",
            "theme.toggle": "Alterar tema",

            "moderation.title": "Preferências de moderação",
            "moderation.description": "Preferências locais da interface.",
            "moderation.confirm": "Confirmar ações delicadas",
            "moderation.confirmDesc":
                "Solicitar confirmação antes de ações críticas.",
            "moderation.logs": "Registro de moderação",
            "moderation.logsDesc": "Manter um histórico de ações.",
            "moderation.notifications": "Notificações de atividade",
            "moderation.notificationsDesc":
                "Preferência visual de notificações.",

            "activity.title": "Atividade recente",
            "activity.description":
                "O histórico real estará disponível após conectar os registros.",
            "activity.ready": "Painel preparado",
            "activity.readyDesc": "Interface Sharky.",
            "activity.discord": "Conexão com Discord",
            "activity.discordDesc": "Aguardando verificação.",
            "activity.protection": "Proteções do servidor",
            "activity.protectionDesc": "Aguardando conexão com o bot.",

            "footer":
                "Sharky Megalodon · Painel. Nunca insira o token do bot nesta página.",

            "settings.enabled": "ativado",
            "settings.disabled": "desativado",
            "settings.local": "Preferência local salva.",
            "settings.reset": "Preferências restauradas.",
            "settings.resetConfirm":
                "Restaurar as preferências deste navegador?",

            "action.pending": "Esta ferramenta ainda está em desenvolvimento.",
            "action.moderation":
                "As ferramentas de moderação ainda estão em desenvolvimento.",
            "action.security":
                "As configurações de segurança ainda não estão conectadas ao bot.",
            "action.logs":
                "Os registros estarão disponíveis após conectar o backend.",
            "action.setup":
                "O assistente de configuração ainda está em desenvolvimento.",

            "discord.loading": "Conectando ao Discord...",
            "discord.connected": "Discord conectado",
            "discord.disconnected": "Discord desconectado",
            "discord.loginRequired": "Entre para consultar seus servidores",
            "discord.serverLoaded": "Servidores carregados.",
            "discord.serverSelected": "Servidor selecionado.",
            "discord.logoutSuccess": "Sessão encerrada.",
            "discord.loadError": "Não foi possível carregar os servidores.",

            "theme.changed": "Aparência atualizada.",
            "language.changed": "Idioma atualizado."
        }
    };

    function t(key) {
        return translations[state.language]?.[key]
            ?? translations.es[key]
            ?? key;
    }

    /* =====================================================
       2. FEEDBACK / NOTIFICACIONES
       ===================================================== */

    let toastTimer;

    function toast(message, type = "success") {
        let container = $("#sharky-toast-container");

        if (!container) {
            container = document.createElement("div");
            container.id = "sharky-toast-container";
            container.setAttribute("aria-live", "polite");
            container.setAttribute("aria-atomic", "true");

            Object.assign(container.style, {
                position: "fixed",
                right: "22px",
                bottom: "22px",
                zIndex: "99999",
                display: "grid",
                gap: "10px",
                width: "min(360px, calc(100vw - 32px))",
                pointerEvents: "none"
            });

            document.body.appendChild(container);
        }

        const item = document.createElement("div");

        const borderColor =
            type === "error" ? "#ff647c" :
            type === "warning" ? "#ffc66d" :
            "#54dfb1";

        Object.assign(item.style, {
            padding: "15px 17px",
            borderRadius: "15px",
            border: `1px solid ${borderColor}55`,
            borderLeft: `4px solid ${borderColor}`,
            background: state.theme === "light" ? "#ffffff" : "#101e30",
            color: state.theme === "light" ? "#152438" : "#e9f3ff",
            boxShadow: "0 18px 55px #0003",
            fontSize: "13px",
            lineHeight: "1.5",
            opacity: "0",
            transform: "translateY(12px) scale(.98)",
            transition: "opacity .22s ease, transform .22s ease",
            pointerEvents: "auto"
        });

        item.textContent = message;
        container.appendChild(item);

        requestAnimationFrame(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0) scale(1)";
        });

        window.setTimeout(() => {
            item.style.opacity = "0";
            item.style.transform = "translateY(8px) scale(.98)";

            window.setTimeout(() => item.remove(), 250);
        }, 3000);
    }

    /* =====================================================
       3. TRADUCIR LA INTERFAZ
       ===================================================== */

    function registerTranslations() {
        const entries = [
            ["header.eyebrow", ".eyebrow"],
            ["header.title", ".app-heading h1"],
            ["header.description", ".app-heading p"],
            ["header.server", 'label[for="server-select"]'],

            ["nav.workspace", ".sidebar > .side-label:first-child"],
            ["nav.overview", '[data-section-link="overview"]'],
            ["nav.security", '[data-section-link="security-settings"]'],
            ["nav.moderation", '[data-section-link="moderation-settings"]'],
            ["nav.tools", '[data-section-link="quick-panel"]'],
            ["nav.preferences", '[data-section-link="preferences"]'],

            ["security.title", "#security-settings h2"],
            ["security.description", "#security-settings .panel-sub"],
            ["tools.title", "#quick-panel h2"],
            ["tools.description", "#quick-panel .panel-sub"],
            ["moderation.title", "#moderation-settings h2"],
            ["moderation.description", "#moderation-settings .panel-sub"],
            ["activity.title", "#preferences h2"],
            ["activity.description", "#preferences .panel-sub"],

            ["security.links", '[data-setting="links"]'],
            ["security.spam", '[data-setting="spam"]'],
            ["security.raid", '[data-setting="raid"]'],
            ["security.words", '[data-setting="words"]'],

            ["moderation.confirm", '[data-setting="confirm"]'],
            ["moderation.logs", '[data-setting="logs"]'],
            ["moderation.notifications", '[data-setting="notifications"]'],

            ["tools.moderation", '[data-demo-action*="moderación"]'],
            ["tools.security", '[data-demo-action*="seguridad"]'],
            ["tools.logs", '[data-demo-action*="auditoría"]'],
            ["tools.setup", '[data-demo-action*="configuración"]'],

            ["activity.ready", "#preferences .activity-item:nth-of-type(1) b"],
            ["activity.discord", "#preferences .activity-item:nth-of-type(2) b"],
            ["activity.protection", "#preferences .activity-item:nth-of-type(3) b"]
        ];

        entries.forEach(([key, selector]) => {
            const element = $(selector);

            if (!element) return;

            if (element.matches("input")) {
                const row = element.closest(".setting-row");
                const label = row?.querySelector("b");

                if (label) label.textContent = t(key);
                return;
            }

            if (element.matches("button")) {
                const icon = element.querySelector("span");

                if (icon) {
                    element.replaceChildren(icon, document.createTextNode(` ${t(key)}`));
                } else {
                    element.textContent = t(key);
                }

                return;
            }

            element.textContent = t(key);
        });

        const login = $("#discord-login");
        const logout = $("#discord-logout");

        if (login) login.textContent = t("login");
        if (logout) logout.textContent = t("logout");

        const siteLink = $('.app-top a[href="index.html"]:not(.app-brand)');

        if (siteLink) siteLink.textContent = t("website");

        const langSelect = $("[data-language]");

        if (langSelect) {
            langSelect.value = state.language;
        }

        const notice = $("#dashboard-notice");

        if (notice && !state.user) {
            notice.textContent = t("notice.welcome");
        }

        const status = $("#discord-status");

        if (status) {
            status.textContent = state.user
                ? t("discord.connected")
                : t("discord.disconnected");
        }

        const sidebarNote = $(".sidebar-note b");

        if (sidebarNote) {
            sidebarNote.textContent = t("brand.subtitle");
        }

        const footer = $(".app-main > p:last-child");

        if (footer) {
            footer.textContent = t("footer");
        }

        translateSettingDescriptions();
        translateQuickActionDescriptions();
        translateActivityDescriptions();
        translateStatCards();
        updateThemeButton();
    }

    function translateSettingDescriptions() {
        const descriptions = {
            links: "security.linksDesc",
            spam: "security.spamDesc",
            raid: "security.raidDesc",
            words: "security.wordsDesc",
            confirm: "moderation.confirmDesc",
            logs: "moderation.logsDesc",
            notifications: "moderation.notificationsDesc"
        };

        $$("[data-setting]").forEach(input => {
            const key = descriptions[input.dataset.setting];
            const description = input.closest(".setting-row")?.querySelector("small");

            if (key && description) {
                description.textContent = t(key);
            }
        });
    }

    function translateQuickActionDescriptions() {
        const descriptions = [
            ["tools.moderationDesc", 0],
            ["tools.securityDesc", 1],
            ["tools.logsDesc", 2],
            ["tools.setupDesc", 3]
        ];

        const buttons = $$(".quick-actions [data-demo-action]");

        descriptions.forEach(([key, index]) => {
            const description = buttons[index]?.querySelector("span");

            if (description) {
                description.textContent = t(key);
            }
        });

        const languageLabel = $('label[for="demo-lang"]');

        if (languageLabel) {
            languageLabel.textContent = t("language.title");
        }
    }

    function translateActivityDescriptions() {
        const keys = [
            "activity.readyDesc",
            "activity.discordDesc",
            "activity.protectionDesc"
        ];

        $$("#preferences .activity-item small").forEach((element, index) => {
            if (keys[index]) {
                element.textContent = t(keys[index]);
            }
        });
    }

    function translateStatCards() {
        const keys = [
            ["stats.members", "stats.membersFoot"],
            ["stats.moderation", "stats.moderationFoot"],
            ["stats.security", "stats.securityFoot"],
            ["stats.bot", "stats.botFoot"]
        ];

        $$(".stat-card").forEach((card, index) => {
            if (!keys[index]) return;

            const label = card.querySelector(".stat-top span:first-child");
            const foot = card.querySelector(".stat-foot");

            if (label) label.textContent = t(keys[index][0]);
            if (foot) foot.textContent = t(keys[index][1]);
        });

        const botStatus = $("#bot-status");

        if (botStatus && botStatus.textContent.trim() === "Sin verificar") {
            botStatus.textContent = t("stats.unknown");
        }
    }

    /* =====================================================
       4. IDIOMA
       ===================================================== */

    function setLanguage(language, showMessage = true) {
        if (!translations[language]) {
            language = "es";
        }

        state.language = language;

        localStorage.setItem(STORAGE.language, language);

        document.documentElement.lang = language;

        registerTranslations();

        if (showMessage) {
            toast(t("language.changed"));
        }
    }

    function initLanguage() {
        const select = $("[data-language]");

        if (select) {
            const supported = [...select.options].map(option => option.value);

            if (!supported.includes(state.language)) {
                state.language = "es";
            }

            select.value = state.language;

            select.addEventListener("change", () => {
                setLanguage(select.value);
            });
        }

        setLanguage(state.language, false);
    }

    /* =====================================================
       5. TEMA CLARO / OSCURO
       ===================================================== */

    function addThemeStyles() {
        if ($("#sharky-theme-styles")) return;

        const style = document.createElement("style");
        style.id = "sharky-theme-styles";

        style.textContent = `
            html {
                color-scheme: dark;
            }

            body {
                transition:
                    background-color .3s ease,
                    color .3s ease;
            }

            .sharky-theme-toggle {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                min-height: 40px;
                padding: 0 13px;
                border: 1px solid var(--theme-border, #263b52);
                border-radius: 12px;
                color: var(--theme-text, #e9f3ff);
                background: var(--theme-surface, #101e30);
                cursor: pointer;
                font: inherit;
                font-size: .82rem;
                transition: transform .2s ease, background .2s ease;
            }

            .sharky-theme-toggle:hover {
                transform: translateY(-2px);
            }

            .sharky-theme-toggle:active {
                transform: scale(.96);
            }

            html[data-sharky-theme="light"] {
                color-scheme: light;
            }

            html[data-sharky-theme="light"] body {
                background: #f2f6fc;
                color: #18283c;
            }

            html[data-sharky-theme="light"] .app-top,
            html[data-sharky-theme="light"] .sidebar,
            html[data-sharky-theme="light"] .panel-card,
            html[data-sharky-theme="light"] .stat-card {
                background-color: #ffffff;
                color: #18283c;
                border-color: #dce6f0;
            }

            html[data-sharky-theme="light"] .app-main p,
            html[data-sharky-theme="light"] .panel-sub,
            html[data-sharky-theme="light"] .setting-row small,
            html[data-sharky-theme="light"] .stat-foot,
            html[data-sharky-theme="light"] .sidebar-note,
            html[data-sharky-theme="light"] .activity-item small {
                color: #64778e;
            }

            html[data-sharky-theme="light"] .app-heading h1,
            html[data-sharky-theme="light"] .panel-card h2,
            html[data-sharky-theme="light"] .setting-row b,
            html[data-sharky-theme="light"] .activity-item b {
                color: #18283c;
            }

            html[data-sharky-theme="light"] .side-link {
                color: #52667d;
            }

            html[data-sharky-theme="light"] .side-link:hover,
            html[data-sharky-theme="light"] .side-link.active {
                background: #eaf2ff;
                color: #145de0;
            }

            html[data-sharky-theme="light"] .notice {
                background: #eaf3ff;
                color: #24476f;
                border-color: #c9dfff;
            }

            html[data-sharky-theme="light"] .server-select,
            html[data-sharky-theme="light"] .input-control {
                color: #18283c;
                background: #ffffff;
                border-color: #d6e1ee;
            }

            html[data-sharky-theme="light"] .btn-muted {
                color: #24384f;
                background: #f4f7fb;
                border-color: #e0e8f1;
            }

            html[data-sharky-theme="light"] .demo-pill {
                color: #176c50;
                background: #e6f8ef;
                border-color: #bdebd2;
            }

            html[data-sharky-theme="light"] .activity-mark {
                background: #eaf2ff;
                color: #2563eb;
            }

            html[data-sharky-theme="light"] .sidebar-note {
                background: #f5f8fc;
                border-color: #e0e8f1;
            }

            html[data-sharky-theme="light"] .app-main > p:last-child {
                color: #64778e !important;
            }

            .sharky-reveal {
                opacity: 0;
                transform: translateY(14px);
                transition:
                    opacity .55s ease,
                    transform .55s cubic-bezier(.2,.75,.25,1);
            }

            .sharky-reveal.sharky-visible {
                opacity: 1;
                transform: translateY(0);
            }

            .sharky-ripple {
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: sharky-ripple .5s ease-out forwards;
                background: currentColor;
                opacity: .2;
            }

            @keyframes sharky-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                *,
                *::before,
                *::after {
                    scroll-behavior: auto !important;
                    animation-duration: .01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: .01ms !important;
                }

                .sharky-reveal {
                    opacity: 1;
                    transform: none;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function updateThemeButton() {
        const button = $("#sharky-theme-toggle");

        if (!button) return;

        const light = state.theme === "light";

        button.innerHTML = light
            ? '<span aria-hidden="true">☀</span><span>Modo claro</span>'
            : '<span aria-hidden="true">☾</span><span>Modo oscuro</span>';

        button.setAttribute("aria-label", t("theme.toggle"));
        button.setAttribute("aria-pressed", String(light));

        const label = button.querySelector("span:last-child");

        if (label) {
            label.textContent = t(light ? "theme.light" : "theme.dark");
        }
    }

    function setTheme(theme, showMessage = true) {
        state.theme = theme === "light" ? "light" : "dark";

        document.documentElement.dataset.sharkyTheme = state.theme;

        localStorage.setItem(STORAGE.theme, state.theme);

        const metaTheme = $('meta[name="theme-color"]');

        if (metaTheme) {
            metaTheme.content = state.theme === "light"
                ? "#f2f6fc"
                : "#07111f";
        }

        updateThemeButton();

        if (showMessage) {
            toast(t("theme.changed"));
        }
    }

    function initTheme() {
        addThemeStyles();

        const headerActions = $(".app-top > div");

        if (headerActions && !$("#sharky-theme-toggle")) {
            const button = document.createElement("button");

            button.id = "sharky-theme-toggle";
            button.type = "button";
            button.className = "sharky-theme-toggle";

            button.addEventListener("click", () => {
                setTheme(state.theme === "dark" ? "light" : "dark");
            });

            const loginButton = $("#discord-login");

            if (loginButton) {
                headerActions.insertBefore(button, loginButton);
            } else {
                headerActions.prepend(button);
            }
        }

        setTheme(state.theme, false);
    }

    /* =====================================================
       6. PREFERENCIAS LOCALES
       ===================================================== */

    function loadSettings() {
        let saved = {};

        try {
            saved = JSON.parse(localStorage.getItem(STORAGE.settings) || "{}");
        } catch {
            saved = {};
        }

        $$("[data-setting]").forEach(input => {
            const key = input.dataset.setting;

            if (typeof saved[key] === "boolean") {
                input.checked = saved[key];
            }

            input.addEventListener("change", () => {
                saveSettings();

                const status = input.checked
                    ? t("settings.enabled")
                    : t("settings.disabled");

                toast(`${input.dataset.label || key}: ${status}. ${t("settings.local")}`);

                input.closest(".setting-row")?.classList.add("sharky-setting-changed");

                window.setTimeout(() => {
                    input.closest(".setting-row")?.classList.remove("sharky-setting-changed");
                }, 500);
            });
        });
    }

    function saveSettings() {
        const settings = {};

        $$("[data-setting]").forEach(input => {
            settings[input.dataset.setting] = input.checked;
        });

        localStorage.setItem(STORAGE.settings, JSON.stringify(settings));
    }

    /* =====================================================
       7. NAVEGACIÓN
       ===================================================== */

    function initNavigation() {
        $$("[data-section-link]").forEach(button => {
            button.addEventListener("click", () => {
                const target = document.getElementById(button.dataset.sectionLink);

                if (!target) return;

                $$("[data-section-link]").forEach(link => {
                    link.classList.remove("active");
                    link.removeAttribute("aria-current");
                });

                button.classList.add("active");
                button.setAttribute("aria-current", "location");

                target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "auto"
                        : "smooth",
                    block: "start"
                });
            });
        });
    }

    /* =====================================================
       8. BOTONES Y EFECTOS
       ===================================================== */

    function initButtons() {
        $$("[data-demo-action]").forEach(button => {
            button.addEventListener("click", () => {
                const message = button.dataset.demoAction || t("action.pending");
                toast(message, "warning");
            });
        });

        $$("button").forEach(button => {
            button.addEventListener("pointerdown", event => {
                if (event.button !== 0) return;

                const rect = button.getBoundingClientRect();

                const ripple = document.createElement("span");

                ripple.className = "sharky-ripple";

                const size = Math.max(rect.width, rect.height);

                Object.assign(ripple.style, {
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${event.clientX - rect.left - size / 2}px`,
                    top: `${event.clientY - rect.top - size / 2}px`
                });

                const oldPosition = getComputedStyle(button).position;

                if (oldPosition === "static") {
                    button.style.position = "relative";
                }

                button.style.overflow = "hidden";
                button.appendChild(ripple);

                window.setTimeout(() => ripple.remove(), 550);
            });
        });
    }

    function initRevealAnimations() {
        const elements = $$(".stat-card, .panel-card");

        if (!("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("sharky-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08
        });

        elements.forEach((element, index) => {
            element.classList.add("sharky-reveal");
            element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
            observer.observe(element);
        });
    }

    /* =====================================================
       9. CONEXIÓN CON LA API DE DISCORD
       ===================================================== */

    async function apiFetch(path, options = {}) {
        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            credentials: "include",
            headers: {
                "Accept": "application/json",
                ...(options.headers || {})
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return response.json();
    }

    function setNotice(message, type = "info") {
        const notice = $("#dashboard-notice");

        if (!notice) return;

        notice.replaceChildren();

        const text = document.createElement("span");
        text.textContent = message;

        notice.appendChild(text);

        notice.dataset.noticeType = type;
    }

    function setDiscordStatus(message, connected = false) {
        const status = $("#discord-status");

        if (!status) return;

        status.textContent = message;
        status.dataset.connected = String(connected);
    }

    function renderGuilds(guilds) {
        const select = $("[data-discord-servers]");

        if (!select) return;

        select.replaceChildren();

        if (!guilds.length) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = t("notice.noServers");

            select.appendChild(option);
            return;
        }

        const placeholder = document.createElement("option");

        placeholder.value = "";
        placeholder.textContent = t("header.server");

        select.appendChild(placeholder);

        guilds.forEach(guild => {
            const option = document.createElement("option");

            option.value = guild.id;
            option.textContent = guild.name;

            select.appendChild(option);
        });
    }

    function renderUser(user) {
        const container = $("[data-discord-user]");
        const username = $("[data-discord-username]");
        const avatar = $("[data-discord-avatar]");
        const loginButton = $("#discord-login");
        const logoutButton = $("#discord-logout");

        if (!user) {
            if (container) container.hidden = true;
            if (loginButton) loginButton.hidden = false;
            if (logoutButton) logoutButton.hidden = true;
            return;
        }

        state.user = user;

        if (container) container.hidden = false;

        if (username) {
            username.textContent =
                user.global_name || user.username || "Discord user";
        }

        if (avatar && user.id && user.avatar) {
            avatar.src =
                `https://cdn.discordapp.com/avatars/${encodeURIComponent(user.id)}/${encodeURIComponent(user.avatar)}.png?size=128`;

            avatar.hidden = false;

            avatar.onerror = () => {
                avatar.hidden = true;
            };
        } else if (avatar) {
            avatar.hidden = true;
        }

        if (loginButton) loginButton.hidden = true;
        if (logoutButton) logoutButton.hidden = false;
    }

    async function loadDiscord() {
        setDiscordStatus(t("discord.loading"));

        try {
            const data = await apiFetch("/api/me");

            // Compatibilidad con diferentes formatos de respuesta.
            const user = data.user || data.discord_user || data;

            if (!user || !user.id) {
                state.user = null;

                renderUser(null);
                setDiscordStatus(t("discord.disconnected"), false);

                setNotice(t("notice.welcome"));

                return;
            }

            renderUser(user);
            setDiscordStatus(t("discord.connected"), true);

            setNotice(t("notice.connected"), "success");

            try {
                const guildData = await apiFetch("/api/guilds");

                const guilds = Array.isArray(guildData)
                    ? guildData
                    : guildData.guilds || guildData.servers || [];

                state.guilds = guilds;

                renderGuilds(guilds);

                if (guilds.length) {
                    setNotice(t("discord.serverLoaded"), "success");
                } else {
                    setNotice(t("notice.noServers"), "warning");
                }
            } catch (error) {
                console.warn("Sharky: no se pudieron cargar los servidores.", error);

                renderGuilds([]);
                setNotice(t("discord.loadError"), "warning");
            }
        } catch (error) {
            console.warn("Sharky: no se pudo verificar la sesión.", error);

            state.user = null;

            renderUser(null);
            setDiscordStatus(t("discord.disconnected"), false);

            setNotice(t("notice.connectionError"), "warning");
        }
    }

    function initGuildSelect() {
        const select = $("[data-discord-servers]");

        if (!select) return;

        select.addEventListener("change", () => {
            const guildId = select.value;

            state.currentGuild =
                state.guilds.find(guild => guild.id === guildId) || null;

            if (state.currentGuild) {
                toast(`${t("discord.serverSelected")} ${state.currentGuild.name}`);
            }
        });
    }

    function initDiscordLogout() {
        const button = $("#discord-logout");

        if (!button) return;

        button.addEventListener("click", async () => {
            button.disabled = true;

            try {
                await apiFetch("/logout", {
                    method: "POST"
                });

                state.user = null;
                state.guilds = [];
                state.currentGuild = null;

                renderUser(null);
                renderGuilds([]);

                setDiscordStatus(t("discord.disconnected"), false);
                setNotice(t("notice.welcome"));

                toast(t("discord.logoutSuccess"));
            } catch (error) {
                console.warn("Sharky: error al cerrar sesión.", error);

                toast(
                    "No se pudo confirmar el cierre de sesión con la API.",
                    "error"
                );
            } finally {
                button.disabled = false;
            }
        });
    }

    /* =====================================================
       10. MENÚ MÓVIL (SI EXISTE EN LA PÁGINA)
       ===================================================== */

    function initMobileMenu() {
        const toggle = $(".nav-toggle");
        const links = $(".nav-links");

        if (!toggle || !links) return;

        toggle.addEventListener("click", () => {
            const open = links.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(open));
        });
    }

    /* =====================================================
       11. AÑO AUTOMÁTICO
       ===================================================== */

    function initYear() {
        $$("[data-year]").forEach(element => {
            element.textContent = new Date().getFullYear();
        });
    }

    /* =====================================================
       12. INICIALIZACIÓN
       ===================================================== */

    function init() {
        initTheme();
        initLanguage();

        loadSettings();
        initNavigation();
        initButtons();
        initRevealAnimations();
        initGuildSelect();
        initDiscordLogout();
        initMobileMenu();
        initYear();

        // La API solo es necesaria en páginas que contienen el Dashboard.
        if ($("[data-discord-servers]")) {
            loadDiscord();
        }

        console.info(
            "%c SHARKY MEGALODON ",
            "background:#1265f3;color:white;font-weight:bold;padding:5px 9px;border-radius:5px;",
            "Dashboard iniciado."
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
