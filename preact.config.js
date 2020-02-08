import asyncPlugin from 'preact-cli-plugin-fast-async';

export default (config, env, helpers) => {
    if (env.dev) {
        config.devServer.proxy = [
            {
                path: '/api/*',
                target: 'http://localhost:6000',
                // ...any other stuff...
            }
            ];
    }
    if (env.isProd) {   
        asyncPlugin(config);
    }
}