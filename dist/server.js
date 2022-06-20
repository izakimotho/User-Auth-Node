"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const config_json_1 = __importDefault(require("./config/config.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const middleware = __importStar(require("./middleware/middleware"));
const Dao_1 = require("./dao/Dao");
const NoAuthRoutes_1 = require("./router/NoAuthRoutes");
const AuthRoutes_1 = require("./router/AuthRoutes");
const _404_1 = require("./404/404");
// Load .env
dotenv_1.default.config();
const app = express_1.default();
const PORT = process.env.PORT || 2020;
const accessLogStream = fs_extra_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan_1.default('dev'));
app.use(morgan_1.default('combined', { stream: accessLogStream }));
app.use(cors_1.default());
// app.options('*', cors()) // Enable pre-flight
const con = mysql_1.default.createConnection({
    host: process.env.DB_HOST,
    user: config_json_1.default.db_user,
    password: process.env.DB_PASS,
    database: config_json_1.default.db_name,
});
const dao = new Dao_1.Dao(con);
con.connect((err) => {
    if (err) {
        console.log('Error connecting: ', err.stack);
        return;
    }
    console.log('Connected as id: ', con.threadId);
});
let authRoutes = new AuthRoutes_1.AuthRoutes(dao);
let noAuthRoutes = new NoAuthRoutes_1.NoAuthRoutes(dao);
//noAuthRoutes.init(dao);
app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(`/${process.env.API_VER}`, noAuthRoutes.router);
// app.use('/auth', middleware.checkToken, authRoutes.router);
// app.use(`/${process.env.API_VER}/`, middleware.checkToken, authRoutes.router);
// app.use(`/${process.env.API_VER}`, authRoutes.router);
app.use(`/${process.env.API_VER}`, middleware.checkToken, authRoutes.router);
app.use(_404_1.error_404);
app.use(_404_1.error_500);
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map