const jobs = [
      {
        id: 1,
        companyName: "Mobile First Corp",
        position: "React Native Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$130,000 - $175,000",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
        status: null
      },
      {
        id: 2,
        companyName: "WebFlow Agency",
        position: "Web designer and Developer",
        location: "los angeles, CA",
        type: "Part-time",
        salary: "$80,000 - $120,000",
        description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
        status: null
      },
      {
        id: 3,
        companyName: "DataViz Solutions",
        position: "Data Visualization Specialist",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$165,000 - $185,000",
        description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
        status: null
      },
      {
        id: 4,
        companyName: "CloudFast Inc",
        position: "Backend Developer",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$140,000 - $190,000",
        description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
        status: null
      },
      {
        id: 5,
        companyName: "Innovation Labs",
        position: "UI/UX Designer",
        location: "Austin, TX",
        type: "Contract",
        salary: "$52/hr",
        description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
        status: null
      },
      {
        id: 6,
        companyName: "Megacorp Solutions",
        position: "JavaScript Developer",
        location: "New York, NY",
        type: "Hybrid",
        salary: "$78,000 - $89,000",
        description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
        status: null
      },
      {
        id: 7,
        companyName: "PulseGrid Media",
        position: "Content Strategist",
        location: "Los Angeles, CA",
        type: "Part-time",
        salary: "$46,000 - $58,000",
        description: "Plan editorial calendars and optimize content performance across channels.",
        status: null
      },
      {
        id: 8,
        companyName: "Aether Cyber",
        position: "Security Analyst",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$102,000 - $118,000",
        description: "Investigate incidents and strengthen controls for enterprise security operations.",
        status: null
      }
    ];

    const state = {
      activeTab: "all"
    };

    const jobsGrid = document.getElementById("jobsGrid");
    const emptyState = document.getElementById("emptyState");
    const totalCount = document.getElementById("totalCount");
    const interviewCount = document.getElementById("interviewCount");
    const rejectedCount = document.getElementById("rejectedCount");
    const tabCount = document.getElementById("tabCount");
    const tabs = document.querySelectorAll(".tab");

    function getFilteredJobs() {
      if (state.activeTab === "all") return jobs;
      return jobs.filter((job) => job.status === state.activeTab);
    }

    function getStatusButton(status) {
      if (status === "interview") {
        return { label: "Applied", className: "btn-status-applied" };
      }
      if (status === "rejected") {
        return { label: "Rejected", className: "btn-status-rejected" };
      }
      return { label: "Not Applied", className: "btn-status-not-applied" };
    }

    function updateCounts() {
      const total = jobs.length;
      const interview = jobs.filter((job) => job.status === "interview").length;
      const rejected = jobs.filter((job) => job.status === "rejected").length;

      totalCount.textContent = total;
      interviewCount.textContent = interview;
      rejectedCount.textContent = rejected;

      const tabJobs = getFilteredJobs();
      tabCount.textContent = `${tabJobs.length} ${tabJobs.length === 1 ? "job" : "jobs"}`;
    }

    function renderJobs() {
      const filtered = getFilteredJobs();
      jobsGrid.innerHTML = "";

      if (filtered.length === 0 && state.activeTab !== "all") {
        emptyState.classList.add("show");
      } else if (filtered.length === 0) {
        emptyState.classList.add("show");
        emptyState.querySelector(".empty-sub").textContent = "All jobs have been deleted. Add more jobs to continue tracking.";
      } else {
        emptyState.classList.remove("show");
        emptyState.querySelector(".empty-sub").textContent = "Mark jobs as Interview or Rejected to see them here.";
      }

      filtered.forEach((job) => {
        const card = document.createElement("article");
        card.className = "job-card";
        card.dataset.id = String(job.id);

        const statusButton = getStatusButton(job.status);
        const interviewActive = job.status === "interview" ? "active" : "";
        const rejectedActive = job.status === "rejected" ? "active" : "";

        card.innerHTML = `
          <div class="job-head">
            <div>
              <p class="job-company">${job.companyName}</p>
              <h3 class="job-position">${job.position}</h3>
            </div>
            <button class="btn-delete btn-delete-top" data-action="delete">Delete</button>
          </div>
          <div class="job-meta">
            <span class="chip">${job.location}</span>
            <span class="chip">${job.type}</span>
            <span class="chip">${job.salary}</span>
          </div>
          <div class="status-row">
            <button class="btn-status ${statusButton.className}" type="button">${statusButton.label}</button>
          </div>
          <p class="job-desc">${job.description}</p>
          <div class="actions">
            <button class="btn-interview ${interviewActive}" data-action="interview">Interview</button>
            <button class="btn-rejected ${rejectedActive}" data-action="rejected">Rejected</button>
          </div>
        `;

        jobsGrid.appendChild(card);
      });

      updateCounts();
    }

    function setActiveTab(tab) {
      state.activeTab = tab;
      tabs.forEach((item) => {
        item.classList.toggle("active", item.dataset.tab === tab);
      });
      renderJobs();
    }

    document.querySelector(".tabs").addEventListener("click", (event) => {
      const tabButton = event.target.closest(".tab");
      if (!tabButton) return;
      setActiveTab(tabButton.dataset.tab);
    });

    jobsGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const card = button.closest(".job-card");
      if (!card) return;

      const id = Number(card.dataset.id);
      const targetJob = jobs.find((job) => job.id === id);
      if (!targetJob) return;

      const action = button.dataset.action;

      if (action === "delete") {
        const index = jobs.findIndex((job) => job.id === id);
        if (index !== -1) jobs.splice(index, 1);
      }

      if (action === "interview") {
        targetJob.status = targetJob.status === "interview" ? null : "interview";
      }

      if (action === "rejected") {
        targetJob.status = targetJob.status === "rejected" ? null : "rejected";
      }

      renderJobs();
    });

    renderJobs();
