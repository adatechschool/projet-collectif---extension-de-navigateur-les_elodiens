const popupStyles = `
  position: absolute;
  z-index: 9999;
  max-width: 300px;
  background-color: rgb(76, 171, 166);
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;

`;

let selectedString;

document.addEventListener("mouseup",  async function(event) {
    const selectedString= window.getSelection().toString().trim();
    console.log(selectedString);

    if (selectedString) {
        const urlMot=  `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedString}`

        
        try {
            let response = await fetch(urlMot);
            let data = await response.json();

            if (data.length > 0) {
                const motDefinition = data[0]["meanings"][0]["definitions"][0]["definition"];
                console.log(motDefinition);
                
                
                const popup = document.createElement("div");
                popup.style = popupStyles;

                const selectedContainer = document.createElement("h2");
                selectedContainer.style.color = "white"
                selectedContainer.innerText= selectedString
                popup.appendChild(selectedContainer);

                const defintionContainer = document.createElement("p");
                defintionContainer.innerText = motDefinition;
                popup.appendChild(defintionContainer);
                
                const buttonGSearch = document.createElement("button")
                buttonGSearch.textContent = "more"

                    if('click',buttonGSearch) {
                        let search = "https://www.google.com/search?q=" + encodeURIComponent(selectedString);
                        window.open(search, '_blank', 'width=800,height=600');
                    }

                // buttonGSearch.innerText = button.onclick("https://www.google.com/search?q=" + encodeURIComponent(selectedString), '_blank', 'width=800,height=600');

                // function redirect (){
                //     window.open("https://www.google.com/search?q=" + encodeURIComponent(selectedString))
                // }
                // buttonGSearch.onclick("click", redirect())

                // buttonGSearch.addEventListener("click", function() {
                //     console.log('button clicked');
                //     const search = `https://www.google.com/search?q=${selectedString}`;
                //     chrome.tabs.create({ url : search});
                // });
                
                popup.appendChild(buttonGSearch);

                document.body.appendChild(popup);

            
                const popupWidth = popup.offsetWidth;
                const popupHeight = popup.offsetHeight;
                const leftPosition = event.pageX - popupWidth / 2;
                const topPosition = event.pageY - popupHeight - 10;

                popup.style.left = `${leftPosition}px`;
                popup.style.top = `${topPosition}px`;
                
               
                window.addEventListener("scroll",() => popup.remove());
                window.addEventListener("resize",() => popup.remove());
                popup.addEventListener('mousedown', () => popup.remove());
            }

        }
        catch(err) { 
            alert ('erreur');
        }    
       
    }
});


 // const popupOptions = `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`;
            //     const popupContent = 
            //         `
            //         <div style="padding: 10px;">
            //             <h2>${selectedString}</h2>
            //             <p>${motDefinition}</p>
            //         </div>
            //         `;
            //     const popupWindow = window.open("", "Word Definition", popupOptions);
            //     popupWindow.document.body.innerHTML = popupContent;
            // }








// //fonction de récupération du mot sélectionné
// const selection=()=>{
//     if (window.getSelection){
//         let selectedString= window.getSelection().toString()
//         // console.log(`selection : ${selection}`)
//         console.log(selectedString);

//         return selectedString
//     }
// }

// // //fontion de lancement d'une recherche google à partir du retour de la fonction seletion
// // const googleSearch =()=>{
// //     if (selection()!=""){
// //         var search = "https://www.google.com/search?q=" + encodeURIComponent(selection());
// //         window.open(search, '_blank', 'width=800,height=600');
// //     }
// // }


// const divReponse= document.querySelector("reponse")
// // const buttonGSearch=document.createElement("Button")


// async function definition(){
//     const urlMot=  `https://api.dictionaryapi.dev/api/v2/entries/en/${selection()}`
//     console.log(`function definition(): ${urlMot}`)
//     let apiObject= await fetch(urlMot)
//     let jsonObject= await apiObject.json()
//     let motDefinition = jsonObject[0]["meanings"][0]["definitions"][0]["definition"]
//     console.log(`fonction definition: ${motDefinition}`)
//     return motDefinition

// }

// // //affichage du mot sélectionné dans la page (future popup)
// // const displaySelectedWord=()=>{
// //     if (selection()!=""){
// //         const reponseContainer = document.createElement('p')
// //         reponseContainer.innerHTML=""
// //         reponseContainer.innerText=`Mot Sélectionné:\n ${selection()}`
// //         divReponse.appendChild(reponseContainer)
// //     }
// // }


// async function displayDefinition(){
//     if (selection()!=""){
//         console.log('displayDefinition')
//         const definitionContainer=document.createElement('p')
//         definitionContainer.innerHTML=""
//         console.log(`displayDefinition: ${await definition()}`)
//         definitionContainer.innerText=await definition() //récupération du retour de la fonction definition, donnant la définition du mot
//         divReponse.appendChild('p')
//     }
// }

// // //creation du bouton de lancement de la recherche google
// // // const createButton=() =>{
// // //     if (selection()!=""){
// // //         // divReponse.removeChild(buttonGSearch)
// // //         buttonGSearch.id="buttonID"
// // //         buttonGSearch.textContent="Google Search"
// // //         // divReponse.appendChild(buttonGSearch)
// // //     }
// // // }

// const allFunctions=()=>{
//     selection()
// //     displaySelectedWord()
//     displayDefinition()
// //     // createButton()
// //     // googleSearch()

// }

// // //Appel des fonctions appelées dans allFunctions après fin de click de la souris
// document.addEventListener("mouseup",selection)
// // //Appell de la recherche google search par click sur le bouton buttonGSearch
// // buttonGSearch.addEventListener("click",googleSearch)



// // // tableau.push(selection())

// // console.log(tableau















// //fonction de récupération du mot sélectionné

// const selection = () =>{
//     if (window.getSelection){
//         let selectedString= window.getSelection().toString().trim()
//         console.log(selectedString);
//         if (selectedString.length > 0) {
//             let message = {
//                 text : selectedString
//             }
//             chrome.runtime.sendMessage(message);
//         }
//         // return selectedString
//     }
// }
// async function definition(){
//     const urlMot=  `https://api.dictionaryapi.dev/api/v2/entries/en/${selection()}`
//     // console.log(`function definition(): ${urlMot}`)
//     let apiObject= await fetch(urlMot)
//     let jsonObject= await apiObject.json()
//     let motDefinition = jsonObject[0]["meanings"][0]["definitions"][0]["definition"]
//     console.log(`fonction definition: ${motDefinition}`)
//     return motDefinition

// };

// async function displayDefinition(){
//     if (selection()!=""){
//         console.log('displayDefinition')
//         const definitionContainer=document.querySelector('p')
//         // definitionContainer.innerHTML=""
//         console.log(`displayDefinition: ${await definition()}`)
//         definitionContainer.innerText=await definition() //récupération du retour de la fonction definition, donnant la définition du mot
//         // divReponse.appendChild(definitionContainer)
//     }
// }
// //affichage du mot sélectionné dans la page (future popup)
// const displaySelectedWord=()=>{
//     if (selection()!=""){
//         const reponseContainer = document.querySelector(".reponse")
//         // reponseContainer.innerHTML=""
//         // reponseContainer.innerText=`Mot Selectionné:\n ${selection()}`
//         // divReponse.appendChild(reponseContainer)
//     }
// }
// console.log(displaySelectedWord());
// // //fonction de lancement d'une recherche google à partir du retour de la fonction seletion
// // // const googleSearch =()=>{
// // //     if (selection()!=""){
// // //         var search = "https://www.google.com/search?q=" + encodeURIComponent(selection());
// // //         window.open(search, '_blank', 'width=800,height=600');
// // //     }
// // // }


// // // const divReponse =document.querySelector(".modal hidden")



// // // const buttonGSearch=document.createElement("Button");



// // //creation du bouton de lancement de la recherche google
// // // const createButton=() =>{
// // //     if (selection()!=""){
// // //         // divReponse.removeChild(buttonGSearch)
// // //         buttonGSearch.id="buttonID"
// // //         buttonGSearch.textContent="Google Search"
// // //         divReponse.appendChild(buttonGSearch)
// // //     }
// // // }

// const allFunctions = () => {
//         selection()
//         displaySelectedWord()
//         displayDefinition();
//     }
// // console.log(allFunctions());

// document.addEventListener("mouseup", allFunctions)

// //         // const button = createButton()
// //     // googleSearch()
        
    
// //     // const createGsearchButton = 
// //     //     buttonGSearch.addEventListener("click",googleSearch)
 




// // //Appel des fonctions appelées dans allFunctions après fin de click de la souris
// // document.addEventListener("mouseup",allFunctions())

// // //Appell de la recherche google search par click sur le bouton buttonGSearch
// // // buttonGSearch.addEventListener("click",googleSearch)



// // // tableau.push(selection())

// // // console.log(tableau)