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
        question: 'Sebuah sistem basis data dapat memiliki beberapa basis data. Setiap basis data dapat berisi/memiliki sejumlah objek basis data salah satunya adalah...',
        choice1: 'tajuk entri',
        choice2: 'film',
        choice3: 'indeks',
        choice4: 'tajuk',
        answer: 3,
    },
    {
        question: 'Terdapat beberapa tipe pemakai (user) yang berinteraksi dengan sistem, user yang paling penting dalam basis data adalah...',
        choice1: 'vendor',
        choice2: 'programer aplikasi',
        choice3: 'pustakawan',
        choice4: 'perpustakaan',
        answer: 2,
    },
    {
        question: 'DML merupakan bahasa yang bertujuan memudahkan pemakai untuk mengakses data dengan cara...',
        choice1: 'prosedural dan non prosedural',
        choice2: 'bertahap',
        choice3: 'sekali jadi',
        choice4: 'beberapa kali uji coba',
        answer: 1,
    },
    {
        question: 'Komponen fungsional basis data, di antaranya adalah...',
        choice1: 'alat simpat',
        choice2: 'perangkat akses',
        choice3: 'sistem data',
        choice4: 'file manager',
        answer: 4,
    },
    {
        question: 'Struktur basis data yang menggambarkan desain basis data secara keseluruhan dan dispesifikasikan dengan bahasa khusus yang disebut dengan...',
        choice1: 'sistem manajemen data',
        choice2: 'basis data',
        choice3: 'aplikasi',
        choice4: 'Data Defininition Language (DDL)',
        answer: 4,
    },
    {
        question: 'Sumber daya data organisasi perlu dikelola dan diorganisasikan dengan baik dengan tujuan...',
        choice1: 'memenuhi kebutuhan informasi bagi pihak yang berkepentingan',
        choice2: 'pembuatan wakil dokumen atau alat temu kembali',
        choice3: 'mempertanggungjawabkan pekerjaan profesional',
        choice4: 'mengamankan aset organisasi',
        answer: 1,
    },
    {
        question: 'Elemen data yang berupa angka numerik maupun simbol lainnya disebut sebagai...',
        choice1: 'field',
        choice2: 'karakter',
        choice3: 'jajaran dokumen di rak dan wakil ringkas dokumen',
        choice4: 'file',
        answer: 2,
    },
    {
        question: 'Sekumpulan field yang mendeskripsikan pada atribut dinamakan...',
        choice1: 'rekod',
        choice2: 'karakter',
        choice3: 'file',
        choice4: 'fileda',
        answer: 4,
    },
    {
        question: 'Elemen data yang terkumpul secara logis, dapat dipertanggungjawabkan secara hukum, misalnya...',
        choice1: 'basic data',
        choice2: 'data base program',
        choice3: 'analisis data',
        choice4: 'data sintesa',
        answer: 1,
    },
    {
        question: 'Ada beberapa kerugian distributed database, antara lain...',
        choice1: 'harga software murah',
        choice2: 'kemungkinan ada kesalahan bisa ditangani pendiam',
        choice3: 'biaya pemrosesan mudah',
        choice4: 'daerah deskripsi',
        answer: 2,
    },
    {
        question: 'Berikut di bawah ini yang termasuk jenis dari metadata adalah...',
        choice1: 'metadata dexterity',
        choice2: 'metadata konstruktural',
        choice3: 'metadata struktural',
        choice4: 'metadata interaksi',
        answer: 3,
    },
    {
        question: 'Berikut di bawah ini yang bukan termasuk dari jenis metadata adalah...',
        choice1: 'metadata deskriptif',
        choice2: 'metadata struktural',
        choice3: 'metadata administratif',
        choice4: 'metadata konstruktif',
        answer: 4,
    },
    {
        question: 'Berikut merupakan tiga unsur penting dari metadata adalah...',
        choice1: 'elemen, atribut, format',
        choice2: 'XML, DublinCore, METS',
        choice3: 'syntax, semantik, aturan konten',
        choice4: 'IFLA, ALA, OCLC',
        answer: 3,
    },
    {
        question: 'Di bawah ini yang merupakan skema metadata deskriptif adalah...',
        choice1: 'UDC',
        choice2: 'MODS',
        choice3: 'The BISAC System',
        choice4: 'METIS',
        answer: 2,
    },
    {
        question: 'Di bawah ini yang bukan termasuk skema metadata deskriptif adalah...',
        choice1: 'DublinCore',
        choice2: 'MARCXML',
        choice3: 'LCC',
        choice4: 'METS',
        answer: 3,
    },
    {
        question: 'Pengembang dari standar machine-readable cataloging (MARC) adalah...',
        choice1: 'American Library Association (ALA)',
        choice2: 'Online Computer Library Center (OCLC)',
        choice3: 'International Federation of Library Associations and Institutions (IFLA)',
        choice4: 'Library of Congress (LC)',
        answer: 4,
    },
    {
        question: 'Standar MARC dikembangkan pada tahun...',
        choice1: '1960-an',
        choice2: '1950-an',
        choice3: '1980-an',
        choice4: '1970-an',
        answer: 1,
    },
    {
        question: 'Berikut ini merupakan beberapa bidang data variabel MARC, kecuali...',
        choice1: '300 = Deskripsi fisik',
        choice2: '900 = Sejarah',
        choice3: '250 = Pernyataan edisi',
        choice4: '546 = Catatan bahasa',
        answer: 2,
    },
    {
        question: 'Berikut ini merupakan beberapa bidang data variabel MARC, kecuali...',
        choice1: '210 = Judul singkatan',
        choice2: '856 = Lokasi dan akses elektronik',
        choice3: '380 = Bentuk karya',
        choice4: '000 = Umum',
        answer: 4,
    },
    {
        question: 'Berikut ini merupakan beberapa bidang data variabel MARC adalah...',
        choice1: '400 = Bahasa',
        choice2: '370 = Deskripsi',
        choice3: '870 = alamat elektronik',
        choice4: '270 = Alamat',
        answer: 4,
    },
    {
        question: 'Berikut ini merupakan beberapa bidang data variabel MARC adalah...',
        choice1: '586 = Catatan penghargaan',
        choice2: '786= Catatan umum',
        choice3: '886= Catatan edisi',
        choice4: '686= Catatan aksi',
        answer: 1,
    },
    {
        question: 'Berikut di bawah ini yang bukan merupakan standar metadata adalah...',
        choice1: 'MARC',
        choice2: 'FRBR',
        choice3: 'METS',
        choice4: 'RAD',
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