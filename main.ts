let Distance_to_Obstical = 0
let LFSL = 0
let LFSR = 0
// Turns the vehicle gradually while moving forward
function soft_left () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 70)
}
// Moves the vehicle forward
function all_ahead () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
}
// Logic for avoiding the obstacle 
function Obstical_Avoidance () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 60)
    basic.pause(500)
    hard_right()
    all_ahead()
    basic.pause(100)
    while (Distance_to_Obstical) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
            hard_right()
        } else {
            all_ahead()
            basic.pause(100)
            soft_left()
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            Distance_to_Obstical = 0
            maqueen.motorStop(maqueen.Motors.All)
            basic.pause(500)
            hard_right()
            basic.pause(100)
        }
    }
}
//  90 degree turn.
function hard_right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 120)
    basic.pause(300)
}
// Turns the vehicle gradually while moving forward
function soft_right () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 70)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
}
//  90 degree turn
function hard_left () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 120)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
    basic.pause(300)
}
// Line following Logic
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        Distance_to_Obstical = 1
        Obstical_Avoidance()
    }
    LFSL = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    LFSR = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    if (LFSL == 1 && LFSR == 1) {
        all_ahead()
    } else if (LFSL == 1) {
        soft_right()
    } else if (LFSR == 1) {
        soft_left()
    } else {
        all_ahead()
    }
})
