import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const headers = { Accept: "application/json" };
const githubURL = `${process.env.NEXT_PUBLIC_GITHUB_LOGIN}/access_token`;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    /*eslint-disable camelcase*/
    const body = {
      client_id:     process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code:          request.query.code
    };

    const { data } = await axios.post(githubURL, body, { headers });

    if (data.error)
      response.status(401).send(data);

    else
      response.send({ token: data.access_token });
  } catch (error) {
    response.status(500).send(error);
  }
}
