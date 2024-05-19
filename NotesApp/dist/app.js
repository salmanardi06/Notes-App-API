class NoteList extends HTMLElement {
  constructor() {
    super();
    this.notesData = JSON.parse(localStorage.getItem('notes')) || [
      {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Welcome to Notes, Dimas!',
        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
      },
      {
        id: 'notes-aB-cdefg12345',
        title: 'Meeting Agenda',
        body: 'Discuss project updates and assign tasks for the upcoming week.',
        createdAt: '2022-08-05T15:30:00.000Z',
        archived: false,
      },
      {
        id: 'notes-XyZ-789012345',
        title: 'Shopping List',
        body: 'Milk, eggs, bread, fruits, and vegetables.',
        createdAt: '2022-08-10T08:45:23.120Z',
        archived: false,
      },
      {
        id: 'notes-1a-2b3c4d5e6f',
        title: 'Personal Goals',
        body: 'Read two books per month, exercise three times a week, learn a new language.',
        createdAt: '2022-08-15T18:12:55.789Z',
        archived: false,
      },
      {
        id: 'notes-LMN-456789',
        title: 'Recipe: Spaghetti Bolognese',
        body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
        createdAt: '2022-08-20T12:30:40.200Z',
        archived: false,
      },
      {
        id: 'notes-QwErTyUiOp',
        title: 'Workout Routine',
        body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
        createdAt: '2022-08-25T09:15:17.890Z',
        archived: false,
      },
      {
        id: 'notes-abcdef-987654',
        title: 'Book Recommendations',
        body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: '2022-09-01T14:20:05.321Z',
        archived: false,
      },
      {
        id: 'notes-zyxwv-54321',
        title: 'Daily Reflections',
        body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
        createdAt: '2022-09-07T20:40:30.150Z',
        archived: false,
      },
      {
        id: 'notes-poiuyt-987654',
        title: 'Travel Bucket List',
        body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
        createdAt: '2022-09-15T11:55:44.678Z',
        archived: false,
      },
      {
        id: 'notes-asdfgh-123456',
        title: 'Coding Projects',
        body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
        createdAt: '2022-09-20T17:10:12.987Z',
        archived: false,
      },
      {
        id: 'notes-5678-abcd-efgh',
        title: 'Project Deadline',
        body: 'Complete project tasks by the deadline on October 1st.',
        createdAt: '2022-09-28T14:00:00.000Z',
        archived: false,
      },
      {
        id: 'notes-9876-wxyz-1234',
        title: 'Health Checkup',
        body: 'Schedule a routine health checkup with the doctor.',
        createdAt: '2022-10-05T09:30:45.600Z',
        archived: false,
      },
      {
        id: 'notes-qwerty-8765-4321',
        title: 'Financial Goals',
        body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
        createdAt: '2022-10-12T12:15:30.890Z',
        archived: false,
      },
      {
        id: 'notes-98765-54321-12345',
        title: 'Holiday Plans',
        body: 'Research and plan for the upcoming holiday destination.',
        createdAt: '2022-10-20T16:45:00.000Z',
        archived: false,
      },
      {
        id: 'notes-1234-abcd-5678',
        title: 'Language Learning',
        body: 'Practice Spanish vocabulary for 30 minutes every day.',
        createdAt: '2022-10-28T08:00:20.120Z',
        archived: false,
      },
    ];
    this.render();
    this.loadNotes();
  }

  connectedCallback() {
    this.render();
    this.loadNotes();
  }

  async loadNotes() {
    this.showLoadingIndicator(); 
    const storedNotes = await JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      this.notesData = storedNotes;
      this.render();
      this.hideLoadingIndicator();
    }
  }
  
  render() {
    this.innerHTML = '';
    const notesContainer = document.createElement('div');
    notesContainer.classList.add('note-list');

    this.notesData.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <p>Created At: ${note.createdAt}</p>
        <button class="delete-note" data-id="${note.id}">Delete</button>
      `;
      notesContainer.appendChild(noteElement);
    });

    this.appendChild(notesContainer);
  }

  showLoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    loadingIndicator.textContent = 'Loading...';
    this.appendChild(loadingIndicator);
  }

  hideLoadingIndicator() {
    const loadingIndicator = this.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

  addNoteToList(title, body) {
    this.showLoadingIndicator();
    
    setTimeout(() => {
        const newNote = {
            id: `note-${Date.now()}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
        };
        
        this.notesData.unshift(newNote);
        this.saveData();
        this.render();
        
        this.hideLoadingIndicator();
        
        alert('Catatan berhasil ditambahkan');
    }, 2000);
}

deleteNoteFromList(id) {
  const confirmation = confirm('Ingin menghapus catatan?');

  if (confirmation) {
      this.showLoadingIndicator();
      
      setTimeout(() => {
          this.notesData = this.notesData.filter(note => note.id !== id);
          this.saveData();
          this.render();

          this.hideLoadingIndicator();
      }, 2000);
  }
}

  saveData() {
    localStorage.setItem('notes', JSON.stringify(this.notesData));
  }
}

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.innerHTML = `
      <form id="note-form" class="note-form">
        <input type="text" id="note-title" placeholder="Judul" required>
        <textarea id="note-body" placeholder="Tulis catatanmu disini..." required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;
  }

  attachEvents() {
    const form = this.querySelector('#note-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const titleInput = this.querySelector('#note-title');
      const bodyInput = this.querySelector('#note-body');
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title && body) {
        const noteList = document.querySelector('note-list');
        noteList.addNoteToList(title, body);
        titleInput.value = '';
        bodyInput.value = '';
      } else {
        alert('Judul dan isi catatan tidak boleh kosong!');
      }
    });
  }
}

class NoteFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <p>&copy; 2024 Muhamad Salman Ardiyansyah_F-15_Dicoding</p>
      </footer>
    `;
  }
}

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading-container {
          display: none; /* Diatur menjadi none secara default */
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 9999;
        }
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #7986CB;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="loading-container">
        <div class="loading-spinner"></div>
      </div>
    `;
  }
}

customElements.define('note-footer', NoteFooter);
customElements.define('note-list', NoteList);
customElements.define('note-form', NoteForm);

document.addEventListener('click', event => {
  if (event.target.classList.contains('delete-note')) {
    const noteId = event.target.getAttribute('data-id');
    const noteList = document.querySelector('note-list');
    noteList.deleteNoteFromList(noteId);
  }
});