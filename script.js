document.addEventListener('DOMContentLoaded', function () {
    const DOM = {
        preloader: document.getElementById('preloader'),
        verificationGate: document.getElementById('verification-gate'),
        magicIdInput: document.getElementById('magic-id'),
        verifyButton: document.getElementById('verify-button'),
        errorContainer: document.getElementById('error-container'),
        errorMessage: document.getElementById('error-message'),
        mainContent: document.getElementById('main-content'),
        profilesContainer: document.getElementById('profiles-container'),
        greetingScreen: document.getElementById('greeting-screen'),
        greetingMessage: document.getElementById('greeting-message'),
        greetingName: document.getElementById('greeting-name'),
    };

    const DATA = {
        parties: [
            { id: '72808434', name: 'Anthony J. Torres Lozano', house: 'Slytherin', houseColor: 'text-[var(--slytherin-green)]', dob: '2001-05-20', spell: 'Avada Kedavra', patronus: 'Ciervo', wand: 'Madera de tejo, núcleo de fibra de corazón de dragón, 32 cm, inflexible', color: 'Negro', dessert: 'Pie de Manzana', hobby: 'Tocar la guitarra' },
            { id: '75391263', name: 'Lucila M. Villalobos Yactayo', house: 'Gryffindor', houseColor: 'text-[var(--gryffindor-red)]', dob: '1999-08-25', spell: 'Expecto Patronum', patronus: 'Nutria', wand: 'Madera de vid, núcleo de pelo de unicornio, 27 cm, flexible', color: 'Lila', dessert: 'Milkshake de Chocolate', hobby: 'Escuchar música' }
        ]
    };

    let state = {
        currentSigner: null,
        signatures: JSON.parse(sessionStorage.getItem('pactSignatures')) || {}
    };

    function calculateAge(dobString) {
        const dob = new Date(dobString.replace(/-/g, '/'));
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    function buildProfileCard(party) {
        const signatureInfo = state.signatures[party.id] 
            ? `<div class="mt-4 pt-4 border-t border-dashed border-[var(--accent-gold)]">
                 <p class="font-cinzel text-sm text-[var(--accent-gold)]">Pacto Firmado</p>
                 <p class="text-xs text-gray-500">${new Date(state.signatures[party.id]).toLocaleString('es-PE')}</p>
               </div>` 
            : '<div class="mt-4 pt-4 border-t border-dashed border-[var(--dark-shadow)]"><p class="font-cinzel text-sm text-gray-500">Pendiente de Firma</p></div>';

        const card = document.createElement('div');
        card.className = 'neumorphic-flat p-8 max-w-lg w-full';
        card.innerHTML = `
            <h3 class="text-2xl font-cinzel ${party.houseColor} mb-6 text-center">${party.name}</h3>
            <div class="space-y-4 text-left">
                <p><strong>${party.house === 'Slytherin' ? '🐍' : '🦁'} Casa:</strong> ${party.house}</p>
                <p><strong>🎂 Cumpleaños:</strong> ${new Date(party.dob.replace(/-/g, '/')).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <h4 class="font-cinzel pt-4 border-t border-dashed border-[var(--dark-shadow)]">Mundo Mágico</h4>
                <p><strong>🪄 Hechizo Favorito:</strong> ${party.spell}</p>
                <p><strong>🦌 Patronus:</strong> ${party.patronus}</p>
                <p><strong>🌿 Varita:</strong> ${party.wand}</p>
                <h4 class="font-cinzel pt-4 border-t border-dashed border-[var(--dark-shadow)]">Mundo Muggle</h4>
                <p><strong>🎨 Color Favorito:</strong> ${party.color}</p>
                <p><strong>🍰 Postre Favorito:</strong> ${party.dessert}</p>
                <p><strong>🎮 Hobby:</strong> ${party.hobby}</p>
            </div>
            <div class="text-center mt-4 pt-4 border-t border-dashed border-[var(--dark-shadow)]">
                <h4 class="font-cinzel mb-4">Hechizos Vinculantes</h4>
                <a href="horcruxes.html" class="neumorphic-flat text-white py-2 px-6 font-cinzel text-sm bg-[var(--accent-gold)] active:neumorphic-pressed inline-block">Pacto de Horcruxes Mutuos</a>
                ${signatureInfo}
            </div>
        `;
        DOM.profilesContainer.appendChild(card);
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
                DOM.mainContent.classList.remove('hidden');
                setTimeout(() => DOM.mainContent.style.opacity = '1', 10);
                buildProfileCard(state.currentSigner);
            }, 1000);
        }, 3000);
    }

    function checkSession() {
        const storedSignerId = sessionStorage.getItem('currentSignerId');
        if (storedSignerId) {
            const party = DATA.parties.find(p => p.id === storedSignerId);
            if (party) {
                state.currentSigner = party;
                DOM.preloader.style.display = 'none';
                DOM.verificationGate.classList.add('hidden');
                DOM.mainContent.classList.remove('hidden');
                DOM.mainContent.style.opacity = '1';
                buildProfileCard(state.currentSigner);
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

    DOM.verifyButton.addEventListener('click', handleVerification);
    DOM.magicIdInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') handleVerification(); });

    checkSession();
});
