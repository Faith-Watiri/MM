import axios from 'axios';

export async function axiosReq(options: AxiosConfig) {
  try {
    const headers = {
      Authorization: `Bearer ${options.bearerToken}`,
    };

    return await axios({
      url: options.url,
      method: options.method,
      data: options.data,
      headers: headers,
    });
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
}
