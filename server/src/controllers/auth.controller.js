import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const createAdmin = async (req, res) => {
  const { fullname, email, role, password, isSuperAdmin } = req.body;

  try {

    const currentAdmin = await Admin.findById(req.admin._id);

    // checking if admin is superAdmin
    if (!currentAdmin.isSuperAdmin)
      return res.status(400).json({ message: "You aren't Super Admin!" });


    // performing action if admin is superAdmin
    if (!fullname || !email || !password || !role)
      res.status(400).json({ message: "All fields are required" });

    // hash passwords
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const admin = await Admin.findOne({ email });

    if (admin)
      res.status(400).json({ message: "Email alredy exists. Login insted!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      fullname,
      email,
      password: hashedPassword,
      role,
      isSuperAdmin
    });
    if (newAdmin) {
      await newAdmin.save();
      res.status(201).json({
        message: "Admin Added Successfully!"
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    throw new Error("Error in auth controller :: signup function :: ", error);
  }
};

export const deleteAdmin = async (req, res) => {
  try {
     const currentAdmin = await Admin.findById(req.admin._id);


    // checking if admin is superAdmin
    if (!currentAdmin.isSuperAdmin)
      return res.status(400).json({ message: "You aren't Super Admin!" });


    const { id: adminToDeleteId } = req.body;
    const adminTobeDeleted = await Admin.findById(adminToDeleteId);

    if (adminTobeDeleted.email !== currentAdmin.email) {
      const deltedAdmin = await Admin.findByIdAndDelete(adminToDeleteId);

      console.log(adminToDeleteId, deltedAdmin);
      if (deltedAdmin) {
        return res.status(200).json({ message: "Deleted Admin Successfully!" });
      } else {
        return res.status(400).json({ message: "The admin you are trying to delete doesn't exist." })
      }
    } else {
      return res.status(401).json({ message: "Don't try to delete yourself." })
    }

  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
    throw new Error("error in delete Admin controller :: ", error.message);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      res.status(400).json({ message: "All fields are required" });
    const admin = await Admin.findOne({ email });


    if (!admin) res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect)
      res.status(400).json({ message: "Invalid Credentials" });

    generateToken(admin._id, res);

    res.status(200).json({
      _id: admin._id,
      fullname: admin.fullname,
      email: admin.email,
    });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
    throw new Error("error in login controller :: ", error);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
    throw new Error("error in logout controller :: ", error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic)
      res.status(400).json({ message: "Profile picture required" });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.admin)
  } catch (error) {
    console.log("error in checkauth controller", error.message);
    res.status(500).json({ message: "Internal server error" })
  }
}


export const getAllAdmins = async (req,res)=>{
  try {
    const allAdmins = await Admin.find();
    res.status(200).json({allAdmins});
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
    console.log("error in getAllAdmin controller", error.message);

  }
}