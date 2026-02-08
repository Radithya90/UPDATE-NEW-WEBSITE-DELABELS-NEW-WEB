// Simple Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Portfolio-Style Page Transition Animations
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Create portfolio-style transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'portfolio-transition-overlay';
            overlay.innerHTML = `
                <div class="portfolio-loader">
                    <div class="loader-cube">
                        <div class="cube-face cube-front"></div>
                        <div class="cube-face cube-back"></div>
                        <div class="cube-face cube-left"></div>
                        <div class="cube-face cube-right"></div>
                        <div class="cube-face cube-top"></div>
                        <div class="cube-face cube-bottom"></div>
                    </div>
                    <div class="portfolio-text">Portfolio Transition</div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Add creative exit animation to current content
            const currentSection = document.querySelector('section:not([style*="display: none"])') ||
                                 document.querySelector('.hero');
            if (currentSection) {
                currentSection.style.animation = 'portfolioExit 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            }

            // Trigger portfolio transition
            setTimeout(() => {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add creative entrance animation to target section
                targetElement.style.animation = 'portfolioEnter 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

                // Animate child elements with stagger
                const childElements = targetElement.querySelectorAll('.feature, .student, .info-card, h2, p, table, .gallery img');
                childElements.forEach((element, index) => {
                    element.style.animation = `portfolioStagger 0.6s ease-out forwards`;
                    element.style.animationDelay = `${index * 0.1}s`;
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(50px) scale(0.9)';
                });

                // Remove overlay with creative animation
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.style.animation = 'portfolioOverlayExit 0.5s ease-out forwards';
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                        }, 500);
                    }
                }, 1000);

                // Reset animations after completion
                setTimeout(() => {
                    if (currentSection) {
                        currentSection.style.animation = '';
                    }
                    targetElement.style.animation = '';
                    childElements.forEach(element => {
                        element.style.animation = '';
                        element.style.animationDelay = '';
                        element.style.opacity = '';
                        element.style.transform = '';
                    });
                }, 2000);

            }, 500);
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section:not(#beranda)');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    let maxVisibility = 0;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, -sectionTop);
        const visibleBottom = Math.min(sectionHeight, windowHeight - sectionTop);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = visibleHeight / sectionHeight;

        if (visibility > maxVisibility) {
            maxVisibility = visibility;
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Gallery Modal
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        modal.style.cursor = 'pointer';

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.borderRadius = '10px';

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });
});

// CSS for basic styling
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background-color: #667eea;
        color: white;
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        typeWriter(heroTitle, 'Selamat Datang di Website Kelas Kami!', 100);
    }

    // Animate sections on load
    animateSections();

    // Animate features with stagger
    animateFeatures();

    // Animate student cards
    animateStudentCards();

    // Animate table rows
    animateTableRows();

    // Animate contact info
    animateContactInfo();
});

// Animate sections with fadeInUp
function animateSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animate features with bounceIn
function animateFeatures() {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.animation = `bounceIn 0.8s ease forwards`;
        feature.style.animationDelay = `${index * 0.2}s`;
    });
}

// Animate student cards with slideInLeft and slideInRight
function animateStudentCards() {
    const students = document.querySelectorAll('.student');
    students.forEach((student, index) => {
        student.style.opacity = '0';
        if (index % 2 === 0) {
            student.style.transform = 'translateX(-50px)';
            student.style.animation = `slideInLeft 0.8s ease forwards`;
        } else {
            student.style.transform = 'translateX(50px)';
            student.style.animation = `slideInRight 0.8s ease forwards`;
        }
        student.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animate table rows
function animateTableRows() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-50px)';
        row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Animate contact info
function animateContactInfo() {
    const contactItems = document.querySelectorAll('.contact-info p');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Add scroll-triggered animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }

    // Animate elements on scroll
    animateOnScroll();
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .student, .info-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.animationPlayState = 'running';
        }
    });
}

// Button pulse animation on hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.animation = 'pulse 1s infinite';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.animation = 'none';
    });
});

// Floating animation for feature icons
document.querySelectorAll('.feature h3').forEach(icon => {
    icon.style.animation = 'float 6s ease-in-out infinite';
    icon.style.animationDelay = Math.random() * 2 + 's';
});

// Glow animation for header
const header = document.querySelector('header');
if (header) {
    header.style.animation = 'glow 3s ease-in-out infinite alternate';
}

// Floating particles in hero section
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255,255,255,0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';

        hero.appendChild(particle);
    }
}

// Enhanced hover effects
document.querySelectorAll('.student, .feature').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        card.style.transition = 'all 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Clock function to update time and date
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = `${day}/${month}/${year}`;

    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerHTML = `${timeString} - ${dateString}`;
    }
}

// Preloader function
function initPreloader() {
    let progress = 1;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const preloader = document.getElementById('preloader');
    const welcomeText = document.querySelector('.welcome-text');

    const interval = setInterval(() => {
        progress += Math.random() * 5 + 1; // Random increment for realistic loading
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            // Hide welcome text and preloader
            if (welcomeText) {
                welcomeText.style.display = 'none';
            }
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500); // Delay to show 100% briefly
        }
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
    }, 100);
}

// Dark mode functions
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    const toggleText = toggleBtn.querySelector('.toggle-text');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        toggleIcon.textContent = '🌙';
        toggleText.textContent = 'Dark Mode';
        localStorage.setItem('darkMode', 'false');
    } else {
        body.classList.add('dark-mode');
        toggleIcon.textContent = '☀️';
        toggleText.textContent = 'White Mode';
        localStorage.setItem('darkMode', 'true');
    }
}

function initializeDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    const toggleBtn = document.querySelector('.dark-mode-toggle');

    if (toggleBtn) {
        const toggleIcon = toggleBtn.querySelector('.toggle-icon');
        const toggleText = toggleBtn.querySelector('.toggle-text');

        if (darkModeEnabled) {
            document.body.classList.add('dark-mode');
            if (toggleIcon) toggleIcon.textContent = '☀️';
            if (toggleText) toggleText.textContent = 'White Mode';
        } else {
            if (toggleIcon) toggleIcon.textContent = '🌙';
            if (toggleText) toggleText.textContent = 'Dark Mode';
        }
    }
}

// Initialize new animations
window.addEventListener('load', () => {
    initPreloader();
    createFloatingParticles();
    updateClock();
    setInterval(updateClock, 1000);
    initializeDarkMode();
});

// YouTube Player for Background Music
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('background-music', {
        height: '0',
        width: '0',
        videoId: '59VgrNzQDTk', // Updated YouTube video ID
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': '59VgrNzQDTk',
            'mute': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'volume': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Player is ready - do not auto-play, set volume to 100%
    event.target.setVolume(100);

    // Sync volume slider with player volume (100% initially)
    const volumeSlider = document.getElementById('volume-slider');
    const volumeBtn = document.getElementById('volume-btn');
    if (volumeSlider) {
        volumeSlider.value = 100;
    }
    if (volumeBtn) {
        volumeBtn.textContent = '🔊';
    }
}

function onPlayerStateChange(event) {
    // Handle player state changes if needed
}

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navUl = document.querySelector('nav ul');

    hamburgerBtn.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navUl.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navUl.classList.remove('active');
        }
    });
});

// Volume Control Functionality
document.addEventListener('DOMContentLoaded', () => {
    const volumeBtn = document.getElementById('volume-btn');
    const volumeSlider = document.getElementById('volume-slider');

    // Volume button toggle
    volumeBtn.addEventListener('click', () => {
        if (player) {
            if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                player.playVideo();
                player.setVolume(100);
                volumeSlider.value = 100;
                volumeBtn.textContent = '🔊';
            } else {
                if (player.getVolume() > 0) {
                    player.setVolume(0);
                    volumeSlider.value = 0;
                    volumeBtn.textContent = '🔇';
                } else {
                    player.setVolume(100);
                    volumeSlider.value = 100;
                    volumeBtn.textContent = '🔊';
                }
            }
        }
    });

    // Volume slider
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        if (player) {
            player.setVolume(volume);
            if (volume == 0) {
                volumeBtn.textContent = '🔇';
            } else {
                volumeBtn.textContent = '🔊';
            }
        }
    });

    // Play music after page load and animations with delay
    setTimeout(() => {
        if (player && player.getPlayerState() !== YT.PlayerState.PLAYING) {
            player.playVideo();
        }
    }, 8000); // 8 second delay after page load before auto-playing music
});

// Notification Panel Functionality
function toggleNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    const toggleBtn = document.querySelector('.notification-toggle');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    const toggleText = toggleBtn.querySelector('.toggle-text');

    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        loadNotifications();
        if (toggleIcon) toggleIcon.textContent = '✖️';
        if (toggleText) toggleText.textContent = 'Tutup';
    } else {
        panel.style.display = 'none';
        if (toggleIcon) toggleIcon.textContent = '🔔';
        if (toggleText) toggleText.textContent = 'Notifikasi';
    }
}

function loadNotifications() {
    const notificationList = document.getElementById('notification-list');
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [
        { id: 1, message: 'Selamat datang di website kelas 8.11!', time: new Date().toLocaleString(), read: false, type: 'info' },
        { id: 2, message: 'Jangan lupa untuk mengikuti kegiatan kelas.', time: new Date().toLocaleString(), read: false, type: 'warning' },
        { id: 3, message: 'Website ini dibuat oleh tim web kelas.', time: new Date().toLocaleString(), read: false, type: 'success' }
    ];

    notificationList.innerHTML = '';
    notifications.forEach(notification => {
        const type = notification.type || 'info';
        let emoji = '';
        switch (type) {
            case 'info':
                emoji = 'ℹ️';
                break;
            case 'warning':
                emoji = '⚠️';
                break;
            case 'success':
                emoji = '✅';
                break;
            case 'error':
                emoji = '🚫';
                break;
            default:
                emoji = 'ℹ️';
        }
        const item = document.createElement('div');
        item.className = `notification-item ${notification.read ? '' : 'unread'}`;
        item.innerHTML = `
            <div class="notification-content">
                <p>${emoji} ${notification.message}</p>
                <small>${notification.time}</small>
            </div>
        `;
        notificationList.appendChild(item);
    });

    // Update badge
    updateNotificationBadge(notifications.filter(n => !n.read).length);

    // Save to localStorage
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function updateNotificationBadge(count) {
    const badge = document.getElementById('notification-badge');
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

function markAllAsRead() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.forEach(notification => notification.read = true);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    loadNotifications();
}

function refreshNotifications() {
    // Simulate refreshing notifications
    const newNotification = {
        id: Date.now(),
        message: 'Notifikasi baru: Website telah diperbarui!',
        time: new Date().toLocaleString(),
        read: false
    };

    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.unshift(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    loadNotifications();
}

function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const notificationList = document.getElementById('notification-list');

    // Update active tab
    tabs.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter notifications
    let filteredNotifications = [];
    if (tab === 'all') {
        filteredNotifications = notifications;
    } else if (tab === 'unread') {
        filteredNotifications = notifications.filter(n => !n.read);
    } else if (tab === 'read') {
        filteredNotifications = notifications.filter(n => n.read);
    }

    // Render filtered notifications
    notificationList.innerHTML = '';
    filteredNotifications.forEach(notification => {
        const type = notification.type || 'info';
        let emoji = '';
        switch (type) {
            case 'info':
                emoji = 'ℹ️';
                break;
            case 'warning':
                emoji = '⚠️';
                break;
            case 'success':
                emoji = '✅';
                break;
            case 'error':
                emoji = '🚫';
                break;
            default:
                emoji = 'ℹ️';
        }
        const item = document.createElement('div');
        item.className = `notification-item ${notification.read ? '' : 'unread'}`;
        item.innerHTML = `
            <div class="notification-content">
                <p>${emoji} ${notification.message}</p>
                <small>${notification.time}</small>
            </div>
        `;
        notificationList.appendChild(item);
    });
}

// Initialize notifications on page load
document.addEventListener('DOMContentLoaded', () => {
    loadNotifications();
});
