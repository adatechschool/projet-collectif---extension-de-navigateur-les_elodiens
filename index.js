tableau=[]


//fonction de récupération du mot sélectionné
const selection=()=>{
    if (window.getSelection){
        let selectedString= window.getSelection().toString()
        // console.log(`selection : ${selection}`)
        return selectedString
    }
}

//fontion de lancement d'une recherche google à partir du retour de la fonction seletion
const googleSearch =()=>{
    if (selection()!=""){
        var search = "https://www.google.com/search?q=" + encodeURIComponent(selection());
        window.open(search, '_blank', 'width=800,height=600');
    }
}


const divReponse= document.getElementById("reponse")
const buttonGSearch=document.createElement("Button")


//affichage du mot sélectionné dans une la page
const displaySelectedWord=()=>{
    if (selection()!=""){
        const reponseContainer = document.createElement('p')
        reponseContainer.innerHTML=""
        reponseContainer.innerText=`Mot Sélectionné:\n ${selection()}`
        divReponse.appendChild(reponseContainer)
    }
}

//creation du bouton de lancement de la recherche google
const createButton=() =>{
    if (selection()!=""){
        // divReponse.removeChild(buttonGSearch)
        buttonGSearch.id="buttonID"
        buttonGSearch.textContent="Google Search"
        divReponse.appendChild(buttonGSearch)
    }
}

const allFunctions=()=>{
    selection()
    displaySelectedWord()
    createButton()

}

document.addEventListener("mouseup",allFunctions)
buttonGSearch.addEventListener("click",googleSearch)



// tableau.push(selection())

// console.log(tableau)