document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    noteDelete(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const parent = event.target.closest('li');
    const value = parent.getElementsByTagName('span')[0].innerText;
    const title = prompt('Write new title', value);
    if (title && title != value) {
      const data = { id, title };
      notePatch(data).then(() => {
        parent.getElementsByTagName('span')[0].innerText = data.title;
      });
    }
  }
});

async function noteDelete(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function notePatch(data) {
  await fetch(`/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
