document.addEventListener('DOMContentLoaded', function() {
    fetch('/notes') 
        .then(response => response.json())
        .then(data => {
            const notesList = document.getElementById('notes-list');
            data.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');

                const idElement = document.createElement('p');
                idElement.textContent = `Note ID: ${note.id}`;

                const titleElement = document.createElement('h3');
                titleElement.textContent = note.title;

                const contentElement = document.createElement('p');
                contentElement.textContent = note.content;

                const tagsElement = document.createElement('p');
                tagsElement.textContent = `Tags: ${note.tag.join(', ')}`;

                const updateDateElement = document.createElement('p');
                updateDateElement.textContent = `Last Updated: ${new Date(note.updateDate).toLocaleString()}`;

                const editButton = document.createElement('button');
                editButton.classList.add('notes-btns');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    window.location.href = `editnote.html?id=${note.id}&title=${encodeURIComponent(note.title, noteElement)}&content=${encodeURIComponent(note.content, noteElement)}&tag=${encodeURIComponent(note.tag.join(','), noteElement)}`;
                });

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('notes-btns');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteNote(note.id, noteElement));

              

                
                noteElement.appendChild(titleElement);
                noteElement.appendChild(contentElement);
                noteElement.appendChild(tagsElement);
                noteElement.appendChild(updateDateElement);
                noteElement.appendChild(idElement);
                noteElement.appendChild(editButton);
                noteElement.appendChild(deleteButton);
                

                notesList.appendChild(noteElement);
            });
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
        });

    const params = new URLSearchParams(window.location.search);
    const noteId = params.get('id');
    const title = params.get('title');
    const content = params.get('content');
    const tag = params.get('tag');

    if (noteId) {
        document.getElementById('note-id').value = noteId;
        document.getElementById('title').value = decodeURIComponent(title);
        document.getElementById('content').value = decodeURIComponent(content);
        document.getElementById('tag').value = decodeURIComponent(tag);
    }

    const form = document.getElementById('note-form1');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = document.getElementById('note-id').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const tag = document.getElementById('tag').value.split(',').map(tag => tag.trim());

        const method = 'PUT';
        const url = `/notes/${id}`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, tag })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                window.location.href = 'index.html';
            }
        })
        .catch(error => console.error('Error updating note', error));
    });
});

function deleteNote(noteId, noteElement) {
    fetch(`/notes/${noteId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            noteElement.remove(); // 
            console.log('Note deleted successfully');
        } else {
            console.error('Error deleting the note');
        }
    })
    .catch(error => console.error('Error:', error));
}