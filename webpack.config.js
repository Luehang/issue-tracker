module.exports = {
    entry: './server/public/app.js',
    output: {
        path: __dirname + '/server/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules|distribution|bin/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    watch: true
}