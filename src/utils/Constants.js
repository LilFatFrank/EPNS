const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

export const TABLE_HEADER = [
  {
    id: "id",
    label: "ID",
    minWidth: 170,
    format: (value) => (
      <a style={{ cursor: "pointer", textDecoration: "underline" }}>{value}</a>
    ),
    onClick: true
  },
  {
    id: "symbol",
    label: "Ticker",
    minWidth: 100,
    format: (value) => value.toUpperCase()
  },
  {
    id: "current_price",
    label: "Current Price",
    format: (value) => currencyFormatter.format(value)
  },
  {
    id: "market_cap",
    label: "Market Cap",
    format: (value) => currencyFormatter.format(value)
  },
  { id: "market_cap_rank", label: "Market Cap Rank" },
  { id: "high_24h", label: "24H High" },
  { id: "low_24h", label: "24H Low" },
  { id: "ath", label: "All time high" }
];

export function CREATE_DATA(
  id,
  symbol,
  current_price,
  market_cap,
  market_cap_rank,
  high_24h,
  low_24h,
  ath
) {
  return {
    id,
    symbol,
    current_price,
    market_cap,
    market_cap_rank,
    high_24h,
    low_24h,
    ath
  };
}

export const BASE_URL = `https://coingecko.p.rapidapi.com/coins`;
