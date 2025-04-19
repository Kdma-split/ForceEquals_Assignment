const Account = require('../models/account.model.js');

// Get all accounts with match scores
const getAccounts = async (req, res) => {
    try {
      const accounts = await Account.find()
        .select('name website industry size matchScore status')
        .sort({ matchScore: -1 });
      
      res.status(200).json({
        count: accounts.length,
        accounts
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching accounts', error: error.message });
    }
};

// Update account status
const updateAccountStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Prospect', 'Target', 'Active', 'Closed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status', 
                validStatuses 
            });
        }

        const account = await Account.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({
            message: 'Account status updated successfully',
            account
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating account status', error: error.message });
    }
};

module.exports = {
    getAccounts,
    updateAccountStatus,
}