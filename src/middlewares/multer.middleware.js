import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); 
  },
  filename: function (req, file, cb) {
    // Better to prepend Date.now() to avoid filename conflicts
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ❌ You exported default multer({ storage }) before.
// ✅ Instead, export a named instance so it's consistent across project.
export const upload = multer({ storage });
