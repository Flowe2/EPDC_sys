// 题库管理controller

// 调用封装JWT工具
const e = require('express');
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 查询单选题
exports.getSingleChoiceList = async function (data) {
    let res = { singlechoicelist: [], counter: 0 };
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    const test = [
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr125",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr126",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr127",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr128",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          id: "qwsdjr124",
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              { A: "批处理系统" },
              { B: "分时系统" },
              { C: "实时系统" },
              { D: "分布式系统" },
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
      ];
    res.singlechoicelist = test;
    res.counter = test.length;
    return res;
    // // 预处理查询参数
    // const targetCol = 'syslog';
    // const query = { };
    // const options = { projection: { 'timestamp': 1, 'role': 1, 'who': 1, 'operation': 1 } };
    // try {
    //     res.syslog = await thDB.findUser(targetCol, query, options);
    //     res.counter = res.syslog.length;
    //     return res;
    // } catch (e) {
    //     throw (e);
    // }
}