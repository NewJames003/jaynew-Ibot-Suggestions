// Dark mode
const themeDark1Elements = document.querySelectorAll(".change-to-theme-dark-1");
const themeDark2Elements = document.querySelectorAll(".change-to-theme-dark-2");
// set a given theme/color-scheme and store in the localstorage
const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName);
  document.getElementById("theme-checkbox").checked = true;
  localStorage.setItem("themeSwitcher", "true");
  Array.from(themeDark1Elements).map((themeDark1Element) =>
    themeDark1Element.classList.add(themeName)
  );
  Array.from(themeDark2Elements).map((themeDark2Element) =>
    themeDark2Element.classList.add("theme-dark-2")
  );
};

// remove a given theme/color-scheme from the document and the localstorage
const removeTheme = (themeName) => {
  Array.from(themeDark1Elements).map((themeDark1Element) =>
    themeDark1Element.classList.remove(themeName)
  );
  Array.from(themeDark2Elements).map((themeDark2Element) =>
    themeDark2Element.classList.remove("theme-dark-2")
  );
  localStorage.setItem("theme", "");
  document.getElementById("theme-checkbox").checked = false;
  localStorage.setItem("themeSwitcher", "false");
};

// toggle between light and dark theme
const toggleTheme = () => {
  if (localStorage.getItem("theme") === "theme-dark-1") {
    removeTheme("theme-dark-1" || "theme-dark-2");
  } else {
    setTheme("theme-dark-1" || "theme-dark-2");
  }
};

const toggleThemeCheckbox = document.getElementById("theme-checkbox");

toggleThemeCheckbox.addEventListener("click", toggleTheme);

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark-1") {
    setTheme("theme-dark-1" || "theme-dark-2");
  } else {
    removeTheme("theme-dark-1" || "theme-dark-2");
  }
})();