import { request } from '../utils';

export interface QqInfo {
  code: 1;
  qq: string;
  name: string;
  qlogo: string;
}

export interface ResponstError {
  code: 201702;
  msg: string;
}

export const fetchQqInfo = (qq: string) =>
  request
    .get(`/qq.info`, {
      params: { qq },
    })
    .then((res) => {
      const result = JSON.parse(res.data) as QqInfo | ResponstError;
      if (result.code === 1) {
        return result;
      } else {
        throw new Error(result.msg);
      }
    });
