const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { loginPage, authenticateUser, registerUser, updateUserProfile, validateToken } = require('../controllers/authController');

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Ruta de inicio de sesión
router.get('/login', loginPage);

// Ruta de registro de usuario
router.post('/register', upload.single('ProfilePicture'), registerUser);

// Ruta de autenticación
router.post('/auth', authenticateUser);

// Ruta PUT para actualizar la imagen de perfil

router.put('/profile/:UserID', validateToken, upload.single('ProfilePicture'), updateUserProfile);


module.exports = router;