// script.js
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
    {
        "question": "Q 1. Which command helps you find a file on your system?",
        "options": ["locate", "findit", "mv", "nano"],
        "answer": "locate"
    },
    {
        "question": "Q 2. Which command is used to install new software packages?",
        "options": ["sudo su", "apt install", "packit", "download"],
        "answer": "apt install"
    },
    {
        "question": "Q 3. Which command is used to output the data of a file?",
        "options": ["rm", "nano", "cat", "ls"],
        "answer": "cat"
    },
    {
        "question": "Q 4. Which command is used to delete files and directories?",
        "options": ["rm", "ls", "dlt", "mv"],
        "answer": "rm"
    },
    {
        "question": "Q 5. Which command shows the last logged-in users?",
        "options": ["lslogin -u", "history", "last", "logtrack"],
        "answer": "last"
    },
    {
        "question": "Q 6. Which command is used to list the files and directories in the current directory?",
        "options": ["cd", "ls", "lstf", "dirlist"],
        "answer": "ls"
    },
    {
        "question": "Q 7. What does the cd command do?",
        "options": ["Delete files", "Change directory", "chdir", "Createdir"],
        "answer": "Change directory"
    },
    {
        "question": "Q 8. Which command is used to create a new directory?",
        "options": ["cp", "mkdir", "newdir", "ls"],
        "answer": "mkdir"
    },
    {
        "question": "Q 9. What does .. represent in Linux?",
        "options": ["Current directory", "Parent directory", "Root directory", "Home directory"],
        "answer": "Parent directory"
    },
    {
        "question": "Q 10. What is the difference between mv and cp?",
        "options": ["mv copies files, cp moves files", "mv moves files, cp copies files", "mcopy deletes files, cp creates files", "No difference"],
        "answer": "mv moves files, cp copies files"
    },
    {
        "question": "Q 11. What does the ttyrec command do?",
        "options": ["Records terminal sessions", "Plays video files", "sessionrec", "Changes directory"],
        "answer": "Records terminal sessions"
    },
    {
        "question": "Q 12. How do you remove installed software packages?",
        "options": ["apt install", "apt remove", "unpkg", "apt delete"],
        "answer": "apt remove"
    },
    {
        "question": "Q 13. What does the rm -rf command do?",
        "options": ["Forcefully copy a folder", "Forcefully remove a folder", "rmdirforce", "Create a folder"],
        "answer": "Forcefully remove a folder"
    },
    {
        "question": "Q 14. Which command is used to play back terminal session recordings?",
        "options": ["history", "mv", "ttyplay", "playrec"],
        "answer": "ttyplay"
    },
    {
        "question": "Q 15. What does the sudo su command do?",
        "options": ["Deletes system files", "Grants root access", "loginadmin", "Changes directory"],
        "answer": "Grants root access"
    },
    {
        "question": "Q 16. Which command is used to copy files or directories?",
        "options": ["move", "cp", "copy", "sudo"],
        "answer": "cp"
    },
    {
        "question": "Q 17. What does the nano command do?",
        "options": ["Lists files", "Edits files", "quickedit", "Deletes files"],
        "answer": "Edits files"
    },
    {
        "question": "Q 18. What does the mv command do?",
        "options": ["Remove files", "Move or rename files", "change file", "Search files"],
        "answer": "Move or rename files"
    },
    {
        "question": "Q 19. What does the history command do?",
        "options": ["Deleted file history", "Shows command history", "prevcmds", "Creates directories"],
        "answer": "Shows command history"
    },
    {
        "question": "Q 20. Which command searches for text patterns in files?",
        "options": ["ttyrec", "findtxt", "ack", "mv"],
        "answer": "ack"
    }
];


    const timerElement = document.getElementById('time');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextQuestionButton = document.getElementById('next-question');
    const submitExamButton = document.getElementById('submit-exam');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const infoForm = document.getElementById('info-form');
    const startExamButton = document.getElementById('start-exam');

    let currentQuestionIndex = 0;
    let timeLeft = 20;
    let timer;
    let score = 0;
    const userAnswers = [];
    let userInformation = null;

    startExamButton.addEventListener('click', () => {
        // Get user information
        const name = infoForm.elements['name'].value.trim();
        const mobile = infoForm.elements['mobile'].value.trim();
        const email = infoForm.elements['email'].value.trim();

        // Check if user has already taken the exam with same information
        if (userInformation && userInformation.name === name && userInformation.mobile === mobile && userInformation.email === email) {
            alert('You have already taken the exam once.');
            return;
        }

        // Store user information
        userInformation = {
            name: name,
            mobile: mobile,
            email: email
        };

        // Hide info-container and show exam-container
        document.getElementById('info-container').style.display = 'none';
        document.getElementById('exam-container').style.display = 'block';

        // Start the exam
        startTimer();
        loadQuestion();
    });

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Time is up!');
                nextQuestion();
            } else {
                timeLeft--;
                timerElement.textContent = timeLeft;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 20;
        timerElement.textContent = timeLeft;
        startTimer();
    }

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            const inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = 'option';
            inputElement.value = option;
            inputElement.id = option;
            const labelElement = document.createElement('label');
            labelElement.htmlFor = option;
            labelElement.textContent = option;

            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            optionsElement.appendChild(optionElement);
        });
    }

    function nextQuestion() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            userAnswers.push(selectedOption.value);
        } else {
            userAnswers.push(null);
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
            resetTimer();
        } else {
            endExam();
        }
    }

    function endExam() {
        clearInterval(timer);
        document.getElementById('exam-container').style.display = 'none';
        document.getElementById('studentName').innerText =document.getElementById('name').value;
        scoreContainer.style.display = 'block';
        submitExamButton.style.display = 'none';

        calculateScore();
    }

    function calculateScore() {
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                score++;
            }
        });

        scoreElement.textContent = `${score} / ${questions.length}`;
    }

    nextQuestionButton.addEventListener('click', nextQuestion);

    submitExamButton.addEventListener('click', endExam);


    // Disable copy-paste
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        alert('Copying is not allowed!');
    });

    document.addEventListener('paste', (e) => {
        e.preventDefault();
        alert('Pasting is not allowed!');
    });

    document.addEventListener('cut', (e) => {
        e.preventDefault();
        alert('Cutting is not allowed!');
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('Right-click is not allowed!');
    });
});