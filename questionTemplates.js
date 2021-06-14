// 题型设计

// 单选题模板
testSC: [
    {
        id: "qwsdjr125",
        subject: "操作系统原理",
        type: "sc",
        keywords: ["系统", "交互性"],
        question: "为了提高系统的交互性，人们设计了(__)",
        payload: {
            src: "",
            options: [
                "批处理系统",
                "分时系统",
                "实时系统",
                "分布式系统"
            ],
            answer: ["B"],
        },
        additionTime: "2020-04-20",
        lastUseTime: "2020-ss-me-A",
    },
]

// 多选题模板
testMC: [
    {
        id: "1aexjr124",
        subject: "操作系统原理",
        type: "mc",
        keywords: ["存储管理", "主存空间"],
        question: "在存储管理中允许作业可不占有连续主存空间的是(__)",
        payload: {
            src: "",
            options: ["单用户连续管理",
            "页式存储管理",
            "段式存储管理",
            "可变分区存储管理",
            "段页式存储管理"],
            answer: ["B", "C", "E"]
        },
        additionTime: "2020-04-20",
        lastUseTime: "2020-ss-me-A"
    }
]

// 判断题模板
testTF: [
    {
        id: "5usertjet",
        subject: "操作系统原理",
        type: "tf",
        keywords: ["进程调度算法", "死锁"],
        question: "进程调度算法各种各样，如果选择不当，有的进程可能不能获得执行的机会，最后造成该进程死锁",
        payload: {
            src: "",
            options: [],
            answer: ["F"]
        },
        additionTime: "2020-04-20",
        lastUseTime: "2020-ss-me-A"
    }
]

// 填空题模板
testGF: [
    {
        id: "scmsdgsdf",
        subject: "操作系统原理",
        type: "mc",
        keywords: ["死锁"],
        question: "系统中有m个进程的，若出现死锁时死锁进程的个数为k，则(__)≤k≤(__)",
        payload: {
            src: "",
            options: [],
            answer: ["2", "m"]
        },
        additionTime: "2020-04-20",
        lastUseTime: "2020-ss-me-A"
    }
]

// 主观题模板
testSJ: [
    {
        id: "asgtjr124",
        subject: "操作系统原理",
        type: "mc",
        keywords: ["短作业优先", "平均周转时间"],
        question: "设有三个作业，它们的提交时间及运行时间如下表，若采用短作业优先调度策略，试给出作业串行运行时的调度次序，计算平均周转时间",
        payload: {
            src: "pic addr",
            options: [],
            answer: ["answer...(latex formula)..."]
        },
        additionTime: "2020-04-20",
        lastUseTime: "2020-ss-me-A"
    }
]