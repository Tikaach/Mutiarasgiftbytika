var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Buat variabel untuk menyimpan data permainan
var game = {
  // Ukuran papan permainan dalam kotak
  boardSize: 20,

  // Warna latar belakang papan permainan
  boardColor: "lightgreen",

  // Ukuran kotak dalam piksel
  boxSize: canvas.width / 20,

  // Warna kotak pemain
  playerColor: "blue",

  // Warna kotak musuh
  enemyColor: "red",

  // Warna kotak sumber daya
  resourceColor: "yellow",

  // Jumlah sumber daya yang tersedia
  resourceCount: 10,

  // Skor pemain
  playerScore: 0,

  // Skor musuh
  enemyScore: 0,

  // Posisi pemain dalam kotak (baris, kolom)
  playerPosition: [10, 10],

  // Posisi musuh dalam kotak (baris, kolom)
  enemyPosition: [10, 10],

  // Posisi sumber daya dalam kotak (baris, kolom)
  resourcePositions: [],

  // Fungsi untuk menginisialisasi permainan
  init: function() {
    // Acak posisi musuh
    this.enemyPosition = [
      Math.floor(Math.random() * this.boardSize),
      Math.floor(Math.random() * this.boardSize)
    ];

    // Acak posisi sumber daya
    for (var i = 0; i < this.resourceCount; i++) {
      var row = Math.floor(Math.random() * this.boardSize);
      var col = Math.floor(Math.random() * this.boardSize);
      this.resourcePositions.push([row, col]);
    }

    // Gambar papan permainan
    this.drawBoard();

    // Gambar pemain, musuh, dan sumber daya
    this.drawPlayer();
    this.drawEnemy();
    this.drawResources();

    // Tambahkan event listener untuk menangani input keyboard
    document.addEventListener("keydown", this.handleInput.bind(this));

    // Mulai loop permainan dengan interval waktu tertentu (misalnya, setiap 100 ms)
    setInterval(this.update.bind(this), 100);
  },

  // Fungsi untuk menggambar papan permainan
  drawBoard: function() {
    // Atur warna latar belakang kanvas
    context.fillStyle = this.boardColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar garis-garis pembatas kotak dengan warna hitam
    context.strokeStyle = "black";
    context.lineWidth = 1;

    for (var i = 0; i <= this.boardSize; i++) {
      // Gambar garis horizontal
      context.beginPath();
      context.moveTo(0, i * this.boxSize);
      context.lineTo(canvas.width, i * this.boxSize);
      context.stroke();

      // Gambar garis vertikal
      context.beginPath();
      context.moveTo(i * this.boxSize, 0);
      context.lineTo(i * this.boxSize, canvas.height);
      context.stroke();
    }
  },

  // Fungsi untuk menggambar pemain
  drawPlayer: function() {
    // Atur warna kotak pemain
    context.fillStyle = this.playerColor;

    // Hitung posisi x dan y dalam piksel berdasarkan posisi dalam kotak
    var x = this.playerPosition[1] * this.boxSize;
    var y = this.playerPosition[0] * this.boxSize;

    // Gambar kotak pemain dengan ukuran sedikit lebih kecil dari ukuran kotak
    context.fillRect(x + 1, y + 1, this.boxSize - 2, this.boxSize - 2);
  },

  // Fungsi untuk menggambar musuh
  drawEnemy: function() {
    // Atur warna kotak musuh
    context.fillStyle = this.enemyColor;

    // Hitung posisi x dan y dalam piksel berdasarkan posisi dalam kotak
    var x = this.enemyPosition[1] * this.boxSize;
    var y = this.enemyPosition[0] * this.boxSize;

    // Gambar kotak musuh dengan ukuran sedikit lebih kecil dari ukuran kotak
    context.fillRect(x + 1, y + 1, this.boxSize - 2, this.boxSize - 2);
  },

  // Fungsi untuk menggambar sumber daya
  drawResources: function() {
    // Atur warna kotak sumber daya
    context.fillStyle = this.resourceColor;

    // Untuk setiap posisi sumber daya
    for (var i = 0; i < this.resourcePositions.length; i++) {
      // Hitung posisi x dan y dalam piksel berdasarkan posisi dalam kotak
      var x = this.resourcePositions[i][1] * this.boxSize;
      var y = this.resourcePositions[i][0] * this.boxSize;

      // Gambar kotak sumber daya dengan ukuran sedikit lebih kecil dari ukuran kotak
      context.fillRect(x + 1, y + 1, this.boxSize - 2, this.boxSize - 2);
    }
  },

  // Fungsi untuk menangani input keyboard
  handleInput: function(event) {
    // Jika tombol panah atas ditekan
    if (event.keyCode == 38) {
      // Kurangi baris posisi pemain dengan satu, tapi jangan kurang dari nol
      this.playerPosition[0] = Math.max(0, this.playerPosition[0] - 1);
    }

    // Jika tombol panah bawah ditekan
    if (event.keyCode == 40) {
      // Tambahkan baris posisi pemain dengan satu, tapi jangan lebih dari ukuran papan permainan dikurangi satu
      this.playerPosition[0] = Math.min(this.boardSize - 1, this.playerPosition[0] + 1);
    }

    // Jika tombol panah kiri ditekan
    if (event.keyCode == 37) {
      // Kurangi kolom posisi pemain dengan satu, tapi jangan kurang dari nol
      this.playerPosition[1] = Math.max(0, this.playerPosition[1] - 1);
    }

    // Jika tombol panah kanan ditekan
    if (event.keyCode == 39) {
      // Tambahkan kolom posisi pemain dengan satu, tapi jangan lebih dari ukuran papan permainan dikurangi satu
      this.playerPosition[1] = Math.min(this.boardSize - 1, this.playerPosition[1] + 1);
    }
  },

  // Fungsi untuk memperbarui permainan
  update: function() {
    // Acak arah gerakan musuh (atas, bawah, kiri, atau kanan)
    var direction = Math.floor(Math.random() * 4);

    // Jika arah adalah atas
    if (direction == 0) {
      // Kurangi baris posisi musuh dengan satu, tapi jangan kurang dari nol
      this.enemyPosition[0] = Math.max(0, this.enemyPosition[0] - 1);
    }

    // Jika arah adalah bawah
    if (direction == 1) {
      // Tambahkan baris posisi musuh dengan satu, tapi jangan lebih dari ukuran papan permainan dikurangi satu
      this.enemyPosition[0] = Math.min(this.boardSize - 1, this.enemyPosition[0] + 1);
    }

    // Jika arah adalah kiri
    if (direction == 2) {
        // Kurangi kolom posisi musuh dengan satu, tapi jangan kurang dari nol
        this.enemyPosition[1] = Math.max(0, this.enemyPosition[1] - 1);
      }
  
      // Jika arah adalah kanan
      if (direction == 3) {
        // Tambahkan kolom posisi musuh dengan satu, tapi jangan lebih dari ukuran papan permainan dikurangi satu
        this.enemyPosition[1] = Math.min(this.boardSize - 1, this.enemyPosition[1] + 1);
      }
  
      // Cek apakah posisi pemain dan musuh sama
      if (this.playerPosition[0] == this.enemyPosition[0] && this.playerPosition[1] == this.enemyPosition[1]) {
        // Jika ya, berarti terjadi pertarungan
        // Acak hasil pertarungan (menang atau kalah)
        var result = Math.floor(Math.random() * 2);
  
        // Jika hasil adalah menang
        if (result == 0) {
          // Tambahkan skor pemain dengan satu
          this.playerScore++;
  
          // Tampilkan pesan bahwa pemain menang
          alert("You win the fight!");
        }
  
        // Jika hasil adalah kalah
        if (result == 1) {
          // Kurangi skor pemain dengan satu
          this.playerScore--;
  
          // Tampilkan pesan bahwa pemain kalah
          alert("You lose the fight!");
        }
      }
  
      // Cek apakah posisi pemain dan sumber daya sama
      for (var i = 0; i < this.resourcePositions.length; i++) {
        if (this.playerPosition[0] == this.resourcePositions[i][0] && this.playerPosition[1] == this.resourcePositions[i][1]) {
          // Jika ya, berarti pemain mengambil sumber daya
          // Tambahkan skor pemain dengan satu
          this.playerScore++;
  
          // Hapus sumber daya dari daftar posisi sumber daya
          this.resourcePositions.splice(i, 1);
  
          // Tampilkan pesan bahwa pemain mendapatkan sumber daya
          alert("You get a resource!");
        }
      }
  
      // Cek apakah posisi musuh dan sumber daya sama
      for (var i = 0; i < this.resourcePositions.length; i++) {
        if (this.enemyPosition[0] == this.resourcePositions[i][0] && this.enemyPosition[1] == this.resourcePositions[i][1]) {
          // Jika ya, berarti musuh mengambil sumber daya
          // Tambahkan skor musuh dengan satu
          this.enemyScore++;
  
          // Hapus sumber daya dari daftar posisi sumber daya
          this.resourcePositions.splice(i, 1);
  
          // Tampilkan pesan bahwa musuh mendapatkan sumber daya
          alert("The enemy gets a resource!");
        }
      }
  
      // Cek apakah semua sumber daya sudah habis
      if (this.resourcePositions.length == 0) {
        // Jika ya, berarti permainan selesai
        // Bandingkan skor pemain dan musuh
        if (this.playerScore > this.enemyScore) {
          // Jika skor pemain lebih besar, berarti pemain menang
          alert("You win the game!");
        } else if (this.playerScore < this.enemyScore) {
          // Jika skor pemain lebih kecil, berarti pemain kalah
          alert("You lose the game!");
        } else {
          // Jika skor pemain sama dengan skor musuh, berarti seri
          alert("It's a tie!");
        }
  
        // Hentikan loop permainan dengan fungsi clearInterval()
        clearInterval();
      }
  
      // Bersihkan papan permainan dari gambar sebelumnya
      this.drawBoard();
  
      // Gambar ulang pemain, musuh, dan sumber daya dengan posisi terbaru
      this.drawPlayer();
      this.drawEnemy();
      this.drawResources();
    }
  };
  
  // Panggil fungsi init untuk memulai permainan
  game.init();
  