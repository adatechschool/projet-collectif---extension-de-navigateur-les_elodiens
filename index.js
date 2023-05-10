const popupStyles = `
  position: absolute;
  z-index: 9999;
  max-width: 300px;
  background-color: rgb(76, 171, 166);
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;

`;

const containerStyle= `
    display: inline-block;
    color: white
    
`


let selectedString;

document.addEventListener("mouseup",  async function(event) {
    const selectedString= window.getSelection().toString().trim();
    console.log(selectedString);

    if (selectedString) {
    
        const urlMot=  `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedString}`

        const popup = document.createElement("div");
        popup.style = popupStyles;
       
        const selectedContainer = document.createElement("h2");
        selectedContainer.style.color = "white";
        selectedContainer.innerText= selectedString;
        selectedContainer.style = containerStyle;
        popup.appendChild(selectedContainer);
       
        const defintionContainer = document.createElement("p");
        popup.appendChild(defintionContainer);
        
        const synonymsContainer = document.createElement("p");
        popup.appendChild(synonymsContainer);

        const buttonGSearch = document.createElement("button")
        buttonGSearch.textContent = "Google Search"
        popup.appendChild(buttonGSearch);
        
        document.body.appendChild(popup);

            
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const leftPosition = event.pageX - popupWidth / 2;
        const topPosition = event.pageY - popupHeight - 10;

        popup.style.left = `${leftPosition}px`;
        popup.style.top = `${topPosition}px`;
        
        try {
            setTimeout(async function() {
                
            
            let response = await fetch(urlMot);
            let data = await response.json();
            console.log(response.status);

            if (response.status != 404) {
                const motDefinition = data[0]["meanings"][0]["definitions"][0]["definition"];
                console.log(motDefinition);

                const synonymsArray = data[0]["meanings"][0]["synonyms"];
                console.log(synonymsArray);
                const synonymString =synonymsArray.join(", ");
                synonymsContainer.innerHTML = `<strong> Synonyms </strong>: ${synonymString} <br> <br>`;

                console.log(synonymString);

                const objecttotest = data[0]["phonetics"]
                console.log(typeof(objecttotest));
                console.log(objecttotest);

                if(data[0]["phonetics"].length ==0 ){
 
                    // const audioSpeaker = data[0]["phonetics"][0]["audio"]
                    
                    // console.log(audioSpeaker);
                    console.log("tete");
                    const iconAudio = document.createElement("p");
                    iconAudio.innerText = "🔇";
                    iconAudio.style = containerStyle;
                    selectedContainer.appendChild(iconAudio);

                    
                } else if (data[0]["phonetics"][0]["audio"]=="") {
                    
                    console.log("test");
                   
                    const iconAudio = document.createElement("p");
                    iconAudio.innerText = "🔇";
                    iconAudio.style = containerStyle;
                    selectedContainer.appendChild(iconAudio);



                }else{
                 
                    const audioSpeaker = data[0]["phonetics"][0]["audio"]
                    
                    console.log(audioSpeaker);

                    const iconAudio = document.createElement("p")
                    iconAudio.innerText = "🔈"
                    iconAudio.style = containerStyle;

                    selectedContainer.appendChild(iconAudio)

                    iconAudio.addEventListener("mousedown", function(){
                        const vocalAudio = document.createElement("audio") 
                        vocalAudio.src = audioSpeaker
                        vocalAudio.play()
                        popup.appendChild(vocalAudio)  
                    })
                }

                defintionContainer.innerHTML = `<strong> Definition </strong>: ${motDefinition}`;
                



                buttonGSearch.addEventListener("mousedown", function() {
                console.log('button clicked');
                const search = `https://www.google.com/search?q=${selectedString}`;
                window.open("https://www.google.com/search?q=" + encodeURIComponent(selectedString))
                // chrome.tabs.create({ url : search});
                })

                // if('click',buttonGSearch) {
                //     let search = "https://www.google.com/search?q=" + encodeURIComponent(selectedString);
                //     window.open(search, '_blank', 'width=800,height=600');
                // }

            
               
            } else{
                const motErreur = "couldn't find definition"
                console.log(motErreur);
                defintionContainer.innerText = motErreur;
            }


            window.addEventListener("scroll",() => popup.remove());
            window.addEventListener("resize",() => popup.remove());
            // window.addEventListener("click", () => popup.remove());
        
        }, 5000)

        } 
       
        catch(error) { 
            alert( "nothing")
          
        }    
       
    }
});

// buttonGSearch.innerText = button.onclick("https://www.google.com/search?q=" + encodeURIComponent(selectedString), '_blank', 'width=800,height=600');

                // function redirect (){
                //     window.open("https://www.google.com/search?q=" + encodeURIComponent(selectedString))
                // }
                // buttonGSearch.onclick("click", redirect())

                
                // });
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