document.addEventListener('DOMContentLoaded', () => {
 
const recipeBtn = document.getElementById('recipeBtn');

if (recipeBtn) {
    recipeBtn.addEventListener('click', async () => {
        const movieId = recipeBtn.dataset.movieId;
        try {
            const response = await fetch(`/movies/${movieId}/recipe`);
            const data = await response.json();
            alert(`🎬 ${data.movie}\n🍿 Snacks: ${data.snack}\n✨ ${data.mood}`);
        } catch (error) {
            alert('Could not fetch movie recipe');
        }
    });
}

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
