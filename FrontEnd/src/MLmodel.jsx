import {fetchData} from "./api"; // Ensure this import exists

export async function combinator(objects) {
    let maxcombo = [{ preference: -100000 }];
    let curcombo = [{}];

    const objs = [
        ["0", "obj1obj2", "obj1obj3", "obj1obj4", "obj1obj5"],
        ["obj1obj2", "0", "obj2obj3", "obj2obj4", "obj2obj5"],
        ["obj1obj3", "obj2obj3", "0", "obj3obj4", "obj3obj5"],
        ["obj1obj4", "obj2obj4", "obj3obj4", "0", "obj4obj5"],
        ["obj1obj5", "obj2obj5", "obj3obj5", "obj4obj5", "0"]
    ];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 5; i++) {
        if (!objects[i].status) {
            maxcombo = [{ preference: -10000 }];

            for (let j = 0; j < 5; j++) {
                if (objects[j].status) {
                    try {
                        curcombo = await fetchData(objs[i][j], objects[j].obj_nick, objects[j].obj_color + 1);  // Use await
                        if (curcombo && curcombo.length > 0 && maxcombo[0].preference < curcombo[0].preference) {
                            maxcombo = curcombo;
                        }
                    } catch (error) {
                        console.error("Error in combinator fetchData:", error);
                    }
                }
            }

            if (maxcombo.length > 0) {
                objects[i].obj_color = maxcombo[getRandomInt(0, maxcombo.length)].objx-1;
            }
        }
    }

    return objects;
}
