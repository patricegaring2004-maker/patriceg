/* =========================================================
   THE PICKLE-YARD
   PICKLEBALL COURT, PLAYER & TOURNAMENT MANAGEMENT SYSTEM

   Front-end version using localStorage.

   Default Login:
   Username: admin
   Password: admin123
========================================================= */


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultCourts = [
    {
        id: 1,
        name: "Court 1",
        location: "Main Playing Area",
        status: "In Game"
    },

    {
        id: 2,
        name: "Court 2",
        location: "Main Playing Area",
        status: "In Game"
    },

    {
        id: 3,
        name: "Court 3",
        location: "Covered Court",
        status: "Available"
    },

    {
        id: 4,
        name: "Court 4",
        location: "Covered Court",
        status: "Available"
    }
];


const defaultQueue = [
    {
        id: 1,
        name: "Mark Joseph",
        category: "Doubles",
        team: "Team A",
        time: "3:10 PM",
        status: "Waiting"
    },

    {
        id: 2,
        name: "Angela Santos",
        category: "Mixed Doubles",
        team: "Team B",
        time: "3:18 PM",
        status: "Waiting"
    },

    {
        id: 3,
        name: "Ryan Cruz",
        category: "Doubles",
        team: "Team C",
        time: "3:25 PM",
        status: "Waiting"
    }
];


const defaultReservations = [
    {
        id: 1,
        date: "2026-11-07",
        time: "4:00 PM",
        court: "Court 1",
        reservedBy: "Mark Joseph",
        purpose: "Regular Play",
        status: "Confirmed"
    },

    {
        id: 2,
        date: "2026-11-07",
        time: "5:30 PM",
        court: "Court 2",
        reservedBy: "Angela Santos",
        purpose: "Training",
        status: "Confirmed"
    }
];


const defaultTournaments = [
    {
        id: 1,
        name: "Pickle-Yard Open 2026",
        category: "Mixed Doubles",
        date: "2026-11-15",
        participants: 16,
        status: "Registration Open"
    },

    {
        id: 2,
        name: "Lipa South Weekend Cup",
        category: "Men's Doubles",
        date: "2026-11-22",
        participants: 12,
        status: "Upcoming"
    }
];


const defaultMatches = [
    {
        id: 1,
        date: "2026-11-07",
        court: "Court 1",
        teamA: "Mark / John",
        score: "11 - 8",
        teamB: "Ryan / Carlo",
        winner: "Team A"
    },

    {
        id: 2,
        date: "2026-11-06",
        court: "Court 2",
        teamA: "Angela / Mia",
        score: "11 - 9",
        teamB: "Kate / Anne",
        winner: "Team A"
    }
];


const defaultNotifications = [
    {
        id: 1,
        title: "Reservation Confirmed",
        message: "Court 1 has been reserved by Mark Joseph at 4:00 PM.",
        time: "Today, 3:00 PM",
        read: false
    },

    {
        id: 2,
        title: "Schedule Update",
        message: "Court 2 reservation has been confirmed for 5:30 PM.",
        time: "Today, 2:45 PM",
        read: false
    },

    {
        id: 3,
        title: "Tournament Activity",
        message: "Pickle-Yard Open 2026 currently has registration open.",
        time: "Yesterday",
        read: false
    }
];



/* =========================================================
   LOCAL STORAGE
========================================================= */

function getData(key, defaultValue) {

    let data = localStorage.getItem(key);

    if (!data) {

        localStorage.setItem(
            key,
            JSON.stringify(defaultValue)
        );

        return defaultValue;
    }

    return JSON.parse(data);
}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


let courts = getData(
    "pickle_courts",
    defaultCourts
);

let queue = getData(
    "pickle_queue",
    defaultQueue
);

let reservations = getData(
    "pickle_reservations",
    defaultReservations
);

let tournaments = getData(
    "pickle_tournaments",
    defaultTournaments
);

let matches = getData(
    "pickle_matches",
    defaultMatches
);

let notifications = getData(
    "pickle_notifications",
    defaultNotifications
);



/* =========================================================
   LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loggedIn =
            localStorage.getItem("pickle_logged_in");

        if (loggedIn === "true") {

            showSystem();

        } else {

            showLogin();

        }

        updateDashboard();

        renderCourts();
        renderQueue();
        renderReservations();
        renderTournaments();
        renderMatches();
        renderNotifications();

    }
);



document.getElementById("loginForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document.getElementById("username").value.trim();

            const password =
                document.getElementById("password").value.trim();


            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "pickle_logged_in",
                    "true"
                );

                document.getElementById("loginError")
                    .innerHTML = "";

                showSystem();

                addNotification(
                    "Administrator Login",
                    "Administrator successfully logged into the system."
                );

            } else {

                document.getElementById("loginError")
                    .innerHTML =
                    "Invalid username or password.";

            }

        }
    );



function showLogin() {

    document.getElementById("loginPage")
        .classList.remove("d-none");

    document.getElementById("systemPage")
        .classList.add("d-none");
}



function showSystem() {

    document.getElementById("loginPage")
        .classList.add("d-none");

    document.getElementById("systemPage")
        .classList.remove("d-none");

    showModule("dashboard");

}



function logout() {

    if (
        confirm("Are you sure you want to log out?")
    ) {

        localStorage.removeItem(
            "pickle_logged_in"
        );

        showLogin();

    }

}



function togglePassword() {

    const password =
        document.getElementById("password");

    const icon =
        document.getElementById("eyeIcon");


    if (
        password.type === "password"
    ) {

        password.type = "text";

        icon.classList.remove("bi-eye");

        icon.classList.add("bi-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("bi-eye-slash");

        icon.classList.add("bi-eye");

    }

}



/* =========================================================
   MODULE NAVIGATION
========================================================= */

function showModule(module) {

    const modules = [
        "dashboard",
        "courts",
        "queue",
        "reservations",
        "tournaments",
        "matches",
        "reports",
        "notifications"
    ];


    modules.forEach(function (name) {

        const element =
            document.getElementById(
                name + "Module"
            );

        if (element) {

            element.classList.add("d-none");

        }

    });


    const target =
        document.getElementById(
            module + "Module"
        );

    if (target) {

        target.classList.remove("d-none");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateDashboard();

}



/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    document.getElementById("totalCourts")
        .textContent = courts.length;

    document.getElementById("totalQueue")
        .textContent =
        queue.filter(
            p => p.status === "Waiting"
        ).length;

    document.getElementById("totalReservations")
        .textContent =
        reservations.length;

    document.getElementById("totalTournaments")
        .textContent =
        tournaments.length;


    document.getElementById("reportCourts")
        .textContent =
        courts.length;

    document.getElementById("reportPlayers")
        .textContent =
        queue.length;

    document.getElementById("reportReservations")
        .textContent =
        reservations.length;

    document.getElementById("reportTournaments")
        .textContent =
        tournaments.length;


    const unread =
        notifications.filter(
            n => !n.read
        ).length;


    document.getElementById("notificationCount")
        .textContent = unread;


    document.getElementById("queueStatus")
        .textContent =
        queue.filter(
            p => p.status === "Waiting"
        ).length +
        " players waiting";


    const summary =
        document.getElementById(
            "reportSummary"
        );


    if (summary) {

        summary.innerHTML = `

            <div class="summary-row">

                <span>
                    Total registered courts
                </span>

                <strong>
                    ${courts.length}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Players currently in queue
                </span>

                <strong>
                    ${queue.filter(p => p.status === "Waiting").length}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Total court reservations
                </span>

                <strong>
                    ${reservations.length}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Active tournaments
                </span>

                <strong>
                    ${tournaments.length}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Recorded matches
                </span>

                <strong>
                    ${matches.length}
                </strong>

            </div>

        `;

    }

}



/* =========================================================
   COURTS
========================================================= */

function renderCourts() {

    const container =
        document.getElementById(
            "courtsContainer"
        );

    container.innerHTML = "";


    courts.forEach(function (court) {

        let statusClass =
            "available";

        if (court.status === "In Game") {

            statusClass =
                "ingame";

        } else if (
            court.status === "Maintenance"
        ) {

            statusClass =
                "maintenance";

        }


        container.innerHTML += `

            <div class="court-card">

                <div class="court-image">

                    <div class="court-number">

                        ${escapeHTML(court.name)}

                    </div>

                </div>


                <div class="court-body">

                    <h3>
                        ${escapeHTML(court.name)}
                    </h3>

                    <p>
                        <i class="bi bi-geo-alt"></i>
                        ${escapeHTML(court.location)}
                    </p>


                    <span class="status-badge ${statusClass}">

                        ${escapeHTML(court.status)}

                    </span>


                    <div class="court-actions">

                        <button
                            class="small-button"
                            onclick="editCourt(${court.id})">

                            <i class="bi bi-pencil"></i>
                            Edit

                        </button>


                        <button
                            class="small-button delete-button"
                            onclick="deleteCourt(${court.id})">

                            <i class="bi bi-trash"></i>
                            Delete

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}



function openCourtModal() {

    document.getElementById("courtForm")
        .reset();

    document.getElementById("courtId")
        .value = "";

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "courtModal"
            )
        );

    modal.show();

}



document.getElementById("courtForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "courtId"
                ).value;


            const name =
                document.getElementById(
                    "courtName"
                ).value;


            const location =
                document.getElementById(
                    "courtLocation"
                ).value;


            const status =
                document.getElementById(
                    "courtStatus"
                ).value;


            if (id) {

                const court =
                    courts.find(
                        c => c.id == id
                    );

                court.name = name;

                court.location = location;

                court.status = status;

            } else {

                courts.push({

                    id: Date.now(),

                    name: name,

                    location: location,

                    status: status

                });

            }


            saveData(
                "pickle_courts",
                courts
            );


            renderCourts();

            updateDashboard();


            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "courtModal"
                    )
                )
                .hide();


            addNotification(
                "Court Updated",
                `${name} has been added or updated.`
            );

        }
    );



function editCourt(id) {

    const court =
        courts.find(
            c => c.id === id
        );


    if (!court) return;


    document.getElementById("courtId")
        .value = court.id;

    document.getElementById("courtName")
        .value = court.name;

    document.getElementById("courtLocation")
        .value = court.location;

    document.getElementById("courtStatus")
        .value = court.status;


    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "courtModal"
            )
        );

    modal.show();

}



function deleteCourt(id) {

    const court =
        courts.find(
            c => c.id === id
        );


    if (!court) return;


    if (
        confirm(
            `Delete ${court.name}?`
        )
    ) {

        courts =
            courts.filter(
                c => c.id !== id
            );


        saveData(
            "pickle_courts",
            courts
        );


        renderCourts();

        updateDashboard();

    }

}



/* =========================================================
   QUEUE
========================================================= */

function renderQueue() {

    const tbody =
        document.getElementById(
            "queueTableBody"
        );

    tbody.innerHTML = "";


    queue.forEach(function (player, index) {

        let statusClass =
            player.status === "Waiting"
                ? "available"
                : "ingame";


        tbody.innerHTML += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>

                    <strong>
                        ${escapeHTML(player.name)}
                    </strong>

                </td>

                <td>
                    ${escapeHTML(player.category)}
                </td>

                <td>
                    ${escapeHTML(player.team || "-")}
                </td>

                <td>
                    ${escapeHTML(player.time)}
                </td>

                <td>

                    <span class="status-badge ${statusClass}">

                        ${escapeHTML(player.status)}

                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button"
                            onclick="toggleQueueStatus(${player.id})">

                            <i class="bi bi-arrow-repeat"></i>

                        </button>


                        <button
                            class="action-button delete"
                            onclick="deleteQueuePlayer(${player.id})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}



function openQueueModal() {

    document.getElementById("queueForm")
        .reset();


    new bootstrap.Modal(
        document.getElementById(
            "queueModal"
        )
    ).show();

}



document.getElementById("queueForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "playerName"
                ).value;


            const category =
                document.getElementById(
                    "playerCategory"
                ).value;


            const team =
                document.getElementById(
                    "playerTeam"
                ).value;


            const now =
                new Date();


            const time =
                now.toLocaleTimeString(
                    [],
                    {
                        hour: "numeric",
                        minute: "2-digit"
                    }
                );


            queue.push({

                id: Date.now(),

                name: name,

                category: category,

                team: team,

                time: time,

                status: "Waiting"

            });


            saveData(
                "pickle_queue",
                queue
            );


            renderQueue();

            updateDashboard();


            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "queueModal"
                    )
                )
                .hide();


            addNotification(
                "Player Added",
                `${name} was added to the player queue.`
            );

        }
    );



function toggleQueueStatus(id) {

    const player =
        queue.find(
            p => p.id === id
        );


    if (!player) return;


    player.status =
        player.status === "Waiting"
            ? "Playing"
            : "Waiting";


    saveData(
        "pickle_queue",
        queue
    );


    renderQueue();

    updateDashboard();

}



function deleteQueuePlayer(id) {

    const player =
        queue.find(
            p => p.id === id
        );


    if (!player) return;


    if (
        confirm(
            `Remove ${player.name} from the queue?`
        )
    ) {

        queue =
            queue.filter(
                p => p.id !== id
            );


        saveData(
            "pickle_queue",
            queue
        );


        renderQueue();

        updateDashboard();

    }

}



/* =========================================================
   RESERVATIONS
========================================================= */

function renderReservations() {

    const tbody =
        document.getElementById(
            "reservationTableBody"
        );

    tbody.innerHTML = "";


    reservations.forEach(function (reservation) {

        tbody.innerHTML += `

            <tr>

                <td>
                    ${formatDate(reservation.date)}
                </td>

                <td>
                    ${escapeHTML(reservation.time)}
                </td>

                <td>

                    <strong>
                        ${escapeHTML(reservation.court)}
                    </strong>

                </td>

                <td>
                    ${escapeHTML(reservation.reservedBy)}
                </td>

                <td>
                    ${escapeHTML(reservation.purpose)}
                </td>

                <td>

                    <span class="status-badge available">

                        ${escapeHTML(reservation.status)}

                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button delete"
                            onclick="deleteReservation(${reservation.id})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}



function openReservationModal() {

    document.getElementById(
        "reservationForm"
    ).reset();


    populateCourtSelect(
        "reservationCourt"
    );


    new bootstrap.Modal(
        document.getElementById(
            "reservationModal"
        )
    ).show();

}



function populateCourtSelect(elementId) {

    const select =
        document.getElementById(
            elementId
        );


    select.innerHTML = "";


    courts.forEach(function (court) {

        if (
            court.status !== "Maintenance"
        ) {

            select.innerHTML += `

                <option value="${escapeHTML(court.name)}">

                    ${escapeHTML(court.name)}

                </option>

            `;

        }

    });

}



document.getElementById("reservationForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const date =
                document.getElementById(
                    "reservationDate"
                ).value;


            const time24 =
                document.getElementById(
                    "reservationTime"
                ).value;


            const court =
                document.getElementById(
                    "reservationCourt"
                ).value;


            const reservedBy =
                document.getElementById(
                    "reservedBy"
                ).value;


            const purpose =
                document.getElementById(
                    "reservationPurpose"
                ).value;


            /*
             * DOUBLE BOOKING CHECK
             */

            const conflict =
                reservations.some(
                    r => {

                        return (
                            r.date === date &&
                            r.time24 === time24 &&
                            r.court === court
                        );

                    }
                );


            if (conflict) {

                alert(
                    "Schedule conflict detected. This court is already reserved at this date and time."
                );

                return;

            }


            reservations.push({

                id: Date.now(),

                date: date,

                time: formatTime(time24),

                time24: time24,

                court: court,

                reservedBy: reservedBy,

                purpose: purpose,

                status: "Confirmed"

            });


            saveData(
                "pickle_reservations",
                reservations
            );


            renderReservations();

            updateDashboard();


            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "reservationModal"
                    )
                )
                .hide();


            addNotification(
                "Reservation Confirmed",
                `${court} has been reserved by ${reservedBy}.`
            );

        }
    );



function deleteReservation(id) {

    if (
        !confirm(
            "Delete this reservation?"
        )
    ) return;


    reservations =
        reservations.filter(
            r => r.id !== id
        );


    saveData(
        "pickle_reservations",
        reservations
    );


    renderReservations();

    updateDashboard();

}



/* =========================================================
   TOURNAMENTS
========================================================= */

function renderTournaments() {

    const container =
        document.getElementById(
            "tournamentContainer"
        );

    container.innerHTML = "";


    tournaments.forEach(function (tournament) {

        container.innerHTML += `

            <div class="tournament-card">

                <div class="tournament-top">

                    <div class="trophy-icon">

                        <i class="bi bi-trophy-fill"></i>

                    </div>

                    <span class="status-badge available">

                        ${escapeHTML(tournament.status)}

                    </span>

                </div>


                <h3>
                    ${escapeHTML(tournament.name)}
                </h3>


                <p>
                    ${escapeHTML(tournament.category)}
                </p>


                <div class="tournament-info">

                    <div class="info-box">

                        <span>
                            Tournament Date
                        </span>

                        <strong>
                            ${formatDate(tournament.date)}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Participants
                        </span>

                        <strong>
                            ${tournament.participants}
                        </strong>

                    </div>

                </div>


                <div class="tournament-actions">

                    <button
                        class="small-button"
                        onclick="viewTournament(${tournament.id})">

                        <i class="bi bi-eye"></i>
                        View Details

                    </button>


                    <button
                        class="small-button delete-button"
                        onclick="deleteTournament(${tournament.id})">

                        <i class="bi bi-trash"></i>
                        Delete

                    </button>

                </div>

            </div>

        `;

    });

}



function openTournamentModal() {

    document.getElementById(
        "tournamentForm"
    ).reset();


    new bootstrap.Modal(
        document.getElementById(
            "tournamentModal"
        )
    ).show();

}



document.getElementById("tournamentForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "tournamentName"
                ).value;


            const category =
                document.getElementById(
                    "tournamentCategory"
                ).value;


            const date =
                document.getElementById(
                    "tournamentDate"
                ).value;


            const participants =
                document.getElementById(
                    "tournamentParticipants"
                ).value;


            tournaments.push({

                id: Date.now(),

                name: name,

                category: category,

                date: date,

                participants:
                    Number(participants),

                status:
                    "Registration Open"

            });


            saveData(
                "pickle_tournaments",
                tournaments
            );


            renderTournaments();

            updateDashboard();


            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "tournamentModal"
                    )
                )
                .hide();


            addNotification(
                "Tournament Created",
                `${name} has been added to tournament management.`
            );

        }
    );



function viewTournament(id) {

    const tournament =
        tournaments.find(
            t => t.id === id
        );


    if (!tournament) return;


    alert(
        "Tournament: " +
        tournament.name +
        "\n\n" +

        "Category: " +
        tournament.category +
        "\n" +

        "Date: " +
        formatDate(tournament.date) +
        "\n" +

        "Participants: " +
        tournament.participants +
        "\n" +

        "Status: " +
        tournament.status
    );

}



function deleteTournament(id) {

    if (
        !confirm(
            "Delete this tournament?"
        )
    ) return;


    tournaments =
        tournaments.filter(
            t => t.id !== id
        );


    saveData(
        "pickle_tournaments",
        tournaments
    );


    renderTournaments();

    updateDashboard();

}



/* =========================================================
   MATCHES
========================================================= */

function renderMatches() {

    const tbody =
        document.getElementById(
            "matchTableBody"
        );

    tbody.innerHTML = "";


    matches.forEach(function (match) {

        tbody.innerHTML += `

            <tr>

                <td>
                    ${formatDate(match.date)}
                </td>

                <td>
                    ${escapeHTML(match.court)}
                </td>

                <td>
                    <strong>
                        ${escapeHTML(match.teamA)}
                    </strong>
                </td>

                <td>
                    <strong>
                        ${escapeHTML(match.score)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(match.teamB)}
                </td>

                <td>

                    <span class="status-badge available">

                        ${escapeHTML(match.winner)}

                    </span>

                </td>

                <td>

                    <button
                        class="action-button delete"
                        onclick="deleteMatch(${match.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}



function openMatchModal() {

    document.getElementById(
        "matchForm"
    ).reset();


    populateCourtSelect(
        "matchCourt"
    );


    new bootstrap.Modal(
        document.getElementById(
            "matchModal"
        )
    ).show();

}



document.getElementById("matchForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const date =
                document.getElementById(
                    "matchDate"
                ).value;


            const court =
                document.getElementById(
                    "matchCourt"
                ).value;


            const teamA =
                document.getElementById(
                    "teamA"
                ).value;


            const score =
                document.getElementById(
                    "matchScore"
                ).value;


            const teamB =
                document.getElementById(
                    "teamB"
                ).value;


            const winner =
                document.getElementById(
                    "matchWinner"
                ).value;


            matches.push({

                id: Date.now(),

                date: date,

                court: court,

                teamA: teamA,

                score: score,

                teamB: teamB,

                winner: winner

            });


            saveData(
                "pickle_matches",
                matches
            );


            renderMatches();


            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "matchModal"
                    )
                )
                .hide();


            addNotification(
                "Match Recorded",
                `${teamA} vs ${teamB} has been recorded.`
            );

        }
    );



function deleteMatch(id) {

    if (
        !confirm(
            "Delete this match record?"
        )
    ) return;


    matches =
        matches.filter(
            m => m.id !== id
        );


    saveData(
        "pickle_matches",
        matches
    );


    renderMatches();

}



/* =========================================================
   NOTIFICATIONS
========================================================= */

function renderNotifications() {

    const container =
        document.getElementById(
            "notificationList"
        );

    container.innerHTML = "";


    if (
        notifications.length === 0
    ) {

        container.innerHTML = `

            <div class="notification-item">

                <div class="notification-icon">

                    <i class="bi bi-check-circle"></i>

                </div>

                <div class="notification-content">

                    <h4>
                        No notifications
                    </h4>

                    <p>
                        There are currently no new system notifications.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    notifications
        .slice()
        .reverse()
        .forEach(function (notification) {

            container.innerHTML += `

                <div class="notification-item
                    ${notification.read ? "read" : ""}">

                    <div class="notification-icon">

                        <i class="bi bi-bell-fill"></i>

                    </div>


                    <div class="notification-content">

                        <h4>
                            ${escapeHTML(notification.title)}
                        </h4>

                        <p>
                            ${escapeHTML(notification.message)}
                        </p>

                    </div>


                    <div class="notification-time">

                        ${escapeHTML(notification.time)}

                    </div>

                </div>

            `;

        });

}



function addNotification(title, message) {

    notifications.push({

        id: Date.now(),

        title: title,

        message: message,

        time: "Just now",

        read: false

    });


    saveData(
        "pickle_notifications",
        notifications
    );


    renderNotifications();

    updateDashboard();

}



function clearNotifications() {

    notifications =
        notifications.map(
            n => {

                n.read = true;

                return n;

            }
        );


    saveData(
        "pickle_notifications",
        notifications
    );


    renderNotifications();

    updateDashboard();

}



/* =========================================================
   REPORT
========================================================= */

function generateReport() {

    const report = `

THE PICKLE-YARD LIPA SOUTH
PICKLEBALL MANAGEMENT SYSTEM

SYSTEM ACTIVITY REPORT
Generated: ${new Date().toLocaleString()}

----------------------------------------

TOTAL COURTS:
${courts.length}

QUEUED PLAYERS:
${queue.length}

COURT RESERVATIONS:
${reservations.length}

TOURNAMENTS:
${tournaments.length}

MATCH RECORDS:
${matches.length}

----------------------------------------

CURRENT COURTS:

${courts.map(
    c =>
        `${c.name} - ${c.status}`
).join("\n")}

----------------------------------------

CURRENT TOURNAMENTS:

${tournaments.map(
    t =>
        `${t.name} - ${t.category} - ${t.status}`
).join("\n")}

----------------------------------------

Generated by The Pickle-Yard
`;

    const blob =
        new Blob(
            [report],
            {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "pickle-yard-system-report.txt";


    link.click();


    URL.revokeObjectURL(url);

}



/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}



function formatTime(time) {

    if (!time) {
        return "";
    }


    let [
        hours,
        minutes
    ] = time.split(":");


    hours =
        Number(hours);


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    return `${hours}:${minutes} ${ampm}`;

}



function escapeHTML(text) {

    if (text === undefined ||
        text === null) {

        return "";

    }


    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}