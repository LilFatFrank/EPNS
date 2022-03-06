import { Box, Divider, Drawer, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { currencyFormatter } from "../../utils/Constants";
import "./SidebarComponent.scss";

const SidebarComponent = ({ coin, open, onClose }) => {
  const { callApi, sidebarData, loadingSidebarData } = useContext(AppContext);

  useEffect(() => {
    if (coin) {
      callApi("sidebar", coin);
    }
  }, [coin]);

  return (
    <Drawer anchor={"right"} open={open} onClose={onClose}>
      <Box
        sx={{ width: 350 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
        style={{ padding: "20px" }}
      >
        {loadingSidebarData ? (
          <Typography>Fetching Asset Details...</Typography>
        ) : sidebarData ? (
          <div className="sidebar-details">
            <Box component={"div"} style={{ display: "flex", gap: "5px" }}>
              <img src={sidebarData.image.thumb} alt="logo" width={30} />
              <Typography variant="h5">{sidebarData.name}</Typography>
            </Box>
            <Box component={"div"} className="section">
              <Typography variant="subtitle1">
                <b>Market Data</b>
              </Typography>
              <Box component={"div"} className="section-details">
                <Typography variant="body2">
                  Current Price:{" "}
                  <b>
                    {currencyFormatter.format(
                      sidebarData.market_data.current_price.usd
                    )}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Market Cap:{" "}
                  <b>
                    {currencyFormatter.format(
                      sidebarData.market_data.market_cap.usd
                    )}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Market Cap Rank: <b>{sidebarData.market_cap_rank}</b>
                </Typography>
                <Typography variant="body2">
                  All time high:{" "}
                  <b>
                    {currencyFormatter.format(sidebarData.market_data.ath.usd)}
                  </b>
                </Typography>
                <Typography variant="body2">
                  Circulating Supply:{" "}
                  <b>{sidebarData.market_data.circulating_supply}</b>
                </Typography>
                <Typography variant="body2">
                  Max Supply: <b>{sidebarData.market_data.max_supply}</b>
                </Typography>
              </Box>
            </Box>
            <Box component={"div"} className="section">
              <Typography variant="subtitle1">
                <b>Community Data</b>
              </Typography>
              <Box component={"div"} className="section-details">
                <Typography variant="body2">
                  Community Score: <b>{sidebarData.community_score}</b>
                </Typography>
                <Typography variant="body2">
                  Facebook Likes:{" "}
                  <b>{sidebarData.community_data.facebook_likes}</b>
                </Typography>
                <Typography variant="body2">
                  Twitter Followers:{" "}
                  <b>{sidebarData.community_data.twitter_followers}</b>
                </Typography>
                <Typography variant="body2">
                  Reddit Subscribers:{" "}
                  <b>{sidebarData.community_data.reddit_subscribers}</b>
                </Typography>
              </Box>
            </Box>
            <Box component={"div"} className="section">
              <Typography variant="subtitle1">
                <b>Developer Data</b>
              </Typography>
              <Box component={"div"} className="section-details">
                <Typography variant="body2">
                  Forks: <b>{sidebarData.developer_data.forks}</b>
                </Typography>
                <Typography variant="body2">
                  Stars: <b>{sidebarData.developer_data.stars}</b>
                </Typography>
                <Typography variant="body2">
                  Subscribers: <b>{sidebarData.developer_data.subscribers}</b>
                </Typography>
                <Typography variant="body2">
                  Closed Issues:{" "}
                  <b>{sidebarData.developer_data.closed_issues}</b>
                </Typography>
              </Box>
            </Box>
            <Box component={"div"} className="section">
              <Typography variant="subtitle1">
                <b>Description</b>
              </Typography>
              <Box component={"div"} className="section-details">
                <Typography variant="body2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: sidebarData.description.en
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </div>
        ) : (
          <Typography>No Data Found.</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default SidebarComponent;
