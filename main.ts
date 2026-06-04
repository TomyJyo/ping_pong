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
    customEditor.addMemo("ﾗｹｯﾄは左右2つLEDで構成し位置は左端で示す")
    if (bar_x > 0) {
        led.unplot(bar_x + 1, 4)
        bar_x = bar_x - 1
        led.plot(bar_x, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    customEditor.addMemo("【機能】ﾗｹｯﾄを右に1つｽﾗｲﾄﾞ")
    customEditor.addMemo("ﾗｹｯﾄは左右2つLEDで構成し位置は左端で示す")
    if (bar_x < 3) {
        led.unplot(bar_x, 4)
        bar_x = bar_x + 1
        led.plot(bar_x + 1, 4)
    }
})
let in_game = false
let ball_dy = 0
let ball_dx = 0
let ball_y = 0
let ball_x = 0
let interval_step = 0
let interval = 0
let point = 0
let bar_x = 0
customEditor.addMemo("【概要】ピンポン")
customEditor.addMemo("・5×5 LED の最下段のﾗｹｯﾄをAﾎﾞﾀﾝとBﾎﾞﾀﾝを使って左右にｽﾗｲﾄﾞさせます。")
customEditor.addMemo("・ﾗｹｯﾄﾃでﾎﾞｰﾙを跳ね返した回数がﾎﾟｲﾝﾄになります。")
customEditor.addMemo("・2回目以降は、AﾎﾞﾀﾝとBﾎﾞﾀﾝを同時に押してｽﾀｰﾄします。")
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
    point = 0
    customEditor.addMemo("interval はﾎﾞｰﾙの移動間隔(ﾐﾘ秒)、step は短くする間隔(ﾐﾘ秒)で徐々に早くなります。")
    interval = 800
    interval_step = 10
    customEditor.addMemo("ball_x,ball_y はｹﾞｰﾑ開始時のﾎﾞｰﾙの位置")
    ball_x = 3
    ball_y = 4
    customEditor.addMemo("ball_dx,ball_dy はｹﾞｰﾑ開始時のﾎﾞｰﾙの移動方向")
    ball_dx = -1
    ball_dy = -1
    customEditor.addMemo("bar_x はｹﾞｰﾑ開始時のﾗｹｯﾄの位置")
    bar_x = 0
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(BeatFraction.Half))
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(BeatFraction.Half))
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(BeatFraction.Half))
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    basic.showString("GO")
    led.plot(ball_x, ball_y)
    led.plot(bar_x, 4)
    led.plot(bar_x + 1, 4)
    in_game = true
    customEditor.addMemo("in_game でｹﾞｰﾑ中なら繰返し")
    while (in_game) {
        if (ball_x + ball_dx > 4) {
            customEditor.addMemo("ﾎﾞｰﾙの次の位置が右壁なら、横の移動方向を反転させる")
            music.play(music.tonePlayable(392, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            ball_dx = ball_dx * -1
        } else if (ball_x + ball_dx < 0) {
            customEditor.addMemo("ﾎﾞｰﾙの次の位置が左壁なら、横の移動方向を反転させる")
            music.play(music.tonePlayable(392, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            ball_dx = ball_dx * -1
        }
        if (ball_y + ball_dy < 0) {
            customEditor.addMemo("ﾎﾞｰﾙの次の位置が上壁なら、縦の移動方向を反転させる")
            music.play(music.tonePlayable(392, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            ball_dy = ball_dy * -1
        } else if (ball_y + ball_dy > 3) {
            if (led.point(ball_x + ball_dx, ball_y + ball_dy)) {
                customEditor.addMemo("ﾎﾞｰﾙの次の位置がﾗｹｯﾄで点灯していれば当たったことになり、縦の移動方向の反転とﾎﾟｲﾝﾄをｶｳﾝﾄｱｯﾌﾟする")
                music.play(music.tonePlayable(784, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
                ball_dy = ball_dy * -1
                point = point + 1
                if (interval - interval_step >= 0) {
                    customEditor.addMemo("ﾗｹｯﾄでﾎﾞｰﾙを返したので、ﾎﾞｰﾙの移動間隔(ﾐﾘ秒)を短くする")
                    interval = interval - interval_step
                }
            } else {
                customEditor.addMemo("ﾎﾞｰﾙを返せなかったのでｹﾞｰﾑ終了させる")
                in_game = false
            }
        }
        if (in_game) {
            customEditor.addMemo("in_game でｹﾞｰﾑ中なら、ﾎﾞｰﾙの次の移動地点のLEDを点灯し、現在位置のLEDを消灯する")
            led.plot(ball_x + ball_dx, ball_y + ball_dy)
            led.unplot(ball_x, ball_y)
            customEditor.addMemo("ﾎﾞｰﾙの現在位置の座標も更新する")
            ball_x = ball_x + ball_dx
            ball_y = ball_y + ball_dy
            basic.pause(interval)
        } else {
            game.setScore(point)
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
            game.gameOver()
        }
    }
})
