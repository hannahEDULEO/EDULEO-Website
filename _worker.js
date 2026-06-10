export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // HTTP → HTTPS
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // www → ohne www
    if (url.hostname === 'www.eduleo.de') {
      url.hostname = 'eduleo.de';
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);

    // charset im Content-Type Header für HTML-Antworten
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('text/html') && !contentType.includes('charset')) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Content-Type', 'text/html; charset=utf-8');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    return response;
  }
};
