// Function to create a new element in the dropzone
function createNewElement(elementType, content) {
  const dropzone = document.getElementById('dropzone');

  const elementContainer = document.createElement('div');
  elementContainer.classList.add('element-container');
  elementContainer.setAttribute('draggable', 'true');

  let elementContent;
  switch (elementType) {
    case 'text':
      elementContent = document.createTextNode(content);
      break;
    case 'image':
      elementContent = document.createElement('img');
      elementContent.setAttribute('src', content);
      break;
    case 'video':
      elementContent = document.createElement('iframe');
      elementContent.setAttribute('src', content);
      break;
    default:
      break;
  }

  elementContainer.appendChild(elementContent);
  dropzone.appendChild(elementContainer);

  // Add event listener for editing or deleting the element
  elementContainer.addEventListener('click', handleElementClick);
}

// Function to handle editing or deleting the element
function handleElementClick(event) {
  const elementContainer = event.target.closest('.element-container');

  // Check if the element is clicked for editing or deleting
  if (event.target === elementContainer) {
    // Edit element code goes here
    console.log('Edit element');
  } else {
    // Delete element code goes here
    console.log('Delete element');
    elementContainer.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for drag and drop functionality
  const elements = document.getElementsByClassName('element');
  Array.from(elements).forEach(element => {
    element.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', event.target.dataset.type);
    });
  });

  const dropzone = document.getElementById('dropzone');
  dropzone.addEventListener('dragover', event => {
    event.preventDefault();
  });

  dropzone.addEventListener('drop', event => {
    event.preventDefault();
    const elementData = event.dataTransfer.getData('text/plain');
    let elementContent;
    if (elementData === 'text') {
      elementContent = prompt('Enter text content:');
    } else if (elementData === 'image') {
      elementContent = prompt('Enter image URL:');
    } else if (elementData === 'video') {
      elementContent = prompt('Enter video URL:');
    }
    createNewElement(elementData, elementContent);
  });
});
