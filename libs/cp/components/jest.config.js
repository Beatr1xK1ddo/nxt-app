module.exports = {
    displayName: "cp-components",
    preset: "../../../jest.preset.js",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    coverageDirectory: "../../../coverage/libs/cp/components",
};
