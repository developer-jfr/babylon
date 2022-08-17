import succesLevel2 from "assets/images/levels/sm-level-2.svg";
import succesLevel3 from "assets/images/levels/sm-level-3.svg";
import succesLevel4 from "assets/images/levels/sm-level-4.svg";
import succesLevel5 from "assets/images/levels/sm-level-5.svg";
import succesLevel6 from "assets/images/levels/sm-level-6.svg";
import succesLevel7 from "assets/images/levels/sm-level-7.svg";
import succesLevel8 from "assets/images/levels/sm-level-8.svg";
import succesLevel9 from "assets/images/levels/sm-level-9.svg";
import succesLevel10 from "assets/images/levels/sm-level-10.svg";
import succesLevel11 from "assets/images/levels/sm-level-11.svg";
import succesLevel12 from "assets/images/levels/sm-level-12.svg";
import succesLevel13 from "assets/images/levels/sm-level-13.svg";
import succesLevel14 from "assets/images/levels/sm-level-14.svg";
import succesLevel15 from "assets/images/levels/sm-level-15.svg";
import succesLevel16 from "assets/images/levels/sm-level-16.svg";
import succesLevel17 from "assets/images/levels/sm-level-17.svg";
import succesLevel18 from "assets/images/levels/sm-level-18.svg";
import succesLevel19 from "assets/images/levels/sm-level-19.svg";
import succesLevel20 from "assets/images/levels/sm-level-20.svg";
//
import level2 from "assets/images/levels/level-2.svg";
import level3 from "assets/images/levels/level-3.svg";
import level4 from "assets/images/levels/level-4.svg";
import level5 from "assets/images/levels/level-5.svg";
import level6 from "assets/images/levels/level-6.svg";
import level7 from "assets/images/levels/level-7.svg";
import level8 from "assets/images/levels/level-8.svg";
import level9 from "assets/images/levels/level-9.svg";
import level10 from "assets/images/levels/level-10.svg";
import level11 from "assets/images/levels/level-11.svg";
import level12 from "assets/images/levels/level-12.svg";
import level13 from "assets/images/levels/level-13.svg";
import level14 from "assets/images/levels/level-14.svg";
import level15 from "assets/images/levels/level-15.svg";
import level16 from "assets/images/levels/level-16.svg";
import level17 from "assets/images/levels/level-17.svg";
import level18 from "assets/images/levels/level-18.svg";
import level19 from "assets/images/levels/level-19.svg";
import level20 from "assets/images/levels/level-20.svg";

let towerLevels = [
    {
        id: 2,
        level: succesLevel2,
        sc_level: level2,
        active: false
    },
    {
        id: 3,
        level: succesLevel3,
        sc_level: level3,
        active: false
    },
    {
        id: 4,
        level: succesLevel4,
        sc_level: level4,
        active: false
    },
    {
        id: 5,
        level: succesLevel5,
        sc_level: level5,
        active: false
    },
    {
        id: 6,
        level: succesLevel6,
        sc_level: level6,
        active: false
    },
    {
        id: 7,
        level: succesLevel7,
        sc_level: level7,
        active: false
    },
    {
        id: 8,
        level: succesLevel8,
        sc_level: level8,
        active: false
    },
    {
        id: 9,
        level: succesLevel9,
        sc_level: level9,
        active: false
    },
    {
        id: 10,
        level: succesLevel10,
        sc_level: level10,
        active: false
    },
    {
        id: 11,
        level: succesLevel11,
        sc_level: level11,
        active: false
    },
    {
        id: 12,
        level: succesLevel12,
        sc_level: level12,
        active: false
    },
    {
        id: 13,
        level: succesLevel13,
        sc_level: level13,
        active: false
    },
    {
        id: 14,
        level: succesLevel14,
        sc_level: level14,
        active: false
    },
    {
        id: 15,
        level: succesLevel15,
        sc_level: level15,
        active: false
    },
    {
        id: 16,
        level: succesLevel16,
        sc_level: level16,
        active: false
    },
    {
        id: 17,
        level: succesLevel17,
        sc_level: level17,
        active: false
    },
    {
        id: 18,
        level: succesLevel18,
        sc_level: level18,
        active: false
    },
    {
        id: 19,
        level: succesLevel19,
        sc_level: level19,
        active: false
    },
    {
        id: 20,
        level: succesLevel20,
        sc_level: level20,
        active: false
    }
]


export const towerLevelsHandle = (num: number) => {
    towerLevels.map(e => {
        if(num >= e.id) {
            e.active=true
        } 
    })

    return towerLevels
}