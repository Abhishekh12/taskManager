var TaskManager = artifacts.require("./TaskManager.sol");

module.exports = function(deployer) {
  deployer.deploy(TaskManager);
};
