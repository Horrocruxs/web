document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const verificationGate = document.getElementById('verification-gate');
    const contractContent = document.getElementById('contract-content');
    const magicIdInput = document.getElementById('magic-id');
    const verifyButton = document.getElementById('verify-button');
    const errorMessage = document.getElementById('error-message');
    const signButton = document.getElementById('sign-button');
    const downloadButton = document.getElementById('download-button');
    const dynamicSignatureArea = document.getElementById('dynamic-signature-area');
    const vengeanceTrigger = document.getElementById('vengeance-trigger');

    const parties = [
        { id: '72808434', name: 'Anthony Junior Torres Lozano', house: 'Casa Slytherin', houseColor: 'text-[var(--slytherin-green)]' },
        { id: '75391263', name: 'Lucila Mia Villalobos Yactayo', house: 'Casa Gryffindor', houseColor: 'text-[var(--gryffindor-red)]' }
    ];
    let currentSigner = null;
    let jsPdfLoaded = false;

    const clauses = [
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
    ];

    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => callback();
        document.head.appendChild(script);
    }

    function initializeContractView() {
        const container = document.getElementById('clauses-container');
        container.innerHTML = '';
        clauses.forEach(clause => {
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
            
            container.appendChild(card);

            card.addEventListener('click', (e) => {
                const content = card.querySelector('.clause-content');
                const arrow = card.querySelector('.transform');
                const isOpen = content.classList.contains('open');

                document.querySelectorAll('.clause-content.open').forEach(openContent => {
                    openContent.classList.remove('open');
                    openContent.parentElement.classList.remove('neumorphic-inset');
                    openContent.parentElement.classList.add('neumorphic-flat');
                    openContent.parentElement.querySelector('.transform').classList.remove('rotate-180');
                });

                if (!isOpen) {
                    content.classList.add('open');
                    arrow.classList.add('rotate-180');
                    card.classList.remove('neumorphic-flat');
                    card.classList.add('neumorphic-inset');
                }
            });
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        setupSignatures();
        startCountdown();
    }
    
    function setupSignatures() {
        const anthony = parties.find(p => p.id === '72808434');
        const anthonySignatureHTML = `
            <div class="text-center p-4" id="signature-anthony">
                <p class="font-cinzel text-lg ${anthony.houseColor}">${anthony.name}</p>
                <p class="text-sm text-[var(--text-color)]">FIRMA DIGITALMENTE VINCULADA</p>
                <p class="text-xs font-bold ${anthony.houseColor}">${anthony.house}</p>
                <p class="text-xs text-gray-500 mt-2">Sello mágico registrado: 25 de julio, 2025</p>
            </div>
        `;
        dynamicSignatureArea.innerHTML = anthonySignatureHTML;

        if (currentSigner.id === anthony.id) {
            signButton.textContent = 'Pacto Sellado por ti';
            signButton.disabled = true;
            signButton.classList.add('neumorphic-pressed');
            signButton.classList.remove('active:neumorphic-pressed');
            downloadButton.classList.remove('hidden');
        }
    }

    function handleVerification() {
        const enteredId = magicIdInput.value;
        const party = parties.find(p => p.id === enteredId);

        if (party) {
            currentSigner = party;
            verificationGate.style.transition = 'opacity 0.5s ease-out';
            verificationGate.style.opacity = '0';
            setTimeout(() => {
                verificationGate.classList.add('hidden');
                contractContent.classList.remove('hidden');
                setTimeout(() => {
                    contractContent.style.opacity = '1';
                }, 10);
            }, 500);
            initializeContractView();
        } else {
            errorMessage.textContent = 'Identificador Mágico no reconocido. Acceso denegado.';
            magicIdInput.value = '';
        }
    }

    function handleSignContract() {
        if (!currentSigner || currentSigner.id === '72808434') return;

        const now = new Date();
        const timestamp = now.toLocaleString('es-PE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Lima'
        });

        const signatureHTML = `
            <div class="text-center transition-opacity duration-1000 opacity-0 p-4 mt-4 border-t border-dashed border-[var(--accent-gold)]" id="new-signature">
                <p class="font-cinzel text-lg ${currentSigner.houseColor}">${currentSigner.name}</p>
                <p class="text-sm text-[var(--text-color)]">FIRMA DIGITALMENTE VINCULADA</p>
                <p class="text-xs font-bold ${currentSigner.houseColor}">${currentSigner.house}</p>
                <p class="text-xs text-gray-500 mt-2">Sello mágico registrado a las: ${timestamp}</p>
            </div>
        `;
        
        dynamicSignatureArea.innerHTML += signatureHTML;
        
        setTimeout(() => {
            document.getElementById('new-signature').classList.remove('opacity-0');
        }, 100);

        signButton.textContent = 'Pacto Sellado';
        signButton.disabled = true;
        signButton.classList.add('neumorphic-pressed');
        signButton.classList.remove('active:neumorphic-pressed');

        downloadButton.classList.remove('hidden');
    }
    
    function generateAndDownloadPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

        let y = 20;
        const margin = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const usableWidth = pageWidth - (margin * 2);

        function checkPageBreak(requiredHeight) {
            if (y + requiredHeight > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
            }
        }
        
        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        doc.text('Pacto de Horcruxes Mutuos', pageWidth / 2, y, { align: 'center' });
        y += 7;
        doc.setFontSize(12);
        doc.setFont('times', 'italic');
        doc.text('Sellado con Juramento Inquebrantable', pageWidth / 2, y, { align: 'center' });
        y += 15;

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text('COMPARECEN', margin, y);
        y += 8;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        const partiesText = [
            'DE UNA PARTE, el señor Anthony Junior Torres Lozano, de la Casa Slytherin, mayor de edad.',
            'Y DE OTRA PARTE, la señorita Lucila Mia Villalobos Yactayo, de la Casa Gryffindor, mayor de edad.'
        ];
        partiesText.forEach(line => {
            const splitText = doc.splitTextToSize(line, usableWidth);
            checkPageBreak(splitText.length * 6);
            doc.text(splitText, margin, y);
            y += splitText.length * 6;
        });
        y += 10;

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text('CLÁUSULAS', margin, y);
        y += 8;

        clauses.forEach((clause, index) => {
            doc.setFontSize(12);
            doc.setFont('times', 'bold');
            const title = `${index + 1}. ${clause.title.toUpperCase()}`;
            const splitTitle = doc.splitTextToSize(title, usableWidth);
            checkPageBreak(splitTitle.length * 5 + 8);
            doc.text(splitTitle, margin, y);
            y += splitTitle.length * 5 + 2;

            doc.setFont('times', 'normal');
            const content = doc.splitTextToSize(clause.content, usableWidth);
            checkPageBreak(content.length * 5);
            doc.text(content, margin, y);
            y += content.length * 5 + 6;
        });

        checkPageBreak(20);
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text('ANEXO A: RECUERDOS PRIMORDIALES', margin, y);
        y+= 8;
        doc.setFont('times', 'italic');
        doc.setFontSize(12);
        const memories = [
            '"El recuerdo de la primera plática con la que empezó todo esto."',
            '"El recuerdo de la conversación en el mar al sonido de las olas."',
            '"El recuerdo del momento exacto en que se concibió la idea de este pacto."'
        ];
        memories.forEach(memory => {
            const splitMemory = doc.splitTextToSize(memory, usableWidth);
            checkPageBreak(splitMemory.length * 5);
            doc.text(splitMemory, margin, y, {align: 'center'});
            y += splitMemory.length * 5 + 4;
        });
        y += 10;

        checkPageBreak(80);
        const finalWords = 'Y en prueba de conformidad, LAS PARTES VINCULANTES entrelazan sus manos y pronuncian su juramento ante un Testigo Mágico que sella el pacto con su varita, emitiendo las llamas que lo hacen inquebrantable.';
        const splitFinalWords = doc.splitTextToSize(finalWords, usableWidth);
        doc.text(splitFinalWords, margin, y);
        y += splitFinalWords.length * 5 + 15;
        
        const signatureAnthony = parties.find(p => p.id === '72808434');
        doc.setFont('times', 'bold');
        doc.text(signatureAnthony.name, pageWidth / 2, y, { align: 'center' });
        y += 5;
        doc.setFont('times', 'normal');
        doc.text(`PARTE VINCULANTE - ${signatureAnthony.house}`, pageWidth / 2, y, { align: 'center' });
        y += 5;
        doc.setFontSize(8);
        doc.text('Sello mágico registrado: 25 de julio, 2025', pageWidth / 2, y, { align: 'center' });
        y += 10;

        const signatureLucila = parties.find(p => p.id === '75391263');
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text(signatureLucila.name, pageWidth / 2, y, { align: 'center' });
        y += 5;
        doc.setFont('times', 'normal');
        doc.text(`PARTE VINCULANTE - ${signatureLucila.house}`, pageWidth / 2, y, { align: 'center' });
        y += 10;
        
        doc.setFont('times', 'bold');
        doc.text('Maxi', pageWidth / 2, y, { align: 'center' });
        y += 5;
        doc.setFont('times', 'normal');
        doc.text('SELLO DEL TESTIGO MÁGICO - *Guardiano della galassia*', pageWidth / 2, y, { align: 'center' });
        y += 5;
        doc.setFontSize(8);
        doc.text('Sello registrado: 25 de julio, 2025', pageWidth / 2, y, { align: 'center' });
        y += 10;

        const lucilaSignatureElement = document.getElementById('new-signature');
        if (lucilaSignatureElement) {
            checkPageBreak(20);
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            doc.text(currentSigner.name, pageWidth / 2, y, { align: 'center' });
            y += 5;
            doc.setFont('times', 'normal');
            doc.text('FIRMA DIGITALMENTE VINCULADA', pageWidth / 2, y, { align: 'center' });
            y += 5;
            doc.text(currentSigner.house, pageWidth / 2, y, { align: 'center' });
            y += 5;
            const timestampText = lucilaSignatureElement.querySelector('p:last-child').textContent;
            doc.setFontSize(8);
            doc.text(timestampText, pageWidth / 2, y, { align: 'center' });
        }

        doc.save('Pacto_de_Horcruxes_Mutuos.pdf');
    }

    function handleDownloadPdf() {
        if (jsPdfLoaded) {
            generateAndDownloadPdf();
        } else {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => {
                jsPdfLoaded = true;
                generateAndDownloadPdf();
            });
        }
    }

    function startCountdown() {
        const countdownDisplay = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

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

            countdownDisplay.days.textContent = String(days).padStart(2, '0');
            countdownDisplay.hours.textContent = String(hours).padStart(2, '0');
            countdownDisplay.minutes.textContent = String(minutes).padStart(2, '0');
            countdownDisplay.seconds.textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }

    function activateVengeanceMode() {
        document.body.classList.toggle('vengeance-mode');
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            verificationGate.style.opacity = '1';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000); 
        }, 4000); 
    });

    verifyButton.addEventListener('click', handleVerification);
    magicIdInput.addEventListener('keypress', function(event) { if (event.key === 'Enter') handleVerification(); });
    signButton.addEventListener('click', handleSignContract);
    downloadButton.addEventListener('click', handleDownloadPdf);
    vengeanceTrigger.addEventListener('click', activateVengeanceMode);

});
