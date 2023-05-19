const popupStyles = `
  position: absolute;
  z-index: 9999;
  max-width: 300px;
  backdrop-filter: none;
    
  background-color: gainsboro;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;

`;

const containerStyle= `
    display: inline-block;
    color: black
    
`


// let selectedString;
// selection d'un mot sur la page suite à l'évèneùent mouse up
document.addEventListener("mouseup",  async function(event) {
    const selectedString= window.getSelection().toString().trim(); // conversion en string et effacement des espaces
    console.log(selectedString);


    //si le mot sélectionné on crée les éléments de la div popup
    if (selectedString) {
    
        const urlMot=  `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedString}`


        //création de la div popup
        const popup = document.createElement("div");
        popup.style = popupStyles;
       
        //création de l'élément affichant le nom sélectionné
        const selectedContainer = document.createElement("h2");
        selectedContainer.style.color = "white";
        selectedContainer.innerText= selectedString;
        selectedContainer.style = containerStyle;
        popup.appendChild(selectedContainer);
       
        //création de l'élément contenant la définition
        const defintionContainer = document.createElement("p");
        popup.appendChild(defintionContainer);
        
        //création de l'élément contenant le bouton de parcours des définitions
        const nextQuestionContainer = document.createElement("p");
        popup.appendChild(nextQuestionContainer);

        //création de l'élément contenant les synonymes
        const synonymsContainer = document.createElement("p");
        popup.appendChild(synonymsContainer);

        //création de l'élément contenant le bouton de recherche google
        const buttonGSearch = document.createElement("button")
        buttonGSearch.textContent = "Google Search"
        popup.appendChild(buttonGSearch);
        

        // ajout de la div pop en tant qu'enfant du body
        document.body.appendChild(popup);

        // style de la popup
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const leftPosition = event.pageX - popupWidth / 2;
        const topPosition = event.pageY - popupHeight - 10;

        popup.style.left = `${leftPosition}px`;
        popup.style.top = `${topPosition}px`;
        
        try {
            // setTimeout(async function() {
                
            // fetch de l'API faisant référence au mot séletionné
            let response = await fetch(urlMot);
            //Conversion en objet JSON
            let data = await response.json();
            console.log(response.status);

            // si l'API trouve le mot, on affiche l'ensemble des definitions en commençant par l'élément 0 du tableau en initialisant un compteur à 0
            if (response.status != 404) {
                let compteur=0
                let motDefinition = data[0]["meanings"][0]["definitions"][compteur]["definition"]; //Variable donnant la définition du mot sélectionné
                let objectLength=data[0]["meanings"][0]["definitions"].length //Longeur du tableau pour permettre son parcours
                console.log(motDefinition);
                defintionContainer.innerHTML = `<strong> Definition </strong> (${compteur+1}/${objectLength}) : ${motDefinition}`; // affichage de la défintiion de l'index 0 du tableau

                // création d'un élément permettant le parcours des questions dispos
                nextQuestionContainer.innerHTML="&#9193"
                //incrément du compteur pour parcours des éléments du tableau
                compteur+=1
                //parcours des éléments du tableau par clique sur le chevron
                nextQuestionContainer.addEventListener("mousedown",function(){
                    console.log(compteur)
                    motDefinition = data[0]["meanings"][0]["definitions"][compteur]["definition"]
                    console.log(motDefinition)
                    defintionContainer.innerHTML=""
                    defintionContainer.innerHTML = `<strong> Definition </strong> (${compteur+1}/${objectLength}) : ${motDefinition}`;
                    compteur+=1
                    // si le compteur atteint la taille du tableau, il est rénitialisé à 0
                    if (compteur==data[0]["meanings"][0]["definitions"].length-1){
                        compteur=0
                    }    
                    
                })
                
                //récupération de la liste des synonymes
                const synonymsArray = data[0]["meanings"][0]["synonyms"];
                console.log(synonymsArray);

                // conversion en chaine de caractères et affichage dans la Div
                const synonymString =synonymsArray.join(", ");
                synonymsContainer.innerHTML = `<strong> Synonyms </strong>: ${synonymString} <br> <br>`;

                console.log(synonymString);

                // const objecttotest = data[0]["phonetics"]
                // console.log(typeof(objecttotest));
                // console.log(objecttotest);

                // test de l'existance du tableau "phonetics" et affichage du HP barré si absent
                if(data[0]["phonetics"].length ==0 ){
 
                    // const audioSpeaker = data[0]["phonetics"][0]["audio"]
                    
                    // console.log(audioSpeaker);
                    console.log("tete");
                    const iconAudio = document.createElement("p");
                    iconAudio.innerHTML = "🔇";
                    iconAudio.style = containerStyle;
                    selectedContainer.appendChild(iconAudio);

                // test de l'existencee de la clé "audio et même comportement que plus haut"
                } else if (data[0]["phonetics"][0]["audio"]=="") {
                    
                    console.log("test");
                   
                    const iconAudio = document.createElement("p");
                    iconAudio.innerText = "🔇";
                    iconAudio.style = containerStyle;
                    selectedContainer.appendChild(iconAudio);



                }else{
                    //sinon récupération du fichier de prononciation
                    const audioSpeaker = data[0]["phonetics"][0]["audio"]
                    
                    console.log(audioSpeaker);
                    // création de l'élément cliquable de lancement du son
                    const iconAudio = document.createElement("p")
                    iconAudio.innerHTML = "&#128266"
                    iconAudio.style = containerStyle;

                    selectedContainer.appendChild(iconAudio)

                    //déclenchement de la lecture du ficher son par click sur le HP
                    iconAudio.addEventListener("mousedown", function(){
                        const vocalAudio = document.createElement("audio") 
                        vocalAudio.src = audioSpeaker
                        vocalAudio.play()
                        popup.appendChild(vocalAudio)  
                    })
                }

    

                // déclenchement de l'évènement recherche google par click sur le bouton
                buttonGSearch.addEventListener("mousedown", function() {
                console.log('button clicked');
                const search = `https://www.google.com/search?q=${selectedString}`;
                window.open("https://www.google.com/search?q=" + encodeURIComponent(selectedString))
                // chrome.tabs.create({ url : search});
                })

        
               
            } else{
                // si on a une erreur 404 --> URL non trouvée, on renvoit le message "Couldn't find definition"
                const motErreur = "Couldn't find definition"
                console.log(motErreur);
                defintionContainer.innerText = motErreur;
            }

            // évènement de fermetures de la popup
            window.addEventListener("scroll",() => popup.remove());
            window.addEventListener("resize",() => popup.remove());
            // window.addEventListener("click", () => popup.remove());
        
        // }, 5000)

        } 
       

        // condition d'erreur
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