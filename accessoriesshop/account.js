document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const userNameDisplay = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');
    const homeButton = document.getElementById('home-button');
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
  
    function showWelcomeMessage(name) {
      signupContainer.style.display = 'none';
      loginContainer.style.display = 'none';
      welcomeMessage.style.display = 'block';
      userNameDisplay.textContent = name;
    }
  
    function saveUserToStorage(user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
  
    function getUserFromStorage() {
      return JSON.parse(localStorage.getItem('loggedInUser'));
    }
  
    function clearUserFromStorage() {
      localStorage.removeItem('loggedInUser');
    }
  
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const firstName = document.getElementById('signup-first-name').value;
      const lastName = document.getElementById('signup-last-name').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      const user = { email, firstName, lastName, password };
      saveUserToStorage(user);
      showWelcomeMessage(firstName);
    });
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const user = getUserFromStorage();
  
      if (user && user.email === email && user.password === password) {
        showWelcomeMessage(user.firstName);
      } else {
        alert('Invalid email or password!');
      }
    });
  
    logoutButton.addEventListener('click', () => {
      clearUserFromStorage();
      signupContainer.style.display = 'block';
      loginContainer.style.display = 'block';
      welcomeMessage.style.display = 'none';
    });
  
    homeButton.addEventListener('click', () => {
      window.location.href = 'index.html'; // Redirect to home page
    });
  
    const loggedInUser = getUserFromStorage();
    if (loggedInUser) {
      showWelcomeMessage(loggedInUser.firstName);
    }
  });
  