// ===== POEMS DATA =====
const poems = [
    {
        title: "Flicker Within",
        preview: "The light in his eyes once shimmered like dawn...",
        body: "The light in his eyes once shimmered like dawn,\nA pure, burning glow that could carry the stars on.\n\nBut the world, with its weight, slowly drew in so near,\nCasting shadows where brilliance had once been so clear.\n\nHe danced with the time, in a rhythm of grace,\nBut somewhere, somehow, he lost his own place.\nThe world whispered doubts, fed him fears through the years,\nTill the light in his eyes disappeared with his tears.\n\nYet in the quiet, a flicker remains,\nA strong, living spark that survives all the rains.\nFor though the world took his light far away,\nIt still lingers deep within, awaiting the day.",
        category: "Reflection",
        date: "2024-09-08",
        emotion: "depressed"
    },

    {
        title: "Moonlit Dreams", 
        preview: "Under the moon's soft, silver gleam...",
        body: "Under the moon's soft, silver gleam,\nA world awakens in a quiet dream.\nI find myself in shadows deep,\nWhere secrets of the soul I keep.\n\nThe moon, a keeper of the old,\nWhispers tales that are untold.\nAnd in its tender, hallowed light,\nA new tomorrow dawns from night.",
        category: "Dreams", 
        date: "2024-10-10", 
        emotion: "dreams"
    },
    {
        title: "Khwaabon Ka Intezaar",
        preview: "Intezaar ke har lamhon mein usse paane ki ummeed hai...",
        body: "Intezaar ke har lamhon mein\nusse paane ki ummeed hai\nKhwaabon ka jaadoo usi pe chale\njo dil ke kareeb hai\n\nPaas ho kar bhi sach keh na sakein,\nAb yaadon mein yeh khwaab adhura sa lagne lage hain\nChahat aisi ki khwaabon mein uske saath rahein,\nPar khud pe aitbaar na tha, isliye hum khamosh rahe\n\nKehte hain khwaabon mein sochi hui baatein sach ho jaati hain,\nPar meri neendon ne un jhalakon ko kabhi mehsoos na kiya,\nRaat bhar teri tasveer aankhon tale\nhalki si parchhaayi chhod jaati hai,\nAur subah ki pehli kiran bhi\nbas nami ke saath khamosh ho jaati hai",
        category: "Love", 
        date: "2025-05-01", 
        emotion: "love"
    },
    {
        title: "Uski Parchhayi",
        preview: "Shaam dhalti thi uske naam pe, raatein uski baaton mein rehti...",
        body: "Shaam dhalti thi uske naam pe, raatein uski baaton mein rehti,\nChand bhi poochhta tha aksar, kiski kami thi jo aankhon mein nami rehti.\n\nZindagi chalte chalte kahin uske raaste pe ruk gayi thi,\nAur hum… har khushi mein uski parchhayi dhoondte chalte the.",
        category: "Longing", 
        date: "2025-06-11", 
        emotion: "nature"
    },
    {
        title: "Chhupi Hui Udaan",
        preview: "Kabhi Khwaabon mein jeeta, toh kabhi canvas rangin tha...",
        body: "Kabhi Khwaabon mein jeeta, toh kabhi canvas rangin tha,\nKuch alfaazon mein chhupi thi duniya, kuch sketch lines mein mann talleen tha.\nPadhne ka junoon tha, likhne ki aadat thi,\nUski muskurahat mein bhi kabhi apni chahat thi.\n\nLekin ab toh sab dhundhla sa lagta hai,\nDil ke kone mein bacha hua junoon bhi chhupa rehta hai.\nKabhi socha tha marks badhenge, log pehchaanenge kaam,\nPar na number badhe, na naam ...lagta hai, bekhaar gaye saare armaan.\n\nUmar toh keh rahi....\"abhi toh waqt hai udne ka,\"\nPar hausla kahin gira pada hai, khud se hi chhupa pada.",
        category: "Reflective",
        date: "2025-06-17",
        emotion: "depressed"
    },
    {
        title: "Maybe That Means Something",
        preview: "I used to smile like everything was fine....",
        body: "I used to smile like everything was fine....\nToo easy, like a coin flipped heads so often it forgot tails.\nWas that strength?\nSurvival?\nProbably both.\nProbably neither.\n\nI was the kid who stayed up late....\nNot for grades, not just for tests,\nBut because silence felt safer than sleep:\nThe hum of a fan, the glow of a screen,\nLines of code like small loyalties....\nI’d tweak, I’d tinker,\nNot to build the world, just to steady my hands.\n\nI made art in secret....\nSketches in the margins... whole lives in pencil.\nDrawing was breathing when the world got loud.\nAnd anime...\nWasn’t just comfort, it was recognition:\nUnderdogs who scarred and still stood,\nDreamers who bled and kept going,\nStories that said pain could mean something,\nThat love could be seen.\n\nI wasn’t special. Just quiet....\nQuiet can be loud in its own way.\nI had a little light, a private map,\nA version of me that still believed.\n\nThen came the decision:\nPCMB.... a stream on paper, a river I couldn’t hold,\nCurrents pulling, twisting, carving paths I didn’t know.\n\nI told myself I could carry it....\nPressure pooled like ink in veins,\nThick, slow, unstoppable,\nSeeping into every corner of me,\nWhispering the same small verdict: you’re not enough.\n\nEveryone else read numbers. Percentages. Proof.\nThey called it worth.... and walked away.\nNo one asked why my smile stopped reaching my eyes.\nIf someone had asked, I wouldn’t have known the words anyway.\n\nStopping felt like failure....\nFailure felt like erasing what little I had left.\nSo I kept going.... hollow and obedient.\n\nThen she came....\nShe didn’t know she was a soft war.\nSat beside me.... calm, warm, like a lullaby in a room of alarms.\nI didn’t want anything.\nJust proximity....\nJust presence....\nJust to exist in her orbit.\n\nI studied harder.... just to explain better,\nBecause when she said “thank you,”\nIt wasn’t small.... it was a lighthouse in my chest.\n\nShe didn’t save me.... she reminded me I could be seen.\nThat was enough to pull me back, for a moment.\n\nThen everything cracked.... The system shifted.\nPressure turned petty.... competition into cruelty.\nI poured time, mind, sleep, into the well.\nI broke things no one will ever see.\nAnd for what?\n\nI didn’t qualify....\nDidn’t pass the gate....\nDidn’t matter.\n\nShe kept moving.... bright, steady.... a star I could name but never touch.\nAnd I stayed.... behind.... in ink and in spirit.\nThe boy who painted in color now scrolls in grayscale.\nMy sketchbook.... once a universe.... gathers dust.\nI can’t finish an episode.... I watch winners and it hurts,\nBecause every victory is a mirror that says: not you.\n\nNow I float through days I don’t own....\nHours I can’t remember buying.\nI don’t live.... I pass time, like a ghost with a schedule.\nSilence isn’t quiet.... it’s a chorus that fills my chest,\nSays I’ve already lost.... maybe I was never enough.\n\nRegret is a shadow that learned to follow my footsteps....\nI should’ve spoken.... I should’ve guarded that smaller boy,\nThe one who felt too much and still chose to care.\n\nMirror me now.... hollow eyes, a candle burned low.\nOnce they burned.... now they only flicker.\nNo one’s coming to rescue me.... Not her, not a rewind, not a miracle.\nIt’s on me.... always was.... and that doesn’t make it easier.\n\nKnowing the load doesn’t lift it....\nWanting to rise doesn’t move tired legs....\nHope is heavy when hands can’t hold it....\nMemories coil like vines around my ribs....\nHer smile, the exams, the almosts, the what-ifs....\nThey tighten with every breath.\n\nAnd I keep asking.... quietly.... the same hard questions:\nCan I come back?\nCan I be enough again?\nCan I rebuild from this ruin?\nCan I forgive myself?\nDo I even want to?\n\nI don’t know.... Not yet.\nBut I am still here....\nAnd maybe.... maybe that means something.",
        category: "Reflective",
        date: "2025-08-05",
        emotion: "depressed"
    },
    {
        title: "Whispers of Autumn",
        preview: "The air grows crisp, the sun turns gold...",
        body: "The air grows crisp, the sun turns gold,\nA final story, softly told.\nEach leaf, a memory, breaks its hold,\nAnd whispers truths from seasons old.\nWe watch them fall, a silent cast,\nBelieving nothing beautiful can last.\n\nYet deep within this gentle fall,\nA different truth begins to call.\nThe quiet hope of what's to be,\nA lesson in mortality.\nFor spring awaits to set things right,\nAnd bring our spirits back to light.",
        category: "Nature", 
        date: "2025-08-21", 
        emotion: "nature"
    }
];

// ===== GLOBAL VARIABLES =====
let currentTheme = 'light';

// ===== THEME FUNCTIONS =====

/**
 * Theme initialize karta hai based on currentTheme
 */
function initializeTheme() {
    document.body.setAttribute('data-theme', currentTheme);
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

/**
 * Light/dark theme toggle karta hai
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// ===== FLOATING ELEMENTS FUNCTIONS =====

/**
 * Modal ke liye floating elements create karta hai based on emotion type
 * @param {string} emotion - Emotion type (love, depressed, motivation, etc.)
 */
function createAdvancedFloatingElements(emotion) {
    const themeElements = document.getElementById('themeElements');
    themeElements.innerHTML = '';

    // Different emotions ke liye different number of elements
    const particleCount = emotion === 'motivation' ? 12 : emotion === 'love' ? 15 : emotion === 'happiness' ? 10 : 8;
    const noteCount = emotion === 'happiness' ? 6 : emotion === 'dreams' ? 5 : 4;
    const geometricCount = emotion === 'motivation' ? 5 : 3;

    // Floating particles create karna
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 95 + '%';
        particle.style.top = Math.random() * 90 + '%';
        particle.style.width = Math.random() * 8 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = Math.random() * 10 + 15 + 's';
        themeElements.appendChild(particle);
    }

    // Floating notes create karna
    for (let i = 0; i < noteCount; i++) {
        const note = document.createElement('div');
        note.className = 'floating-note';
        note.style.left = Math.random() * 90 + '%';
        note.style.top = Math.random() * 85 + '%';
        note.style.animationDelay = Math.random() * 18 + 's';
        note.style.animationDuration = Math.random() * 12 + 18 + 's';
        themeElements.appendChild(note);
    }

    // Floating geometric shapes create karna
    for (let i = 0; i < geometricCount; i++) {
        const geometric = document.createElement('div');
        geometric.className = 'floating-geometric';
        geometric.style.left = Math.random() * 100 + '%';
        geometric.style.top = '100%';
        geometric.style.animationDelay = Math.random() * 20 + 's';
        geometric.style.animationDuration = Math.random() * 15 + 20 + 's';
        themeElements.appendChild(geometric);
    }
}

// ===== POEM RENDERING FUNCTIONS =====

/**
 * Poems ko wall par render karta hai
 */
function renderPoems() {
    const poemsWall = document.getElementById('poemsWall');
    poemsWall.innerHTML = poems.map((poem, index) => `
        <div class="poem-paper" onclick="openModal(${index})">
            <div>
                <h3 class="poem-title">${poem.title}</h3>
                <p class="poem-preview">${poem.preview}</p>
            </div>
            <div class="poem-meta">
                <span class="poem-category">${poem.category}</span>
                <span class="poem-date">${new Date(poem.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                })}</span>
            </div>
        </div>
    `).join('');
}

/**
 * Poem modal ko open karta hai
 * @param {number} poemIndex - Poem ka index array mein
 */
function openModal(poemIndex) {
    const poem = poems[poemIndex];
    const modal = document.getElementById('poemModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Modal ko emotion class add karna
    modalContent.className = `modal-content ${poem.emotion}`;
    modalTitle.textContent = poem.title;
    modalBody.textContent = poem.body;

    // Floating elements create karna based on emotion
    createAdvancedFloatingElements(poem.emotion);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Poem modal ko close karta hai
 */
function closeModal() {
    const modal = document.getElementById('poemModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== EVENT LISTENERS =====

// Theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Modal close button
document.getElementById('closeModal').addEventListener('click', closeModal);

// Modal ke bahar click karke close karna
document.getElementById('poemModal').addEventListener('click', (e) => {
    if (e.target.id === 'poemModal') closeModal();
});

// Escape key se modal close karna
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== INITIALIZATION =====

// Page load par initialize karna
initializeTheme();
renderPoems();