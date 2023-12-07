function addOrUpdateEndpointParameter(url, key, value) {
  var updatedUrl = url.replace(new RegExp('([?&])' + key + '=.*?(&|$)'), '$1' + key + '=' + encodeURIComponent(value) + '$2');

  if (url.indexOf(key + '=') === -1) {
      // Se o parâmetro não existir, adicione
      updatedUrl += (updatedUrl.indexOf('?') === -1 ? '?' : '&') + key + '=' + encodeURIComponent(value);
  }

  return updatedUrl;
}

function removeEndpointParameterValue(url, key) {
  // Substitua o valor do parâmetro por uma string vazia
  var updatedUrl = url.replace(new RegExp('([?&])' + key + '=.*?(&|$)'), '$1' + key + '=$2');

  return updatedUrl;
}
export { addOrUpdateEndpointParameter, removeEndpointParameterValue}