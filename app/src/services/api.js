// Utils
import Config from '../utils/config';
import History from '../utils/history';

/**
 * TODO: Requires more validation?
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    History.push('/unauthorized');
    return Promise.reject();
  }

  if (response.status >= 500 && response.status < 500) {
    console.error('API Error:', response);
  }

  // Force return error
  return parseJSON(response).then(body => {
    const error = { body, status: response.status };
    throw error;
  });
}

/**
 * We should always return an object, and error log if not serializable.
 */
async function parseJSON(response) {
  return response.json().catch(error => {
    console.warn(`API Response wasn't JSON serializable:`, error);
    throw new Error('API Response was not JSON serializable.');
  });
}

/**
 * Creates the AJAX request, does some parsing and validation.
 */
async function createRequest({ method = 'GET', endpoint = '' }) {
  const url = `${Config.API_URL}/${endpoint}`;
  const params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  return fetch(url, params);
}

async function createOutsiderRequest({ method = 'GET', url = '' }) {
  const params = {
    method,
    mode: 'cors',
  };

  return fetch(url, params);
}

export async function api(params) {
  return createRequest(params)
    .then(checkStatus)
    .then(parseJSON);
}

export async function outsiderApi(params) {
  return createOutsiderRequest(params)
    .then(checkStatus)
    .then(parseJSON);
}
