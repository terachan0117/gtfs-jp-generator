$(document).ready(function () {
    var tab_html = '';
    var tabContent_html = '';
    $.each(Object.keys(DATA), function (i, fname) {
        var name = fname.replace('.txt', '');
        var required = DATA[fname]["required"];
        var label = DATA[fname]["label"];

        tab_html += '<a class="nav-link border' + (i == 0 ? ' active' : '') + '" id="v-pills-' + name +
            '-tab" data-toggle="pill" href="#v-pills-' +
            name + '" role="tab" aria-controls="v-pills-' + name + '" aria-selected="' + (i == 0 ? 'true' :
                'false') + '">' +
            '[' + required + '] ' + label + '(' + name + '.txt)' +
            '</a>';

        var dataset = DATA[fname]["dataset"];
        var thead_html = '<thead><tr><th></th>';
        for (var d = 0; d < dataset.length; d++) {
            thead_html += '<th>' + dataset[d]["name"] + '</th>';
        }
        thead_html += '</tr></thead>';

        var note = DATA[fname]["note"];

        var presets = '';
        if (fname === "calendar.txt") {
            presets += '<hr/>運行日が以下のいずれかに該当する場合、クリックすることで運行区分情報(calendar.txt)と運行日情報(calendar_dates.txt)を自動入力できます<br/>';
            presets += '<div class="my-1"><button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'平日（月～金）\');">平日（月～金）</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'平日（月～土）\');">平日（月～土）</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'土曜\');">土曜</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'日曜\');">日曜</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'祝日\');">祝日</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'日曜・祝日\');">日曜・祝日</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'土曜・日曜\');">土曜・日曜</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'土曜・日曜・祝日\');">土曜・日曜・祝日</button> ';
            presets += '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="addCalendarPreset(\'毎日\');">毎日</button></div>';
            presets += '<div>※運行区分情報(calendar.txt)におけるサービス開始日(start_date)とサービス終了日(end_date)及び下記の祝日については必要に応じて変更するようにしてください</div>'
            presets += '※運行日情報（calendar_dates.txt）に自動入力される祝日は、<a href="https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html" target="_blank" rel="noopener">内閣府「国民の祝日」について →</a> に掲載されている国民の祝日と年末年始（12月29日～1月3日）です';
        }

        tabContent_html +=
            '<div class="tab-pane' + (i == 0 ? ' show active' : '') + '" id="v-pills-' + name +
            '" role="tabpanel" aria-labelledby="v-pills-' +
            name + '-tab">' +
            '<h1>[' + required + '] ' + label + '(' + name + '.txt)</h1>' +
            '<p>' + note + '</p>' +
            '<div class="table-responsive" id="' + name + 'TableWrapper">' +
            '<table class="table table-bordered data-table" id="' + name + 'Table">' +
            thead_html +
            '<tbody></tbody>' +
            '</table>' +
            '</div>' +
            '<div>' +
            '<button type="button" class="btn btn-primary rounded-pill shadow" onclick="showInputModal(\'' + name + '\',\'\');">＋ データ行を追加</button> ' +
            '<button type="button" class="btn btn-outline-primary rounded-pill shadow" onclick="removeAllRows(\'' +
            name + '\');">× 全データ行を削除</button>' +
            '</div>' +
            presets +
            '</div>';
    });
    $('#v-pills-tab').html(tab_html);
    $('#v-pills-tabContent').html(tabContent_html);
    // IE対応
    Stickyfill.add($('.sticky'));
});

function showModal(title, body, footer) {
    var html = '<div class="modal" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-xl">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="modalLabel">' + title + '</h5>' +
        '</div>' +
        '<div class="modal-body">' + body + '</div>' +
        '<div class="modal-footer">' + footer + '</div>' +
        '</div></div></div>';
    $('#modalWrapper').html(html);
    $('#modal').modal();
}

function hideModal() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#modal').modal('hide');
    $('#modalWrapper').html('');
}

function getUuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    var chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (var i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

// 入力候補
$(document).on('click', '.btn-autocomplete', function () {
    $(this).parent().parent().parent().find('input').val($(this).text()).change();
});

// 行削除
$(document).on('click', '.btn-rowRemove', function () {
    if (confirm('この行を削除してよろしいですか？この操作は元に戻せません。')) {
        $(this).parent().parent().remove();
    }
});

function addCalendarPreset(id) {
    var start_date = String(YEAR) + "0401";
    var end_date = String(YEAR + 1) + "0331";
    var holidays = ["20210429", "20210503", "20210504", "20210505", "20210722", "20210723", "20210808", "20210809", "20210920", "20210923", "20211103", "20211123", "20211229", "20211230", "20211231", "20220101", "20220102", "20220103", "20220110", "20220211", "20220223", "20220321"];
    if (id === "平日（月～金）") {
        autoAddRow('calendar', [id, "1", "1", "1", "1", "1", "0", "0", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "2"]);
        })
    } else if (id === "平日（月～土）") {
        autoAddRow('calendar', [id, "1", "1", "1", "1", "1", "1", "0", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "2"]);
        })
    } else if (id === "土曜") {
        autoAddRow('calendar', [id, "0", "0", "0", "0", "0", "1", "0", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "2"]);
        })
    } else if (id === "日曜") {
        autoAddRow('calendar', [id, "0", "0", "0", "0", "0", "0", "1", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "2"]);
        })
    } else if (id === "祝日") {
        autoAddRow('calendar', [id, "0", "0", "0", "0", "0", "0", "0", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "1"]);
        })
    } else if (id === "日曜・祝日") {
        autoAddRow('calendar', [id, "0", "0", "0", "0", "0", "0", "1", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "1"]);
        })
    } else if (id === "土曜・日曜") {
        autoAddRow('calendar', [id, "0", "0", "0", "0", "0", "1", "1", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "2"]);
        })
    } else if (id === "土曜・日曜・祝日") {
        autoAddRow('calendar', [id, "0", "0", "0", "0", "0", "1", "1", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "1"]);
        })
    } else if (id === "毎日") {
        autoAddRow('calendar', [id, "1", "1", "1", "1", "1", "1", "1", start_date, end_date]);
        $.each(holidays, function (i, value) {
            autoAddRow('calendar_dates', [id, value, "1"]);
        })
    }
}

function showInputModal(fname, id, values) {
    var label = DATA[fname + ".txt"]["label"];
    var dataset = DATA[fname + ".txt"]["dataset"];

    var modal_body = '<form id="' + fname + 'Form" class="needs-validation" novalidate>';

    for (var d = 0; d < dataset.length; d++) {
        modal_body += '<div class="form-group">' +
            '<label for="' + fname + d + '">[' + dataset[d]["required"] + '] ' + dataset[d]["label"] + '(' + dataset[d]["name"] + ')</label>';
        if (dataset[d]["tag"] === "select") {
            modal_body += '<select class="form-control" id="' + fname + d + '"' + (dataset[d]["required"] === "必須" || dataset[d]["required"] === "固定" ? " required" : "") + '>';
            if (values) {
                modal_body += '<option value="' + values[d] + '">' + values[d] + '</option>';
            }
            var options = dataset[d]["options"];
            for (var o = 0; o < options.length; o++) {
                modal_body += '<option value="' + options[o] + '">' + options[o] + '</option>';
            }
            modal_body += '</select>';
            modal_body += '<div class="invalid-feedback">選択してください。</div>';
        } else {
            if (dataset[d]["pattern"]) {
                modal_body += '<input type="text" pattern="' + dataset[d]["pattern"] + '" class="form-control" id="' + fname + d + '" placeholder="入力例：' + dataset[d]["example"] + '" aria-describedby="' + fname + d + '_help" value="' + (values ? values[d] : (dataset[d]["required"] === "固定" ? dataset[d]["example"] : "")) + '"' + (dataset[d]["required"] === "固定" ? " readonly" : "") + '' + (dataset[d]["required"] === "必須" || dataset[d]["required"] === "固定" ? " required" : "") + '>';
                modal_body += '<div class="invalid-feedback">正しい形式で入力してください。</div>';
            } else {
                modal_body += '<input type="text" class="form-control" id="' + fname + d + '" placeholder="入力例：' + dataset[d]["example"] + '" aria-describedby="' + fname + d + '_help" value="' + (values ? values[d] : (dataset[d]["required"] === "固定" ? dataset[d]["example"] : "")) + '"' + (dataset[d]["required"] === "固定" || dataset[d]["required"] === "不要" ? " readonly" : "") + '' + (dataset[d]["required"] === "必須" || dataset[d]["required"] === "固定" ? " required" : "") + '>';
                modal_body += '<div class="invalid-feedback">入力してください。</div>';
            }
        }
        modal_body += '<div id="' + fname + d + '_help" class="form-text text-muted">' + dataset[d]["note"] + '</div></div>';
    }
    modal_body += '</form>';

    // 地図追加
    if (fname === "shapes") {
        modal_body += '<script>$(function(){' +
            'var map = L.map("map", {preferCanvas:true}).setView([35.658099, 139.741357], 6);' +
            'L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {attribution: \'&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>\'}).addTo(map);';

        if (values && values[1] != "" && values[2] != "") {
            modal_body += 'map.setView([' + values[1] + ', ' + values[2] + '], 18);';
        } else {
            var length = $('#' + fname + 'Table>tbody>tr').length;
            if (length > 0) {
                modal_body += 'var markers = L.featureGroup();var lines=[];';
                $('#' + fname + 'Table>tbody>tr').each(function (i, e) {
                    var lat = $(e).find('td').eq(2).text();
                    var lng = $(e).find('td').eq(3).text();
                    if (lat != "" && lng != "") {
                        modal_body += 'markers.addLayer(L.circleMarker([' + lat + ', ' + lng + '],{color:"#000"}));lines.push([' + lat + ', ' + lng + ']);';
                    }
                });
                modal_body += 'L.polyline(lines,{color:"#000"}).addTo(map);';
                modal_body += 'markers.addTo(map);map.fitBounds(markers.getBounds());';
            }
        }

        modal_body += 'var centerMarker = L.circleMarker(map.getCenter(),{color:"#008830",zIndexOffset:1000,interactive:false}).addTo(map);' +
            'map.on("move", function(e) {var pos = map.getCenter();centerMarker.setLatLng(pos);$("#' + fname + 'Form").find("input").eq(1).val(pos.lat);$("#' + fname + 'Form").find("input").eq(2).val(pos.lng);});';
        modal_body += '});</script>';
    }
    if (fname === "stops") {
        modal_body += '<script>$(function(){' +
            'var map = L.map("map", {preferCanvas:true}).setView([35.658099, 139.741357], 6);' +
            'L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {attribution: \'&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>\'}).addTo(map);';

        if (values && values[4] != "" && values[5] != "") {
            modal_body += 'map.setView([' + values[4] + ', ' + values[5] + '], 18);';
        }

        modal_body += 'var centerMarker = L.circleMarker(map.getCenter(),{color:"#008830",zIndexOffset:1000,interactive:false}).addTo(map);' +
            'map.on("move", function(e) {var pos = map.getCenter();centerMarker.setLatLng(pos);$("#' + fname + 'Form").find("input").eq(4).val(pos.lat);$("#' + fname + 'Form").find("input").eq(5).val(pos.lng);});';
        modal_body += '});</script>';
    }

    if (fname === "stop_times") {
        // 出発到着時刻コピー機能追加
        modal_body += '<script>';
        modal_body += '$("#' + fname + 'Form").find("input").eq(1).on("change", function() {var value=$(this).val();if(value){$("#departure_time").html("入力候補: <button type=\'button\' class=\'btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\'>"+value+"</button>");}else{$("#departure_time").html("");}});';
        modal_body += '</script>';
    }

    if (fname === "translations") {
        modal_body += '<script>';
        // 翻訳フィールド名提案機能追加
        modal_body += '$("#' + fname + 'Form").find("select").eq(0).on("change", function() {var value=$(this).val();' +
            'var names=[];var html="";' +
            'if(value==="agency"){names=["agency_name","agency_url","agency_fare_url"];}' +
            'else if(value==="stops"){names=["stop_name","stop_desc","stop_url"];}' +
            'else if(value==="routes"){names=["route_short_name","route_long_name","route_desc","route_url"];}' +
            'else if(value==="trips"){names=["trip_headsign","trip_short_name","jp_trip_desc"];}' +
            'else if(value==="stop_times"){names=["stop_headsign"];}' +
            'else if(value==="feed_info"){names=["feed_publisher_name","feed_publisher_url"];}' +
            'for(var i=0;i<names.length;i++){' +
            'html+=" <button type=\'button\' class=\'btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\'>"+names[i]+"</button>"' +
            '}' +
            'if(html){html="入力候補:"+html;}' +
            '$("#field_name").html(html);' +
            '});';
        // 翻訳キーワード提案機能追加
        modal_body += '$("#' + fname + 'Form").find("input").eq(0).on("change", function() {var value=$(this).val();' +
        'var indexes={"agency_name":2,"agency_url":3,"agency_fare_url":7,"stop_name":3,"stop_desc":4,"stop_url":8,"route_short_name":3,"route_long_name":4,"route_desc":5,"route_url":7,"trip_headsign":4,"trip_short_name":5,"jp_trip_desc":11,"stop_headsign":6,"feed_publisher_name":1,"feed_publisher_url":2};'+
            '$("#field_value").html(getSuggestion($("#' + fname + 'Form").find("select").eq(0).val(), indexes[value]));' +
            '});';
        modal_body += '</script>';
    }

    var modal_title = label + '(' + fname + '.txt)';
    var modal_footer = '<button type="button" class="btn btn-primary rounded-pill shadow" onclick="addRow(\'' + fname + '\',\'' + id + '\');">＋ 保存する</button>' +
        '<button type="button" class="btn btn-outline-primary rounded-pill shadow" data-dismiss="modal">× キャンセル</button>';
    showModal(modal_title, modal_body, modal_footer);
}

function addRow(fname, id, values) {
    var form = $('#' + fname + 'Form')[0];
    if (form.checkValidity() === false) {
        $(form).addClass('was-validated');
    } else {
        // バリデーションチェック通過
        $(form).removeClass('was-validated');
        var tds = '';
        var values = [];
        $('#' + fname + 'Form input, #' + fname + 'Form select').each(function (i, e) {
            tds += '<td>' + $(e).val() + '</td>';
            values.push($(e).val());
        });
        values = ((JSON.stringify(values)).replace(/\"/g, '\''));

        if (id) {
            tds = '<td>' +
                '<button type="button" class="btn btn-primary btn-sm rounded-pill shadow" onclick="showInputModal(\'' + fname + '\', \'' + id + '\', ' + values + ');">＋ 編集</button> ' +
                '<button type="button" class="btn btn-outline-primary btn-sm rounded-pill shadow btn-rowRemove">ー 削除</button>' +
                '</td>' + tds;
            $('#' + fname + 'Table>tbody>tr#' + id).html(tds);
        } else {
            id = getUuid();
            tds = '<td>' +
                '<button type="button" class="btn btn-primary btn-sm rounded-pill shadow" onclick="showInputModal(\'' + fname + '\', \'' + id + '\', ' + values + ');">＋ 編集</button> ' +
                '<button type="button" class="btn btn-outline-primary btn-sm rounded-pill shadow btn-rowRemove">ー 削除</button>' +
                '</td>' + tds;
            $('#' + fname + 'Table>tbody').append('<tr id="' + id + '">' + tds + '</tr>');
        }
        hideModal();
    }
}

function autoAddRow(fname, values) {
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
    $('#' + fname + 'Table>tbody').append('<tr id="' + id + '">' + tds + '</tr>');
}

function removeAllRows(fname) {
    if (confirm(fname + '.txtの全行を削除してよろしいですか？この操作は元に戻せません。')) {
        $('#' + fname + 'Table>tbody').html('');
    }
}