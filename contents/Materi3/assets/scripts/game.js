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
        question: "Bahasa yang digunakan sebagai alat komunikasi khas dalam dunia perpustakaan dan informasi adalah...",
        choice1: "bahasa klasifikas",
        choice2: "bahasa sandi",
        choice3: "bahasa indeks",
        choice4: "bahasa terstruktur",
        answer: 3,
    },
    {
        question: "Indeks merupakan daftar urutan nama, tempat atau subjek dalam dokumen. Fungsi dari indeks sebagai sesuatu yang...",
        choice1: "menunjuk atau menanda kepada informasi",
        choice2: "mengolah data dan informasi",
        choice3: "menjadi penyebaran informasi",
        choice4: "membantu pengadaan informasi",
        answer: 1,
    },
    {
        question: "Bahasa indeks yang sering digunakan pustakawan dalam bentuk angka numerik adalah...",
        choice1: "daftar tajuk subjek",
        choice2: "bagan klasifikasi",
        choice3: "tabel statistik",
        choice4: "tesaurus",
        answer: 2,
    },
    {
        question: "Keterangan yang sering terdapat dalam daftar tajuk subjek, adalah...",
        choice1: "catatan ruang lingkup",
        choice2: "penunjukan lihat",
        choice3: "penunjukan lihat juga",
        choice4: "penunjukan istilah khusus",
        answer: 4,
    },
    {
        question: "Keterangan yang sering digunakan pada tesaurus, adalah...",
        choice1: "keterangan gunakan untuk (use for)",
        choice2: "keterangan lihat (see)",
        choice3: "keterangan subdivisi",
        choice4: "keterangan lihat juga (see also)",
        answer: 1,
    },
    {
        question: "Pengorganisasian koleksi perpustakaan umumnya dilaksanakan dalam dua tahap, tehap pertama yang harus dilakukan pustakawan adalah...",
        choice1: "penyusunan koleksi berdasarkan kehendak pengoleksi",
        choice2: "pembuatan wakil dokumen atau alat temu kembali",
        choice3: "menata informasi berdasarkan subjek tertentu",
        choice4: "pemilihan koleksi untuk dilayankan",
        answer: 2,
    },
    {
        question: "Koleksi perpustakaan agar tertata dan mudah ditemukan kembali perlu dilakukan proses pengindeksan yang akan menghasilkan dua produk, yaitu...",
        choice1: "penyimpanan informasi",
        choice2: "lembaga mengolah data dan informasi",
        choice3: "jajaran dokumen di rak dan wakil ringkas dokumen",
        choice4: "pengelolaan dan penyebaran informasi",
        answer: 3,
    },
    {
        question: "Istilah yang mewakili wakil dokumen yang berformat elektronik adalah...",
        choice1: "tajuk subjek",
        choice2: "deskripsi bibliografi",
        choice3: "information record",
        choice4: "cantuman bibliografi",
        answer: 4,
    },
    {
        question: "Pengindeksan terbagi menjadi dua tahap, salah satunya adalah...",
        choice1: "pengkatalogan deskriptif",
        choice2: "analisa subjek",
        choice3: "penerjemahan",
        choice4: "diseminasi informasi",
        answer: 1,
    },
    {
        question: "Di bawah ini yang tidak termasuk dalam delapan daerah bibliografi adalah...",
        choice1: "daerah judul dan penanggung jawab",
        choice2: "daerah edisi",
        choice3: "daerah deskripsi",
        choice4: "daerah kolasi",
        answer: 3,
    },
    {
        question: "Sebuah kata atau sekelompok kata untuk menunjukkan suatu subjek yang digunakan semua materi dengan tema sama, dikenal dengan istilah...",
        choice1: "subjek",
        choice2: "tajuk subjek",
        choice3: "indeks subjek",
        choice4: "bibliografi",
        answer: 2,
    },
    {
        question: "Salah satu prinsip dasar tajuk subjek adalah...",
        choice1: "penggunaan bagasa asing untuk semua tajuk",
        choice2: "satu istilah untuk semua (keseragaman)",
        choice3: "menggunakan notasi angka",
        choice4: "berorientasi pada jenis bahan pustaka",
        answer: 2,
    },
    {
        question: "Dalam menentukan tajuk pengarang, untuk pengarang ganda maka tajuk ditentukan pada...",
        choice1: "nama pengarang yang disebut pertama",
        choice2: "pengarang kedua",
        choice3: "pengarang pertama dan kedua",
        choice4: "judul karya",
        answer: 1,
    },
    {
        question: "Suatu buku dari karya editor, maka tajuk ditentukan pada...",
        choice1: "nama pengarang yang disebut pertama",
        choice2: "pada pengarang pertama dan kedua",
        choice3: "pada pengarang pertama",
        choice4: "judul karya",
        answer: 4,
    },
    {
        question: "Klasifikasi bahan pustaka berdasarkan sifat yang melekat pada bahan pustaka disebut dengan klasifikasi...",
        choice1: "DDC",
        choice2: "artifisial",
        choice3: "fundamental",
        choice4: "library of congress",
        answer: 2,
    },
    {
        question: "Berdasarkan aturan pengkatalogan, titik-titik di katalog di bawah diisi dengan...(Silahkan klik tampilkan gambar)",
        choice1: "Andrea Hirata/Laskar Pelangi",
        choice2: "Laskar Pelangi/Hirata, Andrea",
        choice3: "Hirata, Andrea/Laskar Pelangi",
        choice4: "Laskar Pelangi/Andrea Hirata",
        answer: 4,
    },
    {
        question: "Titik-titik di katalog di bawah berdasarkan aturan pengkatalogan diisi dengan...(Silahkan klik tampilkan gambar)",
        choice1: "Bandung: PT Mizan Pustaka, 2019",
        choice2: "PT Mizan Pustaka: Bandung, 2019",
        choice3: "2019: Bandung, PT Mizan Pustaka",
        choice4: "2019: PT Mizan Pustaka, Bandung",
        answer: 1,
    },
    {
        question: "Dari beberapa katalog buku dibawah, yang memiliki penulisan yang salah adalah...(Silahkan klik tampilkan gambar)",
        choice1: "Gambar 4",
        choice2: "Gambar 2",
        choice3: "Gambar 3",
        choice4: "Gambar 1",
        answer: 2,
    },
    {
        question: "Titik-titik di katalog di bawah seharusnya diisi dengan...(Silahkan klik tampilkan gambar)",
        choice1: "SAPIENS",
        choice2: "YUVAL NOAH HARARI",
        choice3: "HARARI, YUVAL NOAH",
        choice4: "SEJARAH",
        answer: 3,
    },
    {
        question: "Titik-titik di katalog di bawah ini diisi dengan...(Silahkan klik tampilkan gambar)",
        choice1: "1. Judul    I. Fiksi Inggris",
        choice2: "1. Harry Potter    I. Fiksi Inggris",
        choice3: "1. Judul    I. Harry Potter",
        choice4: "1. Fiksi Inggris    I. Judul",
        answer: 4,
    },
    {
        question: "Dari beberapa katalog dibawah, manakah yang memiliki penulisan yang salah adalah...(Silahkan klik tampilkan gambar)",
        choice1: "Gambar 1",
        choice2: "Gambar 2",
        choice3: "Gambar 3",
        choice4: "Gambar 4",
        answer: 1,
    },
    {
        question: "Dari beberapa katalog buku dibawah, yang memiliki penulisan yang benar adalah...(Silahkan klik tampilkan gambar)",
        choice1: "Gambar 2",
        choice2: "Gambar 3",
        choice3: "Gambar 1",
        choice4: "Gambar 4",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

// Untuk function gambar !!!
function funcTest() {
    var b = document.getElementById("question").textContent;
        if(b == "Berdasarkan aturan pengkatalogan, titik-titik di katalog di bawah diisi dengan...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img1" ).style.display = "inline";
        }   else if(b == "Titik-titik di katalog di bawah berdasarkan aturan pengkatalogan diisi dengan...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img2" ).style.display = "inline";
        }   else if(b == "Dari beberapa katalog buku dibawah, yang memiliki penulisan yang salah adalah...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img3" ).style.display = "inline";document.getElementById( "img4" ).style.display = "inline";document.getElementById( "img5" ).style.display = "inline";document.getElementById( "img6" ).style.display = "inline";
        }   else if(b == "Titik-titik di katalog di bawah seharusnya diisi dengan...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img7" ).style.display = "inline";
        }   else if(b == "Titik-titik di katalog di bawah ini diisi dengan...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img8" ).style.display = "inline";
        }   else if(b == "Dari beberapa katalog dibawah, manakah yang memiliki penulisan yang salah adalah...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img9" ).style.display = "inline";document.getElementById( "img10" ).style.display = "inline";document.getElementById( "img11" ).style.display = "inline";document.getElementById( "img12" ).style.display = "inline";
        }   else if(b == "Dari beberapa katalog buku dibawah, yang memiliki penulisan yang benar adalah...(Silahkan klik tampilkan gambar)") {
            document.getElementById( "img13" ).style.display = "inline";document.getElementById( "img14" ).style.display = "inline";document.getElementById( "img15" ).style.display = "inline";document.getElementById( "img16" ).style.display = "inline";
        }   else {
            document.getElementById( "img1" ).style.display = "none";document.getElementById( "img2" ).style.display = "none";document.getElementById( "img3" ).style.display = "none";document.getElementById( "img4" ).style.display = "none";document.getElementById( "img5" ).style.display = "none";document.getElementById( "img6" ).style.display = "none";document.getElementById( "img7" ).style.display = "none";document.getElementById( "img8" ).style.display = "none";document.getElementById( "img9" ).style.display = "none";document.getElementById( "img10" ).style.display = "none";document.getElementById( "img11" ).style.display = "none";document.getElementById( "img12" ).style.display = "none";document.getElementById( "img13" ).style.display = "none";document.getElementById( "img14" ).style.display = "none";document.getElementById( "img15" ).style.display = "none";document.getElementById( "img16" ).style.display = "none";
        }
}
// Sampai Sini !!!

function funcTest2() {
    document.getElementById( "img1" ).style.display = "none";document.getElementById( "img2" ).style.display = "none";document.getElementById( "img3" ).style.display = "none";document.getElementById( "img4" ).style.display = "none";document.getElementById( "img5" ).style.display = "none";document.getElementById( "img6" ).style.display = "none";document.getElementById( "img7" ).style.display = "none";document.getElementById( "img8" ).style.display = "none";document.getElementById( "img9" ).style.display = "none";document.getElementById( "img10" ).style.display = "none";document.getElementById( "img11" ).style.display = "none";document.getElementById( "img12" ).style.display = "none";document.getElementById( "img13" ).style.display = "none";document.getElementById( "img14" ).style.display = "none";document.getElementById( "img15" ).style.display = "none";document.getElementById( "img16" ).style.display = "none";
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