import { BASE_URL } from "./Constants";

export const getTableData = async (coin = undefined) => {
  const url = coin
    ? `${BASE_URL}/${coin}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`
    : `${BASE_URL}/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_API_KEY
      }
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
};
