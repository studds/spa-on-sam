function getEnv(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Env var ${name} was not defined`);
    }
    return value;
}

export const config = {
    get bucketName() {
        return getEnv('BUCKET_NAME');
    },
    get region() {
        return getEnv('AWS_DEFAULT_REGION');
    }
};
