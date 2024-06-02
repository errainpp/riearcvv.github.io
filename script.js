document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-button').addEventListener('click', login);
    document.getElementById('add-activity-button').addEventListener('click', addNewActivity);
    document.getElementById('clear-schedule-button').addEventListener('click', clearSchedule);
    document.getElementById('logout-button').addEventListener('click', logout);

    if (localStorage.getItem('role')) {
        showMainPage();
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('role', 'admin');
        showMainPage();
    } else if (username === 'user' && password === 'user') {
        localStorage.setItem('role', 'user');
        showMainPage();
    } else {
        alert('Username atau Password yang anda masukkan salah! silahkan coba lagi');
    }
}

function showMainPage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';

    const role = localStorage.getItem('role');
    if (role === 'admin') {
        document.getElementById('upload-section').style.display = 'block';
    }

    loadSchedule();
}

function loadSchedule() {
    const scheduleData = JSON.parse(localStorage.getItem('scheduleData')) || [
    ];

    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = '';

    scheduleData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.day}</td><td>${item.activity}</td><td>${item.time}</td>`;
        scheduleBody.appendChild(row);
    });
}

function addNewActivity() {
    const day = document.getElementById('new-day').value;
    const activity = document.getElementById('new-activity').value;
    const time = document.getElementById('new-time').value;

    const newActivity = { day, activity, time };
    const scheduleData = JSON.parse(localStorage.getItem('scheduleData')) || [];
    scheduleData.push(newActivity);
    localStorage.setItem('scheduleData', JSON.stringify(scheduleData));

    loadSchedule();
    document.getElementById('new-activity-form').reset();
}

function clearSchedule() {
    localStorage.removeItem('scheduleData');
    loadSchedule();
}

function logout() {
    localStorage.removeItem('role');
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
          }
  
