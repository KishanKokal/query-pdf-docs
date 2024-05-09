import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export const fetchQueryResponse = async (
  query: string
): Promise<Array<Object>> => {
  const endpoint = API_BASE_URL + "/query";
  const { data } = await axios.post(endpoint, {
    query: query,
  });
  const response = new Array(data.matches.length);
  for (let i = 0; i < data.matches.length; i++) {
    // response[i] = JSON.stringify(data.matches[i].metadata, null, 2);
    response[i] = data.matches[i].metadata;
  }
  return response;
};
