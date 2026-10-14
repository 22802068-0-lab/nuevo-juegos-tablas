/**
 * games.js - Módulos de Juegos y Desafíos Matemáticos No Monótonos
 * Actividades lúdicas: Memoria, Atrapa el Resultado, Construye la Multiplicación,
 * Detective Numérico, Desafío Contrarreloj y Arrastra/Asocia.
 */

class MiniGamesController {
  constructor() {
    this.currentGame = null;
    this.timerInterval = null;
    this.timeLeft = 0;
    this.score = 0;
    this.currentStreak = 0;
  }

  /* ============================================================
     1. MEMORIA MATEMÁTICA (Memory Match)
     ============================================================ */
  startMemoryGame(tableNum = null) {
    this.resetTimer();
    const container = document.getElementById('gamePlayArea');
    if (!container) return;

    // Pick 6 multiplication pairs
    let pairs = [];
    const tNum = tableNum || Math.floor(Math.random() * 9) + 2;
    const table = TABLES_DATA[tNum];

    // Pick 6 random items from the table
    const shuffledItems = [...table.items].sort(() => 0.5 - Math.random()).slice(0, 6);

    shuffledItems.forEach((item, idx) => {
      pairs.push({
        id: `card-${idx}-op`,
        pairId: idx,
        type: 'op',
        content: `${item.a} × ${item.b}`,
        label: `${item.a} × ${item.b}`
      });
      pairs.push({
        id: `card-${idx}-res`,
        pairId: idx,
        type: 'res',
        content: `${item.res}`,
        label: `Resultado: ${item.res}`
      });
    });

    // Shuffle cards
    pairs.sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="game-header-bar">
        <div>
          <h3>🧩 Memoria Matemática - Tabla del ${tNum}</h3>
          <p>Encuentra las parejas: relaciona cada multiplicación con su resultado correcto.</p>
        </div>
        <div class="game-stats-pill">
          <span>Parejas: <strong id="memMatches">0</strong> / 6</span>
          <span>Intentos: <strong id="memTries">0</strong></span>
        </div>
      </div>
      <div class="memory-grid" id="memoryGrid"></div>
      <div class="game-footer-actions">
        <button class="btn-subtle" onclick="window.gameCtrl.startMemoryGame(${tableNum})">🔄 Reiniciar Tablero</button>
        <button class="btn-subtle" onclick="window.app.showSection('games')">⬅️ Volver a Juegos</button>
      </div>
    `;

    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = pairs.map(card => `
      <div class="memory-card" data-id="${card.id}" data-pair="${card.pairId}" onclick="window.gameCtrl.flipCard(this)">
        <div class="card-inner">
          <div class="card-front">❓</div>
          <div class="card-back ${card.type === 'op' ? 'back-op' : 'back-res'}">
            <span>${card.content}</span>
          </div>
        </div>
      </div>
    `).join('');

    this.memState = {
      flipped: [],
      matchedCount: 0,
      tries: 0,
      tNum: tNum
    };

    if (window.snd) {
      window.snd.play('select');
      window.snd.speak(`Memoria matemática de la tabla del ${tNum}. ¡Encuentra todas las parejas!`);
    }
  }

  flipCard(cardEl) {
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (this.memState.flipped.length >= 2) return;

    if (window.snd) window.snd.play('cardFlip');
    cardEl.classList.add('flipped');
    this.memState.flipped.push(cardEl);

    if (this.memState.flipped.length === 2) {
      this.memState.tries++;
      document.getElementById('memTries').textContent = this.memState.tries;

      const [card1, card2] = this.memState.flipped;
      const pair1 = card1.getAttribute('data-pair');
      const pair2 = card2.getAttribute('data-pair');

      if (pair1 === pair2) {
        // MATCH!
        setTimeout(() => {
          if (window.snd) window.snd.play('correct');
          card1.classList.add('matched');
          card2.classList.add('matched');
          this.memState.matchedCount++;
          document.getElementById('memMatches').textContent = this.memState.matchedCount;
          this.memState.flipped = [];

          if (this.memState.matchedCount === 6) {
            this.handleMemoryVictory();
          }
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          if (window.snd) window.snd.play('wrong');
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          this.memState.flipped = [];
        }, 1100);
      }
    }
  }

  handleMemoryVictory() {
    setTimeout(() => {
      if (window.snd) {
        window.snd.play('victory');
        window.snd.speak('¡Increíble memoria! Has completado el tablero. ¡Ganaste 60 puntos!');
      }
      window.app.addScore(60, 2);
      window.app.unlockAchievement('memoria_de_elefante');
      window.app.fireConfetti();

      const container = document.getElementById('gamePlayArea');
      container.innerHTML = `
        <div class="victory-box animate-pop">
          <div class="trophy-bounce">🏆</div>
          <h2>¡MEMORIA DE ELEFANTE!</h2>
          <p>Completaste todas las 6 parejas de la tabla del ${this.memState.tNum} en ${this.memState.tries} intentos.</p>
          <div class="reward-pill">+60 Puntos y 2 Estrellas ⭐⭐</div>
          <div class="modal-buttons" style="margin-top: 20px;">
            <button class="btn-primary" onclick="window.gameCtrl.startMemoryGame()">🎮 Jugar Otra Tabla</button>
            <button class="btn-subtle" onclick="window.app.showSection('games')">Volver al Menú</button>
          </div>
        </div>
      `;
    }, 600);
  }

  /* ============================================================
     2. ATRAPA EL RESULTADO (Catch the Result)
     ============================================================ */
  startCatchGame() {
    this.resetTimer();
    const container = document.getElementById('gamePlayArea');
    if (!container) return;

    this.catchScore = 0;
    this.catchRound = 1;
    this.maxCatchRounds = 8;

    container.innerHTML = `
      <div class="game-header-bar">
        <div>
          <h3>🎯 Atrapa el Resultado</h3>
          <p>Haz clic rápidamente sobre la burbuja con el resultado correcto.</p>
        </div>
        <div class="game-stats-pill">
          <span>Ronda: <strong id="catchRound">1</strong> / 8</span>
          <span>Aciertos: <strong id="catchScore">0</strong></span>
        </div>
      </div>
      <div class="catch-arena" id="catchArena">
        <div class="catch-target-box">
          <span class="target-label">Calcula:</span>
          <div class="target-op" id="catchOp">6 × 4 = ?</div>
        </div>
        <div class="bubbles-container" id="bubblesContainer"></div>
      </div>
      <div class="game-footer-actions">
        <button class="btn-subtle" onclick="window.app.showSection('games')">⬅️ Salir</button>
      </div>
    `;

    this.nextCatchRound();
  }

  nextCatchRound() {
    if (this.catchRound > this.maxCatchRounds) {
      this.handleCatchVictory();
      return;
    }

    document.getElementById('catchRound').textContent = this.catchRound;

    // Pick random multiplication
    const tA = Math.floor(Math.random() * 9) + 2; // 2 to 10
    const tB = Math.floor(Math.random() * 9) + 2;
    const correctRes = tA * tB;

    document.getElementById('catchOp').textContent = `${tA} × ${tB} = ?`;
    if (window.snd) {
      window.snd.play('select');
      window.snd.speak(`¿Cuánto es ${tA} por ${tB}?`);
    }

    // Generate 4 bubbles (1 correct, 3 plausible distractors)
    const distractors = new Set();
    distractors.add(correctRes);

    while (distractors.size < 4) {
      const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 2 : tA);
      const val = Math.max(2, correctRes + offset);
      if (val !== correctRes) distractors.add(val);
    }

    const options = Array.from(distractors).sort(() => 0.5 - Math.random());
    const bContainer = document.getElementById('bubblesContainer');
    bContainer.innerHTML = '';

    const colors = ['#FF6B6B', '#4ECDC4', '#FFA502', '#A29BFE'];

    options.forEach((val, idx) => {
      const bubble = document.createElement('div');
      bubble.className = 'catch-bubble animate-float';
      bubble.style.background = colors[idx % colors.length];
      bubble.style.animationDelay = `${idx * 0.2}s`;
      bubble.innerHTML = `<span>${val}</span>`;
      bubble.onclick = () => this.handleCatchClick(bubble, val, correctRes);
      bContainer.appendChild(bubble);
    });
  }

  handleCatchClick(bubbleEl, chosenVal, correctVal) {
    if (bubbleEl.dataset.answered) return;
    bubbleEl.dataset.answered = 'true';

    if (chosenVal === correctVal) {
      if (window.snd) {
        window.snd.play('correct');
        window.snd.play('bubble');
      }
      bubbleEl.classList.add('pop-correct');
      this.catchScore++;
      document.getElementById('catchScore').textContent = this.catchScore;
      window.app.addScore(15, 0);

      setTimeout(() => {
        this.catchRound++;
        this.nextCatchRound();
      }, 700);
    } else {
      if (window.snd) window.snd.play('wrong');
      bubbleEl.classList.add('shake');
      bubbleEl.style.opacity = '0.4';
    }
  }

  handleCatchVictory() {
    if (window.snd) {
      window.snd.play('victory');
      window.snd.speak(`¡Excelente puntería! Acertaste ${this.catchScore} de ${this.maxCatchRounds} resultados.`);
    }
    window.app.addScore(40, 2);
    window.app.fireConfetti();

    const container = document.getElementById('gamePlayArea');
    container.innerHTML = `
      <div class="victory-box animate-pop">
        <div class="trophy-bounce">🎯</div>
        <h2>¡DESAFÍO COMPLETADO!</h2>
        <p>Atrapaste ${this.catchScore} de ${this.maxCatchRounds} respuestas correctas con gran velocidad.</p>
        <div class="reward-pill">+40 Puntos y 2 Estrellas ⭐⭐</div>
        <div class="modal-buttons" style="margin-top: 20px;">
          <button class="btn-primary" onclick="window.gameCtrl.startCatchGame()">🎯 Jugar Otra Vez</button>
          <button class="btn-subtle" onclick="window.app.showSection('games')">Volver al Menú</button>
        </div>
      </div>
    `;
  }

  /* ============================================================
     3. CONSTRUYE LA MULTIPLICACIÓN (Concrete Representation COPISI)
     ============================================================ */
  startBuildGame() {
    this.resetTimer();
    const container = document.getElementById('gamePlayArea');
    if (!container) return;

    this.buildRound = 1;
    this.buildMaxRounds = 5;

    container.innerHTML = `
      <div class="game-header-bar">
        <div>
          <h3>🏗️ Construye la Multiplicación</h3>
          <p>Agrupa los objetos en canastas para entender cómo se forma la multiplicación.</p>
        </div>
        <div class="game-stats-pill">
          <span>Misión: <strong id="buildRound">1</strong> / 5</span>
        </div>
      </div>
      <div class="build-arena" id="buildArena">
        <div class="build-prompt" id="buildPrompt"></div>
        <div class="baskets-wrapper" id="basketsWrapper"></div>
        <div class="build-verify-bar" id="buildVerifyBar"></div>
      </div>
      <div class="game-footer-actions">
        <button class="btn-subtle" onclick="window.app.showSection('games')">⬅️ Salir</button>
      </div>
    `;

    this.nextBuildRound();
  }

  nextBuildRound() {
    if (this.buildRound > this.buildMaxRounds) {
      this.handleBuildVictory();
      return;
    }

    document.getElementById('buildRound').textContent = this.buildRound;

    const missions = [
      { groups: 3, perGroup: 4, icon: "🍎", name: "manzanas" },
      { groups: 4, perGroup: 3, icon: "⭐", name: "estrellas" },
      { groups: 5, perGroup: 2, icon: "🍪", name: "galletas" },
      { groups: 2, perGroup: 6, icon: "🍕", name: "porciones de pizza" },
      { groups: 3, perGroup: 5, icon: "💎", name: "gemas mágicas" }
    ];

    const currentMission = missions[this.buildRound - 1];
    this.activeMission = {
      ...currentMission,
      basketCounts: new Array(currentMission.groups).fill(0)
    };

    const promptEl = document.getElementById('buildPrompt');
    promptEl.innerHTML = `
      <div class="mission-callout">
        <span>¡Coloca <strong>${currentMission.perGroup} ${currentMission.name}</strong> en cada una de las <strong>${currentMission.groups} canastas</strong>!</span>
      </div>
    `;

    if (window.snd) {
      window.snd.play('select');
      window.snd.speak(`Coloca ${currentMission.perGroup} ${currentMission.name} en cada una de las ${currentMission.groups} canastas.`);
    }

    const wrapper = document.getElementById('basketsWrapper');
    wrapper.innerHTML = '';

    for (let i = 0; i < currentMission.groups; i++) {
      const b = document.createElement('div');
      b.className = 'basket-card';
      b.id = `basket-${i}`;
      b.innerHTML = `
        <div class="basket-title">🧺 Canasta ${i + 1}</div>
        <div class="basket-items" id="basket-items-${i}"></div>
        <div class="basket-controls">
          <button class="btn-item-action" onclick="window.gameCtrl.modifyBasket(${i}, 1)">+ Agregar ${currentMission.icon}</button>
          <button class="btn-item-action subtle" onclick="window.gameCtrl.modifyBasket(${i}, -1)">- Quitar</button>
        </div>
        <div class="basket-count" id="bcount-${i}">0 / ${currentMission.perGroup}</div>
      `;
      wrapper.appendChild(b);
    }

    this.renderBuildVerification();
  }

  modifyBasket(basketIdx, change) {
    const cur = this.activeMission.basketCounts[basketIdx];
    const next = Math.max(0, Math.min(8, cur + change));
    this.activeMission.basketCounts[basketIdx] = next;

    if (window.snd) {
      window.snd.play(change > 0 ? 'bubble' : 'click');
    }

    const itemsContainer = document.getElementById(`basket-items-${basketIdx}`);
    itemsContainer.innerHTML = '';
    for (let j = 0; j < next; j++) {
      const sp = document.createElement('span');
      sp.className = 'basket-icon-item animate-pop';
      sp.textContent = this.activeMission.icon;
      itemsContainer.appendChild(sp);
    }

    const counter = document.getElementById(`bcount-${basketIdx}`);
    counter.textContent = `${next} / ${this.activeMission.perGroup}`;
    if (next === this.activeMission.perGroup) {
      counter.style.color = '#10AC84';
      counter.style.fontWeight = 'bold';
    } else {
      counter.style.color = '#718096';
      counter.style.fontWeight = 'normal';
    }

    this.renderBuildVerification();
  }

  renderBuildVerification() {
    const totalCurrent = this.activeMission.basketCounts.reduce((a, b) => a + b, 0);
    const targetTotal = this.activeMission.groups * this.activeMission.perGroup;
    const isAllCorrect = this.activeMission.basketCounts.every(c => c === this.activeMission.perGroup);

    const bar = document.getElementById('buildVerifyBar');
    bar.innerHTML = `
      <div class="math-relation-card">
        <div class="relation-calc">
          ${this.activeMission.groups} grupos de ${this.activeMission.perGroup} = 
          <strong>${this.activeMission.groups} × ${this.activeMission.perGroup} = ${targetTotal}</strong>
        </div>
        <div class="current-in-baskets">
          Objetos colocados: <strong>${totalCurrent}</strong> de <strong>${targetTotal}</strong>
        </div>
        <button class="btn-primary" ${!isAllCorrect ? 'disabled style="opacity: 0.5;"' : ''} onclick="window.gameCtrl.verifyBuildSuccess()">
          ${isAllCorrect ? '✅ ¡Comprobar y Continuar!' : 'Completa las canastas para continuar'}
        </button>
      </div>
    `;
  }

  verifyBuildSuccess() {
    if (window.snd) {
      window.snd.play('correct');
      window.snd.speak(`¡Excelente! ${this.activeMission.groups} por ${this.activeMission.perGroup} es igual a ${this.activeMission.groups * this.activeMission.perGroup}.`);
    }
    window.app.addScore(25, 1);
    this.buildRound++;
    setTimeout(() => {
      this.nextBuildRound();
    }, 1200);
  }

  handleBuildVictory() {
    if (window.snd) {
      window.snd.play('victory');
      window.snd.speak('¡Eres un maestro constructor de multiplicaciones! Has terminado todas las misiones.');
    }
    window.app.addScore(50, 2);
    window.app.fireConfetti();

    const container = document.getElementById('gamePlayArea');
    container.innerHTML = `
      <div class="victory-box animate-pop">
        <div class="trophy-bounce">🏗️</div>
        <h2>¡GRAN MAESTRO CONSTRUCTOR!</h2>
        <p>Demostraste que multiplicar es agrupar cantidades iguales de forma genial.</p>
        <div class="reward-pill">+50 Puntos y 2 Estrellas ⭐⭐</div>
        <div class="modal-buttons" style="margin-top: 20px;">
          <button class="btn-primary" onclick="window.gameCtrl.startBuildGame()">🏗️ Volver a Construir</button>
          <button class="btn-subtle" onclick="window.app.showSection('games')">Volver al Menú</button>
        </div>
      </div>
    `;
  }

  /* ============================================================
     4. DETECTIVE MATEMÁTICO (Clue Mystery)
     ============================================================ */
  startDetectiveGame() {
    this.resetTimer();
    const container = document.getElementById('gamePlayArea');
    if (!container) return;

    this.detectiveScore = 0;
    this.detectiveRound = 1;
    this.detectiveMax = 5;

    const mysteries = [
      {
        table: 6,
        ans: 42,
        clues: [
          "Soy un número que está en la tabla del 6.",
          "Soy mayor que 35 pero menor que 50.",
          "La suma de mis dígitos es 6 (4 + 2 = 6)."
        ],
        options: [36, 42, 48, 54]
      },
      {
        table: 7,
        ans: 28,
        clues: [
          "Soy un resultado de la tabla del 7.",
          "Represento los días exactos de 4 semanas completas.",
          "Termino en el número 8."
        ],
        options: [21, 28, 35, 42]
      },
      {
        table: 9,
        ans: 54,
        clues: [
          "Estoy en la tabla mágica del 9.",
          "Mi decena es 5.",
          "Si sumas mis dos dígitos da 9 (5 + 4 = 9)."
        ],
        options: [45, 54, 63, 72]
      },
      {
        table: 8,
        ans: 56,
        clues: [
          "Pertenezco a la tabla del 8 y también a la del 7.",
          "En la rima de los números soy: ¡5, 6, 7, 8!",
          "Soy mayor que 50 y menor que 60."
        ],
        options: [48, 56, 64, 72]
      },
      {
        table: 4,
        ans: 36,
        clues: [
          "Soy el resultado de 4 veces 9.",
          "También aparezco en la tabla del 6.",
          "Mi dígito de las unidades es 6."
        ],
        options: [24, 28, 32, 36]
      }
    ];

    this.mysteries = mysteries;

    container.innerHTML = `
      <div class="game-header-bar">
        <div>
          <h3>🕵️ Detective Matemático</h3>
          <p>Lee las pistas y descubre el número misterioso que se oculta.</p>
        </div>
        <div class="game-stats-pill">
          <span>Caso: <strong id="detRound">1</strong> / 5</span>
          <span>Resueltos: <strong id="detScore">0</strong></span>
        </div>
      </div>
      <div class="detective-arena" id="detectiveArena"></div>
      <div class="game-footer-actions">
        <button class="btn-subtle" onclick="window.app.showSection('games')">⬅️ Salir</button>
      </div>
    `;

    this.renderDetectiveCase();
  }

  renderDetectiveCase() {
    if (this.detectiveRound > this.detectiveMax) {
      this.handleDetectiveVictory();
      return;
    }

    document.getElementById('detRound').textContent = this.detectiveRound;
    const currentCase = this.mysteries[this.detectiveRound - 1];

    const arena = document.getElementById('detectiveArena');
    arena.innerHTML = `
      <div class="clue-board animate-pop">
        <div class="magnifier-badge">🔍 Pistas del Caso #${this.detectiveRound}</div>
        <ul class="clues-list">
          ${currentCase.clues.map((c, i) => `<li><span class="clue-tag">Pista ${i + 1}:</span> ${c}</li>`).join('')}
        </ul>
        <div class="detective-question">¿Cuál es el número sospechoso?</div>
        <div class="detective-options">
          ${currentCase.options.map(opt => `
            <button class="btn-suspect" onclick="window.gameCtrl.checkDetectiveAnswer(${opt}, ${currentCase.ans})">
              🕵️ ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    if (window.snd) {
      window.snd.play('select');
      window.snd.speak(`Caso número ${this.detectiveRound}. Analiza las pistas y descubre el número.`);
    }
  }

  checkDetectiveAnswer(chosen, correct) {
    if (chosen === correct) {
      if (window.snd) {
        window.snd.play('correct');
        window.snd.speak(`¡Caso resuelto! El número misterioso era efectivamente ${correct}.`);
      }
      this.detectiveScore++;
      document.getElementById('detScore').textContent = this.detectiveScore;
      window.app.addScore(25, 1);

      this.detectiveRound++;
      setTimeout(() => {
        this.renderDetectiveCase();
      }, 1000);
    } else {
      if (window.snd) {
        window.snd.play('wrong');
        window.snd.speak('Ese número no cumple todas las pistas. ¡Vuelve a leer con atención!');
      }
    }
  }

  handleDetectiveVictory() {
    if (window.snd) {
      window.snd.play('victory');
      window.snd.speak('¡Felicidades Detective! Resolviste todos los misterios numéricos con éxito.');
    }
    window.app.addScore(50, 2);
    window.app.unlockAchievement('detective_experto');
    window.app.fireConfetti();

    const container = document.getElementById('gamePlayArea');
    container.innerHTML = `
      <div class="victory-box animate-pop">
        <div class="trophy-bounce">🕵️</div>
        <h2>¡CASOS 100% RESUELTOS!</h2>
        <p>Tu agilidad mental y razonamiento matemático son dignos de un gran detective.</p>
        <div class="reward-pill">+50 Puntos y 2 Estrellas ⭐⭐</div>
        <div class="modal-buttons" style="margin-top: 20px;">
          <button class="btn-primary" onclick="window.gameCtrl.startDetectiveGame()">🔍 Resolver Nuevos Casos</button>
          <button class="btn-subtle" onclick="window.app.showSection('games')">Volver al Menú</button>
        </div>
      </div>
    `;
  }

  /* ============================================================
     5. DESAFÍO CONTRARRELOJ (Time Rush)
     ============================================================ */
  startTimeChallenge() {
    this.resetTimer();
    const container = document.getElementById('gamePlayArea');
    if (!container) return;

    this.timeScore = 0;
    this.timeLeft = 45;

    container.innerHTML = `
      <div class="game-header-bar">
        <div>
          <h3>⚡ Desafío Contrarreloj (45 seg)</h3>
          <p>¡Responde la mayor cantidad de multiplicaciones antes de que se agote el tiempo!</p>
        </div>
        <div class="game-stats-pill">
          <span>Tiempo: <strong id="timerText" class="timer-badge">45s</strong></span>
          <span>Aciertos: <strong id="timeScoreText">0</strong></span>
        </div>
      </div>
      <div class="time-rush-arena">
        <div class="time-progress-bar-wrap">
          <div class="time-progress-bar" id="timeProgress" style="width: 100%;"></div>
        </div>
        <div class="time-card animate-pop" id="timeQuestionCard"></div>
      </div>
      <div class="game-footer-actions">
        <button class="btn-subtle" onclick="window.gameCtrl.stopTimeChallenge()">⬅️ Rendirse / Salir</button>
      </div>
    `;

    if (window.snd) {
      window.snd.play('victory');
      window.snd.speak('¡Preparados, listos, ya! ¡Responde rápido!');
    }

    this.nextTimeQuestion();

    // Start 45s countdown
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      const timerEl = document.getElementById('timerText');
      const barEl = document.getElementById('timeProgress');

      if (timerEl) timerEl.textContent = `${this.timeLeft}s`;
      if (barEl) barEl.style.width = `${(this.timeLeft / 45) * 100}%`;

      if (this.timeLeft <= 10 && this.timeLeft > 0) {
        if (window.snd) window.snd.play('tick');
        if (timerEl) timerEl.classList.add('urgent');
      }

      if (this.timeLeft <= 0) {
        this.stopTimeChallenge();
        this.handleTimeVictory();
      }
    }, 1000);
  }

  nextTimeQuestion() {
    if (this.timeLeft <= 0) return;

    const tA = Math.floor(Math.random() * 9) + 2;
    const tB = Math.floor(Math.random() * 9) + 2;
    const correctAns = tA * tB;

    const distractors = new Set([correctAns]);
    while (distractors.size < 4) {
      const diff = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1) * 2;
      const val = Math.max(2, correctAns + diff);
      if (val !== correctAns) distractors.add(val);
    }

    const options = Array.from(distractors).sort(() => 0.5 - Math.random());
    const cardEl = document.getElementById('timeQuestionCard');
    if (!cardEl) return;

    cardEl.innerHTML = `
      <div class="rush-formula">${tA} × ${tB} = ?</div>
      <div class="rush-options-grid">
        ${options.map(opt => `
          <button class="btn-rush-option" onclick="window.gameCtrl.answerTimeQuestion(${opt}, ${correctAns})">
            ${opt}
          </button>
        `).join('')}
      </div>
    `;
  }

  answerTimeQuestion(chosen, correct) {
    if (chosen === correct) {
      if (window.snd) window.snd.play('correct');
      this.timeScore++;
      document.getElementById('timeScoreText').textContent = this.timeScore;
      window.app.addScore(10, 0);
    } else {
      if (window.snd) window.snd.play('wrong');
    }
    this.nextTimeQuestion();
  }

  stopTimeChallenge() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleTimeVictory() {
    if (window.snd) {
      window.snd.play('victory');
      window.snd.speak(`¡Tiempo cumplido! Lograste ${this.timeScore} aciertos.`);
    }
    const bonus = this.timeScore * 5;
    window.app.addScore(bonus, this.timeScore >= 8 ? 3 : 1);
    if (this.timeScore >= 8) {
      window.app.unlockAchievement('rayo_veloz');
    }
    window.app.fireConfetti();

    const container = document.getElementById('gamePlayArea');
    container.innerHTML = `
      <div class="victory-box animate-pop">
        <div class="trophy-bounce">⚡</div>
        <h2>¡TIEMPO AGOTADO!</h2>
        <p>Lograste responder correctamente <strong>${this.timeScore} multiplicaciones</strong> en 45 segundos.</p>
        <div class="reward-pill">+${bonus} Puntos de Bonificación</div>
        <div class="modal-buttons" style="margin-top: 20px;">
          <button class="btn-primary" onclick="window.gameCtrl.startTimeChallenge()">⚡ Intentar Superar Récord</button>
          <button class="btn-subtle" onclick="window.app.showSection('games')">Volver al Menú</button>
        </div>
      </div>
    `;
  }

  resetTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}

// Global Games Controller Singleton
window.gameCtrl = new MiniGamesController();
