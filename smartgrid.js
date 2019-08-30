const grid = require('smart-grid');

const gridSettings = {
    outputStyle: 'less',
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: '1200px',
        fields: '30px'
    },
    breakPoints: {
        w320: {
            width: '320px'
        },
        w480: {
            width: '480px'
        },
        w768: {
            width: '768px',
            fields: '15px'
        },
        w992: {
            width: '992px'
        },
        w1200: {
            width: '1200px'
        }
    }
};

grid('./src/less', gridSettings);