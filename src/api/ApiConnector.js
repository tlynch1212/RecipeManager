
export function createRecipe(recipe, token){
    return fetch('https://localhost:32770/recipe', {
        method: 'post',
        body: JSON.stringify(recipe),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      }).then(function(response) {
        return response;
      });
}