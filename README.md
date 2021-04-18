# docker-express-postgre

### Dokumnetasi
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


