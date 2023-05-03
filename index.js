tableau=[]

const selection=()=>{
    if (window.getSelection){
        let selection= window.getSelection().toString()
        console.log(`selection : ${selection}`)
        return selection
    }
}
const googleSearch =()=>{
    if (selection()!=""){
        var search = "https://www.google.com/search?q=" + encodeURIComponent(selection());
        window.open(search, '_blank', 'width=800,height=600');
    }
}

const allFunctions=()=>{
    selection()
    googleSearch()
}

window.addEventListener("mouseup",allFunctions)



// tableau.push(selection())

// console.log(tableau)