const sections = Array.from(document.querySelectorAll("main .section"));
const navLinks = Array.from(document.querySelectorAll(".topnav a"));
const counters = document.querySelectorAll(".counter");
const projectPills = Array.from(document.querySelectorAll(".project-pill"));
const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));
const focusToggle = document.getElementById("focusToggle");
const spotlightTitle = document.getElementById("spotlightTitle");
const spotlightText = document.getElementById("spotlightText");
const spotlightMetaOne = document.getElementById("spotlightMetaOne");
const spotlightMetaTwo = document.getElementById("spotlightMetaTwo");
const spotlightMetaThree = document.getElementById("spotlightMetaThree");

const projectMeta = {
  training: {
    title: "管培生培养体系建设项目",
    text: "从零起步搭建覆盖“选拔—培养—发展”的完整培养体系，为公司后续梯队建设形成可复制底座。",
    metaOne: "体系搭建",
    metaTwo: "留存率 91%",
    metaThree: "标准化 / 可复制 / 可推广",
  },
  ssc: {
    title: "人力资源服务共享中心建设项目",
    text: "参与流程体系建设、系统测试、上线准备与组织落地，在复杂协同场景中建立系统化运营视角。",
    metaOne: "共享中心建设",
    metaTwo: "流程、系统、上线三线并进",
    metaThree: "流程沉淀 / UAT / 组织统筹",
  },
  entry: {
    title: "F项目-人员入职专项支援",
    text: "在短周期、高压力、跨区域背景下完成 600+ 员工接收支援，是共享中心能力迁移到实战场景的关键验证。",
    metaOne: "专项支援",
    metaTwo: "600+ 员工接收",
    metaThree: "高压交付 / 批量协同 / 知识沉淀",
  },
  payroll: {
    title: "薪酬数据采集与治理",
    text: "在集团与国资委 2.0 采集体系切换期，承担复杂口径承接、区域指导与高强度数据治理任务。",
    metaOne: "数据治理",
    metaTwo: "4W+ 报错两周清零",
    metaThree: "规则拆解 / 跨系统校验 / 区域闭环",
  },
};

let activeProject = "training";

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    threshold: 0.25,
    rootMargin: "-10% 0px -55% 0px",
  },
);

sections.forEach((section) => observer.observe(section));

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

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

function renderSpotlight(key) {
  const meta = projectMeta[key];
  activeProject = key;
  spotlightTitle.textContent = meta.title;
  spotlightText.textContent = meta.text;
  spotlightMetaOne.textContent = meta.metaOne;
  spotlightMetaTwo.textContent = meta.metaTwo;
  spotlightMetaThree.textContent = meta.metaThree;

  projectPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.project === key);
  });

  projectCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.projectCard === key);
  });
}

projectPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    renderSpotlight(pill.dataset.project);
  });
});

if (focusToggle) {
  focusToggle.addEventListener("click", () => {
    const keys = Object.keys(projectMeta);
    const nextIndex = (keys.indexOf(activeProject) + 1) % keys.length;
    renderSpotlight(keys[nextIndex]);
  });
}

counters.forEach((counter) => animateCounter(counter));
renderSpotlight(activeProject);
