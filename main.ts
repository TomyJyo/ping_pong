/**
 * 5×5 LED の座標
 * 
 *   0 1 2 3 4 ←x
 * 
 * 0 □ □ □ □ □
 * 
 * 1 □ □ □ □ □
 * 
 * 2 □ □ □ □ □
 * 
 * 3 □ □ □ □ □
 * 
 * 4 □ ■ ■ □ □
 * 
 * ↑
 * 
 * y
 */
/**
 * 5×5 LED の座標
 * 
 *   0 1 2 3 4 ←x
 * 
 * 0 □ □ □ □ □
 * 
 * 1 □ □ □ □ □
 * 
 * 2 □ □ □ □ □
 * 
 * 3 □ □ □ □ □
 * 
 * 4 □ □ ■ ■ □
 * 
 * ↑
 * 
 * y
 */
input.onButtonPressed(Button.A, function () {
    customEditor.addMemo("【機能】ﾗｹｯﾄを左に1つｽﾗｲﾄﾞ")
    customEditor.addMemo("ﾗｹｯﾄは左右2つのLEDで構成し位置は左端で示す。")
    if (int_Racket_X > 0) {
        led.unplot(int_Racket_X + 1, 4)
        int_Racket_X = int_Racket_X - 1
        led.plot(int_Racket_X, 4)
    }
})
function BGM (strSound: string) {
    if (strSound == "go") {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.rest(music.beat(BeatFraction.Half))
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.rest(music.beat(BeatFraction.Half))
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.rest(music.beat(BeatFraction.Half))
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    } else if (strSound == "wall") {
        music.play(music.tonePlayable(392, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    } else if (strSound == "racket") {
        music.play(music.tonePlayable(784, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    } else if (strSound == "over") {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
    }
}
input.onButtonPressed(Button.B, function () {
    customEditor.addMemo("【機能】ﾗｹｯﾄを右に1つｽﾗｲﾄﾞ")
    customEditor.addMemo("ﾗｹｯﾄは左右2つのLEDで構成し位置は左端で示す")
    if (int_Racket_X < 3) {
        led.unplot(int_Racket_X, 4)
        int_Racket_X = int_Racket_X + 1
        led.plot(int_Racket_X + 1, 4)
    }
})
let bol_inGame = false
let int_Point = 0
let int_Ball_Dy = 0
let int_Ball_Dx = 0
let int_Ball_Y = 0
let int_Ball_X = 0
let int_Interv_Dt = 0
let int_Interv = 0
let int_Racket_X = 0
customEditor.addMemo("【概要】ピンポン")
customEditor.addMemo("・5×5 LED の最下段のﾗｹｯﾄを、ﾎﾞﾀﾝAとﾎﾞﾀﾝBを使って左右にｽﾗｲﾄﾞさせます。")
customEditor.addMemo("・ﾗｹｯﾄﾃでﾎﾞｰﾙを跳ね返した回数がﾎﾟｲﾝﾄになります。")
customEditor.addMemo("・2回目以降は、ﾎﾞﾀﾝAとﾎﾞﾀﾝBを同時に押してｹﾞｰﾑをｽﾀｰﾄします。")
for (let index = 0; index < 3; index++) {
    basic.showLeds(`
        # # # # #
        # . # . #
        # # # # #
        # . # . .
        # . # . .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
/**
 * 5×5 LED の座標
 * 
 *   0 1 2 3 4 ←x
 * 
 * 0 □ □ □ □ □
 * 
 * 1 □ □ □ □ □
 * 
 * 2 □ □ □ □ □
 * 
 * 3 □ □ □ □ □
 * 
 * 4 □ □ □ □ □
 * 
 * ↑
 * 
 * y
 */
basic.forever(function () {
    customEditor.addMemo("interval はﾎﾞｰﾙの移動間隔(ﾐﾘ秒)、step は短くする間隔(ﾐﾘ秒)で徐々に早くなります。")
    int_Interv = 800
    int_Interv_Dt = 10
    customEditor.addMemo("ball_x,ball_y はﾎﾞｰﾙの位置")
    int_Ball_X = 3
    int_Ball_Y = 4
    customEditor.addMemo("ball_dx,ball_dy はﾎﾞｰﾙの移動方向")
    int_Ball_Dx = -1
    int_Ball_Dy = -1
    customEditor.addMemo("bar_x はﾗｹｯﾄの位置")
    int_Racket_X = 0
    customEditor.addMemo("pointは得点")
    int_Point = 0
    BGM("go")
    basic.showString("GO")
    customEditor.addMemo("ｹﾞｰﾐ開始時のﾎﾞｰﾙとﾗｹｯﾄのLED位置を点灯")
    led.plot(int_Ball_X, int_Ball_Y)
    led.plot(int_Racket_X, 4)
    led.plot(int_Racket_X + 1, 4)
    bol_inGame = true
    customEditor.addMemo("in_game でｹﾞｰﾑ中なら繰返し")
    while (bol_inGame) {
        if (int_Ball_X + int_Ball_Dx < 0 || int_Ball_X + int_Ball_Dx > 4) {
            customEditor.addMemo("ﾎﾞｰﾙの次の位置が左壁か右壁なら、横の移動方向を反転させる")
            BGM("wall")
            int_Ball_Dx = int_Ball_Dx * -1
        }
        if (int_Ball_Y + int_Ball_Dy < 0) {
            customEditor.addMemo("ﾎﾞｰﾙの次の位置が上壁なら、縦の移動方向を反転させる")
            BGM("wall")
            int_Ball_Dy = int_Ball_Dy * -1
        } else if (int_Ball_Y + int_Ball_Dy > 3) {
            if (led.point(int_Ball_X + int_Ball_Dx, int_Ball_Y + int_Ball_Dy)) {
                customEditor.addMemo("ﾎﾞｰﾙの次の位置がﾗｹｯﾄで点灯していれば当たることになり、縦の移動方向の反転とﾎﾟｲﾝﾄをｶｳﾝﾄｱｯﾌﾟする")
                BGM("racket")
                int_Ball_Dy = int_Ball_Dy * -1
                int_Point = int_Point + 1
                if (int_Interv - int_Interv_Dt >= 0) {
                    customEditor.addMemo("ﾗｹｯﾄでﾎﾞｰﾙを返したので、ﾎﾞｰﾙの移動間隔(ﾐﾘ秒)を短くする")
                    int_Interv = int_Interv - int_Interv_Dt
                }
            } else {
                customEditor.addMemo("ﾎﾞｰﾙを返せなかったのでｹﾞｰﾑ終了させる")
                bol_inGame = false
            }
        }
        if (bol_inGame) {
            customEditor.addMemo("in_game でｹﾞｰﾑ中なら、ﾎﾞｰﾙの次の移動地点のLEDを点灯し、現在位置のLEDを消灯する")
            led.plot(int_Ball_X + int_Ball_Dx, int_Ball_Y + int_Ball_Dy)
            led.unplot(int_Ball_X, int_Ball_Y)
            customEditor.addMemo("ﾎﾞｰﾙの現在位置の座標も更新する")
            int_Ball_X = int_Ball_X + int_Ball_Dx
            int_Ball_Y = int_Ball_Y + int_Ball_Dy
            basic.pause(int_Interv)
        } else {
            game.setScore(int_Point)
            BGM("over")
            game.gameOver()
        }
    }
})
