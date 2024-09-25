// Login logic
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful');
        window.location.href = 'movies.html';
    } else {
        alert('Invalid credentials');
    }
});

// Sign-up logic
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.username === username)) {
        alert('User already exists');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful');
        window.location.href = 'login.html';
    }
});

// Movie listings logic
const movies = [
    { title: 'The Haunting', genre: 'Horror', ageLimit: 18, showtimes: ['6:00 PM', '9:00 PM'] },
    { title: 'Romance in Paris', genre: 'Romance', ageLimit: 12, showtimes: ['4:00 PM', '7:00 PM'] },
];

const movieList = document.getElementById('movies');
movies?.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `
    <h3>${movie.title}</h3>
    <p>Genre: ${movie.genre}</p>
    <p>Age Limit: ${movie.ageLimit}+</p>
    <p>Showtimes: ${movie.showtimes.join(', ')}</p>
    <button onclick="bookSeats('${movie.title}')">Book Now</button>
  `;
    movieList?.appendChild(li);
});

function bookSeats(movieTitle) {
    localStorage.setItem('selectedMovie', movieTitle);
    window.location.href = 'theatre.html';
}

const selectedMovie = localStorage.getItem('selectedMovie');
const movieElement = document.getElementById('selected-movie');

// Check if the movieElement exists before assigning textContent
if (movieElement) {
    movieElement.textContent = selectedMovie || 'No movie selected'; // Handle null or empty selectedMovie
}
const theatre = {
    rows: 20,
    seatsPerRow: 12,
};

const seatGrid = document.getElementById('seat-grid');

// Generate seat grid dynamically
for (let row = 1; row <= theatre.rows; row++) {
    const rowLabel = document.createElement('div');
    rowLabel.classList.add('row-label');
    rowLabel.textContent = `Row ${row}`;
    seatGrid?.appendChild(rowLabel);

    for (let seat = 1; seat <= theatre.seatsPerRow; seat++) {
        const seatBtn = document.createElement('div');
        seatBtn.classList.add('seat');
        seatBtn.textContent = `${seat}`;

        // Toggle seat selection on click
        seatBtn.addEventListener('click', function() {
            seatBtn.classList.toggle('selected');
        });

        seatGrid?.appendChild(seatBtn);
    }
}

document.getElementById('confirm-btn')?.addEventListener('click', function() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.textContent);

    if (seatNumbers.length === 0) {
        alert('Please select at least one seat.');
    } else {
        alert(`Booking confirmed for seats: ${seatNumbers.join(', ')}. Confirmation sent to your email.`);
    }
});
