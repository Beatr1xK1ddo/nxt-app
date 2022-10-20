module.exports = {
    displayName: "ts-monitoring-utils",
    preset: "../../../jest.preset.js",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    coverageDirectory: "../../../coverage/libs/ts-monitoring/utils",
};
