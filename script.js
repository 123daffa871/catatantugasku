// ==========================================
// TUGASKU - PENGINGAT TUGAS PELAJAR
// ==========================================

let tasks = JSON.parse(localStorage.getItem("tugasKu")) || [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("taskModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const searchInput = document.getElementById("searchInput");
const filterSubject = document.getElementById("filterSubject");
const filterStatus = document.getElementById("filterStatus");

const darkModeBtn = document.getElementById("darkModeBtn");


// ==========================================
// MODAL
// ==========================================

openModalBtn.addEventListener("click", () => {
    modal.classList.add("active");

    // Tanggal default = hari ini
    document.getElementById("deadline").value =
        new Date().toISOString().split("T")[0];

    document.getElementById("time").value = "23:59";
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove("active");
}


// ==========================================
// TAMBAH TUGAS
// ==========================================

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("taskName").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const description = document.getElementById("description").value.trim();
    const deadline = document.getElementById("deadline").value;
    const time = document.getElementById("time").value;
    const priority = document.getElementById("priority").value;
    const reminder = Number(document.getElementById("reminder").value);

    const task = {
        id: Date.now(),
        name,
        subject,
        description,
        deadline,
        time,
        priority,
        reminder,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);

    saveTasks();

    taskForm.reset();
    closeModal();

    showToast("✅ Tugas berhasil ditambahkan!");

    renderTasks();
});


// ==========================================
// SIMPAN LOCAL STORAGE
// ==========================================

function saveTasks() {
    localStorage.setItem("tugasKu", JSON.stringify(tasks));
}


// ==========================================
// FORMAT TANGGAL
// ==========================================

function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


// ==========================================
// STATUS DEADLINE
// ==========================================

function getDeadlineStatus(task) {

    const deadline = new Date(
        `${task.deadline}T${task.time}`
    );

    const now = new Date();

    if (task.completed) {
        return "completed";
    }

    if (deadline < now) {
        return "late";
    }

    return "pending";
}


// ==========================================
// COUNTDOWN
// ==========================================

function getCountdown(task) {

    if (task.completed) {
        return "✅ Sudah selesai";
    }

    const deadline = new Date(
        `${task.deadline}T${task.time}`
    );

    const now = new Date();

    let difference = deadline - now;

    if (difference <= 0) {
        return "⚠️ Deadline telah lewat";
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    difference %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(
        difference / (1000 * 60 * 60)
    );

    difference %= 1000 * 60 * 60;

    const minutes = Math.floor(
        difference / (1000 * 60)
    );

    if (days > 0) {
        return `⏳ ${days} hari ${hours} jam lagi`;
    }

    if (hours > 0) {
        return `⏳ ${hours} jam ${minutes} menit lagi`;
    }

    return `🔥 ${minutes} menit lagi`;
}


// ==========================================
// PRIORITAS
// ==========================================

function getPriorityText(priority) {

    if (priority === "high") {
        return "🔴 Penting";
    }

    if (priority === "medium") {
        return "🟡 Sedang";
    }

    return "🟢 Santai";
}


// ==========================================
// RENDER TUGAS
// ==========================================

function renderTasks() {

    let filteredTasks = [...tasks];

    const search = searchInput.value.toLowerCase();
    const subjectFilter = filterSubject.value;
    const statusFilter = filterStatus.value;


    // SEARCH
    filteredTasks = filteredTasks.filter(task => {

        return (
            task.name.toLowerCase().includes(search) ||
            task.subject.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search)
        );

    });


    // SUBJECT FILTER
    if (subjectFilter !== "all") {

        filteredTasks = filteredTasks.filter(task => {
            return task.subject === subjectFilter;
        });

    }


    // STATUS FILTER
    if (statusFilter !== "all") {

        filteredTasks = filteredTasks.filter(task => {
            return getDeadlineStatus(task) === statusFilter;
        });

    }


    // SORT DEADLINE
    filteredTasks.sort((a, b) => {

        const dateA = new Date(`${a.deadline}T${a.time}`);
        const dateB = new Date(`${b.deadline}T${b.time}`);

        return dateA - dateB;

    });


    taskList.innerHTML = "";


    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }


    filteredTasks.forEach(task => {

        const status = getDeadlineStatus(task);

        const card = document.createElement("div");

        card.className =
            `task-card ${task.priority} ${
                task.completed ? "completed" : ""
            }`;

        card.innerHTML = `

            <div class="task-top">

                <div>
                    <h3>${escapeHTML(task.name)}</h3>

                    <div class="subject">
                        📚 ${escapeHTML(task.subject)}
                    </div>
                </div>

                <div>
                    ${getPriorityText(task.priority)}
                </div>

            </div>


            ${
                task.description
                    ? `<div class="description">
                        ${escapeHTML(task.description)}
                       </div>`
                    : ""
            }


            <div class="task-info">

                <span class="info">
                    📅 ${formatDate(task.deadline)}
                </span>

                <span class="info">
                    🕐 ${task.time}
                </span>

                <span class="info">
                    ${getCountdown(task)}
                </span>

            </div>


            <div class="task-actions">

                ${
                    task.completed
                    ? `
                        <button
                            class="complete-btn"
                            onclick="toggleComplete(${task.id})"
                        >
                            ↩️ Belum Selesai
                        </button>
                    `
                    : `
                        <button
                            class="complete-btn"
                            onclick="toggleComplete(${task.id})"
                        >
                            ✅ Selesai
                        </button>
                    `
                }

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    🗑️ Hapus
                </button>

            </div>

        `;

        taskList.appendChild(card);

    });

    updateStatistics();
    updateSubjects();
    updateNearestTask();
}


// ==========================================
// TANDAI SELESAI
// ==========================================

function toggleComplete(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    task.completed = !task.completed;

    saveTasks();
    renderTasks();

    showToast(
        task.completed
        ? "🎉 Tugas selesai!"
        : "↩️ Tugas dikembalikan"
    );
}


// ==========================================
// HAPUS TUGAS
// ==========================================

function deleteTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const confirmDelete = confirm(
        `Hapus tugas "${task.name}"?`
    );

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();

    showToast("🗑️ Tugas dihapus");
}


// ==========================================
// STATISTIK
// ==========================================

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const todayTasks = tasks.filter(task => {
        return (
            task.deadline === today &&
            !task.completed
        );
    }).length;

    const late = tasks.filter(task => {
        return getDeadlineStatus(task) === "late";
    }).length;


    document.getElementById("totalTugas").textContent = total;

    document.getElementById("tugasHariIni").textContent =
        todayTasks;

    document.getElementById("tugasSelesai").textContent =
        completed;

    document.getElementById("tugasTerlambat").textContent =
        late;
}


// ==========================================
// DAFTAR MATA PELAJARAN
// ==========================================

function updateSubjects() {

    const currentValue = filterSubject.value;

    const subjects = [
        ...new Set(
            tasks.map(task => task.subject)
        )
    ].sort();

    filterSubject.innerHTML =
        `<option value="all">Semua Pelajaran</option>`;

    subjects.forEach(subject => {

        const option = document.createElement("option");

        option.value = subject;
        option.textContent = subject;

        filterSubject.appendChild(option);

    });

    if (subjects.includes(currentValue)) {
        filterSubject.value = currentValue;
    }
}


// ==========================================
// DEADLINE TERDEKAT
// ==========================================

function updateNearestTask() {

    const nearestContent =
        document.getElementById("nearestContent");

    const unfinished = tasks
        .filter(task => !task.completed)
        .filter(task => {
            return getDeadlineStatus(task) !== "late";
        })
        .sort((a, b) => {

            const dateA =
                new Date(`${a.deadline}T${a.time}`);

            const dateB =
                new Date(`${b.deadline}T${b.time}`);

            return dateA - dateB;

        });


    if (unfinished.length === 0) {

        nearestContent.innerHTML = `
            <p>🎉 Tidak ada tugas yang harus dikerjakan.</p>
        `;

        return;
    }


    const task = unfinished[0];


    nearestContent.innerHTML = `

        <div class="nearest-card">

            <h3>
                ${escapeHTML(task.name)}
            </h3>

            <p>
                📚 ${escapeHTML(task.subject)}
            </p>

            <p>
                📅 ${formatDate(task.deadline)}
                • 🕐 ${task.time}
            </p>

            <div class="countdown">
                ${getCountdown(task)}
            </div>

        </div>

    `;
}


// ==========================================
// SEARCH & FILTER
// ==========================================

searchInput.addEventListener(
    "input",
    renderTasks
);

filterSubject.addEventListener(
    "change",
    renderTasks
);

filterStatus.addEventListener(
    "change",
    renderTasks
);


// ==========================================
// TOAST
// ==========================================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


// ==========================================
// DARK MODE
// ==========================================

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    darkModeBtn.textContent =
        dark ? "☀️" : "🌙";

    localStorage.setItem(
        "darkMode",
        dark
    );
});


if (
    localStorage.getItem("darkMode") === "true"
) {

    document.body.classList.add("dark");

    darkModeBtn.textContent = "☀️";
}


// ==========================================
// KEAMANAN HTML
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ==========================================
// UPDATE COUNTDOWN OTOMATIS
// ==========================================

setInterval(() => {

    renderTasks();

}, 30000);


// ==========================================
// NOTIFIKASI BROWSER
// ==========================================

function requestNotificationPermission() {

    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {

        Notification.requestPermission();

    }
}


function checkReminders() {

    const now = new Date();

    tasks.forEach(task => {

        if (task.completed) return;

        const deadline =
            new Date(`${task.deadline}T${task.time}`);

        const reminderTime =
            new Date(
                deadline.getTime() -
                task.reminder * 60000
            );

        const difference =
            Math.abs(now - reminderTime);

        // Toleransi 1 menit
        if (difference < 60000) {

            const notificationKey =
                `reminded_${task.id}_${task.reminder}`;

            if (
                localStorage.getItem(
                    notificationKey
                )
            ) {
                return;
            }


            if (
                "Notification" in window &&
                Notification.permission === "granted"
            ) {

                new Notification(
                    "⏰ Pengingat Tugas",
                    {
                        body:
                            `${task.name} - ${task.subject}`
                    }
                );

            } else {

                showToast(
                    `⏰ Pengingat: ${task.name}`
                );

            }


            localStorage.setItem(
                notificationKey,
                "true"
            );

        }

    });

}


// Cek setiap 30 detik
setInterval(
    checkReminders,
    30000
);


// Minta izin notifikasi
requestNotificationPermission();


// ==========================================
// JALANKAN APLIKASI
// ==========================================

renderTasks();