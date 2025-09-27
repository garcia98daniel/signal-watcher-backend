"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const watchlists_routes_1 = __importDefault(require("./watchlists/watchlists.routes"));
const events_routes_1 = __importDefault(require("./events/events.routes"));
const statistics_routes_1 = __importDefault(require("./statistics/statistics.routes"));
const router = (0, express_1.Router)();
router.use('/watchlists', watchlists_routes_1.default);
router.use('/events', events_routes_1.default);
router.use('/statistics', statistics_routes_1.default);
exports.default = router;
