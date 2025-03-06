const { encrypt, decrypt } = require('../utils/encryption');
const { User, Bike } = require('../models');

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
    const { access_token, refresh_token, athlete } = data;

    let user = await User.findOne({ where: { user_id: athlete.id } });
    if (!user) {
      const encryptedAccessToken = encrypt(access_token);
      const encryptedRefreshToken = encrypt(refresh_token);
      user = await User.create({
        user_id: athlete.id,
        username: `${athlete.firstname} ${athlete.lastname}`,
        access_token: encryptedAccessToken,
        refresh_token: encryptedRefreshToken,
      });

      const stravaBikes = await fetch("https://www.strava.com/api/v3/athlete", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (stravaBikes.ok) {
        const bikeData = await stravaBikes["bikes"].json();
        for (const bike of bikeData) {
          detailedBike = await fetch(
            `https://www.strava.com/api/v3/gear/${bike.id}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          await Bike.create({
            user_id: user.id,
            bike_id: detailedBike.id,
            name: bike.name,
            distance: detailedBike.distance,
          });
        }
      }
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
