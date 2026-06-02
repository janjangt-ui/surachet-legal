// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const loginBtn = document.getElementById('loginBtn');
const googleSignIn = document.getElementById('googleSignIn');
const signOut = document.getElementById('signOut');
const authSection = document.getElementById('authSection');
const authMessage = document.getElementById('authMessage');
const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

// Hamburger Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Login Button Click
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        authSection.style.display = 'block';
        authSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Google Sign-In
if (googleSignIn) {
    googleSignIn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                console.log('User signed in:', result.user);
                authMessage.textContent = '✓ เข้าสู่ระบบสำเร็จ';
                updateUI(result.user);
            })
            .catch(error => {
                console.error('Error:', error);
                authMessage.textContent = '✗ เข้าสู่ระบบล้มเหลว: ' + error.message;
            });
    });
}

// Sign Out
if (signOut) {
    signOut.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
                authMessage.textContent = 'ออกจากระบบสำเร็จ';
                updateUI(null);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

// Update UI based on Auth State
function updateUI(user) {
    if (user) {
        googleSignIn.style.display = 'none';
        signOut.style.display = 'block';
        userInfo.style.display = 'block';
        userName.textContent = user.displayName || 'ผู้ใช้';
        userEmail.textContent = user.email;
    } else {
        googleSignIn.style.display = 'block';
        signOut.style.display = 'none';
        userInfo.style.display = 'none';
        authMessage.textContent = '';
    }
}

// Monitor Auth State
auth.onAuthStateChanged(user => {
    updateUI(user);
    if (user) {
        console.log('User is logged in:', user.email);
    } else {
        console.log('User is logged out');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
