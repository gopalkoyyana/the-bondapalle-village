// Language Management
let currentLanguage = 'te'; // 'te' for Telugu, 'en' for English

// List of 33 villages under Bondapalle Mandal
const villages = [
    { num: 1, te: "అంబటివలస", en: "Ambativalasa" },
    { num: 2, te: "అయ్యన్న అగ్రహారం", en: "Ayyanna Agraharam" },
    { num: 3, te: "బిల్లాలవలస", en: "Billalavalasa" },
    { num: 4, te: "బొండపల్లి", en: "Bondapalle" },
    { num: 5, te: "బుదతానపల్లి రాజేరు", en: "Budatanapalle Rajeru" },
    { num: 6, te: "చామలవలస", en: "Chamalavalasa" },
    { num: 7, te: "చింతమారపల్లి", en: "Chintamarapalle" },
    { num: 8, te: "దేవుపల్లి", en: "Devupalle" },
    { num: 9, te: "గరుడబిల్లి", en: "Garudabilli" },
    { num: 10, te: "గిట్టుపల్లి", en: "Gittupalle" },
    { num: 11, te: "గొట్లాం", en: "Gotlam" },
    { num: 12, te: "గ్రహపతి అగ్రహారం", en: "Grahapati Agraharam" },
    { num: 13, te: "గుమడం", en: "Gumadam" },
    { num: 14, te: "ఇనుగంటివెంకన్న అగ్రహారం", en: "Inugantivenkanna Agraharam" },
    { num: 15, te: "జియ్యన్నవలస", en: "Jiyyannavalasa" },
    { num: 16, te: "కణిమెరక", en: "Kanimeraka" },
    { num: 17, te: "కేరటం", en: "Keratam" },
    { num: 18, te: "కిందం అగ్రహారం", en: "Kindam Agraharam" },
    { num: 19, te: "కొండకిందం", en: "Kondakindam" },
    { num: 20, te: "కొత్తపాలెం", en: "Kothapalem" },
    { num: 21, te: "కుమ్మరిగంట అగ్రహారం (ముత్యాలమ్మపేట)", en: "Kummarigunta Agraharam (Mutyalammapeta)" },
    { num: 22, te: "మరువాడ", en: "Maruvada" },
    { num: 23, te: "మరువాడ కొత్తవలస", en: "Maruvada Kothavalasa" },
    { num: 24, te: "ముద్దురు", en: "Mudduru" },
    { num: 25, te: "మూలపాడు కర్రివానిపాలెం", en: "Mulapadu Karrivanipalem" },
    { num: 26, te: "నెలివాడ", en: "Nelivada" },
    { num: 27, te: "ఓంపిల్లి", en: "Ompilli" },
    { num: 28, te: "రాచకిందం", en: "Rachakindam" },
    { num: 29, te: "రాయీంద్రం", en: "Rayindram" },
    { num: 30, te: "రొల్లవాక", en: "Rollavaka" },
    { num: 31, te: "టమాటడ", en: "Tamatada" },
    { num: 32, te: "వెదురువాడ", en: "Veduruvada" },
    { num: 33, te: "వేండ్రం", en: "Vendram" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initial renders
    renderVillages(villages);
    updateInterfaceLanguage();

    // Check theme preferences
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
});

// Render the villages in the grid list
function renderVillages(list) {
    const grid = document.getElementById("villages-grid");
    grid.innerHTML = "";

    if (list.length === 0) {
        const noResults = document.createElement("div");
        noResults.style.gridColumn = "1 / -1";
        noResults.style.textAlign = "center";
        noResults.style.padding = "2rem";
        noResults.style.color = "var(--text-secondary)";
        noResults.setAttribute("data-te", "ఫలితాలు లేవు");
        noResults.setAttribute("data-en", "No matching villages found");
        noResults.innerText = currentLanguage === 'te' ? "ఫలితాలు లేవు" : "No matching villages found";
        grid.appendChild(noResults);
        return;
    }

    list.forEach(v => {
        const item = document.createElement("div");
        item.className = "hamlet-item";
        
        const numCircle = document.createElement("span");
        numCircle.className = "hamlet-num";
        numCircle.innerText = v.num;

        const nameSpan = document.createElement("span");
        nameSpan.style.fontWeight = "600";
        nameSpan.innerText = currentLanguage === 'te' ? v.te : v.en;

        item.appendChild(numCircle);
        item.appendChild(nameSpan);
        grid.appendChild(item);
    });
}

// Language toggle function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'te' ? 'en' : 'te';
    
    // Update button text
    const langBtn = document.getElementById("lang-toggle");
    langBtn.innerText = currentLanguage === 'te' ? 'English' : 'తెలుగు';

    updateInterfaceLanguage();
    
    // Re-render villages with the new language
    filterVillages();
}

// Update DOM elements that contain bilingual translations
function updateInterfaceLanguage() {
    // Update document HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update logo text and subtitle
    const logoText = document.getElementById("nav-logo-text");
    const logoSubtitle = document.getElementById("nav-subtitle-text");
    if (logoText) {
        if (window.location.pathname.includes("schools.html")) {
            logoText.innerHTML = currentLanguage === 'te' 
                ? `<i class="fa-solid fa-graduation-cap"></i> బొండపల్లి విద్యాసంస్థలు` 
                : `<i class="fa-solid fa-graduation-cap"></i> Bondapalle Educational Institutions`;
        } else if (window.location.pathname.includes("phc.html")) {
            logoText.innerHTML = currentLanguage === 'te' 
                ? `<i class="fa-solid fa-hospital"></i> బొండపల్లి ప్రాథమిక ఆరోగ్య కేంద్రం` 
                : `<i class="fa-solid fa-hospital"></i> PHC Bondapalle`;
        } else {
            logoText.innerHTML = currentLanguage === 'te' 
                ? `<i class="fa-solid fa-gopuram"></i> బొండపల్లి` 
                : `<i class="fa-solid fa-gopuram"></i> Bondapalle`;
        }
    }
    if (logoSubtitle) {
        if (window.location.pathname.includes("phc.html")) {
            logoSubtitle.innerText = currentLanguage === 'te' 
                ? "వైద్య మరియు కుటుంబ సంక్షేమ శాఖ, విజయనగరం జిల్లా" 
                : "Dept of Health & Family Welfare, Vizianagaram District";
        } else {
            logoSubtitle.innerText = currentLanguage === 'te' ? "విజయనగరం జిల్లా, ఆంధ్రప్రదేశ్" : "Vizianagaram District, Andhra Pradesh";
        }
    }

    // Translate regular nodes with data-te / data-en attributes
    const elements = document.querySelectorAll("[data-te][data-en]");
    elements.forEach(el => {
        if (currentLanguage === 'te') {
            el.innerText = el.getAttribute("data-te");
        } else {
            el.innerText = el.getAttribute("data-en");
        }
    });

    // Update search bar placeholder
    const searchInput = document.getElementById("village-search");
    if (searchInput) {
        if (currentLanguage === 'te') {
            searchInput.placeholder = "గ్రామం పేరుతో వెతకండి...";
        } else {
            searchInput.placeholder = "Search village name...";
        }
    }
}

// Filter the village list based on search query
function filterVillages() {
    const query = document.getElementById("village-search").value.toLowerCase().trim();
    
    const filtered = villages.filter(v => {
        return v.te.toLowerCase().includes(query) || v.en.toLowerCase().includes(query);
    });

    renderVillages(filtered);
}

// Theme management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector("#theme-toggle i");
    if (theme === "dark") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

// Add scroll-triggered active nav link indication
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section.section");
    const navLinks = document.querySelectorAll("nav a");
    
    let currentId = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            currentId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        }
    });
});

// Modal Management for Schools & Colleges
function openSchoolsModal() {
    const modal = document.getElementById("schools-modal");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeSchoolsModal() {
    const modal = document.getElementById("schools-modal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// Modal Management for Primary Health Centre (PHC)
function openPhcModal() {
    const modal = document.getElementById("phc-modal");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closePhcModal() {
    const modal = document.getElementById("phc-modal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// Close modals on backdrop click or ESC
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal-backdrop").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-backdrop.active").forEach(modal => {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            });
        }
    });
});

// Filter schools in standalone schools page if search input exists
function filterSchools() {
    const searchInput = document.getElementById("school-search");
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    const schoolItems = document.querySelectorAll(".school-item");

    schoolItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        if (text.includes(query)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

