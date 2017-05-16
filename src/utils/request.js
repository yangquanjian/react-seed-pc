/**
 * @file utils/request
 * @author maoquan(maoquan@htsc.com)
 */

import 'whatwg-fetch';

import config from '../config/request';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json().then(
    (res) => { // eslint-disable-line
      // 这里可以对响应进行统一判断
      // 然后throw出错误信息
      // eg: if (res.code !== '0') {
      //        throw res.message;
      //     }
      return res;
    },
  );
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  console.log(error);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return Promise.race([
    fetch(url, { credentials: 'include', ...options })
      .then(checkStatus)
      .then(parseJSON),
    new Promise(
      (rosolve, reject) => {// eslint-disable-line
        setTimeout(
          () => reject('请求超时'),
          config.timeout,
        );
      },
    ),
  ]);
}
