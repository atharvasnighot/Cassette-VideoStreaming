const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");

// Show/hide password logic
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// Show signup form
signUp.addEventListener("click", () => {
  container.classList.add("active");
});

// Show login form
login.addEventListener("click", () => {
  container.classList.remove("active");
});

// Handle form submission
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginFunction();
});

async function loginFunction() {
    
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // console.log(email);
  // console.log(password);

  const userData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/login", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("jwtToken", result.jwtToken);
      window.location.href = "home.html";
    } else {
      document.getElementById("login-error").textContent =
        "Invalid credentials. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registerFunction();
});

async function registerFunction() {
    const username = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const userData = {
      username: username,
      email: email,
      password: password
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
      container.classList.remove("active");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
}