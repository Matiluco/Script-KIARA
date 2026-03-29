$('#mltk-wrapper').remove();
$('#mltk-style').remove();
$('#mltk-bottom-bar').remove();

(function () {
    'use strict';

    const TOOLKIT_CONFIG = {
        name: 'Script KIARA',
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
            label: 'Importar grupo dinâmico',
            action: () => $.getScript('https://twscripts.dev/scripts/importExportDynamicGroups.js')
        },
        {
            label: 'Renomeador de aldeias',
            action: () => $.getScript('https://dl.dropboxusercontent.com/s/9rpgd3weuj0vp7z/renameVillages.js')
        },
        {
            label: 'Enviar Recursos',
            action: () => $.getScript('https://shinko-to-kuma.com/scripts/res-senderV2.js')
        },
        {
            label: 'Coletar coords perfil',
            action: () => $.getScript('https://twscripts.dev/scripts/extendedPlayerInfo.js')
        },
        {
            label: 'Simulador de Construção e Tropas',
            action: () => {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/gh/Matiluco/Calculadora-de-Construcoes@main/Simulador.js?' + Date.now();
                s.onload = function () { console.log('Simulador carregado'); };
                s.onerror = function () { alert('Erro ao carregar Simulador'); };
                document.body.appendChild(s);
            }
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
                    },
                    {
                        label: 'Eficiência do farm',
                        action: () => $.getScript('https://twscripts.dev/scripts/farmingEfficiencyCalculator.js')
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
                    },
                    {
                        label: 'Meus Apoios',
                        action: () => $.getScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/SupportCounter.js')
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
                    },
                    {
                        label: 'Previsão bandeiras',
                        action: () => {
                            function processFlagRow(row) {
                                let flags = [];

                                for (let i = 1; i <= 9; i++) {
                                    let flagBox = document.querySelector(`#flag_box_${row}_${i}`);
                                    if (flagBox) {
                                        let flagCountElement = flagBox.querySelector('.flag_count');
                                        if (flagCountElement) {
                                            flags.push(flagCountElement.innerText);
                                        }
                                    }
                                }

                                flags = flags.map(flag => flag === '' ? 0 : parseInt(flag, 10));

                                for (let i = 0; i < flags.length - 1; i++) {
                                    let currentLevel = flags[i];
                                    let nextLevel = flags[i + 1];
                                    let convertToNextLevel = Math.floor(currentLevel / 3);

                                    if (convertToNextLevel > 0) {
                                        console.log(`Linha ${row}: Calculando bandeiras do nível ${i + 1}, onde tenho ${currentLevel} bandeiras. Posso transformar ${convertToNextLevel * 3} bandeiras em ${convertToNextLevel} bandeira(s) para o próximo nível.`);
                                        console.log(`Linha ${row}: Nível ${i + 2} tinha ${nextLevel} bandeira(s) e agora terá ${nextLevel + convertToNextLevel} bandeira(s).`);

                                        flags[i + 1] += convertToNextLevel;
                                        flags[i] -= convertToNextLevel * 3;
                                    } else {
                                        console.log(`Linha ${row}: No nível ${i + 1}, tenho ${currentLevel} bandeiras. Não há bandeiras suficientes para converter.`);
                                    }
                                }

                                for (let i = 1; i <= 9; i++) {
                                    let flagBox = document.querySelector(`#flag_box_${row}_${i}`);
                                    if (flagBox) {
                                        let flagCountElement = flagBox.querySelector('.flag_count');
                                        let newFlagCount = flags[i - 1];

                                        let flagUpgrade = flagBox.querySelector('.flag_upgrade');
                                        if (flagUpgrade) {
                                            flagUpgrade.remove();
                                        }

                                        if (newFlagCount > 0) {
                                            flagCountElement.innerText = newFlagCount;

                                            flagBox.style.backgroundImage = `url('https://dsxs.innogamescdn.com/asset/e0dbe5d0/graphic/flags/medium/${row}_${i}.png')`;
                                            flagBox.style.cursor = 'pointer';

                                            flagCountElement.style.display = 'inline';
                                            flagCountElement.style.backgroundColor = 'lightgreen';

                                            flagBox.classList.remove('flag_box_empty');
                                            flagBox.classList.remove(`flag_box_empty_${i}`);
                                        } else {
                                            flagBox.classList.add('flag_box_empty');
                                            if (flagCountElement) {
                                                flagCountElement.style.display = 'none';
                                            }
                                            flagBox.style.cursor = 'default';
                                            flagBox.style.backgroundImage = `url('https://dsbr.innogamescdn.com/asset/1e5b6b81/graphic/flags/medium/${row}_6.png')`;
                                        }
                                    }
                                }
                            }

                            for (let row = 1; row <= 8; row++) {
                                processFlagRow(row);
                            }
                        }
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

       window.open(`https://twreplay.com/server/br/world/${world}/`, '_blank');
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
                z-index: 999999;
            }

            .mltk-cat:hover .mltk-submenu,
            .mltk-submenu:hover {
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
