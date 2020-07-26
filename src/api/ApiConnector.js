const domain = 'https://localhost:5001'

export function createRecipe(recipe, token){
    return fetch(`${domain}/recipe`, {
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

export function getRecipes(token, userId){
  return fetch(`${domain}/recipe?userId=${userId}`, {
      method: 'get',
      headers: {
          Authorization: `Bearer ${token}`,
      }
    }).then(function(response) {
      return response.json();
    });
}

export function browse(token){
  return fetch(`https://localhost:32770/browse?fetchCount=1000`, {
      method: 'get',
      headers: {
          Authorization: `Bearer ${token}`,
      }
    }).then(function(response) {
      return response.json();
    });
}