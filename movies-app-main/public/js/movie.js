document.addEventListener('DOMContentLoaded', () => {
 
    const recipeBtn = document.getElementById('recipeBtn');

    if (recipeBtn) {
        recipeBtn.addEventListener('click', async () => {
            const movieId = recipeBtn.dataset.movieId;
            console.log('Fetching recipe for movie ID:', movieId); // Debug log
            
            try {
                const response = await fetch(`/movies/${movieId}/recipe`);
                console.log('Response status:', response.status); // Debug log
                
                // Check if the response is ok (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Recipe data:', data); // Debug log
                
                alert(`🎬 ${data.movie}\n🍿 Snacks: ${data.snack}\n✨ ${data.mood}`);
            } catch (error) {
                console.error('Recipe fetch error:', error);
                alert('Could not fetch movie recipe');
            }
        });
    } else {
        console.log('Recipe button not found on this page');
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