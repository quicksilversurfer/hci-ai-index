import { fromWebToken } from "@aws-sdk/credential-providers";
import { getVercelOidcToken } from "@vercel/oidc";

function vercelCredentials(region) {
  return async () => {
    const roleArn = process.env.AWS_ROLE_ARN;
    if (!roleArn) {
      throw new Error("AWS_ROLE_ARN is required on Vercel");
    }

    return fromWebToken({
      roleArn,
      roleSessionName: `vercel-hci-index-${process.env.VERCEL_ENV ?? "unknown"}`,
      webIdentityToken: await getVercelOidcToken(),
      clientConfig: { region },
    })();
  };
}

export function awsClientConfig(region) {
  if (process.env.VERCEL === "1") {
    return { region, credentials: vercelCredentials(region) };
  }

  return { region };
}
