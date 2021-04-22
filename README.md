# express-postgres

### Dokumentasi

#### SETUP AWAL

1. Buat folder express-postgres
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

#### Design Database
8. Skema dari database yang akan kita gunakan dalam hal ini, masih cukup sederhana, mungkin kedepannya bisa dikembangkan lebih komplek.
    - Sebelum ke skemanya, kita perlu mengenal jenis relasi antara lain one-to-one, one-to-many, many-to-many
        - Relasi <strong>One to One </strong> adalah relasi yang mana setiap satu baris data pada tabel pertama hanya berhubungan dengan satu baris pada tabel kedua.
        - Relasi <strong> One to Many </strong> adalah relasi yang mana setiap satu baris data pada tabel pertama berhubungan dengan lebih dari satu baris pada tabel kedua.
        - Relasi <strong> Many to Many </strong> adalah relasi yang mana setiap lebih dari satu baris data dari tabel pertama berhubungan dengan lebih dari satu baris data pada tabel kedua. Artinya, kedua tabel masing-masing dapat mengakses banyak data dari tabel yang direlasikan. Dalam hal ini, relasi Many to Many akan menghasilkan tabel ketiga sebagai perantara tabel kesatu dan tabel kedua sebagai tempat untuk menyimpan foreign key dari masing-masing tabel.
    - Dalam kasus ini, kita akan membuat sebuah API Blog yang terdiri tabel : roles, users, posts, comments, categories, dan tags. Adapun relasinya sebagai berikut :
        - users -> roles : many-to-many
            - akan ada tabel tambahan berupa users_roles
        - users -> posts : one-to-many
        - posts -> categories : many-to-many
            - akan ada tabel tambahan berupa posts_categories
        - posts -> comments : one-to-many
        - post -> tags : many-to-many
            - akan ada tabel tambahan berupa posts_tags

#### Migration Database
9. Nah, sekarang kita masuk kedalam pembahasan, bagaimana sih menjalankan migration dengan sequelize. 
    - Untuk menjalankan migration dan membuat model, konsepnya seperti ini :
    - npx sequelize-cli model:generate --name nama_tabel --attributes nama_kolom_1:type_data,nama_kolom_2:type_data
        - Next, kita lakukan untuk membuat model (tabel) : roles, users, posts, comments, categories, dan tags
        - tabel roles : npx sequelize-cli model:generate --name roles --attributes name_role:string
        - tabel users : npx sequelize-cli model:generate --name users --attributes fullName:string,userName:string,email:string,password:string,roleId:integer
        - tabel categories : npx sequelize-cli model:generate --name categories --attributes name_category:string,slug:string,createdAt:integer,updatedAt:integer
        - tabel posts : npx sequelize-cli model:generate --name posts --attributes categoryId:integer,title:string,slug:string,short_desc:string,content:text,createdAt:integer,image:string,updatedAt:integer
        - tabel comments : npx sequelize-cli model:generate --name comments --attributes postId:integer,title_comment:string,short_desc:string,content:text,createdAt:integer,image:string,updatedAt:integer
        - tabel tags : npx sequelize-cli model:generate --name tags --attributes title_tag:string,createdAt:integer
        - tabel users_roles : npx sequelize-cli model:generate --name users_roles --attributes userId:integer,roleId:integer
        - tabel posts_categories :  npx sequelize-cli model:generate --name posts_categories --attributes postId:integer,categoryId:integer
        - tabel posts_tags :  npx sequelize-cli model:generate --name posts_tags --attributes postId:integer,tagId:integer
#### Functional programming

10. Jika kita melihat code model, bentuknya berupa class, kita akan ubah bentuknya menjadi fungsi:
    - Untuk history nya bisa dibandingkan dalam commit => update : model database for this project dan update : change model into function


