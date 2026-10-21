(() => {
  'use strict';
  const form = document.getElementById('contact-real-form');
  const submit = document.getElementById('c-submit');
  const feedback = document.getElementById('contact-feedback');
  if (!form || !submit || !feedback) return;
  const endpoint = form.dataset.endpoint?.trim() || '';
  const siteKey = form.dataset.sitekey?.trim() || '';
  const active = Boolean(endpoint && siteKey);
  const originalLabel = submit.innerHTML;

  function message(text, state = '') {
    feedback.textContent = text;
    feedback.dataset.state = state;
  }
  function valid() {
    form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
    if (form.checkValidity()) return true;
    const first = [...form.elements].find(el => typeof el.checkValidity === 'function' && !el.checkValidity());
    if (first) { first.setAttribute('aria-invalid', 'true'); first.focus(); }
    message('Please complete the required fields and check the email address and message length.', 'error');
    return false;
  }
  function draft(data) {
    const serviceNames = {
      cloud: 'Cloud architecture & platform engineering',
      migration: 'Cloud migration & modernization',
      security: 'Security, governance & readiness',
      reliability: 'Reliability, operations & cost',
      ai: 'AI infrastructure planning',
      unsure: 'Not sure yet'
    };
    return `CAVELDON: message draft\n\nName: ${data.name}\nEmail: ${data.email}\nArea: ${serviceNames[data.service] || data.service}\n\nProject context:\n${data.message}\n\nDraft only: not sent or stored by the website.`;
  }
  async function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    window.prompt('Copy your message draft, then close this window:', text);
    return false;
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    message('');
    if (!valid()) return;
    const fields = new FormData(form);
    const data = {
      name: String(fields.get('name') || '').trim(),
      email: String(fields.get('email') || '').trim(),
      service: String(fields.get('service') || ''),
      message: String(fields.get('message') || '').trim(),
      consent: fields.get('consent') === 'on',
      companyWebsite: String(fields.get('companyWebsite') || '')
    };
    if (data.message.length < 20) { message('Please provide a little more context (at least 20 characters).', 'error'); return; }
    submit.disabled = true;
    submit.textContent = active ? 'Sending…' : 'Copying…';
    try {
      if (!active) {
        const copied = await copy(draft(data));
        message(copied ? 'Message copied. Nothing was sent or stored.' : 'Nothing was sent or stored. Copy the draft from the dialog.', 'success');
        window.cvTrack?.(copied ? 'Message draft copied' : 'Message draft displayed', { service: data.service });
        return;
      }
      const captcha = String(fields.get('cf-turnstile-response') || '');
      if (!captcha) { message('Please complete the spam-protection check before sending.', 'error'); return; }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({...data, turnstileToken: captcha}),
        mode: 'cors',
        cache: 'no-store',
        signal: AbortSignal.timeout(20000)
      });
      let result = {};
      try { result = await response.json(); } catch { /* Fail with generic message below. */ }
      if (!response.ok || result.ok !== true) {
        message(result.message || 'Your inquiry could not be sent. Please try again later.', 'error');
        return;
      }
      window.cvTrack?.('Message sent', { service: data.service });
      form.reset();
      window.turnstile?.reset();
      message('Thanks, your message is on its way. We’ll reply within one working day.', 'success');
    } catch {
      message('Could not reach the inquiry service. Your message was not confirmed as sent. Please retry later.', 'error');
    } finally {
      submit.disabled = false;
      submit.innerHTML = originalLabel;
    }
  });
})();
