const ss_start_val = 0    // min seconds
const ss_last_val = 59    // max seconds  
const mm_start_val = 0    // min minutes
const mm_last_val = 59    // max minutes
const hh_start_val = 1    // min hours
const hh_last_val = 12    // max hours

const d = new Date();           // current date/time
let hh_val = d.getHours() % 12; // current hours (for 1-12 hour notation)
let mm_val = d.getMinutes();    // current minutes
let ss_val = d.getSeconds();    // current seconds

// general generator for hours/minutes/seconds
// function*(min value, max value, current value)
let f_gen = function* (start_val, last_val, curr_val) {
    let n = curr_val+1
    while (true) {
        yield n++
        if (n > last_val) n = start_val
    }
}

let hh_gen = f_gen(hh_start_val, hh_last_val, hh_val)   // hours generator
let mm_gen = f_gen(mm_start_val, mm_last_val, mm_val)   // minutes generator
let ss_gen = f_gen(ss_start_val, ss_last_val, ss_val)   // seconds generator

ss_int = setInterval(ssFunc, 1000);    // set interval for seconds generator (runs every 1 second)

function ssFunc() {
    ss_val = ss_gen.next().value
    if (ss_val == ss_start_val) {
        mm_val = mm_gen.next().value
        if (mm_val == mm_start_val) {
            hh_val = hh_gen.next().value
        }
    }
    
    let time_str = hh_val.toString().padStart(2, '0') + ":" + mm_val.toString().padStart(2, '0') + ":" + ss_val.toString().padStart(2, '0')
    document.getElementById("clock").innerHTML = time_str;
}