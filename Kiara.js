(function () {
    'use strict';

    const ROOT_ID = 'mltk-wrapper';
    const STYLE_ID = 'mltk-style';
    const BAR_ID = 'mltk-bottom-bar';
    const VERSION = '1.4.0';
    const OWN_REPO_BASE = 'https://cdn.jsdelivr.net/gh/Matiluco';

    removeExisting();

    if (typeof window.jQuery === 'undefined') {
        alert('jQuery nao esta disponivel nesta pagina.');
        return;
    }

    const TOOLKIT_CONFIG = {
        name: 'Script KIARA',
        version: VERSION,
        iconUrl: 'https://i.imgur.com/p50QNka.png',
        categories: [
            {
                id: 'maps',
                label: 'Mapas',
                icon: 'MAP',
                items: [
                    {
                        label: 'Coletar Coords Mapa',
                        action: () => loadExternalScript('https://twscripts.dev/scripts/mapCoordPicker.js')
                    },
                    {
                        label: 'Range da Torre',
                        action: () => loadExternalScript('https://shinko-to-kuma.com/scripts/watchTower.js')
                    },
                    {
                        label: 'Mapa do Mundo',
                        action: () => openCurrentWorldTwStatsMap()
                    },
                    {
                        label: 'TW Replay',
                        action: () => openCurrentWorldReplay()
                    }
                ]
            },
            {
                id: 'tools',
                label: 'Ferramentas',
                icon: 'TOOLS',
                items: [
                    {
                        label: 'Adicionar nota na aldeia',
                        action: () => loadExternalScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/AutoNotesFromReports.js')
                    },
                    {
                        label: 'Adicionar grupo em massa',
                        action: () => loadExternalScript('https://www.dl.dropboxusercontent.com/scl/fi/c743u2tn6e4g3345ztb7i/Group_Import_Coordinate.js?rlkey=y1g84o3zzwiva16c9hpr86bs3&dl=0')
                    },
                    {
                        label: 'Importar grupo dinamico',
                        action: () => loadExternalScript('https://twscripts.dev/scripts/importExportDynamicGroups.js')
                    },
                    {
                        label: 'Renomeador de aldeias',
                        action: () => loadExternalScript('https://dl.dropboxusercontent.com/s/9rpgd3weuj0vp7z/renameVillages.js')
                    },
                    {
                        label: 'Enviar Recursos',
                        action: () => loadExternalScript('https://shinko-to-kuma.com/scripts/res-senderV2.js')
                    },
                    {
                        label: 'Coletar coords perfil',
                        action: () => loadExternalScript('https://twscripts.dev/scripts/extendedPlayerInfo.js')
                    },
                    {
                        label: 'Simulador de Construcoes e Tropas',
                        action: () => loadOwnScript('Calculadora-de-Construcoes@main/Simulador.js')
                    }
                ]
            },
            {
                id: 'stats',
                label: 'Estatisticas',
                icon: 'STATS',
                items: [
                    {
                        label: 'Analisar jogador',
                        action: () => loadExternalScript('https://dl.dropboxusercontent.com/s/g9cl2fzx46eq9ce/profileStats.js')
                    },
                    {
                        label: 'Performance da tribo',
                        action: () => loadExternalScript('https://shinko-to-kuma.com/scripts/tribeStats.js')
                    },
                    {
                        label: 'Comparacao das tribos',
                        action: () => loadExternalScript('https://twscripts.dev/scripts/tribeStatsTool.js')
                    },
                    {
                        label: 'Eficiencia do farm',
                        action: () => loadExternalScript('https://twscripts.dev/scripts/farmingEfficiencyCalculator.js')
                    }
                ]
            },
            {
                id: 'troops',
                label: 'Tropas',
                icon: 'ATK',
                items: [
                    {
                        label: 'Calculadora de tropas',
                        action: () => loadExternalScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/AnotherTroopCounter.js')
                    },
                    {
                        label: 'Checar defesa',
                        action: () => loadExternalScript('https://twscripts.dev/scripts/defenseHealthCheck.js')
                    },
                    {
                        label: 'Meus Apoios',
                        action: () => loadExternalScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/SupportCounter.js')
                    }
                ]
            },
            {
                id: 'others',
                label: 'Outros',
                icon: 'PLUS',
                items: [
                    {
                        label: 'Somar Armazem',
                        action: () => loadExternalScript('https://www.dl.dropboxusercontent.com/scl/fi/ickl4s1q40pvduccpxzj9/sumStorage.js?rlkey=qhlqvnkh8qg90tc6xqo8a0esx&dl=0')
                    },
                    {
                        label: 'Producao total',
                        action: () => {
                            window.bonusProd = 0.2;
                            window.useFlags = true;
                            loadExternalScript('https://dev.nonreal.de/scripts/res_add.js');
                        }
                    },
                    {
                        label: 'Previsao farm e coleta (Em um Dia)',
                        action: () => loadExternalScript('https://api-users.herokuapp.com/resultDay.js?dl=0')
                    },
                    {
                        label: 'Calculadora de pps',
                        action: () => loadExternalScript('https://shinko-to-kuma.com/scripts/log.js')
                    },
                    {
                        label: 'Previsao bandeiras',
                        action: () => previewFlags()
                    }
                ]
            }
        ]
    };

    function removeExisting() {
        document.getElementById(ROOT_ID)?.remove();
        document.getElementById(STYLE_ID)?.remove();
        document.getElementById(BAR_ID)?.remove();
        document.querySelectorAll('script[data-kiara-runtime="true"]').forEach((script) => script.remove());
    }

    function withCacheBuster(url) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}_kiara=${Date.now()}`;
    }

    function loadOwnScript(repoPath) {
        return loadScript(`${OWN_REPO_BASE}/${repoPath}`, true);
    }

    function loadExternalScript(url, fresh = false) {
        return loadScript(url, fresh);
    }

    function loadScript(url, fresh) {
        const script = document.createElement('script');
        script.src = fresh ? withCacheBuster(url) : url;
        script.async = true;
        script.dataset.kiaraRuntime = 'true';
        script.onload = () => console.log(`[KIARA] Script carregado: ${url}`);
        script.onerror = () => alert(`Erro ao carregar script:\n${url}`);
        document.body.appendChild(script);
        return script;
    }

    function getCurrentWorld() {
        if (typeof window.game_data !== 'undefined' && window.game_data.world) {
            return String(window.game_data.world).toLowerCase();
        }

        const host = window.location.hostname.toLowerCase();
        const match = host.match(/(br\d+)\./);
        return match ? match[1] : null;
    }

    function openCurrentWorldTwStatsMap() {
        const world = getCurrentWorld();

        if (!world) {
            alert('Nao foi possivel detectar o mundo atual.');
            return;
        }

        window.open(`https://www.twstats.com/${world}/index.php?page=map`, '_blank');
    }

    function openCurrentWorldReplay() {
        const world = getCurrentWorld();

        if (!world) {
            alert('Nao foi possivel detectar o mundo atual.');
            return;
        }

        window.open(`https://twreplay.com/server/br/world/${world}/`, '_blank');
    }

    function previewFlags() {
        function processFlagRow(row) {
            let flags = [];

            for (let i = 1; i <= 9; i += 1) {
                const flagBox = document.querySelector(`#flag_box_${row}_${i}`);
                const flagCountElement = flagBox?.querySelector('.flag_count');
                if (flagCountElement) flags.push(flagCountElement.innerText);
            }

            flags = flags.map((flag) => flag === '' ? 0 : parseInt(flag, 10));

            for (let i = 0; i < flags.length - 1; i += 1) {
                const convertToNextLevel = Math.floor(flags[i] / 3);
                if (convertToNextLevel > 0) {
                    flags[i + 1] += convertToNextLevel;
                    flags[i] -= convertToNextLevel * 3;
                }
            }

            for (let i = 1; i <= 9; i += 1) {
                const flagBox = document.querySelector(`#flag_box_${row}_${i}`);
                if (!flagBox) continue;

                const flagCountElement = flagBox.querySelector('.flag_count');
                const newFlagCount = flags[i - 1] || 0;
                flagBox.querySelector('.flag_upgrade')?.remove();

                if (newFlagCount > 0) {
                    if (flagCountElement) {
                        flagCountElement.innerText = newFlagCount;
                        flagCountElement.style.display = 'inline';
                        flagCountElement.style.backgroundColor = 'lightgreen';
                    }
                    flagBox.style.backgroundImage = `url('https://dsxs.innogamescdn.com/asset/e0dbe5d0/graphic/flags/medium/${row}_${i}.png')`;
                    flagBox.style.cursor = 'pointer';
                    flagBox.classList.remove('flag_box_empty', `flag_box_empty_${i}`);
                } else {
                    flagBox.classList.add('flag_box_empty');
                    if (flagCountElement) flagCountElement.style.display = 'none';
                    flagBox.style.cursor = 'default';
                    flagBox.style.backgroundImage = `url('https://dsbr.innogamescdn.com/asset/1e5b6b81/graphic/flags/medium/${row}_6.png')`;
                }
            }
        }

        for (let row = 1; row <= 8; row += 1) {
            processFlagRow(row);
        }
    }

    function injectStyles() {
        const css = `
            #${ROOT_ID}{position:fixed;top:45px;right:0;z-index:999999;display:flex;align-items:flex-start;font-family:Verdana,Arial,sans-serif}
            #mltk-icon{width:72px;height:120px;border:1px solid #777;border-right:none;border-radius:12px 0 0 12px;overflow:hidden;background:#111;box-shadow:-2px 2px 8px rgba(0,0,0,.35);flex-shrink:0}
            #mltk-icon img{width:100%;height:100%;object-fit:cover;display:block}
            #mltk-panel{width:250px;min-height:90px;background:#f0d000;border:1px solid #777;border-right:none;box-shadow:-2px 2px 8px rgba(0,0,0,.25);display:none;padding:8px 10px;box-sizing:border-box}
            #${ROOT_ID}:hover #mltk-panel{display:block}
            .mltk-title{text-align:center;font-weight:700;font-size:14px;color:#006400;text-decoration:underline;margin-bottom:8px}
            .mltk-version-line{font-size:13px;font-weight:700;font-style:italic;line-height:1.4;text-align:center}
            .mltk-version-line .toolkit{color:#d10000}
            .mltk-credits{margin-top:8px;font-size:12px;text-align:center;color:#3b2a14}
            .mltk-credits a{color:#8b0000;font-weight:700;text-decoration:none}
            .mltk-credits a:hover{text-decoration:underline}
            #${BAR_ID}{position:fixed;left:10px;bottom:18px;z-index:999998;display:flex;gap:6px;align-items:flex-end;font-family:Verdana,Arial,sans-serif;flex-wrap:wrap;max-width:calc(100vw - 20px)}
            .mltk-cat{position:relative;min-width:115px;height:46px;background:#f3e2b8;border:1px dashed #c4471c;border-radius:6px;box-shadow:0 1px 2px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;gap:6px;padding:0 10px;box-sizing:border-box;cursor:pointer;font-size:12px;font-style:italic;font-weight:700;color:#8b0000}
            .mltk-cat:hover{background:#f7eac8}
            .mltk-cat-icon{font-size:11px;line-height:1;background:#8b5a2b;color:#fff;border-radius:4px;padding:3px 4px;font-style:normal}
            .mltk-cat-label{font-size:14px}
            .mltk-submenu{position:absolute;left:0;bottom:42px;min-width:260px;background:#f7f0d8;border:1px solid #9b7b4d;box-shadow:0 3px 8px rgba(0,0,0,.3);display:none;padding:6px;border-radius:6px;z-index:999999}
            .mltk-cat:hover .mltk-submenu,.mltk-submenu:hover{display:block}
            .mltk-submenu-item{display:block;padding:6px 8px;color:#3b2a14;text-decoration:none;font-size:13px;border-radius:4px;cursor:pointer;line-height:1.25;white-space:normal}
            .mltk-submenu-item:hover{background:#ead7aa;color:#8b0000}
        `;

        $('<style id="' + STYLE_ID + '"></style>').text(css).appendTo('head');
    }

    function buildBottomBarHtml() {
        return TOOLKIT_CONFIG.categories.map((category, categoryIndex) => {
            const itemsHtml = category.items.map((item, itemIndex) => `
                <span class="mltk-submenu-item" data-category-index="${categoryIndex}" data-item-index="${itemIndex}">
                    ${item.label}
                </span>
            `).join('');

            return `
                <div class="mltk-cat">
                    <span class="mltk-cat-icon">${category.icon}</span>
                    <span class="mltk-cat-label">${category.label}</span>
                    <div class="mltk-submenu">${itemsHtml}</div>
                </div>
            `;
        }).join('');
    }

    function createMenu() {
        const html = `
            <div id="${ROOT_ID}">
                <div id="mltk-panel">
                    <div class="mltk-title">${TOOLKIT_CONFIG.name}</div>
                    <div class="mltk-version-line">
                        <div class="toolkit">Versao: ${TOOLKIT_CONFIG.version}</div>
                    </div>
                    <div class="mltk-credits">
                        Criado por
                        <a href="https://forum.tribalwars.com.br/index.php?members/mat-legend.106854/" target="_blank" rel="noopener noreferrer">
                            Mat-Legend
                        </a>
                    </div>
                </div>
                <div id="mltk-icon">
                    <img src="${TOOLKIT_CONFIG.iconUrl}" alt="Toolkit Icon">
                </div>
            </div>
        `;

        const bottomBarHtml = `<div id="${BAR_ID}">${buildBottomBarHtml()}</div>`;
        $('body').append(html);
        $('body').append(bottomBarHtml);
    }

    function bindEvents() {
        $(document).off('click.kiara-menu').on('click.kiara-menu', '.mltk-submenu-item', function () {
            const categoryIndex = Number($(this).attr('data-category-index'));
            const itemIndex = Number($(this).attr('data-item-index'));
            const item = TOOLKIT_CONFIG.categories[categoryIndex]?.items[itemIndex];

            if (item && typeof item.action === 'function') {
                item.action();
            }
        });
    }

    injectStyles();
    createMenu();
    bindEvents();
})();
