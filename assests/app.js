// assets/app.js
// Wrapped in DOMContentLoaded to ensure DOM & questions.js are loaded.

document.addEventListener('DOMContentLoaded', () => {
  // defensive checks
  if (typeof QUESTIONS === 'undefined') {
    console.error('QUESTIONS is not defined. Make sure assets/questions.js is loaded.');
    return;
  }
  if (typeof CATEGORIES === 'undefined' || !Array.isArray(CATEGORIES)) {
    window.CATEGORIES = [...new Set(QUESTIONS.map(q=>q.category))];
  }

  // state
  let selectedCategory = null;
  let currentQuestions = [];
  let userAnswers = [];
  let currentIndex = 0;
  let timer = null;
  let timeLeft = 0;

  // DOM
  const categoryButtons = document.getElementById('categoryButtons');
  const difficultySelect = document.getElementById('difficultySelect');
  const startBtn = document.getElementById('startBtn');
  const previewBtn = document.getElementById('previewBtn');
  const landing = document.getElementById('landing');
  const quizArea = document.getElementById('quizArea');
  const resultArea = document.getElementById('resultArea');
  const questionBox = document.getElementById('questionBox');
  const optionsBox = document.getElementById('optionsBox');
  const timeLeftSpan = document.getElementById('timeLeft');
  const qIndexSpan = document.getElementById('qIndex');
  const qTotalSpan = document.getElementById('qTotal');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const navDots = document.getElementById('navDots');
  const questionTimeInput = document.getElementById('questionTime');
  const retryBtn = document.getElementById('retryBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const resTotal = document.getElementById('resTotal');
  const resCorrect = document.getElementById('resCorrect');
  const resIncorrect = document.getElementById('resIncorrect');
  const resScore = document.getElementById('resScore');
  const breakdown = document.getElementById('breakdown');
  const previewModal = document.getElementById('previewModal');
  const previewList = document.getElementById('previewList');
  const closePreviewBtn = document.getElementById('closePreviewBtn');

  // render categories as buttons
  function renderCategoryButtons(){
    if(!categoryButtons) return;
    categoryButtons.innerHTML = '';
    CATEGORIES.forEach(cat=>{
      const b = document.createElement('button');
      b.className = 'category-btn';
      b.textContent = cat;
      b.type = 'button';
      b.addEventListener('click', ()=>{
        selectedCategory = cat;
        // highlight
        document.querySelectorAll('.category-btn').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
      });
      categoryButtons.appendChild(b);
    });
  }

  function buildQuiz(){
    if(!selectedCategory){
      alert('Please choose a category first (click a tile).');
      return false;
    }
    const difficulty = difficultySelect.value;
    currentQuestions = QUESTIONS.filter(q=>q.category===selectedCategory && q.difficulty===difficulty);
    if(currentQuestions.length === 0) currentQuestions = QUESTIONS.filter(q=>q.category===selectedCategory);
    if(currentQuestions.length === 0) currentQuestions = [...QUESTIONS];
    currentQuestions = shuffle(currentQuestions).slice(0,10);
    userAnswers = currentQuestions.map(q=>({ qid:q.id, selected:null, timeSpent:0, startedAt:null }));
    return true;
  }

  function shuffle(arr){
    const a = [...arr];
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showQuestion(idx){
    clearTimer();
    currentIndex = idx;
    const q = currentQuestions[idx];
    qIndexSpan.textContent = idx+1;
    qTotalSpan.textContent = currentQuestions.length;
    questionBox.textContent = q.question;
    optionsBox.innerHTML = '';

    q.options.forEach((opt,i)=>{
      const btn = document.createElement('button');
      btn.className = 'optionBtn';
      btn.type = 'button';
      btn.dataset.index = i;
      btn.textContent = `${String.fromCharCode(65+i)}. ${opt}`;
      btn.addEventListener('click', ()=> selectOption(idx, i, btn));
      if(userAnswers[idx].selected === i) btn.classList.add('selected');
      optionsBox.appendChild(btn);
    });

    navDots.innerHTML = '';
    userAnswers.forEach((u,i)=>{
      const d = document.createElement('div');
      d.className = 'dot';
      d.textContent = i+1;
      if(i===idx) d.classList.add('current');
      if(u.selected !== null) d.style.borderColor = '#4f46e5';
      d.addEventListener('click', ()=> { recordTimeForCurrent(); showQuestion(i); });
      navDots.appendChild(d);
    });

    // start timer
    const qTime = parseInt(questionTimeInput.value,10) || 20;
    timeLeft = qTime;
    timeLeftSpan.textContent = timeLeft;
    userAnswers[idx].startedAt = Date.now();
    timer = setInterval(()=>{
      timeLeft -= 1;
      timeLeftSpan.textContent = timeLeft;
      if(timeLeft <= 0){
        recordTimeForCurrent();
        if(currentIndex < currentQuestions.length - 1) showQuestion(currentIndex + 1);
        else submitQuiz();
      }
    },1000);
  }

  function clearTimer(){
    if(timer){ clearInterval(timer); timer = null; }
  }

  function recordTimeForCurrent(){
    const u = userAnswers[currentIndex];
    if(u && u.startedAt){
      const elapsed = Math.round((Date.now() - u.startedAt)/1000);
      u.timeSpent += elapsed;
      u.startedAt = null;
    }
  }

  function selectOption(qIdx,optIdx,btnEl){
    userAnswers[qIdx].selected = optIdx;
    const opts = optionsBox.querySelectorAll('.optionBtn');
    opts.forEach(b=>b.classList.remove('selected'));
    btnEl.classList.add('selected');
  }

  // navigation
  prevBtn.addEventListener('click', ()=>{
    recordTimeForCurrent();
    if(currentIndex > 0) showQuestion(currentIndex - 1);
  });
  nextBtn.addEventListener('click', ()=>{
    recordTimeForCurrent();
    if(currentIndex < currentQuestions.length - 1) showQuestion(currentIndex + 1);
  });
  submitBtn.addEventListener('click', ()=>{
    recordTimeForCurrent(); submitQuiz();
  });
  retryBtn.addEventListener('click', ()=>{
    resultArea.classList.add('hidden');
    landing.classList.remove('hidden');
    if(window._timeChart) window._timeChart.destroy();
    if(window._pieChart) window._pieChart.destroy();
  });

  function submitQuiz(){
    clearTimer();
    userAnswers.forEach(u=>{ if(u.startedAt){ u.timeSpent += Math.round((Date.now() - u.startedAt)/1000); u.startedAt = null; }});
    let correct = 0;
    userAnswers.forEach((u,idx)=>{ if(u.selected === currentQuestions[idx].answer) correct++; });
    const total = userAnswers.length;
    const incorrect = total - correct;
    const score = Math.round((correct/total)*100);
    resTotal.textContent = total;
    resCorrect.textContent = correct;
    resIncorrect.textContent = incorrect;
    resScore.textContent = score;

    breakdown.innerHTML = '';
    userAnswers.forEach((u,i)=>{
      const q = currentQuestions[i];
      const div = document.createElement('div');
      div.className = 'breakdownItem';
      div.innerHTML = `<strong>Q${i+1}:</strong> ${q.question}<br>
        <strong>Your:</strong> ${u.selected===null?'Skipped':q.options[u.selected]}<br>
        <strong>Correct:</strong> ${q.options[q.answer]}<br>
        <strong>Time:</strong> ${u.timeSpent}s`;
      breakdown.appendChild(div);
    });

    landing.classList.add('hidden');
    quizArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    // charts
    renderCharts();
  }

  function renderCharts(){
    const labels = currentQuestions.map((q,i)=>`Q${i+1}`);
    const times = userAnswers.map(u=>u.timeSpent);
    const correctCount = userAnswers.filter((u,i)=>u.selected === currentQuestions[i].answer).length;
    const wrongCount = userAnswers.length - correctCount;

    // time chart
    const tctx = document.getElementById('timeChart').getContext('2d');
    if(window._timeChart) window._timeChart.destroy();
    window._timeChart = new Chart(tctx,{ type:'bar', data:{ labels, datasets:[{ label:'Time (s)', data:times }] }, options:{ responsive:true } });

    // pie chart
    const pctx = document.getElementById('pieChart').getContext('2d');
    if(window._pieChart) window._pieChart.destroy();
    window._pieChart = new Chart(pctx,{ type:'pie', data:{ labels:['Correct','Incorrect'], datasets:[{ data:[correctCount, wrongCount] }] } });
  }

  // preview
  previewBtn.addEventListener('click', showPreview);
  function showPreview(){
    previewList.innerHTML = '';
    QUESTIONS.forEach((q,i)=>{
      const el = document.createElement('div');
      el.style.padding = '8px';
      el.style.borderBottom = '1px solid #eee';
      el.innerHTML = `<strong>[${q.category} | ${q.difficulty}]</strong> ${q.question}`;
      previewList.appendChild(el);
    });
    previewModal.classList.remove('hidden');
    previewModal.scrollIntoView({behavior:'smooth'});
  }
  closePreviewBtn && closePreviewBtn.addEventListener('click', ()=> previewModal.classList.add('hidden'));

  // download results
  downloadBtn && downloadBtn.addEventListener('click', ()=>{
    const data = { category:selectedCategory, difficulty: difficultySelect.value, timestamp:new Date().toISOString(), questions:currentQuestions, answers:userAnswers };
    const blob = new Blob([JSON.stringify(data,null,2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='quiz-results.json'; a.click(); URL.revokeObjectURL(url);
  });

  // start quiz
  startBtn.addEventListener('click', ()=>{
    const ok = buildQuiz();
    if(!ok) return;
    landing.classList.add('hidden');
    quizArea.classList.remove('hidden');
    showQuestion(0);
  });

  // keyboard support 1-4
  document.addEventListener('keydown', (e)=>{
    if(quizArea.classList.contains('hidden')) return;
    if(['1','2','3','4'].includes(e.key)){
      const idx = parseInt(e.key,10)-1;
      const btn = optionsBox.querySelector(`.optionBtn[data-index="${idx}"]`);
      if(btn) btn.click();
    }
  });

  // initialize
  renderCategoryButtons();
});
