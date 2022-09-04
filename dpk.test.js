const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

jest.mock('crypto', () => {
  return {
    createHash: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => 'sampleoutput'),
  };
});

const TEST_VALUE = "c1802e6b9670927ebfddbc1802e6b9670927ebfddbc1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a8622323c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a8622323"

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition value, in string format, when it is given and its length < 256", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "5"});
    const trivialKey2 = deterministicPartitionKey({partitionKey: 2});
    expect(trivialKey).toBe("5");
    expect(trivialKey2).toBe("2");
  });


  it("Returns calls crypto when not partitionKey is given", () => {
    const trivialKey = deterministicPartitionKey(3);

    expect(crypto.createHash).toBeCalledWith('sha3-512');
    expect(crypto.update).toBeCalledWith(JSON.stringify(3));
    expect(crypto.digest).toBeCalledWith('hex');
    expect(trivialKey).toBe('sampleoutput');
  });

  it("Returns calls crypto when partitionKey length is greater than 256", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: TEST_VALUE });

    expect(crypto.createHash).toBeCalledWith('sha3-512');
    expect(crypto.update).toBeCalledWith(TEST_VALUE);
    expect(crypto.digest).toBeCalledWith('hex');
    expect(trivialKey).toBe('sampleoutput');
  });

});
