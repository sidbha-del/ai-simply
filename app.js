// State
const app = {
    currentChapter: 0,
    currentPage: 0,
    currentTheme: localStorage.getItem('ai_simply_theme') || 'chef',
    currentMode: localStorage.getItem('ai_simply_mode') || 'seed',
    isOnboarding: false,

    // Init
    init: function () {
        // Check for onboarding
        if (!localStorage.getItem('ai_simply_onboarding_complete')) {
            this.isOnboarding = true;
            document.getElementById('onboarding-modal').classList.remove('hidden');
        }

        // Apply Theme & Mode
        this.applyTheme(this.currentTheme);
        this.updateModeDisplay();

        // Render
        this.renderSidebar();
        this.renderContent();
        this.updateProgress();

        // Setup Menu Listeners
        this.setupMenuListeners();
    },

    updateModeDisplay: function () {
        const theme = themes[this.currentTheme];
        const modes = theme.modes;

        // Update Top Bar Current Mode
        const currentModeText = document.getElementById('current-mode-text');
        if (currentModeText) currentModeText.textContent = modes[this.currentMode];
        const currentModeIcon = document.getElementById('current-mode-icon');
        if (currentModeIcon) currentModeIcon.textContent = this.currentMode === 'seed' ? '🌱' : this.currentMode === 'grower' ? '🌳' : '🌲';

        // Update Modal Mode Titles (if visible)
        const modalSeed = document.getElementById('modal-mode-seed-title');
        const modalGrower = document.getElementById('modal-mode-grower-title');
        const modalForester = document.getElementById('modal-mode-forester-title');

        if (modalSeed) modalSeed.textContent = modes.seed;
        if (modalGrower) modalGrower.textContent = modes.grower;
        if (modalForester) modalForester.textContent = modes.forester;
    },

    setTheme: function (themeId) {
        this.currentTheme = themeId;
        localStorage.setItem('ai_simply_theme', themeId);
        this.applyTheme(themeId);
        this.updateModeDisplay();

        if (this.isOnboarding) {
            // Move to Step 2
            document.getElementById('onboarding-step-1').classList.add('hidden');
            document.getElementById('onboarding-step-2').classList.remove('hidden');
        } else {
            this.closeOnboarding();
            this.renderContent(); // Re-render to update analogies
            this.toggleMobileMenu(); // Close mobile menu if open
        }
    },

    setMode: function (modeId) {
        this.currentMode = modeId;
        localStorage.setItem('ai_simply_mode', modeId);

        // Reset to Chapter 1 Page 1 when switching modes
        this.currentChapter = 0;
        this.currentPage = 0;

        this.updateModeDisplay();

        // Hide dropdown
        const dropdown = document.getElementById('mode-dropdown');
        if (dropdown) dropdown.classList.add('hidden');

        if (this.isOnboarding) {
            this.completeOnboarding();
        } else {
            this.renderSidebar();
            this.renderContent();
            this.updateProgress();
            this.toggleMobileMenu(); // Close mobile menu if open
        }
    },

    backToStep1: function () {
        document.getElementById('onboarding-step-2').classList.add('hidden');
        document.getElementById('onboarding-step-1').classList.remove('hidden');
    },

    closeOnboarding: function () {
        this.completeOnboarding();
    },

    completeOnboarding: function () {
        this.isOnboarding = false;
        localStorage.setItem('ai_simply_onboarding_complete', 'true');
        document.getElementById('onboarding-modal').classList.add('hidden');

        this.renderSidebar();
        this.renderContent();
        this.updateProgress();
    },

    openThemeModal: function () {
        this.isOnboarding = false;
        document.getElementById('onboarding-step-1').classList.remove('hidden');
        document.getElementById('onboarding-step-2').classList.add('hidden');
        document.getElementById('onboarding-modal').classList.remove('hidden');
        this.toggleMobileMenu(); // Close mobile menu if open
    },

    applyTheme: function (themeId) {
        const theme = themes[themeId];
        const icon = document.getElementById('current-theme-icon');
        if (icon) icon.textContent = theme.icon;

        // Mobile menu update
        const mobileText = document.getElementById('mobile-persona-text');
        if (mobileText) mobileText.textContent = theme.id.charAt(0).toUpperCase() + theme.id.slice(1);
    },

    toggleMobileMenu: function () {
        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    },

    renderSidebar: function () {
        const sidebar = document.getElementById('chapter-list');
        if (!sidebar) return;

        const chapters = courseData.modes[this.currentMode].chapters;

        sidebar.innerHTML = chapters.map((chapter, index) => `
            <button onclick="app.loadChapter(${index})" 
                    class="w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${this.currentChapter === index ? 'bg-white/40 dark:bg-white/10 font-bold shadow-sm border border-white/20' : 'hover:bg-white/20 dark:hover:bg-white/5 opacity-70 hover:opacity-100'}">
                <span class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-lg bg-white/50 dark:bg-black/30 flex items-center justify-center text-xs font-bold">${index + 1}</span>
                    <span class="text-sm">${chapter.title}</span>
                </span>
                ${this.currentChapter === index ? '<span class="text-blue-500">●</span>' : ''}
            </button>
        `).join('');
    },

    renderContent: function () {
        const chapter = courseData.modes[this.currentMode].chapters[this.currentChapter];
        const page = chapter.pages[this.currentPage];
        const contentDiv = document.getElementById('content-area');
        const theme = themes[this.currentTheme];

        // Clear previous content
        contentDiv.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.className = 'mb-8 animate-fade-in';
        header.innerHTML = `
            <div class="flex items-center gap-2 mb-2 opacity-60">
                <span class="text-xs font-bold uppercase tracking-widest">Chapter ${this.currentChapter + 1}</span>
                <span class="w-1 h-1 rounded-full bg-current"></span>
                <span class="text-xs font-bold uppercase tracking-widest">${chapter.title}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-balance leading-tight">${page.title}</h1>
        `;
        contentDiv.appendChild(header);

        // Blocks
        page.content.forEach((block, idx) => {
            const div = document.createElement('div');
            div.style.animationDelay = `${idx * 100}ms`;

            if (block.type === 'text') {
                div.className = 'mb-6 animate-fade-in';
                div.innerHTML = `<p class="text-lg leading-relaxed opacity-90">${this.processTemplate(block.text, theme)}</p>`;
            } else if (block.type === 'analogy') {
                const color = theme.id === 'chef' ? 'orange' : theme.id === 'gardener' ? 'green' : theme.id === 'musician' ? 'purple' : theme.id === 'architect' ? 'blue' : 'teal';
                div.className = `glass-panel p-6 rounded-2xl mb-8 border-l-4 border-${color}-500 animate-fade-in`;
                div.innerHTML = `
                    <h3 class="font-bold text-xl mb-3 flex items-center gap-3 text-${color}-600 dark:text-${color}-400">
                        <span class="text-2xl">${theme.icon}</span> ${this.processTemplate(block.title, theme)}
                    </h3>
                    <p class="text-lg italic opacity-80 leading-relaxed">"${this.processTemplate(block.text, theme)}"</p>
                `;
            }
            contentDiv.appendChild(div);
        });

        // Update Pagination Buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageDots = document.getElementById('page-dots');

        // Prev Logic
        if (this.currentPage === 0 && this.currentChapter === 0) {
            prevBtn.disabled = true;
            prevBtn.classList.add('opacity-50');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50');
        }

        // Next Logic
        const isLastPage = this.currentPage === chapter.pages.length - 1;
        const isLastChapter = this.currentChapter === courseData.modes[this.currentMode].chapters.length - 1;

        if (isLastPage && isLastChapter) {
            nextBtn.innerHTML = `<span>Finish Course 🏆</span>`;
            nextBtn.onclick = () => alert("Congratulations! You've finished the course!");
        } else {
            nextBtn.innerHTML = `Next <span>→</span>`;
            nextBtn.onclick = () => this.nextPage();
        }

        // Dots
        pageDots.innerHTML = chapter.pages.map((_, i) => `
            <div class="w-2 h-2 rounded-full transition-all ${i === this.currentPage ? 'bg-blue-500 w-6' : 'bg-gray-300 dark:bg-gray-600'}"></div>
        `).join('');
    },

    processTemplate: function (text, theme) {
        return text.replace(/{{(.*?)}}/g, (match, p1) => {
            return theme[p1] || match;
        }).replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-black dark:text-white">$1</strong>');
    },

    nextPage: function () {
        const chapter = courseData.modes[this.currentMode].chapters[this.currentChapter];
        if (this.currentPage < chapter.pages.length - 1) {
            this.currentPage++;
        } else if (this.currentChapter < courseData.modes[this.currentMode].chapters.length - 1) {
            this.currentChapter++;
            this.currentPage = 0;
        }
        this.renderContent();
        this.updateProgress();
        this.renderSidebar();
        document.getElementById('content-area').scrollTop = 0;
    },

    prevPage: function () {
        if (this.currentPage > 0) {
            this.currentPage--;
        } else if (this.currentChapter > 0) {
            this.currentChapter--;
            this.currentPage = courseData.modes[this.currentMode].chapters[this.currentChapter].pages.length - 1;
        }
        this.renderContent();
        this.updateProgress();
        this.renderSidebar();
        document.getElementById('content-area').scrollTop = 0;
    },

    loadChapter: function (index) {
        this.currentChapter = index;
        this.currentPage = 0;
        this.renderContent();
        this.updateProgress();
        this.renderSidebar();
        document.getElementById('content-area').scrollTop = 0;
    },

    updateProgress: function () {
        const totalChapters = courseData.modes[this.currentMode].chapters.length;
        const totalPagesInCurrentChapter = courseData.modes[this.currentMode].chapters[this.currentChapter].pages.length;
        const percent = ((this.currentChapter) / totalChapters) * 100 + ((this.currentPage + 1) / totalPagesInCurrentChapter) * (100 / totalChapters);

        const bar = document.getElementById('progress-bar');
        if (bar) bar.style.width = `${percent}%`;

        const score = document.getElementById('sidebar-score');
        if (score) score.textContent = `${Math.round(percent)}%`;
    },

    renderPage: function (pageId) {
        // Simple routing for About/Contact
        const contentDiv = document.getElementById('content-area');
        contentDiv.innerHTML = '';

        if (pageId === 'about') {
            contentDiv.innerHTML = `
                <div class="max-w-2xl mx-auto animate-fade-in">
                    <h1 class="text-4xl font-bold mb-6">About AI Simply</h1>
                    <div class="glass-panel p-8 rounded-3xl">
                        <p class="text-lg mb-4">AI Simply is a "LLM Launchpad" designed to demystify Artificial Intelligence.</p>
                        <p class="text-lg mb-6">Our mission is to use simple, relatable analogies to explain complex concepts.</p>
                        <h3 class="font-bold text-xl mb-3">The Modes</h3>
                        <ul class="space-y-2 opacity-80">
                            <li><strong>🌱 Seed</strong>: Beginner analogies.</li>
                            <li><strong>🌳 Grower</strong>: Intermediate concepts.</li>
                            <li><strong>🌲 Forester</strong>: Advanced architecture.</li>
                        </ul>
                    </div>
                </div>
            `;
        } else if (pageId === 'contact') {
            contentDiv.innerHTML = `
                <div class="max-w-xl mx-auto text-center animate-fade-in pt-10">
                    <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
                    <p class="opacity-70 mb-8">Follow us on LinkedIn for the latest updates.</p>
                    <a href="https://www.linkedin.com/company/ai-simply/" target="_blank" class="inline-flex items-center gap-3 px-8 py-4 bg-[#0077b5] text-white rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-transform">
                        <span>Visit LinkedIn Page</span>
                    </a>
                </div>
            `;
        } else {
            this.renderContent();
        }
    },

    // Quiz Logic
    quizTimer: null,
    timeLeft: 60,
    score: 0,
    currentQuestionIndex: 0,
    quizQuestions: [],

    startGlobalQuiz: function () {
        this.quizQuestions = courseData.modes[this.currentMode].quiz;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 60;

        document.getElementById('quiz-modal').classList.remove('hidden');

        document.getElementById('quiz-content').innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-6">⏱️</div>
                <h3 class="text-2xl font-bold mb-4">Ready?</h3>
                <p class="opacity-70 mb-8">You have 60 seconds to answer 10 questions.</p>
                <button onclick="app.runQuiz()" class="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform">Start Quiz</button>
            </div>
        `;
    },

    runQuiz: function () {
        this.renderQuestion();
        this.startTimer();
    },

    startTimer: function () {
        clearInterval(this.quizTimer);
        this.updateTimerUI();

        this.quizTimer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerUI();

            if (this.timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    },

    updateTimerUI: function () {
        const timerBar = document.getElementById('quiz-timer-bar');
        const percent = (this.timeLeft / 60) * 100;
        timerBar.style.width = `${percent}%`;
    },

    renderQuestion: function () {
        const q = this.quizQuestions[this.currentQuestionIndex];
        const content = document.getElementById('quiz-content');
        content.innerHTML = `
            <div class="flex justify-between mb-4 opacity-60 text-sm font-bold">
                <span>Question ${this.currentQuestionIndex + 1}/10</span>
                <span>Score: ${this.score}</span>
            </div>
            <h3 class="text-xl font-bold mb-6">${q.question}</h3>
            <div class="space-y-3" id="quiz-options">
                ${q.options.map((opt, index) => `
                    <button onclick="app.checkAnswer(${index})" class="w-full text-left p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/50 transition-all font-medium">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div id="quiz-feedback" class="hidden mt-6 p-4 rounded-xl"></div>
            <button id="quiz-next-btn" class="hidden w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Next Question</button>
        `;
    },

    checkAnswer: function (selectedIndex) {
        const q = this.quizQuestions[this.currentQuestionIndex];
        const optionsDiv = document.getElementById('quiz-options');
        const buttons = optionsDiv.getElementsByTagName('button');

        for (let btn of buttons) {
            btn.disabled = true;
            btn.classList.add('opacity-50');
        }

        const feedbackDiv = document.getElementById('quiz-feedback');

        if (selectedIndex === q.correct) {
            this.score++;
            buttons[selectedIndex].classList.add('bg-green-500/20', 'border-green-500');
            feedbackDiv.className = "mt-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-800 dark:text-green-200";
            feedbackDiv.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
        } else {
            buttons[selectedIndex].classList.add('bg-red-500/20', 'border-red-500');
            buttons[q.correct].classList.add('bg-green-500/20', 'border-green-500');
            feedbackDiv.className = "mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-800 dark:text-red-200";
            feedbackDiv.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
        }

        feedbackDiv.classList.remove('hidden');

        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.classList.remove('hidden');

        if (this.currentQuestionIndex === this.quizQuestions.length - 1) {
            nextBtn.textContent = "See Results";
            nextBtn.onclick = () => this.endQuiz();
        } else {
            nextBtn.textContent = "Next Question";
            nextBtn.onclick = () => this.nextQuestion();
        }
    },

    nextQuestion: function () {
        this.currentQuestionIndex++;
        this.renderQuestion();
    },

    endQuiz: function () {
        clearInterval(this.quizTimer);
        document.getElementById('quiz-content').innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">🎉</div>
                <h2 class="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <div class="text-5xl font-bold text-blue-500 my-6">${this.score} / 10</div>
                <button onclick="document.getElementById('quiz-modal').classList.add('hidden')" class="px-8 py-3 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold">Close</button>
            </div>
        `;
    },

    // Theme Logic
    toggleTheme: function () {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('display_theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('display_theme', 'dark');
        }
    },

    setDisplayTheme: function (theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    },

    setupMenuListeners: function () {
        // Close mobile menu on outside click
        // Handled by overlay div in HTML
    },

    // Social Sharing
    openShareModal: function () {
        const modal = document.getElementById('share-modal');
        const text = document.getElementById('share-text');
        const chapterTitle = courseData.modes[this.currentMode].chapters[this.currentChapter].title;

        text.textContent = `I'm learning about ${chapterTitle} in AI Simply! It's a great way to understand LLMs.`;
        modal.classList.remove('hidden');
    },

    shareToLinkedIn: function () {
        const text = document.getElementById('share-text').textContent;
        const url = encodeURIComponent(window.location.href);
        const encodedText = encodeURIComponent(text);
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}%20${url}`, '_blank');
    },

    copyShareText: function () {
        const text = document.getElementById('share-text').textContent;
        navigator.clipboard.writeText(text + " " + window.location.href).then(() => {
            alert('Copied to clipboard!');
        });
    }
};

// Initialize Display Theme
const savedDisplayTheme = localStorage.getItem('display_theme') || 'system';
if (savedDisplayTheme === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        app.setDisplayTheme('dark');
    } else {
        app.setDisplayTheme('light');
    }
} else {
    app.setDisplayTheme(savedDisplayTheme);
}

// Start App
app.init();
