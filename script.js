async function MakeRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Error fetching data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function RenderItems(result) {
    const container = document.getElementById('posts-container');
    container.innerHTML = "";

    result.map((item) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML =  `
            <img width="50px" src="${item.avatar}" alt="">
            <div class="post-content">
            <h1>${item.id}</h1>
                <h2>${item.name}</h2>
                <p>${item.desprition}</p>
            </div>
            <button class="delete-button" onclick="deleteData('${item.id}')">Deleteee</button
        `;

        container.appendChild(postElement);
    });
}

async function FetchData() {
    const url = 'https://63d304794abff88834170d21.mockapi.io/ss';
    try {
        const result = await MakeRequest(url);
        RenderItems(result);
    } catch (error) {
        console.log(error);
    }
}

async function updateData() {
    const id = document.getElementById('idInput').value;
    const url = `https://63d304794abff88834170d21.mockapi.io/ss/${id}`;
    
    const newData = {
        "name": document.getElementById('nameInput').value,
        "age": "12",  
        "adress": "213",  
        "avatar": document.getElementById('imgInput').value,
        "desprition": document.getElementById('descriptionInput').value  
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            console.log('Error updating data');
        } else {
            console.log('Data updated successfully');
            FetchData(); 
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id) {
    const url = `https://63d304794abff88834170d21.mockapi.io/ss/${id}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.log('Error deleting data');
        } else {
            console.log('Data deleted successfully');
            FetchData(); 
        }
    } catch (error) {
        console.log(error);
    }
}


async function createPost() {
    const url = 'https://63d304794abff88834170d21.mockapi.io/ss';
    
    const newPostData = {
        "name": document.getElementById('newPostNameInput').value,
        "age": "12",  
        "adress": "213",  
        "avatar": document.getElementById('newPostImgInput').value,
        "desprition": document.getElementById('newPostDescriptionInput').value
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPostData)
        });

        if (!response.ok) {
            console.log('Error creating post');
        } else {
            console.log('Post created successfully');
            FetchData(); 
        }
    } catch (error) {
        console.log(error);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    FetchData();
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
