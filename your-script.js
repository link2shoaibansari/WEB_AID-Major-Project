document.querySelector('.cssbuttons-io').addEventListener('click', function() {
  window.location.href = 'help.html';
});
document.querySelector('.ui-btn').addEventListener('click', function() {
  window.location.href = 'letsbegin.html';
});
// Create cursor element dynamically
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);

// Move cursor on mouse movement
document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});
document.addEventListener("DOMContentLoaded", function () {
  // Create cursor overlay element
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  // Move cursor with mouse
  document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
  });

  // Theme toggle functionality
  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("toggle-btn");
  toggleBtn.textContent = "🌙 Dark Mode";

  document.body.appendChild(toggleBtn);

  // Check user preference
  if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️ Light Mode";
  } else {
      document.body.classList.add("light-mode");
  }

  // Toggle theme on button click
  toggleBtn.addEventListener("click", function () {
      if (document.body.classList.contains("dark-mode")) {
          document.body.classList.remove("dark-mode");
          document.body.classList.add("light-mode");
          toggleBtn.textContent = "🌙 Dark Mode";
          localStorage.setItem("theme", "light");
      } else {
          document.body.classList.remove("light-mode");
          document.body.classList.add("dark-mode");
          toggleBtn.textContent = "☀️ Light Mode";
          localStorage.setItem("theme", "dark");
      }
  });
});
