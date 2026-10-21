import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { makeHandler } from './core.mjs';

const ses = new SESv2Client({});
const secrets = new SecretsManagerClient({});
const origin = process.env.CONTACT_ALLOWED_ORIGIN;
const notify = process.env.CONTACT_NOTIFICATION_EMAIL;
const from = process.env.CONTACT_SENDER_EMAIL;
const secretArn = process.env.CONTACT_TURNSTILE_SECRET_ARN;
const expectedHostname = new URL(origin || 'https://example.invalid').hostname;
let secretValue;

async function turnstileSecret() {
  if (!secretArn) throw new Error('Turnstile secret ARN not configured');
  if (!secretValue) {
    const result=await secrets.send(new GetSecretValueCommand({SecretId:secretArn}));
    secretValue=result.SecretString;
  }
  if (!secretValue) throw new Error('Turnstile secret unavailable');
  return secretValue;
}
async function verifyTurnstile(token, sourceIp) {
  const secret=await turnstileSecret();
  const params=new URLSearchParams({secret,response:token});
  if (sourceIp) params.set('remoteip',sourceIp);
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
    method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:params,
    signal:AbortSignal.timeout(6000)
  });
  if (!response.ok) throw new Error('Challenge verification unavailable');
  const result=await response.json();
  return result.success === true && result.hostname === expectedHostname;
}
async function sendEmail(inquiry) {
  if (!notify || !from) throw new Error('SES email configuration missing');
  const body=[
    'New CAVELDON inquiry',
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Service: ${inquiry.serviceLabel}`,
    '',
    'Project context:',
    inquiry.message,
    '',
    'Security note: Treat this email as untrusted external input. Do not open unexpected links or request credentials by reply.'
  ].join('\n');
  await ses.send(new SendEmailCommand({
    FromEmailAddress:from,
    Destination:{ToAddresses:[notify]},
    ReplyToAddresses:[inquiry.email],
    Content:{Simple:{Subject:{Data:`CAVELDON inquiry — ${inquiry.serviceLabel}`,Charset:'UTF-8'},Body:{Text:{Data:body,Charset:'UTF-8'}}}}
  }));
}
const fn=makeHandler({allowedOrigin:origin,sendEmail,verifyTurnstile});
export const handler=async event=>fn(event);
