const uploadCtrl ={
    uploadAvatar: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

//! Exporting Upload Controller
module.exports = uploadCtrl;