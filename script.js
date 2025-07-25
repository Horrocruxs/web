document.addEventListener('DOMContentLoaded', function () {
    const DOM = {
        preloader: document.getElementById('preloader'),
        verificationGate: document.getElementById('verification-gate'),
        contractContent: document.getElementById('contract-content'),
        magicIdInput: document.getElementById('magic-id'),
        verifyButton: document.getElementById('verify-button'),
        errorContainer: document.getElementById('error-container'),
        errorMessage: document.getElementById('error-message'),
        signButton: document.getElementById('sign-button'),
        downloadButton: document.getElementById('download-button'),
        dynamicSignatureArea: document.getElementById('dynamic-signature-area'),
        vengeanceTrigger: document.getElementById('vengeance-trigger'),
        clausesContainer: document.getElementById('clauses-container'),
        securityPopup: document.getElementById('security-popup'),
        closePopupButton: document.getElementById('close-popup-button'),
        greetingScreen: document.getElementById('greeting-screen'),
        greetingMessage: document.getElementById('greeting-message'),
        greetingName: document.getElementById('greeting-name'),
        countdown: {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        }
    };

    const DATA = {
        parties: [
            { id: '72808434', name: 'Anthony Junior Torres Lozano', house: 'Casa Slytherin', houseColor: 'text-[var(--slytherin-green)]' },
            { id: '75391263', name: 'Lucila Mia Villalobos Yactayo', house: 'Casa Gryffindor', houseColor: 'text-[var(--gryffindor-red)]' }
        ],
        clauses: [
            { title: 'Del Juramento Inquebrantable', icon: '📜', content: 'El presente contrato constituye en su totalidad un Juramento Inquebrantable. Cada cláusula, obligación y condición aquí descrita es una promesa vinculante. LAS PARTES VINCULANTES juran solemnemente cumplir con todos los términos aquí expuestos.' },
            { title: 'Salvaguarda Contra Coacción', icon: '🛡️', content: 'Queda establecido que la consecuencia fatal del Juramento quedará en suspenso si se acredita fehacientemente que el incumplimiento fue producto de una coacción mágica externa irresistible (tales como la Maldición Imperius o una poción de control mental de máxima potencia). En tal evento, la parte no afectada juramenta hacer todo lo que esté a su alcance para liberar a la otra, momento en el cual el Juramento recuperará su plena vigencia.' },
            { title: 'Ritual de Severancia Anímica', icon: '🌙', content: 'El acto de división recíproca del alma se ejecutará mediante un único ritual a realizarse en el Puente de los Suspiros del distrito de Barranco, durante la primera luna nueva posterior a la firma de este pacto. LAS PARTES VINCULANTES deberán recitar al unísono el encantamiento “Animae Partis” y beber de una misma copa una poción compuesta por sus propias lágrimas (Gaseosa Sprite) y una gota de su sangre (Mermelada), sellando el acto con el rompimiento de un objeto de valor sentimental compartido.' },
            { title: 'Objeto del Pacto', icon: '🔗', content: 'Bajo los términos del Juramento, cada una de LAS PARTES VINCULANTES escinde su alma y deposita un fragmento de esta en el cuerpo y espíritu de la otra. De este modo, Anthony Junior Torres Lozano se convierte en Horcrux de Lucila Mia Villalobos Yactayo, y simultáneamente, Lucila Mia Villalobos Yactayo se convierte en Horcrux de Anthony Junior Torres Lozano.' },
            { title: 'Condición Suspensiva', icon: '⏳', content: 'La plena activación de las manifestaciones de un fragmento de alma queda supeditada al acaecimiento del deceso físico de su creador original.' },
            { title: 'De la Incapacitación Mágica', icon: '🗿', content: 'En caso de que una de las partes sufra una incapacitación mágica que no constituya muerte (petrificación, coma inducido por magia, etc.), el fragmento de alma residente en la parte sana actuará como un guardián, generando un escudo protector pasivo sobre el cuerpo incapacitado y otorgando a su receptáculo una conexión sensorial para percibir amenazas directas.' },
            { title: 'Facultades del Fragmento', icon: '✨', content: 'El fragmento del alma de la parte fallecida, residente en la parte supérstite, estará facultado para: a) Influencia Psíquica, b) Manifestaciones Parasensoriales, c) Protección Mágica Inherente, d) Anclaje Existencial, e) Apariencia Espectral.' },
            { title: 'Protocolo de Comunicación', icon: '🔮', content: 'Para facilitar la comunicación directa, LAS PARTES VINCULANTES encantan un par de espejos de obsidiana que servirán como canal. La parte supérstite podrá convocar una conversación lúcida con el fragmento del fallecido a través de dichos artefactos.' },
            { title: 'Obligaciones Recíprocas', icon: '🤝', content: 'Ambas partes juran solemnemente: a) No procurar jamás la remoción del fragmento, b) Proteger su propia integridad, c) Reconocer la movilidad universal del pacto, d) Mantener neutralidad entre Casas, e) Realizar un ritual anual de sincronización anímica.' },
            { title: 'Del Familiar del Pacto', icon: '🐾', content: 'Se designa a un leal Kneazle de nombre "Kid" como el Familiar del Pacto. Kid actuará como guardián físico y espiritual del vínculo. A la muerte de una de las partes, quedará bajo el cuidado de la supérstite.' },
            { title: 'Cláusula de Venganza Mutua', icon: '⚔️', content: 'Si una de las partes es asesinada, el fragmento de su alma otorgará a la parte supérstite acceso temporal a sus habilidades mágicas más potentes, con el fin de asegurar que se haga justicia.' },
            { title: 'Legado Mágico Conjunto', icon: '🏛️', content: 'En caso de disolución del pacto por destrucción de ambas partes, todos sus bienes mágicos se consolidarán en una única bóveda en Gringotts, bajo el nombre "Legado Torres-Villalobos".' },
            { title: 'Carácter Irreversible', icon: '♾️', content: 'La unión anímica creada por este pacto es perpetua y su existencia está intrínsecamente ligada a la vida de su respectivo receptáculo.' },
            { title: 'Destrucción de los Horcruxes', icon: '🔥', content: 'El presente vínculo solo podrá ser disuelto por la destrucción total e irreparable de ambos receptáculos vivientes mediante una sustancia o poder mágico de potencia destructiva extrema (equivalente, como mínimo, al veneno de Basilisco o al Fuego Maligno).' },
            { title: 'Jurisdicción Aplicable', icon: '⚖️', content: 'Para cualquier controversia, las partes se someten a la jurisdicción del Tribunal de Ley Mágica del Wizengamot.' }
        ]
    };

    let state = {
        currentSigner: null,
        jsPdfLoaded: false,
        signatures: JSON.parse(sessionStorage.getItem('pactSignatures')) || {}
    };

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function buildClauses() {
        DOM.clausesContainer.innerHTML = '';
        DATA.clauses.forEach(clause => {
            const card = document.createElement('div');
            card.className = 'neumorphic-flat cursor-pointer';
            card.innerHTML = `
                <div class="p-4 flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-2xl mr-4">${clause.icon}</span>
                        <h3 class="font-cinzel text-md text-gray-700">${clause.title}</h3>
                    </div>
                    <span class="text-xl transform transition-transform duration-300">▼</span>
                </div>
                <div class="clause-content px-4">
                    <p class="text-sm text-[var(--text-color)]">${clause.content}</p>
                </div>
            `;
            DOM.clausesContainer.appendChild(card);
        });
    }

    function setupClauseInteraction() {
        DOM.clausesContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.neumorphic-flat, .neumorphic-inset');
            if (!card) return;

            const content = card.querySelector('.clause-content');
            const arrow = card.querySelector('.transform');
            const isOpen = content.classList.contains('open');

            document.querySelectorAll('.clause-content.open').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('open');
                    const parentCard = openContent.parentElement;
                    parentCard.classList.remove('neumorphic-inset');
                    parentCard.classList.add('neumorphic-flat');
                    parentCard.querySelector('.transform').classList.remove('rotate-180');
                }
            });

            content.classList.toggle('open');
            arrow.classList.toggle('rotate-180');
            card.classList.toggle('neumorphic-flat');
            card.classList.toggle('neumorphic-inset');
        });
    }
    
    function setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    function setupSignatures() {
        const anthony = DATA.parties.find(p => p.id === '72808434');
        const anthonySignatureHTML = `
            <div class="text-center p-4" id="signature-anthony">
                <p class="font-cinzel text-lg ${anthony.houseColor}">${anthony.name}</p>
                <p class="text-sm text-[var(--text-color)]">FIRMA DIGITALMENTE VINCULADA</p>
                <p class="text-xs font-bold ${anthony.houseColor}">${anthony.house}</p>
                <p class="text-xs text-gray-500 mt-2">Sello mágico registrado: 25 de julio, 2025</p>
            </div>
        `;
        DOM.dynamicSignatureArea.innerHTML = anthonySignatureHTML;

        if (state.signatures[state.currentSigner.id]) {
            DOM.signButton.textContent = 'Pacto Sellado por ti';
            DOM.signButton.disabled = true;
            DOM.signButton.classList.add('neumorphic-pressed');
            DOM.signButton.classList.remove('active:neumorphic-pressed');
            DOM.downloadButton.classList.remove('hidden');
        }
    }

    function handleVerification() {
        const party = DATA.parties.find(p => p.id === DOM.magicIdInput.value);
        if (party) {
            state.currentSigner = party;
            sessionStorage.setItem('currentSignerId', party.id);
            DOM.verificationGate.style.opacity = '0';
            setTimeout(() => {
                DOM.verificationGate.classList.add('hidden');
                showGreeting();
            }, 500);
        } else {
            DOM.errorMessage.textContent = 'El encantamiento de acceso rechaza tu identificador. Solo las almas vinculadas pueden proceder.';
            DOM.errorContainer.style.opacity = '1';
            DOM.magicIdInput.value = '';
        }
    }

    function showGreeting() {
        const hour = new Date().getHours();
        let greeting;
        if (hour >= 5 && hour < 12) {
            greeting = "Buenos Días";
        } else if (hour >= 12 && hour < 20) {
            greeting = "Buenas Tardes";
        } else {
            greeting = "Buenas Noches";
        }

        DOM.greetingMessage.textContent = greeting;
        DOM.greetingName.textContent = state.currentSigner.name;
        DOM.greetingName.className = `mt-4 text-2xl md:text-4xl font-cinzel text-center ${state.currentSigner.houseColor}`;

        DOM.greetingScreen.classList.remove('hidden');
        setTimeout(() => {
            DOM.greetingScreen.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            DOM.greetingScreen.style.opacity = '0';
            setTimeout(() => {
                DOM.greetingScreen.classList.add('hidden');
                DOM.contractContent.classList.remove('hidden');
                setTimeout(() => DOM.contractContent.style.opacity = '1', 10);
                initializeContractView();
            }, 1000);
        }, 3000);
    }

    function handleSignContract() {
        if (!state.currentSigner || state.signatures[state.currentSigner.id]) return;

        const now = new Date();
        const timestamp = now.toISOString();
        state.signatures[state.currentSigner.id] = timestamp;
        sessionStorage.setItem('pactSignatures', JSON.stringify(state.signatures));

        const signatureHTML = `
            <div class="text-center transition-opacity duration-1000 opacity-0 p-4 mt-4 border-t border-dashed border-[var(--accent-gold)]" id="new-signature">
                <p class="font-cinzel text-lg ${state.currentSigner.houseColor}">${state.currentSigner.name}</p>
                <p class="text-sm text-[var(--text-color)]">FIRMA DIGITALMENTE VINCULADA</p>
                <p class="text-xs font-bold ${state.currentSigner.houseColor}">${state.currentSigner.house}</p>
                <p class="text-xs text-gray-500 mt-2">Sello mágico registrado a las: ${new Date(timestamp).toLocaleString('es-PE')}</p>
            </div>
        `;
        DOM.dynamicSignatureArea.innerHTML += signatureHTML;
        setTimeout(() => document.getElementById('new-signature').classList.remove('opacity-0'), 100);

        DOM.signButton.textContent = 'Pacto Sellado';
        DOM.signButton.disabled = true;
        DOM.signButton.classList.add('neumorphic-pressed');
        DOM.signButton.classList.remove('active:neumorphic-pressed');
        DOM.downloadButton.classList.remove('hidden');
    }
    
    async function handleDownloadPdf() {
        if (!state.jsPdfLoaded) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
            state.jsPdfLoaded = true;
        }
        generateAndDownloadPdf();
    }

    function generateAndDownloadPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        let y = 20;
        const margin = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const usableWidth = pageWidth - margin * 2;

        const addText = (text, options) => {
            const splitText = doc.splitTextToSize(text, usableWidth);
            if (y + splitText.length * (options.lineHeight || 5) > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
            }
            doc.text(splitText, options.x || margin, y, options.align ? { align: options.align } : {});
            y += splitText.length * (options.lineHeight || 5) + (options.spacing || 0);
        };

        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        addText('Pacto de Horcruxes Mutuos', { align: 'center', x: pageWidth / 2, spacing: 2 });
        doc.setFontSize(12);
        doc.setFont('times', 'italic');
        addText('Sellado con Juramento Inquebrantable', { align: 'center', x: pageWidth / 2, spacing: 15 });

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        addText('COMPARECEN', { spacing: 3 });
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        addText('DE UNA PARTE, el señor Anthony Junior Torres Lozano, de la Casa Slytherin, mayor de edad.', { lineHeight: 6, spacing: 2 });
        addText('Y DE OTRA PARTE, la señorita Lucila Mia Villalobos Yactayo, de la Casa Gryffindor, mayor de edad.', { lineHeight: 6, spacing: 10 });

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        addText('CLÁUSULAS', { spacing: 3 });
        DATA.clauses.forEach((clause, index) => {
            doc.setFontSize(12);
            doc.setFont('times', 'bold');
            addText(`${index + 1}. ${clause.title.toUpperCase()}`, { spacing: 2 });
            doc.setFont('times', 'normal');
            addText(clause.content, { spacing: 6 });
        });

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        addText('ANEXO A: RECUERDOS PRIMORDIALES', { spacing: 3 });
        doc.setFont('times', 'italic');
        doc.setFontSize(12);
        addText('"El recuerdo de la primera plática con la que empezó todo esto."', { align: 'center', x: pageWidth / 2, spacing: 4 });
        addText('"El recuerdo de la conversación en el mar al sonido de las olas."', { align: 'center', x: pageWidth / 2, spacing: 4 });
        addText('"El recuerdo del momento exacto en que se concibió la idea de este pacto."', { align: 'center', x: pageWidth / 2, spacing: 10 });

        addText('Y en prueba de conformidad, LAS PARTES VINCULANTES entrelazan sus manos y pronuncian su juramento ante un Testigo Mágico que sella el pacto con su varita, emitiendo las llamas que lo hacen inquebrantable.', { spacing: 15 });
        
        const signatures = [
            { id: '72808434', name: 'Anthony Junior Torres Lozano', role: 'PARTE VINCULANTE - Casa Slytherin', date: 'Sello mágico registrado: 25 de julio, 2025' },
            { id: '75391263', name: 'Lucila Mia Villalobos Yactayo', role: 'PARTE VINCULANTE - Casa Gryffindor' },
            { name: 'Maxi', role: 'SELLO DEL TESTIGO MÁGICO - *Guardiano della galassia*', date: 'Sello registrado: 25 de julio, 2025' }
        ];

        signatures.forEach(sig => {
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            addText(sig.name, { align: 'center', x: pageWidth / 2 });
            doc.setFont('times', 'normal');
            addText(sig.role, { align: 'center', x: pageWidth / 2, spacing: sig.date ? 0 : 10 });
            if (sig.date) {
                doc.setFontSize(8);
                addText(sig.date, { align: 'center', x: pageWidth / 2, spacing: 10 });
            }
            if (state.signatures[sig.id]) {
                 doc.setFontSize(8);
                 addText(`Sello mágico registrado a las: ${new Date(state.signatures[sig.id]).toLocaleString('es-PE')}`, { align: 'center', x: pageWidth / 2, spacing: 10 });
            }
        });

        doc.save('Pacto_de_Horcruxes_Mutuos.pdf');
    }

    function startCountdown() {
        setInterval(() => {
            const now = new Date();
            let nextRitual = new Date(now.getFullYear(), now.getMonth(), 25);
            if (now.getTime() > nextRitual.getTime()) {
                nextRitual.setMonth(nextRitual.getMonth() + 1);
            }
            const totalSeconds = (nextRitual - now) / 1000;
            const days = Math.max(0, Math.floor(totalSeconds / 3600 / 24));
            const hours = Math.max(0, Math.floor(totalSeconds / 3600) % 24);
            const minutes = Math.max(0, Math.floor(totalSeconds / 60) % 60);
            const seconds = Math.max(0, Math.floor(totalSeconds) % 60);

            DOM.countdown.days.textContent = String(days).padStart(2, '0');
            DOM.countdown.hours.textContent = String(hours).padStart(2, '0');
            DOM.countdown.minutes.textContent = String(minutes).padStart(2, '0');
            DOM.countdown.seconds.textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }

    function activateVengeanceMode() {
        document.body.classList.toggle('vengeance-mode');
    }

    function showSecurityPopup() {
        DOM.securityPopup.classList.remove('hidden');
    }

    function hideSecurityPopup() {
        DOM.securityPopup.classList.add('hidden');
    }

    function initializeContractView() {
        buildClauses();
        setupClauseInteraction();
        setupNavigation();
        setupSignatures();
        startCountdown();
    }

    function bindEventListeners() {
        DOM.verifyButton.addEventListener('click', handleVerification);
        DOM.magicIdInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') handleVerification(); });
        DOM.signButton.addEventListener('click', handleSignContract);
        DOM.downloadButton.addEventListener('click', handleDownloadPdf);
        DOM.vengeanceTrigger.addEventListener('click', activateVengeanceMode);
        DOM.closePopupButton.addEventListener('click', hideSecurityPopup);

        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            showSecurityPopup();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'F12') {
                e.preventDefault();
                showSecurityPopup();
            }
        });
    }
    
    function checkSession() {
        const storedSignerId = sessionStorage.getItem('currentSignerId');
        if (storedSignerId) {
            const party = DATA.parties.find(p => p.id === storedSignerId);
            if (party) {
                state.currentSigner = party;
                DOM.preloader.style.display = 'none';
                DOM.verificationGate.classList.add('hidden');
                DOM.contractContent.classList.remove('hidden');
                DOM.contractContent.style.opacity = '1';
                initializeContractView();
            } else {
                showVerificationFlow();
            }
        } else {
            showVerificationFlow();
        }
    }

    function showVerificationFlow() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                DOM.preloader.style.opacity = '0';
                DOM.verificationGate.style.opacity = '1';
                setTimeout(() => {
                    DOM.preloader.style.display = 'none';
                }, 1000); 
            }, 4000); 
        });
    }

    bindEventListeners();
    checkSession();
});
