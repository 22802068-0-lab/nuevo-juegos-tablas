/**
 * simce.js - Ensayo Matemático Tipo SIMCE 4° Básico
 * Panel lateral de navegación (preguntas 1-10), registro de respuestas,
 * cálculo de puntaje estandarizado y retroalimentación pedagógica detallada.
 */

class SimceController {
  constructor() {
    this.questions = SIMCE_QUESTIONS;
    this.currentQuestionIndex = 0;
    this.userAnswers = {}; // { questionId: "A" | "B" | "C" | "D" }
    this.isCompleted = false;
  }

  startTest() {
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.isCompleted = false;

    const mainContainer = document.getElementById('simceArea');
    if (!mainContainer) return;

    mainContainer.innerHTML = `
      <div class="simce-layout">
        <!-- Sidebar Navigation (1 to 10) -->
        <aside class="simce-sidebar">
          <div class="sidebar-header">
            <h4>📋 Preguntas (1-10)</h4>
            <span class="answered-badge" id="simceAnsweredCount">0 de 10 respondidas</span>
          </div>
          <div class="question-nav-grid" id="simceNavGrid">
            ${this.questions.map((q, idx) => `
              <button class="nav-q-btn ${idx === 0 ? 'current' : ''}" id="navBtn-${idx}" onclick="window.simceCtrl.goToQuestion(${idx})">
                <span class="q-num">${idx + 1}</span>
                <span class="q-status" id="navStatus-${idx}">⚪</span>
              </button>
            `).join('')}
          </div>
          <div class="simce-info-box">
            <p>💡 Puedes cambiar de pregunta libremente antes de finalizar.</p>
          </div>
        </aside>

        <!-- Main Question Area -->
        <section class="simce-main-content" id="simceContent">
          <!-- Rendered dynamically -->
        </section>
      </div>
    `;

    this.renderCurrentQuestion();

    if (window.snd) {
      window.snd.play('select');
      window.snd.speak('Comenzando Ensayo Tipo SIMCE de 4° Básico. Lee atentamente cada situación problema.');
    }
  }

  renderCurrentQuestion() {
    const q = this.questions[this.currentQuestionIndex];
    const totalQ = this.questions.length;
    const selectedAnswer = this.userAnswers[q.id];

    // Update navigation sidebar buttons
    for (let i = 0; i < totalQ; i++) {
      const btn = document.getElementById(`navBtn-${i}`);
      const statusSpan = document.getElementById(`navStatus-${i}`);
      if (btn) {
        btn.classList.toggle('current', i === this.currentQuestionIndex);
        const answered = this.userAnswers[this.questions[i].id];
        btn.classList.toggle('answered', Boolean(answered));
        if (statusSpan) {
          statusSpan.textContent = answered ? '✔' : '⚪';
        }
      }
    }

    const answeredCount = Object.keys(this.userAnswers).length;
    const counterEl = document.getElementById('simceAnsweredCount');
    if (counterEl) {
      counterEl.textContent = `${answeredCount} de ${totalQ} respondidas`;
    }

    const contentArea = document.getElementById('simceContent');
    contentArea.innerHTML = `
      <div class="simce-question-card animate-pop">
        <div class="q-top-bar">
          <span class="q-badge">Pregunta ${this.currentQuestionIndex + 1} de ${totalQ}</span>
          <span class="q-topic-tag">${q.imageIcon} ${q.topic}</span>
        </div>

        <div class="q-context-box">
          <p class="q-context-text">${q.context}</p>
          <h3 class="q-statement">${q.question}</h3>
        </div>

        <div class="options-container">
          ${q.options.map(opt => `
            <div class="simce-option-card ${selectedAnswer === opt.id ? 'selected' : ''}" onclick="window.simceCtrl.selectOption('${q.id}', '${opt.id}')">
              <span class="opt-letter">${opt.id}</span>
              <span class="opt-text">${opt.text}</span>
            </div>
          `).join('')}
        </div>

        <!-- Controls Bar -->
        <div class="q-navigation-actions">
          <button class="btn-subtle" ${this.currentQuestionIndex === 0 ? 'disabled style="opacity:0.4;"' : ''} onclick="window.simceCtrl.prevQuestion()">
            ⬅️ Anterior
          </button>

          <div style="display:flex; gap: 10px;">
            ${this.currentQuestionIndex < totalQ - 1 ? `
              <button class="btn-primary" onclick="window.simceCtrl.nextQuestion()">
                Siguiente ➡️
              </button>
            ` : `
              <button class="btn-finish-test" onclick="window.simceCtrl.confirmFinish()">
                🏁 Finalizar Ensayo
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    if (window.snd) {
      window.snd.play('click');
    }
  }

  selectOption(questionId, optionId) {
    this.userAnswers[questionId] = optionId;
    if (window.snd) {
      window.snd.play('select');
    }
    this.renderCurrentQuestion();
  }

  goToQuestion(idx) {
    if (idx >= 0 && idx < this.questions.length) {
      this.currentQuestionIndex = idx;
      this.renderCurrentQuestion();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.goToQuestion(this.currentQuestionIndex - 1);
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.goToQuestion(this.currentQuestionIndex + 1);
    }
  }

  confirmFinish() {
    const answeredCount = Object.keys(this.userAnswers).length;
    const totalQ = this.questions.length;

    if (answeredCount < totalQ) {
      const remaining = totalQ - answeredCount;
      if (window.snd) {
        window.snd.play('wrong');
        window.snd.speak(`Aún te faltan ${remaining} preguntas por responder. ¿Deseas revisarlas o finalizar ahora?`);
      }
      if (confirm(`Aún tienes ${remaining} pregunta(s) sin responder. ¿Deseas finalizar de todas formas?`)) {
        this.calculateAndShowResults();
      }
    } else {
      this.calculateAndShowResults();
    }
  }

  calculateAndShowResults() {
    this.isCompleted = true;
    let correctCount = 0;
    const resultsBreakdown = [];

    this.questions.forEach((q, idx) => {
      const studentAns = this.userAnswers[q.id] || "Sin responder";
      const isCorrect = studentAns === q.correct;
      if (isCorrect) correctCount++;

      resultsBreakdown.push({
        num: idx + 1,
        topic: q.topic,
        icon: q.imageIcon,
        context: q.context,
        question: q.question,
        studentAns: studentAns,
        correctAns: q.correct,
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    // Score scale SIMCE (Base 200, Max 320 for 10 items)
    const simceScore = 200 + (correctCount * 12);
    let levelLabel = "Insuficiente";
    let levelColor = "#E84118";
    let levelMsg = "¡No te desanimes! Sigue practicando las tablas con los juegos interactivos para reforzar.";

    if (correctCount >= 8) {
      levelLabel = "Adecuado (Excelente)";
      levelColor = "#10AC84";
      levelMsg = "¡Extraordinario! Demostraste un dominio sólido en resolución de problemas multiplicativos tipo SIMCE.";
      window.app.unlockAchievement('campeon_simce');
    } else if (correctCount >= 5) {
      levelLabel = "Elemental (Bueno)";
      levelColor = "#F39C12";
      levelMsg = "¡Buen trabajo! Tienes bases claras y estás a pocos pasos de alcanzar el nivel avanzado.";
    }

    // Award platform points
    const earnedPoints = correctCount * 15;
    window.app.addScore(earnedPoints, correctCount >= 8 ? 5 : 2);
    window.app.updateSimceScore(simceScore, correctCount);

    if (window.snd) {
      window.snd.play('victory');
      window.snd.speak(`¡Ensayo finalizado! Obtuviste ${correctCount} respuestas correctas de 10. Puntaje SIMCE estimado: ${simceScore} puntos. Nivel ${levelLabel}.`);
    }
    window.app.fireConfetti();

    const mainContainer = document.getElementById('simceArea');
    mainContainer.innerHTML = `
      <div class="simce-results-view animate-pop">
        <!-- Results Hero Banner -->
        <div class="simce-hero-card">
          <img src="IMAGEN/trophy_simce.svg" alt="Trofeo SIMCE" class="simce-trophy-img animate-bounce">
          <h2>¡RESULTADOS ENSAYO SIMCE MATEMÁTICA!</h2>
          <p class="simce-sub">Evaluación Contextualizada de Multiplicación • 4° Básico</p>
          
          <div class="score-summary-grid">
            <div class="score-stat-box">
              <span class="stat-num">${correctCount} / 10</span>
              <span class="stat-desc">Respuestas Correctas</span>
            </div>
            <div class="score-stat-box highlight">
              <span class="stat-num">${simceScore} pts</span>
              <span class="stat-desc">Puntaje Estimado SIMCE</span>
            </div>
            <div class="score-stat-box" style="border-color: ${levelColor};">
              <span class="stat-num" style="color: ${levelColor}; font-size: 20px;">${levelLabel}</span>
              <span class="stat-desc">Nivel de Logro</span>
            </div>
          </div>

          <p class="simce-feedback-text">${levelMsg}</p>
        </div>

        <!-- Detailed Pedagogical Feedback for each question -->
        <div class="feedback-section">
          <h3>📝 Retroalimentación Detallada Pregunta por Pregunta:</h3>
          <p class="feedback-sub">Revisa cada situación para entender la forma correcta de resolverla.</p>

          <div class="feedback-list">
            ${resultsBreakdown.map(item => `
              <div class="feedback-item ${item.isCorrect ? 'correct-item' : 'wrong-item'}">
                <div class="fb-header">
                  <span class="fb-num">Pregunta ${item.num} (${item.topic})</span>
                  <span class="fb-badge ${item.isCorrect ? 'badge-ok' : 'badge-bad'}">
                    ${item.isCorrect ? '✔ Correcta' : '✖ Incorrecta'}
                  </span>
                </div>
                <div class="fb-body">
                  <p class="fb-question">${item.icon} ${item.question}</p>
                  <div class="fb-answers-row">
                    <span>Tu respuesta: <strong>Opción ${item.studentAns}</strong></span>
                    <span>Respuesta correcta: <strong style="color: #10AC84;">Opción ${item.correctAns}</strong></span>
                  </div>
                  <div class="fb-explanation">
                    <strong>💡 Explicación paso a paso:</strong> ${item.explanation}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Navigation bottom -->
        <div class="simce-final-actions">
          <button class="btn-primary" onclick="window.simceCtrl.startTest()">🔄 Rendir Ensayo Nuevamente</button>
          <button class="btn-subtle" onclick="window.app.showSection('home')">🏠 Volver al Menú Principal</button>
        </div>
      </div>
    `;
  }
}

// Global Simce Controller Singleton
window.simceCtrl = new SimceController();
