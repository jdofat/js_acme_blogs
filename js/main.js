/* 1. createElemWithText */
function createElemWithText (stringOne="p", textContent="", firstClassName) {
    let elText = document.createElement(stringOne);
    elText.innerHTML = textContent;
    if (firstClassName) {
        elText.className = firstClassName;
    };
    return elText;
}

/* 2. createSelectOptions */
function createSelectOptions (userData) {
    if (!userData) {
        return ;
    }
    let myOptionsArray = [];
    for (let i = 0; i < userData.length; i++) {
        let opt = document.createElement("option");
        opt.value = userData[i].id;
        opt.textContent = userData[i].name;
        myOptionsArray.push(opt); 
        }
    return myOptionsArray;
};

/* 3. toggleCommentSection */

function toggleCommentSection (postId) {
if !(postId) {
    return undefined;
}
    let myEle = document.getElementById(postId);
if(myEle){
   myEle.classList.toggleCommentSection();
   return myEle;
}
else {
    return null;
}
};

/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**//**/
/**/
/**/
/**//**/
/**/
/**/
/**//**/
/**/
/**/
/**//**/
/**/
/**/
/**//**/
/**/
/**/
/**/


