// ===============================
// 新規降臨キャラ（終了時間は1つだけ）
// ===============================
const newCharacters = [
    "イゴーロナク（光／激究極）",
    "ロイガー＆ツァール（水／究極）",
    "ショゴス（木／星５制限）"
];

// 新規降臨キャラの終了日時（まとめて1つ）
const newCharactersEnd = new Date(2026, 6, 14, 11, 59, 59);

// ===============================
// 期間限定コンテンツ（個別に終了日時を設定）
// ===============================
const limitedContents = [
    {
        name: "クイズDEストライク",
        end: new Date(2026, 6, 17, 3, 59, 59)
    },
    {
        name: "デイリーつみたてガチャ(つみたて期間)",
        end: new Date(2026, 6, 20, 23, 59, 59)
    }
];

// ===============================
// 毎日すること（0時更新 / 4時更新）
// ===============================
const dailyTasks0 = [
    "デイリーつみたてガチャ"
];

const dailyTasks4 = [
    "ログインボーナス回収",
    "スポットオーブ回収"
];

// ===============================
// 時間フォーマット
// ===============================
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days === 0) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${days}日${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ===============================
// 新規降臨キャラ（終了時間は1つだけ表示）
// ===============================
function generateNewCharacters() {
    const timeBox = document.getElementById("new_characters_time");
    const listBox = document.getElementById("new_characters");

    const now = new Date();
    const diff = newCharactersEnd - now;
    const timeLeft = formatTime(diff);

    timeBox.textContent = `終了まであと ${timeLeft}`;

    newCharacters.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("card-row");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `new_characters_check_${index}`;

        const saved = localStorage.getItem(`new_characters_check_${index}`);
        if (saved === "true") checkbox.checked = true;

        const span = document.createElement("span");
        span.textContent = item;

        checkbox.addEventListener("change", () => {
            localStorage.setItem(`new_characters_check_${index}`, checkbox.checked);
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        listBox.appendChild(div);
    });
}

// ===============================
// 期間限定コンテンツ（個別に終了時間を表示）
// ===============================
function generateLimitedContents() {
    const container = document.getElementById("limited_contents");

    limitedContents.forEach((content, index) => {
        const div = document.createElement("div");
        div.classList.add("card-row");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `limited_contents_check_${index}`;

        const saved = localStorage.getItem(`limited_contents_check_${index}`);
        if (saved === "true") checkbox.checked = true;

        const now = new Date();
        const diff = content.end - now;
        const timeLeft = formatTime(diff);

        const span = document.createElement("span");
        span.textContent = `${content.name}：終了まであと ${timeLeft}`;

        checkbox.addEventListener("change", () => {
            localStorage.setItem(`limited_contents_check_${index}`, checkbox.checked);
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        container.appendChild(div);
    });
}

// ===============================
// 毎日すること（0時更新 / 4時更新）
// ===============================
function generateDailyTasks() {
    const now = new Date();

    // 0時更新 → 次の日の 0:00
    const next0 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff0 = next0 - now;
    const timeLeft0 = formatTime(diff0);

    document.getElementById("daily_tasks_0_time").textContent =
        `更新まであと ${timeLeft0}`;

    dailyTasks0.forEach((item, index) => {
        const container = document.getElementById("daily_tasks_0");
        const div = document.createElement("div");
        div.classList.add("card-row");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `daily_tasks_0_check_${index}`;

        const saved = localStorage.getItem(`daily_tasks_0_check_${index}`);
        if (saved === "true") checkbox.checked = true;

        const span = document.createElement("span");
        span.textContent = item;

        checkbox.addEventListener("change", () => {
            localStorage.setItem(`daily_tasks_0_check_${index}`, checkbox.checked);
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        container.appendChild(div);
    });

    // 4時更新 → 次の日の 4:00
    const next4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 4, 0, 0);
    const diff4 = next4 - now;
    const timeLeft4 = formatTime(diff4);

    document.getElementById("daily_tasks_4_time").textContent =
        `更新まであと ${timeLeft4}`;

    dailyTasks4.forEach((item, index) => {
        const container = document.getElementById("daily_tasks_4");
        const div = document.createElement("div");
        div.classList.add("card-row");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `daily_tasks_4_check_${index}`;

        const saved = localStorage.getItem(`daily_tasks_4_check_${index}`);
        if (saved === "true") checkbox.checked = true;

        const span = document.createElement("span");
        span.textContent = item;

        checkbox.addEventListener("change", () => {
            localStorage.setItem(`daily_tasks_4_check_${index}`, checkbox.checked);
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        container.appendChild(div);
    });
}

// ===============================
// 実行
// ===============================
generateNewCharacters();
generateLimitedContents();
generateDailyTasks();