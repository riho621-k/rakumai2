// スマホ ヘッダーのメニューボタンクリック時にメニューを表示
document.getElementById('sp-hd-btn-id').addEventListener('click', function()
{
    document.querySelector('.sp-hd-line').classList.toggle('sp-hd-line-active');
    document.getElementById('sp-hd-menu-id').classList.toggle('sp-hd-menu-active');
});

//スマホ　メニュー内のアンカータグクリック時にメニューを消す。
function spMenuClick () {
    document.querySelector('.sp-hd-line').classList.remove('sp-hd-line-active');
    document.getElementById('sp-hd-menu-id').classList.remove('sp-hd-menu-active');
}

var sp_header_start_point = document.getElementById('jump_sec1').getBoundingClientRect().top + window.scrollY;

window.addEventListener("scroll", scroll);
function scroll() 
{ 

    //現在のスクロール位置
    //var y = window.scrollY;

}

var curt_box_id = document.getElementById('fixed-curt-id');
var curt_btn = document.querySelector('.sp-curt-btn');
var curt_box = document.getElementById('curt-box-id');
var pc_curt_a = document.querySelector('.pc-curt-a');
var pc_curt_img = document.querySelector('.pc-curt-img');

var item_array = ['sample_item','discount_item','normal_item','suihanki_item','water_item'];

 // カートボタンの再表示
function spCurtRestart(bool) 
{
    if (!curt_btn.classList.contains('anime-ok') || bool === 'restart') {
        curt_btn.style.display = 'inline-block';
        curt_box.style.display = 'inline-block';
        curt_box.className = 'curt-box';
        curt_btn.className = 'curt-btn';
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                curt_box.className = "curt-box curt-anime-class";
                curt_btn.className = "sp-curt-btn opacity-anime anime-ok";
            });
        });
    } 
    else if (bool === 'on') //カート内再表示のみ
    {
        curt_box.style.display = 'inline-block';
        curt_box.className = 'curt-box';
        window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
                curt_box.className = "curt-box curt-anime-class";
            });
        });
    }
    else // off
    {
        curt_btn.style.display = 'none';
        curt_box.style.display = 'none';
        curt_btn.classList.remove('anime-ok');
    }
}

function pcCurtRestart(bool) 
{
    if (bool === 'on') 
    {
        if (!pc_curt_a.classList.contains('anime-ok')) {
            
            pc_curt_a.style.display = 'inline-block';
            pc_curt_img.style.display = 'inline-block';
            pc_curt_a.className = 'pc-curt-a';
            pc_curt_img.className = 'pc-curt-img';
            window.requestAnimationFrame(function(time) {
                window.requestAnimationFrame(function(time) {
                    pc_curt_a.className = "pc-curt-a opacity-anime anime-ok";
                    pc_curt_img.className = "pc-curt-img opacity-anime";
                });
            });
        } 
        curt_box.style.display = 'inline-block';
    }
    else 
    {
        curt_box.style.display = 'none';
        pc_curt_a.style.display = 'none';
        pc_curt_img.style.display = 'none';
        pc_curt_a.classList.remove('anime-ok');
    }
    
}

function spOnoff(bool) 
{
    if (bool === 'on') 
    {
        console.log('true');
    }
    else
    {
        curt_btn.style.display = 'none';
    }
}

function itemCount()
{
    var item_value = 0;
    for (var i = 0; item_array.length > i; i++) 
    {
        if (document.getElementById(`${item_array[i]}_id`).value >= 1) {
            item_value ++;
        }
    }
    return item_value;
}

//カートに追加ボタンが押された時
function curtCheck(item_id) {

    var select = document.getElementById(`${item_id}_id`);
    
    if (select.value === '0') 
    { 
        ///追加または変更ボタンが追加された時->0の値が入っていた場合
        document.getElementById(`${item_id}_btn_id`).textContent = '追加する';
        document.getElementById(`${item_id}_curt_id`).style.display = 'none';
        document.getElementById(`${item_id}_curt_id`).style.opacity = '0';
    } 
    else
    {
        //カゴに何かしら入っているときのテキスト
        document.getElementById(`${item_id}_btn_id`).textContent = '変更する';


        //カゴの中として表示されるテキスト
        switch (item_id) {
            case item_array[0]: // sample_item
                text = 'サンプル 1個 500円';
                break;
            
            case item_array[1]: // discount_item
                text = `らくまい定期便 ${select.options[select.value].textContent}`;
                break;

            case item_array[2]: // normal_item
                text = `らくまい通常注文 ${select.options[select.value].textContent}`;
                break;
            
            case item_array[3]: // suihanki_item
                text = `らくらく炊飯器 ${select.options[select.value].textContent}`;
                break;
            
            case item_array[4]: // water_item
                text = `最後に入れるお水 ${select.options[select.value].textContent}`;
                break;
        }

        //カート内ポップアップの中のテキストを代入
        document.getElementById(`${item_id}_curt_id`).textContent = text;
        document.getElementById(`${item_id}_curt_id`).style.display = 'inline';
        document.getElementById(`${item_id}_curt_id`).style.opacity = '1';
    }

    //カートボタンの表示を変える
    if (itemCount() >= 1) 
    {   
        if ( window.innerWidth >= 768 ) {   
            pcCurtRestart('on');
        } 
        else {
            spCurtRestart('on');
        }       
    } 
    else 
    {
        if ( window.innerWidth >= 768 ) {
            pcCurtRestart('off');
        } 
        else {
            spCurtRestart('off');
        }

    }

}

//ウインドウサイズが変わった時のカートの処理
function resizeWindow(event)
{
    if (itemCount() >= 1) {
        curt_box.style.display = 'inline';
        if ( window.innerWidth >= 768 ) {   
            spCurtRestart('off');
            pcCurtRestart('on');
        } 
        else {
            pcCurtRestart('off');
            spCurtRestart('restart');
        } 
    }
}

window.addEventListener('resize', resizeWindow);

/*
あとやるこt
スクロールで動くものたち実装
ページジャンプの時
タイトルのフォント
商品一覧の画像直す
注文完了画面
お問い合わせ完了画面

js の読み込み 
*/