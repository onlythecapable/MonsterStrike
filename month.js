// 今日の日付（常時更新のため関数内で再取得する）
const year = new Date().getFullYear();
const month = new Date().getMonth();

// 今月の最終日（天魔用）
const lastDayOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

// イベント一覧
const events = [
  {
    name: "破界の星墓",
    start: new Date(year, month, 27, 12, 0, 0),
    end: new Date(year, month + 1, 21, 11, 59, 59),
    id: "seibo_id",
    checkId: "seibo_check"
  },
  {
    name: "天魔の孤城",
    start: new Date(year, month, 1, 0, 0, 0),
    end: lastDayOfMonth,
    id: "tenma_id",
    checkId: "tenma_check"
  },
  {
    name: "覇者の塔",
    start: new Date(year, month, 7, 12, 0, 0),
    end: new Date(year, month, 25, 11, 59, 59),
    id: "hasya_id",
    checkId: "hasya_check"
  },
  {
    name: "未開の大地",
    start: new Date(year, month, 14, 12, 0, 0),
    end: new Date(year, month, 29, 11, 59, 59),
    id: "sakyu_id",
    checkId: "sakyu_check"
  },
  {
    name: "禁忌の獄",
    start: new Date(year, month, 21, 12, 0, 0),
    end: new Date(year, month + 1, 8, 11, 59, 59),
    id: "kinki_id",
    checkId: "kinki_check"
  },
  {
    name: "絶級トーナメント",
    start: new Date(year, month, 26, 12, 0, 0),
    end: new Date(year, month + 1, 6, 11, 59, 59),
    id: "zekkyu_id",
    checkId: "zekkyu_check"
  }
];

// 時間を「日：時：分：秒」に変換する関数
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}日${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ★★★ 毎月コンテンツを常時更新する関数
function updateMonthlyEvents() {
  const now = new Date(); // ← 毎秒更新される

  events.forEach(event => {
    const element = document.getElementById(event.id);
    const checkbox = document.getElementById(event.checkId);

    if (!element || !checkbox) return;

    let text = "";

    // 開催中
    if (event.start <= now && now <= event.end) {
      const diffTime = event.end - now;
      const timeLeft = formatTime(diffTime);
      text = `${event.name}：開催中／終了まであと ${timeLeft}`;

      element.classList.add("active");

      // ★ チェックボックスを勝手に変更しない（削除済み）

    // 未開催
    } else if (now < event.start) {
      const diffTime = event.start - now;
      const timeLeft = formatTime(diffTime);
      text = `${event.name}：未開催／開始まであと ${timeLeft}`;

      element.classList.remove("active");

    // 終了済み
    } else {
      text = `${event.name}：終了済み`;

      element.classList.remove("active");

      // ★ チェックボックスを勝手に変更しない（削除済み）
    }

    element.textContent = text;

    // チェック変更時に保存
    checkbox.addEventListener("change", () => {
      localStorage.setItem(event.checkId, checkbox.checked);
    });

    // 保存されたチェック状態を反映
    const saved = localStorage.getItem(event.checkId);
    if (saved === "true") checkbox.checked = true;
  });
}

// ★ 初回実行
updateMonthlyEvents();

// ★ 1秒ごとに常時更新
setInterval(updateMonthlyEvents, 1000);
