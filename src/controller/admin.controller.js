const adminModel = require("../model/usersModel");
const managerModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const sendEmail = require("../middleware/sendEmail");

module.exports.registerAdmin = async (req, res) => {
  try {
    const existAdmin = await adminModel.findOne({ email: req.body.email });

    if (existAdmin) {
      return res.status(409).json({ message: "Admin Already Exist !" });
    } else {
      if (req.file) {
        req.body.profile = `/uploads/${req.file.filename}`;
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await adminModel.create(req.body);

      return res.status(201).json({ message: "Admin Register Successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const existAdmin = await adminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      const checkPass = await bcrypt.compare(
        req.body.password,
        existAdmin.password
      );
      if (checkPass) {
        const token = jwt.sign(
          { userId: existAdmin._id },
          process.env.JWT_SECRET
        );
        console.log(token);
        return res
          .status(200)
          .json({ message: "Admin Login Success", data: token });
      } else {
        return res.status(400).json({ message: "Invalid Credential" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Admin Not Exist... Register First" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.myProfile = async (req, res) => {
  try {
    return res.status(200).json({ message: "User Profile", data: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.editAdmin = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await adminModel.findById(id);
    if (user) {
      if (req.file) {
        if (user.profile) {
          const oldPath = path.join(__dirname, "..", user.profile);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
            console.log("Old profile deleted!");
          }
        }
        req.body.profile = `/uploads/${req.file.filename}`;
      }
      await adminModel
        .findByIdAndUpdate(user._id, req.body, { new: true })
        .select("-password");
      const editedUser = await adminModel
        .findById(user._id)
        .select("-password");
      return res
        .status(200)
        .json({ message: "Admin Edit Success", data: editedUser });
    } else {
      return res.status(404).json({ message: "User Not Found !" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.query.id;
    const user = req.user;
    if (user && user._id.toString() === id) {
      return res
        .status(403)
        .json({ message: "Admins Can't Delete Their Own Account" });
    }
    const single = await adminModel.findById(id);
    if (single) {
      await adminModel.findByIdAndUpdate(
        single._id,
        { isDelete: true },
        { new: true }
      );
      return res.status(200).json({ message: "Admin Delete Success" });
    }
    return res.status(404).json({ message: "Admin Not Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.allAdmin = async (req, res) => {
  try {
    const allAdmin = await adminModel
      .find({ isDelete: false })
      .select("-password");
    return res
      .status(200)
      .json({ message: "All Admin Fetched Successfully ", data: allAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Manager Routes

module.exports.addManager = async (req, res) => {
  try {
    // console.log(req.body)
    const existManager = await managerModel.findOne({ email: req.body.email });
    if (existManager) {
      return res.status(409).json({ message: "Manager Already Exist " });
    }
    if (req.file) {
      req.body.profile = `/uploads/${req.file.filename}`;
    }

    const mailMsg = {
      from: "sanjanadholariya926@gmail.com",
      to: "ravi.beetonz@gmail.com",
      subject: "Registration",
      html: `<p>Hello ${req.body.name} 😊</p>
        <p>Your Password Is ${req.body.password} For Login Into Your Account. You Can Change It Later.</p>`,
    };
    await sendEmail(mailMsg);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body)
    await managerModel.create(req.body);
    return res.status(201).json({ message: "Manager Add Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.allManager = async (req, res) => {
  try {
    const allManager = await managerModel
      .find({ role: "Manager", isDelete: false })
      .select("-password");
    return res
      .status(200)
      .json({
        message: "All Manager Data Fetched Successfully",
        data: allManager,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.editManager = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(req.body);
    console.log(req.file);
    const single = await managerModel.findById(id).select("-password");
    console.log(single);
    if (!single) {
      return res.status(404).json({ message: "Manager Not Found !" });
    }
    if (req.file) {
      if (single.profile) {
        const oldPath = path.join(__dirname, "..", single.profile);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          // console.log("Old profile deleted!");
        }
      }
      req.body.profile = `/uploads/${req.file.filename}`;
    }
    const updatedManager = await managerModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .select("-password");
    return res
      .status(200)
      .json({ message: "Edit Manager Successfully", data: updatedManager });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    const id = req.query.id;
    const single = await managerModel.findById(id);
    console.log(single);
    if (!single) {
      return res.status(404).json({ message: "Manager Not Found !" });
    }
    if (single.isDelete) {
      return res.status(400).json({ message: "Manager Already Deleted" });
    }
    await managerModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    return res.status(200).json({ message: "Manager Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.singleManager = async (req, res) => {
  try {
    const id = req.query.id;
    const single = await managerModel.findById(id).select("-password");
    // console.log(single)
    return res
      .status(200)
      .json({
        message: "Single manager Data Fetched Successfully",
        data: single,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
