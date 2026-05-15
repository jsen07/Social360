import { CognitoJwtVerifier } from "aws-jwt-verify";
import "dotenv/config";

const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.USER_POOL_CLIENT_ID;

if (!userPoolId || !clientId) {
  throw new Error("Missing Cognito environment variables");
}

const verifier = CognitoJwtVerifier.create({
  userPoolId,
  tokenUse: "id",
  clientId,
});

export const verifyJWT = async (token: string) => {
  try {
    const payload = await verifier.verify(token);

    return payload;
  } catch (err) {
    console.error("Error verifying JWT:", err);
  }
};
