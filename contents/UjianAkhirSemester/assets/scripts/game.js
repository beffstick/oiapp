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

const SCORE_POINTS = 20
const MAX_QUESTIONS = 50

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
        }   else if(b == "Nomor klasifikasi dari buku dibawah adalah...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img17" ).style.display = "inline";
        }   else if(b == "Nomor klasifikasi buku dibawah adalah...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img18" ).style.display = "inline";
        }   else if(b == "Buku dibawah memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img19" ).style.display = "inline";
        }   else if(b == "Buku dibawah ini memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img20" ).style.display = "inline";
        }   else if(b == "Buku ini memiliki nomor klasifikasi...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img21" ).style.display = "inline";
        }   else if(b == "Apakah nomor klasifikasi dari buku dibawah...(Silahkan klik tombol tampilkan gambar)") {
            document.getElementById( "img22" ).style.display = "inline";
        }   else {
            document.getElementById( "img1" ).style.display = "none";document.getElementById( "img2" ).style.display = "none";document.getElementById( "img3" ).style.display = "none";document.getElementById( "img4" ).style.display = "none";document.getElementById( "img5" ).style.display = "none";document.getElementById( "img6" ).style.display = "none";document.getElementById( "img7" ).style.display = "none";document.getElementById( "img8" ).style.display = "none";document.getElementById( "img9" ).style.display = "none";document.getElementById( "img10" ).style.display = "none";document.getElementById( "img11" ).style.display = "none";document.getElementById( "img12" ).style.display = "none";document.getElementById( "img13" ).style.display = "none";document.getElementById( "img14" ).style.display = "none";document.getElementById( "img15" ).style.display = "none";document.getElementById( "img16" ).style.display = "none";document.getElementById( "img17" ).style.display = "none";document.getElementById( "img18" ).style.display = "none";document.getElementById( "img19" ).style.display = "none";document.getElementById( "img20" ).style.display = "none";document.getElementById( "img21" ).style.display = "none";document.getElementById( "img22" ).style.display = "none";
        }
}
// Sampai Sini !!!

function funcTest2() {
    document.getElementById( "img1" ).style.display = "none";document.getElementById( "img2" ).style.display = "none";document.getElementById( "img3" ).style.display = "none";document.getElementById( "img4" ).style.display = "none";document.getElementById( "img5" ).style.display = "none";document.getElementById( "img6" ).style.display = "none";document.getElementById( "img7" ).style.display = "none";document.getElementById( "img8" ).style.display = "none";document.getElementById( "img9" ).style.display = "none";document.getElementById( "img10" ).style.display = "none";document.getElementById( "img11" ).style.display = "none";document.getElementById( "img12" ).style.display = "none";document.getElementById( "img13" ).style.display = "none";document.getElementById( "img14" ).style.display = "none";document.getElementById( "img15" ).style.display = "none";document.getElementById( "img16" ).style.display = "none";document.getElementById( "img17" ).style.display = "none";document.getElementById( "img18" ).style.display = "none";document.getElementById( "img19" ).style.display = "none";document.getElementById( "img20" ).style.display = "none";document.getElementById( "img21" ).style.display = "none";document.getElementById( "img22" ).style.display = "none";
}

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 16 || questionCounter > MAX_QUESTIONS) {
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