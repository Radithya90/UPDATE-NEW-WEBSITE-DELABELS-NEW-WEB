// Always show login form on page load for security
document.addEventListener('DOMContentLoaded', function() {
    showLoginForm();
    initializeAutoSave();
});

// API Keys - Replace with your actual API keys
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Get from Google Cloud Console
const SPOTIFY_CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Get from Spotify Developer Dashboard
const SPOTIFY_CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET'; // Get from Spotify Developer Dashboard

function login() {
    const username = document.getElementById('user-type').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Valid credentials
    const validCredentials = [
        { username: 'kelas8.11.id@gmail.com', password: 'owner website builder' },
        { username: 'akses cpanel by admin', password: 'admin website' }
    ];

    const isValid = validCredentials.some(cred =>
        cred.username === username && cred.password === password
    );

    if (isValid) {
        localStorage.setItem('cpanelLoggedIn', 'true');
        localStorage.setItem('cpanelUsername', username);
        showCpanel();
        loadExistingData();
    } else {
        errorMessage.textContent = 'Username atau password salah!';
    }
}

// Send notification functionality
function sendNotification() {
    const message = document.getElementById('notification-message').value.trim();
    const type = document.getElementById('notification-type').value;
    const statusDiv = document.getElementById('notification-status');

    if (!message) {
        statusDiv.textContent = 'Pesan notifikasi tidak boleh kosong!';
        statusDiv.style.color = 'red';
        return;
    }

    // Get sender info
    const username = localStorage.getItem('cpanelUsername') || 'Admin';
    let senderRole = 'ADMIN WEB';
    if (username === 'kelas8.11.id@gmail.com') {
        senderRole = 'OWNER WEB';
    }
    const senderName = `${senderRole} (PESAN)`;

    // Create new notification with sender
    const newNotification = {
        id: Date.now(),
        message: `${senderName}: ${message}`,
        time: new Date().toLocaleString(),
        read: false,
        type: type
    };

    // Get existing notifications
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    // Add new notification to the beginning
    notifications.unshift(newNotification);

    // Save to localStorage
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Update status
    statusDiv.textContent = 'Notifikasi berhasil dikirim ke website!';
    statusDiv.style.color = 'green';

    // Clear form
    document.getElementById('notification-message').value = '';
    document.getElementById('notification-type').value = 'info';

    // Clear status after 3 seconds
    setTimeout(() => {
        statusDiv.textContent = '';
    }, 3000);
}

function logout() {
    localStorage.removeItem('cpanelLoggedIn');
    showLoginForm();
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('cpanel-content').style.display = 'none';
}

function showCpanel() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('cpanel-content').style.display = 'block';
    updateAdminProfile();
}

function updateAdminProfile() {
    const username = localStorage.getItem('cpanelUsername') || 'Admin';
    const adminName = document.getElementById('admin-name');
    const adminPhoto = document.getElementById('admin-photo');
    const adminRole = document.querySelector('.admin-role');

    // Set admin name and role based on username
    if (username === 'kelas8.11.id@gmail.com') {
        adminName.textContent = 'Owner Website';
        adminRole.textContent = 'Owner';
        adminPhoto.src = ''; // Empty photo
    } else if (username === 'akses cpanel by admin') {
        adminName.textContent = 'Admin Website';
        adminRole.textContent = 'Admin';
        adminPhoto.src = ''; // Empty photo
    } else {
        adminName.textContent = username;
        adminRole.textContent = 'Administrator';
        adminPhoto.src = ''; // Empty photo
    }
}

function loadExistingData() {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];

    // Load header
    document.getElementById('header-title').value = data.headerTitle || 'Kelas 8.11/delabels';
    document.getElementById('header-subtitle').value = data.headerSubtitle || 'MTSN 1 KOTA BEKASI - Website Resmi Kelas Kami';

    // Load hero
    document.getElementById('hero-title').value = data.heroTitle || 'Selamat Datang di Website Kelas Kami!';
    document.getElementById('hero-text').value = data.heroText || 'Kami adalah kelas yang solid, kreatif, dan penuh semangat. Mari bersama-sama mencapai impian!';
    document.getElementById('hero-bg').value = data.heroBg || 'https://files.catbox.moe/q17s9n.jpg';

    // Load about
    document.getElementById('about-text').value = data.aboutText || 'Kelas delabels adalah komunitas siswa yang aktif, inovatif, dan selalu siap menghadapi tantangan. Kami percaya bahwa pendidikan bukan hanya tentang belajar di kelas, tapi juga tentang membangun karakter dan persahabatan yang kuat.';

    // Load info
    document.getElementById('info-curriculum').value = data.infoCurriculum || 'Kurikulum Merdeka adalah kurikulum terbaru di Indonesia yang lebih fleksibel, berpusat pada siswa, dan fokus pada pengembangan kompetensi esensial serta karakter melalui Projek Penguatan Profil Pelajar Pancasila...';
    document.getElementById('info-teacher').value = data.infoTeacher || 'Bu Novia Nur Fadhila. - bimbingan konseling';
    document.getElementById('info-homeroom').value = data.infoHomeroom || 'Bu HJ Roziqoh,S,Pd,M,Si - ipa(walas )';
    document.getElementById('info-achievement').value = data.infoAchievement || 'HASNA MEMENANGKAN LOMBA POSTER DIGITAL PADA ACARA CLASS MEET YG DI SELENGGARAKAN PADA TANGGAL 11/12/2025 TIDAK ADA TIDAK ADA';
    document.getElementById('info-routine').value = data.infoRoutine || 'Upacara Bendera setiap Senin Ekstrakurikuler sesuai harinya setiap jumat pagi ke masjid membaca surah yasin,Al waqiah,ar rahman,al mulk';
    document.getElementById('info-books').value = data.infoBooks || 'sesuai hari di jadwal pelajaran';
    document.getElementById('info-vision').value = data.infoVision || 'Visi: Menjadi kelas unggul dalam akademik dan karakter Misi: Mendorong siswa untuk belajar dengan semangat dan integritas';

    // Load students
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = '';
    students.forEach((student, index) => {
        addStudentItem(student, index);
    });

    // Load structure
    loadStructureLists(data);

    // Load schedule
    document.getElementById('schedule-senin').value = data.scheduleSenin || 'AKIDAH AHLAK - SKI - TAHFIDZ - BK - IPA';
    document.getElementById('schedule-selasa').value = data.scheduleSelasa || 'IPS - BAHASA ARAB - BAHASA INGGRIS - BAHASA INDONESIA - #N/A - IPA';

    // Load gallery
    if (gallery.length === 0) {
        gallery = [
            'https://files.catbox.moe/ikpqfm.jpg',
            'https://files.catbox.moe/ciys96.jpg',
            'https://files.catbox.moe/02e9m7.jpg',
            'https://files.catbox.moe/4illsm.jpg',
            'https://files.catbox.moe/fs18vt.jpg',
            'https://files.catbox.moe/w64xta.jpg',
            'https://files.catbox.moe/xct15v.jpg',
            'https://files.catbox.moe/t5eft6.jpg',
            'https://files.catbox.moe/bhv28d.jpg',
            'https://files.catbox.moe/1632a7.jpg',
            'https://files.catbox.moe/emxucf.jpg',
            'https://files.catbox.moe/z5ytqc.jpg',
            'https://files.catbox.moe/1mi1x2.jpg',
            'https://files.catbox.moe/yst3dv.jpg',
            'https://files.catbox.moe/t5eft6.jpg',
            'https://files.catbox.moe/6ktg89.jpg',
            'https://files.catbox.moe/do4hbs.jpg',
            'https://files.catbox.moe/do4hbs.jpg',
            'https://files.catbox.moe/jqi02h.jpg',
            'https://files.catbox.moe/cex1t1.jpg'
        ];
        localStorage.setItem('websiteGallery', JSON.stringify(gallery));
    }
    const galleryList = document.getElementById('gallery-list');
    galleryList.innerHTML = '';
    gallery.forEach((img, index) => {
        addGalleryItem(img, index);
    });

    // Load contact
    document.getElementById('contact-text').value = data.contactText || 'Jika Anda ingin menghubungi kami, silakan kirim email atau pesan melalui media sosial,Jika ada masukan untuk website ini harap hubungi. terimakasih WEBSITE PRIVATE DELABELS';
    document.getElementById('contact-email').value = data.contactEmail || 'Kelas8.11.id@gmail.com';
    document.getElementById('contact-ig').value = data.contactIg || '@delabels';
    document.getElementById('contact-wa').value = data.contactWa || '+62 857-7322-9186';

    // Load website utama content
    document.getElementById('website-utama-title').value = data.websiteUtamaTitle || 'LOGIN WEBSITE UTAMA (GOOGLE FORM PIKET, DOKUMENTASI PIKET)';
    document.getElementById('website-utama-description').value = data.websiteUtamaDescription || 'Klik tombol di bawah untuk mengakses Website Utama yang berisi Google Form Piket dan Dokumentasi Piket.';
    document.getElementById('website-utama-button-text').value = data.websiteUtamaButtonText || 'Akses Website Utama';

    // Load piket content
    document.getElementById('piket-title').value = data.piketTitle || 'LOGIN PIKET PENGGANTI';
    document.getElementById('piket-description').value = data.piketDescription || 'Klik tombol di bawah untuk login ke sistem piket pengganti.';
    document.getElementById('piket-button-text').value = data.piketButtonText || 'Login Piket Pengganti';

    // Load navigation menu
    document.getElementById('nav-beranda').value = data.navBeranda || 'BERANDA';
    document.getElementById('nav-tentang').value = data.navTentang || 'TENTANG KAMI';
    document.getElementById('nav-informasi').value = data.navInformasi || 'INFORMASI KLS';
    document.getElementById('nav-siswa').value = data.navSiswa || 'DAFTAR SISWA';
    document.getElementById('nav-struktur').value = data.navStruktur || 'STRUKTUR ORGANISASI KELAS';
    document.getElementById('nav-jadwal').value = data.navJadwal || 'JADWAL PELAJARAN';
    document.getElementById('nav-foto').value = data.navFoto || 'FOTO KEGIATAN';
    document.getElementById('nav-website-utama').value = data.navWebsiteUtama || 'LOGIN WEBSITE UTAMA';
    document.getElementById('nav-piket').value = data.navPiket || 'LOGIN PIKET PENGGANTI';
    document.getElementById('nav-kontak').value = data.navKontak || 'INFORMASI KONTAK';
    document.getElementById('nav-cpanel').value = data.navCpanel || 'CPANEL';

    // Load section headings
    document.getElementById('heading-tentang').value = data.headingTentang || 'Tentang Kami';
    document.getElementById('heading-informasi').value = data.headingInformasi || 'Informasi Kelas';
    document.getElementById('heading-siswa').value = data.headingSiswa || 'Daftar Siswa';
    document.getElementById('heading-struktur').value = data.headingStruktur || 'STRUKTUR ORGANISASI KELAS';
    document.getElementById('heading-jadwal').value = data.headingJadwal || 'Jadwal Pelajaran';
    document.getElementById('heading-foto').value = data.headingFoto || 'FOTO KEGIATAN';
    document.getElementById('heading-kontak').value = data.headingKontak || 'Kontak Kami';

    // Load CSS custom values
    document.getElementById('body-bg-color').value = data.bodyBgColor || '#f4f4f4';
    document.getElementById('header-bg-color').value = data.headerBgColor || '#667eea';
    document.getElementById('font-family').value = data.fontFamily || "'Poppins', sans-serif";
    document.getElementById('text-color').value = data.textColor || '#333';
    document.getElementById('link-color').value = data.linkColor || '#667eea';
    document.getElementById('page-title').value = data.pageTitle || '© WEBSITE PRIVATE 8.11. Dibuat oleh Tim Web Kelas.';
    document.getElementById('meta-description').value = data.metaDescription || 'Website resmi Kelas 8.11 MTSN 1 Kota Bekasi. Informasi lengkap tentang kelas, siswa, struktur organisasi, dan kegiatan.';
    document.getElementById('favicon-url').value = data.faviconUrl || '';


}

function addStudent() {
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    const newStudent = {
        name: '',
        gender: '',
        nisn: '',
        phone: '',
        dob: '',
        absen: '',
        img: 'https://files.catbox.moe/qk13q4.jpg'
    };
    students.push(newStudent);
    localStorage.setItem('websiteStudents', JSON.stringify(students));
    addStudentItem(newStudent, students.length - 1);
}

function addStudentItem(student, index) {
    const studentsList = document.getElementById('students-list');
    const studentDiv = document.createElement('div');
    studentDiv.className = 'student-item';
    studentDiv.innerHTML = `
        <h4>Siswa ${index + 1}</h4>
        <input type="text" placeholder="Nama" value="${student.name || ''}" onchange="updateStudent(${index}, 'name', this.value)">
        <input type="text" placeholder="L/P" value="${student.gender || ''}" onchange="updateStudent(${index}, 'gender', this.value)">
        <input type="text" placeholder="NISN" value="${student.nisn || ''}" onchange="updateStudent(${index}, 'nisn', this.value)">
        <input type="text" placeholder="No Telpon" value="${student.phone || ''}" onchange="updateStudent(${index}, 'phone', this.value)">
        <input type="text" placeholder="Tempat/Tgl Lahir" value="${student.dob || ''}" onchange="updateStudent(${index}, 'dob', this.value)">
        <input type="text" placeholder="Absen" value="${student.absen || ''}" onchange="updateStudent(${index}, 'absen', this.value)">
        <input type="url" placeholder="URL Foto" value="${student.img || ''}" onchange="updateStudent(${index}, 'img', this.value)">
        <button type="button" onclick="removeStudent(${index})">Hapus</button>
    `;
    studentsList.appendChild(studentDiv);
}

function updateStudent(index, field, value) {
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    if (students[index]) {
        students[index][field] = value;
        localStorage.setItem('websiteStudents', JSON.stringify(students));
    }
}



function removeStudent(index) {
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    students.splice(index, 1);
    localStorage.setItem('websiteStudents', JSON.stringify(students));
    loadExistingData(); // Reload to update indices
}

function addGalleryImage() {
    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    gallery.push('https://files.catbox.moe/qk13q4.jpg');
    localStorage.setItem('websiteGallery', JSON.stringify(gallery));
    addGalleryItem('https://files.catbox.moe/qk13q4.jpg', gallery.length - 1);
}

function addGalleryItem(img, index) {
    const galleryList = document.getElementById('gallery-list');
    const imgDiv = document.createElement('div');
    imgDiv.className = 'student-item';
    imgDiv.innerHTML = `
        <h4>Foto ${index + 1}</h4>
        <input type="url" placeholder="URL Gambar" value="${img}" onchange="updateGallery(${index}, this.value)">
        <button type="button" onclick="removeGallery(${index})">Hapus</button>
    `;
    galleryList.appendChild(imgDiv);
}

function updateGallery(index, value) {
    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    gallery[index] = value;
    localStorage.setItem('websiteGallery', JSON.stringify(gallery));
}

function removeGallery(index) {
    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    gallery.splice(index, 1);
    localStorage.setItem('websiteGallery', JSON.stringify(gallery));
    loadExistingData(); // Reload to update indices
}

function saveChanges() {
    // Save current data as previous state for undo
    const currentData = localStorage.getItem('websiteData');
    if (currentData) {
        localStorage.setItem('previousWebsiteData', currentData);
    }

    const data = {
        headerTitle: document.getElementById('header-title').value,
        headerSubtitle: document.getElementById('header-subtitle').value,
        heroTitle: document.getElementById('hero-title').value,
        heroText: document.getElementById('hero-text').value,
        heroBg: document.getElementById('hero-bg').value,
        aboutText: document.getElementById('about-text').value,
        infoCurriculum: document.getElementById('info-curriculum').value,
        infoTeacher: document.getElementById('info-teacher').value,
        infoHomeroom: document.getElementById('info-homeroom').value,
        infoAchievement: document.getElementById('info-achievement').value,
        infoRoutine: document.getElementById('info-routine').value,
        infoBooks: document.getElementById('info-books').value,
        infoVision: document.getElementById('info-vision').value,
        scheduleSenin: document.getElementById('schedule-senin').value,
        scheduleSelasa: document.getElementById('schedule-selasa').value,
        scheduleRabu: document.getElementById('schedule-rabu').value,
        scheduleKamis: document.getElementById('schedule-kamis').value,
        scheduleJumat: document.getElementById('schedule-jumat').value,
        bodyBgColor: document.getElementById('body-bg-color').value,
        headerBgColor: document.getElementById('header-bg-color').value,
        fontFamily: document.getElementById('font-family').value,
        textColor: document.getElementById('text-color').value,
        linkColor: document.getElementById('link-color').value,
        pageTitle: document.getElementById('page-title').value,
        metaDescription: document.getElementById('meta-description').value,
        faviconUrl: document.getElementById('favicon-url').value,
        footerText: document.getElementById('footer-text').value,
        websiteUtamaTitle: document.getElementById('website-utama-title').value,
        websiteUtamaDescription: document.getElementById('website-utama-description').value,
        websiteUtamaButtonText: document.getElementById('website-utama-button-text').value,
        piketTitle: document.getElementById('piket-title').value,
        piketDescription: document.getElementById('piket-description').value,
        piketButtonText: document.getElementById('piket-button-text').value,
        websiteUtamaLink: document.getElementById('website-utama-link').value,
        piketLink: document.getElementById('piket-link').value,
        preloaderText: document.getElementById('preloader-text').value,
        contactText: document.getElementById('contact-text').value,
        contactEmail: document.getElementById('contact-email').value,
        contactIg: document.getElementById('contact-ig').value,
        contactWa: document.getElementById('contact-wa').value,
        navBeranda: document.getElementById('nav-beranda').value,
        navTentang: document.getElementById('nav-tentang').value,
        navInformasi: document.getElementById('nav-informasi').value,
        navSiswa: document.getElementById('nav-siswa').value,
        navStruktur: document.getElementById('nav-struktur').value,
        navJadwal: document.getElementById('nav-jadwal').value,
        navFoto: document.getElementById('nav-foto').value,
        navWebsiteUtama: document.getElementById('nav-website-utama').value,
        navPiket: document.getElementById('nav-piket').value,
        navKontak: document.getElementById('nav-kontak').value,
        navCpanel: document.getElementById('nav-cpanel').value,
        headingTentang: document.getElementById('heading-tentang').value,
        headingInformasi: document.getElementById('heading-informasi').value,
        headingSiswa: document.getElementById('heading-siswa').value,
        headingStruktur: document.getElementById('heading-struktur').value,
        headingJadwal: document.getElementById('heading-jadwal').value,
        headingFoto: document.getElementById('heading-foto').value,
        headingKontak: document.getElementById('heading-kontak').value,

    };

    // Include existing students and gallery from localStorage
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    data.students = students;

    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    data.gallery = gallery;

    // Include departments from localStorage
    const existingData = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = existingData.departments || [];
    data.departments = departments;

    // Include structure lists from localStorage
    const wali = existingData.wali || [];
    data.wali = wali;
    const ketua = existingData.ketua || [];
    data.ketua = ketua;
    const wakil = existingData.wakil || [];
    data.wakil = wakil;

    // Save nav links
    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    data.navLinks = navLinks;

    // Save custom sections
    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];
    data.customSections = customSections;

    localStorage.setItem('websiteData', JSON.stringify(data));
    alert('Perubahan berhasil disimpan! Buka index.html untuk melihat hasilnya.');
}

// Custom Section Functions
function addCustomSection() {
    const title = document.getElementById('custom-section-title').value;
    const content = document.getElementById('custom-section-content').value;
    if (!title || !content) {
        alert('Judul dan konten section harus diisi!');
        return;
    }

    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];
    customSections.push({ title, content });
    localStorage.setItem('customSections', JSON.stringify(customSections));

    document.getElementById('custom-section-title').value = '';
    document.getElementById('custom-section-content').value = '';
    loadCustomSections();
}

function loadCustomSections() {
    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];
    const list = document.getElementById('custom-sections-list');
    list.innerHTML = '';
    customSections.forEach((section, index) => {
        const div = document.createElement('div');
        div.className = 'student-item';
        div.innerHTML = `
            <h4>${section.title}</h4>
            <button onclick="removeCustomSection(${index})">Hapus</button>
        `;
        list.appendChild(div);
    });
}

function removeCustomSection(index) {
    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];
    customSections.splice(index, 1);
    localStorage.setItem('customSections', JSON.stringify(customSections));
    loadCustomSections();
}

// Navigation Link Functions
function addNavLink() {
    const text = document.getElementById('nav-link-text').value;
    const url = document.getElementById('nav-link-url').value;
    if (!text || !url) {
        alert('Teks dan URL link harus diisi!');
        return;
    }

    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    navLinks.push({ text, url });
    localStorage.setItem('navLinks', JSON.stringify(navLinks));

    document.getElementById('nav-link-text').value = '';
    document.getElementById('nav-link-url').value = '';
    loadNavLinks();
}

function loadNavLinks() {
    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    const list = document.getElementById('nav-links-list');
    list.innerHTML = '';
    navLinks.forEach((link, index) => {
        const div = document.createElement('div');
        div.className = 'student-item';
        div.innerHTML = `
            <h4>${link.text} -> ${link.url}</h4>
            <button onclick="removeNavLink(${index})">Hapus</button>
        `;
        list.appendChild(div);
    });
}

function removeNavLink(index) {
    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    navLinks.splice(index, 1);
    localStorage.setItem('navLinks', JSON.stringify(navLinks));
    loadNavLinks();
}

// Preview function
function preview() {
    const data = {
        headerTitle: document.getElementById('header-title').value,
        headerSubtitle: document.getElementById('header-subtitle').value,
        heroTitle: document.getElementById('hero-title').value,
        heroText: document.getElementById('hero-text').value,
        heroBg: document.getElementById('hero-bg').value,
        aboutText: document.getElementById('about-text').value,
        infoCurriculum: document.getElementById('info-curriculum').value,
        infoTeacher: document.getElementById('info-teacher').value,
        infoHomeroom: document.getElementById('info-homeroom').value,
        infoAchievement: document.getElementById('info-achievement').value,
        infoRoutine: document.getElementById('info-routine').value,
        infoBooks: document.getElementById('info-books').value,
        infoVision: document.getElementById('info-vision').value,
        scheduleSenin: document.getElementById('schedule-senin').value,
        scheduleSelasa: document.getElementById('schedule-selasa').value,
        scheduleRabu: document.getElementById('schedule-rabu').value,
        scheduleKamis: document.getElementById('schedule-kamis').value,
        scheduleJumat: document.getElementById('schedule-jumat').value,
        bodyBgColor: document.getElementById('body-bg-color').value,
        headerBgColor: document.getElementById('header-bg-color').value,
        fontFamily: document.getElementById('font-family').value,
        textColor: document.getElementById('text-color').value,
        linkColor: document.getElementById('link-color').value,
        pageTitle: document.getElementById('page-title').value,
        metaDescription: document.getElementById('meta-description').value,
        faviconUrl: document.getElementById('favicon-url').value,
        footerText: document.getElementById('footer-text').value,
        websiteUtamaLink: document.getElementById('website-utama-link').value,
        piketLink: document.getElementById('piket-link').value,
        preloaderText: document.getElementById('preloader-text').value,
        contactText: document.getElementById('contact-text').value,
        contactEmail: document.getElementById('contact-email').value,
        contactIg: document.getElementById('contact-ig').value,
        contactWa: document.getElementById('contact-wa').value
    };

    // Include existing students and gallery from localStorage
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    data.students = students;

    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    data.gallery = gallery;

    // Include departments from localStorage
    const existingData = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = existingData.departments || [];
    data.departments = departments;

    // Include structure lists from localStorage
    const wali = existingData.wali || [];
    data.wali = wali;
    const ketua = existingData.ketua || [];
    data.ketua = ketua;
    const wakil = existingData.wakil || [];
    data.wakil = wakil;

    // Save nav links
    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    data.navLinks = navLinks;

    // Save custom sections
    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];
    data.customSections = customSections;

    // Temporarily save to localStorage for preview
    localStorage.setItem('websiteData', JSON.stringify(data));

    // Open index.html in a new tab
    window.open('index.html', '_blank');
}



// Structure functions
function loadStructureLists(data) {
    // Load Wali Kelas
    const wali = data.wali || [{ name: 'Bu HJ Roziqoh, S.Pd, M.Si', img: 'https://files.catbox.moe/yrrcto.jpg' }];
    loadStructureList('wali-list', wali, 'wali');

    // Load Ketua Murid
    const ketua = data.ketua || [{ name: 'Radithya', img: 'https://files.catbox.moe/crr13v.jpg' }];
    loadStructureList('ketua-list', ketua, 'ketua');

    // Load Wakil Ketua Murid
    const wakil = data.wakil || [{ name: 'Aisar', img: 'https://files.catbox.moe/9rfsy8.jpg' }];
    loadStructureList('wakil-list', wakil, 'wakil');

    // Load departments
    const departments = data.departments || [
        { name: 'Sekretaris', members: [{name: 'Amira', img: 'https://files.catbox.moe/jksp3x.jpg'}, {name: 'Rayya', img: 'https://files.catbox.moe/kgfvqj.jpg'}, {name: 'Gheitza', img: 'https://files.catbox.moe/379tdd.jpg'}] },
        { name: 'Bendahara', members: [{name: 'Erika', img: 'https://files.catbox.moe/21x87e.jpg'}, {name: 'Hasna', img: 'https://files.catbox.moe/4cgznj.jpg'}] },
        { name: 'Sekbid Kerohanian', members: [{name: 'Azka', img: 'https://files.catbox.moe/u567lk.png'}, {name: 'Zalfa', img: 'https://files.catbox.moe/qk13q4.jpg'}] },
        { name: 'Sekbid Keamanan', members: [{name: 'NOT AVAILABLE', img: 'https://files.catbox.moe/qk13q4.jpg'}, {name: 'Fadthan', img: 'https://files.catbox.moe/8iligk.jpg'}] },
        { name: 'Sekbid Kesehatan', members: [{name: 'Andini', img: 'https://files.catbox.moe/amc2bq.jpg'}, {name: 'Raii', img: 'https://files.catbox.moe/btsnks.jpg'}] },
        { name: 'Sekbid Kesenian', members: [{name: 'Nabilla', img: 'https://files.catbox.moe/2moykz.jpg'}, {name: 'Daffa', img: 'https://files.catbox.moe/705p3b.jpg'}] },
        { name: 'Sekbid Kebersihan', members: [{name: 'Ghaisan', img: 'https://files.catbox.moe/19x275.jpg'}, {name: 'Bagas', img: 'https://files.catbox.moe/qk13q4.jpg'}] },
        { name: 'Sekbid Pendidikan', members: [{name: 'Asha', img: 'https://files.catbox.moe/6avn8r.jpg'}, {name: 'Devin', img: 'https://files.catbox.moe/gc4ugu.jpg'}] }
    ];
    loadDepartments(departments);
}

function loadStructureList(listId, members, type) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    members.forEach((member, index) => {
        const div = document.createElement('div');
        div.className = 'student-item';
        div.innerHTML = `
            <h4>${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}</h4>
            <input type="text" placeholder="Nama" value="${member.name || ''}" onchange="updateStructure('${type}', ${index}, 'name', this.value)">
            <input type="url" placeholder="URL Foto" value="${member.img || ''}" onchange="updateStructure('${type}', ${index}, 'img', this.value)">
            <button type="button" onclick="removeStructure('${type}', ${index})">Hapus</button>
        `;
        list.appendChild(div);
    });
}

function addWali() {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const wali = data.wali || [];
    wali.push({name: '', img: 'https://files.catbox.moe/qk13q4.jpg'});
    data.wali = wali;
    localStorage.setItem('websiteData', JSON.stringify(data));
    loadStructureList('wali-list', wali, 'wali');
}

function addKetua() {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const ketua = data.ketua || [];
    ketua.push({name: '', img: 'https://files.catbox.moe/qk13q4.jpg'});
    data.ketua = ketua;
    localStorage.setItem('websiteData', JSON.stringify(data));
    loadStructureList('ketua-list', ketua, 'ketua');
}

function addWakil() {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const wakil = data.wakil || [];
    wakil.push({name: '', img: 'https://files.catbox.moe/qk13q4.jpg'});
    data.wakil = wakil;
    localStorage.setItem('websiteData', JSON.stringify(data));
    loadStructureList('wakil-list', wakil, 'wakil');
}

function updateStructure(type, index, field, value) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    if (data[type] && data[type][index]) {
        data[type][index][field] = value;
        localStorage.setItem('websiteData', JSON.stringify(data));
    }
}

function removeStructure(type, index) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    if (data[type]) {
        data[type].splice(index, 1);
        localStorage.setItem('websiteData', JSON.stringify(data));
        loadStructureList(`${type}-list`, data[type], type);
    }
}

// Department functions
function addDepartment() {
    const departments = JSON.parse(localStorage.getItem('websiteData')).departments || [];
    const newDept = {
        name: 'Departemen Baru',
        members: [{ name: '', img: 'https://files.catbox.moe/qk13q4.jpg' }]
    };
    departments.push(newDept);
    updateDepartmentsData(departments);
    loadDepartments(departments);
}

function loadDepartments(departments) {
    const list = document.getElementById('departments-list');
    list.innerHTML = '';
    departments.forEach((dept, index) => {
        const deptDiv = document.createElement('div');
        deptDiv.className = 'student-item';
        deptDiv.innerHTML = `
            <h4>Departemen ${index + 1}</h4>
            <input type="text" placeholder="Nama Departemen" value="${dept.name}" onchange="updateDepartment(${index}, 'name', this.value)">
            <div id="dept-members-${index}"></div>
            <button type="button" onclick="addMemberToDept(${index})">Tambah Anggota</button>
            <button type="button" onclick="removeDepartment(${index})" style="background: #dc3545;">Hapus Departemen</button>
        `;
        list.appendChild(deptDiv);
        loadDeptMembers(index, dept.members);
    });
}

function loadDeptMembers(deptIndex, members) {
    const membersDiv = document.getElementById(`dept-members-${deptIndex}`);
    membersDiv.innerHTML = '';
    members.forEach((member, memberIndex) => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'student-item';
        memberDiv.style.marginLeft = '20px';
        memberDiv.innerHTML = `
            <h5>Anggota ${memberIndex + 1}</h5>
            <input type="text" placeholder="Nama" value="${member.name || ''}" onchange="updateDeptMember(${deptIndex}, ${memberIndex}, 'name', this.value)">
            <input type="url" placeholder="URL Foto" value="${member.img || ''}" onchange="updateDeptMember(${deptIndex}, ${memberIndex}, 'img', this.value)">
            <button type="button" onclick="removeDeptMember(${deptIndex}, ${memberIndex})">Hapus Anggota</button>
        `;
        membersDiv.appendChild(memberDiv);
    });
}

function addMemberToDept(deptIndex) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = data.departments || [];
    if (departments[deptIndex]) {
        departments[deptIndex].members.push({ name: '', img: 'https://files.catbox.moe/qk13q4.jpg' });
        updateDepartmentsData(departments);
        loadDepartments(departments);
    }
}

function updateDepartment(deptIndex, field, value) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = data.departments || [];
    if (departments[deptIndex]) {
        departments[deptIndex][field] = value;
        updateDepartmentsData(departments);
    }
}

function updateDeptMember(deptIndex, memberIndex, field, value) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = data.departments || [];
    if (departments[deptIndex] && departments[deptIndex].members[memberIndex]) {
        departments[deptIndex].members[memberIndex][field] = value;
        updateDepartmentsData(departments);
    }
}

function removeDepartment(deptIndex) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = data.departments || [];
    departments.splice(deptIndex, 1);
    updateDepartmentsData(departments);
    loadDepartments(departments);
}

function removeDeptMember(deptIndex, memberIndex) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = data.departments || [];
    if (departments[deptIndex]) {
        departments[deptIndex].members.splice(memberIndex, 1);
        updateDepartmentsData(departments);
        loadDepartments(departments);
    }
}

function updateDepartmentsData(departments) {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    data.departments = departments;
    localStorage.setItem('websiteData', JSON.stringify(data));
}

// Music Search Functions
async function searchMusic() {
    const query = document.getElementById('music-search').value;
    if (!query) {
        alert('Masukkan nama lagu atau artis terlebih dahulu!');
        return;
    }

    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
        alert('YouTube API Key belum dikonfigurasi. Silakan ganti YOUR_YOUTUBE_API_KEY dengan API key yang valid dari Google Cloud Console.');
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' official audio')}&type=video&key=${YOUTUBE_API_KEY}&maxResults=1`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            document.getElementById('music-url').value = embedUrl;
            alert('Lagu YouTube berhasil ditemukan dan URL embed otomatis diisi!');
            previewMusic(); // Auto-preview the music
        } else {
            alert('Tidak ada hasil untuk pencarian tersebut.');
        }
    } catch (error) {
        console.error('Error searching YouTube:', error);
        alert('Terjadi kesalahan saat mencari lagu di YouTube. Pastikan API key valid.');
    }
}

async function searchMusicSpotify() {
    const query = document.getElementById('music-search').value;
    if (!query) {
        alert('Masukkan nama lagu atau artis terlebih dahulu!');
        return;
    }

    if (!SPOTIFY_CLIENT_ID || SPOTIFY_CLIENT_ID === 'YOUR_SPOTIFY_CLIENT_ID' || !SPOTIFY_CLIENT_SECRET || SPOTIFY_CLIENT_SECRET === 'YOUR_SPOTIFY_CLIENT_SECRET') {
        alert('Spotify API belum dikonfigurasi. Silakan ganti YOUR_SPOTIFY_CLIENT_ID dan YOUR_SPOTIFY_CLIENT_SECRET dengan kredensial yang valid dari Spotify Developer Dashboard.');
        // Fallback to opening search page
        const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
        window.open(spotifySearchUrl, '_blank');
        alert('Buka tab Spotify yang baru terbuka, pilih lagu yang diinginkan, klik "Share" > "Copy Song Link", lalu paste link tersebut di kolom "URL Embed Lagu"');
        return;
    }

    try {
        // Get access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
        });

        const tokenData = await tokenResponse.json();
        if (!tokenData.access_token) {
            throw new Error('Failed to get access token');
        }

        // Search for tracks
        const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
            }
        });

        const searchData = await searchResponse.json();
        if (searchData.tracks && searchData.tracks.items.length > 0) {
            const trackId = searchData.tracks.items[0].id;
            const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
            document.getElementById('music-url').value = embedUrl;
            alert('Lagu Spotify berhasil ditemukan dan URL embed otomatis diisi!');
            previewMusic(); // Auto-preview the music
        } else {
            alert('Tidak ada hasil untuk pencarian tersebut.');
        }
    } catch (error) {
        console.error('Error searching Spotify:', error);
        alert('Terjadi kesalahan saat mencari lagu di Spotify. Pastikan kredensial API valid.');
        // Fallback
        const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
        window.open(spotifySearchUrl, '_blank');
        alert('Buka tab Spotify yang baru terbuka, pilih lagu yang diinginkan, klik "Share" > "Copy Song Link", lalu paste link tersebut di kolom "URL Embed Lagu"');
    }
}

function previewMusic() {
    const musicUrl = document.getElementById('music-url').value.trim();
    const previewDiv = document.getElementById('music-preview');

    if (!musicUrl) {
        alert('Masukkan URL embed lagu terlebih dahulu!');
        return;
    }

    // Clear previous preview
    previewDiv.innerHTML = '';

    try {
        // Check if it's a YouTube URL (various formats)
        if (musicUrl.includes('youtube.com/watch?v=') || musicUrl.includes('youtu.be/')) {
            let videoId = '';
            if (musicUrl.includes('youtube.com/watch?v=')) {
                videoId = musicUrl.split('v=')[1].split('&')[0];
            } else if (musicUrl.includes('youtu.be/')) {
                videoId = musicUrl.split('youtu.be/')[1].split('?')[0];
            }
            if (videoId) {
                const embedCode = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                previewDiv.innerHTML = embedCode;
                return;
            }
        }
        // Check if it's already a YouTube embed URL
        else if (musicUrl.includes('youtube.com/embed/')) {
            const embedCode = `<iframe width="300" height="200" src="${musicUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            previewDiv.innerHTML = embedCode;
            return;
        }
        // Check if it's a Spotify track URL
        else if (musicUrl.includes('spotify.com/track/')) {
            const trackId = musicUrl.split('/track/')[1].split('?')[0];
            const embedCode = `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="300" height="200" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
            previewDiv.innerHTML = embedCode;
            return;
        }
        // Check if it's already a Spotify embed URL
        else if (musicUrl.includes('open.spotify.com/embed/')) {
            const embedCode = `<iframe src="${musicUrl}" width="300" height="200" frameborder="0" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
            previewDiv.innerHTML = embedCode;
            return;
        }

        // If none of the above, show error
        alert('URL tidak valid. Pastikan URL adalah link YouTube atau Spotify yang valid!');
    } catch (error) {
        alert('Terjadi kesalahan dalam memproses URL. Pastikan URL benar!');
        console.error('Music preview error:', error);
    }
}

// Undo function
function undo() {
    const previousData = JSON.parse(localStorage.getItem('previousWebsiteData'));
    if (!previousData) {
        alert('Tidak ada perubahan sebelumnya untuk di-undo.');
        return;
    }

    // Save current state for redo
    const currentData = localStorage.getItem('websiteData');
    if (currentData) {
        localStorage.setItem('redoWebsiteData', currentData);
    }

    // Restore previous data
    localStorage.setItem('websiteData', JSON.stringify(previousData));
    localStorage.removeItem('previousWebsiteData');

    // Reload the form with previous data
    loadExistingData();
    loadCustomSections();
    loadNavLinks();

    alert('Perubahan berhasil di-undo.');
}

// Redo function
function redo() {
    const redoData = JSON.parse(localStorage.getItem('redoWebsiteData'));
    if (!redoData) {
        alert('Tidak ada perubahan untuk di-redo.');
        return;
    }

    // Save current state for undo
    const currentData = localStorage.getItem('websiteData');
    if (currentData) {
        localStorage.setItem('previousWebsiteData', currentData);
    }

    // Restore redo data
    localStorage.setItem('websiteData', JSON.stringify(redoData));
    localStorage.removeItem('redoWebsiteData');

    // Reload the form with redo data
    loadExistingData();
    loadCustomSections();
    loadNavLinks();

    alert('Perubahan berhasil di-redo.');
}

// Auto-save functions
let autoSaveInterval;

function initializeAutoSave() {
    const autoSaveEnabled = localStorage.getItem('autoSaveEnabled') === 'true';
    document.getElementById('auto-save-toggle').checked = autoSaveEnabled;
    updateLastSavedTime();
    if (autoSaveEnabled) {
        startAutoSave();
    }
}

function toggleAutoSave() {
    const isEnabled = document.getElementById('auto-save-toggle').checked;
    localStorage.setItem('autoSaveEnabled', isEnabled);
    if (isEnabled) {
        startAutoSave();
    } else {
        stopAutoSave();
    }
}

function startAutoSave() {
    stopAutoSave(); // Clear any existing interval
    autoSaveInterval = setInterval(() => {
        autoSave();
    }, 30000); // 30 seconds
}

function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
}

function autoSave() {
    const data = {
        headerTitle: document.getElementById('header-title').value,
        headerSubtitle: document.getElementById('header-subtitle').value,
        heroTitle: document.getElementById('hero-title').value,
        heroText: document.getElementById('hero-text').value,
        heroBg: document.getElementById('hero-bg').value,
        aboutText: document.getElementById('about-text').value,
        infoCurriculum: document.getElementById('info-curriculum').value,
        infoTeacher: document.getElementById('info-teacher').value,
        infoHomeroom: document.getElementById('info-homeroom').value,
        infoAchievement: document.getElementById('info-achievement').value,
        infoRoutine: document.getElementById('info-routine').value,
        infoBooks: document.getElementById('info-books').value,
        infoVision: document.getElementById('info-vision').value,
        scheduleSenin: document.getElementById('schedule-senin').value,
        scheduleSelasa: document.getElementById('schedule-selasa').value,
        scheduleRabu: document.getElementById('schedule-rabu').value,
        scheduleKamis: document.getElementById('schedule-kamis').value,
        scheduleJumat: document.getElementById('schedule-jumat').value,
        bodyBgColor: document.getElementById('body-bg-color').value,
        headerBgColor: document.getElementById('header-bg-color').value,
        fontFamily: document.getElementById('font-family').value,
        textColor: document.getElementById('text-color').value,
        linkColor: document.getElementById('link-color').value,
        pageTitle: document.getElementById('page-title').value,
        metaDescription: document.getElementById('meta-description').value,
        faviconUrl: document.getElementById('favicon-url').value,
        footerText: document.getElementById('footer-text').value,
        websiteUtamaTitle: document.getElementById('website-utama-title').value,
        websiteUtamaDescription: document.getElementById('website-utama-description').value,
        websiteUtamaButtonText: document.getElementById('website-utama-button-text').value,
        piketTitle: document.getElementById('piket-title').value,
        piketDescription: document.getElementById('piket-description').value,
        piketButtonText: document.getElementById('piket-button-text').value,
        websiteUtamaLink: document.getElementById('website-utama-link').value,
        piketLink: document.getElementById('piket-link').value,
        preloaderText: document.getElementById('preloader-text').value,
        contactText: document.getElementById('contact-text').value,
        contactEmail: document.getElementById('contact-email').value,
        contactIg: document.getElementById('contact-ig').value,
        contactWa: document.getElementById('contact-wa').value,
        navBeranda: document.getElementById('nav-beranda').value,
        navTentang: document.getElementById('nav-tentang').value,
        navInformasi: document.getElementById('nav-informasi').value,
        navSiswa: document.getElementById('nav-siswa').value,
        navStruktur: document.getElementById('nav-struktur').value,
        navJadwal: document.getElementById('nav-jadwal').value,
        navFoto: document.getElementById('nav-foto').value,
        navWebsiteUtama: document.getElementById('nav-website-utama').value,
        navPiket: document.getElementById('nav-piket').value,
        navKontak: document.getElementById('nav-kontak').value,
        navCpanel: document.getElementById('nav-cpanel').value,
        headingTentang: document.getElementById('heading-tentang').value,
        headingInformasi: document.getElementById('heading-informasi').value,
        headingSiswa: document.getElementById('heading-siswa').value,
        headingStruktur: document.getElementById('heading-struktur').value,
        headingJadwal: document.getElementById('heading-jadwal').value,
        headingFoto: document.getElementById('heading-foto').value,
        headingKontak: document.getElementById('heading-kontak').value,
    };

    // Include existing students and gallery from localStorage
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    data.students = students;

    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    data.gallery = gallery;

    // Include departments from localStorage
    const existingData = JSON.parse(localStorage.getItem('websiteData')) || {};
    const departments = existingData.departments || [];
    data.departments = departments;

    // Include structure lists from localStorage
    const wali = existingData.wali || [];
    data.wali = wali;
    const ketua = existingData.ketua || [];
    data.ketua = ketua;
    const wakil = existingData.wakil || [];
    data.wakil = wakil;

    // Save nav links
    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    data.navLinks = navLinks;

    // Save custom sections
    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];
    data.customSections = customSections;

    localStorage.setItem('websiteData', JSON.stringify(data));
    updateLastSavedTime();
}

function updateLastSavedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('last-saved-time').textContent = `Terakhir disimpan: ${timeString}`;
}

// Export/Import Configuration Functions
function exportConfig() {
    const data = JSON.parse(localStorage.getItem('websiteData')) || {};
    const students = JSON.parse(localStorage.getItem('websiteStudents')) || [];
    const gallery = JSON.parse(localStorage.getItem('websiteGallery')) || [];
    const navLinks = JSON.parse(localStorage.getItem('navLinks')) || [];
    const customSections = JSON.parse(localStorage.getItem('customSections')) || [];

    const config = {
        websiteData: data,
        students: students,
        gallery: gallery,
        navLinks: navLinks,
        customSections: customSections,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'cpanel-config-' + new Date().toISOString().split('T')[0] + '.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importConfig(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);

            if (config.websiteData) localStorage.setItem('websiteData', JSON.stringify(config.websiteData));
            if (config.students) localStorage.setItem('websiteStudents', JSON.stringify(config.students));
            if (config.gallery) localStorage.setItem('websiteGallery', JSON.stringify(config.gallery));
            if (config.navLinks) localStorage.setItem('navLinks', JSON.stringify(config.navLinks));
            if (config.customSections) localStorage.setItem('customSections', JSON.stringify(config.customSections));

            loadExistingData();
            loadCustomSections();
            loadNavLinks();

            alert('Konfigurasi berhasil diimpor! Halaman akan dimuat ulang.');
            location.reload();
        } catch (error) {
            alert('File konfigurasi tidak valid. Pastikan file JSON yang benar.');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

// Dark mode functions
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.dark-mode-toggle');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        toggleBtn.textContent = '🌙 Dark Mode';
        localStorage.setItem('darkMode', 'false');
    } else {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️ Light Mode';
        localStorage.setItem('darkMode', 'true');
    }
}

function initializeDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    const toggleBtn = document.querySelector('.dark-mode-toggle');

    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        if (toggleBtn) toggleBtn.textContent = '☀️ Light Mode';
    } else {
        if (toggleBtn) toggleBtn.textContent = '🌙 Dark Mode';
    }
}

// Load notifications in CPanel
function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '';

    if (notifications.length === 0) {
        notificationsList.innerHTML = '<p>Tidak ada notifikasi.</p>';
        return;
    }

    notifications.forEach((notification, index) => {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'student-item';
        notificationDiv.innerHTML = `
            <input type="checkbox" id="notification-${index}" value="${index}" style="margin-right: 10px;">
            <h4>Notifikasi ${index + 1} (${notification.type})</h4>
            <p><strong>Pesan:</strong> ${notification.message}</p>
            <p><strong>Waktu:</strong> ${notification.time}</p>
            <button type="button" onclick="deleteNotification(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Hapus</button>
        `;
        notificationsList.appendChild(notificationDiv);
    });
}

// Delete all notifications
function deleteAllNotifications() {
    if (confirm('Apakah Anda yakin ingin menghapus semua notifikasi?')) {
        localStorage.setItem('notifications', JSON.stringify([]));
        loadNotifications();
        alert('Semua notifikasi berhasil dihapus!');
    }
}

// Delete a specific number of notifications (oldest first)
function deleteNotifications() {
    const count = parseInt(document.getElementById('delete-count').value);
    if (!count || count <= 0) {
        alert('Masukkan jumlah notifikasi yang valid untuk dihapus.');
        return;
    }

    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    if (notifications.length === 0) {
        alert('Tidak ada notifikasi untuk dihapus.');
        return;
    }

    if (count >= notifications.length) {
        deleteAllNotifications();
        return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus ${count} notifikasi terlama?`)) {
        // Remove the first 'count' notifications (oldest)
        notifications.splice(0, count);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        loadNotifications();
        alert(`${count} notifikasi berhasil dihapus!`);
        // Clear the input field
        document.getElementById('delete-count').value = '';
    }
}

// Delete notification
function deleteNotification(index) {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    if (confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) {
        notifications.splice(index, 1);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        loadNotifications();
        alert('Notifikasi berhasil dihapus!');
    }
}

// Load custom sections and nav links on page load
document.addEventListener('DOMContentLoaded', function() {
    loadExistingData();
    loadCustomSections();
    loadNavLinks();
    initializeDarkMode();
});
