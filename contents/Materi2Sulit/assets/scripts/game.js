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
        question: "Nomor klasifikasi dari buku dibawah adalah...(Silahkan klik tombol tampilkan gambar)",
        choice1: "899.2223",
        choice2: "823",
        choice3: "899.2213",
        choice4: "833",
        answer: 3,
    },
    {
        question: 'Berikut merupakan kelebihan dari sistem klasifikasi DDC, kecuali...',
        choice1: 'Urutan numerik kasat mata memudahkan penjajaran dan penempatan buku di rak',
        choice2: 'Sifat hierarkis notasi DDC mencerminkan hubungan antara nomor kelas',
        choice3: 'Mampu memberi hubungan subyek, yang diperoleh dari penggunaan indikator faset atau simbol yang menandai bagian komponen sebuah nomor kelas',
        choice4: 'Revisi berkala dengan interval teratur menjamin kemuktahiran bagan klasifikasi Dewey',
        answer: 3,
    },
    {
        question: 'Berikut yang merupakan kelebihan dari sistem klasifikasi DDC adalah...',
        choice1: 'DDC merupakan sistem yang sangat rumit dan mendalam',
        choice2: 'Cocok untuk pengolahan koleksi pada perpustakaan khusus',
        choice3: 'Banyak memberikan notasi yang tidak terdaftar dalam bagan',
        choice4: 'Indeks relatif menyatukan subjek yang sama dengan aspek berlainan yang terbesar dalam berbagai disiplin ilmu',
        answer: 4,
    },
    {
        question: 'Berikut merupakan kelemahan dari sistem klasifikasi DDC, kecuali...',
        choice1: 'Disiplin ilmu yang berkaitan acapkali terpencar, misalnya 300 ilmu-ilmu sosial terpisah dari 900 geografi dan sejarah',
        choice2: 'Penggunaan notasi desimal memungkinkan perluasan dan pembagian subdivisi tanpa batas',
        choice3: 'Basis sepuluh dalam DDC membatasi kemampuan perluasan sistem notasi karena dari sepuluh divisi, hanya sembil yang dapat diperluas untuk memberi tempat subjek yang bertingkat sama dalam hirarki',
        choice4: 'Penempatan beberapa subjek tertentu dipermasalahkan, misal Ilmu Perpustakaan pada kelas karya umum (000), Psikologi sebagai subdivisi dari Filsafat (100) dan Olahraga serta hiburan dalam Kesenian (700)',
        answer: 2,
    },
    {
        question: 'Berikut yang merupakan kelemahan dari sistem klasifikasi DDC adalah...',
        choice1: 'Penempatan beberapa subjek tertentu dipermasalahkan',
        choice2: 'Kurang fleksibel dalam penggunaan skemanya bagi perpustakaan yang jumlah koleksinya sedikit dan umum',
        choice3: 'Karena penggunaan table faset dapat berakibat banyak penafsiran oleh pemakaiannya',
        choice4: 'Banyak memberikan notasi yang tidak terdaftar dalam bagan',
        answer: 1,
    },
    {
        question: 'Nomor klasifikasi buku dibawah adalah...(Silahkan klik tombol tampilkan gambar)',
        choice1: '413',
        choice2: '423',
        choice3: '813',
        choice4: '823',
        answer: 4,
    },
    {
        question: 'Buku dibawah memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)',
        choice1: '153.12',
        choice2: '152.4',
        choice3: '154.2',
        choice4: '158.5',
        answer: 2,
    },
    {
        question: 'Buku dibawah ini memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)',
        choice1: '022',
        choice2: '023',
        choice3: '020',
        choice4: '021',
        answer: 3,
    },
    {
        question: 'Buku ini memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)',
        choice1: '529',
        choice2: '529.99221',
        choice3: '529.598',
        choice4: '529.3',
        answer: 1,
    },
    {
        question: 'Apakah nomor klasifikasi dari buku dibawah...(Silahkan klik tombol tampilkan gambar)',
        choice1: '909.99221',
        choice2: '909.598',
        choice3: '909',
        choice4: '909.21',
        answer: 3,
    },
    {
        question: 'Jika ada buku dengan judul "Teknik Angkasa", maka nomor klasifikasinya adalah...',
        choice1: '620.4119',
        choice2: '620.419',
        choice3: '620.04119',
        choice4: '620.0419',
        answer: 2,
    },
    {
        question: 'Jika ada buku dengan judul "Kamus Besar Bahasa Indonesia", maka nomor klasifikasinya adalah...',
        choice1: '499.22103',
        choice2: '499.2213',
        choice3: '459.83',
        choice4: '459.803',
        answer: 2,
    },
    {
        question: 'Jika ada buku dengan judul "Pendidikan Tinggi di Sumatera Barat", maka nomor kalsifikasinya adalah...',
        choice1: '378.598',
        choice2: '378.99221',
        choice3: '378.59813',
        choice4: '378.99224',
        answer: 3,
    },
    {
        question: 'Jika ada buku yang berjudul "Kamus Bahasa Indonesia-Jepang", maka nomor klasifikaisnya adalah...',
        choice1: '495.60399221',
        choice2: '495.6399221',
        choice3: '499.22103956',
        choice4: '499.2213956',
        answer: 4,
    },
    {
        question: 'Tahap awal dalam proses klasifikasi adalah menentukan...',
        choice1: 'notasi buku',
        choice2: 'bentuk penyajiannya',
        choice3: 'subjek buku',
        choice4: 'analisis subjek',
        answer: 3,
    },
    {
        question: 'Dalam menentukan subjek buku diperlukan...',
        choice1: 'kecermatan dan wawasan yang luas',
        choice2: 'wawasan yang luas tentang kepustakawanan',
        choice3: 'pengetahuan yang luas tentang klasifikasi',
        choice4: 'wawasan yang luas tentang semua subjek pengetahuan',
        answer: 1,
    },
    {
        question: 'Informasi yang terdapat pada kita pengantar sebuah buku...',
        choice1: 'memberikan gambaran terhadap isi atau subjek buku tersebut',
        choice2: 'selalu memberikan informasi tentang subjek buku tersebut',
        choice3: 'berisi tentang subjek buku tersebut',
        choice4: 'merupakan ungkapan dari pengarang tentang penyelesaian penulisan buku',
        answer: 1,
    },
    {
        question: 'Rumus untuk membentuk notasi sejarah suatu wilayah adalah...',
        choice1: '09 + tabel wilayah',
        choice2: '9 + tabel wilayah',
        choice3: '90 + tabel wilayah',
        choice4: '91 + tabel wilayah',
        answer: 2,
    },
    {
        question: 'Apabila tidak terdapat instruksi dalam tabel DDC, cara penggunaan dan penambahan tabel 1 adalah...',
        choice1: 'terdapat 2 alternatif dalam menggunakan tabel 1',
        choice2: 'pustakawan bisa mempergunakan cara lain',
        choice3: 'terdapat 4 alternatif dalam menggunakan tabel 1',
        choice4: 'pustakawan boleh menentukan cara sendiri',
        answer: 3,
    },
    {
        question: 'Rumus untuk membentuk nomor klasifikasi Fiksi indonesia adalah...',
        choice1: '8 + tabel 2 + tabel 1',
        choice2: '8 + tabel 2 + tabel 3',
        choice3: '8 + tabel 6 + tabel 1',
        choice4: '8 + tabel 6 + tabel 3',
        answer: 4,
    },
    {
        question: 'Rumus untuk membentuk nomor klasifikasi Perpustakaan di lokasi tertentu adalah...',
        choice1: '027.0 + tabel 2',
        choice2: '027 + tabel 2',
        choice3: '027.0 + tabel 6',
        choice4: '027 + tabel 6',
        answer: 1,
    },
    {
        question: "Rumus untuk membentuk nomor klasifikasi Al-Qur'an dan terjemahannya berdasarkan bahasa yang bersangkutan adalah...",
        choice1: '2X1 + tabel 6',
        choice2: '2X1.2 + tabel 6',
        choice3: '2X1 + tabel 2',
        choice4: '2X1.2 + tabel 2',
        answer: 2,
    },
]

const SCORE_POINTS = 50
const MAX_QUESTIONS = 20

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
    if(availableQuestions.length === 2 || questionCounter > MAX_QUESTIONS) {
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