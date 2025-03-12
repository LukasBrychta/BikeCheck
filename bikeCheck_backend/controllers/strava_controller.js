const { encrypt, decrypt } = require("../utils/encryption");
const { User, Bike } = require("../models");

exports.tokenExchange = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).send({
        message: "Auth code is required",
      });
    }

    const tokenExchangeUrl = new URL("https://www.strava.com/oauth/token");
    tokenExchangeUrl.searchParams.append("client_id", process.env.CLIENT_ID);
    tokenExchangeUrl.searchParams.append(
      "client_secret",
      process.env.CLIENT_SECRET
    );
    tokenExchangeUrl.searchParams.append("code", code);
    tokenExchangeUrl.searchParams.append("grant_type", "authorization_code");
    console.log("Full Strava URL:", tokenExchangeUrl.toString());

    const stravaResponse = await fetch(tokenExchangeUrl, {
      method: "POST",
    });

    if (!stravaResponse.ok) {
      const errorData = await stravaResponse.json();
      console.error("Strava API error:", errorData);
      return res.status(stravaResponse.status).send({
        message: "Failed to exchange token",
        details: errorData,
      });
    }

    const data = await stravaResponse.json();
    let { access_token, refresh_token, athlete } = data;

    let user = await User.findOne({ where: { user_id: athlete.id } });
    if (!user) {
      const encryptedAccessToken = encrypt(access_token.toString());
      const encryptedRefreshToken = encrypt(refresh_token.toString());
      user = await User.create({
        user_id: athlete.id,
        username: `${athlete.firstname} ${athlete.lastname}`,
        access_token: encryptedAccessToken,
        refresh_token: encryptedRefreshToken,
      });
    } else {
      access_token = decrypt(user.access_token);
      refresh_token = decrypt(user.refresh_token);
    }

    let stravaBikes = await fetch("https://www.strava.com/api/v3/athlete", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (stravaBikes.status === 401) {
      const refreshTokenUrl = new URL("https://www.strava.com/oauth/token");
      refreshTokenUrl.searchParams.append("client_id", process.env.CLIENT_ID);
      refreshTokenUrl.searchParams.append(
        "client_secret",
        process.env.CLIENT_SECRET
      );
      refreshTokenUrl.searchParams.append("refresh_token", refresh_token);
      refreshTokenUrl.searchParams.append("grant_type", "refresh_token");

      const refreshResponse = await fetch(refreshTokenUrl, {
        method: "POST",
      });

      if (!refreshResponse.ok) {
        const errorData = await refreshResponse.json();
        console.error("Strava API refresh token error:", errorData);
        return res.status(refreshResponse.status).send({
          message: "Failed to refresh token",
          details: errorData,
        });
      }

      const refreshData = await refreshResponse.json();
      access_token = refreshData.access_token;
      refresh_token = refreshData.refresh_token;

      user.access_token = encrypt(access_token.toString());
      user.refresh_token = encrypt(refresh_token.toString());
      await user.save();

      stravaBikes = await fetch("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    if (stravaBikes.ok) {
      const bikeData = await stravaBikes.json();
      console.log("Fetched bike data:", bikeData);
      for (const bike of bikeData.bikes) {
        console.log("Processing bike:", bike);
        const detailedBike = await fetch(
          `https://www.strava.com/api/v3/gear/${bike.id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (detailedBike.ok) {
          const detailedBikeData = await detailedBike.json();
          console.log("Fetched detailed bike data:", detailedBikeData);
          const existingBike = await Bike.findOne({
            where: { bike_id: detailedBikeData.id, user_id: user.user_id },
          });
          if (!existingBike) {
            await Bike.create({
              user_id: user.user_id,
              bike_id: detailedBikeData.id,
              name: bike.name,
              distance: detailedBikeData.distance,
            });
            console.log("Bike created in database:", detailedBikeData.id);
          } else {
            console.log(
              "Bike already exists in database:",
              detailedBikeData.id
            );
          }
        } else {
          console.error("Failed to fetch bike data:", detailedBike.status);
        }
      }
    } else {
      console.error("Failed to fetch bikes:", stravaBikes.status);
    }

    return res.status(200).json({
      user: {
        user_id: user.user_id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Error exchanging token:", err);
    res.status(500).send({ message: "Failed to exchange token" });
  }
};
