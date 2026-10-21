// Pure request validation and routing so the contact API can be tested without AWS.
const services = Object.freeze({
  cloud: 'Cloud architecture & platform engineering',
  migration: 'Cloud migration & modernization',
  security: 'Security, governance & readiness',
  reliability: 'Reliability, operations & cost',
  ai: 'AI infrastructure planning',
  unsure: 'Not sure yet'
});
function reply(statusCode, message, ok = false) {
  return { statusCode, headers: { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' }, body: JSON.stringify({ok,message}) };
}
function plain(value) { return String(value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'').trim(); }
export function validate(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const {name,email,service,message,consent,companyWebsite,turnstileToken} = payload;
  if (![name,email,service,message,companyWebsite,turnstileToken].every(v=>typeof v==='string')) return null;
  const cleanName=plain(name).replace(/[\r\n]+/g,' ').replace(/\s+/g,' '), cleanMail=plain(email), cleanMessage=plain(message);
  if (cleanName.length < 2 || cleanName.length > 90 || cleanMail.length > 180 || cleanMessage.length < 20 || cleanMessage.length > 2000) return null;
  if (!/^[^\s@\r\n<>]+@[^\s@\r\n<>]+\.[^\s@\r\n<>]+$/.test(cleanMail)) return null;
  if (!(service in services) || consent !== true || companyWebsite.length > 250 || turnstileToken.length < 20 || turnstileToken.length > 4000) return null;
  return {name:cleanName,email:cleanMail,service,serviceLabel:services[service],message:cleanMessage,turnstileToken,honeypot:companyWebsite.trim().length>0};
}
export function makeHandler({allowedOrigin,sendEmail,verifyTurnstile}) {
  if (!allowedOrigin || typeof sendEmail!=='function' || typeof verifyTurnstile!=='function') throw new Error('Missing contact configuration');
  return async function handler(event = {}) {
    const headers=Object.fromEntries(Object.entries(event.headers || {}).map(([k,v])=>[k.toLowerCase(),v]));
    if (headers.origin !== allowedOrigin) return reply(403,'Unable to accept this inquiry.');
    if ((event.requestContext?.http?.method || event.httpMethod) !== 'POST') return reply(405,'Method not allowed.');
    if (!/^application\/json(?:\s*;|$)/i.test(headers['content-type'] || '')) return reply(415,'Expected JSON request.');
    let raw=event.body || '';
    if (event.isBase64Encoded) { try { raw=Buffer.from(raw,'base64').toString('utf8'); } catch { return reply(400,'Invalid request.'); } }
    if (Buffer.byteLength(raw,'utf8') > 8500) return reply(413,'Request exceeds the permitted size.');
    let input;
    try { input=JSON.parse(raw); } catch { return reply(400,'Invalid request.'); }
    const result=validate(input);
    if (!result) return reply(422,'Please check the required fields and try again.');
    if (result.honeypot) return reply(422,'Unable to process this inquiry.');
    let challengeValid=false;
    try { challengeValid=await verifyTurnstile(result.turnstileToken, event.requestContext?.http?.sourceIp || ''); }
    catch { return reply(503,'The spam-protection service is temporarily unavailable.'); }
    if (!challengeValid) return reply(403,'Spam protection could not verify the request. Please try again.');
    try { await sendEmail(result); }
    catch { return reply(503,'Your message could not be confirmed as delivered. Please try again later.'); }
    return reply(200,'Your inquiry was accepted for email delivery.',true);
  };
}
