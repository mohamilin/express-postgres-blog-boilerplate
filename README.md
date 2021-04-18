# express-postgre

### Dokumentasi

#### SETUP AWAL

1. Buat folder docker-express-postgre
2. instal express generator dalam folder <strong> docker-express-postgre </strong> : npx express-generator --git --view=ejs
    - Pemilihan express generator karena didalamya sudah memuat :  cookie-parser, debug, ejs, express, http-errors, morgan. 
    - Pemilihan untuk ejs sebagai lokasi styling html dan css
3. Install beberapa library / package yang dibutuhkan, diantaranya :
    - Instal nodemon : npm i nodemon -D
        - nodemon adalah alat yang membantu mengembangkan aplikasi berbasis node.js dengan memulai ulang aplikasi node secara otomatis ketika perubahan file dalam direktori terdeteksi. nodemon tidak memerlukan perubahan tambahan apa pun pada kode atau metode pengembangan Anda. nodemon adalah pembungkus pengganti untuk node. 
        - menjalankan nodemon, pada package.json tambahkan dalam scripts => dev : 'nodemon ./bin/www'
        - nodemon yang digunakan dalam project ini versi 2.0.7
    - Instal sequelize : npm i sequelize --save
        - Sequelize adalah Node.js ORM berbasis janji untuk Postgres, MySQL, MariaDB, SQLite, dan Microsoft SQL Server. Ini fitur dukungan transaksi yang solid, relasi, eager and lazy loading, read replication dan banyak lagi.
        - Sequelize yang saya gunakan dalam project ini versi 6
    - Instal database postgreSQL : npm i pg pg-hstore --save
        - Saya memilih postgreSQL, lebih ke arah kenyamanan dan ingin berpartispasi memperbanyak refrensi jenis database ini.
4. TIPS
    - install beberapa library sekaligus : npm i sequelize pg pg-hstore --save
    - nama_library - D ; artinya masuk ke dalam devDependencies
    - nama_library --save ; artinya masuk ke dalam dependencies
    - PERHATIKAN package.json

#### Koneksi ke database
5. Sebelum mengkoneksikan express js ke database, kita harus menginstall postgreSQL ke local 
    - Install postgreSQL [LINK](https://www.postgresqltutorial.com/install-postgresql/om/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart-id)
    - Setelah instal di local, kita perlu membuat nama database, berikut ini beberapa perintah yang bisa dilakukan dalam OS LINUX (Ubuntu)
        - sudo -i -u postgres
        - psql
        - \l => untuk melihat List of databases
        - CREATE DATABASE nama_database OWNER nama_owner;
        - \c nama_database => untuk masuk ke dalam database yang telah dibuat

6. Dalam aplikasi ini saya mengganti <strong> var dengan const </strong>
7. Nah, sekarang kita akan koneksikan ke dalam aplikasi express
    - Instal dotenv : npm i dotenv --save
        - Penggunaan dotenv, ketika kita memiliki .env, untuk memanggilnya cukup dengan <strong>require('dotenv').config() </strong>
    - Install Sequelize Command-Line Interface (CLI) : npm install --save-dev sequelize-cli
        - Penggunaan CLI ini akan mempercepat kita dalam melakukan development karena kita akan banyak melakukan banyak tanpa manual
    - Project bootstrapping : npx sequelize-cli init
        - Setelah menjalankan perintah ini, akan terbentuk bebera folder sebagai berikut :
            - config, berisi file konfigurasi, yang memberi tahu CLI bagaimana cara terhubung dengan database
            - models, berisi semua model untuk proyek Anda
            - migrations, berisi semua file migrasi
            - seeders, berisi semua file dengan data dummy atau data awal
            - CATATAN : untuk file config.json yang ada pada folder config, saya ganti dengan config.js
    - Dalam kasus ini ada 3 file yang perlu kita sesuaikan, saya cantumkan bagian yang mengalami perubahan
        - config > config.js
            ```js
            require('dotenv').config()
            module.exports = {
                development: {
                username : process.env.DB_USERNAME,
                password : process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                host: "127.0.0.1",
                dialect: "postgres"
                } 
            }
            ```
        - model > index.js
            ```js
            const fs = require('fs');
            const path = require('path');
            const Sequelize = require('sequelize');
            const configs = require('../config/config')
            const basename = path.basename(__filename);
            const env = process.env.NODE_ENV || 'development';
            const config = configs[env];
            ```
        - app.js
            ```js
            require('dotenv').config()
            const createError = require('http-errors');
            const express = require('express');
            const path = require('path');
            const cookieParser = require('cookie-parser');
            const logger = require('morgan');
            const { Sequelize } = require('sequelize');
            const {development} = require('./config/config')
            const indexRouter = require('./routes/index');
            const usersRouter = require('./routes/users');
            const sequelize = new Sequelize(development.database, development.username, development.password, {
                host: development.host,
                dialect: development.dialect
            });
            const app = express();
            try {
                sequelize.authenticate()
                console.log('Connection has been established successfully.');
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }
            ```
    - JALANKAN di terminal : <strong>npm run dev</strong>
        - Apabila muncul <strong>Connection has been established successfully.</strong>, berarti kita telah berhasil menghubungkan database local dengan aplikasi express yang kita buat.



