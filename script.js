document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const currentTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement; // Target <html> tag

    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggleButton.textContent = '🌙'; // Moon for dark mode
        } else {
            themeToggleButton.textContent = '☀️'; // Sun for light mode
        }
    } else { // Default to light theme if no preference saved
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleButton.textContent = '☀️';
    }

    themeToggleButton.addEventListener('click', () => {
        let currentAttribute = htmlElement.getAttribute('data-theme');
        if (currentAttribute === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleButton.textContent = '☀️';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleButton.textContent = '🌙';
        }
    });

    // Placeholder for other JS functionalities (Clock, Timer, Calendar, Game)
    // These will be added in the next step.
    // console.log("Theme toggle initialized. Other scripts to be added."); // Remove placeholder log

    // Clock Functionality
    const clockElement = document.getElementById('clock');
    function updateClock() {
        if (clockElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    if (clockElement) {
        setInterval(updateClock, 1000);
        updateClock(); // Initial call
    }

    // Timer Functionality
    const timerElement = document.getElementById('timer');
    const timerInput = document.getElementById('timer-input');
    const startTimerButton = document.getElementById('start-timer');
    let countdown;
    let timerDuration;

    function displayTimeLeft(seconds) {
        if (!timerElement) return;
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
        timerElement.textContent = display;
    }

    function startTimer() {
        if (!timerInput || !timerElement) return;
        const minutes = parseInt(timerInput.value);
        if (isNaN(minutes) || minutes <= 0) {
            alert("Please enter a valid number of minutes.");
            return;
        }

        timerDuration = minutes * 60;
        displayTimeLeft(timerDuration);

        clearInterval(countdown); // Clear any existing timers
        countdown = setInterval(() => {
            timerDuration--;
            if (timerDuration < 0) {
                clearInterval(countdown);
                timerElement.textContent = "Time's up!";
                // Optionally play a sound or show a notification
                return;
            }
            displayTimeLeft(timerDuration);
        }, 1000);
    }

    if (startTimerButton) {
        startTimerButton.addEventListener('click', startTimer);
    }
     if (timerElement && !timerInput.value) { // Initial display if no timer set
        displayTimeLeft(0);
    }


    // Calendar Functionality
    const calendarElement = document.getElementById('calendar');
    let currentMonthDate = new Date();

    function renderCalendar(dateToDisplay) {
        if (!calendarElement) return;
        calendarElement.innerHTML = ''; // Clear previous calendar

        const year = dateToDisplay.getFullYear();
        const month = dateToDisplay.getMonth(); // 0-indexed

        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

        const headerDiv = document.createElement('div');
        headerDiv.id = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.id = 'prev-month';
        prevButton.innerHTML = '&laquo; Prev';
        prevButton.addEventListener('click', () => {
            currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
            renderCalendar(currentMonthDate);
        });

        const monthYearSpan = document.createElement('span');
        monthYearSpan.id = 'month-year';
        monthYearSpan.textContent = `${monthNames[month]} ${year}`;

        const nextButton = document.createElement('button');
        nextButton.id = 'next-month';
        nextButton.innerHTML = 'Next &raquo;';
        nextButton.addEventListener('click', () => {
            currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
            renderCalendar(currentMonthDate);
        });

        headerDiv.appendChild(prevButton);
        headerDiv.appendChild(monthYearSpan);
        headerDiv.appendChild(nextButton);
        calendarElement.appendChild(headerDiv);

        const table = document.createElement('table');
        const headerRow = table.insertRow();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        let date = 1;
        for (let i = 0; i < 6; i++) { // Max 6 rows for a month
            const row = table.insertRow();
            for (let j = 0; j < 7; j++) {
                const cell = row.insertCell();
                if (i === 0 && j < firstDayOfMonth) {
                    // Empty cells before the first day
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.textContent = date;
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add('current-day');
                    }
                    date++;
                }
            }
            if (date > daysInMonth && i < 5) { // Optimization: if all dates are filled, don't add more empty rows
                 if(table.rows[table.rows.length-1].cells[0].innerHTML === "") { // if last row is completely empty
                    table.deleteRow(table.rows.length-1);
                 }
            }
             if (date > daysInMonth) break;
        }
        calendarElement.appendChild(table);
    }

    if (calendarElement) {
        renderCalendar(currentMonthDate);
    }

    // Game: Guess the Number
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const gameMessage = document.getElementById('game-message');
    let randomNumber;
    let attempts;

    function newGame() {
        if (!gameMessage) return;
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameMessage.textContent = "I've picked a new number. Try to guess!";
        if(guessInput) guessInput.value = '';
        // console.log("Secret number:", randomNumber); // For debugging
    }

    function checkGuess() {
        if (!guessInput || !gameMessage) return;
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            gameMessage.textContent = "Please enter a number between 1 and 100.";
            return;
        }

        if (userGuess === randomNumber) {
            gameMessage.textContent = `Congratulations! You guessed it in ${attempts} attempts. Starting a new game.`;
            setTimeout(newGame, 2000); // Start new game after a delay
        } else if (userGuess < randomNumber) {
            gameMessage.textContent = "Too low! Try again.";
        } else {
            gameMessage.textContent = "Too high! Try again.";
        }
    }

    if (guessButton) {
        guessButton.addEventListener('click', checkGuess);
        newGame(); // Initialize the game on load
    }
    // Allow Enter key for guess input
    if (guessInput) {
        guessInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkGuess();
            }
        });
    }

});
