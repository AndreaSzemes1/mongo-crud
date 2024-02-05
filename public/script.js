function addToReadingList(bookId, buttonElement, event) {
    event.preventDefault();
    fetch(`/readinglist/add/${bookId}`, { 
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({})
    }).then(response => { 
        if (response.ok) {
            buttonElement.disabled = true;
            buttonElement.innerText = 'Added';
        } else {
            alert('Failed to add the book to the reading list');
        }
    }).catch(error => console.error(error));
}

function markAsRead(bookId) {
    fetch(`/readinglist/remove/${bookId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            const element = document.getElementById(bookId);
            element.parentNode.removeChild(element);
        } else {
            console.error('Failed to remove item from reading list');
        }
    }).catch(error => console.error('Error', error));
}

function deleteAllBooks() {
    fetch(`/readinglist/deleteAll`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            const listContainer = document.getElementById('readingList-container');
            listContainer.parentNode.removeChild(listContainer);
        } else {
            console.error('Failed to remove books from list');
        }
    }).catch(error => console.error('Error', error));
}

function editReview(reviewId) {
    document.getElementById(`review-content-${reviewId}`).style.display = 'none';
    document.getElementById(`edit-review-${reviewId}`).style.display = 'block';
    document.querySelector(`#review-${reviewId} button[onclick^='editReview']`).style.display = 'none';
    document.querySelector(`#review-${reviewId} button[onclick^='saveReview']`).style.display = 'inline-block';
}

function saveReview(reviewId) {
    const updatedText = document.getElementById(`edit-review-${reviewId}`).value;

        // Hide input field, show static text
    document.getElementById(`review-content-${reviewId}`).textContent = updatedText;
    document.getElementById(`edit-review-${reviewId}`).style.display = 'none';
    document.getElementById(`review-content-${reviewId}`).style.display = 'block';
    document.querySelector(`#review-${reviewId} button[onclick^='editReview']`).style.display = 'inline-block';
    document.querySelector(`#review-${reviewId} button[onclick^='saveReview']`).style.display = 'none';


    fetch(`/books/update/${reviewId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedText.trim() })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Review updated:', data);
    })
    .catch(error => {
        console.error('Error updating review:', error);
    })
}

function deleteReview(bookId, reviewId) {
    fetch(`/books/${bookId}/delete/${reviewId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const container = document.getElementById(`review-${reviewId}`);
        container.parentNode.removeChild(container);
        return response.json();
    })
    .then(data => {
        console.log('Review updated:', data);
    })
    .catch(error => {
        console.error('Error updating review:', error);
    })
}