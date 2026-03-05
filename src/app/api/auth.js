// For now, simulating API calls. Replace with your actual backend API
const BASE_URL = 'http://yourapi.com/api'; // Change this to your actual API

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ email, password }) {
  // Simulating a successful API call
  // In production, replace this with actual fetch call
  
  /* Example production code:
  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
  */

  // Simulation: Accept any email/password
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        token: 'fake-jwt-token-' + Date.now(),
        loginTime: new Date().toISOString(),
      });
    }, 1000); // Simulate network delay
  });
}
