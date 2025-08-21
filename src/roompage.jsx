import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { combinator } from "./mlmodel";
import { Room } from "./room";
import { updatePreference, updatePreferencestep2 } from "./api";
function Roompage() {
    const location = useLocation();
    const { objects = [] } = location.state || {};

    const [objectsNew, setObjectsNew] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const updatedObjects = await combinator(objects);
            setObjectsNew(updatedObjects);
        }
        fetchData();
    }, [objects]); // Runs when `objects` changes
    const c_idtoRGB=(c_id)=>{
        let R;
        let G;
        let B;
        let x=c_id;
        B=x%10;
        x=Math.floor(x/10);
        G=x%10;
        x=Math.floor(x/10);
        R=x%10;
        R=codedtohex(R);
        G=codedtohex(G);
        B=codedtohex(B);
        return (`#${R}${G}${B}`);
    }
    const handlegoodrating=async (object)=>{
        let iserror=false;
        const objs = [
            ["0", "obj1obj2", "obj1obj3", "obj1obj4", "obj1obj5"],
            ["obj1obj2", "0", "obj2obj3", "obj2obj4", "obj2obj5"],
            ["obj1obj3", "obj2obj3", "0", "obj3obj4", "obj3obj5"],
            ["obj1obj4", "obj2obj4", "obj3obj4", "0", "obj4obj5"],
            ["obj1obj5", "obj2obj5", "obj3obj5", "obj4obj5", "0"]
        ];
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                if(j>i){
                    const response = await updatePreference(objs[i][j],object[i].obj_nick,object[j].obj_nick,(object[i].obj_color)+1,(object[j].obj_color)+1,5);
                    if(response.error){
                        console.log(`Error: ${response.error}`);
                        iserror=true;
                    }
                    else{
                        console.log("Preference updated successfully!");
                        
                    }
                }
            }
        }
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                if(j>i){
                    const response = await updatePreferencestep2(objs[i][j],object[i].obj_nick,object[j].obj_nick,(object[i].obj_color)+1,(object[j].obj_color)+1,2);
                    if(response.error){
                        console.log(`Error: ${response.error}`);
                        iserror = true;
                    }
                    else{
                        console.log("Preference updated successfully!");
                    }
                }
            }
        }
        if (iserror){
            alert("error during api call")
        }
        else{
            alert("your positive response has been received")
        }
    }
    const handlebadrating=async (object)=>{
        let iserror=false;
        const objs = [
            ["0", "obj1obj2", "obj1obj3", "obj1obj4", "obj1obj5"],
            ["obj1obj2", "0", "obj2obj3", "obj2obj4", "obj2obj5"],
            ["obj1obj3", "obj2obj3", "0", "obj3obj4", "obj3obj5"],
            ["obj1obj4", "obj2obj4", "obj3obj4", "0", "obj4obj5"],
            ["obj1obj5", "obj2obj5", "obj3obj5", "obj4obj5", "0"]
        ];
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                if(j>i){
                    const response = await updatePreference(objs[i][j],object[i].obj_nick,object[j].obj_nick,(object[i].obj_color)+1,(object[j].obj_color)+1,-5);
                    if(response.error){
                        console.log(`Error: ${response.error}`);
                        iserror=true;
                    }
                    else{
                        console.log("Preference updated successfully!");
                    }
                }
            }
        }
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                if(j>i){
                    const response = await updatePreferencestep2(objs[i][j],object[i].obj_nick,object[j].obj_nick,(object[i].obj_color+1),(object[j].obj_color+1),-2);
                    if(response.error){
                        console.log(`Error: ${response.error}`);
                        iserror = true;
                    }
                    else{
                        console.log("Preference updated successfully!");
                    }
                }
            }
        }
        if (iserror){
            alert("error during api call")
        }
        else{
            alert("your negative response has been received")
        }
        
    }
    const codedtohex=(x)=>{
        if (x==0){
            return("00");
        }else if (x==1){
            return("1e");
        }else if( x==2){
            return("3b");
        }else if( x==3){
            return("58");
        }else if( x==4){
            return("75");
        }else if( x==5){
            return("92");
        }else if( x==6){
            return("af");
        }else if( x==7){
            return("cc");
        }else if( x==8){
            return("e9");
        }else{
            return("ff");
        }
    }
    return (
        <>
            {/* Global Styles to Remove White Space */}
            <style>
                {`
                    html, body {
                        overflow: hidden;
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                    }
                    
                    #root, #app { 
                        width: 100vw; 
                        height: 100vh; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                    }
                `}
            </style>
    
            {/* Color Display */}
            <p style={{
                position: "absolute",
                top: "2vh",
                left: "48%",
                transform: "translate(-50%,-100%)",
                display: "flex",
                gap: "30px",
                zIndex: 10,
                width: "90vw"
            }}>
                {objectsNew.length > 0 ? (
                    <>
                        {objectsNew[0]?.obj_color},{" "}
                        {objectsNew[1]?.obj_color},{" "}
                        {objectsNew[2]?.obj_color},{" "}
                        {objectsNew[3]?.obj_color},{" "}
                        {objectsNew[4]?.obj_color}
                    </>
                ) : (
                    "Loading..."
                )}
            </p>
    
            {/* Main Container to Fit the Screen */}
            {objectsNew.length > 4 && (
                <div style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {/* Floating Buttons */}
                    <div style={{
                        position: "absolute",
                        top: "2vh",
                        left:"80vw",
                        display: "flex",
                        gap: "30px",
                        zIndex: 10
                    }}>
                        <button 
                            style={{ fontSize: "1.5em", padding: "10px", backgroundColor: "lightgreen" }} 
                            onClick={() => handlegoodrating(objectsNew)}
                        >
                            Positive
                        </button>
                        <button 
                            style={{ fontSize: "1.5em", padding: "10px", backgroundColor: "red" }} 
                            onClick={() => handlebadrating(objectsNew)}
                        >
                            Negative
                        </button>
                    </div>
    
                    {/* Room Component */}
                    <Room
                        roomColor={c_idtoRGB(objectsNew[0].obj_color)}
                        vaseColor={c_idtoRGB(objectsNew[1].obj_color)}
                        sofaColor={c_idtoRGB(objectsNew[2].obj_color)}
                        mattressColor={c_idtoRGB(objectsNew[3].obj_color)}
                        fridgeColor={c_idtoRGB(objectsNew[4].obj_color)}
                    />
                </div>
            )}
        </>
    );
    
    
}

export default Roompage;
