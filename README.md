# express-postgres

### Dokumentasi

#### SETUP AWAL

1. Buat folder express-postgres
2. instal express generator dalam folder <strong> docker-express-postgre </strong> : npx express-generator --git --view=ejs
   - Pemilihan express generator karena didalamya sudah memuat : cookie-parser, debug, ejs, express, http-errors, morgan.
   - Pemilihan untuk ejs sebagai lokasi styling html dan css
3. Install beberapa library / package yang dibutuhkan, diantaranya :
   - Instal nodemon : `npm i nodemon -D`
     - nodemon adalah alat yang membantu mengembangkan aplikasi berbasis node.js dengan memulai ulang aplikasi node secara otomatis ketika perubahan file dalam direktori terdeteksi. nodemon tidak memerlukan perubahan tambahan apa pun pada kode atau metode pengembangan Anda. nodemon adalah pembungkus pengganti untuk node.
     - menjalankan nodemon, pada package.json tambahkan dalam scripts => dev : 'nodemon ./bin/www'
     - nodemon yang digunakan dalam project ini versi 2.0.7
   - Instal sequelize : `npm i sequelize --save`
     - Sequelize adalah Node.js ORM berbasis janji untuk Postgres, MySQL, MariaDB, SQLite, dan Microsoft SQL Server. Ini fitur dukungan transaksi yang solid, relasi, eager and lazy loading, read replication dan banyak lagi.
     - Sequelize yang saya gunakan dalam project ini versi 6
   - Instal database postgreSQL : `npm i pg pg-hstore --save`
     - Saya memilih postgreSQL, lebih ke arah kenyamanan dan ingin berpartispasi memperbanyak refrensi jenis database ini.
4. TIPS
   - install beberapa library sekaligus : `npm i sequelize pg pg-hstore --save`
   - nama_library -D ; artinya masuk ke dalam devDependencies
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

   - Instal dotenv : `npm i dotenv --save`
     - Penggunaan dotenv, ketika kita memiliki .env, untuk memanggilnya cukup dengan <strong>require('dotenv').config() </strong>
   - Install Sequelize Command-Line Interface (CLI) : `npm install --save-dev sequelize-cli`
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
       require('dotenv').config();
       module.exports = {
         development: {
           username: process.env.DB_USERNAME,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_DATABASE,
           host: '127.0.0.1',
           dialect: 'postgres',
         },
       };
       ```
     - model > index.js
       ```js
       const fs = require('fs');
       const path = require('path');
       const Sequelize = require('sequelize');
       const configs = require('../config/config');
       const basename = path.basename(__filename);
       const env = process.env.NODE_ENV || 'development';
       const config = configs[env];
       ```
     - app.js

       ```js
       const createError = require('http-errors');
       const express = require('express');
       const path = require('path');
       const cookieParser = require('cookie-parser');
       const logger = require('morgan');
       const { Sequelize } = require('sequelize');
       const { development } = require('./config/config');
       const indexRouter = require('./routes/index');
       const usersRouter = require('./routes/users');
       const sequelize = new Sequelize(development.database, development.username, development.password, {
         host: development.host,
         dialect: development.dialect,
       });
       // connect to database
       const sequelize = new Sequelize(development.database, development.username, development.password, {
         host: development.host,
         dialect: development.dialect,
       });

       sequelize
         .sync()
         .then(() => {
           console.log({ status: 'success', message: 'DB connection sucessful.' });
         })
         .catch((err) => {
           console.log({ status: 'failed', message: 'Unable to connect to the database', error: err.message });
         });

       const app = express();
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
     - tabel posts_categories : npx sequelize-cli model:generate --name posts_categories --attributes postId:integer,categoryId:integer
     - tabel posts_tags : npx sequelize-cli model:generate --name posts_tags --attributes postId:integer,tagId:integer

#### Functional programming

- CATATAN : Terdapat perubahan di bagian app.js tepatnya kode dalam connection to database.

10. Jika kita melihat code model, bentuknya berupa class, kita akan ubah bentuknya menjadi fungsi:
    - Untuk history nya bisa dibandingkan dalam commit => update : model database for this project dan update : change model into function [link](https://github.com/mohamilin/express-postgres-blog/commit/7a214a990757bc6d140142ead43e0418574ecf54#diff-6340df5e90e95d2874eb74b4aa64b5f7f49ae5e046f0702ab966b045e13889ce)

#### Refactor

11. Sekarang kita akan melakukan refactor terkait struktur folder.
12. Project Structure

    ##### CATATAN : Ketika ada perubahan pada structure project. Maka structure dibawah ini akan saya update ulang

```
src\
 |--config\         # Environment variables and configuration related things
    --logger.js
    --config.js
    --setting.js
 |--controllers\    # Route controllers (controller layer)
    --api           # controllers for endpoints
    --web           # controllers for web / views
 |--middlewares\    # Custom express middlewares
    --errorHandler.js
    --morgan.js
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
    --api
    --web
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
    --AppError.js
    --catchError.js
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--server.js       # App entry point
test
 |--fixtures
 |--integrations
 |--units
 |--utils
 |--setupTestDB.js
 |--.editorconfig
 |--.env
 |--.eslintignore
 |--.eslintrc.json
 |--.gitattributes
 |--.gitignore

```

1.  Kemudian kita terapkan eslint dan prettier agar kode kita lebih rapi. Install eslint, eslint-config-airbnb-base, eslint-plugin-import, prettier dengan membuat file .eslintrc.json, .prettierrc.json dan .editorconfig
2.  Adanya perubahan ini, saya lakukan berdasarkan berbagai refrensi yang saya baca. Harapannya Api ini bisa sangat membantu untuk pemula belajar atau bisa juga dijadikan sebagai setup project.

#### Lanjut koding

15. Terdapat banyak perubahan dalam develop project ini. Kalau menggunakan step-by-step sbagaimanan tulisan diatas, saya mengalami bug ketika ingin melakukan migration. Akhirnya saya melakukan update pada file config > config.js dan menambahkan .sequelizerc.
16. Sehingga ketika ingin menggunakan config.js pada file lain. untuk mengimport config spt ini :
    - const env = process.env.NODE_ENV || 'development';
    - const config = require(`${__dirname}/../config/config.js`)[env];

##### Logging with winston

18. Sampai saat ini, kita telah melakukan konfigurasi untuk setup awal project. Kita akan menerapkan logging dengan bantuan package winston.
    1.  Winston : Salah satu logging middlewares terbaik. Ketika package ini digunakan dalam project ini ada sekitar 9,5 juta download / week. Klik [disini](https://www.npmjs.com/package/winston) untuk dokumentasi lebih detail.
    2.  Buat file settings.js dan logger.js pada folder config dengan mengimport package winston dan file settings.js ke dalam logger.js

##### CATATAN : kedepannya, file config > settings.js akan banyak penambahan. File ini saya buat untuk penyesuaian konfigurasi yang nanti dibutuhkan.

##### Penerapan pm2 untuk sesi production

1.  PM2 is a daemon process manager that will help you manage and keep your application online.
2.  Untuk detailnya bisa kunjungi [https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)
3.  Kita buat file ecosystem.config.json pada root project.
    ```json
    {
      "apps": [
        {
          "name": "blog_api",
          "script": "src/server.js",
          "instances": 1,
          "autorestart": true,
          "watch": true,
          "time": true,
          "env": {
            "NODE_ENV": "production"
          }
        }
      ]
    }
    ```
4.  Kita install package pm2 : `npm i pm2 --save`
5.  Kita ubah scripts pada packages.json dengan "start": "pm2 start ecosystem.config.json --no-daemon"
6.  Selain itu, ada tambahan scripts untuk menjalankan migrate dan undo migrate database untuk lingkungan production, development, dan test

##### Penerapan handle errors

1. Kita install, http-status dengan perintah `npm i http-status `[link](https://github.com/adaltas/node-http-status)
2. Kita akan membuat handle error untuk api yang akan kita buat, Buat file catchError.js, ApiError.js pada src > utils
3. Selain itu, kita buat handle error sebagai middleware, dengan membuat file handlerError.js, didalam file ini terdapat 2 function yaitu errorConverter dan errorException.
4. Kemudian, ekspor ke app.js
   ```js
    const morgan = require('./middlewares/morgan');
    const { errorConverter, errorException } = require('./middlewares/errorHandler');
    const AppError = require('./utils/AppError');
    const httpStatus = require('http-status');
    ...
    ...
    ...
    // error handler
    app.use((req, res, next) => {
        next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
    });

    // convert error to AppError, if needed
    app.use(errorConverter);
    // handle error
    app.use(errorException);
   ```

##### Custom morgan

1. Morgan adalah sebuah HTTP request logger middleware untuk NodeJS, yang berfungsi sebagai pencatatan setiap request ke server. Pencatatan ini di sebut dengan istilah Logger yang dapat di akses melalui terminal.
2. Nah, disini ada artikel bagus ttg morgan. Bisa dibaca pada [link](https://medium.com/@ekaprasasti/si-tukang-catat-morganjs-5b67f24a8f00) atau dokumentasi nya [link](https://expressjs.com/en/resources/middleware/morgan.html)
3. Kita buat file morgan.js pada folder middleware dan morgan yang kita gunakan pada app.js kita pindahkan ke file tersebut.
4. import morgan ke app.js

   ```js
    const { env } = require('./config/settings');
    const morgan = require('./middlewares/morgan');
     ...
     ...
     ...
     if (env !== 'test') {
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
     }
   ```

5. Selanjutnya, kita akan register endpoints

<!-- ##### Membuat objek untuk memilih properti yang diinginkan
1. Kita akan beranjak ke folder utils dengan membuat utilitas tambahan, dengan membuat file select.js dengan menerima 2 parameter yaitu object dan key. dimana object berupa string dan keys berupa array dengan pengembalian berupa object. -->
   
##### Membuat validasi
1. Validasi sangat penting agar aplikasi yang buat tidak banyak mengalami banyak kendala. contohnya jika terdapat fitur payment dengan data yang bisa masuk sesukanya user, maka data yang ada memungkinkan tidak dapat diproses karena berhubungan dengan fungsi matematika. 
2. Kita buat folder validations. Selain itu, kita perlu menggunakan package Joi. ketika `npm i joi --save`
3. Untuk sementara kita buat validasi untuk user dan custom. Fungsi costum dapat kita gunakan untuk user sehingga bisa lebih `reusable` code kita.
4. Buat file user.js dan custom.js kemudian kita buat index.js untuk menampung file validation
5. Kemudian, kita buat file validates.js pada folder middlewares. Kenapa kita letakkan ini di dalam folder ini ? karena `validates` ini sebagai middleware yang nantinya akan kita terapkan didalam routes dan akan menampung validations yang telah kita buat.

##### Register endpoints for User

CATATAN :

1. Kita akan membuat folder api di dalam src > routes sedangankan file index.js dan user.js yang ada didalam folder routes dapat kita hapus, agar kode kita bisa lebih enak dibaca. Oke...
2. Kemudian didalam app.js kita import routes yang ada didalam routes > api dengan :
   ```js
   const apiRouter = require('./routes/api');
   ...
   ...
   ...
   ...
   app.use('/api/v1', apiRouter);
   ```
3. Selain itu, kita perlu install cors, manfaat cors dapat dibaca pada [link](https://www.npmjs.com/package/cors). cors digunakan pada file app.js

```js
const cors = require('cors');
...
...
...
app.use(cors());
```

###### Model User
1. Kita telah memiliki models untuk project ini. Didalam models users terdapat beberapa penambahan terkait property didalam models. Contohnya untuk model users :
   ```js
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
   ```
   - Kita juga bisa menggunakan untuk model yang lain, sesuai kebutuhan. untuk dokumentasi bisa dilihat pada [link](https://sequelize.org/v7/manual/model-querying-basics.html).
2. Nah, saatnya kita membuat endpointnya. Tambahkan function relasi pada model users dan roles, Kemudian kita buat data seeder dengan menjalankan seeder npx sequelize-cli seed:generate --name name-file. Nanti file yang terbentuk akan masuk ke dalam folder seeder.
3. Fungsi dari seeder ini, bagi saya sangat berguna sebagai data awal yang harus berada di dalam table. Data yang saya berikan diawal untuk table roles, users, dan users_roles.
4. Lalu, endpoint apa yang kita buat ? kita buat terlebih dahulu untuk users yaitu register, checkEmail, checkUsername.
5. Kita buat terlebih dahulu, validasinya yaitu dengan membuat object user yang didalamnya akan divalidasi terkait data yang akan berada di dalam body `(fullName, userName, email, password, roleId)`. Terkait password validasinya kita berikan argumen berupa password yang berasal dari file custom.js
6. Kemudian, buat file users.js pada folder services didalamnya terdapat function checkAvailableEmail,checkAvailableUsername, createUser (untuk createUser akan menjalankan checkAvailableEmail, dan checkAvailableUsername ). Lakukan export untuk createUser saja.
7. Selanjutnya, buat file users.js pada folder controllers > api. Buat function register dengan mengimport httpStatus, catchError, dan userService. fungsi catchError, jika terjadi error maka akan melakukan callback dengan fungsi ini. 
8. Kita daftarkan controller ke dalam folder routes > api dengan membuat file auth.js. Didalam file ini terdapat endpoint /register
  ```js
  router.post('/register', validates(userValidation.register), userControllers.register);
  ```
  - Kalau liat code diatas validasi dilakukan dengan memberikan middleware berupa `validates` dengan menerima argumen yaitu `userValidation.register`. Ketika validasi ini terpenuhi maka akan menjalankan `controller.register`
9.  Akhirnya, kita buat penampung untuk semua file di dalam folder routes > api berupa file index.js
  ```js
  const authRoutes = require('./auth');
  ....
  ...
  ..
  .
  router.use('/auth', authRoutes);
  ```

### 
`Perlu diketahui, bahwa didalam controller dan routes terdapat 2 folder yaitu api dan web`

#### Tambahan 
CATATAN : Saya mencoba untuk membuat alur sederhana mungkin, namun dalam pengembangan aplikasi ini diperlukan beberapa `trial and error`. Sehingga Dalam tambahan ini saya ingin memberikan tambahan alur secara singkat yang berkaitan dengan authentikasi dan authorisasi sebagai berikut :
  - generateToken : ketika user register dan login akan melakukan `generate token`
  - generateTokenAuth : ketika user sudah login `->` berhasil maka user akan diberikan `access dan refresh` berupa `accessToken dan refreshToken` yang disertai dengan expirednya berupa `expires`.  Hal ini terjadi setelah menjalankan fungsi `generateToken dan saveToken`.
  - dan terkait authorisasi, dimana user mendapatkan hak eksklusif untuk dapat melakukan perintah tertentu. sebagaimana kita ketahui, untuk dapat merubah data yang sensitif / penting tidak semua orang / user dapat melakukannya. Bisa kita bayangkan, bagaimana ini jika semua orang / user dapat merubahanya. Betapa kacau dan tidak amannya aplikasi yang kita bangun.
  - Sehingga, diperlukan roles dengan kemampuan melakukan perintah tertentu. 
  - Oleh karena itu, dalam `SECTION TAMBAHAN` ini, terdapat beberapa langkah yang harus kita lakukan yaitu : terdapat beberapa tambahan file yang harus kita buat : `tabel dan model tokens, service tokens, config tokens, config roles, config passport middlewares auth.js, middleware authLimiter`
  - Adapun langkah-langkahnya sebagai berikut :

1. Ketika kita akan menggunakan authentikasi (register / login), maka bagusnya kita menggunakan memiliki tabel `tokens` yang mana tabel ini akan menampung token. 
2. Jalankan perintah `npx sequelize-cli model:generate --name tokens --attributes token:string,userId:integer,type:string,expires:date,blacklisted:boolean`.
3. kemudian, pindah ke models > tokens.js & users.js tambahkan associate nya
  ```js
  //tokens.js
  Token.associate = (models) => {
    Token.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });

  //users.js
    User.hasMany(models.tokens, { as: 'tokens' });
  ```
4. Lalu, didalam token ada apa aja ? nah.. untuk token nanti bisa menampung 2 type yaitu ACCESS_TOKEN, REFRESH_TOKEN. Bukan file `tokens.js` didalam folder config
5. Selanjutnya, kita perlu menginstall package `jsonwebtoken, passport, dan passport-jwt`. Ketiga package ini akan membantu kita dalam memberikan `PERLINDUNGAN TERHADAP DATA USER`. install dengan perintah `npm i --save jsonwebtoken passport  passport-jwt express-rate-limit`
6. Kemudian, buat file `roles.js` di dalam config, dengan memberikan listRole yaitu `superAdmin, admin, user`
   ```js
   const listRoles = {
      superAdmin: ['managerUsers', 'getUsers'],
      admin: ['getUsers'],
      user: [],
    };

    const roles = Object.keys(listRoles);
    const role = new Map(Object.entries(listRoles));

    module.exports = {
      roles,
      role,
    };
   ```
7. Lalu, buat file `passport.js` pada config juga. Didalam file ini akan menjalankan `jwtStrategy` dengan membuat `jwtOptions dan jwtVerify` . Namun kita perlu melakukan penambahan konfigurasi didalam setting.js dengan membuat object jwt yang didalamnya terdapat : `secret,accessExpirationMinutes, refreshExpirationDays`. Kita perlu mengimport file ini ke app.js
   ```js
    const jwtStrategy = require('./config/passport');
    ...
    ..
    .
    // jwt | passport
    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
   ```
8. Kemudian buat file `auth.js` didalam middleware. didalam file `auth.js` ini kita akan membuat 2 variabel yaitu `verify dan auth`. Fungsi `auth` yang nantinya akan dijalankan dengan mengirim data ke fungsi `verify`. Didalam fungsi `verify` akan dilakukan pengecekan, terkait data user ada atau tidak. Jika tidak ada maka akan diberikan pengembalian berupa `UNAUTHORIZED`. Kemudian terdapat pengembalian berupa `httpStatus.FORBIDDEN`, <small> Hal ini akan terjadi ketika ada masalah pada resource atau permission website yang Anda akses. 403 forbidden muncul saat web server memahami permintaan Anda, tapi tidak bisa memberikan akses yang diminta</small>
9.  Setelah itu, kita akan buat fungsi `authRateLimiter`, dimana fungsi ini akan dijalankan dalam `production`. Install `express-rate-limit` dengan perintah `npm i express-rate-limit --save`. Adapun dokumentasinya dapat dibaca pada [link ini](https://www.npmjs.com/package/express-rate-limit). Nantinya authRateLimiter akan kita import pada app.js
    ```js
    const authRateLimiter = require('./middlewares/authRateLimiter');
    ...
    ..
    .
    if (env === 'production') {
      app.use('/api/v1/auth', authRateLimiter);
    }
    ```

##### Membuat service untuk token
1. Sudah kita singgung diatas, bahwa untuk membuat service yang diperuntukkan untuk membuat token perlu ada` generateToken, saveToken, dan generateAuthTokens`. 
2. Buat file tokens.js pada folder services. kita lakukan beberapa import diantaranya : `jwt, moment, setting / env, token config, AppError, dan type token`. untuk moment kita perlu install moment : `npm i moment --save`

##### Tambahan untuk Register endpoints for User
1. Karena kita telah memiliki token maka ketika user register, dalam sistem user akan kita buatkan token yang tersimpan dalam database `tabel tokens`.
   ```js
  // tambahan funtion register
  const tokens = await tokenService.generateTokenAuth(user);
  ```

##### Login endpoints for User
1. Selanjutnya, terkait login, bagaimana skenarionya : Ketika user melakukan login, maka data `email dan password` akan diterima dalam controller `login` selanjutnya kedua data tsb dikirim ke `userService login` dan ketika berhasil, hasilnya akan dikirim ke `tokenService.generateTokenAuth`.  

##### Refresh Token endpoints for User
- Ilustrasi:
  [link](https://www.researchgate.net/profile/Christian-Huber-21/publication/309365153/figure/fig3/AS:667672714952710@1536196988482/Access-Refresh-Token-Sequence-Flow.png)
1. `Refresh Token` adalah token khusus yang digunakan untuk mendapatkan token akses tambahan. Ini memungkinkan Anda untuk memiliki token akses yang berumur pendek tanpa harus mengumpulkan kredensial setiap kali token tersebut kedaluwarsa. Anda meminta token penyegaran di samping akses dan/atau token ID sebagai bagian dari autentikasi awal dan alur otorisasi pengguna. Aplikasi kemudian harus menyimpan token penyegaran dengan aman karena memungkinkan pengguna untuk tetap diautentikasi.
2. Untuk klien seperti aplikasi native, `Refresh Token` / `Penyegaran Token`  persisten membantu meningkatkan pengalaman autentikasi pengguna. Misalnya, token penyegaran persisten memungkinkan pengguna mengakses layanan video streaming di TV pintar mereka tanpa masuk setelah mereka menyelesaikan otorisasi perangkat awal. Dengan perilaku token penyegaran yang persisten, token penyegaran yang sama dikembalikan setiap kali klien membuat permintaan untuk menukar token penyegaran dengan token akses baru hingga masa pakai token penyegaran berakhir. 
3. Kita perlu membuat services didalam tokens, dengan membuat fungsi `refreshTokens` yang menerima `token berupa refreshToken`. Didalam fungsi ini terdapat 3 fungsi yang akan diproses yaitu `verifyToken, getUserById, await refToken.destroy()` dan pengembaliannya dengan `return generateTokenAuth()`. Untuk fungsi `generateTokenAuth` menerima data dari fungsi `getUserById`.
4. Namun, kita perlu melakukan `catch` ketika error / gagal yaitu dengan melakukan pengembalian `throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate')`
5. Selanjutnya, Didalam `controller users` perlu kita buatkan  fungsi `refreshToken` yang akan menerima `token berupa refreshToken` dari body kemudian data tsb dikirim ke `userService.refreshTokens`. 
6. 
