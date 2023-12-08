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
function toggleComments(event, postId) {
};

function addButtonListeners() {
    let buttons = document.querySelectorAll('main button');
  
    if (buttons) {
      buttons.forEach(button => {
        let postId = button.dataset.postId;
        if (postId) {
          button.addEventListener('click', function(event) {
            toggleComments(event, postId);
          });
        }
      });
    }
    return buttons;
  };
    
/* 7. removeButtonListeners */

function removeButtonListeners() {
    let buttons = document.querySelectorAll('main button');

    if (buttons) {
        buttons.forEach(button => {
            let postId = button.dataset.id;
            if (postId) {
                button.removeEventListener('click', function(event) {
                    toggleComments(event, postId);
                });
            }
        });
    }
    return buttons;
};


/* 8. createComments */

function createComments(commentsData) {
    if (!commentsData) return undefined;
    let fragment = document.createDocumentFragment();

    commentsData.forEach(comment => {
        let article = document.createElement('article');
        let nameHeader = createElemWithText('h3', comment.name);
        let bodyParagraph = createElemWithText('p', comment.body);
        let emailParagraph = createElemWithText('p', `From: ${comment.email}`);

        article.appendChild(nameHeader);
        article.appendChild(bodyParagraph);
        article.appendChild(emailParagraph);

        fragment.appendChild(article);
    });

    return fragment;
};

/* 9. populateSelectMenu */

function populateSelectMenu(usersData) {
    let selectMenu = document.getElementById('selectMenu');
    let optionElements = createSelectOptions(usersData);

    optionElements.forEach(option => {
        selectMenu.appendChild(option);
    });

    return selectMenu;
};

/* 10. getUsers */

async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Unable to fetch data');
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching users data:', error);
        return null;
    }
};
/*  */

/*   */
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


