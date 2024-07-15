document.addEventListener('DOMContentLoaded', function() {
    fetch('/notes') 
        .then(response => response.json())
        .then(data => {
            const notesList = document.getElementById('notes-list');
            data.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');

                const titleElement = document.createElement('h2');
                titleElement.textContent = note.title;

                const contentElement = document.createElement('p');
                contentElement.textContent = note.content;

                const tagsElement = document.createElement('p');
                tagsElement.textContent = `Tags: ${note.tag.join(', ')}`;

                noteElement.appendChild(titleElement);
                noteElement.appendChild(contentElement);
                noteElement.appendChild(tagsElement);

                notesList.appendChild(noteElement);
            });
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
        });
});