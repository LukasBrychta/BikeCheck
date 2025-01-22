exports.tokenExchange = async (req, res) => {
    try{
        console.log(req.body);
        console.log("Client ID:", process.env.CLIENT_ID);
        const {code} = req.body;
        if (!code) {
            return res.status(400).send({
                message: "Auth code is required"
            });
        }

        const tokenExchangeUrl = new URL('https://www.strava.com/oauth/token');
        tokenExchangeUrl.searchParams.append('client_id', process.env.CLIENT_ID);
        tokenExchangeUrl.searchParams.append('client_secret', process.env.CLIENT_SECRET);
        tokenExchangeUrl.searchParams.append('code', code);
        tokenExchangeUrl.searchParams.append('grant_type', 'authorization_code');
        console.log("Full Strava URL:", tokenExchangeUrl.toString());

        /*const params = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
        };*/

        const stravaResponse = await fetch(tokenExchangeUrl, {
            method: 'POST',
            //body: new URLSearchParams(params).toString(),
        });

        if (!stravaResponse.ok) {
            const errorData = await stravaResponse.json();
            console.error("Strava API error:", errorData);
            return res.status(stravaResponse.status).send({
                message: 'Failed to exchange token',
                details: errorData,
            });
        };

        const data = await stravaResponse.json();
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).send({message: 'Failed to exchange token'});
    }
};