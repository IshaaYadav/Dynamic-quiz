// Global variables for quiz state
let selectedCategory = null
let selectedDifficulty = null
let currentQuestions = []
let userAnswers = []
let currentQuestionIndex = 0
let quizStartTime = 0
let timerInterval = null

// Declare variables before using them
const CATEGORIES = ["General Knowledge", "Science", "History", "Geography", "Sports"]
const QUESTIONS = [
  {
    id: 1,
    category: "General Knowledge",
    difficulty: "easy",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0,
  },
  {
    id: 2,
    category: "Science",
    difficulty: "medium",
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "N2"],
    answer: 0,
  },
  {
    id: 3,
    category: "History",
    difficulty: "hard",
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    answer: 0,
  },
  {
    id: 4,
    category: "Geography",
    difficulty: "easy",
    question: "What is the largest country by area?",
    options: ["China", "India", "USA", "Russia"],
    answer: 3,
  },
  {
    id: 5,
    category: "Sports",
    difficulty: "medium",
    question: "Who won the 2020 FIFA World Cup?",
    options: ["Brazil", "France", "Germany", "Italy"],
    answer: 1,
  },
]

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderCategories()
  attachDifficultyListeners()
})

// Render category cards from QUESTIONS data
function renderCategories() {
  const grid = document.getElementById("categoriesGrid")

  grid.innerHTML = ""

  CATEGORIES.forEach((category) => {
    const count = QUESTIONS.filter((q) => q.category === category).length

    const card = document.createElement("div")
    card.className = "category-card"
    card.innerHTML = "<h3>" + category + "</h3><p>" + count + " questions</p>"
    card.onclick = () => {
      selectCategory(category)
    }
    grid.appendChild(card)
  })
}

// Select category and show difficulty screen
function selectCategory(category) {
  selectedCategory = category
  showScreen("difficultyScreen")
}

// Attach difficulty card listeners
function attachDifficultyListeners() {
  const cards = document.querySelectorAll(".difficulty-card")
  cards.forEach((card) => {
    card.onclick = function () {
      selectedDifficulty = this.getAttribute("data-difficulty")
      startQuiz()
    }
  })
}

// Show specific screen and hide others
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen")
  screens.forEach((screen) => {
    screen.classList.remove("active")
  })
  const screen = document.getElementById(screenId)
  if (screen) {
    screen.classList.add("active")
  }
}

// Shuffle array helper
function shuffle(arr) {
  const array = arr.slice()
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

// Start the quiz
function startQuiz() {
  // Filter questions by category and difficulty
  let filtered = QUESTIONS.filter((q) => q.category === selectedCategory && q.difficulty === selectedDifficulty)

  // If no questions found for this difficulty, use all from category
  if (filtered.length === 0) {
    filtered = QUESTIONS.filter((q) => q.category === selectedCategory)
  }

  // Shuffle and take up to 10 questions
  currentQuestions = shuffle(filtered).slice(0, 10)

  // Initialize user answers tracking
  userAnswers = currentQuestions.map((q) => ({
    questionId: q.id,
    selected: null,
    timeSpent: 0,
    startTime: null,
  }))

  currentQuestionIndex = 0
  quizStartTime = Date.now()

  showScreen("quizScreen")
  displayQuestion()
}

// Display current question
function displayQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    submitQuiz()
    return
  }

  clearInterval(timerInterval)

  const q = currentQuestions[currentQuestionIndex]
  const ans = userAnswers[currentQuestionIndex]

  // Update question counter and text
  document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1
  document.getElementById("totalQuestions").textContent = currentQuestions.length
  document.getElementById("questionText").textContent = q.question

  // Clear and rebuild options
  const container = document.getElementById("optionsContainer")
  container.innerHTML = ""

  q.options.forEach((option, idx) => {
    const btn = document.createElement("button")
    btn.className = "option-button"
    btn.textContent = option
    if (ans.selected === idx) {
      btn.classList.add("selected")
    }
    btn.onclick = function () {
      selectAnswer(idx, this)
    }
    container.appendChild(btn)
  })

  // Reset next button
  document.getElementById("nextBtn").disabled = true

  // Update progress bar
  const progress = (currentQuestionIndex / currentQuestions.length) * 100
  document.getElementById("progressFill").style.width = progress + "%"

  // Start timer
  ans.startTime = Date.now()
  startTimer()
}

// Handle answer selection
function selectAnswer(idx, btn) {
  userAnswers[currentQuestionIndex].selected = idx

  // Update button styles
  const buttons = document.querySelectorAll(".option-button")
  buttons.forEach((b) => {
    b.classList.remove("selected")
  })
  btn.classList.add("selected")

  document.getElementById("nextBtn").disabled = false
}

// Start countdown timer
function startTimer() {
  let timeLeft = 30
  const display = document.getElementById("timer")
  display.textContent = timeLeft
  display.style.color = "#fff"

  timerInterval = setInterval(() => {
    timeLeft--
    display.textContent = timeLeft

    // Change color to red when time is running out
    if (timeLeft <= 5) {
      display.style.color = "#ef4444"
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      nextQuestion()
    }
  }, 1000)
}

// Move to next question
function nextQuestion() {
  clearInterval(timerInterval)

  if (userAnswers[currentQuestionIndex].startTime) {
    userAnswers[currentQuestionIndex].timeSpent = Math.round(
      (Date.now() - userAnswers[currentQuestionIndex].startTime) / 1000,
    )
  }

  currentQuestionIndex++
  displayQuestion()
}

// Submit quiz and show results
function submitQuiz() {
  clearInterval(timerInterval)

  // Calculate results
  let correct = 0
  userAnswers.forEach((ans, idx) => {
    if (ans.selected === currentQuestions[idx].answer) {
      correct++
    }
  })

  const total = currentQuestions.length
  const incorrect = total - correct
  const percent = Math.round((correct / total) * 100)
  const totalTime = Math.round((Date.now() - quizStartTime) / 1000)

  // Update results display
  document.getElementById("finalScore").textContent = percent
  document.getElementById("correctCount").textContent = correct
  document.getElementById("wrongCount").textContent = incorrect
  document.getElementById("timeTaken").textContent = totalTime + "s"

  // Set message based on score
  let msg = ""
  if (percent >= 90) msg = "Outstanding! You are a quiz master!"
  else if (percent >= 70) msg = "Great job! Well done!"
  else if (percent >= 50) msg = "Good effort! Keep practicing!"
  else msg = "Keep learning! Try again!"
  document.getElementById("scoreMessage").textContent = msg

  // Build review section
  const review = document.getElementById("reviewContainer")
  review.innerHTML = ""

  userAnswers.forEach((ans, idx) => {
    const question = currentQuestions[idx]
    const isCorrect = ans.selected === question.answer

    const item = document.createElement("div")
    item.className = "review-item " + (isCorrect ? "correct" : "incorrect")
    item.innerHTML =
      "<div class='review-question'>Q" +
      (idx + 1) +
      ": " +
      question.question +
      "</div>" +
      "<div class='review-answer'>Your answer: " +
      (ans.selected === null ? "Skipped" : question.options[ans.selected]) +
      "</div>" +
      "<div class='review-correct'>Correct answer: " +
      question.options[question.answer] +
      "</div>" +
      "<div class='review-time'>Time: " +
      ans.timeSpent +
      "s</div>"
    review.appendChild(item)
  })

  showScreen("resultsScreen")
}

// Go back to home screen
function goHome() {
  clearInterval(timerInterval)
  selectedCategory = null
  selectedDifficulty = null
  currentQuestionIndex = 0
  showScreen("homeScreen")
}

// Retake current quiz
function retakeQuiz() {
  startQuiz()
}
