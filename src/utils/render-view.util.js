const renderView = (path, data) => {
    return (req, res) => {
        res.render(path), { ...data, user: req.session?.user }
    }
}

module.exports = renderView;