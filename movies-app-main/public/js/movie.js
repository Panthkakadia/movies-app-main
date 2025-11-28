document.addEventListener('DOMContentLoaded', () => {
  
  const deleteForms = document.querySelectorAll('form.delete-movie-form');

  deleteForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      const confirmed = confirm('Are you sure you want to delete this movie?');
      if (!confirmed) {
        event.preventDefault();
      }
    });
  });

});
