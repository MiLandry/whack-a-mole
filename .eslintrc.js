module.exports = {
    "extends": "airbnb",
    env: {
      "browser": true,
      "node": true,
    },
    rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': [2, 'always-multiline'],
    // require or disallow use of semicolons instead of ASI
    'semi': [2, 'never'],
    //allow unescaped html
    "react/no-unescaped-entities": [0],
    "prefer-template": [0],
    "prefer-arrow-callback": [0],
    "func-names": [0],
    "radix": [0],
      
    },
};
