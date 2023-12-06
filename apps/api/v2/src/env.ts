type Environment = {
  NODE_ENV: "development" | "production";
  API_PORT: number;
  DATABASE_READ_URL: string;
  DATABASE_WRITE_URL: string;
  NEXTAUTH_SECRET: string;
};

export const getEnv = <K extends keyof Environment>(key: K): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (typeof value === "undefined") {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};