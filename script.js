/**ゲームの動きを管理するプログラム */

const drawbtn = document.getElementById("draw");
const delbtn = document.getElementById("del");
const usebtn = document.getElementById("use");
const atkbtn_e = document.getElementById("atk_e");
const atkbtn = document.getElementById("atk");
const logbtn = document.getElementById("log_b");

const effect = document.getElementById("effect");
const semet = document.querySelector(".semet");
const semet_log = document.getElementById("semet__log")
const battle_log = document.getElementById("battle_log");
const handlist = document.querySelector(".handli");
const msg = document.getElementById("msg");

const tzone = document.querySelector(".tzone");
const p_hp_p = document.querySelector("#hp");
const p_cost_p = document.getElementById("cost");

const c_cost_p = document.getElementById("c_cost");
const c_name_p = document.getElementById("c_name");
const c_effect_p = document.getElementById("c_effect");
const c_atk_p = document.getElementById("c_atk");
const c_hp_p = document.getElementById("c_hp");

const e_name = document.getElementById("e_name");
const e_atk = document.getElementById("e_atk");
const e_def = document.getElementById("e_def");
const e_hp = document.getElementById("e_hp");
const e_img = document.querySelector(".ezone img");

let handvol = 0;
let active = 0;

let now_e = 0;
let act_cnt_e = 0;
let hp_e = 0;
let hp_p = 4000;
let max_cost = 0;
let lm_cost = max_cost;
costdwn_c = 0;

let nowhand = [];

let bzlist = [];
let bzhp = [];

let semetlist = [];

let makura = 0;
let catfood = 0;

const e_date = {
    e_0: {
        name: "さまよえる亡者",
        hp: 8000,
        atk: 500,
        def: 600,
        move: [0, 1, 1, 0, 2, 1, 2, 2]
    }
    ,
    e_1: {
        name: "背反の料理人",
        hp: 12000,
        atk: 1300,
        def: 200,
        move: [0, 1, 2, 0, 1, 1, 2, 1]
    }
    , e_2: {
        name: "猫の絵",
        hp: 20000,
        atk: 500,
        def: 1000,
        move: [2, 2, 2, 2, 1, 2, 2, 2]
    }
    , e_2: {
        name: "バックベアード",
        hp: 22000,
        atk: 2000,
        def: 2200,
        move: [0, 1, 1, 1, 0, 1, 0, 1, 0, 2]
    }
}

const c_date = {
    c_0: {
        name: "ネコ",
        cost: 1,
        atk: 200,
        hp: 1000,
        ef: "どこかの猫が突然変異して<br>このような姿になったと<br>言われている。<br>あくまで猫ではなく「ネコ」。"
    },
    c_1: {
        name: "Neo. Neko",
        cost: 2,
        atk: 350,
        hp: 1000,
        ef: "ネコ型の兵器<br>従来のネコよりも腕力が強い。"
    },
    c_2: {
        name: "○○○ン突撃部隊",
        cost: 3,
        atk: 800,
        hp: 500,
        ef: "三人寄れば文殊の知恵。<br>三匹寄れば猛獣の知性。"
    },
    c_3: {
        name: "ブレイネコ",
        cost: 4,
        atk: 700,
        hp: 1300,
        ef: "どんなネコでも、<br>囲ってくれるなら大歓迎だとさ。<br>たとえ、中身が〇〇〇〇でもな。<br>不足コストはこの<br>無礼なネコから確保します。"
    },
    c_4: {
        name: "ネコード・トーカー",
        cost: 5,
        atk: 1000,
        hp: 1300,
        ef: "リンクできそうな見た目を<br>しているが、実際は女子○生と<br>リンクすることしか考えていない。"
    },
    c_5: {
        name: "封印されそうなネコ",
        cost: 6,
        atk: 1000,
        hp: 1000,
        ef: "バトルゾーンに「封印されそうな右腕」<br>「封印されそうな左腕」「封印され<br>そうな右脚」「封印されそうな左脚」<br>「封印されそうな右手」が揃った場合、<br>ATKを10000アップする。"
    },
    c_6: {
        name: "封印されそうな右腕",
        cost: 3,
        atk: 200,
        hp: 1500,
        ef: "封印されそうなネコの右腕。<br>封印が解かれる前に全て揃えると<br>有限だが強力な力を得られる<br>かも。"
    },
    c_7: {
        name: "封印されそうな左腕",
        cost: 3,
        atk: 200,
        hp: 1500,
        ef: "封印されそうなネコの左腕。<br>封印が解かれる前に全て揃えると<br>素敵で嬉しいことが起こるかも<br>しれない。"
    },
    c_8: {
        name: "封印されそうな右脚",
        cost: 3,
        atk: 200,
        hp: 1500,
        ef: "封印されそうなネコの右脚。<br>封印が解かれる前に全て揃えると<br>あなたのメールに怪しい着信が<br>来るかもしれない。"
    },
    c_9: {
        name: "封印されそうな左脚",
        cost: 3,
        atk: 200,
        hp: 1500,
        ef: "封印されそうなネコの左脚。<br>封印が解かれる前に全て揃えると<br>誰かが買春容疑で逮捕される<br>かもしれない。"
    },
    c_10: {
        name: "封印されそうな右手",
        cost: 3,
        atk: 200,
        hp: 1500,
        ef: "封印されそうなネコの右手。<br>封印が解かれる前に全て揃えると<br>誰かしらの体がバラバラになる<br>かもしれない。"
    },
    c_11: {
        name: "マクラ・ガード",
        cost: 1,
        atk: 0,
        hp: 1200,
        ef: "自分の全てのモンスターの受ける<br>ダメージを100下げる。"
    },
    c_12: {
        name: "ゴブリン",
        cost: 2,
        atk: 100,
        hp: 1100,
        ef: "自分のすべてのモンスターの<br>ATKを50上げる。"
    },
    c_13: {
        name: "幽香",
        cost: 3,
        atk: 300,
        hp: 400,
        ef: "敵の行動が全体攻撃のとき、<br>そのダメージを半分にして<br>このモンスターを破壊する"
    },
    c_14: {
        name: "聖獣　ビーブ",
        cost: 4,
        atk: 250,
        hp: 1500,
        ef: "このモンスターが出たとき、HPを<br>1000回復する"
    },
    c_15: {
        name: "ため池の麻疹王",
        cost: 5,
        atk: 500,
        hp: 1100,
        ef: "このモンスターが破壊されたとき、<br>手札に「幽香」を加える。<br>その後、一枚ドローする。"
    },
    c_16: {
        name: "ネコの餌",
        cost: 6,
        atk: 0,
        hp: 2000,
        ef: "自分のネコモンスターのコストを<br>２少なくする。<br>ただし、0より小さくならない。<br>バトルゾーンのネコのATKを<br>100上げる。<br>これらの効果は重複しない"
    },
    c_: {
        name: "",
        cost: 0,
        atk: 0,
        hp: 0,
        ef: ""
    },
}
function draw() {
    let c_no = Math.floor(Math.random() * 17);
    const hand = document.createElement("img");
    hand.classList.add(`${c_no}`);
    nowhand.push(c_no);
    hand.setAttribute("src", `./card/${c_no}.png`);
    handlist.append(hand);
    handvol++;
}

function semetin(c) {
    const logplus = document.createElement("p");
    semetlist.push(c);
    logplus.innerText = `${eval("c_date.c_" + c + ".name")}`
    semet_log.prepend(logplus);
}

function dest() {
    const imag = document.querySelectorAll(".handli img");
    imag[active].remove();
    nowhand.splice(active, 1);
    imag[active].classList.remove("active");
    active = -1;
    btnneg();
}

function en_up() {
    e_name.innerHTML = eval("e_date.e_" + now_e + ".name");
    e_atk.innerHTML = eval("e_date.e_" + now_e + ".atk");
    e_def.innerHTML = eval("e_date.e_" + now_e + ".def");
    hp_e = eval("e_date.e_" + now_e + ".hp");
    e_img.setAttribute("src", `./enem/${now_e}.png`);
    e_hp.innerHTML = hp_e;
    logup(8, `${eval("e_date.e_" + now_e + ".name")}が現れた`);

}

function dmg_t() {
    let atk_sum = 0;
    let atkup_g_cnt = 0;
    let forbidden_cat = [];
    for (let i = 0; i < bzlist.length; i++) {
        atk_sum += eval("c_date.c_" + bzlist[i] + ".atk");
        switch (bzlist[i]) {
            case 0:
                break;
            case 5:
                forbidden_cat.push(0)
                break
            case 6:
                forbidden_cat.push(1)
                break
            case 7:
                forbidden_cat.push(2)
                break
            case 8:
                forbidden_cat.push(3)
                break
            case 9:
                forbidden_cat.push(4)
                break
            case 10:
                forbidden_cat.push(5)
            case 12:
                atkup_g_cnt++;
                break;
        }
    }
    forbidden_cat.forEach(i => {
        if (forbidden_cat[i] == 0) {
            forbidden_cat.forEach(j => {
                if (forbidden_cat[j] == 1) {
                    forbidden_cat.forEach(k => {
                        if (forbidden_cat[k] == 2) {
                            forbidden_cat.forEach(l => {
                                if (forbidden_cat[l] == 3) {
                                    forbidden_cat.forEach(m => {
                                        if (forbidden_cat[m] == 4) {
                                            forbidden_cat.forEach(n => {
                                                if (forbidden_cat[n] == 5) {
                                                    logup(8, "「封印されそうなネコ」の効果によりATKが10,000上がった。")
                                                    atk_sum += 10000;
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    atk_sum += atkup_g_cnt * bzlist.length * 50 + catfood * 100;
    if (atkup_g_cnt != 0) {
        logup(6, atkup_g_cnt * bzlist.length * 50)
    }
    if (catfood != 0) {
        logup(13, catfood);
    }
    logup(12, atk_sum);
    atk_sum -= eval("e_date.e_" + now_e + ".def");
    if (atk_sum <= 0) {
        logup(8, "効果はなかった");
    } else {
        hp_e -= atk_sum;
        e_hp.innerHTML = hp_e;
        logup(3, atk_sum);
        if (hp_e <= 0) {
            if (now_e == 2) {
                logup(8, "プレイヤーの勝利");
                atkbtn_e.classList.remove("active");
                atkbtn.classList.remove("active");
                usebtn.classList.remove("active");
                logup(8, "リトライする場合はページを再読み込みしてください");
            }
            logup(8, `${eval("e_date.e_" + now_e + ".name")}は倒れた`);
            now_e++;
            for (let i = 0; i <= 2; i++) {
                draw();
            }
            max_cost = 3
            hp_p += 2000;
            logup(8, "HPが回復し、使用可能コストが3にくなった");
            en_up();
        }
    }

}

function dmg_e(t) {
    const bzhp_p = Array.from(document.querySelectorAll(".nhp"));
    let dmg__sum = eval("e_date.e_" + now_e + ".atk") - makura * 100;
    if (dmg__sum <= 0) {
        logup(8, "しかし、効果がなかった。")
    } else {
        bzhp[t] -= dmg__sum
        bzhp_p[t].innerHTML = bzhp[t];
        logup(4, t, dmg__sum);
        if (bzhp[t] <= 0) {
            const del_t = document.querySelectorAll(".bz_c");
            logup(5, t)
            if (bzhp[t] != 0) {
                hp_p = hp_p + bzhp[t];
                p_hp_p.innerHTML = hp_p;
                logup(9, -bzhp[t]);
                if (hp_p <= 0) {
                    logup(8, "プレイヤーの敗北");
                    atkbtn_e.classList.remove("active");
                    atkbtn.classList.remove("active");
                    usebtn.classList.remove("active");
                    logup(8, "リトライする場合はページを再読み込みしてください");
                }
            }
            if (bzlist[t] == 11) {
                makura--;
            }
            if (bzlist[t] == 15) {
                logup(8, "ため池の麻疹王の効果により「幽香」を手札に加え一枚ドローする")
                const hand = document.createElement("img");
                hand.classList.add("13");
                nowhand.push(13);
                hand.setAttribute("src", `./card/13.png`);
                handlist.append(hand);
                handvol++;
                draw();
                logup(0);
            }
            del_t[t].remove();
            semetin(bzlist[t]);
            bzlist.splice(t, 1);
            bzhp.splice(t, 1);
        }

    }
}

function dmg_direct(d) {
    hp_p -= d;
    p_hp_p.innerHTML = hp_p;
    logup(9, d);
    if (hp_p <= 0) {
        logup(8, "プレイヤーの敗北");
        atkbtn_e.classList.remove("active");
        atkbtn.classList.remove("active");
        usebtn.classList.remove("active");
        logup(8, "リトライする場合はページを再読み込みしてください");
    }
}

function en_act(fun) {
    let mes_e = "";
    let inv = 0;
    let cut = 0;
    switch (fun) {
        case 0:
            mes_e = "何もしなかった";
            logup(8, mes_e);
            break;
        case 1:
            if (bzlist.length == 0) {
                mes_e = `プレイヤーへの直接攻撃`;
                logup(8, mes_e);
                dmg_direct(eval("e_date.e_" + now_e + ".atk"));
            } else {
                for (let i = 0; i <= bzlist.length; i++) {
                    if (bzlist[i] == 11) {
                        cut = 1;
                    }
                };
                if (cut == 1) {
                    logup(8, "「マクラ・ガード」の効果によりダメージが減少")
                }
                let atk_t_e = Math.floor(Math.random() * bzlist.length);
                mes_e = `単体攻撃`;
                logup(8, mes_e);
                dmg_e(atk_t_e);
            }

            break;
        case 2:
            if (bzlist.length == 0) {
                mes_e = `プレイヤーへの直接攻撃`;
                logup(8, mes_e);
                dmg_direct(eval("e_date.e_" + now_e + ".atk") * 2);
            } else {
                mes_e = "全体攻撃";
                logup(8, mes_e);
                for (let i = 0; i <= bzlist.length; i++) {
                    if (bzlist[i] == 13) {
                        inv = 1;
                        const del_t = document.querySelectorAll(".bz_c");
                        del_t[i].remove();
                        bzlist.splice(i, 1);
                        bzhp.splice(i, 1);
                    }
                };
                if (inv == 0) {
                    for (let i = 0; i <= bzlist.length; i++) {
                        if (bzlist[i] == 11) {
                            cut = 1;
                        }
                    };
                    if (makura != 0) {
                        logup(8, "「マクラ・ガード」の効果によりダメージが減少")
                    }
                    for (let i = bzlist.length - 1; i >= 0; i--) {
                        dmg_e(i);
                    }
                } else {
                    logup(8, "「幽香」の効果により無効化された");
                    semetin(13);
                }
            }
            break;
    }
}

function summon() {
    const imag = document.querySelectorAll(".handli img");
    let c_no = parseInt(imag[active].classList, 10);
    const bzdiv = document.createElement("div");
    if (costdwn_c == 1 && nowhand[active] <= 10) {
        lm_cost += 2;
    }
    lm_cost -= eval("c_date.c_" + nowhand[active] + ".cost");
    p_cost_p.innerHTML = lm_cost;
    bzdiv.classList.add("bz_c");
    bzlist.push(c_no);
    bzhp.push(eval("c_date.c_" + nowhand[active] + ".hp"));
    const put = document.createElement("img");
    bzdiv.innerHTML = `<img src="./card/${c_no}.png" class="${c_no} tzone__m">
                        <p>HP：<span class="nhp">${bzhp[bzhp.length - 1]}</span></p>`;
    tzone.append(bzdiv);
    logup(2);
    switch (c_no) {
        case 11:
            makura++;
            break
        case 14:
            hp_p += 500;
            p_hp_p.innerHTML = hp_p;
            logup(8, "HPが500回復した")
            break;
        case 16:
            costdwn_c = 1;
            logup(8, "ネコの餌の効果が適応されている状態")
    }
}

function btnact() {
    usebtn.classList.add("active");
}

function btnneg() {
    usebtn.classList.remove("active");
}

function effectup(active) {
    c_cost_p.innerHTML = eval("c_date.c_" + nowhand[active] + ".cost");
    c_name_p.innerHTML = eval("c_date.c_" + nowhand[active] + ".name");
    c_effect_p.innerHTML = eval("c_date.c_" + nowhand[active] + ".ef");
    c_atk_p.innerHTML = eval("c_date.c_" + nowhand[active] + ".atk");
    c_hp_p.innerHTML = eval("c_date.c_" + nowhand[active] + ".hp");
    effect.classList.add("active");
}

function logup(f, d, s) {
    const logplus = document.createElement("p");
    switch (f) {
        case 0:
            logplus.innerText = `${eval("c_date.c_" + nowhand[nowhand.length - 1] + ".name")}を引いた`;
            battle_log.prepend(logplus);
            break;
        case 1:
            logplus.innerText = `${eval("c_date.c_" + nowhand[active] + ".name")}を捨てた`;
            battle_log.prepend(logplus);
            break;
        case 2:
            logplus.innerText = `${eval("c_date.c_" + nowhand[active] + ".name")}をバトルゾーンに出した`;
            battle_log.prepend(logplus);
            break;
        case 3:
            logplus.innerText = `${eval("e_date.e_" + now_e + ".name")}へ${d}ダメージ`;
            battle_log.prepend(logplus);
            break;
        case 4:
            logplus.innerText = `${eval("c_date.c_" + bzlist[d] + ".name")}へ${s}ダメージ`;
            battle_log.prepend(logplus);
            break;
        case 5:
            logplus.innerText = `${eval("c_date.c_" + bzlist[d] + ".name")}は倒れた`;
            battle_log.prepend(logplus);
            break;
        case 6:
            logplus.innerText = `ゴブリンの効果で合計ATKが${d}上がった`;
            battle_log.prepend(logplus);
            break;
        case 7:
            logplus.innerText = `${eval("e_date.e_" + now_e + ".name")}の行動`;
            battle_log.prepend(logplus);
            break;
        case 8:
            logplus.innerText = `${d}`;
            battle_log.prepend(logplus);
            break;
        case 9:
            logplus.innerText = `プレイヤーのHPが${d}減った`;
            battle_log.prepend(logplus);
            break;
        case 10:
            logplus.innerText = "ターンチェンンジ";
            battle_log.prepend(logplus);
            break;
        case 11:
            logplus.innerText = "使用可能コストが増えた";
            battle_log.prepend(logplus);
            break;
        case 12:
            logplus.innerText = `このターンの攻撃力:${d}`;
            battle_log.prepend(logplus);
            break;
        case 13:
            logplus.innerText = `ネコの餌の効果で:${d}体のネコの攻撃力が100上がった`;
            battle_log.prepend(logplus);
            break
        case 14:
            logplus.innerText = `プレイヤーのHPが0になったため、プレイヤーの敗北`;
            battle_log.prepend(logplus);
            break
        case 15:
            logplus.innerHTML = `${eval("e_date.e_" + now_e + ".name")}を倒した`
            battle_log.prepend(logplus)
            break
    }
    msg.innerHTML = logplus.innerHTML;
}

function handcont(fun) {
    switch (fun) {
        case 0:
            draw();
            logup(0);
            break;
        case 1:
            logup(1);
            dest();
            break;
        case 2:
            summon();
            dest();
            break;
    }
    effect.classList.remove("active");
    const imag = document.querySelectorAll(".handli img");
    for (let i = 0; i < imag.length; i++) {
        imag[i].addEventListener("click", () => {
            active = i;
            imag[active].classList.add("active");
            effectup(i);
            btnact();
            for (let j = 0; j <= handvol + 1; j++) {
                if (j != active) {
                    imag[j].classList.remove("active");
                }
            }
        })
    }
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        handcont(0);
    }, 500);
}

logbtn.classList.add("active");
atkbtn.classList.add("active");
en_up();
max_cost++;
lm_cost = max_cost;
p_hp_p.innerHTML = hp_p;
p_cost_p.innerHTML = lm_cost;

drawbtn.addEventListener("click", () => {
    if (handvol < 6) {
        handcont(0);
    }
})

delbtn.addEventListener("click", () => {
    if (handvol > 0) {
        handcont(1);
        handvol--;
    }
})

usebtn.addEventListener("click", () => {
    if (handvol > 0 && bzlist.length < 10) {
        if (eval("c_date.c_" + nowhand[active] + ".cost") <= lm_cost || costdwn_c == 1 && nowhand[active] <= 10 && eval("c_date.c_" + nowhand[active] + ".cost") - 2 <= lm_cost) {
            handcont(2);
            handvol--;
        } else {
            logup(8, "コストが足りません")
        }
        drawbtn.classList.remove("active");
    }
})

atkbtn.addEventListener("click", () => {
    logup(8, "モンスターの攻撃");
    dmg_t();
    atkbtn_e.classList.add("active");
    atkbtn.classList.remove("active");
})

atkbtn_e.addEventListener("click", () => {
    logup(7);
    if (act_cnt_e > eval("e_date.e_" + now_e + ".move.length")) {
        act_cnt_e = 0;
    }
    en_act(eval("e_date.e_" + now_e + ".move[" + act_cnt_e + "]"));
    act_cnt_e++;
    atkbtn.classList.add("active");
    atkbtn_e.classList.remove("active");
    logup(10);
    if (max_cost < 9) {
        max_cost++;
        logup(11);
    }
    lm_cost = max_cost;
    p_cost_p.innerHTML = max_cost;
    handcont(0);
})

logbtn.addEventListener("click", () => {
    battle_log.classList.toggle("active");
})

battle_log.addEventListener("click", () => {
    battle_log.classList.toggle("active");
})

semet.addEventListener("click", () => {
    semet_log.classList.toggle("active");
})

semet_log.addEventListener("click", () => {
    semet_log.classList.remove("active")
})