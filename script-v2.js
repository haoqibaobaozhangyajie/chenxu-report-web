const counters = document.querySelectorAll(".v2-counter");
const cycleButton = document.getElementById("v2CycleButton");
const projectTabs = Array.from(document.querySelectorAll(".v2-project-tab"));

const projectTitle = document.getElementById("v2ProjectTitle");
const projectSummary = document.getElementById("v2ProjectSummary");
const metricOne = document.getElementById("v2MetricOne");
const metricTwo = document.getElementById("v2MetricTwo");
const metricThree = document.getElementById("v2MetricThree");
const detailOne = document.getElementById("v2DetailOne");
const detailTwo = document.getElementById("v2DetailTwo");
const detailThree = document.getElementById("v2DetailThree");

const projects = {
  training: {
    title: "管培生培养体系建设项目",
    summary: "从零起步搭建覆盖“选拔—培养—发展”的完整培养体系，为公司后续梯队建设形成可复制底座。",
    one: "体系搭建",
    two: "留存率 91%",
    three: "标准化 / 可复制 / 可推广",
    detailOne:
      "公司启动管培生培养体系建设，期望形成覆盖入职融入、岗位实践、导师辅导、课程学习、轮岗锻炼与阶段评价的统一路径。项目初期缺乏可执行方案，需要从零设计。",
    detailTwo: [
      "设计 IDP 双线培养结构与年度模板",
      "重构导师制流程与辅导机制",
      "搭建学习任务、参访、轮岗、评价等完整模块",
      "形成覆盖三年的培养路径框架",
    ],
    detailThree: [
      "体系成型度高，可落地、可复制、可交接",
      "整体留存率达 91%，组织口碑与体验双提升",
      "多区域和业务线主动借鉴，形成内部推广模式",
    ],
  },
  ssc: {
    title: "人力资源服务共享中心建设项目",
    summary: "参与流程体系建设、系统测试、上线准备与组织落地，在复杂协同场景中建立系统化运营视角。",
    one: "共享中心建设",
    two: "流程 / 系统 / 上线三线并进",
    three: "流程沉淀 / UAT / 组织统筹",
    detailOne:
      "在共享中心建设过程中，围绕业务拉通、流程固化、系统测试和上线准备展开工作，支撑统一口径和标准化人事运营体系建设。",
    detailTwo: [
      "参与二级流程、三级 SOP、数据字典、知识库输出",
      "参与润税、润聘、企业年金等多系统测试验证",
      "支撑 SSC 团队搭建、培训组织、场地建设与上线演练",
    ],
    detailThree: [
      "建立起“业务—系统—数据”关联认识",
      "提升流程沉淀和跨区域差异理解能力",
      "形成更强的项目节奏感和资源统筹能力",
    ],
  },
  entry: {
    title: "F项目-人员入职专项支援",
    summary: "在短周期、高压力、跨区域背景下完成 600+ 员工接收支援，是共享中心能力迁移到实战场景的关键验证。",
    one: "专项支援",
    two: "600+ 员工接收",
    three: "高压交付 / 批量协同 / 知识沉淀",
    detailOne:
      "因业务需求与组织调整，需要在极短周期内承接大批量跨区域入职任务，对准确性、响应速度和跨区域协同提出极高要求。",
    detailTwo: [
      "承担批量入职全流程关键节点",
      "编写临时 SOP、注意事项与常见问题指南",
      "支撑跨区域批量操作落地与问题解答",
    ],
    detailThree: [
      "完成高压交付并形成标准化成果",
      "强化进度追踪、优先级判断与现场协调能力",
      "实现 SSC 流程理解向实战执行能力迁移",
    ],
  },
  payroll: {
    title: "薪酬数据采集与治理",
    summary: "在集团与国资委 2.0 采集体系切换期，承担复杂口径承接、区域指导与高强度数据治理任务。",
    one: "数据治理",
    two: "4W+ 报错两周清零",
    three: "规则拆解 / 跨系统校验 / 区域闭环",
    detailOne:
      "面对集团与国资委 2.0 采集体系切换带来的口径统一、历史数据差异和系统映射问题，需要快速吃透规则并推动各区域落地执行。",
    detailTwo: [
      "建立横向比对、纵向校验、跨系统验证机制",
      "重建高频字段逻辑与字段对照关系",
      "沉淀问题库、示例表和区域标准化任务清单",
    ],
    detailThree: [
      "4W+ 条系统报错两周内完成清理",
      "历史补采节点顺利提交，无退回或延误",
      "区域高频错误显著下降，并沉淀出可复用标准成果",
    ],
  },
};

let activeKey = "training";

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || "";
  const start = performance.now();
  const duration = 1200;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function renderList(node, items) {
  node.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderProject(key) {
  const project = projects[key];
  activeKey = key;

  projectTitle.textContent = project.title;
  projectSummary.textContent = project.summary;
  metricOne.textContent = project.one;
  metricTwo.textContent = project.two;
  metricThree.textContent = project.three;
  detailOne.textContent = project.detailOne;
  renderList(detailTwo, project.detailTwo);
  renderList(detailThree, project.detailThree);

  projectTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.key === key);
  });
}

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderProject(tab.dataset.key));
});

if (cycleButton) {
  cycleButton.addEventListener("click", () => {
    const keys = Object.keys(projects);
    const nextIndex = (keys.indexOf(activeKey) + 1) % keys.length;
    renderProject(keys[nextIndex]);
  });
}

counters.forEach((counter) => animateCounter(counter));
renderProject(activeKey);
