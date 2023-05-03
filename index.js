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


async function definition(){
    const urlMot=  `https://api.dictionaryapi.dev/api/v2/entries/en/${selection()}`
    let apiObject= await fetch(urlMot)
    let jsonObject= await apiObject.json()
    let motDefinition = console.log(jsonObject[0]["meanings"][0]["definitions"][0]["definition"])
    return motDefinition

}

//affichage du mot sélectionné dans une la page
const displaySelectedWord=()=>{
    if (selection()!=""){
        const reponseContainer = document.createElement('p')
        const definitionContainer=document.createElement('p')
        reponseContainer.innerHTML=""
        definitionContainer.innerHTML=""
        reponseContainer.innerText=`Mot Sélectionné:\n ${selection()}`
        definitionContainer.innText=definition()
        divReponse.appendChild(reponseContainer)
        divReponse.appendChild(definitionContainer)
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