const {deterministicPartitionKey} = require("./dpk");

console.log(deterministicPartitionKey(3));

console.log(deterministicPartitionKey());
console.log(deterministicPartitionKey({partitionKey: 5}));
console.log(deterministicPartitionKey({partitionKey: "5"}));
console.log(deterministicPartitionKey({}));
console.log(deterministicPartitionKey({partitionKey: "c1802e6b9670927ebfddbc1802e6b9670927ebfddbc1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a8622323c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a8622323"}));

