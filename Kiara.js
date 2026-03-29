$('#mltk-wrapper').remove();
$('#mltk-style').remove();
$('#mltk-bottom-bar').remove();

(function () {
    'use strict';

    const TOOLKIT_CONFIG = {
        name: 'Mat-Legend Toolkit',
        version: '1.0',
        iconUrl: 'https://i.imgur.com/p50QNka.png',
        categories: [
            {
                id: 'maps',
                label: 'Mapas',
                icon: '🌍',
                items: [
                    {
                        label: 'Coletar Coords Mapa',
                        action: () => $.getScript('https://twscripts.dev/scripts/mapCoordPicker.js')
                    },
                    {
                        label: 'Range da Torre',
                        action: () => $.getScript('https://shinko-to-kuma.com/scripts/watchTower.js')
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
                icon: '🧰',
                items: [
                    {
                        label: 'Adicionar nota na aldeia',
                        action: () => $.getScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/AutoNotesFromReports.js')
                    },
                    {
                        label: 'Adicionar grupo em massa',
                        action: () => $.getScript('https://www.dl.dropboxusercontent.com/scl/fi/c743u2tn6e4g3345ztb7i/Group_Import_Coordinate.js?rlkey=y1g84o3zzwiva16c9hpr86bs3&dl=0')
                    },
                    {
                        label: 'Renomeador de aldeias',
                        action: () => $.getScript('https://dl.dropboxusercontent.com/s/9rpgd3weuj0vp7z/renameVillages.js')
                    },
                    {
                        label: 'Enviar Recursos',
                        action: () => $.getScript('https://shinko-to-kuma.com/scripts/res-senderV2.js')
                    }
                ]
            },
            {
                id: 'stats',
                label: 'Estatísticas',
                icon: '📊',
                items: [
                    {
                        label: 'Analisar jogador',
                        action: () => $.getScript('https://dl.dropboxusercontent.com/s/g9cl2fzx46eq9ce/profileStats.js')
                    },
                    {
                        label: 'Performance da tribo',
                        action: () => $.getScript('https://shinko-to-kuma.com/scripts/tribeStats.js')
                    },
                    {
                        label: 'Comparação das tribos',
                        action: () => $.getScript('https://twscripts.dev/scripts/tribeStatsTool.js')
                    }
                ]
            },
            {
                id: 'troops',
                label: 'Tropas',
                icon: '⚔️',
                items: [
                    {
                        label: 'Calculadora de tropas',
                        action: () => $.getScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/AnotherTroopCounter.js')
                    },
                    {
                        label: 'Checar defesa',
                        action: () => $.getScript('https://twscripts.dev/scripts/defenseHealthCheck.js')
                    }
                ]
            },
            {
                id: 'others',
                label: 'Outros',
                icon: '🧩',
                items: [
                    {
                        label: 'Somar Armazém',
                        action: () => $.getScript('https://www.dl.dropboxusercontent.com/scl/fi/ickl4s1q40pvduccpxzj9/sumStorage.js?rlkey=qhlqvnkh8qg90tc6xqo8a0esx&dl=0')
                    },
                    {
                        label: 'Produção total',
                        action: () => {
                            window.bonusProd = 0.2;
                            window.useFlags = true;
                            $.getScript('https://dev.nonreal.de/scripts/res_add.js');
                        }
                    },
                    {
                        label: 'Previsão farm e coleta (Em um Dia)',
                        action: () => $.getScript('https://api-users.herokuapp.com/resultDay.js?dl=0')
                    },
                    {
                        label: 'Calculadora de pps',
                        action: () => $.getScript('https://shinko-to-kuma.com/scripts/log.js')
                    }
                ]
            }
        ]
    };

    function getCurrentWorld() {
        if (typeof game_data !== 'undefined' && game_data.world) {
            return String(game_data.world).toLowerCase();
        }

        const host = window.location.hostname.toLowerCase();
        const match = host.match(/(br\d+)\./);
        return match ? match[1] : null;
    }

    function openCurrentWorldTwStatsMap() {
        const world = getCurrentWorld();

        if (!world) {
            alert('Não foi possível detectar o mundo atual.');
            return;
        }

        window.open(`https://www.twstats.com/${world}/index.php?page=map`, '_blank');
    }

    function openCurrentWorldReplay() {
        const world = getCurrentWorld();

        if (!world) {
            alert('Não foi possível detectar o mundo atual.');
            return;
        }

        window.open(`https://twreplay.com/server/br/world/${world}.`, '_blank');
    }

    function injectStyles() {
        const css = `
            #mltk-wrapper {
                position: fixed;
                top: 45px;
                right: 0;
                z-index: 999999;
                display: flex;
                align-items: flex-start;
                font-family: Verdana, Arial, sans-serif;
            }

            #mltk-icon {
                width: 72px;
                height: 120px;
                border: 1px solid #777;
                border-right: none;
                border-radius: 12px 0 0 12px;
                overflow: hidden;
                background: #111;
                box-shadow: -2px 2px 8px rgba(0,0,0,0.35);
                flex-shrink: 0;
            }

            #mltk-icon img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }

            #mltk-panel {
                width: 250px;
                min-height: 90px;
                background: #f0d000;
                border: 1px solid #777;
                border-right: none;
                box-shadow: -2px 2px 8px rgba(0,0,0,0.25);
                display: none;
                padding: 8px 10px;
                box-sizing: border-box;
            }

            #mltk-wrapper:hover #mltk-panel {
                display: block;
            }

            .mltk-title {
                text-align: center;
                font-weight: bold;
                font-size: 14px;
                color: #006400;
                text-decoration: underline;
                margin-bottom: 8px;
            }

            .mltk-version-line {
                font-size: 13px;
                font-weight: bold;
                font-style: italic;
                line-height: 1.4;
                text-align: center;
            }

            .mltk-version-line .toolkit {
                color: #d10000;
            }

            .mltk-credits {
                margin-top: 8px;
                font-size: 12px;
                text-align: center;
                color: #3b2a14;
            }

            .mltk-credits a {
                color: #8b0000;
                font-weight: bold;
                text-decoration: none;
            }

            .mltk-credits a:hover {
                text-decoration: underline;
            }

            #mltk-bottom-bar {
                position: fixed;
                left: 10px;
                bottom: 18px;
                z-index: 999998;
                display: flex;
                gap: 6px;
                align-items: flex-end;
                font-family: Verdana, Arial, sans-serif;
            }

            .mltk-cat {
                position: relative;
                min-width: 115px;
                height: 46px;
                background: #f3e2b8;
                border: 1px dashed #c4471c;
                border-radius: 6px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 0 10px;
                box-sizing: border-box;
                cursor: pointer;
                font-size: 12px;
                font-style: italic;
                font-weight: bold;
                color: #8b0000;
            }

            .mltk-cat:hover {
                background: #f7eac8;
            }

            .mltk-cat-icon {
                font-size: 22px;
                line-height: 1;
            }

            .mltk-cat-label {
                font-size: 14px;
            }

            .mltk-submenu {
                position: absolute;
                left: 0;
                bottom: 42px;
                min-width: 260px;
                background: #f7f0d8;
                border: 1px solid #9b7b4d;
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                display: none;
                padding: 6px;
                border-radius: 6px;
            }

            .mltk-cat:hover .mltk-submenu {
                display: block;
            }

            .mltk-submenu-item {
                display: block;
                padding: 6px 8px;
                color: #3b2a14;
                text-decoration: none;
                font-size: 13px;
                border-radius: 4px;
                cursor: pointer;
                line-height: 1.25;
            }

            .mltk-submenu-item:hover {
                background: #ead7aa;
                color: #8b0000;
            }
        `;

        $('<style id="mltk-style"></style>').text(css).appendTo('head');
    }

    function buildBottomBarHtml() {
        return TOOLKIT_CONFIG.categories.map((category, categoryIndex) => {
            const itemsHtml = category.items.map((item, itemIndex) => `
                <span
                    class="mltk-submenu-item"
                    data-category-index="${categoryIndex}"
                    data-item-index="${itemIndex}"
                >
                    ${item.label}
                </span>
            `).join('');

            return `
                <div class="mltk-cat">
                    <span class="mltk-cat-icon">${category.icon}</span>
                    <span class="mltk-cat-label">${category.label}</span>
                    <div class="mltk-submenu">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    function createMenu() {
        const html = `
            <div id="mltk-wrapper">
                <div id="mltk-panel">
                    <div class="mltk-title">Script KIARA</div>

                    <div class="mltk-version-line">
                        <div class="toolkit">Versão: ${TOOLKIT_CONFIG.version}</div>
                    </div>

                    <div class="mltk-credits">
                        Criado por
                        <a href="https://forum.tribalwars.com.br/index.php?members/mat-legend.106854/" target="_blank">
                            Mat-Legend
                        </a>
                    </div>
                </div>

                <div id="mltk-icon">
                    <img src="${TOOLKIT_CONFIG.iconUrl}" alt="Toolkit Icon">
                </div>
            </div>
        `;

        const bottomBarHtml = `
            <div id="mltk-bottom-bar">
                ${buildBottomBarHtml()}
            </div>
        `;

        $('body').append(html);
        $('body').append(bottomBarHtml);
    }

    function bindEvents() {
        $(document).on('click', '.mltk-submenu-item', function () {
            const categoryIndex = Number($(this).attr('data-category-index'));
            const itemIndex = Number($(this).attr('data-item-index'));
            const item = TOOLKIT_CONFIG.categories[categoryIndex]?.items[itemIndex];

            if (item && typeof item.action === 'function') {
                item.action();
            }
        });
    }

    function init() {
        injectStyles();
        createMenu();
        bindEvents();
    }

    init();
})();
