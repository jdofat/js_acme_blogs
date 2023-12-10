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
    if (!usersData) {
        return undefined;
    };

    let selectMenu = document.getElementById('selectMenu');
    let optionElements = createSelectOptions(usersData);

     for (const option of optionElements) {
        selectMenu.appendChild(option);
    }

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

/* 11. getUserPosts */

async function getUserPosts(userId) {
    if (!userId) {
        return undefined;
    };
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        let postData = await response.json();
        return postData;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
};

/* 12. getUser */

async function getUser(userId) {
    if (!userId) {
        return undefined;
    };
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

/* 13. getPostComments */

async function getPostComments(postId) {
    if (!postId) {
        return undefined;
    };
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        let commentsData = await response.json();
        return commentsData;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

/* 14. displayComments */

async function displayComments(postId) {
    if (!postId) {
        return undefined;
    };
    let section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');

    try {
        let comments = await getPostComments(postId);
        let fragment = createComments(comments);

        section.appendChild(fragment);
        return section;
    } catch (error) {
        console.error('Error displaying comments:', error);
        throw error;
    }
};

/* 15. createPosts */

async function createPosts(postsData) {
    if (!postsData) {
        return undefined;
    };
    
    let fragment = document.createDocumentFragment();

    for (let post of postsData) {
        let article = document.createElement('article');
        let h2 = createElemWithText('h2', post.title);
        let bodyParagraph = createElemWithText('p', post.body);
        let postIdParagraph = createElemWithText('p', `Post ID: ${post.id}`);

        let author = await getUser(post.userId);
        let authorParagraph = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        let catchPhrase = createElemWithText('p', author.company.catchPhrase);

        let showCommentsButton = document.createElement('button');
        showCommentsButton.textContent = 'Show Comments';
        showCommentsButton.dataset.postId = post.id;

        article.appendChild(h2);
        article.appendChild(bodyParagraph);
        article.appendChild(postIdParagraph);
        article.appendChild(authorParagraph);
        article.appendChild(catchPhrase);
        article.appendChild(showCommentsButton);

        let commentsSection = await displayComments(post.id);
        article.appendChild(commentsSection);

        fragment.appendChild(article);
    };
    return fragment;
};


/* 16. displayPosts */

let displayPosts = async (postsData) => {
    let mainElement = document.querySelector("main");
    let element = (postsData) 
    ? await createPosts(postsData)
     : document.querySelector("main p");
     mainElement.append(element);
     return element; 
    };

/* 17. toggleComments */

let toggleComments = async (clickEventListener, postId) => {
    if (!clickEventListener instanceof Event) {
        return;
    }
    if (!postId) {
        return;
    }
    clickEventListener.target.listener = true;
    
    return [toggleCommentSection(postId), toggleCommentButton(postId)];
};


/* 18. refreshPosts */

async function refreshPosts(postsData) {
    let removeButtons = removeButtonListeners();
    let mainElement = document.querySelector('main');
    let main = deleteChildElements(mainElement);
    let fragment = await displayPosts(postsData);
    let addButtons = addButtonListeners();

    return [removeButtons, main, fragment, addButtons];
};

/* 19. selectMenuChangeEventHandler */

async function selectMenuChangeEventHandler(event) {
    let selectMenu = event.target;
    selectMenu.disabled = true;

    const userId = event.target.value || 1;

    const posts = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(posts);

    selectMenu.disabled = false;

    return [userId, posts, refreshPostsArray];
};

/* 20. initPage */

async function initPage() {
    const users = await getUsers();
    const select = populateSelectMenu(users);

    return [users, select];
};

/* 21. initApp */

function initApp() {
    const [users, select] = initPage();
    const selectMenu = document.getElementById('selectMenu');

    selectMenu.addEventListener('change', selectMenuChangeEventHandler);
};