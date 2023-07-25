
let animated_drawers = [];
let models_ready = false;
let drawers_ready = false;
let all_drawers = [];
let all_containers = [];

let block;
let piston_limits;
let piston_limits_slider;
let head_section;
let x=0;

(function() {
    let scale = window.devicePixelRatio || 1;
    scale = scale > 1.75 ? 2 : 1;

    // let blue_color = [91 / 255, 173 / 255, 220 / 255, 1];
    let blue_color = [124 / 255, 124 / 255, 124 / 255, 1]; //#7C7C7C 
    let green_color = [149 / 255, 149 / 255, 149 / 255, 1]; //#959595 
    let yellow_color = [190 / 255, 190 / 255, 190 / 255, 1]; //#BEBEBE
    let red_color = [106 / 255, 106 / 255, 106 / 255, 1];   //6A6A6A
    let gray_color = [0.8, 0.8, 0.8, 1];
    let dark_gray_color = [0.4, 0.4, 0.4, 1];
    let clip_color = [0.3, 0.3, 0.3, 1];
    let black_color = [0.1, 0.1, 0.1, 1];
    //SILVER  TO ->175/255

    let march_step = 17;

    let models = {
        "Arrow": {
            "index_offset": 0,
            "index_count": 72,
            "line_index_offset": 72,
            "line_index_count": 126,
        },
        "Crank_base": {
            "index_offset": 198,
            "index_count": 36,
            "line_index_offset": 234,
            "line_index_count": 72,
        },
        "Crank": {
            "index_offset": 306,
            "index_count": 1260,
            "line_index_offset": 1566,
            "line_index_count": 1344,
        },
        "Handle": {
            "index_offset": 2910,
            "index_count": 2604,
            "line_index_offset": 5514,
            "line_index_count": 2010,
        },
        "Support": {
            "index_offset": 7524,
            "index_count": 1116,
            "line_index_offset": 8640,
            "line_index_count": 1506,
        },
        "Cannon_ball": {
            "index_offset": 10146,
            "index_count": 960,
            "line_index_offset": 11106,
            "line_index_count": 0,
        },
        "Cannon": {
            "index_offset": 11106,
            "index_count": 2835,
            "line_index_offset": 13941,
            "line_index_count": 4476,
        },
        "Crank_key": {
            "index_offset": 18417,
            "index_count": 36,
            "line_index_offset": 18453,
            "line_index_count": 72,
        },
        "Crankshaft_flywheel_end": {
            "index_offset": 18525,
            "index_count": 3567,
            "line_index_offset": 22092,
            "line_index_count": 6696,
        },
        "Crankshaft_main_journal_fillet": {
            "index_offset": 28788,
            "index_count": 3609,
            "line_index_offset": 32397,
            "line_index_count": 426,
        },
        "Crankshaft_main_journal": {
            "index_offset": 32823,
            "index_count": 1557,
            "line_index_offset": 34380,
            "line_index_count": 2952,
        },
        "Crankshaft_pulley_end": {
            "index_offset": 37332,
            "index_count": 2223,
            "line_index_offset": 39555,
            "line_index_count": 2808,
        },
        "Crankshaft_rod_journal": {
            "index_offset": 42363,
            "index_count": 4359,
            "line_index_offset": 46722,
            "line_index_count": 3030,
        },
        "Crankshaft_web": {
            "index_offset": 49752,
            "index_count": 2412,
            "line_index_offset": 52164,
            "line_index_count": 3960,
        },
        "Flywheel_pinion": {
            "index_offset": 56124,
            "index_count": 624,
            "line_index_offset": 56748,
            "line_index_count": 972,
        },
        "Flywheel": {
            "index_offset": 57720,
            "index_count": 3141,
            "line_index_offset": 60861,
            "line_index_count": 5196,
        },
        "Block_lines": {
            "index_offset": 66057,
            "index_count": 1452,
            "line_index_offset": 67509,
            "line_index_count": 840,
        },
        "Camshaft_cap": {
            "index_offset": 68349,
            "index_count": 1731,
            "line_index_offset": 70080,
            "line_index_count": 2376,
        },
        "Chamber_top": {
            "index_offset": 72456,
            "index_count": 1830,
            "line_index_offset": 74286,
            "line_index_count": 0,
        },
        "Engine_block_back": {
            "index_offset": 74286,
            "index_count": 6996,
            "line_index_offset": 81282,
            "line_index_count": 10746,
        },
        "Engine_block_front": {
            "index_offset": 92028,
            "index_count": 6912,
            "line_index_offset": 98940,
            "line_index_count": 11076,
        },
        "Engine_block": {
            "index_offset": 110016,
            "index_count": 7503,
            "line_index_offset": 117519,
            "line_index_count": 11250,
        },
        "Engine_head_back": {
            "index_offset": 128769,
            "index_count": 7959,
            "line_index_offset": 136728,
            "line_index_count": 5694,
        },
        "Engine_head_front": {
            "index_offset": 142422,
            "index_count": 8982,
            "line_index_offset": 151404,
            "line_index_count": 8268,
        },
        "Engine_head_valve_section": {
            "index_offset": 159672,
            "index_count": 5028,
            "line_index_offset": 164700,
            "line_index_count": 5106,
        },
        "Engine_head": {
            "index_offset": 169806,
            "index_count": 28230,
            "line_index_offset": 198036,
            "line_index_count": 30906,
        },
        "Gasket_end": {
            "index_offset": 228942,
            "index_count": 1668,
            "line_index_offset": 230610,
            "line_index_count": 1656,
        },
        "Gasket_lines": {
            "index_offset": 232266,
            "index_count": 36,
            "line_index_offset": 232302,
            "line_index_count": 48,
        },
        "Gasket": {
            "index_offset": 232350,
            "index_count": 2142,
            "line_index_offset": 234492,
            "line_index_count": 2652,
        },
        "Gear_mount": {
            "index_offset": 237144,
            "index_count": 1413,
            "line_index_offset": 238557,
            "line_index_count": 1836,
        },
        "Head_lines_2": {
            "index_offset": 240393,
            "index_count": 1494,
            "line_index_offset": 241887,
            "line_index_count": 1266,
        },
        "Head_lines_3": {
            "index_offset": 243153,
            "index_count": 144,
            "line_index_offset": 243297,
            "line_index_count": 144,
        },
        "Head_lines_4": {
            "index_offset": 243441,
            "index_count": 36,
            "line_index_offset": 243477,
            "line_index_count": 48,
        },
        "Head_lines_5": {
            "index_offset": 243525,
            "index_count": 555,
            "line_index_offset": 244080,
            "line_index_count": 474,
        },
        "Head_lines": {
            "index_offset": 244554,
            "index_count": 1539,
            "line_index_offset": 246093,
            "line_index_count": 1284,
        },
        "Main_journal_cap": {
            "index_offset": 247377,
            "index_count": 1032,
            "line_index_offset": 248409,
            "line_index_count": 1584,
        },
        "Timing_belt": {
            "index_offset": 249993,
            "index_count": 1404,
            "line_index_offset": 251397,
            "line_index_count": 1440,
        },
        "Timing_gear_big": {
            "index_offset": 252837,
            "index_count": 4206,
            "line_index_offset": 257043,
            "line_index_count": 5544,
        },
        "Timing_gear_small": {
            "index_offset": 262587,
            "index_count": 1830,
            "line_index_offset": 264417,
            "line_index_count": 2106,
        },
        "Valve_seat": {
            "index_offset": 266523,
            "index_count": 4308,
            "line_index_offset": 270831,
            "line_index_count": 1524,
        },
        "Hex": {
            "index_offset": 272355,
            "index_count": 60,
            "line_index_offset": 272415,
            "line_index_count": 108,
        },
        "Injector_fuel": {
            "index_offset": 272523,
            "index_count": 63,
            "line_index_offset": 272586,
            "line_index_count": 150,
        },
        "Injector_inner": {
            "index_offset": 272736,
            "index_count": 1116,
            "line_index_offset": 273852,
            "line_index_count": 1332,
        },
        "Injector_lines_2": {
            "index_offset": 275184,
            "index_count": 72,
            "line_index_offset": 275256,
            "line_index_count": 84,
        },
        "Injector_lines": {
            "index_offset": 275340,
            "index_count": 240,
            "line_index_offset": 275580,
            "line_index_count": 276,
        },
        "Injector_needle": {
            "index_offset": 275856,
            "index_count": 2592,
            "line_index_offset": 278448,
            "line_index_count": 4170,
        },
        "Injector_outer": {
            "index_offset": 282618,
            "index_count": 4020,
            "line_index_offset": 286638,
            "line_index_count": 5280,
        },
        "Main_bearing_bottom": {
            "index_offset": 291918,
            "index_count": 948,
            "line_index_offset": 292866,
            "line_index_count": 1602,
        },
        "Main_bearing_top": {
            "index_offset": 294468,
            "index_count": 2991,
            "line_index_offset": 297459,
            "line_index_count": 4644,
        },
        "Piston_clip": {
            "index_offset": 302103,
            "index_count": 1584,
            "line_index_offset": 303687,
            "line_index_count": 2568,
        },
        "Piston_lines_2": {
            "index_offset": 306255,
            "index_count": 84,
            "line_index_offset": 306339,
            "line_index_count": 96,
        },
        "Piston_lines": {
            "index_offset": 306435,
            "index_count": 750,
            "line_index_offset": 307185,
            "line_index_count": 894,
        },
        "Piston_oil_ring": {
            "index_offset": 308079,
            "index_count": 3228,
            "line_index_offset": 311307,
            "line_index_count": 3264,
        },
        "Piston_pin": {
            "index_offset": 314571,
            "index_count": 1104,
            "line_index_offset": 315675,
            "line_index_count": 1284,
        },
        "Piston_ring": {
            "index_offset": 316959,
            "index_count": 2556,
            "line_index_offset": 319515,
            "line_index_count": 2592,
        },
        "Piston": {
            "index_offset": 322107,
            "index_count": 8301,
            "line_index_offset": 330408,
            "line_index_count": 14916,
        },
        "Rod_bearing": {
            "index_offset": 345324,
            "index_count": 1248,
            "line_index_offset": 346572,
            "line_index_count": 2292,
        },
        "Rod_bottom": {
            "index_offset": 348864,
            "index_count": 2178,
            "line_index_offset": 351042,
            "line_index_count": 2850,
        },
        "Rod_top": {
            "index_offset": 353892,
            "index_count": 6429,
            "line_index_offset": 360321,
            "line_index_count": 7182,
        },
        "Simple_crank": {
            "index_offset": 367503,
            "index_count": 1560,
            "line_index_offset": 369063,
            "line_index_count": 1596,
        },
        "Simple_cylinder_lines_1": {
            "index_offset": 370659,
            "index_count": 1644,
            "line_index_offset": 372303,
            "line_index_count": 858,
        },
        "Simple_cylinder_lines_2": {
            "index_offset": 373161,
            "index_count": 1704,
            "line_index_offset": 374865,
            "line_index_count": 882,
        },
        "Simple_cylinder_lines_3": {
            "index_offset": 375747,
            "index_count": 1596,
            "line_index_offset": 377343,
            "line_index_count": 834,
        },
        "Simple_cylinder_plain": {
            "index_offset": 378177,
            "index_count": 732,
            "line_index_offset": 378909,
            "line_index_count": 642,
        },
        "Simple_cylinder": {
            "index_offset": 379551,
            "index_count": 3486,
            "line_index_offset": 383037,
            "line_index_count": 1236,
        },
        "Simple_piston": {
            "index_offset": 384273,
            "index_count": 1959,
            "line_index_offset": 386232,
            "line_index_count": 2658,
        },
        "Simple_rod": {
            "index_offset": 388890,
            "index_count": 1839,
            "line_index_offset": 390729,
            "line_index_count": 2388,
        },
        "Simple_valve": {
            "index_offset": 393117,
            "index_count": 1323,
            "line_index_offset": 394440,
            "line_index_count": 1632,
        },
        "Spark_plug_electrode_lines": {
            "index_offset": 396072,
            "index_count": 228,
            "line_index_offset": 396300,
            "line_index_count": 312,
        },
        "Spark_plug_electrode": {
            "index_offset": 396612,
            "index_count": 741,
            "line_index_offset": 397353,
            "line_index_count": 1494,
        },
        "Spark_plug_insulator_lines": {
            "index_offset": 398847,
            "index_count": 291,
            "line_index_offset": 399138,
            "line_index_count": 396,
        },
        "Spark_plug_insulator": {
            "index_offset": 399534,
            "index_count": 2907,
            "line_index_offset": 402441,
            "line_index_count": 5814,
        },
        "Spark_plug_shell_lines_2": {
            "index_offset": 408255,
            "index_count": 372,
            "line_index_offset": 408627,
            "line_index_count": 600,
        },
        "Spark_plug_shell_lines": {
            "index_offset": 409227,
            "index_count": 183,
            "line_index_offset": 409410,
            "line_index_count": 252,
        },
        "Spark_plug_shell": {
            "index_offset": 409662,
            "index_count": 1758,
            "line_index_offset": 411420,
            "line_index_count": 3342,
        },
        "Spark_spark": {
            "index_offset": 414762,
            "index_count": 702,
            "line_index_offset": 415464,
            "line_index_count": 0,
        },
        "Valve_bucket": {
            "index_offset": 415464,
            "index_count": 1044,
            "line_index_offset": 416508,
            "line_index_count": 2094,
        },
        "Valve_collet": {
            "index_offset": 418602,
            "index_count": 903,
            "line_index_offset": 419505,
            "line_index_count": 1434,
        },
        "Valve_exhaust": {
            "index_offset": 420939,
            "index_count": 3237,
            "line_index_offset": 424176,
            "line_index_count": 4164,
        },
        "Valve_retainer_lines": {
            "index_offset": 428340,
            "index_count": 60,
            "line_index_offset": 428400,
            "line_index_count": 108,
        },
        "Valve_retainer": {
            "index_offset": 428508,
            "index_count": 1272,
            "line_index_offset": 429780,
            "line_index_count": 2262,
        },
        "Valve": {
            "index_offset": 432042,
            "index_count": 3351,
            "line_index_offset": 435393,
            "line_index_count": 4404,
        },
        "Arrow_gas": {
            "index_offset": 439797,
            "index_count": 528,
            "line_index_offset": 440325,
            "line_index_count": 0,
        },
        "cam_lobe": {
            "index_offset": 440325,
            "index_count": 1524,
            "line_index_offset": 441849,
            "line_index_count": 1536,
        },
        "cylinder": {
            "index_offset": 443385,
            "index_count": 1524,
            "line_index_offset": 444909,
            "line_index_count": 1536,
        },
        "small_cylinder": {
            "index_offset": 446445,
            "index_count": 276,
            "line_index_offset": 446721,
            "line_index_count": 288,
        },
    }



    let piston_diameter = 86;
    let piston_stroke = 86;
    let piston_height = 36;

    let crank_length = piston_stroke * 0.5;
    let rod_length = 142;
    let cylinder_distance = 104;
    let crankshaft_base_distance = -221.5;
    let spring_length = 46.5;

    let main = 34;
    let rod = 30;
    let web = 20;

    let cam_lobe_n = 256;
    let cam_lobe_lift = [];
    let cam_max_lift = 9;
    let cam_r = 14.915;
    let cam_width = 16;

    let valve_distance = 36;

    let cam_f = function(a) {

        let l0 = (-40 / 2 + 45) * Math.PI / 180;
        let l1 = (220 / 2 + 45) * Math.PI / 180;
        let t = saturate(sharp_step(l0, l1, a));
        t = t < 0.5 ? t * 2 : 2 * (1 - t);
        let nt = 1 - t;
        let p = 0.01 * 5 * nt * nt * nt * nt * t + 0.16 * 10 * nt * nt * nt * t * t + 0.12 * 10 * nt * nt * t * t * t + 5 * nt * t * t * t * t + t * t * t * t * t;

        return p;
    }

    for (let k = 0; k < cam_lobe_n; k++) {
        let base_a = Math.PI * 2 * k / cam_lobe_n;

        let y_min = Infinity;
        let n = 256;
        for (let i = 0; i < n; i++) {
            let a = Math.PI * (2 * i / n);

            let s = cam_f(a) * cam_max_lift;

            let y = (cam_r + s) * Math.sin(a + base_a) + cam_r;
            y_min = Math.min(y, y_min);
        }
        cam_lobe_lift.push(y_min);
    }

    cam_lobe_lift.push(cam_lobe_lift[0]);
    cam_lobe_lift.push(cam_lobe_lift[1]);



    /* TDC exhaust = 0 */

    function cam_lift(cam_angle) {
        let f = (((cam_angle / (2 * Math.PI)) + 2) % 1) * cam_lobe_n;
        let i = Math.floor(f);
        return lerp(cam_lobe_lift[i], cam_lobe_lift[i + 1], f - i);
    }

    function intake_lobe_angle(cylinder_phase_angle) {
        return -(cylinder_phase_angle * 0.5 - 30 * Math.PI / 180 - Math.PI * 0.5);
    }

    function exhaust_lobe_angle(cylinder_phase_angle) {
        return -(cylinder_phase_angle * 0.5 - 50 * Math.PI / 180 - Math.PI * 1.);
    }

    //[2,3,1, 0];
    let cylinder_order = [3, 2, 0, 1];

    function valve_offsets(crank_angle) {
        let offsets = [];
        for (let i = 0; i < 4; i++) {
            let cylinder_phase_angle = (crank_angle + cylinder_order[i] * Math.PI);
            offsets.push(cam_lift(intake_lobe_angle(cylinder_phase_angle)));
            offsets.push(cam_lift(exhaust_lobe_angle(cylinder_phase_angle)));
        }

        return offsets;
    }


    let pressure_f = function(a) {

        a *= 0.5;

        return 0.02 +
            0.74 * Math.pow(Math.cos(a - 0.15) * 0.5 + 0.5, 50) +
            0.20 * Math.pow(Math.cos(a - 0.2) * 0.5 + 0.5, 7) +
            0.05 * Math.pow(Math.cos(a - 1.9) * 0.5 + 0.5, 1) +
            0.015 * Math.pow(Math.cos(a - 1.7) * 0.5 + 0.5, 1) -
            0.02 * Math.pow(Math.cos(a - 3.5) * 0.5 + 0.5, 10) +
            0.02 * Math.pow(Math.cos(a - 0.7) * 0.5 + 0.5, 20) +
            0.01 * Math.pow(Math.cos(a - 2.9) * 0.5 + 0.5, 20);
    }


    let spark_time = 0.8653846154;



    function GLDrawer(scale, ready_callback) {

        let canvas = document.createElement("canvas");
        
        this.canvas = canvas;
        let gl = canvas.getContext('experimental-webgl', { antialias: true });

        var viewport_x = 0;
        var viewport_y = 0;
        var viewport_w = 0;
        var viewport_h = 0;

        let basic_vertex_buffer = gl.createBuffer();
        let basic_index_buffer = gl.createBuffer();

        let vertex_buffer = gl.createBuffer();
        let index_buffer = gl.createBuffer();


        let point_buffer = gl.createBuffer();

        let point_buffer_n = 1024;

        let has_vertices = false;
        let has_indicies = false;

        var ext = gl.getExtension('OES_element_index_uint');
        let vao_ext = gl.getExtension('OES_vertex_array_object');


        function mark_ready() {
            if (has_vertices && has_indicies) {
                ready_callback();
            }
        }

        download_file("/ciechanow.ski_ice_injector/internal-combustion-engine/models/ice_vertices.dat", function(buffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffer), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            has_vertices = true;
            mark_ready();
        });

        download_file("/ciechanow.ski_ice_injector/internal-combustion-engine/models/ice_indices.dat", function(buffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(buffer), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            has_indicies = true;
            mark_ready();
        });


        let spring_index_count = 0;
        let cylinder_offset = 0;
        let cylinder_count = 0;

        function gen_basic_geometry() {
            let n = 20;
            let l = 256;

            let vertices = [];
            let indices = [];
            for (let i = 0; i < n; i++) {
                let a = i * Math.PI * 2 / n;
                let x = Math.sin(a);
                let y = Math.cos(a);

                for (let k = 0; k < l; k++) {
                    vertices.push(x);
                    vertices.push(y);
                    vertices.push(k / (l - 1));
                    vertices.push(x);
                    vertices.push(y);
                    vertices.push(0);
                }
            }

            for (let i = 0; i < n; i++) {
                for (let k = 0; k < l; k++) {
                    indices.push(i * l + k);
                    indices.push(((i + 1) % n) * l + k);
                }


                indices.push(((i + 1) % n) * l + l - 1);
                indices.push(((i + 1) % n) * l + 0);


            }

            spring_index_count = indices.length;
            cylinder_offset = spring_index_count;
            let vc = vertices.length / 6;

            for (let i = 0; i < l; i++) {
                let a = i * Math.PI * 2 / l;
                let x = Math.sin(a);
                let y = Math.cos(a);


                vertices.push(x);
                vertices.push(y);
                vertices.push(0);
                vertices.push(x);
                vertices.push(y);
                vertices.push(0);

                vertices.push(x);
                vertices.push(y);
                vertices.push(1);
                vertices.push(x);
                vertices.push(y);
                vertices.push(0);
            }


            for (let i = 0; i < l; i++) {

                indices.push(vc + i * 2);
                indices.push(vc + i * 2 + 1);
                indices.push(vc + (i * 2 + 2) % (2 * l));
                indices.push(vc + (i * 2 + 3) % (2 * l));
                indices.push(vc + (i * 2 + 2) % (2 * l));
                indices.push(vc + i * 2 + 1);
            }

            cylinder_count = indices.length - cylinder_offset;

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);


            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


            let point_arr = new Float32Array(point_buffer_n);

            for (let i = 0; i < point_buffer_n; i++) {
                point_arr[i] = i / (point_buffer_n - 1);
            }


            gl.bindBuffer(gl.ARRAY_BUFFER, point_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, point_arr, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        gen_basic_geometry();





        let base_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;

        uniform mat4 m_mvp;
        uniform mat3 m_rot;

        varying vec3 n_dir;
        varying vec3 model_pos;

        void main(void) {
            vec3 pos = v_position;
            model_pos = pos;
            n_dir = m_rot * v_normal;
            gl_Position = m_mvp * vec4(pos, 1.0);
        }
        `;

        let ring_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;

        uniform vec2 stretch;
        uniform mat4 m_mvp;
        uniform mat3 m_rot;

        varying vec3 n_dir;
        varying vec3 model_pos;

        void main(void) {
            vec3 pos = v_position;

            vec2 dir = normalize (pos.xz);

            float a = atan(-pos.x, -pos.z);
            a *= stretch.x;

            pos.xz += stretch.y * dir;

            float c = cos(a);
            float s = sin(a);

            vec2 p = pos.xz;

            pos.x = p.x * c - p.y * s;
            pos.z = p.x * s + p.y * c;
            
            
            model_pos = pos;
            n_dir = m_rot * v_normal;
            gl_Position = m_mvp * vec4(pos, 1.0);
        }
        `;


        let color_frag_src =
            `
            precision mediump float;

            varying vec3 n_dir;
            varying vec3 model_pos;

            uniform vec4 color;

            void main(void) {
                
                vec4 c = color;
                c.rgb *= (0.75 + 0.25 * max(0.0, n_dir.z));
                gl_FragColor = c;
            }
    `;


        let flat_frag_src =
            `
    precision mediump float;

    varying vec3 n_dir;
    varying vec3 model_pos;

    uniform vec4 color;

    void main(void) {
        
        vec4 c = color;

        c.rgb *= (0.75 + 0.25 * max(0.0, n_dir.z));
        gl_FragColor = c;
    }
`;


        let oil_frag_src =
            `
        precision mediump float;

        varying vec3 n_dir;
        varying vec3 model_pos;

        uniform vec4 color;
        uniform float t;

        void main(void) {

        vec4 c = color;

        c *= 0.4 + 0.6*noise(model_pos*2.0 + 2.0 * noise(model_pos*10.0 + t*20.0));
        gl_FragColor = c;
        }
        `;




        let spiral_frag_src =
            `
        precision mediump float;

        varying vec3 n_dir;
        varying vec3 model_pos;

        void main(void) {

            float r = length(model_pos.xy);
            float a = atan(model_pos.y, model_pos.x);

            float h0 = smoothstep(-0.2, 0.2, sin(20.0*r + a));
            float h1 = smoothstep(-0.2, 0.2, 10.0*sin(a*4.0));
            float h = mix(h1, h0, model_pos.z);
            h *= 1.0 - smoothstep(0.9, 0.92, r);
            h = 0.1 + 0.85*h;
            h *= (0.75 + 0.25 * max(0.0, n_dir.z));

            vec4 c = vec4(h, h, h, 1);

            gl_FragColor = c;
        }
        `;

        let cross_frag_src =
            `
    precision mediump float;

    varying vec3 n_dir;
    varying vec3 model_pos;

    uniform vec4 color;
    uniform vec4 cross_section_plane;
    uniform vec3 cross_section_param;

    void main(void) {
        
        vec4 c = color;

        if (dot(model_pos, cross_section_plane.xyz) < cross_section_plane.w) {

            float t = dot(model_pos, cross_section_param);
            c.rgb *= 0.85 + 0.2 * max(0.0, min(1.0, 5.0*sin(t*10.0)));
        }
        c.rgb *= (0.75 + 0.25 * max(0.0, n_dir.z));
        gl_FragColor = c;
    }
`;


        // left/right encoded in normal's length, which is either 1.0 or 2.0, scaling all components by 2
        // keeps the mantissa intact, so we're not losing any precision
        let line_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;

        uniform mat4 m_mvp;
        uniform vec4 line_p;

        varying float dist;

        void main(void) {

            vec3 normal = v_normal;

            float perp_sign = -1.0;

            if (dot(normal, normal) > 1.5) {
                perp_sign = 1.0;
                normal *= 0.5;
            }
            perp_sign *= line_p.w;

            dist = perp_sign;

            vec3 pos = v_position;

            vec4 position = m_mvp * vec4(pos + normal * line_p.x, 1.0);
            
            normal = (m_mvp * vec4(normal, 0.0)).xyz;
     
            vec2 ss_normal = normalize(normal.xy);

            float width = line_p.x;
            position.x += width * line_p.z * ss_normal.y * -perp_sign;
            position.y += width * ss_normal.x * perp_sign;
            position.z -= 0.0003;
            gl_Position = position;
        }
        `;

        let line_ring_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;


        uniform vec2 stretch;

        uniform mat4 m_mvp;
        uniform mat3 m_rot;
        uniform vec4 line_p;

        varying float dist;

        void main(void) {

            vec3 normal = v_normal;

            float perp_sign = -1.0;

            if (dot(normal, normal) > 1.5) {
                perp_sign = 1.0;
                normal *= 0.5;
            }
            perp_sign *= line_p.w;

            dist = perp_sign;

            vec3 pos = v_position;

            vec2 dir = normalize (pos.xz);

            float a = atan(-pos.x, -pos.z);
            a *= stretch.x;

            pos.xz += stretch.y * dir;

            float c = cos(a);
            float s = sin(a);

            vec2 p = pos.xz;

            pos.x = p.x * c - p.y * s;
            pos.z = p.x * s + p.y * c;

            vec4 position = m_mvp * vec4(pos + normal * line_p.x, 1.0);
            
            normal = (m_mvp * vec4(normal, 0.0)).xyz;
     
            vec2 ss_normal = normalize(normal.xy);

            float width = line_p.x;
            position.x += width * line_p.z * ss_normal.y * -perp_sign;
            position.y += width * ss_normal.x * perp_sign;
            position.z -= 0.0003;
            gl_Position = position;
        }
        `;


        let line_frag_src =
            `
            precision mediump float;

            varying float dist;

            uniform vec4 color;

            void main(void) {
            
                gl_FragColor = color;
            }
    `;


        let spring_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;

        uniform vec3 Rrl;
        uniform mat4 m_mvp;
        uniform mat3 m_rot;
        uniform vec2 spring_param;

        varying vec3 n_dir;
        varying vec3 model_pos;

        void main(void) {
            vec3 pos = v_position;
            float t = pos.z;
            float a = t*3.1415926*spring_param.x;

            float h = spring_param.y != 0.0 ? t*t*(3.0*(1.0-t) + t) : t;
            vec3 n = v_normal;
            n.xz = n.xy;
            n.y = cos(a)*n.x;
            n.x = sin(a)*n.x;

       
            pos.xz = pos.xy * Rrl.y;
            pos.x += Rrl.x;
            pos.y = cos(a)*pos.x;
            pos.x = sin(a)*pos.x;
            pos.z += h * (Rrl.z + Rrl.y) - Rrl.y*0.5;
            if (spring_param.y != 0.0) {
                pos.z = min(Rrl.z, pos.z);
                pos.z = max(0.0, pos.z);
            }
            model_pos = pos;
            n_dir = m_rot * n;
            gl_Position = m_mvp * vec4(pos, 1.0);
            
        }
        `;



        let flame_vert_src =
            `
        attribute vec3 v_position;

        uniform mat4 m_m;
        uniform mat4 m_mvp;

        varying vec3 model_pos;

        void main(void) {
            vec3 pos = v_position;
            model_pos = (m_m * vec4(v_position, 1.0)).xyz;
            gl_Position = m_mvp * vec4(v_position, 1.0);
        }
        `;

        let flame_pre_src = `     
         precision highp float;

        varying vec3 model_pos;

        uniform vec3 dir;
        uniform highp vec4 params;
        uniform vec4 pre_color;
        uniform vec4 post_color;
        uniform vec4 f0_color;
        uniform vec4 f1_color;`

        let noise_pre_src =
            `
        float hash (vec3 st) {
            return fract(sin(dot(st,
                                 vec3(13.54353, 83.8981, 342.875345)))
                         * 43758.5453123);
        }

        float noise(in vec3 x)
        {
            vec3 i = floor(x);
            vec3 f = x-i;
            
            return mix(mix(mix(hash(i+vec3(0,0,0)), 
                               hash(i+vec3(1,0,0)),f.x),
                           mix(hash(i+vec3(0,1,0)), 
                               hash(i+vec3(1,1,0)),f.x),f.y),
                       mix(mix(hash(i+vec3(0,0,1)), 
                               hash(i+vec3(1,0,1)),f.x),
                           mix(hash(i+vec3(0,1,1)), 
                               hash(i+vec3(1,1,1)),f.x),f.y),f.z);
        }
        `

        let flame_frag_src = `
        
        
        float f(vec3 p) {
            p.y += params.z;
            float h = params.z;
            float r = params.y;

            vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(r,h);
            return min(max(d.x,d.y),0.0) + length(max(d,0.0));
        }

        float f2(vec3 p, float k) {

    
            p.y += params.w * 0.5;
            return length(p)-(k*0.2 + 0.8)*params.w;
        }
     

        void main(void) {
            
            
            vec3 pos = model_pos;

            float a = 0.0;
            float r = 0.0;
            float post = 0.0;
        
            float t = params.x;
            float ys =  30.0/params.z;

            for (int i = 0; i < 5; i++) {
                float dist = f(pos);
                float p = 1.0 - smoothstep(-STEP*0.5, STEP * 0.5, dist);
                float k = noise(pos*(0.3)*vec3(1.0, ys, 1.0) + 10.0*p*noise(pos*(0.2) + t));
                if (dist < STEP * 0.5) {            
                    a += p*k * min(1.0, 1.0 - dist * (1.0 / STEP));
                }                
                
                dist = f2(pos, k);

                if (dist < 0.0) {
                    r += 0.2 * min(1.0, 1.0 - dist * (1.0 / STEP));
                    post = 1.0;
                }

                pos += dir;
            }
     
            r = r > 0.0 ? 1.0 -r : 0.0;

            vec4 c = a*mix(pre_color, post_color, post);
     
            c += f0_color * smoothstep(0.8, 0.9, r);
            c += f1_color * smoothstep(0.3, 0.7, r);
            
            gl_FragColor = c;
        }
        `;


        let complex_flame_vert_src =
            `
        attribute vec3 v_position;

        uniform vec4 params;
        uniform mat4 m_m;
        uniform mat4 m_mvp;

        varying vec3 model_pos;
        varying vec3 vert_params;

        void main(void) {
            vec3 pos = v_position;
            if (pos.z <= -0.5) {
                pos.z -= params.z*2.0;
            }
            vert_params.x = 100.0/(params.z + 20.0);
            vert_params.y = params.z + 15.0;
            vert_params.z = params.w * 0.5 - 15.0;
            model_pos = (m_m * vec4(pos, 1.0)).xyz;
            model_pos.x -= 3.0;
            gl_Position = m_mvp * vec4(pos, 1.0);
        }
        `;

        let complex_flame_frag_src = `
        
        varying vec3 vert_params;

        float f(vec3 p) {
            p.z += params.z;
            float h = vert_params.y;
            float r = params.y;

            vec2 d = abs(vec2(length(p.xy),p.z)) - vec2(r,h);
            return min(max(d.x,d.y),0.0) + length(max(d,0.0));
        }

        float f2(vec3 p, float k) {

            p.z += vert_params.z;
            return length(p)-(k*0.2 + 0.8)*params.w;
        }
     

        void main(void) {
            
            
            vec3 pos = model_pos;

            float a = 0.0;
            float r = 0.0;
            float post = 0.0;
        
            float t = params.x;
            float ys = vert_params.x;

            for (int i = 0; i < 5; i++) {
                float dist = f(pos);
                float p = 1.0 - smoothstep(-STEP*0.5, STEP * 0.5, dist);
                float k = noise(pos*(0.3)*vec3(1.0, 1.0, ys) + 10.0*p*noise(pos*(0.3) + t));
                if (dist < STEP * 0.5) {            
                    a += p*k * min(1.0, 1.0 - dist * (1.0 / STEP));
                }                
                
                dist = f2(pos, k);

                if (dist < 0.0) {
                    r += min(1.0, 1.0 - dist * (1.0 / STEP));
                    post = 1.0;
                }

                pos += dir;
            }
     
            r = r > 0.0 ? 1.0 - r*0.2 : 0.0;

            vec4 c = a*mix(pre_color, post_color, post);
     
            c += f0_color * smoothstep(0.8, 0.9, r);
            c += f1_color * smoothstep(0.3, 0.7, r);
            
            gl_FragColor = c;
        }
        `;


        let point_vert_src =
            `
        attribute float point_t;
        uniform mat4 m_mvp;
        uniform float t;

        varying mediump vec4 color;

        float hash(float n)
        {
            return fract(sin(n) * 43758.5453);
        }

        void main(void) {
            float tt = (point_t - 1.0) + t;
            tt = max(0.0, min(1.0, tt*2.0));

            float h = hash(point_t);
            float r = tt * 2.5 * (1.0 + h*5.0) + 0.5;
            float x = r*cos(h*30.0);
            float y = r*sin(h*30.0);
            float z = -tt * (40.0 + h*15.0);

            gl_Position = m_mvp * vec4(x, y, z, 1.0);
            color = vec4(236.0/255.0, 163.0/255.0, 48.0/255.0, 1.0) * (1.0 - tt);

            gl_PointSize = tt == 0.0 ? 0.0 : (1.0 + tt * 10.0);
        }
        `;

        let point_frag_src =
            `
        varying mediump vec4 color;
        precision mediump float;

        void main(void) {
            mediump vec2 xy = (gl_PointCoord - 0.5);
            mediump float d = dot(xy, xy);
            mediump float a = 1.0 - smoothstep(0.0, 0.25, d);

            gl_FragColor = color * a;
        }
        `;



        let cross_shader = new Shader(gl,
            base_vert_src,
            cross_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "cross_section_plane", "cross_section_param"]);


        let flat_shader = new Shader(gl,
            base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color"]);

        let oil_shader = new Shader(gl,
            base_vert_src,
            "precision highp float;\n" + noise_pre_src + oil_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "t"]);

        let spiral_shader = new Shader(gl,
            base_vert_src,
            spiral_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot"]);

        let flame_shader = new Shader(gl,
            flame_vert_src,
            "#define STEP " + march_step.toFixed(1) + "\n" + flame_pre_src + noise_pre_src + flame_frag_src, ["v_position"], ["m_m", "m_mvp", "m_rot", "dir", "params", "pre_color", "post_color", "f0_color", "f1_color"]);

        let complex_flame_shader = new Shader(gl,
            complex_flame_vert_src,
            "#define STEP " + march_step.toFixed(1) + "\n" + flame_pre_src + noise_pre_src + complex_flame_frag_src, ["v_position"], ["m_m", "m_mvp", "m_rot", "dir", "params", "pre_color", "post_color", "f0_color", "f1_color"]);





        let line_shader = new Shader(gl,
            line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_p", "color"]);

        let ring_shader = new Shader(gl,
            ring_vert_src,
            color_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "stretch"]);

        let line_ring_shader = new Shader(gl,
            line_ring_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "line_p", "color", "stretch"]);


        let spring_shader = new Shader(gl,
            spring_vert_src,
            color_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "Rrl", "spring_param"]);

        let point_shader = new Shader(gl,
            point_vert_src,
            point_frag_src, ["point_t"], ["m_mvp", "t"]);

        let mesh_cross_vao = vao_ext.createVertexArrayOES();
        vao_ext.bindVertexArrayOES(mesh_cross_vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.enableVertexAttribArray(cross_shader.attributes["v_position"]);
        gl.vertexAttribPointer(cross_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(cross_shader.attributes["v_normal"]);
        gl.vertexAttribPointer(cross_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);


        let mesh_flat_vao = vao_ext.createVertexArrayOES();
        vao_ext.bindVertexArrayOES(mesh_flat_vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.enableVertexAttribArray(cross_shader.attributes["v_position"]);
        gl.vertexAttribPointer(cross_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(cross_shader.attributes["v_normal"]);
        gl.vertexAttribPointer(cross_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);


        let mesh_line_vao = vao_ext.createVertexArrayOES();
        vao_ext.bindVertexArrayOES(mesh_line_vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.enableVertexAttribArray(line_shader.attributes["v_position"]);
        gl.vertexAttribPointer(line_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(line_shader.attributes["v_normal"]);
        gl.vertexAttribPointer(line_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

        let ring_vao = vao_ext.createVertexArrayOES();
        vao_ext.bindVertexArrayOES(ring_vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.enableVertexAttribArray(ring_shader.attributes["v_position"]);
        gl.vertexAttribPointer(ring_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(ring_shader.attributes["v_normal"]);
        gl.vertexAttribPointer(ring_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

        let ring_line_vao = vao_ext.createVertexArrayOES();
        vao_ext.bindVertexArrayOES(ring_line_vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.enableVertexAttribArray(line_ring_shader.attributes["v_position"]);
        gl.vertexAttribPointer(line_ring_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(line_ring_shader.attributes["v_normal"]);
        gl.vertexAttribPointer(line_ring_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);


        vao_ext.bindVertexArrayOES(null);

        let prev_width, prev_height;

        this.begin = function(width, height) {

            width *= scale;
            height *= scale;
            // width ="600";
            // height ="600";
            if (width != prev_width || height != prev_height) {
                canvas.width = width;
                canvas.height = height;
                prev_width = width;
                prev_height = height;
            }

            gl.viewport(0, 0, width, height);

            gl.disable(gl.BLEND);
            gl.depthMask(true);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.enable(gl.DEPTH_TEST);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            viewport_x = 0;
            viewport_y = 0;
            viewport_w = Math.round(width);
            viewport_h = Math.round(height);
        }

        this.viewport = function(x, y, w, h) {
            gl.viewport(x * scale, y * scale, w * scale, h * scale);

            viewport_x = Math.round(x * scale);
            viewport_y = Math.round(y * scale);
            viewport_w = Math.round(w * scale);
            viewport_h = Math.round(h * scale);
        }


        this.flush = function() {
            gl.flush();
        }


        this.draw_points = function(mvp, t) {

            gl.useProgram(point_shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, point_buffer);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.depthMask(false);
            gl.enableVertexAttribArray(point_shader.attributes["point_t"]);
            gl.vertexAttribPointer(point_shader.attributes["point_t"], 1, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(point_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));

            gl.uniform1f(point_shader.uniforms["t"], t);

            gl.drawArrays(gl.POINTS, 0, point_buffer_n);

        }


        this.draw_spring = function(R, r, l, mvp, rotation, color, opacity, param) {

            if (opacity === undefined)
                opacity = 1.0;

            if (!param)
                param = [18, 1.0];


            if (opacity == 1.0) {
                gl.disable(gl.BLEND);
                gl.depthMask(true);

            } else {
                gl.enable(gl.BLEND);
                gl.depthMask(false);
            }

            gl.disable(gl.CULL_FACE);


            gl.useProgram(spring_shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.enableVertexAttribArray(spring_shader.attributes["v_position"]);
            gl.vertexAttribPointer(spring_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(spring_shader.attributes["v_normal"]);
            gl.vertexAttribPointer(spring_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(spring_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(spring_shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(spring_shader.uniforms["color"], vec_scale(color, opacity));
            gl.uniform3fv(spring_shader.uniforms["Rrl"], [R, r, l]);
            gl.uniform2fv(spring_shader.uniforms["spring_param"], param);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.drawElements(gl.TRIANGLE_STRIP, spring_index_count, gl.UNSIGNED_INT, 0);

        }


        this.draw_oil = function(mvp, rotation, color, opacity, half, t) {

            if (opacity === undefined)
                opacity = 1.0;


            if (opacity == 1.0) {
                gl.disable(gl.BLEND);
                gl.depthMask(true);

            } else {
                gl.enable(gl.BLEND);
                gl.depthMask(false);
            }
            color = vec_scale(color, opacity);

            gl.disable(gl.CULL_FACE);


            gl.useProgram(oil_shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.enableVertexAttribArray(oil_shader.attributes["v_position"]);
            gl.vertexAttribPointer(oil_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(oil_shader.attributes["v_normal"]);
            gl.vertexAttribPointer(oil_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);

            gl.uniformMatrix4fv(oil_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(oil_shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(oil_shader.uniforms["color"], color);
            gl.uniform1f(oil_shader.uniforms["t"], t);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.drawElements(gl.TRIANGLES, half ? cylinder_count / 2 : cylinder_count, gl.UNSIGNED_INT, cylinder_offset * 4);

        }

        this.draw_spiral = function(mvp, rotation) {

            line_arg = [2 / viewport_h, 0.01];

            line_arg.push(viewport_h / viewport_w);
            line_arg.push(1);

            gl.disable(gl.BLEND);
            gl.depthMask(true);

            let mesh = models["cylinder"];

            let shader = spiral_shader;

            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);

            gl.useProgram(shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

            gl.enableVertexAttribArray(shader.attributes["v_position"]);
            gl.vertexAttribPointer(shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(shader.attributes["v_normal"]);
            gl.vertexAttribPointer(shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));


            gl.drawElements(gl.TRIANGLES, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4);


            gl.useProgram(line_shader.shader);
            vao_ext.bindVertexArrayOES(mesh_line_vao);

            gl.uniformMatrix4fv(line_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniform4fv(line_shader.uniforms["line_p"], line_arg);

            gl.uniform4fv(line_shader.uniforms["color"], [0.5, 0.5, 0.5, 1.0]);

            gl.drawElements(gl.TRIANGLES, mesh.line_index_count, gl.UNSIGNED_INT, mesh.line_index_offset * 4);
            vao_ext.bindVertexArrayOES(null);
        }

        this.draw_mesh = function(name, mvp, rotation, color, opacity, backface, cross_section, line_arg, line_dim, skip_line) {

            if (opacity === undefined)
                opacity = 1.0;

            if (line_arg === undefined)
                line_arg = [2 / viewport_h, 0.01];

            line_arg.push(viewport_h / viewport_w);
            line_arg.push(backface ? -1 : 1);

            if (line_dim === undefined)
                line_dim = 0.6;

            if (opacity == 1.0) {
                gl.disable(gl.BLEND);
                gl.depthMask(true);

            } else {
                gl.enable(gl.BLEND);
                gl.depthMask(false);
            }

            if (cross_section === true)
                cross_section = [
                    [1, 0, 0, 0.01],
                    [0.01, 0.01, 0.0]
                ];

            let mesh = models[name];

            let shader = cross_section ? cross_shader : flat_shader;

            color = vec_scale(color, opacity);
            gl.enable(gl.CULL_FACE);
            gl.cullFace(backface ? gl.FRONT : gl.BACK);

            gl.useProgram(shader.shader);

            vao_ext.bindVertexArrayOES(cross_section ? mesh_cross_vao : mesh_flat_vao);

            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(shader.uniforms["color"], color);

            if (cross_section) {
                gl.uniform4fv(shader.uniforms["cross_section_plane"], cross_section[0]);
                gl.uniform3fv(shader.uniforms["cross_section_param"], cross_section[1]);
            }


            gl.drawElements(gl.TRIANGLES, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4);

            if (skip_line)
                return;

            color[0] *= line_dim;
            color[1] *= line_dim;
            color[2] *= line_dim;

            gl.useProgram(line_shader.shader);
            vao_ext.bindVertexArrayOES(mesh_line_vao);

            gl.uniformMatrix4fv(line_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniform4fv(line_shader.uniforms["line_p"], line_arg);

            gl.uniform4fv(line_shader.uniforms["color"], color);

            gl.drawElements(gl.TRIANGLES, mesh.line_index_count, gl.UNSIGNED_INT, mesh.line_index_offset * 4);
            vao_ext.bindVertexArrayOES(null);
        }

        this.draw_ring_mesh = function(name, mvp, rotation, color, opacity, stretch) {

            if (opacity === undefined)
                opacity = 1.0;

            if (stretch == undefined)
                stretch = [0, 0];

            let line_arg = [2 / viewport_h, 0.01];

            line_arg.push(viewport_h / viewport_w);
            line_arg.push(1);


            if (opacity == 1.0) {
                gl.disable(gl.BLEND);
                gl.depthMask(true);

            } else {
                gl.enable(gl.BLEND);
                gl.depthMask(false);
            }

            color = vec_scale(color, opacity);

            let mesh = models[name];

            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);

            gl.useProgram(ring_shader.shader);

            vao_ext.bindVertexArrayOES(ring_vao);

            gl.uniformMatrix4fv(ring_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(ring_shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(ring_shader.uniforms["color"], color);
            gl.uniform2fv(ring_shader.uniforms["stretch"], stretch);


            gl.drawElements(gl.TRIANGLES, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4);


            let dim = 0.5;

            color[0] *= dim;
            color[1] *= dim;
            color[2] *= dim;

            gl.useProgram(line_ring_shader.shader);
            vao_ext.bindVertexArrayOES(ring_line_vao);

            gl.uniformMatrix4fv(line_ring_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(line_ring_shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(line_ring_shader.uniforms["color"], color);
            gl.uniform2fv(line_ring_shader.uniforms["stretch"], stretch);
            gl.uniform4fv(line_ring_shader.uniforms["line_p"], line_arg);



            gl.drawElements(gl.TRIANGLES, mesh.line_index_count, gl.UNSIGNED_INT, mesh.line_index_offset * 4);

            vao_ext.bindVertexArrayOES(null);

        }

        this.draw_flame = function(m, mvp, dir, params, pre_color, post_color, f0_color, f1_color, complex) {

            gl.enable(gl.BLEND);
            gl.depthMask(false);



            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);

            let shader = complex ? complex_flame_shader : flame_shader;

            gl.useProgram(shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
            gl.enableVertexAttribArray(shader.attributes["v_position"]);
            gl.vertexAttribPointer(shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);

            gl.uniformMatrix4fv(shader.uniforms["m_m"], false, mat4_transpose(m));
            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));

            gl.uniform3fv(shader.uniforms["dir"], vec_scale(dir, march_step));

            gl.uniform4fv(shader.uniforms["params"], params);
            gl.uniform4fv(shader.uniforms["pre_color"], pre_color);
            gl.uniform4fv(shader.uniforms["post_color"], post_color);
            gl.uniform4fv(shader.uniforms["f0_color"], f0_color);
            gl.uniform4fv(shader.uniforms["f1_color"], f1_color);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

            if (complex) {

                let mesh = models["Chamber_top"];
                gl.drawElements(gl.TRIANGLES, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4);


            } else {
                let mesh = models["cylinder"];
                gl.drawElements(gl.TRIANGLES, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4);
            }

        }




        this.finish = function() {
            gl.flush();
            // gl.rotation(x+.01)
            return gl.canvas;
        }
    }




    let gl = new GLDrawer(scale, function() {
        models_ready = true;

        all_drawers.forEach(drawer => drawer.repaint())
    });

    function Drawer(container, mode) {
        
        let self = this;

        all_drawers.push(self);
        all_containers.push(container);
        container.drawer = this;
        
        let wrapper = document.createElement("div");
        wrapper.classList.add("canvas_container");
        wrapper.classList.add("non_selectable");

        let canvas = document.createElement("canvas");
        canvas.classList.add("non_selectable");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";


        var play = document.createElement("div");
        play.tabIndex=1
        play.classList.add("play_pause_button");
        play.classList.add("playing");

        wrapper.appendChild(canvas);

        container.appendChild(wrapper);

        this.paused = true;
        this.requested_repaint = false;

        this.set_paused = function(p) {
            self.paused = p;
            if (self.paused) {
                play.classList.remove("playing");
            } else {
                play.classList.add("playing");
                window.requestAnimationFrame(tick);

            }
        }
        let t = 0;
        let prev_timestamp;

        function tick(timestamp) {
            
            var rect = canvas.getBoundingClientRect();

            var wh = window.innerHeight || document.documentElement.clientHeight;
            var ww = window.innerWidth || document.documentElement.clientWidth;
            if (!(rect.top > wh || rect.bottom < 0 || rect.left > ww || rect.right < 0)) {

                let dt = 0;
                if (prev_timestamp)
                    dt = (timestamp - prev_timestamp) / 1000;

                t += dt;

                self.repaint();
            }
            prev_timestamp = timestamp;

            if (self.paused)
                prev_timestamp = undefined;
            else
                window.requestAnimationFrame(tick);
        }

        play.onclick = function() {
            self.set_paused(!self.paused);
        }

        // animated
        if ( mode === "injector") {
            this.paused = false;
            wrapper.appendChild(play);
            window.requestAnimationFrame(tick);
        }

        let width, height;

        let rot = ident_matrix.slice();
        rot = mat3_mul(rot_x_mat3(-0.4), rot_y_mat3(Math.PI));
        rot = mat3_mul(rot_y_mat3(0.4), rot);

        if (mode === "injector") {
            rot = mat3_mul(rot_x_mat3(-Math.PI * 0.7), rot_y_mat3(1.8 * Math.PI));
        }

        let arcball = new ArcBall(rot, function() {
            rot = arcball.matrix.slice();
            request_repaint();
        });
        let no_drag =false

        function canvas_space(e) {
            let r = canvas.getBoundingClientRect();
            return [width - (e.clientX - r.left), (e.clientY - r.top)];
        }

        function request_repaint() {
            if (self.paused && !self.requested_repaint) {
                self.requested_repaint = true;
                window.requestAnimationFrame(function() {
                    self.repaint();
                });
            }
        }
        
        this.set_visible = function(x) {
            this.visible = x;
            if (x && !this.was_drawn)
                request_repaint();
        }


        if (!no_drag) {
            container.classList.add("move_cursor");

            new TouchHandler(canvas,

                function(e) {

                    let p = canvas_space(e);
                    arcball.start(p[0], p[1]);

                    return true;
                },
                function(e) {
                    let p = canvas_space(e);
                    arcball.update(p[0], p[1], e.timeStamp);
                    rot = arcball.matrix.slice();

                    request_repaint();


                    return true;
                },
                function(e) {
                    arcball.end(e.timeStamp);
                });
        }

        let load_text = false

        let arg0 = 0,
            arg1 = 0,
            arg2 = 0;


        this.get_arg0 = function() { return arg0; }
        this.set_arg0 = function(x) {
            arg0 = x;
            request_repaint();
        }
        this.set_arg1 = function(x) {
            arg1 = x;
            request_repaint();
        }
        this.set_arg2 = function(x) {
            arg2 = x;
            request_repaint();
        }

        this.set_rot = function(x) {
            rot = x;
            arcball.set_matrix(x);
            request_repaint();;
        }


        let aspect = width / height;

        let proj_w;
        let proj_h;

        let proj;


        this.on_resize = function() {
            let new_width = wrapper.clientWidth;
            let new_height = wrapper.clientHeight;

            if (new_width != width || new_height != height) {

                width = new_width;
                height = new_height;

                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvas.width = width * scale;
                canvas.height = height * scale;

                aspect = width / height;

                proj_w = 1500;
                proj_h = proj_w / aspect;

                proj = [1 / proj_w, 0, 0, 0,
                    0, 1 / proj_h, 0, 0,
                    0, 0, -0.00015, 0,
                    0, 0, 0, 1
                ]

                let pad = 5;
                let size = Math.max(width, height) - pad * 2;
                arcball.set_viewport(width / 2 - size / 2 + pad, height / 2 - size / 2 + pad, size, size);

                request_repaint();
            }
        }


        function rod_configuration(crank_angle) {

            crank_angle = crank_angle % (2 * Math.PI);
            let h = Math.sin(crank_angle) * crank_length;
            let dist0 = Math.cos(crank_angle) * crank_length;
            let dist1 = Math.sqrt(rod_length * rod_length - h * h);
            let d = dist0 + dist1;

            let angle = -Math.PI + Math.acos((d * d - rod_length * rod_length - crank_length * crank_length) / (-2 * rod_length * crank_length));

            if (crank_angle < 0 && crank_angle > -Math.PI)
                angle = -angle;

            return [angle, d];
        }


        this.repaint = function() {

            self.requested_repaint = false;

            if (!self.visible)
                return;

            if (width == 0 || height == 0)
                return;
            
            self.was_drawn = true;

            let ctx = canvas.getContext("2d");

            ctx.resetTransform();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(scale, scale);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            font_size = 21;

            if (window.innerWidth < 500)
                font_size = 18;

            if (window.innerWidth < 400)
                font_size = 16;

            ctx.font = font_size + "px IBM Plex Sans";
            ctx.textAlign = "center";
            ctx.globalAlpha = 1.0;

            if (!models_ready) {
                ctx.fillStyle = "#666";
                ctx.translate(width * 0.5, height * 0.5);
                ctx.fillText("Loading...", 0, 0);
                return;
            }
            


            function draw_stroke_labels(a) {

                a = ((-a / Math.PI + 3) % 4);

                let k = a % 1;
                let text_alpha = (smooth_step(0, 0.2, k) - smooth_step(0.8, 1, k));
                text = a < 1 ? "intake" : a < 2 ? "compression" : a < 3 ? "power" : "exhaust";

                ctx.globalAlpha = text_alpha;

                let w = ctx.measureText(text).width;
                ctx.fillStyle = "rgba(240,240,240,0.9)";
                ctx.roundRect(-w / 2 - font_size / 2, -font_size * 1.1, w + font_size, font_size * 1.6, 5);
                ctx.fill();

                ctx.fillStyle = "#333";
                ctx.fillText(text, 0, 0);
                ctx.globalAlpha = 1;
            }

            function draw_bolt(r, l, tl, mvp, rot, color, opacity, washer) {
                washer = false;
                if (!color)
                    color = gray_color;
                if (l != 0)
                    gl.draw_mesh("cylinder", mat4_mul(mvp, mat4_mul(scale_mat4([r, r, l]), translation_mat4([0, 0, -1]))), rot, color, opacity);
                if (washer)
                    gl.draw_mesh("cylinder", mat4_mul(mvp, mat4_mul(scale_mat4([r * 1.5, r * 1.5, 3]), translation_mat4([0, 0, 0]))), rot, color, opacity);
                gl.draw_mesh("Hex", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, washer ? 3 : 0]), scale_mat4([r * 1.4, r * 1.4, r * 1.2]))), rot, color, opacity);
            }

            function draw_crankshaft(mvp, normal, part, skip_mains, opacity, main_color, rod_color, web_color) {

                let end_color = gray_color;

                if (main_color && web_color && rod_color && main_color == web_color && web_color == rod_color)
                    end_color = main_color;

                if (!main_color)
                    main_color = gray_color;

                if (!rod_color)
                    rod_color = gray_color;

                if (!web_color)
                    web_color = gray_color;



                let y_flip_normal = normal.slice();
                y_flip_normal[1] *= -1;
                y_flip_normal[4] *= -1;
                y_flip_normal[7] *= -1;

                if (!opacity)
                    opacity = 1;

                let rot_normal = mat3_mul(normal, rot_y_mat3(Math.PI));

                let y_flip_rot_normal = mat3_mul(y_flip_normal, rot_y_mat3(Math.PI));

                let rot = rot_y_mat4(Math.PI);


                gl.draw_mesh("Crankshaft_flywheel_end", mat4_mul(mvp, translation_mat4([0, -main * 2.5 - 2 * rod - web * 4, 0])), normal, end_color, opacity);

                if (!skip_mains) {
                    gl.draw_mesh("cylinder", mat4_mul(mat4_mul(mvp, translation_mat4([0, -main * 1.5 - 2 * rod - web * 4, 0])), mat4_mul(rot_x_mat4(Math.PI * 0.5), scale_mat4([31, 31, main]))), mat3_mul(normal, rot_x_mat3(Math.PI * 0.5)), main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mvp, translation_mat4([0, -main * 2 - 2 * rod - web * 4, 0])), normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mat4_mul(mvp, translation_mat4([0, -main * 2 - 2 * rod - web * 4, 0])), y_flip_mat4), y_flip_normal, main_color, opacity, true);
                }
                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, mat4_mul(translation_mat4([0, -main * 1.5 - web * 4 - rod * 2, 0]), rot)), rot_normal, web_color, opacity);


                if (!part)
                    gl.draw_mesh("Crankshaft_rod_journal", mat4_mul(mvp, mat4_mul(translation_mat4([0, -4 * web - 2 * main - 2 * rod, 0]), rot)), rot_normal, rod_color, opacity);

                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, -main * 3 / 2 - rod - web * 2, 0]), rot), y_flip_mat4)), y_flip_rot_normal, web_color, opacity, true);
                if (!skip_mains) {

                    gl.draw_mesh("Crankshaft_main_journal", mat4_mul(mvp, translation_mat4([0, -main - rod - web * 2, 0])), normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mvp, translation_mat4([0, -main - rod - web * 2, 0])), normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mat4_mul(mvp, translation_mat4([0, -main - rod - web * 2, 0])), y_flip_mat4), y_flip_normal, main_color, opacity, true);
                }
                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, translation_mat4([0, -main * 0.5 - rod - web - web, 0])), normal, web_color, opacity);


                if (!part)
                    gl.draw_mesh("Crankshaft_rod_journal", mat4_mul(mvp, translation_mat4([0, -main - rod - web * 2, 0])), normal, rod_color, opacity);


                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, mat4_mul(translation_mat4([0, -main / 2, 0]), y_flip_mat4)), y_flip_normal, web_color, opacity, true);
                if (!skip_mains) {
                    gl.draw_mesh("Crankshaft_main_journal", mvp, normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mvp, normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mvp, y_flip_mat4), y_flip_normal, main_color, opacity, true);
                }
                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, translation_mat4([0, main / 2, 0])), normal, web_color, opacity);

                if (!part)
                    gl.draw_mesh("Crankshaft_rod_journal", mat4_mul(mvp, translation_mat4([0, 0, 0])), normal, rod_color, opacity);

                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, mat4_mul(translation_mat4([0, main / 2 + rod + web + web, 0]), y_flip_mat4)), y_flip_normal, web_color, opacity, true);
                if (!skip_mains) {

                    gl.draw_mesh("Crankshaft_main_journal", mat4_mul(mvp, translation_mat4([0, rod + web * 2 + main, 0])), normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mvp, translation_mat4([0, rod + web * 2 + main, 0])), normal, main_color, opacity);
                    gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mat4_mul(mvp, translation_mat4([0, rod + web * 2 + main, 0])), y_flip_mat4), y_flip_normal, main_color, opacity, true);
                }
                gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, mat4_mul(translation_mat4([0, main * 3 / 2 + web * 2 + rod, 0]), rot)), rot_normal, web_color, opacity);

                if (!part)
                    gl.draw_mesh("Crankshaft_rod_journal", mat4_mul(mvp, mat4_mul(translation_mat4([0, 2 * web + main + rod, 0]), rot)), rot_normal, rod_color, opacity);

                if (!part) {

                    gl.draw_mesh("Crankshaft_web", mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, main * 3 / 2 + rod * 2 + web * 4, 0]), rot), y_flip_mat4)), y_flip_rot_normal, web_color, opacity, true);
                    gl.draw_mesh("Crankshaft_main_journal", mat4_mul(mvp, translation_mat4([0, rod * 2 + web * 4 + main * 2, 0])), normal, main_color, opacity);
                    if (!skip_mains)
                        gl.draw_mesh("Crankshaft_main_journal_fillet", mat4_mul(mat4_mul(mvp, translation_mat4([0, rod * 2 + web * 4 + main * 2, 0])), y_flip_mat4), y_flip_normal, main_color, opacity, true);

                    gl.draw_mesh("Crankshaft_pulley_end", mat4_mul(mvp, translation_mat4([0, rod * 2 + web * 4 + main * 2.5, 0])), normal, end_color, opacity);

                }
            }


            function draw_injectors(crank_angle, view_projection, rot, skip, color) {

                let ang = -8 * Math.PI / 180;

                if (!color)
                    color = gray_color;

                for (let i = 0; i < 4; i++) {

                    if (skip && i != 0)
                        continue;

                    let cylinder_phase_angle = -((-Math.PI * 4 + crank_angle + cylinder_order[i] * Math.PI) % (Math.PI * 4));

                    let particle_t = (cylinder_phase_angle - Math.PI * 3.3) / 0.4;


                    let nrot = mat3_mul(rot, rot_y_mat3(ang));

                    let mat = mat4_mul(mat4_mul(view_projection, translation_mat4([-4.563, cylinder_distance * 1.5 - i * cylinder_distance, 0])),
                        mat4_mul(rot_y_mat4(ang), translation_mat4([0, 0, 47.054 - 33])));

                    gl.draw_mesh("Injector_outer", mat, nrot, color);



                    mat = mat4_mul(mat, y_flip_mat4);
                    nrot = mat3_mul(nrot, y_flip_mat3);
                    gl.draw_mesh("Injector_outer", mat, nrot, color, 1, true);

                    gl.draw_points(mat, particle_t);

                }
            }

            function draw_spark_plugs(crank_angle, view_projection, rot, skip, color) {

                let ang = 5 * Math.PI / 180;

                let insulator_color = color ? color : [0.95, 0.95, 0.95, 1];

                if (!color)
                    color = gray_color;


                for (let i = 0; i < 4; i++) {

                    if (skip && i != 0)
                        continue;

                    let cylinder_phase_angle = -((-Math.PI * 4 + crank_angle + cylinder_order[i] * Math.PI) % (Math.PI * 4));

                    let spark_alpha = step((3 + spark_time) * Math.PI, cylinder_phase_angle) -
                        step((3 + spark_time + 0.05) * Math.PI, cylinder_phase_angle);

                    let nrot = mat3_mul(rot, rot_y_mat3(ang));

                    let mat = mat4_mul(mat4_mul(view_projection, translation_mat4([2, cylinder_distance * 1.5 - i * cylinder_distance, 0])),
                        mat4_mul(rot_y_mat4(ang), translation_mat4([0, 0, 37 - 20])));

                    gl.draw_mesh("Spark_plug_electrode", mat, nrot, color);
                    gl.draw_mesh("Spark_plug_insulator", mat, nrot, insulator_color);
                    gl.draw_mesh("Spark_plug_shell", mat, nrot, color);


                    if (spark_alpha != 0) {

                        let h = (Math.sin(t * 342.875345) * 43758.5453123) % 1;

                        gl.draw_mesh("Spark_spark", mat4_mul(mat4_mul(mat, translation_mat4([0, 0, -2.25])),
                                mat4_mul(mat4_mul(rot_y_mat4(h * Math.PI * 2), rot_z_mat4(h * 1.4 * Math.PI * 2)), scale_mat4(2.6 + h * 0.2))),
                            rot, [0.5, 0.5, 1, 0.5], spark_alpha, false, false, undefined, 0, true);

                        gl.draw_mesh("Spark_spark", mat4_mul(mat4_mul(mat, translation_mat4([0, 0, -2.25])),
                                mat4_mul(mat4_mul(rot_y_mat4(h * Math.PI * 2 * 17), rot_z_mat4(h * 1.9 * Math.PI * 2)), scale_mat4(2.3 + h * 0.1))),
                            rot, [1, 1, 1, 0], spark_alpha, false, false, undefined, 0, true);
                    }

                    if (skip)
                        continue;

                    mat = mat4_mul(mat, y_flip_mat4);
                    nrot = mat3_mul(nrot, y_flip_mat3);
                    gl.draw_mesh("Spark_plug_electrode", mat, nrot, color, 1, true);
                    gl.draw_mesh("Spark_plug_insulator", mat, nrot, insulator_color, 1, true);
                    gl.draw_mesh("Spark_plug_shell", mat, nrot, color, 1, true);

                }
            }


            function draw_camshafts(crank_angle, view_projection, normal_rot, cross, color, one) {
                if (!color)
                    color = gray_color;

                for (let k = 0; k < (one ? 1 : 2); k++) {

                    let t = k == 0 ? 57.745 : -57.745;

                    let f = k == 0 ? intake_lobe_angle : exhaust_lobe_angle;
                    let da = k == 0 ? -20 * Math.PI / 180 : 20 * Math.PI / 180;

                    let knob_a = [0.3026315789473684, -0.3026315789473684];

                    for (let i = 0; i < 4; i++) {
                        let cylinder_phase_angle = (crank_angle + cylinder_order[i] * Math.PI);

                        let angle = f(cylinder_phase_angle) + da;
                        let mat = mat4_mul(
                            mat4_mul(translation_mat4([t, (i - 1.5) * cylinder_distance + cam_width * 0.5 - 18, 117.947]), rot_x_mat4(Math.PI * 0.5)),
                            rot_z_mat4(angle));
                        let n_mat = mat3_mul(normal_rot, mat3_mul(rot_x_mat3(Math.PI * 0.5), rot_z_mat3(angle)));

                        gl.draw_mesh("cam_lobe", mat4_mul(view_projection, mat), n_mat, color);
                        gl.draw_mesh("cam_lobe", mat4_mul(view_projection, mat4_mul(translation_mat4([0, valve_distance, 0]), mat)), n_mat, color);

                        let scale = scale_mat4([12, 12, valve_distance - cam_width]);

                        gl.draw_mesh("cylinder", mat4_mul(view_projection, mat4_mul(mat, mat4_mul(translation_mat4([0, 0, -valve_distance + cam_width]), scale))), n_mat, color);


                        scale = scale_mat4([10, 10, cylinder_distance - cam_width - valve_distance]);

                        if (i > 0)
                            gl.draw_mesh("cylinder", mat4_mul(view_projection, mat4_mul(mat, mat4_mul(translation_mat4([0, 0, cam_width]), scale))), n_mat, color);
                        else {
                            gl.draw_mesh("Gear_mount", mat4_mul(view_projection, mat4_mul(mat, mat4_mul(translation_mat4([00, 000, -834]), rot_x_mat4(-Math.PI * 0.5)))), mat3_mul(n_mat, rot_x_mat3(-Math.PI * 0.5)), color);

                            let scale = scale_mat4([2.0, 2.0, 4]);

                            gl.draw_mesh("cylinder", mat4_mul(view_projection, mat4_mul(mat, mat4_mul(translation_mat4([11 * Math.sin(knob_a[k]), 11 * Math.cos(knob_a[k]), -4 * cylinder_distance - 7]), scale))), n_mat, color);
                        }


                    }
                }
            }

            function draw_camshaft_caps(mvp, rot, one) {
                for (let i = 0; i < 4; i++) {
                    if (one && i != 3)
                        continue;

                    let l = one ? 27 : 0;
                    gl.draw_mesh("Camshaft_cap", mat4_mul(mvp, translation_mat4([0, (i - 1) * cylinder_distance, 0])), rot, gray_color);
                    draw_bolt(3, l, l, mat4_mul(mvp, translation_mat4([40.745, (i - 1.5) * cylinder_distance, 128.948])), rot);
                    draw_bolt(3, l, l, mat4_mul(mvp, translation_mat4([40.745 + 34, (i - 1.5) * cylinder_distance, 128.948])), rot);

                    gl.draw_mesh("Camshaft_cap", mat4_mul(mvp, translation_mat4([-115.49, (i - 1) * cylinder_distance, 0])), rot, gray_color);
                    draw_bolt(3, l, l, mat4_mul(mvp, translation_mat4([40.745 - 115.49, (i - 1.5) * cylinder_distance, 128.948])), rot);
                    draw_bolt(3, l, l, mat4_mul(mvp, translation_mat4([40.745 + 34 - 115.49, (i - 1.5) * cylinder_distance, 128.948])), rot);
                }
            }


            function draw_piston_rings(mvp, view_projection, rot, rod_c) {
                gl.draw_ring_mesh("Piston_ring", mvp, rot, gray_color, 1, [0, 0]);

                let model_matrix = translation_mat4([0, 0, -4.5]);
                model_matrix = mat4_mul(model_matrix, rot_x_mat4(Math.PI * 0.5));
                model_matrix = mat4_mul(translation_mat4([0, 0, rod_c[1]]), model_matrix);
                mvp = mat4_mul(view_projection, model_matrix);

                gl.draw_ring_mesh("Piston_ring", mvp, rot, gray_color, 1, [0, 0]);

                model_matrix = translation_mat4([0, 0, 0]);
                model_matrix = mat4_mul(model_matrix, rot_x_mat4(Math.PI * 0.5));
                model_matrix = mat4_mul(translation_mat4([0, 0, rod_c[1]]), model_matrix);
                mvp = mat4_mul(view_projection, model_matrix);

                let a = Math.PI * 0.5;
                gl.draw_ring_mesh("Piston_oil_ring", mvp, rot, gray_color);
                gl.draw_ring_mesh("Piston_oil_ring", mat4_mul(mvp, rot_y_mat4(-a)), mat3_mul(rot, rot_y_mat3(-a)), gray_color);
                gl.draw_ring_mesh("Piston_oil_ring", mat4_mul(mvp, rot_y_mat4(a)), mat3_mul(rot, rot_y_mat3(a)), gray_color);
                gl.draw_ring_mesh("Piston_oil_ring", mat4_mul(mvp, rot_y_mat4(2 * a)), mat3_mul(rot, rot_y_mat3(2 * a)), gray_color);

                let scale_mat = ident_mat4.slice();
                scale_mat[5] = 0.5;
                scale_mat[7] = 14.5;


                model_matrix = mat4_mul(rot_x_mat4(Math.PI * 0.5), scale_mat);
                model_matrix = mat4_mul(translation_mat4([0, 0, rod_c[1] - 6.5]), model_matrix);
                mvp = mat4_mul(view_projection, model_matrix);

                gl.draw_ring_mesh("Piston_ring", mvp, rot, gray_color);

                model_matrix = mat4_mul(rot_x_mat4(Math.PI * 0.5), scale_mat);
                model_matrix = mat4_mul(translation_mat4([0, 0, rod_c[1] - 9]), model_matrix);
                mvp = mat4_mul(view_projection, model_matrix);


                gl.draw_ring_mesh("Piston_ring", mvp, rot, gray_color);
            }


            function draw_piston(crank_angle, view_projection, normal_rot, rod_color, piston_color, skip_rings) {

                if (!rod_color)
                    rod_color = [0.8, 0.8, 0.8, 1];

                if (!piston_color)
                    piston_color = [0.8, 0.8, 0.8, 1];

                crank_angle = crank_angle % (Math.PI * 2);
                let rod_c = rod_configuration(crank_angle);

                let mvp;
                let model_matrix = rot_y_mat4(rod_c[0]);
                model_matrix = mat4_mul(translation_mat4([0, 0, crank_length]), model_matrix);
                model_matrix = mat4_mul(rot_y_mat4(crank_angle), model_matrix);

                normal_rot = mat3_mul(normal_rot, rot_y_mat3(crank_angle + rod_c[0]));

                mvp = mat4_mul(view_projection, model_matrix);

                gl.draw_mesh("Rod_top", mvp, normal_rot, rod_color);
                gl.draw_mesh("Rod_bottom", mvp, normal_rot, rod_color);
                draw_bolt(3.5, 0, 0, mat4_mul(mat4_mul(mvp, translation_mat4([33, 0, -24])), rot_x_mat4(Math.PI)), mat3_mul(normal_rot, rot_x_mat3(Math.PI)), gray_color, 1, true);
                draw_bolt(3.5, 0, 0, mat4_mul(mat4_mul(mvp, translation_mat4([-33, 0, -24])), rot_x_mat4(Math.PI)), mat3_mul(normal_rot, rot_x_mat3(Math.PI)), gray_color, 1, true);

                model_matrix = mat4_mul(model_matrix, x_flip_mat4);
                mvp = mat4_mul(view_projection, model_matrix);

                gl.draw_mesh("Rod_top", mvp, mat3_mul(normal_rot, x_flip_mat3), rod_color, 1, true);
                gl.draw_mesh("Rod_bottom", mvp, mat3_mul(normal_rot, x_flip_mat3), rod_color, 1, true);

                model_matrix = rot_x_mat4(Math.PI * 0.5);
                model_matrix = mat4_mul(translation_mat4([0, 0, rod_c[1]]), model_matrix);
                mvp = mat4_mul(view_projection, model_matrix);

                normal_rot = mat3_mul(rot, rot_x_mat3(Math.PI * 0.5));

                gl.draw_mesh("Piston", mvp, normal_rot, piston_color);
                gl.draw_mesh("Piston", mat4_mul(mvp, x_flip_mat4), mat3_mul(normal_rot, x_flip_mat3), piston_color, 1, true);



                if (!skip_rings) {

                    gl.draw_mesh("Piston_pin", mvp, normal_rot, piston_color);

                    gl.draw_mesh("Piston_clip", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 26.5]), rot_x_mat4(-Math.PI * 0.5))), mat3_mul(normal_rot, rot_x_mat3(-Math.PI * 0.5)), clip_color);
                    gl.draw_mesh("Piston_clip", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -26.5]), rot_x_mat4(-Math.PI * 0.5))), mat3_mul(normal_rot, rot_x_mat3(-Math.PI * 0.5)), clip_color);

                    gl.draw_mesh("Piston_clip", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 26.5]), mat4_mul(rot_x_mat4(-Math.PI * 0.5), rot_z_mat4(-Math.PI)))), mat3_mul(normal_rot, mat3_mul(rot_x_mat3(-Math.PI * 0.5), rot_z_mat3(-Math.PI))), clip_color);
                    gl.draw_mesh("Piston_clip", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -26.5]), mat4_mul(rot_x_mat4(-Math.PI * 0.5), rot_z_mat4(-Math.PI)))), mat3_mul(normal_rot, mat3_mul(rot_x_mat3(-Math.PI * 0.5), rot_z_mat3(-Math.PI))), clip_color);

                    draw_piston_rings(mvp, view_projection, rot, rod_c);

                }
            }

            function draw_flames(crank_angle, view_projection, rot, one) {
                let ct = 0;

                for (let ii = 0; ii < 4; ii++) {
                    if (one && ii != 3)
                        continue;

                    let i = view_projection[0] < 0.0 ? ii : 3 - ii;

                    let cylinder_phase_angle = (crank_angle + cylinder_order[i] * Math.PI);
                    let rod_c = rod_configuration(cylinder_phase_angle);
                    let cylinder_h = -crankshaft_base_distance - piston_height - rod_c[1];

                    let r = 0.0;

                    ct = (-cylinder_phase_angle / Math.PI + 4) % 4;
                    let sim_t = ct * 4.0;

                    let pre_color = vec_scale([66 / 255, 66 / 255, 66 / 255, 1.0], 0.17);
                    let post_color = [0.1, 0.1, 0.1, 0.25];
                    let air_color = vec_scale([66 / 255, 66 / 255, 66 / 255, 1.0], 0.17);

                    if (ct > 1.6 && ct < 3) {
                        let k = (ct - 1.6) / 1.3
                        r = k * k * 140;
                    }

                    let flame_a = 1.0 - smooth_step(1.6, 3.0, ct);
                    let arrow_a = 0.0;
                    let arrow_t = 95;
                    let arrow_color = vec_scale(air_color, 2);


                    if (ct < 1) {
                        pre_color = air_color;
                        pre_color = vec_scale(pre_color, ct);
                        arrow_a = 0.9 * (smooth_step(0, 0.2, ct) - smooth_step(0.8, 1, ct));

                    } else if (ct < 2) {
                        ct -= 1;

                        pre_color = vec_lerp(air_color, pre_color, smooth_step(0.3, 0.6, ct));

                        pre_color = vec_scale(pre_color, 1.0 + ct);

                    } else if (ct < 3) {
                        ct -= 2;
                        pre_color = vec_scale(pre_color, 1.0 + (1.0 - ct));
                    } else {
                        arrow_color = vec_scale(post_color, 1.5);
                        ct -= 3;
                        pre_color = vec_scale(post_color, 1.0 - (ct));
                        arrow_t = -148;
                        arrow_a = 0.9 * (smooth_step(0, 0.2, ct) - smooth_step(0.8, 1, ct));
                    }


                    let f0_color = vec_scale([0.96, 0.97, 0.95, 0.1], flame_a);
                    let f1_color = vec_scale([0.96, 0.57, 0.32, 0.1], flame_a);

                    let m = translation_mat4([0, cylinder_distance * 0.5, 0]);
                    mvp = mat4_mul(view_projection, translation_mat4([0, (i - 1) * cylinder_distance, 0]));
                    gl.draw_flame(m, mvp, mat3_mul_vec(mat3_transpose((rot)), [0, 0, -1]), [sim_t, piston_diameter * 0.5, cylinder_h * 0.5, r],
                        pre_color, post_color, f0_color, f1_color, true);

                    if (one) {


                        let sc = 0.7;
                        mvp = mat4_mul(mat4_mul(view_projection, translation_mat4([arrow_t, 0, 30])),
                            mat4_mul(rot_x_mat4(Math.PI * 0.5), scale_mat4([sc, sc, sc])));


                        if (arrow_a != 0)
                            gl.draw_mesh("Arrow", mvp, rot, arrow_color, arrow_a);
                    }
                }


            }




            function draw_timing(angle, view_projection, rot, use_color, magic) {

                let gear_mat;
                let gear_rot;

                let dist = 400 + 270;
                gear_mat = mat4_mul(mat4_mul(view_projection, translation_mat4([57.745, dist, 117.947])), rot_y_mat4(angle * 0.5 + 0.12631578947368421));
                gear_rot = mat3_mul(rot, rot_y_mat3(angle * 0.5));

                for (let i = 0; i < 4; i++) {
                    let mat = mat4_mul(gear_mat, (i & 1) ? z_flip_mat4 : ident_mat4);
                    mat = mat4_mul(mat, (i & 2) ? x_flip_mat4 : ident_mat4);
                    let rot = mat3_mul(gear_rot, (i & 1) ? z_flip_mat3 : ident_mat3);
                    rot = mat3_mul(rot, (i & 2) ? x_flip_mat3 : ident_mat3);

                    gl.draw_mesh("Timing_gear_big", mat, rot, use_color ? red_color : gray_color, 1, i == 1 || i == 2);
                }

                gear_mat = mat4_mul(mat4_mul(view_projection, translation_mat4([-57.745, dist, 117.947])), rot_y_mat4(angle * 0.5 + 0.031578947368421054));
                gear_rot = mat3_mul(rot, rot_y_mat3(angle * 0.5));

                for (let i = 0; i < 4; i++) {
                    let mat = mat4_mul(gear_mat, (i & 1) ? z_flip_mat4 : ident_mat4);
                    mat = mat4_mul(mat, (i & 2) ? x_flip_mat4 : ident_mat4);
                    let rot = mat3_mul(gear_rot, (i & 1) ? z_flip_mat3 : ident_mat3);
                    rot = mat3_mul(rot, (i & 2) ? x_flip_mat3 : ident_mat3);

                    gl.draw_mesh("Timing_gear_big", mat, rot, use_color ? red_color : gray_color, 1, i == 1 || i == 2);
                }

                gear_mat = mat4_mul(mat4_mul(view_projection, translation_mat4([0, dist, crankshaft_base_distance])), rot_y_mat4(angle));
                gear_rot = mat3_mul(rot, rot_y_mat3(angle));

                draw_bolt(4, 0, 0, mat4_mul(mat4_mul(view_projection, translation_mat4([-57.745, 260, 117.947])), mat4_mul(rot_y_mat4(angle * 0.5), rot_x_mat4(-Math.PI * 0.5))), mat3_mul(rot, mat3_mul(rot_y_mat3(angle * 0.5), rot_x_mat3(-Math.PI * 0.5))));
                draw_bolt(4, 0, 0, mat4_mul(mat4_mul(view_projection, translation_mat4([+57.745, 260, 117.947])), mat4_mul(rot_y_mat4(angle * 0.5), rot_x_mat4(-Math.PI * 0.5))), mat3_mul(rot, mat3_mul(rot_y_mat3(angle * 0.5), rot_x_mat3(-Math.PI * 0.5))));

                for (let i = 0; i < 4; i++) {
                    let mat = mat4_mul(gear_mat, (i & 1) ? z_flip_mat4 : ident_mat4);
                    mat = mat4_mul(mat, (i & 2) ? x_flip_mat4 : ident_mat4);
                    let rot = mat3_mul(gear_rot, (i & 1) ? z_flip_mat3 : ident_mat3);
                    rot = mat3_mul(rot, (i & 2) ? x_flip_mat3 : ident_mat3);

                    gl.draw_mesh("Timing_gear_small", mat, rot, use_color ? green_color : gray_color, 1, i == 1 || i == 2);
                }


                gl.draw_mesh("Timing_belt", mat4_mul(view_projection, translation_mat4([0, dist, 0])), rot, use_color ? blue_color : gray_color);
                gl.draw_mesh("Timing_belt", mat4_mul(mat4_mul(view_projection, translation_mat4([0, dist, 0])), x_flip_mat4), mat3_mul(rot, x_flip_mat3), use_color ? blue_color : gray_color, 1, true);

                if (magic != 3) {
                    gl.draw_mesh("cylinder", mat4_mul(mat4_mul(view_projection, translation_mat4([42, 250, -61.253])), mat4_mul(rot_x_mat4(-Math.PI * 0.5), scale_mat4([19.5, 19.5, 26]))), mat3_mul(rot, rot_x_mat3(-Math.PI * 0.5)), use_color ? dark_gray_color : gray_color);
                    gl.draw_mesh("cylinder", mat4_mul(mat4_mul(view_projection, translation_mat4([42, 232, -61.253])), mat4_mul(rot_x_mat4(-Math.PI * 0.5), scale_mat4([10, 10, 18]))), mat3_mul(rot, rot_x_mat3(-Math.PI * 0.5)), use_color ? dark_gray_color : gray_color);

                    gl.draw_mesh("cylinder", mat4_mul(mat4_mul(view_projection, translation_mat4([-42, 250, -61.253])), mat4_mul(rot_x_mat4(-Math.PI * 0.5), scale_mat4([19.5, 19.5, 26]))), mat3_mul(rot, rot_x_mat3(-Math.PI * 0.5)), use_color ? dark_gray_color : gray_color);
                    gl.draw_mesh("cylinder", mat4_mul(mat4_mul(view_projection, translation_mat4([-42, 232, -61.253])), mat4_mul(rot_x_mat4(-Math.PI * 0.5), scale_mat4([10, 10, 18]))), mat3_mul(rot, rot_x_mat3(-Math.PI * 0.5)), use_color ? dark_gray_color : gray_color);

                }

                let small_angle = Math.PI * 25.182 / 180;
                let l0 = 40 * Math.PI * 0.25;
                let l1 = 160.247;
                let l2 = 22 * small_angle;
                let l3 = 168.868
                let l4 = 40 * (small_angle + Math.PI * 0.5);
                let l5 = 57.745;
                let ll = l0 + l1 + l2 + l3 + l4 + l5;



                let pitch = ll / 81;
                let l = (-angle * 20) % pitch;
                let roll_mat = mat4_mul(rot_x_mat4(Math.PI * 0.5), scale_mat4([1.95, 1.95, 14]));
                let roll_norm = mat3_mul(rot, rot_x_mat3(Math.PI * 0.5));

                if (magic === 2) {
                    ll = pitch * 15;
                } else if (magic === 1) {
                    l += pitch * 50
                }

                for (let k = 0; k < 2; k++) {
                    while (l <= ll + pitch) {

                        let x = 0,
                            y = 0;
                        if (l < l0) {
                            let a = l / 20;
                            x = 20 * Math.sin(a);
                            y = -20 * Math.cos(a) + crankshaft_base_distance;
                        } else if (l < l0 + l1) {
                            x = 20;
                            y = l - l0 + crankshaft_base_distance;
                        } else if (l < l0 + l1 + l2) {
                            let a = (l - l0 - l1) / 22;
                            x = 42 - 22 * Math.cos(a);
                            y = 22 * Math.sin(a) - 61.253;
                        } else if (l < l0 + l1 + l2 + l3) {
                            let d = l - l0 - l1 - l2;
                            x = 42 - 22 * Math.cos(small_angle) + d * Math.sin(small_angle);
                            y = 22 * Math.sin(small_angle) - 61.253 + d * Math.cos(small_angle);
                        } else if (l < l0 + l1 + l2 + l3 + l4) {
                            let a = (l - l0 - l1 - l2 - l3) / 40 - small_angle;
                            x = l5 + 40 * Math.cos(a);
                            y = 40 * Math.sin(a) + 117.947;
                        } else {
                            x = -(l - l0 - l1 - l2 - l3 - l4) + l5;
                            y = 117.947 + 40;
                        }
                        gl.draw_mesh("small_cylinder", mat4_mul(view_projection, mat4_mul(translation_mat4([k == 0 ? x : -x, 269.5, y]), roll_mat)), roll_norm, use_color ? blue_color : gray_color);
                        l += pitch;
                    }

                    l = pitch - (l - ll);
                }
            }



            function draw_flywheel(crank_angle, view_projection, rot, skip_bolts, color) {
                let gear_mat;
                let gear_rot;

                if (!color)
                    color = gray_color;

                let dist = -4 * web - 2 * main - 2 * rod - 17;
                gear_mat = mat4_mul(mat4_mul(view_projection, translation_mat4([0, dist, 0])), rot_y_mat4(crank_angle));
                gear_rot = mat3_mul(rot, rot_y_mat3(crank_angle));

                for (let i = 0; i < 4; i++) {
                    let mat = mat4_mul(gear_mat, (i & 1) ? z_flip_mat4 : ident_mat4);
                    mat = mat4_mul(mat, (i & 2) ? x_flip_mat4 : ident_mat4);
                    let rot = mat3_mul(gear_rot, (i & 1) ? z_flip_mat3 : ident_mat3);
                    rot = mat3_mul(rot, (i & 2) ? x_flip_mat3 : ident_mat3);

                    gl.draw_mesh("Flywheel", mat, rot, color, 1, i == 1 || i == 2);
                }

                if (!skip_bolts) {
                    for (let i = 0; i < 6; i++) {
                        let mat = mat4_mul(mat4_mul(view_projection, rot_y_mat4(i * Math.PI / 3 + Math.PI / 6 + crank_angle)),
                            translation_mat4([0, dist - 21, 37]));
                        draw_bolt(5, 0, 0, mat4_mul(mat, rot_x_mat4(Math.PI * 0.5)), mat3_mul(rot, mat3_mul(rot_y_mat3(i * Math.PI / 3 + Math.PI / 6 + crank_angle), rot_x_mat3(Math.PI * 0.5))), gray_color);
                    }
                }
            }



            function draw_block(mvp, rot, opacity, color) {
                if (!color)
                    color = [0.8, 0.8, 0.8, 1];
                if (!opacity)
                    opacity = 1;


                gl.draw_mesh("Engine_block", mvp, rot, color, opacity);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, y_flip_mat4), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, translation_mat4([0, -cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, -cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, translation_mat4([0, cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, translation_mat4([0, 2 * cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_block", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, 2 * cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);

                gl.draw_mesh("Engine_block_back", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, 2 * cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);

                gl.draw_mesh("Engine_block_front", mat4_mul(mvp, translation_mat4([0, 2 * cylinder_distance, 0])), rot, color, opacity);

            }

            function draw_crankshaft_mount(view_projection, rot, one) {

                let color = [0.8, 0.8, 0.8, 1];

                for (let i = 0; i < 5; i++) {
                    if (one && i != 3)
                        continue;

                    let d = cylinder_distance * (-2 + i);

                    let model_matrix = translation_mat4([0, cylinder_distance, 0]);
                    let mvp = mat4_mul(view_projection, model_matrix);
                    let normal_rot = rot;

                    gl.draw_mesh("Main_journal_cap", mat4_mul(mvp, translation_mat4([0, d, 0])), normal_rot, color);
                    gl.draw_mesh("Main_journal_cap", mat4_mul(mat4_mul(mvp, translation_mat4([0, d, 0])), x_flip_mat4), mat3_mul(normal_rot, x_flip_mat3), color, 1, true);


                    draw_bolt(5, 0, 0, mat4_mul(mat4_mul(mvp, translation_mat4([42, d - cylinder_distance, -47 + crankshaft_base_distance])), rot_x_mat4(Math.PI)), mat3_mul(normal_rot, rot_x_mat3(Math.PI)), color, 1, true);
                    draw_bolt(5, 0, 0, mat4_mul(mat4_mul(mvp, translation_mat4([-42, d - cylinder_distance, -47 + crankshaft_base_distance])), rot_x_mat4(Math.PI)), mat3_mul(normal_rot, rot_x_mat3(Math.PI)), color, 1, true);

                    model_matrix = mat4_mul(translation_mat4([0, 0, 0]), rot_z_mat4(-Math.PI * 0.5));
                    mvp = mat4_mul(view_projection, model_matrix);
                    normal_rot = mat3_mul(rot, rot_z_mat3(-Math.PI * 0.5));

                    gl.draw_mesh("Main_bearing_bottom", mat4_mul(mvp, mat4_mul(translation_mat4([d, 0, -221.5]), rot_x_mat4(Math.PI))), mat3_mul(normal_rot, rot_x_mat3(Math.PI)), color);
                    gl.draw_mesh("Main_bearing_bottom", mat4_mul(mvp, translation_mat4([d, 0, -221.5])), normal_rot, color);
                }
            }


            function draw_valves(offsets, view_projection, rot, cross, plain, color) {
                let model_matrix = ident_mat4;

                model_matrix = mat4_mul(translation_mat4([0, 0, 10.602]), model_matrix);
                model_matrix = mat4_mul(rot_y_mat4(20 * Math.PI / 180), model_matrix);
                model_matrix = mat4_mul(translation_mat4([14.815, 34, 0]), model_matrix);

                let normal_rot = mat3_mul(rot, mat3_mul(rot_y_mat3(-20 * Math.PI / 180), rot_x_mat3(Math.PI * 0.5)));
                let mvp = mat4_mul(view_projection, model_matrix);

                for (let i = 0; i < 4; i++) {
                    let d = offsets[2 * i];
                    let mat = mat4_mul(model_matrix, mat4_mul(translation_mat4([0, 0, d]), rot_x_mat4(Math.PI * 0.5)));
                    let tr = translation_mat4([0, -2 * cylinder_distance + i * cylinder_distance, 0]);
                    mvp = mat4_mul(view_projection, mat4_mul(tr, mat));
                    gl.draw_mesh("Valve", mvp, normal_rot, color ? blue_color : gray_color);


                    if (!plain)
                        gl.draw_mesh("Valve_bucket", mvp, normal_rot, color ? blue_color : gray_color);

                    let spring_scale = 1.0 + d / spring_length;
                    if (cross)
                        continue;

                    mvp = mat4_mul(mvp, mat4_mul(translation_mat4([0, 50 - d, 0]), rot_x_mat4(-Math.PI * 0.5)));

                    if (!plain)
                        gl.draw_spring(8, 1.5, spring_length * spring_scale, mvp, mat3_mul(normal_rot, rot_x_mat3(-Math.PI * 0.5)), color ? blue_color : gray_color)

                    tr = translation_mat4([0, -2 * cylinder_distance + cylinder_distance - 2 * 34 + i * cylinder_distance, 0]);
                    mvp = mat4_mul(view_projection, mat4_mul(tr, mat));

                    gl.draw_mesh("Valve", mvp, normal_rot, color ? blue_color : gray_color);
                    if (!plain)
                        gl.draw_mesh("Valve_bucket", mvp, normal_rot, color ? blue_color : gray_color);

                    mvp = mat4_mul(mvp, mat4_mul(translation_mat4([0, 50 - d, 0]), rot_x_mat4(-Math.PI * 0.5)));

                    if (!plain)
                        gl.draw_spring(8, 1.5, spring_length * spring_scale, mvp, mat3_mul(normal_rot, rot_x_mat3(-Math.PI * 0.5)), color ? blue_color : gray_color)


                }

                model_matrix = ident_mat4;
                model_matrix = mat4_mul(translation_mat4([0, 0, 10.602]), model_matrix);
                model_matrix = mat4_mul(rot_y_mat4(-20 * Math.PI / 180), model_matrix);
                model_matrix = mat4_mul(translation_mat4([-14.815, 34, 0]), model_matrix);

                normal_rot = mat3_mul(rot, mat3_mul(rot_y_mat3(20 * Math.PI / 180), rot_x_mat3(Math.PI * 0.5)));
                mvp = mat4_mul(view_projection, model_matrix);

                for (let i = 0; i < 4; i++) {
                    let d = offsets[2 * i + 1];

                    let mat = mat4_mul(model_matrix, mat4_mul(translation_mat4([0, 0, d]), rot_x_mat4(Math.PI * 0.5)));

                    let tr = translation_mat4([0, -2 * cylinder_distance + i * cylinder_distance, 0]);
                    mvp = mat4_mul(view_projection, mat4_mul(tr, mat));
                    gl.draw_mesh("Valve_exhaust", mvp, normal_rot, color ? red_color : gray_color);
                    if (!plain)
                        gl.draw_mesh("Valve_bucket", mvp, normal_rot, color ? red_color : gray_color);

                    let spring_scale = 1.0 + d / spring_length;

                    mvp = mat4_mul(mvp, mat4_mul(translation_mat4([0, 50 - d, 0]), rot_x_mat4(-Math.PI * 0.5)));
                    if (!plain)
                        gl.draw_spring(8, 1.5, spring_length * spring_scale, mvp, mat3_mul(normal_rot, rot_x_mat3(-Math.PI * 0.5)), color ? red_color : gray_color)
                    if (cross)
                        continue;

                    tr = translation_mat4([0, -2 * cylinder_distance + cylinder_distance - 2 * 34 + i * cylinder_distance, 0]);
                    mvp = mat4_mul(view_projection, mat4_mul(tr, mat));
                    gl.draw_mesh("Valve_exhaust", mvp, normal_rot, color ? red_color : gray_color);
                    if (!plain)
                        gl.draw_mesh("Valve_bucket", mvp, normal_rot, color ? red_color : gray_color);

                    mvp = mat4_mul(mvp, mat4_mul(translation_mat4([0, 50 - d, 0]), rot_x_mat4(-Math.PI * 0.5)));

                    if (!plain)
                        gl.draw_spring(8, 1.5, spring_length * spring_scale, mvp, mat3_mul(normal_rot, rot_x_mat3(-Math.PI * 0.5)), color ? red_color : gray_color)

                }
            }

            function draw_standard_pistons(crank_angle, view_projection, rot, skip_rings, color) {

                let rod_color = color ? blue_color : gray_color;
                let piston_color = color ? yellow_color : gray_color;
                draw_piston(crank_angle, mat4_mul(view_projection, translation_mat4([0, main * 0.5 + web + rod * 0.5, 0])), rot, rod_color, piston_color, skip_rings);
                draw_piston(crank_angle, mat4_mul(view_projection, translation_mat4([0, -(main * 0.5 + web + rod * 0.5), 0])), rot, rod_color, piston_color, skip_rings);

                crank_angle = (crank_angle + Math.PI) % (2 * Math.PI);

                draw_piston(crank_angle, mat4_mul(view_projection, translation_mat4([0, (main * 1.5 + web * 3 + rod * 1.5), 0])), rot, rod_color, piston_color, skip_rings);
                draw_piston(crank_angle, mat4_mul(view_projection, translation_mat4([0, -(main * 1.5 + web * 3 + rod * 1.5), 0])), rot, rod_color, piston_color, skip_rings);

            }

            function draw_head(mvp, rot, skip_gasket, skip_bolts, opacity) {
                let color = [0.8, 0.8, 0.8, 1];

                if (!opacity)
                    opacity = 1;

                gl.draw_mesh("Engine_head", mvp, rot, color, opacity);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, 0, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, translation_mat4([0, -cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, -cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, translation_mat4([0, cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, translation_mat4([0, 2 * cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_head", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, 2 * cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);
                gl.draw_mesh("Engine_head_front", mat4_mul(mvp, translation_mat4([0, 2 * cylinder_distance, 0])), rot, color, opacity);
                gl.draw_mesh("Engine_head_back", mat4_mul(mvp, mat4_mul(y_flip_mat4, translation_mat4([0, 2 * cylinder_distance, 0]))), mat3_mul(rot, y_flip_mat3), color, opacity, true);

                if (!skip_bolts) {
                    for (let i = 0; i < 5; i++) {
                        draw_bolt(5.5, 0, 0, mat4_mul(mvp, translation_mat4([40, (i - 2) * cylinder_distance, 67])), rot, gray_color, 1, true);
                        draw_bolt(5.5, 0, 0, mat4_mul(mvp, translation_mat4([-40, (i - 2) * cylinder_distance, 67])), rot, gray_color, 1, true);
                    }
                }
            }

            function draw_feather(left_right, top_bottom, p) {
                if (!p)
                    p = 0.05;

                ctx.resetTransform();


                ctx.globalCompositeOperation = "destination-out";

                let grd;


                if (top_bottom) {
                    grd = ctx.createLinearGradient(0, 0, 0, canvas.height * p);
                    grd.addColorStop(0.0, "rgba(0,0,0,1.0)");
                    grd.addColorStop(0.2, "rgba(0,0,0,0.9)");
                    grd.addColorStop(0.4, "rgba(0,0,0,0.7)");
                    grd.addColorStop(0.6, "rgba(0,0,0,0.3)");
                    grd.addColorStop(0.8, "rgba(0,0,0,0.1)");
                    grd.addColorStop(1.0, "rgba(0,0,0,0.0)");


                    ctx.fillStyle = grd;
                    ctx.fillRect(0, 0, canvas.width, canvas.height * p);

                    grd = ctx.createLinearGradient(0, canvas.height * (1.0 - p), 0, canvas.height);
                    grd.addColorStop(1.0, "rgba(0,0,0,1.0)");
                    grd.addColorStop(0.8, "rgba(0,0,0,0.9)");
                    grd.addColorStop(0.6, "rgba(0,0,0,0.7)");
                    grd.addColorStop(0.4, "rgba(0,0,0,0.3)");
                    grd.addColorStop(0.2, "rgba(0,0,0,0.1)");
                    grd.addColorStop(0.0, "rgba(0,0,0,0.0)");

                    ctx.fillStyle = grd;
                    ctx.fillRect(0, canvas.height * (1.0 - p), canvas.width, canvas.height * p);
                }

                if (left_right) {
                    grd = ctx.createLinearGradient(0, 0, canvas.width * p, 0);
                    grd.addColorStop(0.0, "rgba(0,0,0,1.0)");
                    grd.addColorStop(0.2, "rgba(0,0,0,0.9)");
                    grd.addColorStop(0.4, "rgba(0,0,0,0.7)");
                    grd.addColorStop(0.6, "rgba(0,0,0,0.3)");
                    grd.addColorStop(0.8, "rgba(0,0,0,0.1)");
                    grd.addColorStop(1.0, "rgba(0,0,0,0.0)");


                    ctx.fillStyle = grd;
                    ctx.fillRect(0, 0, canvas.width * p, canvas.height);

                    grd = ctx.createLinearGradient(canvas.width * (1.0 - p), 0, canvas.width, 0);
                    grd.addColorStop(1.0, "rgba(0,0,0,1.0)");
                    grd.addColorStop(0.8, "rgba(0,0,0,0.9)");
                    grd.addColorStop(0.6, "rgba(0,0,0,0.7)");
                    grd.addColorStop(0.4, "rgba(0,0,0,0.3)");
                    grd.addColorStop(0.2, "rgba(0,0,0,0.1)");
                    grd.addColorStop(0.0, "rgba(0,0,0,0.0)");

                    ctx.fillStyle = grd;
                    ctx.fillRect(canvas.width * (1.0 - p), 0, canvas.width * p, canvas.height);
                }
                ctx.globalCompositeOperation = "source-over";
            }
             if (mode === "injector") {
                let scale = 35.0;

                let view_projection = translation_mat4([0, 0, -28]);
                view_projection = mat4_mul(mat3_to_mat4(rot), view_projection);
                view_projection = mat4_mul(scale_mat4(scale), view_projection);
                view_projection = mat4_mul(proj, view_projection);

                let mvp = view_projection;

                gl.begin(width, height);

                let tt = t % 1;

                let fuel_mat = ident_mat4.slice();
                fuel_mat[0] = 0.97;
                fuel_mat[5] = 0.97;
                fuel_mat[7] = 0.1;
                let energ = (step(0.3, tt) - step(0.6, tt));
                let shift = 0.5 * (smooth_step(0.3, 0.35, tt) - smooth_step(0.6, 0.65, tt));
                let particle_t = (tt - 0.3) / 0.3;

                let fuel_color = [200 / 255, 163 / 255, 26 / 255, 1.0];

                gl.draw_mesh("Injector_lines", mvp, rot, gray_color, 1, false, [
                    [0, 1, 0, -0.17],
                    [0.2, 0, 0.2]
                ]);
                gl.draw_mesh("Injector_lines", mat4_mul(mvp, x_flip_mat4), mat3_mul(rot, x_flip_mat3), gray_color, 1, true, [
                    [0, 1, 0, -0.17],
                    [-0.2, 0, 0.2]
                ]);
                gl.draw_mesh("Injector_lines_2", mvp, rot, gray_color, 1, false, [
                    [0, 1, 0, 0.01],
                    [0.2, 0, 0.2]
                ]);
                gl.draw_mesh("Injector_outer", mvp, rot, gray_color);
                gl.draw_mesh("Injector_inner", mvp, rot, gray_color, 1, false, [
                    [0, 1, 0, 0.01],
                    [-0.2, 0, 0.2]
                ]);
                gl.draw_mesh("Injector_needle", mat4_mul(mvp, translation_mat4([0, 0, shift])), rot, yellow_color, 1, false, [
                    [0, 1, 0, 0.01],
                    [-0.5, 0, 0.5]
                ]);
                gl.draw_mesh("Injector_needle", mat4_mul(mat4_mul(mvp, y_flip_mat4), translation_mat4([0, 0, shift])), mat3_mul(rot, y_flip_mat3), yellow_color, 1, true);

                gl.draw_mesh("Injector_fuel", mat4_mul(mvp, fuel_mat), rot, fuel_color, 0.2);

                let len = 6.5 - shift
                gl.draw_spring(1.2, 0.3, len, mat4_mul(mvp, translation_mat4([0, 0, shift + 53.5])), rot, blue_color)


                let coil_opacity = 1.0;
                let coil_color = energ != 0 ? green_color : [0.5, 0.5, 0.5, 1.0];
                gl.draw_spring(5, 0.25, 5.6, mat4_mul(mvp, translation_mat4([0, 0, 48.4])), rot, coil_color, coil_opacity, [16, 0]);
                gl.draw_spring(5.4, 0.25, 5.6, mat4_mul(mvp, translation_mat4([0, 0, 48.9])), rot, coil_color, coil_opacity, [16, 0]);

                gl.draw_points(mat4_mul(mvp, translation_mat4([0, 0, 0])), particle_t);

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                draw_feather(true, true);

            }
        }

        if (load_text)
            document.fonts.load("10px IBM Plex Sans").then(function() { self.repaint() });

        this.on_resize();

        window.addEventListener("resize", this.on_resize, true);
        window.addEventListener("load", this.on_resize, true);
    }
    
    document.addEventListener("DOMContentLoaded", function(event) {


        let injector = new Drawer(document.getElementById("ice_injector"), "injector");

        // let div = valve_spring_slider.knob_div();
        let slider_animated = false;
        let slider_t = 0;
        let slider_A = 0;
        let prev_t = 0;

        function slider_tick(timestamp) {

            if (!slider_animated)
                return;

            if (prev_t != 0.0)
                slider_t += timestamp - prev_t;
            prev_t = timestamp;

            let v = slider_A * (1.01 * Math.exp(-slider_t * 0.02) - 0.01);

            valve_spring.set_arg0(v);
            valve_spring_slider.set_value(v);

            if (v > 0) {
                window.requestAnimationFrame(slider_tick);
            }
        }

        let g = function(e) {
            slider_animated = false;
            slider_t = 0;
            slider_A = 0;
            let f = function(e) {

                window.removeEventListener("mouseup", f);
                window.removeEventListener("touchend", f);
                window.removeEventListener("touchcancel", f);
                if (valve_spring.get_arg0() != 0.0) {
                    slider_animated = true;
                    slider_A = valve_spring.get_arg0();
                    slider_t = 0;
                    prev_t = 0;
                    window.requestAnimationFrame(slider_tick);
                }
            };
            window.addEventListener("mouseup", f);
            window.addEventListener("touchend", f);
            window.addEventListener("touchcancel", f);
        }

        // div.addEventListener("mousedown", g);
        // div.addEventListener("touchstart", g);


        drawers_ready = true;

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {entry.target.drawer.set_visible(entry.isIntersecting);})
            }, {rootMargin: "100px"})

            all_containers.forEach(container => observer.observe(container));
        } else {
            all_containers.forEach(container => container.drawer.set_visible(true));
        }

        animated_drawers = [   
            injector,
        ];
        
        
    });
})();

function ice_cylinders() {
    block.set_rot(ident_mat3);
}

function crank_90() {
    piston_limits.set_arg0(0.25);
    piston_limits_slider.set_value(0.25);
}

function ice_head0() {
    head_section.set_rot(mat3_mul(rot_x_mat3(-1.2), mat3_mul(rot_z_mat3(Math.PI * 0.5), rot_x_mat3(Math.PI))));
}

function ice_head1() {
    head_section.set_rot(mat3_mul(rot_x_mat3(-20 * Math.PI / 180), mat3_mul(rot_z_mat3(Math.PI * 0.5), rot_x_mat3(Math.PI))));

}

function global_animate(animate) {

    for (var i = 0; i < animated_drawers.length; i++) {
        animated_drawers[i].set_paused(!animate);
    }

    if (animate) {
        document.getElementById("global_animate_on").classList.remove("hidden");
        document.getElementById("global_animate_off").classList.add("hidden");
    } else {
        document.getElementById("global_animate_on").classList.add("hidden");
        document.getElementById("global_animate_off").classList.remove("hidden");
    }
}