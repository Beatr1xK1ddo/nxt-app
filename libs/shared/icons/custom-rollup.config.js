const svgr = require("@svgr/rollup");

module.exports = (options) => ({
    ...options,
    plugins: [...options.plugins, svgr()],
});
