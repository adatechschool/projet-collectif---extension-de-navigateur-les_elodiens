tableau=[]

const selection=()=>{
    if (window.getSelection){
        let selection= window.getSelection().toString()
        console.log(`selection : ${selection}`)
        return selection
    }
}

window.addEventListener("mouseup",selection)

if (selection()!=""){
    
}

// tableau.push(selection())

// console.log(tableau)