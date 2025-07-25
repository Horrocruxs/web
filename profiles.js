(function () {
    const DOM = {
        profilesContainer: document.getElementById('profiles-container')
    };

    const DATA = {
        parties: [
            { id: '72808434', name: 'Anthony J. Torres Lozano', house: 'Slytherin', houseColor: 'text-[var(--slytherin-green)]', dob: '2001-05-20', spell: 'Avada Kedavra', patronus: 'Ciervo', wand: 'Madera de tejo, núcleo de fibra de corazón de dragón, 32 cm, inflexible', color: 'Negro', dessert: 'Pie de Manzana', hobby: 'Tocar la guitarra' },
            { id: '75391263', name: 'Lucila M. Villalobos Yactayo', house: 'Gryffindor', houseColor: 'text-[var(--gryffindor-red)]', dob: '1999-08-25', spell: 'Expecto Patronum', patronus: 'Nutria', wand: 'Madera de vid, núcleo de pelo de unicornio, 27 cm, flexible', color: 'Lila', dessert: 'Milkshake de Chocolate', hobby: 'Escuchar música' }
        ]
    };

    const state = {
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

    function createProfileCardHTML(party) {
        const signatureInfo = state.signatures[party.id]
            ? `<div class="mt-4 pt-4 border-t border-dashed border-[var(--accent-gold)]">
                 <p class="font-cinzel text-sm text-[var(--accent-gold)]">Pacto Firmado</p>
                 <p class="text-xs text-gray-500">${new Date(state.signatures[party.id]).toLocaleString('es-PE')}</p>
               </div>`
            : '';

        return `
            <div class="neumorphic-flat p-8">
                <h3 class="text-2xl font-cinzel ${party.houseColor} mb-6">${party.name}</h3>
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
                    ${signatureInfo}
                </div>
            </div>
        `;
    }

    function renderProfileCards() {
        DOM.profilesContainer.innerHTML = DATA.parties.map(createProfileCardHTML).join('');
    }

    function initialize() {
        const storedSignerId = sessionStorage.getItem('currentSignerId');
        if (!storedSignerId) {
            window.location.href = 'index.html';
        } else {
            renderProfileCards();
        }
    }

    initialize();
})();
