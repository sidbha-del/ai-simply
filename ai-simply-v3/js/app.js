const app = {
    currentTheme: 'chef',
    currentMode: null,
    currentChapter: 0,
    currentPage: 0,
    quizScore: 0,
    quizActive: false,

    init: function () {
        // Check for saved state
        const savedTheme = localStorage.getItem('ai-simply-theme');
        if (savedTheme && themes[savedTheme]) {
            this.currentTheme = savedTheme;
        }
        this.applyTheme(this.currentTheme);
    },

    navigate: function (view) {
        const contentView = document.getElementById('content-view');

        // Simple fade out
        contentView.style.opacity = '0';

        setTimeout(() => {
            if (view === 'home') {
                this.renderHome();
            } else if (view === 'learn') {
                if (this.currentMode) {
                    this.renderChapter(this.currentChapter);
                } else {
                    this.renderHome(); // Redirect to home if no mode selected
                }
            } else if (view === 'quiz') {
                this.startQuiz();
            }

            // Fade in
            contentView.style.opacity = '1';
        }, 300);
    },

    setMode: function (mode) {
        this.currentMode = mode;
        this.currentChapter = 0;
        this.currentPage = 0;

        // Update UI
        this.updateModeBadge();
        this.updateChapterNav();
        this.navigate('learn');
    },

    updateChapterNav: function () {
        const container = document.getElementById('desktop-chapter-nav');
        if (!container) return;

        if (!this.currentMode) {
            container.classList.add('hidden');
            return;
        }

        const modeData = courseData.modes[this.currentMode];
        if (!modeData || !modeData.chapters) return;

        container.classList.remove('hidden');
        container.innerHTML = modeData.chapters.map((chapter, index) => `
            <button onclick="app.goToChapter(${index})" 
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${this.currentChapter === index ? 'bg-purple-600 text-white shadow-lg scale-110 ring-2 ring-white/50' : 'bg-white/40 text-gray-800 hover:bg-white/60'}"
                title="${chapter.title}">
                ${index + 1}
            </button>
        `).join('') + `
            <div class="w-full h-[1px] bg-white/20 my-2"></div>
        `;
    },

    goToChapter: function (index) {
        this.currentChapter = index;
        this.currentPage = 0;
        this.renderChapter(this.currentChapter);
    },

    updateModeBadge: function () {
        if (!this.currentMode) return;

        const theme = themes[this.currentTheme];
        const modeName = theme.modes[this.currentMode];

        const modeBadge = document.getElementById('mode-badge');
        if (modeBadge) {
            // Make it look clickable and add dropdown indicator
            modeBadge.innerHTML = `${modeName} <span class="ml-1 opacity-60">▼</span>`;
            modeBadge.className = `cursor-pointer px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/50 hover:bg-white/20 transition-colors flex items-center gap-1 ${this.currentMode === 'seed' ? 'bg-green-100/50 text-green-800' :
                this.currentMode === 'grower' ? 'bg-blue-100/50 text-blue-800' :
                    'bg-purple-100/50 text-purple-800'
                }`;
            modeBadge.onclick = (e) => {
                e.stopPropagation();
                this.toggleModeMenu();
            };
        }
    },

    applyTheme: function (themeId) {
        this.currentTheme = themeId;
        localStorage.setItem('ai-simply-theme', themeId);

        const theme = themes[themeId];

        // Update Header
        const iconEl = document.getElementById('current-persona-icon');
        const nameEl = document.getElementById('current-persona-name');
        if (iconEl) iconEl.textContent = theme.icon;
        if (nameEl) nameEl.textContent = theme.name.replace(theme.icon, '').trim();

        // Update Top Bar (if exists)
        const topBarPersona = document.getElementById('top-bar-persona');
        if (topBarPersona) {
            topBarPersona.innerHTML = `<span>${theme.icon}</span> <span>${theme.name.replace(theme.icon, '').trim()}</span>`;
        }

        // Update Mode Badge if active
        if (this.currentMode) {
            this.updateModeBadge();
        }

        // Update Blobs (Colors)
        const blobs = document.querySelectorAll('.blob');
        // Reset classes first to base state + position
        const baseClasses = [
            'blob w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px] mix-blend-multiply',
            'blob w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px] mix-blend-multiply animation-delay-2000',
            'blob w-[500px] h-[500px] rounded-full bottom-[-100px] left-[20%] mix-blend-multiply animation-delay-4000'
        ];

        // Define color palettes
        const palettes = {
            chef: ['bg-orange-300', 'bg-red-300', 'bg-yellow-300'],
            gardener: ['bg-green-300', 'bg-emerald-300', 'bg-lime-300'],
            musician: ['bg-purple-300', 'bg-indigo-300', 'bg-pink-300'],
            architect: ['bg-slate-300', 'bg-gray-300', 'bg-zinc-300'],
            explorer: ['bg-amber-300', 'bg-orange-300', 'bg-sky-300']
        };

        const colors = palettes[themeId] || palettes['chef'];

        blobs.forEach((blob, i) => {
            if (blob) blob.className = `${baseClasses[i]} ${colors[i]}`;
        });

        // Re-render current view to apply text replacements
        const container = document.getElementById('content-view');
        if (container && container.innerHTML.trim() !== "") {
            if (this.currentMode && this.currentChapter !== undefined) {
                this.renderChapter(this.currentChapter);
            } else {
                this.renderHome();
            }
        }

        this.updateChapterNav();
    },

    togglePersonaMenu: function () {
        // Create modal if it doesn't exist
        let modal = document.getElementById('persona-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'persona-modal';
            modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300';
            modal.innerHTML = `
                <div class="bg-white/90 rounded-[2rem] p-8 max-w-2xl w-full mx-4 shadow-2xl transform scale-95 transition-transform duration-300 border border-white/50">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Choose Your Guide</h2>
                        <button onclick="app.closePersonaMenu()" class="p-2 hover:bg-black/5 rounded-full transition-colors">✕</button>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="persona-grid">
                        <!-- Personas injected here -->
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Populate grid
        const grid = modal.querySelector('#persona-grid');
        grid.innerHTML = Object.values(themes).map(theme => `
            <button onclick="app.selectPersona('${theme.id}')" class="flex flex-col items-center gap-3 p-6 rounded-2xl border border-transparent hover:border-black/10 hover:bg-white/50 transition-all hover:scale-105 group ${this.currentTheme === theme.id ? 'bg-white shadow-md border-black/5 ring-2 ring-black/5' : 'bg-white/20'}">
                <span class="text-5xl group-hover:scale-110 transition-transform duration-300">${theme.icon}</span>
                <span class="font-bold text-gray-800">${theme.name.replace(theme.icon, '').trim()}</span>
            </button>
        `).join('');

        // Show modal
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        });
    },

    closePersonaMenu: function () {
        const modal = document.getElementById('persona-modal');
        if (modal) {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('scale-100');
            modal.querySelector('div').classList.add('scale-95');
        }
    },

    selectPersona: function (themeId) {
        this.applyTheme(themeId);
        this.closePersonaMenu();
    },

    toggleModeMenu: function () {
        let modal = document.getElementById('mode-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mode-modal';
            modal.className = 'fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/20 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300';
            // Close on click outside
            modal.onclick = (e) => {
                if (e.target === modal) this.closeModeMenu();
            };

            modal.innerHTML = `
                <div class="bg-white/90 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl transform -translate-y-4 transition-transform duration-300 border border-white/50">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-800">Select Level</h2>
                        <button onclick="app.closeModeMenu()" class="p-1 hover:bg-black/5 rounded-full transition-colors">✕</button>
                    </div>
                    <div class="space-y-3" id="mode-list">
                        <!-- Modes injected here -->
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const theme = themes[this.currentTheme];
        const list = modal.querySelector('#mode-list');
        const modes = [
            { id: 'seed', icon: '🌱', label: 'Beginner' },
            { id: 'grower', icon: '🌳', label: 'Intermediate' },
            { id: 'forester', icon: '🌲', label: 'Advanced' }
        ];

        list.innerHTML = modes.map(m => `
            <button onclick="app.selectMode('${m.id}')" class="w-full flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-black/10 hover:bg-white/50 transition-all group ${this.currentMode === m.id ? 'bg-white shadow-sm border-black/5 ring-1 ring-black/5' : 'bg-white/20'}">
                <span class="text-2xl group-hover:scale-110 transition-transform">${m.icon}</span>
                <div class="text-left">
                    <div class="font-bold text-gray-800">${theme.modes[m.id]}</div>
                    <div class="text-xs opacity-60">${m.label}</div>
                </div>
                ${this.currentMode === m.id ? '<span class="ml-auto text-green-600 font-bold">✓</span>' : ''}
            </button>
        `).join('');

        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('-translate-y-4');
            modal.querySelector('div').classList.add('translate-y-0');
        });
    },

    closeModeMenu: function () {
        const modal = document.getElementById('mode-modal');
        if (modal) {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('translate-y-0');
            modal.querySelector('div').classList.add('-translate-y-4');
        }
    },

    selectMode: function (modeId) {
        this.setMode(modeId);
        this.closeModeMenu();
    },

    renderHome: function () {
        const theme = themes[this.currentTheme];
        const container = document.getElementById('content-view');

        container.innerHTML = `
            <div class="max-w-3xl mx-auto text-center mt-10 animate-fade-in">
                <h2 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Learning AI, Naturally.</h2>
                <p class="text-xl text-gray-600 mb-10 leading-relaxed">Choose a persona to translate complex AI concepts into language you already understand.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button onclick="app.setMode('seed')" class="p-6 rounded-3xl bg-white/40 hover:bg-white/60 border border-white/50 transition-all hover:scale-105 group text-left">
                        <div class="text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">🌱</div>
                        <h3 class="font-bold text-lg">${theme.modes.seed}</h3>
                        <p class="text-sm opacity-60">Beginner</p>
                    </button>
                    <button onclick="app.setMode('grower')" class="p-6 rounded-3xl bg-white/40 hover:bg-white/60 border border-white/50 transition-all hover:scale-105 group text-left">
                        <div class="text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">🌳</div>
                        <h3 class="font-bold text-lg">${theme.modes.grower}</h3>
                        <p class="text-sm opacity-60">Intermediate</p>
                    </button>
                    <button onclick="app.setMode('forester')" class="p-6 rounded-3xl bg-white/40 hover:bg-white/60 border border-white/50 transition-all hover:scale-105 group text-left">
                        <div class="text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">🌲</div>
                        <h3 class="font-bold text-lg">${theme.modes.forester}</h3>
                        <p class="text-sm opacity-60">Advanced</p>
                    </button>
                </div>
            </div>
        `;
        document.getElementById('page-title').textContent = "Welcome";

        // Clear mode badge on home
        const modeBadge = document.getElementById('mode-badge');
        if (modeBadge) {
            modeBadge.textContent = "";
            modeBadge.className = "";
        }
    },

    renderChapter: function (chapterIndex) {
        if (!this.currentMode) return;

        this.currentChapter = chapterIndex; // Ensure state is updated
        this.updateChapterNav(); // Update nav to highlight active chapter

        const modeData = courseData.modes[this.currentMode];
        const chapter = modeData.chapters[chapterIndex];
        const page = chapter.pages[this.currentPage];
        const theme = themes[this.currentTheme];

        document.getElementById('page-title').textContent = chapter.title;

        const container = document.getElementById('content-view');
        let html = `
            <div class="max-w-3xl mx-auto animate-fade-in pb-20">
                <div class="mb-8">
                    <span class="text-sm font-bold opacity-50 uppercase tracking-widest">Chapter ${chapter.id}</span>
                    <h2 class="text-3xl font-bold mt-2">${page.title}</h2>
                </div>
                
                <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
        `;

        page.content.forEach(block => {
            let text = block.text;
            // Replace placeholders
            text = text.replace(/{{entity}}/g, theme.entity)
                .replace(/{{action}}/g, theme.action)
                .replace(/{{creation}}/g, theme.creation)
                .replace(/{{source}}/g, theme.source)
                .replace(/{{ingredients}}/g, theme.ingredients)
                .replace(/{{tool}}/g, theme.tool)
                .replace(/{{prediction}}/g, theme.prediction)
                .replace(/{{training_analogy}}/g, theme.training_analogy)
                .replace(/{{prompt_analogy}}/g, theme.prompt_analogy)
                .replace(/{{context_analogy}}/g, theme.context_analogy)
                .replace(/{{zeroshot_example}}/g, theme.zeroshot_example)
                .replace(/{{oneshot_example}}/g, theme.oneshot_example)
                .replace(/{{multishot_example}}/g, theme.multishot_example)
                .replace(/{{hallucination_analogy}}/g, theme.hallucination_analogy);

            // Markdown bold
            text = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-gray-900">$1</span>');

            if (block.type === 'text') {
                html += `<p>${text}</p>`;
            } else if (block.type === 'analogy') {
                html += `
                    <div class="bg-white/50 border border-white/60 p-6 rounded-2xl my-8">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="text-2xl">${theme.icon}</span>
                            <h3 class="font-bold text-gray-900">${block.title.replace(/{{entity}}/g, theme.entity).replace(/{{context_analogy}}/g, theme.context_analogy)}</h3>
                        </div>
                        <p class="italic opacity-80">${text}</p>
                    </div>
                `;
            }
        });

        html += `
                </div>

                <div class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200/30">
                    <button onclick="app.prevPage()" class="px-6 py-3 rounded-xl bg-white/30 hover:bg-white/50 transition-colors font-medium ${this.currentPage === 0 && this.currentChapter === 0 ? 'opacity-0 pointer-events-none' : ''}">
                        ← Back
                    </button>
                    <div class="flex gap-2">
                        ${chapter.pages.map((_, i) => `
                            <div class="w-2 h-2 rounded-full ${i === this.currentPage ? 'bg-gray-800' : 'bg-gray-300'}"></div>
                        `).join('')}
                    </div>
                    <button onclick="app.nextPage()" class="px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium shadow-lg">
                        ${this.currentPage === chapter.pages.length - 1 ? (this.currentChapter === modeData.chapters.length - 1 ? 'Finish' : 'Next Chapter') : 'Next'} →
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    nextPage: function () {
        const modeData = courseData.modes[this.currentMode];
        const chapter = modeData.chapters[this.currentChapter];

        if (this.currentPage < chapter.pages.length - 1) {
            this.currentPage++;
            this.renderChapter(this.currentChapter);
        } else if (this.currentChapter < modeData.chapters.length - 1) {
            this.currentChapter++;
            this.currentPage = 0;
            this.renderChapter(this.currentChapter);
        } else {
            // Course finished, go to quiz
            this.navigate('quiz');
        }
    },

    prevPage: function () {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.renderChapter(this.currentChapter);
        } else if (this.currentChapter > 0) {
            this.currentChapter--;
            const prevChapter = courseData.modes[this.currentMode].chapters[this.currentChapter];
            this.currentPage = prevChapter.pages.length - 1;
            this.renderChapter(this.currentChapter);
        }
    },

    startQuiz: function () {
        if (!this.currentMode) {
            alert("Please complete a course mode first!");
            this.navigate('home');
            return;
        }

        this.quizActive = true;
        this.quizScore = 0;
        this.currentQuizIndex = 0;
        // Deep copy quiz questions to avoid persisting randomization between runs
        this.quizQuestions = JSON.parse(JSON.stringify(courseData.modes[this.currentMode].quiz));

        this.renderQuizQuestion();
    },

    renderQuizQuestion: function () {
        const question = this.quizQuestions[this.currentQuizIndex];
        const theme = themes[this.currentTheme];

        // Randomize options if not already randomized for this question instance
        if (!question.randomizedOptions) {
            // Create array of objects with original index to track correct answer
            const optionsWithIndices = question.options.map((opt, i) => ({ text: opt, originalIndex: i }));

            // Shuffle
            for (let i = optionsWithIndices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
            }

            question.randomizedOptions = optionsWithIndices;
        }

        document.getElementById('page-title').textContent = "Quiz Challenge";

        const container = document.getElementById('content-view');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in h-full flex flex-col justify-center">
                <div class="text-center mb-8">
                    <span class="text-6xl mb-4 block animate-bounce">${theme.icon}</span>
                    <h2 class="text-2xl font-bold">${question.question}</h2>
                    <p class="text-sm opacity-60 mt-2">Question ${this.currentQuizIndex + 1} of ${this.quizQuestions.length}</p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    ${question.randomizedOptions.map((optionObj, index) => `
                        <button onclick="app.checkAnswer(${index})" class="p-4 rounded-2xl bg-white/40 hover:bg-white/80 border border-white/50 transition-all text-left font-medium hover:scale-[1.02] flex items-center gap-4 group">
                            <span class="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-sm font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">${['A', 'B', 'C', 'D'][index]}</span>
                            ${optionObj.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    checkAnswer: function (selectedIndex) {
        const question = this.quizQuestions[this.currentQuizIndex];
        // Get the original index of the selected option
        const selectedOriginalIndex = question.randomizedOptions[selectedIndex].originalIndex;
        const isCorrect = selectedOriginalIndex === question.correct;

        if (isCorrect) this.quizScore++;

        // Show feedback briefly
        const container = document.getElementById('content-view');
        const buttons = container.querySelectorAll('button');

        buttons[selectedIndex].classList.remove('bg-white/40');
        buttons[selectedIndex].classList.add(isCorrect ? 'bg-green-400/50' : 'bg-red-400/50', 'border-transparent');

        if (!isCorrect) {
            // Find the button that corresponds to the correct answer
            const correctButtonIndex = question.randomizedOptions.findIndex(opt => opt.originalIndex === question.correct);
            if (correctButtonIndex !== -1) {
                buttons[correctButtonIndex].classList.add('bg-green-400/50', 'border-transparent');
            }
        }

        setTimeout(() => {
            this.currentQuizIndex++;
            if (this.currentQuizIndex < this.quizQuestions.length) {
                this.renderQuizQuestion();
            } else {
                this.showQuizResults();
            }
        }, 1500);
    },

    showQuizResults: function () {
        const percentage = Math.round((this.quizScore / this.quizQuestions.length) * 100);
        const theme = themes[this.currentTheme];

        let message = "";
        if (percentage === 100) message = "Perfect Score! You are a true master.";
        else if (percentage >= 80) message = "Excellent work!";
        else if (percentage >= 60) message = "Good job, keep learning!";
        else message = "Keep practicing!";

        const shareText = `I just scored ${percentage}% on the AI Simply ${this.currentMode} quiz as ${theme.name}! Learn AI simply at ai-simply.com #AISimply #LearnAI`;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ai-simply.com')}&summary=${encodeURIComponent(shareText)}`;

        const container = document.getElementById('content-view');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto text-center animate-fade-in h-full flex flex-col justify-center">
                <div class="mb-8">
                    <div class="text-8xl mb-4">🏆</div>
                    <h2 class="text-4xl font-bold mb-2">Quiz Complete!</h2>
                    <p class="text-xl opacity-60">${message}</p>
                </div>

                <div class="bg-white/40 rounded-3xl p-8 mb-8 backdrop-blur-sm border border-white/50">
                    <div class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                        ${percentage}%
                    </div>
                    <p class="text-sm font-bold uppercase tracking-widest opacity-50">Final Score</p>
                </div>

                <div class="flex flex-col gap-4">
                    <a href="${linkedinUrl}" target="_blank" class="w-full py-4 bg-[#0077b5] text-white rounded-xl font-bold hover:bg-[#006396] transition-colors flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transform">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        Share on LinkedIn
                    </a>
                    <button onclick="app.navigate('home')" class="w-full py-4 bg-white/50 hover:bg-white/80 text-gray-800 rounded-xl font-bold transition-colors">
                        Return Home
                    </button>
                </div>
            </div>
        `;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
