fetch('questions.json')
  .then(response => response.json())
  .then(questions => {
    const contentDiv = document.getElementById('content');
    const progressDiv = document.getElementById('progress');
    const timerDiv = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');

    let currentQuestionIndex = 0;
    let timerInterval = null;
    let isShowingQuestion = true;
    let timeLeft = 30;

    function startPractice() {
      startBtn.classList.add('hidden');
      nextBtn.classList.remove('hidden');
      showQuestion();
    }

    function showQuestion() {
      if (currentQuestionIndex >= questions.length) {
        endPractice();
        return;
      }

      isShowingQuestion = true;
      timeLeft = 30;
      contentDiv.innerHTML = `<p><strong>Question ${currentQuestionIndex + 1}:</strong> <br> ${questions[currentQuestionIndex].question}</p>`;
      progressDiv.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
      startTimer();
    }

    function showAnswer() {
      isShowingQuestion = false;
      timeLeft = 30;
      contentDiv.innerHTML = `<p><strong>Sample Answer:</strong> <br> ${questions[currentQuestionIndex].answer}</p>`;
      startTimer();
    }

    function showAnswerAgain() {
      timeLeft = 30;
      contentDiv.innerHTML = `<p><strong>Sample Answer (Extended):</strong> <br> ${questions[currentQuestionIndex].answer}</p>`;
      startTimer();
    }

    function startTimer() {
      clearInterval(timerInterval);
      timerDiv.textContent = `Time left: ${timeLeft} seconds`;
      timerInterval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          if (isShowingQuestion) {
            showAnswer();
          } else if (timeLeft === 0 && contentDiv.innerHTML.includes('Sample Answer:')) {
            showAnswerAgain();
          } else {
            nextQuestion();
          }
        }
      }, 1000);
    }

    function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endPractice();
      }
    }

    function endPractice() {
      clearInterval(timerInterval);
      contentDiv.innerHTML = '<p><strong>Practice Complete!</strong> You have gone through all questions.</p>';
      progressDiv.textContent = '';
      timerDiv.textContent = '';
      nextBtn.classList.add('hidden');
      restartBtn.classList.remove('hidden');
    }

    function restartPractice() {
      currentQuestionIndex = 0;
      restartBtn.classList.add('hidden');
      nextBtn.classList.remove('hidden');
      showQuestion();
    }

    startBtn.addEventListener('click', startPractice);
    nextBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      nextQuestion();
    });
    restartBtn.addEventListener('click', restartPractice);
  })
  .catch(error => console.error('Error loading questions:', error));