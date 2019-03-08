var Mock = require('mockjs');
var data = Mock.mock({
    'api/list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
});

console.log('Mock data', data);
