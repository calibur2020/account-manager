const { Account, getPgConn } = require('../../data-layer/orm-models');
const joi = require('joi');

// return account when found
// throw when account not found
async function fetchAccount(accountNumber) {
  const account = await Account.findOne({
    where: { account_number: accountNumber },
  });
  if (account) {
    return account;
  } else {
    throw new Error(`account ${accountNumber} does not exist`);
  }
}

// return true when amount is enough to cover the balance
// throw when it is not
function validateBalance(account, amount) {
  if (account.balance > amount) return true;
  else throw new Error('insufficient balance');
}

// adding and substracting balance is done in one database transaction
async function executeTransaction(fromAccount, toAccount, amount) {
  const dbTransaction = await getPgConn().transaction();
  try {
    await Account.update(
      { balance: fromAccount.balance - amount },
      { dbTransaction, where: { account_number: fromAccount.account_number } }
    );
    await Account.update(
      { balance: toAccount.balance + amount },
      { dbTransaction, where: { account_number: toAccount.account_number } }
    );
    await dbTransaction.commit();
  } catch (err) {
    await dbTransaction.rollback();
    throw new Error(err.message);
  }
}

const transferBodySchema = joi.object({
  fromAccountNumber: joi.string().length(8),
  toAccountNumber: joi.string().length(8),
  amount: joi.number().positive(),
});

// In a production-ready implementation,
// this validation will be abstracted as a separate layer
// for all endpoints request params validation:
// query param in GET, body for POST and etc.
function validateTransferInput(body) {
  let result = transferBodySchema.validate(body, { noDefaults: true });
  if (result.error) {
    throw new Error(result.error);
  } else {
    console.log('valid input');
    return true;
  }
}

exports.transfer = async (req, res, next) => {
  try {
    validateTransferInput(req.body);
    const { fromAccountNumber, toAccountNumber, amount } = req.body;
    const fromAccount = await fetchAccount(fromAccountNumber);
    const toAccount = await fetchAccount(toAccountNumber);
    validateBalance(fromAccount, amount);
    await executeTransaction(fromAccount, toAccount, amount);
    res.json({ result: 'success' });
  } catch (e) {
    next(e);
  }
};

const getBalanceSchema = joi.object({
  accountNumber: joi.string().length(8),
});

function validateGetBalanceInput(input) {
  let result = getBalanceSchema.validate(input, { noDefaults: true });
  if (result.error) {
    throw new Error(result.error);
  } else {
    console.log('valid input');
    return true;
  }
}

exports.getBalance = async (req, res, next) => {
  try {
    console.log(req.params);
    validateGetBalanceInput(req.params);
    const { accountNumber } = req.params;
    const account = await fetchAccount(accountNumber);
    res.json({ balance: account.balance });
  } catch (e) {
    next(e);
  }
};
