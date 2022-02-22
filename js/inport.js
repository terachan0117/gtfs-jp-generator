$('.input-inport').on('change', function ($event) {
    var $file = $event.target.files[0];
    if ($file) {
        $(this).next().text($file.name);
        JSZip.loadAsync($file)
            .then(function (zip) {
                showModal('', '<div class="text-center"><p>読み込み中です。しばらくお待ちください。</p><div class="spinner-grow text-primary" role="status"></div><p id="status"></p></div>', '');

                var promises = [];
                var flist=Object.keys(DATA);

                Object.keys(zip.files).forEach(function(fname){
                    if(flist.indexOf(fname)!=-1){
					promises.push(zip.file(fname).async("string")
					.then(function success(csv){
                        $('#status').text(fname+'を処理しています');

                        var dataset = DATA[fname]["dataset"];

                        var record = csv.split(/\r\n|\r|\n/g); //ファイルを列ごとに分割
                        var tmprec = '';
                        var trs='';
                        //フィールドの格納 -> ラベルに利用
                        tmprec = record[0].replace(/ |\"|\”/g, '');
                        var column = tmprec.split(','); //1レコード分のデータを要素ごとに分割

                        //BOM対策
                        column[0] = removeBOM(column[0]);

                        //第2版準拠のデータが読み込まれた場合ヘッダー名を変更する
                        if(fname==="translations.txt"){
                            if(column.indexOf("trans_id")!=-1){
                                column[column.indexOf("trans_id")]="field_value";
                            }
                            if(column.indexOf("lang")!=-1){
                                column[column.indexOf("lang")]="language";
                            }
                        }

                        fname=fname.replace('.txt','');

                        //データの格納
                        for (var i = 1; i < record.length; i++) {
                            if (record[i] != '') { //EOF, 空データ除外
                                tmprec = record[i].replace(/"|”/g, '');
                                var row = tmprec.split(',');
                                var sorted_row = [];
                                for (var d = 0; d < dataset.length; d++) {
                                    var index = column.indexOf(dataset[d]["name"]);
                                    if (index >= 0) {
                                        sorted_row.push(row[index]);
                                    } else {
                                        sorted_row.push("");
                                    }
                                }
                    
                                var values=sorted_row;
                                var id = getUuid();
                                var tds = '';
                                $.each(values, function (i, value) {
                                    tds += '<td>' + value + '</td>';
                                });
                            
                                values = ((JSON.stringify(values)).replace(/\"/g, '\''));
                                tds = '<td>' +
                                    '<button type="button" class="btn btn-primary btn-sm rounded-pill shadow" onclick="showInputModal(\'' + fname + '\', \'' + id + '\', ' + values + ');">＋ 編集</button> ' +
                                    '<button type="button" class="btn btn-outline-primary btn-sm rounded-pill shadow btn-rowRemove">ー 削除</button>' +
                                    '</td>' + tds;
                                    var tr='<tr id="' + id + '">' + tds + '</tr>';
                                    trs+=tr;
                            }
                        }
                    
                        $('#' + fname + 'Table>tbody').append(trs);

					},function error(e){
						console.log(e);
					}));
                }
				});

                $.when.apply($, promises).then(function () {
                    hideModal();
                });

            });
    } else {
        $(this).next().text('選択されていません');
    }
});

function csv2Table(csv) {
    var record = csv.split(/\r\n|\r|\n/g); //ファイルを列ごとに分割
    var tmprec = '';

    var html = '<table class="table table-bordered table-hover">';
    html += '<thead>';

    //フィールドの格納 -> ラベルに利用
    tmprec = record[0].replace(/ |\"|\”/g, '');
    var column = tmprec.split(','); //1レコード分のデータを要素ごとに分割
    column[0] = removeBOM(column[0]);

    html += '<tr>';
    //各要素をラベル付きで格納
    for (var j = 0; j < column.length; j++) {
        html += '<th>' + column[j] + '</th>'
    }
    html += '</tr>';

    html += '</thead>';
    html += '<tbody>';
    //データの格納
    for (var i = 1; i < record.length; i++) {
        if (record[i] != '') { //EOF, 空データ除外
            tmprec = record[i].replace(/"|”/g, '');
            var element = tmprec.split(',');
            html += '<tr>';
            //各要素をラベル付きで格納
            for (var j = 0; j < element.length; j++) {
                html += '<td>' + element[j] + '</td>'
            }
            html += '</tr>';
        }
    }
    html += '</tbody>';
    html += '</table>';
    return html;
}

function csv2Array(csv) {
    var record = csv.split(/\r\n|\r|\n/g); //ファイルを列ごとに分割
    var dataset = []; // 配列
    var tmprec = '';
    //フィールドの格納 -> ラベルに利用
    tmprec = record[0].replace(/ |\"|\”/g, '');
    var column = tmprec.split(','); //1レコード分のデータを要素ごとに分割
    column[0] = removeBOM(column[0]);
    //データの格納
    for (var i = 1; i < record.length; i++) {
        var dat = {};
        if (record[i] != '') { //EOF, 空データ除外
            tmprec = record[i].replace(/"|”/g, '');
            var element = tmprec.split(',');
            //各要素をラベル付きで格納
            for (var j = 0; j < element.length; j++) {
                dat[column[j]] = element[j];
            }
            dataset.push(dat);
        }
    }
    return dataset;
}

function csv2Tr(fname,csv) {

    var record = csv.split(/\r\n|\r|\n/g); //ファイルを列ごとに分割
    var dataset = DATA[fname]["dataset"];
    fname=fname.replace('.txt','');
    var tmprec = '';
    var trs='';
    //フィールドの格納 -> ラベルに利用
    tmprec = record[0].replace(/ |\"|\”/g, '');
    var column = tmprec.split(','); //1レコード分のデータを要素ごとに分割
    column[0] = removeBOM(column[0]);

    //データの格納
    for (var i = 1; i < record.length; i++) {
        if (record[i] != '') { //EOF, 空データ除外
            tmprec = record[i].replace(/"|”/g, '');
            var row = tmprec.split(',');
            var sorted_row = [];
            for (var d = 0; d < dataset.length; d++) {
                var index = column.indexOf(dataset[d]["name"]);
                if (index >= 0) {
                    sorted_row.push(row[index]);
                } else {
                    sorted_row.push("");
                }
            }


            var values=sorted_row;
            var id = getUuid();
            var tds = '';
            $.each(values, function (i, value) {
                tds += '<td>' + value + '</td>';
            });
        
            values = ((JSON.stringify(values)).replace(/\"/g, '\''));
            tds = '<td>' +
                '<button type="button" class="btn btn-primary btn-sm rounded-pill shadow" onclick="showInputModal(\'' + fname + '\', \'' + id + '\', ' + values + ');">＋ 編集</button> ' +
                '<button type="button" class="btn btn-outline-primary btn-sm rounded-pill shadow btn-rowRemove">ー 削除</button>' +
                '</td>' + tds;
                var tr='<tr id="' + id + '">' + tds + '</tr>';
                trs+=tr;

        }
    }

    $('#' + fname + 'Table>tbody').append(trs);
}

function oldcsv2Tr(fname,csv) {
    var record = csv.split(/\r\n|\r|\n/g); //ファイルを列ごとに分割
    var dataset = DATA[fname]["dataset"];
    var tmprec = '';
    //フィールドの格納 -> ラベルに利用
    tmprec = record[0].replace(/ |\"|\”/g, '');
    var column = tmprec.split(','); //1レコード分のデータを要素ごとに分割
    column[0] = removeBOM(column[0]);
    //データの格納
    for (var i = 1; i < record.length; i++) {
        if (record[i] != '') { //EOF, 空データ除外
            tmprec = record[i].replace(/"|”/g, '');
            var row = tmprec.split(',');
            var sorted_row = [];
            //並び替え
            for (var d = 0; d < dataset.length; d++) {
                var index = column.indexOf(dataset[d]["name"]);
                if (index >= 0) {
                    sorted_row.push(row[index]);
                } else {
                    sorted_row.push("");
                }
            }
            autoAddRow(fname.replace(".txt", ""), sorted_row);
        }
    }
}
// BOM付きファイル対処用
function removeBOM(col) {
    // 第3版用
    if (col.indexOf("agency_id") >= 0) return "agency_id";
    if (col.indexOf("feed_publisher_name") >= 0) return "feed_publisher_name";
    if (col.indexOf("table_name") >= 0) return "table_name";
    if (col.indexOf("route_id") >= 0) return "route_id";
    if (col.indexOf("trip_id") >= 0) return "trip_id";
    if (col.indexOf("office_id") >= 0) return "office_id";
    if (col.indexOf("jp_pattern_id") >= 0) return "jp_pattern_id";
    if (col.indexOf("service_id") >= 0) return "service_id";
    if (col.indexOf("shape_id") >= 0) return "shape_id";
    if (col.indexOf("stop_id") >= 0) return "stop_id";
    if (col.indexOf("from_stop_id") >= 0) return "from_stop_id";
    if (col.indexOf("fare_id") >= 0) return "fare_id";
    // 第2版・初版用
    if (col.indexOf("trans_id") >= 0) return "trans_id";
    return col;
}

function csv2json(csv) {
    // 1行ごとに分割する
    var csvArray = csv.split('\n');

    // 1行目から「項目名」の配列を生成する
    var header = csvArray[0].split(',');

    // jsonに変換した結果を格納する
    var json = [];

    // CSVデータの配列の各行をループ処理する
    //// 配列の先頭要素(行)は項目名のため処理対象外
    //// 配列の最終要素(行)は空のため処理対象外
    for (var i = 1; i < csvArray.length - 1; i++) {
        var object = {};
        // カンマで区切られた各データに分割する
        var rowArray = csvArray[i].split(',');
        //// 各データをループ処理する
        for (var h = 0; h < header.length; h++) {
            // 要素名：items[j]
            // データ：csvArrayD[j]
            object[header[h]] = rowArray[h];
        }
        json.push(object);
    }
    return json;
}