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
        question: 'Akronim dari FRBR adalah...',
        choice1: 'Functional Requirements for Bibliographic Records',
        choice2: 'Frame Resources for Bibliographic Records',
        choice3: 'Factual Resources for Bibliographic Records',
        choice4: 'Film Resources for Bibliographic Records',
        answer: 1,
    },
    {
        question: 'FRBR dikembangkan oleh...',
        choice1: 'OCLC',
        choice2: 'IFLA',
        choice3: 'OCLS',
        choice4: 'ALA',
        answer: 2,
    },
    {
        question: 'Berikut yang bukan merupakan entitas dari FRBR adalah...',
        choice1: 'karya, person, famili',
        choice2: 'objek, karya, manifestasi',
        choice3: 'penulis, tahun, interpretasi',
        choice4: 'konsep, butiran, tempat',
        answer: 3,
    },
    {
        question: 'FRBR diperkenalkan pada tahun...',
        choice1: '1999',
        choice2: '1996',
        choice3: '1997',
        choice4: '1998',
        answer: 4,
    },
    {
        question: 'FRBR adalah...',
        choice1: 'katalog induk dari banyak perpustakaan',
        choice2: 'standar untuk katalog deskriptif',
        choice3: 'konsep model yang menghubungkan data pada metadata dengan kebutuhan pengguna dan metadata-metadata lain yang saling berkaitan',
        choice4: 'standar sistem klasifikasi koleksi peprustakaan',
        answer: 3,
    },
    {
        question: 'RDA adalah akronim dari...',
        choice1: 'Resource Download and Access',
        choice2: 'Resource Description and Access',
        choice3: 'Resource Download and Apply',
        choice4: 'Resource Digging and Agriculture',
        answer: 2,
    },
    {
        question: 'Di bawah ini yang bukan merupakan pengembang atau penerbit dari RDA adalah...',
        choice1: 'The American Library Association',
        choice2: 'The Canadian Federation of Library Associations',
        choice3: 'Online Computer Library Center',
        choice4: 'Chartered Institute of Library and Information Professionals',
        answer: 3,
    },
    {
        question: 'RDA diterbitkan pada tahun...',
        choice1: '2009',
        choice2: '2008',
        choice3: '2011',
        choice4: '2010',
        answer: 4,
    },
    {
        question: 'Dibawah ini yang bukan merupakan tugas dari seorang cataloger dalam RDA adalah...',
        choice1: 'Mengidentifikasi dan mendefinisikan katalog entities',
        choice2: 'Mengidentifikasi dan mendefisinikan hal-hal yang penting (entities)',
        choice3: 'Mengidentifikasi dan mendefinisikan attributes yang merupakan karakter dari entities',
        choice4: 'Mengidentifikasi dan mendefinisikan hubungan (relationship) antar entities',
        answer: 1,
    },
    {
        question: 'Berikut ini yang merupakan tiga unsur dari FRBR adalah...',
        choice1: 'FRBA, FRBR, FBRBD',
        choice2: 'FRBR, FRAD, FRSAD',
        choice3: 'FBRB, FRBR, FRBSD',
        choice4: 'FRBS, FRBA, FBRSA',
        answer: 2,
    },
    {
        question: 'OCLC adalah akronim dari...',
        choice1: 'On-demand Catalogue Library Center',
        choice2: 'Online Catalogue Library Center',
        choice3: 'Online Computer Library Center',
        choice4: 'On-demand Computer Library Center',
        answer: 3,
    },
    {
        question: 'OCLC didirikan pada tahun...',
        choice1: '1979',
        choice2: '1978',
        choice3: '1977',
        choice4: '1967',
        answer: 4,
    },
    {
        question: 'Dibawah ini yang bukan merupakan software yang di jual oleh OCLC adalah...',
        choice1: 'WorldJournal System',
        choice2: 'WorldCat Discovery',
        choice3: 'WorldShare Management Services',
        choice4: 'Wise',
        answer: 1,
    },
    {
        question: 'Pendiri OCLC adalah...',
        choice1: 'Friedrich der Grosse',
        choice2: 'Frederick G. Kilgour',
        choice3: 'Frederick County',
        choice4: 'Frederick Douglass',
        answer: 2,
    },
    {
        question: 'Berikut merupakan beberapa direktur OCLC, kecuali...',
        choice1: 'Jay Jordan',
        choice2: 'Skip Prichard',
        choice3: 'Jason Reynolds',
        choice4: 'Rowland C. W. Brown',
        answer: 3,
    },
    {
        question: 'WorldCat adalah...',
        choice1: 'Sistem manajemen perpustakaan',
        choice2: 'Model metadata',
        choice3: 'Sistem klasifikasi',
        choice4: 'Kataalog union',
        answer: 4,
    },
    {
        question: 'Berikut merupakan bahasa yang didukung katalog WorldCat adalah...',
        choice1: 'Jepang',
        choice2: 'Arab',
        choice3: 'Rusia',
        choice4: 'Indonesia',
        answer: 1,
    },
    {
        question: 'WorldCat diluncurkan pada tahun...',
        choice1: '1996',
        choice2: '1998',
        choice3: '2001',
        choice4: '2003',
        answer: 2,
    },
    {
        question: 'WorldCat adalah katalog union yang dikembangkan oleh...',
        choice1: 'ALA',
        choice2: 'IFLA',
        choice3: 'OCLC',
        choice4: 'ICA',
        answer: 3,
    },
    {
        question: 'Database online mengenai koleksi yang dimiliki oleh perpustakaan atau kumpulan perpustakaan adalah pengertian dari...',
        choice1: 'Bibliographic database',
        choice2: 'Reference management software',
        choice3: 'Institutional repository',
        choice4: 'Online public access catalog',
        answer: 4,
    },
    {
        question: 'Resource Description and Access atau RDA merupakan penerus dari standar...',
        choice1: 'AACR2',
        choice2: 'FRBR',
        choice3: 'DDC',
        choice4: 'ISBD',
        answer: 1,
    },
    {
        question: 'Berikut yang bukan merupakan standar katalogisasi adalah...',
        choice1: 'ISBD',
        choice2: 'RDA',
        choice3: 'AACR2',
        choice4: 'DDC',
        answer: 4,
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