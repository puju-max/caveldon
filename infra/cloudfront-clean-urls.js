// CloudFront Functions viewer-request example for Astro static routes.
// When CloudFront uses a private S3 REST origin with OAC, S3 will not
// automatically turn /insights/ into /insights/index.html.
// Test in a staging distribution before publishing.
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.substring(uri.lastIndexOf('/') + 1).includes('.')) {
    request.uri += '/index.html';
  }
  return request;
}
