import '../config/env.js';

const ARKSEL_APIKEY = process.env.ARKSEL_APIKEY;
const ARKSEL_SENDER_ID = process.env.ARKSEL_SENDER_ID || 'NSACOE';

/**
 * Send SMS via Arkesel
 * @param {string} recipient - Phone number
 * @param {string} message - Message content
 */
export async function sendSMS(recipient, message) {
  if (!ARKSEL_APIKEY) {
    console.error('Arkesel API Key is missing');
    return { success: false, error: 'API Key missing' };
  }

  try {
    const url = new URL('https://sms.arkesel.com/sms/api');
    url.searchParams.append('action', 'send-sms');
    url.searchParams.append('api_key', ARKSEL_APIKEY);
    url.searchParams.append('to', recipient);
    url.searchParams.append('from', ARKSEL_SENDER_ID);
    url.searchParams.append('sms', message);

    const response = await fetch(url.toString());
    const data = await response.json();

    // Arkesel returns status codes in the response body often
    // 100 is success for Arkesel
    if (data.code === '100' || response.status === 200) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('Arkesel SMS Error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send OTP for password reset
 * @param {string} recipient - Phone number
 * @param {string} otp - The 6-digit code
 */
export async function sendOTP(recipient, otp) {
  const message = `Your NSACOE Admin password reset code is: ${otp}. It expires in 10 minutes.`;
  return await sendSMS(recipient, message);
}
