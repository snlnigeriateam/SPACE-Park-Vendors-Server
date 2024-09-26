const cron = require('node-cron');
const { db } = require('./firebase');

cron.schedule('0 0 * * *', async () => {
  try {
    const unsettledPaymentsSnapshot = await db.collection('payments').where('isHeldInHoldingAccount', '==', true).where('settled', '==', false).get();
    const vendorSettlements = {};

    unsettledPaymentsSnapshot.forEach(doc => {
      const payment = doc.data();
      const vendorId = payment.vendor;
      if (!vendorSettlements[vendorId]) vendorSettlements[vendorId] = 0;
      vendorSettlements[vendorId] += payment.amount;
    });

    for (const vendorId in vendorSettlements) {
      const vendorRef = db.collection('vendors').doc(vendorId);
      const vendorDoc = await vendorRef.get();
      const newBalance = (vendorDoc.data().balance || 0) + vendorSettlements[vendorId];

      await vendorRef.update({ balance: newBalance });
      await db.collection('payments').where('vendor', '==', vendorId).where('settled', '==', false).update({ settled: true, isHeldInHoldingAccount: false });
    }

    console.log('Automated settlement process completed.');
  } catch (error) {
    console.error('Error during automated settlement process:', error);
  }
});
