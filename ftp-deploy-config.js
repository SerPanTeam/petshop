import { fileURLToPath } from "url";
import { dirname } from "path";

import dotenv from "dotenv";
// Загружаем переменные окружения
dotenv.config();

// Эмулируем __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import FtpDeploy from "ftp-deploy";
//import dotenv from "dotenv";

dotenv.config();

const ftpDeploy = new FtpDeploy();
const config = {
  user: "petshop@petshop.panchenko.work", // Замените на ваш FTP-логин
  password: process.env.VITE_FTP_PASSWORD, // Замените на ваш FTP-пароль
  host: "185.67.3.96", // Например, ftp.example.com
  port: 21, // Стандартный порт FTP
  localRoot: __dirname + "/dist", // Путь к вашему build (проверьте корректность пути!)
  remoteRoot: "/", // Путь на хостинге, куда нужно загружать файлы
  include: ["*", "**/*", ".htaccess"], // Какие файлы включить
  deleteRemote: true, // Удалять файлы на сервере перед загрузкой
  forcePasv: true, // Включить пассивный режим
};

ftpDeploy
  .deploy(config)
  .then(() => console.log("Сборка успешно загружена на сервер!"))
  .catch((err) => console.error(err));
