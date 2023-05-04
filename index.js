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
    console.log(`function definition(): ${urlMot}`)
    let apiObject= await fetch(urlMot)
    let jsonObject= await apiObject.json()
    let motDefinition = jsonObject[0]["meanings"][0]["definitions"][0]["definition"]
    console.log(`fonction definition: ${motDefinition}`)
    return motDefinition

}

//affichage du mot sélectionné dans la page (future popup)
const displaySelectedWord=()=>{
    if (selection()!=""){
        const reponseContainer = document.createElement('p')
        reponseContainer.innerHTML=""
        reponseContainer.innerText=`Mot Sélectionné:\n ${selection()}`
        divReponse.appendChild(reponseContainer)
    }
}


async function displayDefinition(){
    if (selection()!=""){
        console.log('displayDefinition')
        const definitionContainer=document.createElement('p')
        definitionContainer.innerHTML=""
        console.log(`displayDefinition: ${await definition()}`)
        definitionContainer.innerText=await definition() //récupération du retour de la fonction definition, donnant la définition du mot
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
    displayDefinition()
    createButton()
    // googleSearch()

}

//Appel des fonctions appelées dans allFunctions après fin de click de la souris
document.addEventListener("mouseup",allFunctions)
//Appell de la recherche google search par click sur le bouton buttonGSearch
buttonGSearch.addEventListener("click",googleSearch)



// tableau.push(selection())

// console.log(tableau)