"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controllers/menuController");
const router = (0, express_1.Router)();
// Add `/api` as the prefix for the menu route
router.get('/menu', menuController_1.getMenu);
exports.default = router;
