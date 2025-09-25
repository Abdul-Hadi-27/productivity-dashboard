function openFeatures() {
    var allElems = document.querySelectorAll(".elem");
    var fullElemPage = document.querySelectorAll(".fullElem");
    var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

    allElems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            fullElemPage[elem.id].style.display = "block";
        });
    });

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElemPage[back.id].style.display = "none";
        });
    });
}

openFeatures();

function todoList() {
    var currentTask = [];

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"));
    } else {
        console.log("Task list is Empty");
    }

    function renderTask() {
        var allTask = document.querySelector(".allTask");

        var sum = "";

        currentTask.forEach(function (elem, idx) {
            sum =
                sum +
                `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`;
        });

        allTask.innerHTML = sum;

        localStorage.setItem("currentTask", JSON.stringify(currentTask));

        document.querySelectorAll(".task button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currentTask.splice(btn.id, 1);
                renderTask();
            });
        });
    }
    renderTask();

    let form = document.querySelector(".addTask form");
    let taskInput = document.querySelector(".addTask form #task-input");
    let taskDetailsInput = document.querySelector(".addTask form textarea");
    let taskCheckbox = document.querySelector(".addTask form #check");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked,
        });
        renderTask();

        taskCheckbox.checked = false;
        taskInput.value = "";
        taskDetailsInput.value = "";
    });
}

todoList();

function dailyPlanner() {
    var dayPlanner = document.querySelector(".day-planner");

    var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

    var hours = Array.from(
        { length: 18 },
        (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
    );

    var wholeDaySum = "";
    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || "";

        wholeDaySum =
            wholeDaySum +
            `<div class="day-planner-time">
    <p>${elem}</p>
    <input id="${idx}" type="text" placeholder="..." value="${savedData}">
</div>`;
    });

    dayPlanner.innerHTML = wholeDaySum;

    var dayPlannerInput = document.querySelectorAll(".day-planner input");

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            console.log("hello");
            dayPlanData[elem.id] = elem.value;

            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
        });
    });
}

dailyPlanner();
function motivationalQuote() {
    var motivationQuote = document.querySelector(".motivation-2 h1");
    var motivationAuthor = document.querySelector(".motivation-3 h2");

    async function fetchQuote() {
        let response = await fetch(
            "https://motivational-spark-api.vercel.app/api/quotes/random"
        );

        let data = await response.json();
        console.log(data);
        motivationQuote.innerHTML = data.quote;
        motivationAuthor.innerHTML = data.author;
    }
    fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
    let totalSeconds = 25 * 60;
    let timerInterval = null;
    let timer = document.querySelector(".pomo-timer h1");
    var startBtn = document.querySelector(".pomo-timer .start");
    var pauseBtn = document.querySelector(".pomo-timer .pause");
    var resetBtn = document.querySelector(".pomo-timer .reset");
    var session = document.querySelector(".pomodoro-fullpage .session");
    var isWorkSession = true;

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
            seconds
        ).padStart("2", "0")}`;
    }

    function startTimer() {
        clearInterval(timerInterval); // purana clear karo

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                if (isWorkSession) {
                    // switch to break
                    session.innerHTML = "Break";
                    isWorkSession = false;
                    totalSeconds = 5 * 60;
                } else {
                    // switch back to work
                    session.innerHTML = "Work Session";
                    isWorkSession = true;
                    totalSeconds = 25 * 60;
                }
                startTimer(); // auto switch aur restart
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }
    function resetTimer() {
        clearInterval(timerInterval);
        isWorkSession = true;
        totalSeconds = 25 * 60;
        updateTimer();
    }
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function weatherFunctionality(){
    
// let header1Date = document.querySelector(".header1 h1");
let header1Day = document.querySelector(".header1 h2");
let header1time = document.querySelector(".header1 h3");
let header2Temp = document.querySelector(".header2 h2");
let header2Rain = document.querySelector(".header2 h5");
let humid=document.querySelector('.header2 h3')
let wind=document.querySelector('.header2 h4')

var data = null;
async function weatherAPICall(city) {
    const api_Key = "e45dd9444e9333464f74c3adccb82943";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=metric`;
    var response = await fetch(url);
    

    data = await response.json();
    console.log(data)
    header2Temp.innerHTML=`${Math.floor(data.main.temp)}°C`
    header2Rain.innerHTML=`${data.weather[0].main}`
    humid.innerHTML=`Humidity: ${data.main.humidity}%`
    wind.innerHTML=`Wind: ${Math.floor(data.wind.speed)}km/h `
   


}
weatherAPICall("kolkata");

function updateClock() {
    let now = new Date();
    let time = now.toLocaleTimeString("en-GB");
    let day = now.toLocaleDateString(undefined, { weekday: "long" });
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("en-GB", options);

    header1Day.innerHTML = `${day}, ${time}`;
    // header1Date.innerHTML = `${time}`;
    header1time.innerHTML = `${formattedDate}`;
}
setInterval(updateClock, 1000);
updateClock();

}
weatherFunctionality();
const formsData = document.querySelector('.set form');
const inputData = document.querySelector('.set form input');
const goalList = document.querySelector('#goalList');

// Local storage se goals load karo
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// UI update karne ka function
function renderGoals() {
  goalList.innerHTML = ""; // purane clear

  goals.forEach((goal, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span style="text-decoration:${goal.completed ? "line-through" : "none"}">
        ${goal.text}
      </span>
      <div class="checkbox">
        <input type="checkbox" class="checker" ${goal.completed ? "checked" : ""}>
        Mark as Complete
        <button class="delete">Delete</button>
      </div>
    `;

    // Delete button
    listItem.querySelector('.delete').addEventListener('click', () => {
      goals.splice(index, 1);
      localStorage.setItem("goals", JSON.stringify(goals));
      renderGoals();
    });

    // Checkbox
    listItem.querySelector('.checker').addEventListener('change', (e) => {
      goals[index].completed = e.target.checked;
      localStorage.setItem("goals", JSON.stringify(goals));
      renderGoals();
    });

    goalList.appendChild(listItem);
  });
}

// Form submit → new goal add
formsData.addEventListener('submit', function(e) {
  e.preventDefault();

  const value = inputData.value.trim();
  if (value === "") return;

  goals.push({ text: value, completed: false });
  localStorage.setItem("goals", JSON.stringify(goals));

  inputData.value = "";
  renderGoals();
});

// Initial render (jab page reload ho)
renderGoals();
