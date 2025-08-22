import { Center } from "@react-three/drei";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

function Homepage() {
    const textColor = "cyan";
    const [objects, setobjects] = useState([
        {
            object_name: "roomColor",
            obj_nick: "obj1",
            obj_id: 1,
            status: false,
            obj_color: 555
        },
        {
            object_name: "vaseColor",
            obj_nick: "obj2",
            obj_id: 2,
            status: false,
            obj_color: 555
        },
        {
            object_name: "sofaColor",
            obj_nick: "obj3",
            obj_id: 3,
            status: false,
            obj_color: 555
        },
        {
            object_name: "bedColor",
            obj_nick: "obj4",
            obj_id: 4,
            status: false,
            obj_color: 555
        },
        {
            object_name: "fridgeColor",
            obj_nick: "obj5",
            obj_id: 5,
            status: false,
            obj_color: 555
        }
    ]);

    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate("/roompage",{state:{objects}});

    }
    const handleCheckboxChange = (objid) => {
        setobjects(
            objects.map((O) =>
                O.obj_id === objid ? { ...O, status: !O.status } : O
            )
        );
    };

    const handleRchange = (objid, val) => {
        setobjects(
            objects.map((O) =>
                O.obj_id === objid ? { ...O, obj_color: (O.obj_color % 100) + parseInt(val, 10) * 100 } : O
            )
        );
    };

    const handleGchange = (objid, val) => {
        setobjects(
            objects.map((O) =>
                O.obj_id === objid ? { ...O, obj_color: O.obj_color - (Math.floor(O.obj_color % 100) - Math.floor(O.obj_color % 10)) + parseInt(val, 10) * 10 } : O
            )
        );
    };

    const handleBchange = (objid, val) => {
        setobjects(
            objects.map((O) =>
                O.obj_id === objid ? { ...O, obj_color: O.obj_color - Math.floor(O.obj_color % 10) + parseInt(val, 10) } : O
            )
        );
    };

    const handleRGBchange = (objid, val) => {
        setobjects(
            objects.map((O) =>
                O.obj_id === objid ? { ...O, obj_color: parseInt(val, 10) } : O
            )
        );
    }

    const codedtoRGB=(c_id)=>{
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
    const inputstylecheckbox = {
        width: "20px"
    }
    const inputstylerange = {
        width: "80%"
    }
    return (
        <>  
            <div style={{display:"flex",
                flexWrap:"wrap",
                alignContent:"center",
                justifyContent:"center",
                gap:"5vw",
                max:"5",
                min:"1",
                marginTop:"40px",
                color: textColor,
                fontSize: "20px",
                
            }}>
            <div>
                <input style={inputstylecheckbox} type="checkbox" name="obj1option" value="1" checked={objects[0].status} onChange={() => handleCheckboxChange(1)} />
                <label> WALL COLOR</label>
                <p>R</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={Math.floor(objects[0].obj_color/100)} onChange={(e) => handleRchange(1, e.target.value)} />
                <p>G</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[0].obj_color-Math.floor(objects[0].obj_color/100)*100-(objects[0].obj_color-Math.floor(objects[0].obj_color/10)*10))/10} onChange={(e) => handleGchange(1, e.target.value)} />
                <p>B</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[0].obj_color-Math.floor(objects[0].obj_color/10)*10)} onChange={(e) => handleBchange(1, e.target.value)} />
                <p>Color code: {objects[0].obj_color}</p>
                <div style = { {backgroundColor : codedtoRGB(objects[0].obj_color) , width : "200px",height:"200px",border:"2px solid black",borderRadius:"15px",boxShadow:`3px 3px 15px 1px ${codedtoRGB(objects[0].obj_color)}`}}></div>
                <p>RGB</p>
                <input style={inputstylerange} type="range" min={0} max={999} step={1} value={(objects[0].obj_color)} onChange={(e) => handleRGBchange(1, e.target.value)} />
            </div>
            <div>
                <input style={inputstylecheckbox} type="checkbox" name="obj2option" value="2" checked={objects[1].status} onChange={() => handleCheckboxChange(2)} />
                <label> VASE COLOR </label>
                <p>R</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={Math.floor(objects[1].obj_color/100)} onChange={(e) => handleRchange(2, e.target.value)} />
                <p>G</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[1].obj_color-Math.floor(objects[1].obj_color/100)*100-(objects[1].obj_color-Math.floor(objects[1].obj_color/10)*10))/10} onChange={(e) => handleGchange(2, e.target.value)} />
                <p>B</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[1].obj_color-Math.floor(objects[1].obj_color/10)*10)} onChange={(e) => handleBchange(2, e.target.value)} />
                <p>Color code: {objects[1].obj_color}</p>
                <div style = { {backgroundColor : codedtoRGB(objects[1].obj_color) , width : "200px",height:"200px",border:"2px solid black",borderRadius:"15px",boxShadow:`3px 3px 15px 1px ${codedtoRGB(objects[1].obj_color)}`}} ></div>
                <p>RGB</p>
                <input style={inputstylerange} type="range" min={0} max={999} step={1} value={(objects[1].obj_color)} onChange={(e) => handleRGBchange(2, e.target.value)} />
            </div>
            <div>
                <input style={inputstylecheckbox} type="checkbox" name="obj3option" value="3" checked={objects[2].status} onChange={() => handleCheckboxChange(3)} />
                <label> SOFA COLOR</label>
                <p>R</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={Math.floor(objects[2].obj_color/100)} onChange={(e) => handleRchange(3, e.target.value)} />
                <p>G</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[2].obj_color-Math.floor(objects[2].obj_color/100)*100-(objects[2].obj_color-Math.floor(objects[2].obj_color/10)*10))/10} onChange={(e) => handleGchange(3, e.target.value)} />
                <p>B</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[2].obj_color-Math.floor(objects[2].obj_color/10)*10)} onChange={(e) => handleBchange(3, e.target.value)} />
                <p>Color code: {objects[2].obj_color}</p>
                <div style = { {backgroundColor : codedtoRGB(objects[2].obj_color) , width : "200px",height:"200px",border:"2px solid black",borderRadius:"15px",boxShadow:`3px 3px 15px 1px ${codedtoRGB(objects[2].obj_color)}`}}></div>
                <p>RGB</p>
                <input style={inputstylerange} type="range" min={0} max={999} step={1} value={(objects[2].obj_color)} onChange={(e) => handleRGBchange(3, e.target.value)} />
            </div>
            <div>
                <input style={inputstylecheckbox} type="checkbox" name="obj4option" value="4" checked={objects[3].status} onChange={() => handleCheckboxChange(4)} />
                <label> MATTRESS COLOR</label>
                <p>R</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={Math.floor(objects[3].obj_color/100)} onChange={(e) => handleRchange(4, e.target.value)} />
                <p>G</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[3].obj_color-Math.floor(objects[3].obj_color/100)*100-(objects[3].obj_color-Math.floor(objects[3].obj_color/10)*10))/10} onChange={(e) => handleGchange(4, e.target.value)} />
                <p>B</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[3].obj_color-Math.floor(objects[3].obj_color/10)*10)} onChange={(e) => handleBchange(4, e.target.value)} />
                <p>Color code: {objects[3].obj_color}</p>
                <div style = { {backgroundColor : codedtoRGB(objects[3].obj_color) , width : "200px",height:"200px",border:"2px solid black",borderRadius:"15px",boxShadow:`3px 3px 15px 1px ${codedtoRGB(objects[3].obj_color)}`}}></div>
                <p>RGB</p>
                <input style={inputstylerange} type="range" min={0} max={999} step={1} value={(objects[3].obj_color)} onChange={(e) => handleRGBchange(4, e.target.value)} />
            </div>
            <div>
                <input style={inputstylecheckbox} type="checkbox" name="obj5option" value="5" checked={objects[4].status} onChange={() => handleCheckboxChange(5)} />
                <label> FRIDGE COLOR</label>
                <p>R</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={Math.floor(objects[4].obj_color/100)} onChange={(e) => handleRchange(5, e.target.value)} />
                <p>G</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[4].obj_color-Math.floor(objects[4].obj_color/100)*100-(objects[4].obj_color-Math.floor(objects[4].obj_color/10)*10))/10} onChange={(e) => handleGchange(5, e.target.value)} />
                <p>B</p>
                <input style={inputstylerange} type="range" min={0} max={9} step={1} value={(objects[4].obj_color-Math.floor(objects[4].obj_color/10)*10)} onChange={(e) => handleBchange(5, e.target.value)} />
                <p>Color code: {objects[4].obj_color}</p>
                <div style = { {backgroundColor : codedtoRGB(objects[4].obj_color) , width : "200px",height:"200px",border:"2px solid black",borderRadius:"15px",boxShadow:`3px 3px 15px 1px ${codedtoRGB(objects[4].obj_color)}`}}></div>
                <p>RGB</p>
                <input style={inputstylerange} type="range" min={0} max={999} step={1} value={(objects[4].obj_color)} onChange={(e) => handleRGBchange(5, e.target.value)} />
            </div>
            </div>
            <div style={{ display:"flex",justifyContent:"Center",alignContent:"center",marginTop:"70px"}}>
            <button className="BUTTON" onClick={handleNavigate}>SUBMIT</button>
            </div>

        </>
    );
}

export default Homepage;