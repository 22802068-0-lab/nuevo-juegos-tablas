/**
 * app.js - Controlador Principal de la Plataforma Educativa "Mis Tablas"
 * Gestión de perfil, navegación de secciones, aprendizaje interactivo,
 * sistema de recompensas, confetti y sonido.
 */

class AppController {
  constructor() {
    this.student = null;
    this.currentSection = 'home';
    this.activeTable = 2;
  }

  init() {
    this.loadStudentProfile();
    this.bindEvents();
    this.showSection('home');
    this.updateHeaderUI();
  }

  loadStudentProfile() {
    const raw = localStorage.getItem('misTablas_student');
    if (!raw) {
      // If not logged in, redirect to login
      window.location.href = '../index.html';
      return;
    }

    try {
      this.student = JSON.parse(raw);
    } catch (e) {
      window.location.href = '../index.html';
      return;
    }

    // Default structure safety
    this.student.score = this.student.score || 0;
    this.student.stars = this.student.stars || 0;
    this.student.level = this.student.level || 1;
    this.student.completedTables = this.student.completedTables || [];
    this.student.tableScores = this.student.tableScores || {};
    this.student.achievements = this.student.achievements || [];
    this.student.simceScore = this.student.simceScore || null;

    // Check level based on score
    this.calculateLevel();
  }

  calculateLevel() {
    const score = this.student.score;
    let lvl = 1;
    let title = "Aprendiz de Números";

    if (score >= 800) {
      lvl = 5;
      title = "Gran Maestro Matemático";
    } else if (score >= 500) {
      lvl = 4;
      title = "Experto en Multiplicaciones";
    } else if (score >= 300) {
      lvl = 3;
      title = "Aventurero del Cálculo";
    } else if (score >= 100) {
      lvl = 2;
      title = "Explorador de Tablas";
    }

    this.student.level = lvl;
    this.student.levelTitle = title;
  }

  saveProfile() {
    this.calculateLevel();
    localStorage.setItem('misTablas_student', JSON.stringify(this.student));
    this.updateHeaderUI();
  }

  addScore(points, stars = 1) {
    this.student.score += points;
    this.student.stars += stars;
    this.saveProfile();
    this.unlockAchievement('primer_paso');
  }

  updateSimceScore(simcePoints, correctCount) {
    this.student.simceScore = simcePoints;
    this.student.simceCorrect = correctCount;
    this.saveProfile();
  }

  unlockAchievement(achId) {
    if (!this.student.achievements.includes(achId)) {
      this.student.achievements.push(achId);
      this.saveProfile();

      const ach = ACHIEVEMENTS_DATA.find(a => a.id === achId);
      if (ach) {
        this.showAchievementToast(ach);
        if (window.snd) {
          window.snd.play('chest');
          window.snd.speak(`¡Felicitaciones! Desbloqueaste el logro: ${ach.title}`);
        }
      }
    }
  }

  showAchievementToast(ach) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast animate-bounce';
    toast.innerHTML = `
      <div class="toast-icon">${ach.icon}</div>
      <div class="toast-info">
        <strong>¡Logro Desbloqueado!</strong>
        <span>${ach.title}</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  getAvatarUrl() {
    if (!this.student || !this.student.avatarImg) return 'IMAGEN/avatar_gato.svg';
    return this.student.avatarImg.replace(/^Sistema\//, '');
  }

  updateHeaderUI() {
    if (!this.student) return;

    const nameEl = document.getElementById('headerStudentName');
    const titleEl = document.getElementById('headerStudentTitle');
    const avatarEl = document.getElementById('headerAvatarImg');
    const scoreEl = document.getElementById('headerScore');
    const starsEl = document.getElementById('headerStars');

    if (nameEl) nameEl.textContent = this.student.name;
    if (titleEl) titleEl.textContent = `Nivel ${this.student.level}: ${this.student.levelTitle}`;
    if (avatarEl) avatarEl.src = this.getAvatarUrl();
    if (scoreEl) scoreEl.textContent = this.student.score;
    if (starsEl) starsEl.textContent = this.student.stars;

    // Sound button icon
    const soundBtn = document.getElementById('navSoundBtn');
    if (soundBtn && window.snd) {
      soundBtn.innerHTML = window.snd.soundEnabled ? '🔊 <span>Sonido</span>' : '🔇 <span>Mudo</span>';
    }

    // Voice button icon
    const voiceBtn = document.getElementById('navVoiceBtn');
    if (voiceBtn && window.snd) {
      voiceBtn.innerHTML = window.snd.voiceEnabled ? '🗣️ <span>Voz On</span>' : '🤐 <span>Voz Off</span>';
    }
  }

  showSection(secId) {
    this.currentSection = secId;
    document.querySelectorAll('.app-section').forEach(sec => sec.style.display = 'none');
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    const targetSec = document.getElementById(`section-${secId}`);
    if (targetSec) {
      targetSec.style.display = 'block';
    }

    const targetTab = document.getElementById(`tab-${secId}`);
    if (targetTab) {
      targetTab.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (secId === 'home') this.renderHome();
    if (secId === 'learn') this.renderLearn();
    if (secId === 'games') this.renderGamesMenu();
    if (secId === 'progress') this.renderProgress();
    if (secId === 'achievements') this.renderAchievements();
    if (secId === 'simce') {
      if (window.simceCtrl) window.simceCtrl.startTest();
    }
  }

  /* ============================================================
     RENDER SECTIONS
     ============================================================ */

  // 1. HOME DASHBOARD
  renderHome() {
    const completedCount = this.student.completedTables.length;
    const progressPercent = Math.round((completedCount / 9) * 100);

    const homeContainer = document.getElementById('homeContainer');
    if (!homeContainer) return;

    homeContainer.innerHTML = `
      <!-- Welcome Hero Banner -->
      <div class="welcome-hero animate-pop">
        <div class="hero-text">
          <span class="greeting-pill">¡Hola, ${this.student.name}! 👋</span>
          <h2>¡Bienvenido al Mundo de las Tablas!</h2>
          <p>Explora, juega y prepárate para ser el mejor en matemática y el examen SIMCE de 4° básico.</p>
          <div class="hero-actions">
            <button class="btn-primary" onclick="window.app.showSection('learn')">
              📚 Aprender Tablas (2 al 10)
            </button>
            <button class="btn-secondary" onclick="window.app.showSection('games')">
              🎮 Juegos y Desafíos
            </button>
          </div>
        </div>
        <div class="hero-mascot">
          <img src="${this.getAvatarUrl()}" alt="${this.student.avatarName}" class="mascot-bounce">
          <span class="mascot-tag">${this.student.avatarName}</span>
        </div>
      </div>

      <!-- Quick Progress Overview Banner -->
      <div class="progress-banner-card">
        <div class="banner-info">
          <h4>🌟 Tu Progreso en las Tablas (2 al 10)</h4>
          <span>${completedCount} de 9 tablas dominadas (${progressPercent}%)</span>
        </div>
        <div class="main-progress-bar-wrap">
          <div class="main-progress-bar" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- Portal Cards Grid -->
      <div class="portal-grid">
        <!-- Card 1: Aprender Tablas -->
        <div class="portal-card" onclick="window.app.showSection('learn')">
          <div class="portal-icon" style="background: #FFEAA7; color: #D35400;">📚</div>
          <h3>Aprender Tablas</h3>
          <p>Descubre patrones visuales, grupos concretos y trucos mágicos del 2 al 10.</p>
          <div class="portal-link">¡Empezar a aprender! ➔</div>
        </div>

        <!-- Card 2: Juegos y Desafíos -->
        <div class="portal-card" onclick="window.app.showSection('games')">
          <div class="portal-icon" style="background: #DFF9FB; color: #00CEC9;">🎮</div>
          <h3>Juegos y Desafíos</h3>
          <p>Memoria matemática, Atrapa el resultado, Detective numérico y Contrarreloj.</p>
          <div class="portal-link">¡A jugar! ➔</div>
        </div>

        <!-- Card 3: Mi Progreso y Puntaje -->
        <div class="portal-card" onclick="window.app.showSection('progress')">
          <div class="portal-icon" style="background: #E8F8F5; color: #10AC84;">📊</div>
          <h3>Progreso y Puntaje</h3>
          <p>Consulta tus tablas dominadas, tus puntos y el porcentaje de avance.</p>
          <div class="portal-link">Ver mis estadísticas ➔</div>
        </div>

        <!-- Card 4: Salón de Logros -->
        <div class="portal-card" onclick="window.app.showSection('achievements')">
          <div class="portal-icon" style="background: #F8EFBA; color: #F39C12;">🏆</div>
          <h3>Logros y Recompensas</h3>
          <p>Medallas, trofeos y cofres misteriosos para los mejores matemáticos.</p>
          <div class="portal-link">Ver mis trofeos ➔</div>
        </div>

        <!-- Card 5: Ensayo SIMCE -->
        <div class="portal-card simce-special-card" onclick="window.app.showSection('simce')">
          <div class="simce-badge-ribbon">⭐ EXAMEN REAL ⭐</div>
          <div class="portal-icon" style="background: #FFE3E3; color: #FF6B6B;">📝</div>
          <h3>Ensayo Tipo SIMCE 4°</h3>
          <p>10 situaciones cotidianas (compras, filas, huertos, etc.) con retroalimentación completa.</p>
          <div class="portal-link highlight">¡Comenzar el Ensayo SIMCE! ➔</div>
        </div>
      </div>
    `;
  }

  // 2. LEARN TABLES
  renderLearn() {
    const tableNums = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const container = document.getElementById('learnContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="section-title-bar">
        <h2>📚 Módulos Interactivos de Aprendizaje (Tablas del 2 al 10)</h2>
        <p>Selecciona una tabla para explorar sus trucos, representaciones con objetos y práctica activa.</p>
      </div>

      <!-- Table Selection Tabs -->
      <div class="table-selector-strip" id="tableSelectorStrip">
        ${tableNums.map(n => {
          const isDone = this.student.completedTables.includes(n);
          return `
            <button class="table-select-btn ${n === this.activeTable ? 'active' : ''} ${isDone ? 'done' : ''}" onclick="window.app.selectTableToLearn(${n})">
              <span>Tabla del ${n}</span>
              ${isDone ? '<small>✔ Dominada</small>' : '<small>Practicar</small>'}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Table View Content -->
      <div class="table-view-card" id="tableViewCard">
        <!-- Rendered by renderTableDetail -->
      </div>
    `;

    this.renderTableDetail(this.activeTable);
  }

  selectTableToLearn(num) {
    this.activeTable = num;
    document.querySelectorAll('.table-select-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', [2,3,4,5,6,7,8,9,10][idx] === num);
    });
    this.renderTableDetail(num);
  }

  renderTableDetail(tNum) {
    const tData = TABLES_DATA[tNum];
    const isCompleted = this.student.completedTables.includes(tNum);
    const view = document.getElementById('tableViewCard');
    if (!view) return;

    view.innerHTML = `
      <!-- Table Header & Secret Trick -->
      <div class="table-hero-banner" style="border-left-color: ${tData.color};">
        <div class="table-hero-info">
          <div class="table-badge" style="background: ${tData.color}; color: white;">${tData.icon} ${tData.title}</div>
          <p class="table-subtitle">${tData.subtitle}</p>
        </div>
        <div class="secret-trick-box">
          <div class="trick-title">💡 ¡Truco Secreto de 4° Básico!</div>
          <p class="trick-desc">${tData.trick}</p>
        </div>
      </div>

      <!-- Practice interactive modes -->
      <div class="table-interactive-modes">
        <button class="btn-mode-tab active" id="tabModeVisual" onclick="window.app.toggleTableMode('visual')">
          🎨 Representación con Grupos y Objetos
        </button>
        <button class="btn-mode-tab" id="tabModePractice" onclick="window.app.toggleTableMode('practice')">
          ⚡ Desafío de Práctica Rápida
        </button>
      </div>

      <!-- Visual Concrete View (COPISI) -->
      <div id="modeVisualContent" class="mode-content-block">
        <p class="mode-instruction">Haz clic en cualquier multiplicación para observar su agrupación en objetos y suma repetida:</p>
        <div class="visual-items-grid">
          ${tData.items.map((item, idx) => `
            <div class="vis-item-card ${idx === 0 ? 'selected' : ''}" id="visCard-${idx}" onclick="window.app.showItemVisual(${tNum}, ${idx})">
              <div class="vis-formula">${item.a} × ${item.b} = <strong>${item.res}</strong></div>
              <div class="vis-context">${item.context}</div>
            </div>
          `).join('')}
        </div>

        <!-- Large Visual Demonstration Screen -->
        <div class="large-demo-display" id="largeDemoDisplay"></div>
      </div>

      <!-- Practice Mode -->
      <div id="modePracticeContent" class="mode-content-block" style="display: none;">
        <div class="practice-arena" id="practiceArena">
          <!-- Rendered dynamically -->
        </div>
      </div>
    `;

    this.showItemVisual(tNum, 0);

    if (window.snd) {
      window.snd.play('select');
      window.snd.speak(`Tabla del ${tNum}. ${tData.trick}`);
    }
  }

  showItemVisual(tNum, itemIdx) {
    const tData = TABLES_DATA[tNum];
    const item = tData.items[itemIdx];

    document.querySelectorAll('.vis-item-card').forEach((c, i) => {
      c.classList.toggle('selected', i === itemIdx);
    });

    const display = document.getElementById('largeDemoDisplay');
    if (!display) return;

    // Build visual concrete groups
    let groupsHtml = '';
    const icons = ['🌟', '🍎', '⚽', '🍪', '💎', '🍓', '🚀'];
    const chosenIcon = icons[(tNum + itemIdx) % icons.length];

    for (let g = 0; g < item.a; g++) {
      let itemsInside = '';
      for (let k = 0; k < item.b; k++) {
        itemsInside += `<span class="grid-obj animate-pop" style="animation-delay: ${(g * item.b + k) * 0.03}s;">${chosenIcon}</span>`;
      }
      groupsHtml += `
        <div class="visual-group-box">
          <div class="group-label">Grupo ${g + 1} (${item.b})</div>
          <div class="group-objects">${itemsInside}</div>
        </div>
      `;
    }

    display.innerHTML = `
      <div class="demo-card-box animate-pop">
        <div class="demo-top-header">
          <h3>${item.a} × ${item.b} = <span class="highlight-res">${item.res}</span></h3>
          <span class="demo-tag">Situación: ${item.context}</span>
        </div>

        <div class="demo-addition-bar">
          <span>Suma repetida:</span>
          <strong>${new Array(item.a).fill(item.b).join(' + ')} = ${item.res}</strong>
        </div>

        <div class="groups-visual-container">
          ${groupsHtml}
        </div>

        <div class="demo-property-tip">
          🔄 <strong>Propiedad Conmutativa:</strong> ${item.a} × ${item.b} es exactamente igual a ${item.b} × ${item.a} = ${item.res}. ¡El orden de los factores no cambia el producto!
        </div>
      </div>
    `;

    if (window.snd) {
      window.snd.play('click');
    }
  }

  toggleTableMode(mode) {
    const visualContent = document.getElementById('modeVisualContent');
    const practiceContent = document.getElementById('modePracticeContent');
    const btnVisual = document.getElementById('tabModeVisual');
    const btnPractice = document.getElementById('tabModePractice');

    if (mode === 'visual') {
      visualContent.style.display = 'block';
      practiceContent.style.display = 'none';
      btnVisual.classList.add('active');
      btnPractice.classList.remove('active');
    } else {
      visualContent.style.display = 'none';
      practiceContent.style.display = 'block';
      btnVisual.classList.remove('active');
      btnPractice.classList.add('active');
      this.startTablePractice(this.activeTable);
    }
  }

  startTablePractice(tNum) {
    const tData = TABLES_DATA[tNum];
    this.tablePracticeIndex = 0;
    this.tablePracticeCorrect = 0;
    this.tablePracticeItems = [...tData.items].sort(() => 0.5 - Math.random()).slice(0, 5);

    this.renderNextPracticeQuestion(tNum);
  }

  renderNextPracticeQuestion(tNum) {
    const arena = document.getElementById('practiceArena');
    if (!arena) return;

    if (this.tablePracticeIndex >= this.tablePracticeItems.length) {
      // Completed practice
      const isPerfect = this.tablePracticeCorrect >= 4;
      if (!this.student.completedTables.includes(tNum)) {
        this.student.completedTables.push(tNum);
      }
      this.addScore(40, 2);

      // Check specific table achievements
      if (tNum === 2) this.unlockAchievement('maestro_doble');
      if (tNum === 5) this.unlockAchievement('manos_cinco');
      if (tNum === 9) this.unlockAchievement('super_nueve');

      if (window.snd) {
        window.snd.play('victory');
        window.snd.speak(`¡Excelente! Has dominado la tabla del ${tNum}. ¡Ganaste 40 puntos y 2 estrellas!`);
      }
      this.fireConfetti();

      arena.innerHTML = `
        <div class="victory-box animate-pop">
          <div class="trophy-bounce">🌟</div>
          <h2>¡TABLA DEL ${tNum} DOMINADA!</h2>
          <p>Acertaste ${this.tablePracticeCorrect} de 5 preguntas. Tu comprensión de esta tabla es maravillosa.</p>
          <div class="reward-pill">+40 Puntos y 2 Estrellas ⭐⭐</div>
          <div class="modal-buttons" style="margin-top: 20px;">
            <button class="btn-primary" onclick="window.app.selectTableToLearn(${Math.min(10, tNum + 1)})">
              Siguiente Tabla (${Math.min(10, tNum + 1)}) ➔
            </button>
            <button class="btn-subtle" onclick="window.app.startTablePractice(${tNum})">Practicar de Nuevo</button>
          </div>
        </div>
      `;
      return;
    }

    const currentItem = this.tablePracticeItems[this.tablePracticeIndex];
    const correctRes = currentItem.res;

    // Distractors
    const optionsSet = new Set([correctRes]);
    while (optionsSet.size < 4) {
      const diff = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1) * tNum;
      const fake = Math.max(2, correctRes + diff);
      if (fake !== correctRes) optionsSet.add(fake);
    }
    const options = Array.from(optionsSet).sort(() => 0.5 - Math.random());

    arena.innerHTML = `
      <div class="practice-question-card animate-pop">
        <div class="practice-q-header">
          <span>Pregunta ${this.tablePracticeIndex + 1} de 5</span>
          <span>Aciertos: ${this.tablePracticeCorrect}</span>
        </div>
        <div class="practice-formula">${currentItem.a} × ${currentItem.b} = ?</div>
        <p class="practice-hint-text">💡 Pista contextual: ${currentItem.context}</p>

        <div class="practice-options-grid">
          ${options.map(opt => `
            <button class="btn-practice-option" onclick="window.app.checkPracticeAnswer(${tNum}, ${opt}, ${correctRes})">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div id="practiceFeedbackMsg" class="practice-feedback-box"></div>
      </div>
    `;

    if (window.snd) {
      window.snd.play('select');
      window.snd.speak(`¿Cuánto es ${currentItem.a} por ${currentItem.b}?`);
    }
  }

  checkPracticeAnswer(tNum, chosen, correct) {
    const feedback = document.getElementById('practiceFeedbackMsg');
    const buttons = document.querySelectorAll('.btn-practice-option');
    buttons.forEach(b => b.disabled = true);

    if (chosen === correct) {
      if (window.snd) {
        window.snd.play('correct');
        window.snd.speak('¡Muy bien! Respuesta correcta.');
      }
      this.tablePracticeCorrect++;
      feedback.innerHTML = `<span style="color: #10AC84; font-weight: bold;">✔ ¡Excelente! ${chosen} es la respuesta correcta.</span>`;
    } else {
      if (window.snd) {
        window.snd.play('wrong');
        window.snd.speak(`Casi lo logras. La respuesta correcta era ${correct}.`);
      }
      feedback.innerHTML = `<span style="color: #E84118; font-weight: bold;">✖ ¡Buen intento! La respuesta correcta era ${correct}.</span>`;
    }

    setTimeout(() => {
      this.tablePracticeIndex++;
      this.renderNextPracticeQuestion(tNum);
    }, 1300);
  }

  // 3. GAMES HUB
  renderGamesMenu() {
    const container = document.getElementById('gamesContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="section-title-bar">
        <h2>🎮 Sala de Juegos y Desafíos Matemáticos</h2>
        <p>Juega, diviértete y gana puntos sin ejercicios repetitivos. ¡Elige tu desafío!</p>
      </div>

      <div class="games-selection-grid">
        <!-- Game 1: Memoria Matemática -->
        <div class="game-pick-card" onclick="window.app.launchGame('memory')">
          <div class="game-pick-icon" style="background: #F3EEFF; color: #6C5CE7;">🧩</div>
          <h3>Memoria Matemática</h3>
          <p>Encuentra las parejas de cartas asociando cada multiplicación con su producto.</p>
          <span class="game-pill">+60 Pts • Concentración</span>
        </div>

        <!-- Game 2: Atrapa el Resultado -->
        <div class="game-pick-card" onclick="window.app.launchGame('catch')">
          <div class="game-pick-icon" style="background: #E8F8F5; color: #00B894;">🎯</div>
          <h3>Atrapa el Resultado</h3>
          <p>Las respuestas flotan como burbujas. ¡Haz clic rápidamente en la correcta!</p>
          <span class="game-pill">+40 Pts • Reflejos</span>
        </div>

        <!-- Game 3: Construye la Multiplicación -->
        <div class="game-pick-card" onclick="window.app.launchGame('build')">
          <div class="game-pick-icon" style="background: #FFEAA7; color: #E67E22;">🏗️</div>
          <h3>Construye la Multiplicación</h3>
          <p>Agrupa manzanas, estrellas y gemas en canastas para comprender cómo se forma.</p>
          <span class="game-pill">+50 Pts • Representación</span>
        </div>

        <!-- Game 4: Detective Matemático -->
        <div class="game-pick-card" onclick="window.app.launchGame('detective')">
          <div class="game-pick-icon" style="background: #DFE4EA; color: #2F3542;">🕵️</div>
          <h3>Detective Numérico</h3>
          <p>Lee las pistas lógicas y descubre al número sospechoso oculto.</p>
          <span class="game-pill">+50 Pts • Lógica</span>
        </div>

        <!-- Game 5: Desafío Contrarreloj -->
        <div class="game-pick-card" onclick="window.app.launchGame('time')">
          <div class="game-pick-icon" style="background: #FFD8D8; color: #E84118;">⚡</div>
          <h3>Desafío Contrarreloj (45s)</h3>
          <p>¿Cuántas multiplicaciones puedes resolver antes de que el reloj marque cero?</p>
          <span class="game-pill">+Récord • Velocidad</span>
        </div>
      </div>

      <!-- Active Game Play Area Container -->
      <div id="gamePlayArea" class="game-play-area"></div>
    `;
  }

  launchGame(gameKey) {
    const playArea = document.getElementById('gamePlayArea');
    if (!playArea) return;
    playArea.scrollIntoView({ behavior: 'smooth' });

    if (gameKey === 'memory') window.gameCtrl.startMemoryGame();
    if (gameKey === 'catch') window.gameCtrl.startCatchGame();
    if (gameKey === 'build') window.gameCtrl.startBuildGame();
    if (gameKey === 'detective') window.gameCtrl.startDetectiveGame();
    if (gameKey === 'time') window.gameCtrl.startTimeChallenge();
  }

  // 4. PROGRESS DASHBOARD
  renderProgress() {
    const container = document.getElementById('progressContainer');
    if (!container) return;

    const completed = this.student.completedTables;
    const tableNums = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const percentage = Math.round((completed.length / 9) * 100);

    container.innerHTML = `
      <div class="section-title-bar">
        <h2>📊 Mi Tablero de Progreso y Estadísticas</h2>
        <p>Observa tu avance personal, tablas dominadas y récord en el ensayo SIMCE.</p>
      </div>

      <!-- Summary Stat Counters -->
      <div class="stat-boxes-grid">
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-val">${this.student.score}</div>
          <div class="stat-label">Puntos Totales</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-val">${this.student.stars}</div>
          <div class="stat-label">Estrellas Conseguidas</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎖️</div>
          <div class="stat-val">${this.student.achievements.length} / 8</div>
          <div class="stat-label">Insignias y Medallas</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-val">${this.student.simceScore ? `${this.student.simceScore} pts` : 'Pendiente'}</div>
          <div class="stat-label">Puntaje Ensayo SIMCE</div>
        </div>
      </div>

      <!-- Individual Table Mastery Bars -->
      <div class="tables-mastery-card">
        <h3>Dominio por Tabla (2 al 10)</h3>
        <p>Completa las actividades de cada tabla para llevarla al 100% de dominio.</p>

        <div class="mastery-bars-list">
          ${tableNums.map(n => {
            const isDone = completed.includes(n);
            const pct = isDone ? 100 : 20;
            return `
              <div class="mastery-row">
                <div class="mastery-info">
                  <strong>Tabla del ${n}</strong>
                  <span>${isDone ? '✔ 100% (Completada)' : 'En aprendizaje (20%)'}</span>
                </div>
                <div class="mastery-bar-track">
                  <div class="mastery-bar-fill ${isDone ? 'done' : ''}" style="width: ${pct}%;"></div>
                </div>
                <button class="btn-micro" onclick="window.app.showSection('learn'); window.app.selectTableToLearn(${n})">
                  ${isDone ? 'Repasar' : 'Aprender'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 5. ACHIEVEMENTS & REWARDS
  renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="section-title-bar">
        <h2>🏆 Salón de Logros y Recompensas</h2>
        <p>Desbloquea medallas y trofeos cumpliendo metas en tus aventuras matemáticas.</p>
      </div>

      <div class="achievements-grid">
        ${ACHIEVEMENTS_DATA.map(ach => {
          const unlocked = this.student.achievements.includes(ach.id);
          return `
            <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
              <div class="ach-badge-icon">${ach.icon}</div>
              <h4>${ach.title}</h4>
              <p class="ach-desc">${ach.desc}</p>
              <div class="ach-condition">Meta: ${ach.req}</div>
              <div class="ach-status-pill">${unlocked ? '🌟 ¡Desbloqueado!' : '🔒 Bloqueado'}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* ============================================================
     CONFETTI ANIMATION ENGINE (Lightweight Canvas Particle System)
     ============================================================ */
  fireConfetti() {
    let canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confettiCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#6C5CE7', '#FF8E53', '#00CEC9'];

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    let frameCount = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rSpeed;
        p.alpha -= 0.012;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      });

      if (frameCount < 80) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animate);
  }

  bindEvents() {
    // Sound toggle in topbar
    const soundBtn = document.getElementById('navSoundBtn');
    if (soundBtn) {
      soundBtn.onclick = () => {
        if (window.snd) {
          window.snd.toggleSound();
          this.updateHeaderUI();
        }
      };
    }

    // Voice toggle in topbar
    const voiceBtn = document.getElementById('navVoiceBtn');
    if (voiceBtn) {
      voiceBtn.onclick = () => {
        if (window.snd) {
          window.snd.toggleVoice();
          this.updateHeaderUI();
        }
      };
    }

    // Logout / Switch student
    const logoutBtn = document.getElementById('navLogoutBtn');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        if (confirm('¿Deseas cambiar de estudiante o salir al inicio?')) {
          window.location.href = '../index.html';
        }
      };
    }
  }
}

// Instantiate and initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
  window.app.init();
});
