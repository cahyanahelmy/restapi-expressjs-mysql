const config = require("../configs/database")
const mysql = require("mysql")
const pool = mysql.createPool(config)

pool.on("error", (err) => {
    console.error(err)
})

module.exports = {
    getBahasaList(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    code: 500,
                    message: "Server Error "
                })
            }
            connection.query(
                `select id, nama, deskripsi from bahasa order by nama asc;`,
                function (error, result) {
                    if (error) throw error
                    res.send({
                        code: 200,
                        message: "OK",
                        data: result
                    })
                }
            )
            connection.release()
        })
    },
    addBahasa(req, res) {
        let data = {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
        }
        if (!(data.nama)) {
            res.send({
                code: 404,
                message: "Nama harus diisi"
            })
        }
        if (!(data.deskripsi)) {
            res.send({
                code: 404,
                message: "Deskripsi harus diisi"
            })
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    code: 500,
                    message: "Server Error "
                })
            }

            connection.query(
                "insert into bahasa set ?",
                [data],
                function (err, result) {
                    if (err) {
                        res.send({
                            code: 500,
                            message: "Server Error " + err.sqlMessage
                        })
                    }
                    res.send({
                        code: 200,
                        message: "Data berhasil ditambahkan id:" + result.insertId,
                        data: {
                            id: result.insertId,
                            nama: data.nama,
                            deskripsi: data.deskripsi
                        }
                    })
                }
            )
            connection.release()
        })
    },
    getBahasaById(req, res) {
        let id = req.params.id
        if (!id) {
            res.send({
                code: 404,
                message: "ID harus diisi"
            })
        }
        pool.getConnection(
            function (err, connection) {
                if (err) {
                    res.send({
                        code: 500,
                        message: "Server Error "
                    })
                }
                connection.query(
                    `select id, nama, deskripsi from bahasa where id = ?`,
                    [id],
                    function (error, result) {
                        if (err) throw err
                        if (result) {
                            res.send({
                                code: 200,
                                message: "OK",
                                data: result
                            })
                        } else {
                            res.send({
                                code: 404,
                                message: "Data tidak ditemukan"
                            })
                        }
                    }
                )
                connection.release()
            }
        )
    },
    updateBahasa(req, res) {
        let data = {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi
        }

        let id = req.params.id
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    code: 500,
                    message: "Server Error "
                })
            }
            connection.query(
                `update bahasa set ? where id= ?`,
                [data, id],
                function (err, result) {
                    if (result) {
                        res.send({
                            code: 200,
                            message: "Data berhasil diubah",
                            data: result
                        })
                    } else {
                        res.send({
                            code: 500,
                            message: err
                        })
                    }
                }
            )
            connection.release()
        })
    },
    deleteBahasa(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send({
                    code: 500,
                    message: "Server Error "
                })
            }
            connection.query(
                `delete from bahasa where id= ?`,
                [id],
                function(err, result){
                    if (result) {
                        res.send({
                            code: 200,
                            message: "Data berhasil dihapus"
                        })
                    } else {
                        res.send({
                            code: 500,
                            message: err
                        })
                    }
                }
            )
            connection.release()
        })
    }
}