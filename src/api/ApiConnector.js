const domain = 'https://localhost:44369'

export function createRecipe(recipe, token) {
  return fetch(`${domain}/recipe`, {
    method: 'post',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response;
  });
}

export function updateRecipe(recipe, token) {
  return fetch(`${domain}/recipe`, {
    method: 'put',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response;
  });
}

export function deleteRecipe(recipe, token) {
  return fetch(`${domain}/recipe`, {
    method: 'delete',
    body: JSON.stringify(recipe),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response;
  });
}

export function unFavoriteRecipe(token, userId, recipeId ) {
  return fetch(`${domain}/recipe/unfavorite`, {
    method: 'put',
    body: JSON.stringify({
      RecipeId: recipeId,
      UserId: userId
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response;
  });
}


export function FavoriteRecipe(recipeId, userId, token) {
  return fetch(`${domain}/recipe/favorite`, {
    method: 'put',
    body: JSON.stringify({
      RecipeId: recipeId,
      UserId: userId
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response;
  });
}

export function RateRecipe(recipe, userId, rating, token) {
  return fetch(`${domain}/rate`, {
    method: 'post',
    body: JSON.stringify({
      UserId: userId,
      RecipeId: recipe.id,
      Rate: rating
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response;
  });
}

export function getUser(token, userId) {
  return fetch(`${domain}/user?userId=${userId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response.json();
  });
}

export function getRating(token, userId, recipeId) {
  return fetch(`${domain}/rate?userId=${userId}&recipeId=${recipeId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    if (response.status === 200){
      return response.json();
    }
  });
}

export function getFavorite(token, userId, recipeId) {
  return fetch(`${domain}/favorite?userId=${userId}&recipeId=${recipeId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    if (response.status === 200){
      return response.json();
    }
  });
}


export function getRecipes(token, userId) {
  return fetch(`${domain}/recipe/user?userId=${userId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response.json();
  });
}

export function getRecipe(token, recipeId) {
  return fetch(`${domain}/recipe?recipeId=${recipeId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response.json();
  });
}

export function recommend(token, userId, fetchCount) {
  return fetch(`${domain}/recommendation/predict?authId=${userId}&amount=${fetchCount}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response.json();
  });
}

export function browse(token) {
  return fetch(`${domain}/browse?fetchCount=100`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(function (response) {
    return response.json();
  });
}