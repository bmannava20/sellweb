module.exports = {
    setRedirectHeader: (req, res) => {
        const jsonData = {
            'modules': {
                'redirectModule': {
                    'reload': true
                }
            }
        };

        res.setHeader('Content-Type', 'application/json');
        res.json(jsonData);
    }
};
