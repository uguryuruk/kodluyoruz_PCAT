exports.getAboutPage= async (req, res) => {
    res.render("about");
  }

exports.getAddPage=async (req, res) => {
    res.render("add");
  }

exports.notFoundPage= (req, res) => {
    res.send("<br><br><h1>404 hatalı sayfa.</h1>");
  }