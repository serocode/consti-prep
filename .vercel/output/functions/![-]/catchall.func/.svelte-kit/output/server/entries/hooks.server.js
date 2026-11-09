const handle = ({ event, resolve }) => resolve(event, {
  transformPageChunk: ({ html }) => html.replaceAll("%site_origin%", event.url.origin)
});
export {
  handle
};
