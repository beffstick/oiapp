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

const SCORE_POINTS = 10
const MAX_QUESTIONS = 100

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