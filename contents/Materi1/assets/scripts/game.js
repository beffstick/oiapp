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
        question: "Tujuan dari kegiatan organisasi informasi adalah",
        choice1: "merapikan informasi",
        choice2: "menyimpan informasi",
        choice3: "memudahkan temu kembali informasi",
        choice4: "merapikan informasi",
        answer: 3,
    },
    {
        question: 'Dalam organisasi informasi, peran perpustakaan adalah sebagai lembaga...',
        choice1: 'produsen informasi',
        choice2: 'penjual informasi',
        choice3: 'penyimpan informasi',
        choice4: 'penyebaran hukum informasi',
        answer: 3,
    },
    {
        question: 'Makna perpustakaan sebagai tempat untuk melakukan penelitian terhadap naskah-naskah, dikatakan bahwa perpustakaan memiliki fungsi...',
        choice1: 'fungsi research',
        choice2: 'fungsi edukasi',
        choice3: 'fungsi informasi',
        choice4: 'fungsi kultural',
        answer: 1,
    },
    {
        question: 'Perpustakaan dapat menjadi lembaga pilihan dalam rangka pendidikan masyarakat sepanjang hayat. Pernyataan ini mengisyaratkan fungsi perpustakaan sebagai...',
        choice1: 'fungsi pendidikan',
        choice2: 'fungsi informasi',
        choice3: 'fungsi pengembangan budaya',
        choice4: 'fungsi penelitian',
        answer: 1,
    },
    {
        question: 'Data merupakan dasar dari terbentuknya sebuah informasi, di mana data dan atau informasi dalam konteks lembaga memiliki fungsi, yaitu...',
        choice1: 'sebagai bagian dari kebutuhan lembaga',
        choice2: 'sebagai aset',
        choice3: 'sebagai komoditi',
        choice4: 'sebagai aset dan komoditi',
        answer: 4,
    },
    {
        question: 'Salah satu fungsi organisasi informasi adalah menjadi alat bantu dalam...',
        choice1: 'pencetakan dokumen',
        choice2: 'penataan dokumen',
        choice3: 'pemusnahan dokumen',
        choice4: 'penjualan dokumen',
        answer: 2,
    },
    {
        question: 'Fungsi organisasi informasi yang melacak keberadaan lokasi suatu informasi adalah...',
        choice1: 'mengidentifikasi keberadaan informasi',
        choice2: 'pemilihan bahan pustaka',
        choice3: 'menilai substansi suatu karya',
        choice4: 'sistematisasi informasi',
        answer: 1,
    },
    {
        question: 'Koleksi yang masuk ke perpustakaan tidak dibiarkan begitu saja, melainkan diatur sedemikian rupa sehingga memudahkan penempatan dan penelusurannya. Ini termasuk pada fungsi organisasi informasi...',
        choice1: 'mengidentifikasi keberadaan lokasi suatu karya',
        choice2: 'mengidentifikasi informasi yang dimuat dalam suatu karya',
        choice3: 'mengumpulkan dan menyusun informasi secara sistematis',
        choice4: 'menilai substansi suatu karya',
        answer: 3,
    },
    {
        question: 'Perpustakaan dengan konsep pelayanan tanpa kertas (paperless), dengan pendekatan hemat ruang, waktu dan daya penyimpanan, dikenal dengan...',
        choice1: 'perpustakaan hybrida',
        choice2: 'perpustakaan digital',
        choice3: 'perpustakaan konvensional',
        choice4: 'perpustakaan modern',
        answer: 2,
    },
    {
        question: 'Penerbit dari sistem klasifikasi Dewey Decimal Classification (DDC) adalah...',
        choice1: 'Dewey Mervil',
        choice2: 'Dewey Melvil',
        choice3: 'Dewey Merlin',
        choice4: 'Dewey Marline',
        answer: 2,
    },
    {
        question: 'Dewey Decimal Classification (DDC) pertama kali terbit di...pada tahun...',
        choice1: 'Amerika, 1877',
        choice2: 'Inggris, 1876',
        choice3: 'Amerika, 1876',
        choice4: 'Inggris, 1877',
        answer: 3,
    },
    {
        question: 'Edisi terbaru dari Dewey Decimal Classification (DDC) adalah...yang terbit pada tahun...',
        choice1: '22, 2011',
        choice2: '23, 2012',
        choice3: '22, 2012',
        choice4: '23, 2011',
        answer: 4,
    },
    {
        question: 'Jumlah angka notasi minimal untuk DDC, yaitu...',
        choice1: '4',
        choice2: '3',
        choice3: '2',
        choice4: '1',
        answer: 2,
    },
    {
        question: 'Notasi DDC merupakan notasi...',
        choice1: 'murni yang terdiri atas angka Latin',
        choice2: 'murni yang terdiri atas angka Arab',
        choice3: 'tambahan yang terdiri atas angka Arab',
        choice4: 'tambahan yang terdiri atas angka Romawi',
        answer: 2,
    },
    {
        question: 'Salah satu fungsi indeks subjek adalah menunjukkan...',
        choice1: 'semua aspek yang berhubungan dari satu subjek yang tersebar dalam bagan klasifikasi',
        choice2: 'kata-kata dalam teks',
        choice3: 'Subjek dalam bagan klasifikasi',
        choice4: 'subjek yang di indeks dalam suatu daftar',
        answer: 1,
    },
    {
        question: 'Salah satu kelebihan DDC adalah tersedia...',
        choice1: 'indeks',
        choice2: 'bibliografi',
        choice3: 'tabel pembantu',
        choice4: 'bagan penentu',
        answer: 1,
    },
    {
        question: 'Suatu instrumen yang digunakan sebagai alat buktiyang mendukungsuatu keterangan dinamakan...',
        choice1: 'informasi',
        choice2: 'data',
        choice3: 'dokumen',
        choice4: 'memudahkan temu kembali informasi',
        answer: 3,
    },
    {
        question: 'Salah satu fungsi dokumen yang berkaitan dengan bidang hukum adalah untuk...',
        choice1: 'merekam informasi',
        choice2: 'digunakan sebagi bukti',
        choice3: 'penyebaran informasi',
        choice4: 'melengkapi keabsahan keterangan',
        answer: 2,
    },
    {
        question: 'Perbedaan antara dokumen dan dokumentasi yang difokuskan pada sifat dokumen adalah...',
        choice1: 'jika dokumen tidak merupakan unit kerja, maka dokumentasi merupakan unit kerja',
        choice2: 'jika dokumen fokus pada informasinya, maka dokumentasi fokus pada kegiatannya',
        choice3: 'jika dokumen bersifat pasif, maka dokumentasi bersifat aktif',
        choice4: 'keduanya tidak ada fokus kegiatan',
        answer: 3,
    },
    {
        question: 'Dokumen yang masih sering digunakan terus menerus dalam proses pekerjaan disebut dengan...',
        choice1: 'dokumen aktif',
        choice2: 'dokumen inaktif',
        choice3: 'dokumen semi aktif',
        choice4: 'dokumen pasif',
        answer: 1,
    },
    {
        question: 'Dokumen yang terbentuk akibat adanya proses cetak, seperti buku, film, koran, dan sejenisnya disebut dengan...',
        choice1: 'dokumen korporal',
        choice2: 'dokumen privat',
        choice3: 'dokumen lateral',
        choice4: 'dokumen struktural',
        answer: 3,
    },
    {
        question: 'Teori informasi klasik menerangkan bahwa informasi itu terdiri atas...',
        choice1: 'lambang-lambang atau simbol',
        choice2: 'data',
        choice3: 'dokumen',
        choice4: 'pengetahuan',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

// Untuk function gambar !!!
function funcTest() {
    var b = document.getElementById("question").textContent;
        if(b == "What is 1 + 1?") {
            document.getElementById( "imgtest" ).style.display = "inline";
        }   else if(b == "What is 2 + 2?") {
            document.getElementById( "imgtest2" ).style.display = "inline";
        }   else {
            document.getElementById( "imgtest" ).style.display = "none";document.getElementById( "imgtest2" ).style.display = "none";
        }
}
// Sampai Sini !!!

function funcTest2() {
    document.getElementById( 'imgtest' ).style.display = 'none';document.getElementById( 'imgtest2' ).style.display = 'none';
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