# Relier

A fast feature rich minimalistic Microsoft Teams clone.

Project is live at : [Relier](https://ms19.tech/)

Postman collection for REST API : [Postman collection](https://drive.google.com/file/d/1v2Kn0nmGqSLAZbdTk-aP0yELQ-VZo1CN/view?usp=sharing)

OpenVidu (a wrapper over the Kurento media server) is used for the video calling functionality. It is self hosted at [Link](https://meetcrescendo.me/).

You can directly use the hosted one to test or deploy your own server.
# Setup instructions

Frontend Repository lives at : [Relier-front](https://github.com/meetcshah19/relier-front)

Use Latest nodejs (14+).

Install mysql and edit your mysql credentials in [ormconfig.json](https://github.com/meetcshah19/relier/blob/main/ormconfig.json) .

```bash
cd relier
git pull --recurse-submodules
npm install
```
```bash
cd src/relier-front
npm install
npm run build
```
```bash
cd src/relier
npm install typescript -g
npm start
```
# Microsoft engage submission by Meet Shah
