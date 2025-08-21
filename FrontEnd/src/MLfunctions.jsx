export function c_idtoRGB(c_id){
	let R;
	let G;
	let B;
	let x=c_id-1;
	B=x%10;
	x=math.floor(x/10);
	G=x%10;
	x=math.floor(x/10);
	R=x%10;
	R=codedtohex(R);
	G=codedtohex(G);
	B=codedtohex(B);
	return (`#${R}${G}${B}`);
}

export function codedtohex(x){
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
function comparator(done,toBeDone,x){
    let donenew = done;
    let toBeDonenew=toBeDone;
    let xnew = x;
    donenew.push(toBeDone[xnew]);
    toBeDonenew.splice(xnew,1);
    console.log(`done:${donenew}`);
    console.log(`to be done:${toBeDonenew}`);
    if(toBeDonenew.length>0){
        for(i=0;i<toBeDonenew.length;i++){
            comparator(donenew,toBeDonenew,i);
        }
    }
}
export function concatonator(str1,str2){
	if(parseInt(str1[3])>parseInt(str2[3])){
		return (str2+str1);
	}
	else{
		return (str1+str2);
	}
}
export function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
