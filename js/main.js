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
if (!postId) {
    return undefined;
}
    let myEle = document.querySelector(`section[data-post-id="${postId}"]`);
if(myEle){
   myEle.classList.toggle("hide");
   return myEle;
}
else {
    return null;
}
};

/* 4. toggleCommentButton */

function toggleCommentButton (postId) {
    if (!postId) {
        return undefined;
    }
    let myButton = document.querySelector(`button[data-post-id="${postId}"]`);
    if(myButton){
        (myButton.textContent === "Show Comments")
        ? myButton.textContent = "Hide Comments" : myButton.textContent = "Show Comments"; 
    return myButton;
    }
    else {
        return null;
    }
};

/* 5. deleteChildElements */
function deleteChildElements (aParentElement) {
    if (!aParentElement || !(aParentElement instanceof HTMLElement)) {
        return undefined;
    }
let myChild = aParentElement.lastElementChild;
    while (myChild) {
        aParentElement.removeChild(myChild);
        myChild = aParentElement.lastElementChild;
    }
return aParentElement;
};

/* 6. addButtonListeners */
function addButtonListeners() {
    const buttons = document.querySelectorAll('main button');
  
    if (buttons.length > 0) {
      buttons.forEach(button => {
        const postId = button.dataset.postId;
        if (postId) {
          button.addEventListener('click', function(event) {
            toggleComments(event, postId);
          });
        }
      });
    }
  
    return buttons;
  }
  
  function toggleComments(event, postId) {
    // Your logic for toggling comments based on postId goes here
  }
  
    
/**/

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
/**/


