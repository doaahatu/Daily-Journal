document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addEntryBtn = document.getElementById('addEntryBtn');
    const modal = document.getElementById('entryModal');
    const closeBtn = document.querySelector('.close-btn');
    const journalForm = document.getElementById('journalForm');
    const entryTitle = document.getElementById('entryTitle');
    const entryContent = document.getElementById('entryContent');
    const entriesContainer = document.getElementById('entriesContainer');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const modalTitle = document.getElementById('modalTitle');
    
    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    let currentEditingId = null;
    
    // Initialize the app
    displayEntries();
    
    // Event Listeners
    addEntryBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    journalForm.addEventListener('submit', handleSubmit);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Functions
    function openModal() {
        modal.style.display = 'block';
        currentEditingId = null;
        journalForm.reset();
        modalTitle.textContent = 'New Entry';
        entryTitle.focus();
    }
    
    function closeModal() {
        modal.style.display = 'none';
    }
    
    function displayEntries(entriesToDisplay = entries) {
        entriesContainer.innerHTML = '';
        
        if (entriesToDisplay.length === 0) {
            entriesContainer.innerHTML = '<div class="no-entries">No entries found. Click "Add New Entry" to start!</div>';
            return;
        }
        
        // Sort entries by date (newest first)
        const sortedEntries = [...entriesToDisplay].sort((a, b) => b.id - a.id);
        
        sortedEntries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'entry';
            entryElement.innerHTML = `
                <h3>${entry.title}</h3>
                <p>${entry.content}</p>
                <div class="entry-date">${new Date(entry.id).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</div>
                <div class="entry-actions">
                    <button class="edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-btn" data-id="${entry.id}">Delete</button>
                </div>
            `;
            entriesContainer.appendChild(entryElement);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEdit);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDelete);
        });
    }
    
    function saveEntry(title, content, id = null) {
        const newEntry = {
            id: id || Date.now(),
            title,
            content
        };
        
        if (id) {
            // Update existing entry
            const index = entries.findIndex(entry => entry.id === id);
            if (index !== -1) {
                entries[index] = newEntry;
            }
        } else {
            // Add new entry
            entries.unshift(newEntry);
        }
        
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        displayEntries();
        closeModal();
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        const title = entryTitle.value.trim();
        const content = entryContent.value.trim();
        
        if (!title || !content) {
            alert('Please fill in both title and content');
            return;
        }
        
        saveEntry(title, content, currentEditingId);
    }
    
    function handleEdit(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const entry = entries.find(entry => entry.id === id);
        
        if (entry) {
            entryTitle.value = entry.title;
            entryContent.value = entry.content;
            currentEditingId = entry.id;
            modalTitle.textContent = 'Edit Entry';
            modal.style.display = 'block';
            entryTitle.focus();
        }
    }
    
    function handleDelete(e) {
        if (confirm('Are you sure you want to delete this entry?')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            entries = entries.filter(entry => entry.id !== id);
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            displayEntries();
            
            if (currentEditingId === id) {
                closeModal();
                currentEditingId = null;
            }
        }
    }
    
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            displayEntries();
            return;
        }
        
        const filteredEntries = entries.filter(entry => 
            entry.title.toLowerCase().includes(searchTerm) || 
            entry.content.toLowerCase().includes(searchTerm)
        );
        
        displayEntries(filteredEntries);
    }
});