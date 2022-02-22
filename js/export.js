$('.btn-export').on('click', function() {
    exportData();
});

function exportData() {
    var zip = new JSZip();
    var fcount = 0;
    var required_flist = ["feed_info", "agency", "routes", "trips", "stop_times", "stops", "fare_attributes", "translations"];
    $('.data-table').each(function (i, e) {
        // データがあるテーブルについてのみ処理をする
        if ($(e).find('tr').length > 1) {
            fcount++;
            var id = $(e).attr('id');
            var fname = id.replace('Table', '');
            if (required_flist.indexOf(fname) !== -1) {
                required_flist.splice(required_flist.indexOf(fname), 1);
            }
            zip.file(fname + ".txt", new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), table2csv(id) + "\r\n"], {
                type: 'text/csv'
            }));
        }
    });
    zip.generateAsync({
            type: "blob"
        })
        .then(function (content) {
            if (fcount > 0) {
                if (required_flist.length > 0) {
                    var msg = 'GTFS-JPで必須とされているファイルのうち ';
                    for (var i = 0; i < required_flist.length; i++) {
                        msg += required_flist[i] + '.txt ';
                    }
                    msg += ' が未入力です。このままダウンロードしてよろしいですか？';
                    if (confirm(msg)) {
                        saveAs(content, "gtfs_jp_" + getNowDateTime() + ".zip");
                    }
                } else {
                    saveAs(content, "gtfs_jp_" + getNowDateTime() + ".zip");
                }
            } else {
                alert('入力されているファイルがないためダウンロードできません。');
            }
        });
}

function table2csv(table_id) {
    var table = $('table#' + table_id + ' tr').map(function (i) {
        return $(this).find('th,td').not(':first').map(function () {
            return $(this).text()
        });
    });
    var csv = table.map(function (i, row) {
        return row.toArray().join(',');
    }).toArray().join('\r\n');
    return csv
}

function getNowDateTime() {
    var date = new Date();
    var Y = date.getFullYear();
    var M = ("00" + (date.getMonth() + 1)).slice(-2);
    var D = ("00" + date.getDate()).slice(-2);
    var h = ("00" + date.getHours()).slice(-2);
    var m = ("00" + date.getMinutes()).slice(-2);
    var s = ("00" + date.getSeconds()).slice(-2);
    return Y + M + D + h + m + s
}