import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 280,
  duration: '180s',
  rps: 280,
};

export default function () {
  const res = http.get('http://127.0.0.1:1111/api/restaurants/' + (Math.ceil(Math.random() * 9999999) + 1) + '/info');
  check(res, {
    'status was 200': r => r.status === 200,
    'status was 404': r => r.status === 404,
    'status was 500': r => r.status === 500,
    'transaction time OK': r => r.timings.duration < 2000,
  });
  // sleep(1);
}

// k6 run script.js
