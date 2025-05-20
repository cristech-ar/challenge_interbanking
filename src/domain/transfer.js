function isValidAccount(account) {
  return typeof account === 'string' && /^[0-9]{10,20}$/.test(account);
}

function createTransfer({ amount, companyId, debitAccount, creditAccount, date = new Date() }) {
  if (!companyId || typeof companyId !== 'string') {
    throw new Error('Invalid companyId');
  }

  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number');
  }

  if (!isValidAccount(debitAccount)) {
    throw new Error('Invalid debit account number');
  }

  if (!isValidAccount(creditAccount)) {
    throw new Error('Invalid credit account number');
  }

  if (isNaN(new Date(date).getTime())) {
    throw new Error('Invalid date');
  }

  return {
    amount,
    companyId,
    debitAccount,
    creditAccount,
    date: new Date(date)
  };
}

module.exports = { createTransfer };
