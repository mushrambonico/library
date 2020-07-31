let anchor = document.querySelector('.container');
let newBookBtn = document.querySelector('.new-book-btn');
let myLibrary = [];
newBookBtn.addEventListener('click', createNewBookForm);
testingRender();
//
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.status = function() {
        return this.read ? 'read already' : 'not read yet';
    }
    this.info = function () {
        if (status) {
            var status = "read already";
        } else {
            var status = "not read yet";
        }
        let information = `${title} by${author}, ${pages} pages, ${status}`;
        return information;
    }
}

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    return book;
}
function render(book) {
    let bookContainer = document.createElement('div');
    let bookTitle = document.createElement('div');
    let bookAuthor = document.createElement('div');
    let bookPages = document.createElement('div');
    let bookStatus = document.createElement('div');
    let removeBookBtn = document.createElement('div');
    let silverLine = document.createElement('hr');
    removeBookBtn.innerText = 'Remove Book From Library';
    removeBookBtn.addEventListener('click', removeBookContainer);
    bookStatus.addEventListener('click', function() {
        book.toggleRead();
        bookStatus.innerText = book.status();
    });
    function removeBookContainer() {
        `Acessa o escopo interno de render e remove todo o conteúdo associado ao livro do DOM`
        anchor.removeChild(bookContainer);
    }
    bookContainer.classList.toggle('book-container');
    removeBookBtn.classList.toggle('remove-btn');
    silverLine.classList.toggle('silver-line');
    bookStatus.classList.toggle('link-btn');
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    bookPages.innerText = book.pages;
    bookStatus.innerText = book.status();
    bookContainer.append(bookTitle, bookAuthor, bookPages, bookStatus, removeBookBtn);
    anchor.append(bookContainer, silverLine);
}
`Criando alguns mock books e adicionando a library para testar a função render`
function testingRender() {
    let theHobbit = new Book('The Hobbit', 'Tolkien', '295', true);
    let domCasmurro = new Book('Dom Casmurro', 'Machado de Assis', '333', true);
    let polvo = new Book('O mundo do Polvo', 'Polvo Humano', '3930339', true);
    addBookToLibrary(theHobbit);
    addBookToLibrary(domCasmurro);
    addBookToLibrary(polvo);
    for (var book in myLibrary) {
        render(myLibrary[book]);
    }
}
function createNewBookForm() {
    `Event listener associado ao botão de adicionar livros`
    newBookBtn.classList.toggle('hidden'); // Remove o botão do DOM com display: none
    let form = document.querySelector('.new-book-form'); 
    form.classList.toggle('hidden'); // Faz o form aparecer retirando display: none
    document.querySelector('body').classList.toggle('shadow-bg'); // Deixa o BG com aspecto 'shadow'
    anchor.classList.toggle('shadow-bg');
    form.addEventListener('submit', submitNewBookForm);
}
function submitNewBookForm(event) {
    `Event listener disparado quando apertar o botão submit do form`
    event.preventDefault();
    let form = document.querySelector('.new-book-form');
    let book = new Book(
        document.getElementById('title').value,
        document.getElementById('author').value,
        document.getElementById('pages').value,
        document.getElementById('read').checked
        );
    addBookToLibrary(book);
    render(book);
    form.classList.toggle('hidden');
    newBookBtn.classList.toggle('hidden');
}