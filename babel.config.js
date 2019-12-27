const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
    sourceMaps: IS_PRODUCTION ? undefined : "inline",
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: 3,
                modules: false
            }
        ],
        [
            "@babel/preset-react",
            {
                useBuiltIns: true,
                development: !IS_PRODUCTION
            }
        ]
    ].filter(Boolean),
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: true
            }
        ],
        "babel-plugin-react-require",
        "styled-jsx/babel",
        [
            "babel-plugin-named-asset-import",
            {
                loaderMap: {
                    svg: {
                        "ReactComponent": "@svgr/webpack?-svgo,+ref![path]"
                    }
                }
            }
        ]
    ].filter(Boolean)
};

