var YEAR = new Date().getFullYear();

function getSuggestion(fname, row) {
    var html = '';
    var length = $('#' + fname + 'Table>tbody>tr').length;
    if (row) {
        if (length > 0) {
            var suggests = [];
            $('#' + fname + 'Table>tbody>tr').each(function (index, element) {
                var text = $(element).find('td').eq(row).text();
                if (text != '' && suggests.indexOf(text) === -1) {
                    suggests.push(text);
                    html += ' <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">' + text + '</button>';
                }
            })
        }
    } else {
        html += ' <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">' + fname + '_' + String(length + 1) + '</button>';
    }
    if (html) {
        html = '入力候補:' + html;
    }
    return html
}

var DATA = {
    "feed_info.txt": {
        "label": "提供情報",
        "required": "必須",
        "note": "データを公開している組織の情報や作成したデータの有効期間を設定します。",
        "dataset": [{
                "name": "feed_publisher_name",
                "label": "提供組織名",
                "required": "必須",
                "note": "データを公開する組織の正式名称を指定。",
                "example": "東京都交通局",
            },
            {
                "name": "feed_publisher_url",
                "label": "提供組織URL",
                "required": "必須",
                "note": "データ公開組織のURLを指定。",
                "example": "https://www.kotsu.metro.tokyo.jp/",
                "tag": "input",
                "pattern": "https?://.+"
            },
            {
                "name": "feed_lang",
                "label": "提供言語",
                "required": "固定",
                "note": "日本の場合、「ja」を設定。",
                "example": "ja",
            },
            {
                "name": "feed_start_date",
                "label": "有効期間開始日",
                "required": "任意",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "0401</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "1001</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0401</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "1001</button></div>データが有効な期間を設定する場合に指定。YYYYMMDD形式で指定。ダイヤ改正日を指定。",
                "example": "20220401",
                "tag": "input",
                "pattern": "\\d{8}"
            },
            {
                "name": "feed_end_date",
                "label": "有効期間終了日",
                "required": "任意",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0331</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0930</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 2) + "0331</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 2) + "0930</button></div>データが有効な期間を設定する場合に指定。YYYYMMDD形式で指定。",
                "example": "20230331",
                "tag": "input",
                "pattern": "\\d{8}"
            },
            {
                "name": "feed_version",
                "label": "提供データバージョン",
                "required": "任意",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "0401_gtfs-jp_v3</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "1001_gtfs-jp_v3</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0401_gtfs-jp_v3</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "1001_gtfs-jp_v3</button></div>提供しているデータのバージョン(仕様書の版数など)を記載。記述方法は任意だが、交通事業者が認識するダイヤ改正日（YYYYMMDD）＋社内の管理コード（_XXXXX）等による表記が望ましい。",
                "example": "20220401_gtfs-jp_v3",
            }
        ]
    },
    "agency.txt": {
        "label": "事業者情報",
        "required": "必須",
        "note": "事業者の基本的な情報を設定します。事業者名称等が経路検索の結果として表示されます。",
        "dataset": [{
                "name": "agency_id",
                "label": "事業者ID",
                "required": "必須",
                "note": "事業者の法人番号を設定。ただし同一法人が複数のデータセットを作成する場合、アンダースコア区切りにより枝番号を設定しても良い。運行委託等を行っている場合、原則として運行委託元の法人番号を設定。自治体等が運営するコミュニティバス等は、原則として運行委託元の法人番号を設定。一度設定した事業者ID[agency_id]は、可能な限り変更しないよう留意が必要。法人番号は、国税庁法人番号公表サイト（<a href=\"https://www.houjin-bangou.nta.go.jp/\" target=\"_blank\" rel=\"noopener\">https://www.houjin-bangou.nta.go.jp/</a>）にて確認可能。",
                "example": "①8000020130001②8000020130001_1",
            },
            {
                "name": "agency_name",
                "label": "事業者名称",
                "required": "必須",
                "note": "経路検索で案内するのが適当な名称を設定。正式名称である必要はなく、旅客が交通機関を識別しやすい名称を設定。複数のグループ会社で運行しているが同一名称で案内している場合は、同一名称を設定する。",
                "example": "都営バス",
            },
            {
                "name": "agency_url",
                "label": "事業者URL",
                "required": "必須",
                "note": "原則として、事業者HPのトップページのURLを設定。複数の事業を経営している等の場合、個別の事業ページ（バス事業に関するトップページ等）のURLの設定も可。但し、設定したURLは頻繁な変更がなされないことに留意。HPがない場合は、その旨を記載。",
                "example": "https://www.kotsu.metro.tokyo.jp/bus/",
            },
            {
                "name": "agency_timezone",
                "label": "タイムゾーン",
                "required": "固定",
                "note": "日本の場合、「Asia/Tokyo」を設定。",
                "example": "Asia/Tokyo",
            },
            {
                "name": "agency_lang",
                "label": "言語",
                "required": "固定",
                "note": "日本の場合、「ja」を設定。",
                "example": "ja",
            },
            {
                "name": "agency_phone",
                "label": "電話番号",
                "required": "任意",
                "note": "全社の窓口となる電話番号（本社代表電話、運輸部門代表電話、お客様センター等）を設定。運行委託等を行っている場合は、問合せに対応可能な主体の電話番号を設定。",
                "example": "03-3816-5700"
            },
            {
                "name": "agency_fare_url",
                "label": "オンライン購入URL",
                "required": "任意",
                "note": "利用者が乗車券等をオンラインで購入な場合に、そのURLを設定。オンラインで購入不可の場合は省略。",
                "example": "※東京都交通局には当該サイトがないため省略",
                "tag": "input",
                "pattern": "https?://.+"
            },
            {
                "name": "agency_email",
                "label": "事業者Eメール",
                "required": "任意",
                "note": "利用者が問合せ等で利用可能なEメールアドレスを設定。",
                "example": "※東京都交通局には当該Eメールがないため省略",
                "tag": "input",
                "pattern": "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            }
        ]
    },
    "agency_jp.txt": {
        "label": "事業者追加情報",
        "required": "任意",
        "note": "",
        "dataset": [{
                "name": "agency_id",
                "label": "事業者ID",
                "required": "必須",
                "note": "<div id=\"agency_id\"></div><script>$(\"#agency_id\").html(getSuggestion(\"agency\",1));</script>事業者情報(agency.txt)に入力した事業者IDと一致していることを確認。",
                "example": "8000020130001",
            },
            {
                "name": "agency_official_name",
                "label": "事業者正式名称",
                "required": "任意",
                "note": "<div id=\"agency_official_name\"></div><script>$(\"#agency_official_name\").html(getSuggestion(\"feed_info\",1));</script>申請等に必要な正式名称を設定。",
                "example": "東京都交通局",
            },
            {
                "name": "agency_zip_number",
                "label": "事業者郵便番号",
                "required": "任意",
                "note": "ハイフンなしの半角数字7桁で設定。",
                "example": "1638001",
                "tag": "input",
                "pattern": "\\d{7}"
            },
            {
                "name": "agency_address",
                "label": "事業者住所",
                "required": "任意",
                "note": "都道府県から入力。住居表示通りに略さずに全角で設定。",
                "example": "東京都新宿区西新宿２丁目８－１",
                "tag": "input",
                "pattern": "[^\\x20-\\x7E]*"
            },
            {
                "name": "agency_president_pos",
                "label": "代表者肩書",
                "required": "任意",
                "note": "申請者の肩書を設定。",
                "example": "局長",
            },
            {
                "name": "agency_president_name",
                "label": "代表者氏名",
                "required": "任意",
                "note": "姓と名の間は、全角スペース1文字を挿入。",
                "example": "東京　太郎",
            }
        ]
    },
    "routes.txt": {
        "label": "経路情報",
        "required": "必須",
        "note": "バス利用者が１つの運行単位として認識しているもの。同一経路の中にも経由違いや途中止まり、往路・復路など複数の運行パターンが存在し、これらの同一経路内に生じる違いを識別する情報が必要である場合、停車パターンID［jp_pattern_id（trips.txt）］を設定。ただし、運賃、系統番号、経路名、経路色、経路文字色等が異なる場合は、別経路として設定する。ダイヤ改正等があった場合でも、経路が変わらない場合は、IDは引き継ぐことを推奨する。",
        "dataset": [{
                "name": "route_id",
                "label": "経路 ID",
                "required": "必須",
                "note": "<div id=\"route_id\"></div><script>$(\"#route_id\").html(getSuggestion(\"routes\"));</script>事業者が内部的に使用しているコードをそのまま設定可。",
                "example": "routes_1",
            },
            {
                "name": "agency_id",
                "label": "事業者ID",
                "required": "必須",
                "note": "<div id=\"agency_id\"></div><script>$(\"#agency_id\").html(getSuggestion(\"agency\",1));</script>「agency」から参照。",
                "example": "8000020130001",
            },
            {
                "name": "route_short_name",
                "label": "経路略称",
                "required": "条件付必須",
                "note": "route_long_name, route_short_nameの少なくともどちらかは設定する必要がある。系統番号（例：東16）を原則として設定する。系統番号が無い場合は、路線名称（例：駒沢線）、コミュニティバス等の愛称（例：ふれあいバス）等、当該系統を識別可能な略称等を等設定。経路名が設定されていて略称がない場合は、空の文字列を設定。また、急行・快速・直通等の運行種別について追記することが望ましい。",
                "example": "東16",
            },
            {
                "name": "route_long_name",
                "label": "経路名",
                "required": "条件付必須",
                "note": "route_long_name, route_short_nameの少なくともどちらかは設定する必要がある。経由地や目的地等を含んだ経路に関する詳細な情報を設定。系統略称でこれらの情報がカバーできる場合は、空の文字列を設定。",
                "example": "東京駅八重洲口～月島駅前～東京ビッグサイト",
            },
            {
                "name": "route_desc",
                "label": "経路情報",
                "required": "任意",
                "note": "不定期運行の既述は、trip_descへの記載が基本だが、GTFS向けにCalenderで制御が困難な不定期の運行等を説明する必要がある場合（「学校休業日に一部運休となる便があります」等）にその旨を記載。その他、経路に関する注記がある場合にも、その内容を記載。",
                "example": "",
            },
            {
                "name": "route_type",
                "label": "経路タイプ",
                "required": "固定",
                "note": "バス事業者は3を設定。",
                "example": "3",
            },
            {
                "name": "route_url",
                "label": "経路URL",
                "required": "任意",
                "note": "経路に特化した情報を案内するための特定のURLがある場合設定。紐づくURLがない場合は省略。",
                "example": "https://tobus.jp/blsys/navi?VCD=cresultapr&ECD=rsirslt&LCD=&RTMCD=50",
            },
            {
                "name": "route_color",
                "label": "経路色",
                "required": "任意",
                "note": "<div>入力候補:" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#DC3545;\"></span>DC3545</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#198754;\"></span>198754</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#0D6EFD;\"></span>0D6EFD</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#6F42C1;\"></span>6F42C1</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#FD7E14;\"></span>FD7E14</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#FFC107;\"></span>FFC107</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#0DCAF0;\"></span>0DCAF0</button>" +
                    " <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#ADB5BD;\"></span>ADB5BD</button>" +
                    "</div>経路を線やラベルなどで表現する場合の色を指定。色は00FFFF など 6 桁の 16 進数の値を設定。route_text_colorとのコントラストに留意。",
                "example": "FFD700",
            },
            {
                "name": "route_text_color",
                "label": "経路文字色",
                "required": "任意",
                "note": "<div>入力候補: route_colorを " +
                    "<span class=\"color-box\" style=\"background:#DC3545;\"></span>" +
                    "<span class=\"color-box\" style=\"background:#198754;\"></span>" +
                    "<span class=\"color-box\" style=\"background:#0D6EFD;\"></span>" +
                    "<span class=\"color-box\" style=\"background:#6F42C1;\"></span>" +
                    "に設定した場合 " +
                    "<button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#FFFFFF;\"></span>FFFFFF</button>" +
                    " が、route_colorを " +
                    "<span class=\"color-box\" style=\"background:#FD7E14;\"></span>" +
                    "<span class=\"color-box\" style=\"background:#FFC107;\"></span>" +
                    "<span class=\"color-box\" style=\"background:#0DCAF0;\"></span>" +
                    "<span class=\"color-box\" style=\"background:#ADB5BD;\"></span>" +
                    "に設定した場合 " +
                    "<button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\"><span class=\"color-box\" style=\"background:#000000;\"></span>000000</button>" +
                    " がコントラスト上優れています。</div>経路を線やラベルなどで表現する場合に、その上に系統名などを表示する場合の色を指定。色は00FFFF など 6 桁の 16 進数の値を設定。route_colorとのコントラストに留意。",
                "example": "000000",
            },
            {
                "name": "jp_parent_route_id",
                "label": "路線ID",
                "required": "任意",
                "note": "経路の親となる情報（路線IDまたは路線名称等）を設定。ここで設定された情報により、複数の経路を路線として束ねて時刻表等の案内を実施。",
                "example": "",
            }
        ]
    },
    "stops.txt": {
        "label": "停留所・標柱情報",
        "required": "必須",
        "note": "停留所(バス停)と標柱に関する情報を設定します。",
        "dataset": [{
                "name": "stop_id",
                "label": "停留所・標柱ID",
                "required": "必須",
                "note": "<div id=\"stop_id\"></div><script>$(\"#stop_id\").html(getSuggestion(\"stops\"));</script>事業者が内部的に使用しているコードをそのまま設定する等、名称等が変更された場合でもIDは引き継ぐことを推奨する。",
                "example": "stops_1",
            },
            {
                "name": "stop_code",
                "label": "停留所・標柱番号",
                "required": "任意",
                "note": "駅ナンバリングに相当する旅客向けの記号・番号を停留所や標柱が持っている場合は当該番号を設定。旅客案内用の記号番号であることに留意。該当がない場合は省略。",
                "example": "※東京都交通局には停留所ナンバリング等に相当するものがないため省略",
            },
            {
                "name": "stop_name",
                "label": "停留所・標柱名称",
                "required": "必須",
                "note": "停留所名を設定する。その地域の住民や旅行者が理解できる名前を使用する。translationsでの翻訳を考慮し、よみがな付の名称や、IDを設定しても良い。",
                "example": "東京駅八重洲口",
            },
            {
                "name": "stop_desc",
                "label": "停留所・標柱付加情報",
                "required": "任意",
                "note": "停留所や標柱に隣接する施設等に関する付加情報を設定。（例：市役所前停留所の最寄りに市民会館がある場合、市民会館が最寄りである旨等）",
                "example": ""
            },
            {
                "name": "stop_lat",
                "label": "緯度",
                "required": "必須",
                "note": "下の地図を動かすと中心の座標が自動で入力されます。（環境によっては地図が表示されない場合があります。）<div id=\"map\"></div>標柱は標柱が設置されている場所の緯度経度を地理院地図から取得、またはGPS機器を用いて実測し設定。停留所は、代表地点が定められる場合はその地点の緯度経度、特段の代表地点がない場合は代表的な停留所の緯度経度または、「parent_station」で紐付けた標柱の緯度経度を平均した数値を設定。GTFSとして利用する場合は必須。国内CP等への提供時にも基本的には必須だが、緯度経度の設定がなくても受付可能な場合もある。",
                "example": "35.679787",
            },
            {
                "name": "stop_lon",
                "label": "経度",
                "required": "必須",
                "note": "",
                "example": "139.768251",
            },
            {
                "name": "zone_id",
                "label": "運賃エリアID",
                "required": "任意",
                "note": "<div id=\"zone_id\"></div><script>$(\"#zone_id\").html(getSuggestion(\"stops\"));</script>標柱の場合のみ設定可。運賃を案内する場合は必須。均一制の場合、運賃エリアを設定。対キロ制の場合、標柱IDを設定。",
                "example": "stops_1",
            },
            {
                "name": "stop_url",
                "label": "停留所・標柱URL",
                "required": "任意",
                "note": "停留所・標柱に特化した情報（時刻表やバスロケ等）を案内するための特定のURLがある場合設定。停留所や標柱に紐づくURLがない場合は省略。",
                "example": "https://tobus.jp/blsys/navi?LCD=&VCD=cresultrsi&ECD=aprslt&slst=967",
            },
            {
                "name": "location_type",
                "label": "停留所・標柱区分",
                "required": "任意",
                "note": "登録するデータが、停留所なのか標柱なのか設定。停車時刻を設定できるのは標柱のみであることに留意。0：標柱 1：停留所",
                "example": "①1②0",
                "tag": "select",
                "options": ["0", "1", ""]
            },
            {
                "name": "parent_station",
                "label": "親停留所情報",
                "required": "任意",
                "note": "停留所－標柱の関係を設定することを原則とし、登録するデータが標柱（location_type=0）の場合、当該標柱が属する停留所（location_type=1）の「stop_id」を設定。",
                "example": "",
            },
            {
                "name": "stop_timezone",
                "label": "タイムゾーン",
                "required": "不要",
                "note": "使用しない。",
                "example": ""
            },
            {
                "name": "wheelchair_boarding",
                "label": "車椅子情報",
                "required": "不要",
                "note": "使用しない。",
                "example": ""
            },
            {
                "name": "platform_code",
                "label": "のりば情報",
                "required": "任意",
                "note": "のりばIDを示す。ID（例: 「G」「3」「センタービル前」など）のみを指定でき、「番」「のりば」のような語句は含めることはできない。これらの語句はサービス側で言語に応じて補完する。",
                "example": "",
            }
        ]
    },
    "transfers.txt": {
        "label": "乗換情報",
        "required": "任意",
        "note": "通常は、標柱の緯度経度情報に基づき乗換ルートが案内されますが、明示的に乗換地点や乗換時間を指定したい場合等に設定します。",
        "dataset": [{
                "name": "from_stop_id",
                "label": "乗換元標柱ID",
                "required": "必須",
                "note": "<div id=\"from_stop_id\"></div><script>$(\"#from_stop_id\").html(getSuggestion(\"stops\",1));</script>便間の乗換情報を設定する場合、乗換元の標柱のstop_idを指定。stop_idは「stops」から参照。",
                "example": "stops_1",
            },
            {
                "name": "to_stop_id",
                "label": "乗換先標柱ID",
                "required": "必須",
                "note": "<div id=\"to_stop_id\"></div><script>$(\"#to_stop_id\").html(getSuggestion(\"stops\",1));</script>便間の乗換情報を設定する場合、乗換先の標柱のstop_idを指定。stop_idは「stops」から参照。",
                "example": "stops_11",
            },
            {
                "name": "transfer_type",
                "label": "乗換タイプ",
                "required": "必須",
                "note": "乗換の方法を指定。0：2 つのルート間の推奨乗換地点。1：2 つのルート間の時間が考慮された乗換地点。2：乗換には、最低限の乗換時間が必要。乗換時間の指定が必要。3：ルート間の乗り継ぎが不可能なことを示す。",
                "example": "2",
                "tag": "select",
                "options": ["","0", "1", "2", "3"]
            },
            {
                "name": "min_transfer_time",
                "label": "乗換時間",
                "required": "任意",
                "note": "transfer_typeが2の場合に、乗り継ぎに必要な時間を定義。秒単位で入力し、0 以上の整数を指定。",
                "example": "120",
                "tag": "input",
                "pattern": "\\d+"
            }
        ]
    },
    "fare_attributes.txt": {
        "label": "運賃属性情報",
        "required": "必須",
        "note": "GTFSとして利用する場合は任意だが、国内の経路検索事業者においては必須としていることから、GTFS-JPとしては必須としている。",
        "dataset": [{
                "name": "fare_id",
                "label": "運賃 ID",
                "required": "必須",
                "note": "<div id=\"fare_id\"></div><script>$(\"#fare_id\").html(getSuggestion(\"fare_attributes\"));</script>fare_rules.txtと紐付けるためのIDを設定。",
                "example": "fare_attributes_1",
            },
            {
                "name": "price",
                "label": "運賃",
                "required": "必須",
                "note": "fare_idで定義される運賃（円）を半角数字で指定。",
                "example": "210",
                "tag": "input",
                "pattern": "\\d+"
            },
            {
                "name": "currency_type",
                "label": "通貨",
                "required": "固定",
                "note": "日本の場合、「JPY」を設定。",
                "example": "JPY",
            },
            {
                "name": "payment_method",
                "label": "支払いタイミ ング",
                "required": "必須",
                "note": "fare_idが適用される場合の運賃の支払いタイミングを指定。0 - 乗車後に支払う。1 - 乗車前に支払う。",
                "example": "1",
                "tag": "select",
                "options": ["0", "1"]
            },
            {
                "name": "transfers",
                "label": "乗換",
                "required": "必須",
                "note": "fare_idが適用される場合、料金で許可される乗り換え回数を指定。0：この料金で乗り換えることはできません。1 ：1 度の乗り換えが可能。2 ：2 度の乗り換えが可能。（空白）：乗り換え回数に制限がなし",
                "example": "0",
                "tag": "select",
                "options": ["0", "1", "2", ""]
            },
            {
                "name": "transfer_duration",
                "label": "乗換有効期限",
                "required": "任意",
                "note": "乗換が可能な場合、乗り換え期限が切れるまでの時間を秒数で指定。乗換を認めない場合、ここでの設定値は運賃の有効期限となる。意図的な期限を設定しない場合、空白か値を指定しない。",
                "example": "",
            }
        ]
    },
    "fare_rules.txt": {
        "label": "運賃定義情報",
        "required": "条件付必須",
        "note": "全線均一運賃の場合は不要、その他の場合はGTFS-JPとしては必須。",
        "dataset": [{
                "name": "fare_id",
                "label": "運賃 ID",
                "required": "必須",
                "note": "<div id=\"fare_id\"></div><script>$(\"#fare_id\").html(getSuggestion(\"fare_attributes\",1));</script>「fare_attributes」から参照。",
                "example": "fare_attributes_1",
            },
            {
                "name": "route_id",
                "label": "経路 ID",
                "required": "任意",
                "note": "<div id=\"route_id\"></div><script>$(\"#route_id\").html(getSuggestion(\"routes\",1));</script>「routes」から参照。",
                "example": "routes_1",
            },
            {
                "name": "origin_id",
                "label": "乗車地ゾーン",
                "required": "任意",
                "note": "<div id=\"origin_id\"></div><script>$(\"#origin_id\").html(getSuggestion(\"stops\",7));</script>乗車地のzone_idを設定。対キロ制等、区間ごとに運賃が異なる場合は、全ての乗降区間のパターンに対して設定が必要。",
                "example": "stops_1",
            },
            {
                "name": "destination_id",
                "label": "降車地ゾーン",
                "required": "任意",
                "note": "<div id=\"destination_id\"></div><script>$(\"#destination_id\").html(getSuggestion(\"stops\",7));</script>降車地のzone_idを設定。対キロ制等、区間ごとに運賃が異なる場合は、全ての乗降区間のパターンに対して設定が必要。",
                "example": "stops_2",
            },
            {
                "name": "contains_id",
                "label": "通過ゾーン",
                "required": "不要",
                "note": "使用しない。",
                "example": ""
            }
        ]
    },
    "shapes.txt": {
        "label": "描画情報",
        "required": "任意",
        "note": "標柱以外の通過ポイントを指定する場合に設定します。バスロケーションシステムやバス走行状況の分析、路線図の作成等のために正確な走行ルートの情報が必要な場合や、経路検索サービスの地図表示を正確にしたい場合等に設定します。通常は設定しなくても、経路検索は可能です。",
        "dataset": [{
                "name": "shape_id",
                "label": "描画 ID",
                "required": "必須",
                "note": "<div id=\"shape_id\"></div><script>$(\"#shape_id\").html(getSuggestion(\"shapes\",1));</script>地図上に描かれる描画を特定する値を設定。",
                "example": "shapes_1",
            },
            {
                "name": "shape_pt_lat",
                "label": "描画緯度",
                "required": "必須",
                "note": "下の地図を動かすと中心の座標が自動で入力されます。（環境によっては地図が表示されない場合があります。）<div id=\"map\"></div>描画ポイントの緯度を指定。",
                "example": "35.679752",
            },
            {
                "name": "shape_pt_lon",
                "label": "描画経度",
                "required": "必須",
                "note": "描画ポイントの経度を指定。",
                "example": "139.76833",
            },
            {
                "name": "shape_pt_sequence",
                "label": "描画順序",
                "required": "必須",
                "note": "描画のポイントの順番を指定。描画では描画順序を0以上の整数で順に結ぶ。",
                "example": "0",
                "tag": "input",
                "pattern": "\\d+"
            },
            {
                "name": "shape_dist_traveleded",
                "label": "描画距離",
                "required": "不要",
                "note": "使用しない。",
                "example": ""
            }
        ]
    },
    "calendar.txt": {
        "label": "運行区分情報",
        "required": "条件付必須",
        "note": "平日や休日といった運行区分に関する情報を設定します。曜日ごとに運行・運休といった基本パターンを運行日ID[service_id]として設定し、祝日等で平日ダイヤが休日ダイヤとして運行するような場合は運行日情報（calendar_dates.txt）で、当該日に運行ダイヤが変わる旨を設定することが基本であり、祝日に限らず、学校休業日や年末年始等でイレギュラーな運行がある場合も同様です。学校休業日等祝日以外で運休（又は運行）される場合であって、あらかじめ日付が確定している場合は、calendar_dates.txt に記述し、確定しない場合は、便情報[jp_trip_desc(trips.txt)]において「学校休業日運休」等の注記をすることが必要になります。",
        "dataset": [{
                "name": "service_id",
                "label": "運行日ID",
                "required": "必須",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">平日（月～金）</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">平日（月～土）</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">土曜</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">日曜</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">祝日</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">日曜・祝日</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">土曜・日曜</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">土曜・日曜・祝日</button></div>運行区分を表す値を設定。運行区分の判別が可能なIDを設定することが望ましい。尚、「平日（月～金）」「平日（月～土）」「土曜」「日曜」「祝日」「日曜・祝日」「土曜・日曜」「土曜・日曜・祝日」の8区分を標準のservice_idとして想定し、当該IDで提供された場合、国内CPにおいてはcalendar_datesで祝日設定が行われていなくても、祝日を考慮した案内を実施。より正確な案内を実施するためには、calendar_datesで個別の運行日を設定することが望ましい。",
                "example": "①平日（月～金）②休日",
            },
            {
                "name": "monday",
                "label": "月曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が月曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①1②0",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "tuesday",
                "label": "火曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が火曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①1②0",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "wednesday",
                "label": "水曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が水曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①1②0",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "thursday",
                "label": "木曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が木曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①1②0",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "friday",
                "label": "金曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が金曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①1②0",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "saturday",
                "label": "土曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が土曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①0②1",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "sunday",
                "label": "日曜日",
                "required": "必須",
                "note": "サービスIDで指定されている運行区分が日曜日の運行を表す場合は1、非運行を表す場合は0を設定する。",
                "example": "①0②1",
                "tag": "select",
                "options": ["","1", "0"]
            },
            {
                "name": "start_date",
                "label": "サービス開始日",
                "required": "必須",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "0401</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "1001</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0401</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "1001</button></div>サービスIDで指定されている運行区分の適用を開始する日付を指定。YYYYMMDD 形式で指定。ここで設定した日付がデータの有効開始日＝改正日以降のデータとなる。",
                "example": "20170101",
                "tag": "input",
                "pattern": "\\d{8}"
            },
            {
                "name": "end_date",
                "label": "サービス終了日",
                "required": "必須",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0331</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0930</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 2) + "0331</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 2) + "0930</button></div>サービスIDで指定されている運行区分の適用を終了する日付を指定。YYYYMMDD 形式で指定。",
                "example": "20171231",
                "tag": "input",
                "pattern": "\\d{8}"
            }
        ]
    },
    "calendar_dates.txt": {
        "label": "運行日情報",
        "required": "条件付必須",
        "note": "平日や休日といった運行区分に関する情報を設定します。曜日ごとに運行・運休といった基本パターンを運行日ID[service_id]として設定し、祝日等で平日ダイヤが休日ダイヤとして運行するような場合は運行日情報（calendar_dates.txt）で、当該日に運行ダイヤが変わる旨を設定することが基本であり、祝日に限らず、学校休業日や年末年始等でイレギュラーな運行がある場合も同様です。学校休業日等祝日以外で運休（又は運行）される場合であって、あらかじめ日付が確定している場合は、calendar_dates.txt に記述し、確定しない場合は、便情報[jp_trip_desc(trips.txt)]において「学校休業日運休」等の注記をすることが必要になります。",
        "dataset": [{
                "name": "service_id",
                "label": "サービス ID",
                "required": "必須",
                "note": "<div id=\"service_id\"></div><script>$(\"#service_id\").html(getSuggestion(\"calendar\",1));</script>「calendar」から参照。",
                "example": "①平日（月～金）②休日",

            },
            {
                "name": "date",
                "label": "日付",
                "required": "必須",
                "note": "サービスIDで指定される運行区分の利用タイプを設定する日付を指定。YYYYMMDD 形式で指定します。",
                "example": "①20170503②20170503",
                "tag": "input",
                "pattern": "\\d{8}"
            },
            {
                "name": "exception_type",
                "label": "利用タイプ",
                "required": "必須",
                "note": "dateで指定された日に、サービスIDで指定されている運行区分が適用されるかを指定。1 ：運行区分適用2 ：運行区分非適用",
                "example": "①2②1",
                "tag": "select",
                "options": ["","1", "2"]
            }
        ]
    },
    "office_jp.txt": {
        "label": "営業所情報",
        "required": "任意",
        "note": "営業所情報は、国内の経路検索事業者向けに設定された項目で、設定は任意です。営業所情報は、便情報に紐付くものであり、当該便を運行する営業所の情報を設定します。経路検索事業者によっては、ここで設定された情報に基づき、運行営業所の案内を行う場合があります。",
        "dataset": [{
                "name": "office_id",
                "label": "営業所ID",
                "required": "必須",
                "note": "<div id=\"office_id\"></div><script>$(\"#office_id\").html(getSuggestion(\"office_jp\"));</script>通事業者の営業所を一意に識別する値を指定。",
                "example": "office_jp_1",
            },
            {
                "name": "office_name",
                "label": "営業所名",
                "required": "必須",
                "note": "営業所名を指定。",
                "example": "深川営業所",
            },
            {
                "name": "office_url",
                "label": "営業所URL",
                "required": "任意",
                "note": " 営業所に関する事業者HPのURLを指定。個別の事業者HPが存在しない場合は空欄。",
                "example": "https://www.kotsu.metro.tokyo.jp/bus/branch/006.html#mado02",
                "tag": "input",
                "pattern": "https?://.+"
            },
            {
                "name": "office_phone",
                "label": "営業所電話番号",
                "required": "任意",
                "note": "営業所の代表電話番号を指定。",
                "example": "03-3529-3322"
            }
        ]
    },
    "pattern_jp.txt": {
        "label": "停車パターン情報",
        "required": "任意",
        "note": "routes.txtにおける経路ID［route_id］は、「バス利用者が１つの運行単位として認識しているもの」ごとに設定することとしていますが、バスロケーションシステムへの取り込み時等において、経由違いや途中止まり、往路・復路等を識別する情報が必要である場合には、停車パターンID[jp_pattern_id]を設定します。jp_pattern_idは始発停留所から終着停留所までの停留所のパターンごとに作成することを基本としますが、事業者ごとの事情に合わせた設定内容とすることも可能です。",
        "dataset": [{
                "name": "jp_pattern_id ",
                "label": "停車パターンID",
                "required": "必須",
                "note": "<div id=\"jp_pattern_id\"></div><script>$(\"#jp_pattern_id\").html(getSuggestion(\"pattern_jp\"));</script>経由違いや途中止まり等を識別する際に使用。ダイヤシステムで設定されている系統コードや、音声合成コード等を設定。",
                "example": "pattern_jp_1",
            },
            {
                "name": "route_update_date",
                "label": "ダイヤ改正日",
                "required": "任意",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "0401</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + YEAR + "1001</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "0401</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">" + (YEAR + 1) + "1001</button></div>ダイヤ改正日を明示的に登録する場合に設定。YYYYMMDD形式で指定。",
                "example": "20170106",
                "tag": "input",
                "pattern": "\\d{8}"
            },
            {
                "name": "origin_stop",
                "label": "起点",
                "required": "任意",
                "note": "起点名に使用されるテキストを指定。",
                "example": "東京駅八重洲口",
            },
            {
                "name": "via_stop",
                "label": "経過地",
                "required": "任意",
                "note": "経過地名に使用されるテキストを指定。",
                "example": "月島駅",
            },
            {
                "name": "destination_stop",
                "label": "終点",
                "required": "任意",
                "note": "終点名に使用されるテキストを指定。",
                "example": "東京ビッグサイト",
            }
        ]
    },
    "trips.txt": {
        "label": "便情報",
        "required": "必須",
        "note": "運行する便の情報を設定します。便情報は、GTFS-JPにおける運行情報設定の最小単位で、旅客が連続して乗車可能な１回の運行を1つの便情報[trip_id]として設定します。",
        "dataset": [{
                "name": "trip_id",
                "label": "便ID",
                "required": "必須",
                "note": "<div id=\"trip_id\"></div><script>$(\"#trip_id\").html(getSuggestion(\"trips\"));</script>便を特定するIDを指定。例）route_id+service_id+便番号など",
                "example": "trips_1",
            }, {
                "name": "route_id",
                "label": "経路 ID",
                "required": "必須",
                "note": "<div id=\"route_id\"></div><script>$(\"#route_id\").html(getSuggestion(\"routes\",1));</script>「routes」から参照。",
                "example": "routes_1",
            },
            {
                "name": "service_id",
                "label": "運行日ID",
                "required": "必須",
                "note": "<div id=\"service_id\"></div><script>$(\"#service_id\").html(getSuggestion(\"calendar\",1));</script>「calendar」から参照。",
                "example": "平日（月～金）",
            },
            {
                "name": "trip_headsign",
                "label": "便行先",
                "required": "任意",
                "note": "便としての行先と経由を設定。急行・直通等の種別がある場合は、行き先に加えて種別を併記。【例：急行　錦糸町駅前行き】",
                "example": "東京ビッグサイト（月島駅経由）",
            },
            {
                "name": "trip_short_name",
                "label": "便名称",
                "required": "任意",
                "note": "便を特定可能な名称がある場合、旅客に案内する必要がある場合のみ設定。【例：萩エクスプレス1号】ただしGTFSの仕様上、○号等の表示がなく、当該便の特定が不可能な場合は、trip_short_nameではなくtrip_headsignの行き先に加えて名称を併記。【例：萩エクスプレス　東京駅八重洲口行き】また、不定期運行路線等に関する注記がある場合には、当該注記を設定。",
                "example": "※設定例では便番号に相当するものがないため省略",
            },
            {
                "name": "direction_id",
                "label": "上下区分",
                "required": "任意",
                "note": "その便の往復区分を指定。　0：復路　1：往路",
                "example": "1",
                "tag": "select",
                "options": ["", "0", "1"]
            },
            {
                "name": "block_id",
                "label": "便結合区分",
                "required": "任意",
                "note": "別々の便(trips)として設定されている便を紐付け、連続して案内を行う場合に設定。バスの場合、連続乗車が可能な循環系統等を表現するために使用。",
                "example": "※設定例は循環系統ではないため省略",
            },
            {
                "name": "shape_id",
                "label": "描画 ID",
                "required": "任意",
                "note": "<div id=\"shape_id\"></div><script>$(\"#shape_id\").html(getSuggestion(\"shapes\",1));</script>「shapes」から参照。",
                "example": "shapes_1",
            },
            {
                "name": "wheelchair_accessible",
                "label": "車いす利用区分",
                "required": "任意",
                "note": "当該便における車いすの乗車可否について設定。　０：車いすによる乗車可否の情報なし　１：少なくとも1台の車いすによる乗車可能　２：車いすによる乗車不可",
                "example": "0",
                "tag": "select",
                "options": ["", "0", "1", "2"]
            },
            {
                "name": "bikes_allowed",
                "label": "自転車持込区分",
                "required": "任意",
                "note": "当該便における自転車の持込可否について設定。　０：自転車の持込可否の情報なし　１：少なくとも1台の自転車の持込可能　２：自転車の持込不可",
                "example": "0",
                "tag": "select",
                "options": ["", "0", "1", "2"]
            },
            {
                "name": "jp_trip_desc",
                "label": "便情報",
                "required": "任意",
                "note": "案内時に便に説明が必要な場合に使用。Calenderで制御が困難な不定期運行路線や時刻表に路線としてまとめて表示する場合に説明が必要となる項目を設定。",
                "example": "",
            },
            {
                "name": "jp_trip_desc_symbol",
                "label": "便記号",
                "required": "任意",
                "note": "時刻表形式で案内を行う場合に、便情報に代わり時刻に付ける凡例を設定。",
                "example": "",
            },
            {
                "name": "jp_office_id",
                "label": "営業所ID",
                "required": "任意",
                "note": "<div id=\"jp_office_id\"></div><script>$(\"#jp_office_id\").html(getSuggestion(\"offices_jp\",1));</script>「offices_jp」から参照。",
                "example": "office_jp_1",
            },
            {
                "name": "jp_pattern_id",
                "label": "停車パターンID",
                "required": "任意",
                "note": "<div id=\"jp_pattern_id\"></div><script>$(\"#jp_pattern_id\").html(getSuggestion(\"pattern_jp\",1));</script>「pattern_jp」から参照。",
                "example": "pattern_jp_1",
            }
        ]
    },
    "stop_times.txt": {
        "label": "通過時刻情報",
        "required": "必須",
        "note": "停留所の通過時刻を便ごとに設定します。複数の事業者が共同運行する場合は、自社便の情報のみを設定することを原則としますが、相手会社の情報も混在している場合、その旨を経路情報[route_desc(routes.txt)]に注記する必要があります。",
        "dataset": [{
                "name": "trip_id",
                "label": "便 ID",
                "required": "必須",
                "note": "<div id=\"trip_id\"></div><script>$(\"#trip_id\").html(getSuggestion(\"trips\",1));</script>「trips」から参照。",
                "example": "trips_1",
            },
            {
                "name": "arrival_time",
                "label": "到着時刻",
                "required": "必須",
                "note": "その便のその標柱への到着時刻を設定。起点はその標柱からの出発時刻と同じ時刻を半角で設定。但し、drop_off_typeが0の場合、同一trip_idにおいて同一時刻の設定不可。HH:MM:SS形式で、24時以降は25:01:00のように表現。1桁の場合には前に0をつける。",
                "example": "07:00:00",
                "tag": "input",
                "pattern": "\\d{2}:\\d{2}:\\d{2}"
            },
            {
                "name": "departure_time",
                "label": "出発時刻",
                "required": "必須",
                "note": "<div id=\"departure_time\"></div>その便のその標柱からの出発時刻を半角で設定。起点はその標柱への到着時刻と同じ時刻を設定。但し、pickup_typeが0の場合、同一trip_idにおいて同一時刻の設定不可。HH:MM:SS形式で、24時以降は25:01:00のように表現。1桁の場合には前に0をつける。",
                "example": "07:00:00",
                "tag": "input",
                "pattern": "\\d{2}:\\d{2}:\\d{2}"
            },
            {
                "name": "stop_id",
                "label": "標柱 ID",
                "required": "必須",
                "note": "<div id=\"stop_id\"></div><script>$(\"#stop_id\").html(getSuggestion(\"stops\",1));</script>「stops」から参照。参照するstopsのlocation_typeは0であることが必要。",
                "example": "stops_1",
            },
            {
                "name": "stop_sequence",
                "label": "通過順位",
                "required": "必須",
                "note": "その便での該当標柱の通過順序を指定。通過順位は通過順に昇順で半角数値を設定。必ずしも連番である必要はない。",
                "example": "0",
                "tag": "input",
                "pattern": "\\d+"
            },
            {
                "name": "stop_headsign",
                "label": "停留所行先",
                "required": "任意",
                "note": "循環系統や経由地通過後の表示等、停留所により案内する行き先が変化する場合に設定。trip_headsignでの設定を上書き。",
                "example": "東京ビッグサイト（月島駅経由）",
            },
            {
                "name": "pickup_type",
                "label": "乗車区分",
                "required": "任意",
                "note": "降車専用の場合は１、デマンド等の場合２または３を設定。　０：通常の乗車地　１：乗車不可能　２：交通機関に乗車予約の電話が必要　３：運転手への事前連絡が必要",
                "example": "0",
                "tag": "select",
                "options": ["", "0", "1", "2", "3"]
            },
            {
                "name": "drop_off_type",
                "label": "降車区分",
                "required": "任意",
                "note": "乗車専用の場合は１、デマンドやフリー降車等の場合２または３を設定。　０：通常の降車地（ブザーを押して申告する一般的な停留所を含む）　１：降車不可能　２：交通機関に降車予約の電話が必要　３：乗車時に運転手への事前連絡が必要",
                "example": "0",
                "tag": "select",
                "options": ["", "0", "1", "2", "3"]
            },
            {
                "name": "shape_dist_traveled",
                "label": "通算距離",
                "required": "任意",
                "note": "起点からの距離を設定。単位はmとする。",
                "example": "0",
                "tag": "input",
                "pattern": "\\d+"
            },
            {
                "name": "timepoint",
                "label": "発着時間制度",
                "required": "任意",
                "note": "発着時間の精度を設定。日本では使用しない。",
                "example": ""
            }
        ]
    },
    "frequencies.txt": {
        "label": "運行間隔情報",
        "required": "任意",
        "note": "定められた時刻表がなく、一定間隔で運行する場合に設定します。運行間隔情報は GTFS のファイルとして定義されていますが、国内の経路検索で設定する必要性は低いと考えられます。",
        "dataset": [{
                "name": "trip_id",
                "label": "便ID",
                "required": "必須",
                "note": "<div id=\"trip_id\"></div><script>$(\"#trip_id\").html(getSuggestion(\"trips\",1));</script>「trips」から参照。",
                "example": "trips_1",
            },
            {
                "name": "start_time",
                "label": "開始時刻",
                "required": "必須",
                "note": "定間隔運行案内を開始する時刻を半角で指定。HH:MM:SS 形式で指定。24:00:00 以降の時刻は25:35:00のように表現する。1桁の場合には前に0をつける。",
                "example": "10:00:00",
                "tag": "input",
                "pattern": "\\d{2}:\\d{2}:\\d{2}"
            },
            {
                "name": "end_time",
                "label": "終了時刻",
                "required": "必須",
                "note": "定間隔運行案内を終了する時刻を半角で指定。HH:MM:SS 形式で指定。24:00:00 以降の時刻は25:35:00のように表現する。1桁の場合には前に0をつける。",
                "example": "16:00:00",
                "tag": "input",
                "pattern": "\\d{2}:\\d{2}:\\d{2}"
            },
            {
                "name": "headway_secs",
                "label": "運行間隔",
                "required": "必須",
                "note": "定間隔運行案内を行う運行間隔の値は秒単位で設定。",
                "example": "900",
                "tag": "input",
                "pattern": "\\d+"
            },
            {
                "name": "exact_times",
                "label": "案内精度",
                "required": "任意",
                "note": "定期間隔運行案内を行う場合に具体的な時刻を案内しない場合は0、時刻を案内する場合は1を指定する。1が設定されている場合は、start_timeからend_timeまでheadway_secs間隔の時刻を案内します。",
                "example": "0",
                "tag": "select",
                "options": ["", "0", "1"]
            }
        ]
    },
    "translations.txt": {
        "label": "翻訳情報",
        "required": "必須",
        "note": "日本語（漢字名称や注記）をよみがなや英語、その他の言語に変換する際に設定します。field_value を用いて設定する方法の他に record_id/record_sub_id を用いて設定する方法がありますが、本ツールでは対応していません。第2版のGTFS-JPデータを読み込んだ場合は、table_nameとfield_nameのみ手動での設定が必要です",
        "dataset": [{
                "name": "table_name",
                "label": "テーブル名",
                "required": "必須",
                "note": "翻訳するフィールドを含む情報ファイルを定義。",
                "example": "agency",
                "tag": "select",
                "options": ["","agency", "stops", "routes", "trips", "stop_times", "feed_info"]
            },
            {
                "name": "field_name",
                "label": "フィールド名",
                "required": "必須",
                "note": "<div id=\"field_name\"></div>翻訳するフィールドの名前を指定。",
                "example": "agency_name"
            },
            {
                "name": "language",
                "label": "言語",
                "required": "必須",
                "note": "<div>入力候補: <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">ja</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">ja-Hrkt</button> <button type=\"button\" class=\"btn btn-sm btn-outline-primary rounded-pill btn-autocomplete\">en</button></div>よみがなは「ja-Hrkt」として設定。日本語「ja」、よみがな「ja-Hrkt」はGTFS-JPとしては必須。",
                "example": "①ja②ja-Hrkt③en"
            },
            {
                "name": "translation",
                "label": "翻訳先言語",
                "required": "必須",
                "note": "よみがなは、原則としてそのままの読みを記載(例：とうきょうえきじゅうばんのりば)",
                "example": "①数寄屋橋②すきやばし③Sukiyabashi",
            },
            {
                "name": "field_value",
                "label": "キーワード",
                "required": "必須",
                "note": "<div id=\"field_value\"></div>翻訳元となる日本語を設定。",
                "example": "数寄屋橋",
            }
        ]
    }
};