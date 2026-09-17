/* =====================================================
   NIHONGO MASTER
   JavaScript
===================================================== */


/* =====================================================
   NAVIGASI
===================================================== */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

function showPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    const target = document.getElementById(pageName);

    if (target) {
        target.classList.add("active-page");
    }

    const activeButton = document.querySelector(
        `.nav-btn[data-page="${pageName}"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        showPage(button.dataset.page);

        document.getElementById("navbar")
            .classList.remove("open");

    });

});


document.querySelectorAll("[data-go]").forEach(button => {

    button.addEventListener("click", () => {
        showPage(button.dataset.go);
    });

});


document.getElementById("menuBtn").addEventListener("click", () => {

    document.getElementById("navbar")
        .classList.toggle("open");

});


/* =====================================================
   TEXT TO SPEECH
===================================================== */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        alert("Browser kamu tidak mendukung fitur suara.");
        return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "ja-JP";
    utterance.rate = 0.75;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
}


/* =====================================================
   DATA KOSAKATA
   Data contoh.
   Tambahkan data milikmu ke setiap BAB.
===================================================== */

const vocabulary = {

    1: [
        {
            jp: "わたし",
            reading: "watashi",
            meaning: "saya"
        },
        {
            jp: "あなた",
            reading: "anata",
            meaning: "kamu"
        },
        {
            jp: "せんせい",
            reading: "sensei",
            meaning: "guru"
        },
        {
            jp: "がくせい",
            reading: "gakusei",
            meaning: "siswa"
        },
        {
            jp: "かいしゃいん",
            reading: "kaishain",
            meaning: "pegawai perusahaan"
        }
    ],

    2: [
        {
            jp: "これ",
            reading: "kore",
            meaning: "ini"
        },
        {
            jp: "それ",
            reading: "sore",
            meaning: "itu"
        },
        {
            jp: "あれ",
            reading: "are",
            meaning: "itu di sana"
        },
        {
            jp: "ほん",
            reading: "hon",
            meaning: "buku"
        },
        {
            jp: "かばん",
            reading: "kaban",
            meaning: "tas"
        }
    ],

    3: [
        {
            jp: "ここ",
            reading: "koko",
            meaning: "di sini"
        },
        {
            jp: "そこ",
            reading: "soko",
            meaning: "di situ"
        },
        {
            jp: "あそこ",
            reading: "asoko",
            meaning: "di sana"
        }
    ],

    4: [
        {
            jp: "おきます",
            reading: "okimasu",
            meaning: "bangun"
        },
        {
            jp: "ねます",
            reading: "nemasu",
            meaning: "tidur"
        }
    ],

    5: [
        {
            jp: "いきます",
            reading: "ikimasu",
            meaning: "pergi"
        },
        {
            jp: "きます",
            reading: "kimasu",
            meaning: "datang"
        },
        {
            jp: "かえります",
            reading: "kaerimasu",
            meaning: "pulang"
        }
    ],

    6: [
        {
            jp: "たべます",
            reading: "tabemasu",
            meaning: "makan"
        },
        {
            jp: "のみます",
            reading: "nomimasu",
            meaning: "minum"
        }
    ]

};


/* Membuat BAB 7-25 tetap tersedia */

for (let i = 7; i <= 25; i++) {

    if (!vocabulary[i]) {
        vocabulary[i] = [];
    }

}


/* =====================================================
   TAMPILKAN KOSAKATA
===================================================== */

const vocabularyList =
    document.getElementById("vocabularyList");

const chapterSelect =
    document.getElementById("chapterSelect");

const searchVocabulary =
    document.getElementById("searchVocabulary");


function renderVocabulary() {

    const chapter = chapterSelect.value;

    const search =
        searchVocabulary.value.toLowerCase().trim();

    let data = vocabulary[chapter] || [];

    data = data.filter(item => {

        return (
            item.jp.includes(search) ||
            item.reading.toLowerCase().includes(search) ||
            item.meaning.toLowerCase().includes(search)
        );

    });

    vocabularyList.innerHTML = "";

    if (data.length === 0) {

        vocabularyList.innerHTML = `
            <div class="vocab-card">
                <h3>Belum ada data</h3>
                <p>
                    BAB ${chapter} siap diisi dengan
                    kosakata yang kamu pelajari.
                </p>
            </div>
        `;

        return;
    }


    data.forEach(item => {

        const card = document.createElement("div");

        card.className = "vocab-card";

        card.innerHTML = `
            <div class="vocab-jp">
                ${item.jp}
            </div>

            <div class="vocab-reading">
                ${item.reading}
            </div>

            <div class="vocab-meaning">
                ${item.meaning}
            </div>

            <button class="sound-btn">
                🔊 Dengarkan
            </button>
        `;

        card.querySelector(".sound-btn")
            .addEventListener("click", () => {
                speak(item.jp);
            });

        vocabularyList.appendChild(card);

    });

}


chapterSelect.addEventListener(
    "change",
    renderVocabulary
);

searchVocabulary.addEventListener(
    "input",
    renderVocabulary
);


/* =====================================================
   HIRAGANA
===================================================== */

const hiraganaBasic = [
    ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
    ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
    ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
    ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
    ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
    ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
    ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
    ["や","ya"],["ゆ","yu"],["よ","yo"],
    ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
    ["わ","wa"],["を","wo"],["ん","n"]
];


const hiraganaDakuon = [
    ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
    ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
    ["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
    ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
    ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
];


const hiraganaCombo = [
    ["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
    ["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
    ["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
    ["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
    ["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],
    ["みゃ","mya"],["みゅ","myu"],["みょ","myo"],
    ["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],
    ["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
    ["じゃ","ja"],["じゅ","ju"],["じょ","jo"],
    ["びゃ","bya"],["びゅ","byu"],["びょ","byo"],
    ["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"]
];


/* =====================================================
   KATAKANA
===================================================== */

const katakanaBasic = [
    ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
    ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
    ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
    ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
    ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
    ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
    ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
    ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
    ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
    ["ワ","wa"],["ヲ","wo"],["ン","n"]
];


const katakanaDakuon = [
    ["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
    ["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
    ["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],
    ["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],
    ["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]
];


const katakanaCombo = [
    ["キャ","kya"],["キュ","kyu"],["キョ","kyo"],
    ["シャ","sha"],["シュ","shu"],["ショ","sho"],
    ["チャ","cha"],["チュ","chu"],["チョ","cho"],
    ["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"],
    ["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],
    ["ミャ","mya"],["ミュ","myu"],["ミョ","myo"],
    ["リャ","rya"],["リュ","ryu"],["リョ","ryo"],
    ["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],
    ["ジャ","ja"],["ジュ","ju"],["ジョ","jo"],
    ["ビャ","bya"],["ビュ","byu"],["ビョ","byo"],
    ["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"],
    ["ファ","fa"],["フィ","fi"],["フェ","fe"],["フォ","fo"],
    ["ティ","ti"],["ディ","di"],["ウィ","wi"],["ウェ","we"]
];


/* =====================================================
   RENDER KANA
===================================================== */

function renderKana(containerId, data) {

    const container =
        document.getElementById(containerId);

    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");

        card.className = "kana-card";

        card.innerHTML = `
            <div class="kana-character">
                ${item[0]}
            </div>

            <div class="kana-romaji">
                ${item[1]}
            </div>
        `;

        card.addEventListener("click", () => {
            speak(item[0]);
        });

        container.appendChild(card);

    });

}


renderKana(
    "hiraganaGrid",
    hiraganaBasic
);

renderKana(
    "katakanaGrid",
    katakanaBasic
);


/* HIRAGANA TAB */

document.querySelectorAll(".kana-tab")
.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".kana-tab")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const type = button.dataset.kana;

        if (type === "hiraganaBasic") {
            renderKana("hiraganaGrid", hiraganaBasic);
        }

        if (type === "hiraganaDakuon") {
            renderKana("hiraganaGrid", hiraganaDakuon);
        }

        if (type === "hiraganaCombo") {
            renderKana("hiraganaGrid", hiraganaCombo);
        }

    });

});


/* KATAKANA TAB */

document.querySelectorAll(".katakana-tab")
.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".katakana-tab")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const type = button.dataset.kana;

        if (type === "katakanaBasic") {
            renderKana("katakanaGrid", katakanaBasic);
        }

        if (type === "katakanaDakuon") {
            renderKana("katakanaGrid", katakanaDakuon);
        }

        if (type === "katakanaCombo") {
            renderKana("katakanaGrid", katakanaCombo);
        }

    });

});


/* =====================================================
   KANJI N5
===================================================== */

const kanjiData = [

    ["一","いち / ひと","satu"],
    ["二","に / ふた","dua"],
    ["三","さん / み","tiga"],
    ["四","よん / し","empat"],
    ["五","ご / いつ","lima"],
    ["六","ろく / むっ","enam"],
    ["七","なな / しち","tujuh"],
    ["八","はち / やっ","delapan"],
    ["九","きゅう / ここの","sembilan"],
    ["十","じゅう / とお","sepuluh"],

    ["百","ひゃく","seratus"],
    ["千","せん","seribu"],
    ["万","まん","sepuluh ribu"],

    ["日","にち / ひ","hari / matahari"],
    ["月","げつ / つき","bulan"],
    ["火","か / ひ","api"],
    ["水","すい / みず","air"],
    ["木","もく / き","pohon"],
    ["金","きん / かね","emas / uang"],
    ["土","ど / つち","tanah"],

    ["山","さん / やま","gunung"],
    ["川","せん / かわ","sungai"],
    ["田","でん / た","sawah"],
    ["天","てん","langit"],
    ["気","き","energi / perasaan"],

    ["人","じん / ひと","orang"],
    ["男","だん / おとこ","laki-laki"],
    ["女","じょ / おんな","perempuan"],
    ["子","し / こ","anak"],

    ["学","がく / まな","belajar"],
    ["校","こう","sekolah"],
    ["生","せい / い","hidup / lahir"],
    ["先","せん / さき","sebelum"],

    ["本","ほん / もと","buku / dasar"],
    ["名","めい / な","nama"],
    ["年","ねん / とし","tahun"],
    ["時","じ / とき","waktu"],

    ["上","じょう / うえ","atas"],
    ["下","か / した","bawah"],
    ["中","ちゅう / なか","tengah"],
    ["外","がい / そと","luar"],

    ["右","う / みぎ","kanan"],
    ["左","さ / ひだり","kiri"],
    ["前","ぜん / まえ","depan"],
    ["後","ご / あと","belakang"],

    ["大","だい / おお","besar"],
    ["小","しょう / ちい","kecil"],
    ["長","ちょう / なが","panjang"],
    ["高","こう / たか","tinggi"],
    ["新","しん / あたら","baru"],
    ["古","こ / ふる","lama"],

    ["白","はく / しろ","putih"],
    ["黒","こく / くろ","hitam"],
    ["赤","せき / あか","merah"],
    ["青","せい / あお","biru"],

    ["食","しょく / た","makan"],
    ["飲","いん / の","minum"],
    ["見","けん / み","melihat"],
    ["聞","ぶん / き","mendengar"],

    ["行","こう / い","pergi"],
    ["来","らい / く","datang"],
    ["帰","き / かえ","pulang"],

    ["電","でん","listrik"],
    ["車","しゃ / くるま","mobil"],
    ["駅","えき","stasiun"],
    ["道","どう / みち","jalan"],

    ["雨","う / あめ","hujan"],
    ["空","くう / そら","langit"],
    ["天","てん","langit"],

    ["間","かん / あいだ","antara"],
    ["何","なに / なん","apa"]
];


function renderKanji() {

    const search =
        document.getElementById("searchKanji")
            .value
            .toLowerCase()
            .trim();

    const grid =
        document.getElementById("kanjiGrid");

    grid.innerHTML = "";

    const filtered = kanjiData.filter(item => {

        return (
            item[0].includes(search) ||
            item[1].toLowerCase().includes(search) ||
            item[2].toLowerCase().includes(search)
        );

    });


    filtered.forEach(item => {

        const card =
            document.createElement("div");

        card.className = "kanji-card";

        card.innerHTML = `
            <div class="kanji">${item[0]}</div>

            <div class="kanji-reading">
                ${item[1]}
            </div>

            <div class="kanji-meaning">
                ${item[2]}
            </div>

            <button class="sound-btn">
                🔊 Dengarkan
            </button>
        `;

        card.querySelector(".sound-btn")
            .addEventListener("click", () => {

                speak(item[0]);

            });

        grid.appendChild(card);

    });

}


document.getElementById("searchKanji")
    .addEventListener("input", renderKanji);

renderKanji();


/* =====================================================
   QUIZ
===================================================== */

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let wrong = 0;


/* Ambil kosakata yang tersedia */

function getQuizData() {

    let result = [];

    Object.values(vocabulary).forEach(chapter => {

        result.push(...chapter);

    });

    return result;

}


/* Acak */

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


/* Mulai quiz */

document.getElementById("startQuiz")
    .addEventListener("click", startQuiz);


document.getElementById("restartQuiz")
    .addEventListener("click", startQuiz);


function startQuiz() {

    const data = getQuizData();

    if (data.length < 4) {

        alert(
            "Tambahkan minimal 4 kosakata terlebih dahulu untuk menjalankan quiz."
        );

        return;
    }


    quizQuestions = shuffle(data).slice(
        0,
        Math.min(10, data.length)
    );

    currentQuestion = 0;
    score = 0;
    wrong = 0;


    document.getElementById("quizStart")
        .classList.add("hidden");

    document.getElementById("quizResult")
        .classList.add("hidden");

    document.getElementById("quizBox")
        .classList.remove("hidden");

    showQuestion();

}


/* Tampilkan soal */

function showQuestion() {

    const question =
        quizQuestions[currentQuestion];

    const allAnswers =
        shuffle([
            question.meaning,
            ...getWrongAnswers(question.meaning)
        ]).slice(0, 4);


    document.getElementById("questionNumber")
        .textContent =
        `Pertanyaan ${currentQuestion + 1} / ${quizQuestions.length}`;


    document.getElementById("scoreLive")
        .textContent =
        `Benar: ${score}`;


    document.getElementById("progress")
        .style.width =
        `${(currentQuestion / quizQuestions.length) * 100}%`;


    document.getElementById("questionWord")
        .textContent =
        question.jp;


    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";


    allAnswers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener(
            "click",
            () => checkAnswer(
                button,
                answer,
                question.meaning
            )
        );

        answers.appendChild(button);

    });

}


/* Jawaban salah */

function getWrongAnswers(correct) {

    const data = getQuizData();

    return shuffle(
        data
            .filter(item => item.meaning !== correct)
            .map(item => item.meaning)
    );

}


/* Cek jawaban */

function checkAnswer(
    button,
    selected,
    correct
) {

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (selected === correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        wrong++;

        buttons.forEach(btn => {

            if (btn.textContent === correct) {
                btn.classList.add("correct");
            }

        });

    }


    setTimeout(() => {

        currentQuestion++;

        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showResult();

        } else {

            showQuestion();

        }

    }, 800);

}


/* Hasil */

function showResult() {

    document.getElementById("quizBox")
        .classList.add("hidden");

    document.getElementById("quizResult")
        .classList.remove("hidden");


    const total =
        quizQuestions.length;

    document.getElementById("finalScore")
        .textContent = score;

    document.getElementById("correctCount")
        .textContent = score;

    document.getElementById("wrongCount")
        .textContent = wrong;


    const percentage =
        Math.round((score / total) * 100);


    let message = "";

    if (percentage >= 90) {

        message =
            "🎉 Luar biasa! Hafalanmu sangat bagus!";

    } else if (percentage >= 70) {

        message =
            "👏 Bagus! Terus latihan agar semakin lancar.";

    } else if (percentage >= 50) {

        message =
            "💪 Lumayan! Coba ulangi kosakata yang masih salah.";

    } else {

        message =
            "📚 Jangan menyerah! Belajar sedikit demi sedikit.";

    }


    document.getElementById("resultMessage")
        .textContent = message;

}


/* =====================================================
   START
===================================================== */

renderVocabulary();