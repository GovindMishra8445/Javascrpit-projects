document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const checkBoxList = document.querySelectorAll(".check-box");
  const goalInputs = document.querySelectorAll(".goal-input");
  const alertText = document.querySelector(".alert-text");
  const progressLabel = document.querySelector(".progress-label");
  const progressBar = document.querySelector(".progress-bar");
  const progressValue = document.querySelector(".progress-value");
  const addGoalBtn = document.querySelector(".add-goal-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const mainGoalContainer = document.querySelector(".main-goal-container");
  const quoteElement = document.querySelector(".quote");

  // Motivational quotes for different progress levels
  const motivationalQuotes = [
    "Set your goals and make them happen!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Wow! You completed all your goals, time to celebrate!",
    "You are unstoppable! Keep raising the bar!",
  ];

  // Random encouraging quotes
  const randomQuotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Set your goals high, and dont stop till you get there." - Bo Jackson',
    '"Today is your opportunity to build the tomorrow you want." - Ken Poirot',
    '"Focus on your goal. Dont look in any direction but ahead." - Unknown',
    '"The future depends on what you do today." - Mahatma Gandhi',
    '"Dont count the days, make the days count." - Muhammad Ali',
  ];

  // Set a random quote on load
  quoteElement.textContent =
    randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

  // Initialize goals from localStorage or create new structure
  let goals = JSON.parse(localStorage.getItem("goalsList")) || [];

  // Initialize with 3 empty goals if none exist
  if (goals.length === 0) {
    goals = [
      { text: "", completed: false },
      { text: "", completed: false },
      { text: "", completed: false },
    ];
    saveGoals();
  }

  // Render existing goals and update UI
  function renderGoals() {
    // Clear existing goal containers
    mainGoalContainer.innerHTML = "";

    // Create goal elements for each goal in our data
    goals.forEach((goal, index) => {
      const goalContainer = createGoalElement(goal, index);
      mainGoalContainer.appendChild(goalContainer);
    });

    // Re-attach event listeners
    attachEventListeners();
    updateProgressBar();
  }

  // Create a single goal element
  function createGoalElement(goal, index) {
    const goalContainer = document.createElement("div");
    goalContainer.classList.add("goal-container");
    goalContainer.dataset.index = index;

    if (goal.completed) {
      goalContainer.classList.add("completed");
    }

    const checkBox = document.createElement("div");
    checkBox.classList.add("check-box");

    const signImage = document.createElement("img");
    signImage.classList.add("sign");
    signImage.src = "/image/Vector sign.svg";
    signImage.alt = "check mark";

    checkBox.appendChild(signImage);

    const goalInput = document.createElement("input");
    goalInput.classList.add("goal-input");
    goalInput.type = "text";
    goalInput.value = goal.text;
    goalInput.placeholder = "Add new goal...";

    goalContainer.appendChild(checkBox);
    goalContainer.appendChild(goalInput);

    return goalContainer;
  }

  // Attach event listeners to dynamic elements
  function attachEventListeners() {
    const checkBoxes = document.querySelectorAll(".check-box");
    const inputs = document.querySelectorAll(".goal-input");

    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", handleCheckBoxClick);
    });

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        progressBar.classList.remove("show-error");
      });

      input.addEventListener("input", handleInputChange);
    });
  }

  // Handle checkbox clicks
  function handleCheckBoxClick(e) {
    const goalContainer = e.currentTarget.parentElement;
    const index = parseInt(goalContainer.dataset.index);
    const input = goalContainer.querySelector(".goal-input");

    // Check if the goal has text before allowing completion
    if (!input.value.trim()) {
      progressBar.classList.add("show-error");
      return;
    }

    // Toggle completion status
    goals[index].completed = !goals[index].completed;
    goalContainer.classList.toggle("completed");

    // Update UI and save
    updateProgressBar();
    saveGoals();
  }

  // Handle input changes
  function handleInputChange(e) {
    const goalContainer = e.currentTarget.parentElement;
    const index = parseInt(goalContainer.dataset.index);

    // Update goal text
    goals[index].text = e.currentTarget.value;
    saveGoals();
  }

  // Update progress bar based on completed goals
  function updateProgressBar() {
    const totalGoals = goals.length;
    const completedGoals = goals.filter((goal) => goal.completed).length;

    // Calculate percentage and update the progress bar
    const completionPercentage =
      totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
    progressValue.style.width = `${completionPercentage}%`;
    progressValue.firstElementChild.textContent = `${completedGoals}/${totalGoals} Completed`;

    // Update motivational message based on completion level
    const quoteIndex = Math.min(completedGoals, motivationalQuotes.length - 1);
    progressLabel.textContent = motivationalQuotes[quoteIndex];

    // Add special animation for 100% completion
    if (completionPercentage === 100) {
      progressValue.style.backgroundColor = "#28a745";
      document.querySelectorAll(".completed .check-box").forEach((box) => {
        box.style.backgroundColor = "#28a745";
        box.style.borderColor = "#28a745";
      });
    } else {
      progressValue.style.backgroundColor = "";
      document.querySelectorAll(".check-box").forEach((box) => {
        if (box.parentElement.classList.contains("completed")) {
          box.style.backgroundColor = "";
          box.style.borderColor = "";
        }
      });
    }
  }

  // Save goals to localStorage
  function saveGoals() {
    localStorage.setItem("goalsList", JSON.stringify(goals));
  }

  // Add a new goal
  addGoalBtn.addEventListener("click", () => {
    goals.push({ text: "", completed: false });
    saveGoals();
    renderGoals();
  });

  // Reset all goals
  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all goals?")) {
      goals = goals.map((goal) => ({ text: "", completed: false }));
      while (goals.length > 3) {
        goals.pop();
      }
      saveGoals();
      renderGoals();

      // Set a new random quote for motivation
      quoteElement.textContent =
        randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    }
  });

  // Initial render
  renderGoals();

  // Update the sun animation based on completion
  setInterval(() => {
    const sun = document.querySelector(".actual-sun");
    const completedGoals = goals.filter((goal) => goal.completed).length;
    const totalGoals = goals.length;

    if (completedGoals === totalGoals && totalGoals > 0) {
      sun.style.animationDuration = "2s";
    } else {
      sun.style.animationDuration = "8s";
    }
  }, 1000);
});
