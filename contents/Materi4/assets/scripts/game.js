const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Di bawah ini yang merupakan penerus dari Anglo-American Cataloguing Rules (AACR) adalah...',
        choice1: 'RDA',
        choice2: 'AACR3',
        choice3: 'MARC',
        choice4: 'DublinCore',
        answer: 1,
    },
    {
        question: 'Anglo-American Cataloguing Rules (AACR) diterbitkan pada tahun...',
        choice1: '1988',
        choice2: '1967',
        choice3: '1949',
        choice4: '1951',
        answer: 2,
    },
    {
        question: 'Di bawah ini yang merupakan aturan pengkatalogan yang paling pertama di terbitkan adalah...',
        choice1: 'AACR',
        choice2: "LC's Rules on Printed Cards",
        choice3: "Panizzi's 91 Rules",
        choice4: "Library Association's Catalog Rules",
        answer: 3,
    },
    {
        question: 'Siapakah yang pertama kali menyiapkan aturan penngkatalogan?',
        choice1: 'Melvil Dewey',
        choice2: 'Bohdan S. Wynar',
        choice3: 'Eric J. Hunter',
        choice4: 'Anthony Panizzi',
        answer: 4,
    },
    {
        question: 'Edisi atau versi terbaru dari aturan pengkatalogan Anglo-American Cataloguing Rules adalah...',
        choice1: 'AACR2R98',
        choice2: 'AACR3',
        choice3: 'AACR2R',
        choice4: 'AACR3R99',
        answer: 1,
    },
    {
        question: 'Di bawah ini yang bukan merupakan aturan pengkatalogan adalah...',
        choice1: 'AACR',
        choice2: 'OCLC',
        choice3: "Panizzi's 91 Rules",
        choice4: "LC's Rules on Printed Cards",
        answer: 2,
    },
    {
        question: 'Di bawah ini yang bukan merupakan edisi dari Anglo-American Cataloguing Rules adalah...',
        choice1: 'AACR2',
        choice2: 'AACR2R',
        choice3: 'AACR3',
        choice4: 'AACR2R98',
        answer: 3,
    },
    {
        question: 'Anglo-American Cataloguing Rules Second Edition rilis pada tahun...',
        choice1: '1975',
        choice2: '1976',
        choice3: '1977',
        choice4: '1978',
        answer: 4,
    },
    {
        question: 'Berikut yang bukan merupakan bagian dari AACR adalah...',
        choice1: 'reference and citings',
        choice2: 'non-book materials',
        choice3: 'description',
        choice4: 'entry and heading',
        answer: 1,
    },
    {
        question: 'AACR2 1978 dibagi menjadi dua bagian, yaitu...',
        choice1: '(1) Entry and heading, (2) Reference and citings',
        choice2: '(1) Description, (2) Entry and heading',
        choice3: '(1) Description, (2) Reference and citings',
        choice4: '(1) Entry and heading, (2) Non-book materials',
        answer: 2,
    },
    {
        question: 'Berikut yang bukan merupakan daerah deskripsi AACR2R adalah...',
        choice1: 'catatan',
        choice2: 'nomor standar',
        choice3: 'referensi',
        choice4: 'edisi',
        answer: 3,
    },
    {
        question: 'Berikut yang bukan merupakan daerah deskripsi AACR2R adalah...',
        choice1: 'judul dan pernyataan tanggung jawab',
        choice2: 'publikasi, distribusi, dll',
        choice3: 'deskripsi fisik',
        choice4: 'biografi penanggung jawab',
        answer: 4,
    },
    {
        question: 'Pengertian dari katalog adalah...',
        choice1: 'merupakan kumpulan catatan bibliografi yang terorganisir yang mewakili kepemilikan koleksi tertentu',
        choice2: 'merupakan aturan untuk menulis bibliografi koleksi',
        choice3: 'merupakan kumpulan catatan sirkulasi suatu perpustakaan',
        choice4: 'merupakan proses pembuatan katalog yang biasanya dimulai dari katalogisasi deskriptif dan dilanjutkan dengan analisis subjek',
        answer: 1,
    },
    {
        question: 'Apakah yang dimaksud dengan katalogisasi atau cataloging...',
        choice1: 'merupakan kumpulan catatan sirkulasi suatu perpustakaan',
        choice2: 'merupakan proses pembuatan katalog yang biasanya dimulai dari katalogisasi deskriptif dan dilanjutkan dengan analisis subjek',
        choice3: 'merupakan kumpulan catatan bibliografi yang terorganisir yang mewakili kepemilikan koleksi tertentu',
        choice4: 'merupakan aturan untuk menulis bibliografi koleksi',
        answer: 2,
    },
    {
        question: "Di bawah ini dapat diisi dalam daerah 'khusus' di aturan pengkatalogan AACR2R, kecuali...",
        choice1: 'penunjukan file',
        choice2: 'skala',
        choice3: 'ilustrasi',
        choice4: 'pernyataan presentasi musik',
        answer: 3,
    },
    {
        question: "Di bawah ini dapat diisi dalam daerah 'publikasi, distribusi, dll' di aturan pengkatalogan AACR2R, kecuali...",
        choice1: 'tempat publikasi',
        choice2: 'penerbit',
        choice3: 'tanggal publikasi',
        choice4: 'alamat penulis',
        answer: 4,
    },
    {
        question: "Daerah 'judul dan pernyataan tanggung jawab' di aturan pengkatalogan AACR2R diisi dengan...",
        choice1: 'judul paralel',
        choice2: 'judul seri',
        choice3: 'distributor',
        choice4: 'penerbit',
        answer: 1,
    },
    {
        question: "Daerah 'edisi' di aturan pengkatalogan AACR2R diisi dengan...",
        choice1: 'pernyataan seri',
        choice2: 'pernyataan edisi',
        choice3: 'pernyataan tanggal',
        choice4: 'pernyataan subseri',
        answer: 2,
    },
    {
        question: "Di bawah ini dapat diisi dalam daerah 'deskripsi fisik' di aturan pengkatalogan AACR2R, kecuali...",
        choice1: 'ilustrasi',
        choice2: 'jumlah halaman',
        choice3: 'subseri',
        choice4: 'volume',
        answer: 3,
    },
    {
        question: "Di bawah ini dapat diisi dalam daerah 'seri' di aturan pengkatalogan AACR2R, kecuali...",
        choice1: 'judul seri',
        choice2: 'subseri',
        choice3: 'nomor seri',
        choice4: 'volume',
        answer: 4,
    },
    {
        question: "Daerah 'catatan' di aturan pengkatalogan AACR2R diisi dengan...",
        choice1: 'adaptasi',
        choice2: 'dimensi',
        choice3: 'subseri',
        choice4: 'skala',
        answer: 1,
    },
    {
        question: "Di bawah ini dapat diisi dalam daerah 'nomor standar' di aturan pengkatalogan AACR2R, kecuali...",
        choice1: 'ISBN',
        choice2: 'MARC',
        choice3: 'ISSN',
        choice4: 'DOI',
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

// Untuk function gambar !!!
function funcTest() {
    var b = document.getElementById("question").textContent;
        if(b == "Nomor klasifikasi dari buku dibawah adalah...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img1" ).style.display = "inline";
        }   else if(b == "Nomor klasifikasi buku dibawah adalah...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img2" ).style.display = "inline";
        }   else if(b == "Buku dibawah memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img3" ).style.display = "inline";
        }   else if(b == "Buku dibawah ini memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img4" ).style.display = "inline";
        }   else if(b == "Buku ini memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img5" ).style.display = "inline";
        }   else if(b == "Apakah nomor klasifikasi dari buku dibawah...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img6" ).style.display = "inline";
        }   else {
            document.getElementById( "img1" ).style.display = "none";document.getElementById( "img2" ).style.display = "none";document.getElementById( "img3" ).style.display = "none";document.getElementById( "img4" ).style.display = "none";document.getElementById( "img5" ).style.display = "none";document.getElementById( "img6" ).style.display = "none";
        }
}
// Sampai Sini !!!

function funcTest2() {
    document.getElementById( "img1" ).style.display = "none";document.getElementById( "img2" ).style.display = "none";document.getElementById( "img3" ).style.display = "none";document.getElementById( "img4" ).style.display = "none";document.getElementById( "img5" ).style.display = "none";document.getElementById( "img6" ).style.display = "none";
}

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 12 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Pertanyaan ${questionCounter} dari ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()