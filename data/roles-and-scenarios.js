/* ============================================================
   Digital Python Notes — Role Tracks + Production Scenarios
   (Spec sections #12, #18)
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";
  var IV = window.DP_INTERVIEW;
  if (!IV) { console.warn("DP_INTERVIEW missing"); return; }

  /* ---------- Role-based interview tracks ----------
     Each role maps to weighted topic buckets. Weights sum to 100.
     Keys map to existing DP_INTERVIEW.levels values. */
  IV.roles = [
    { id: "fresher", name: "Python Fresher", icon: "🐣", targetExp: 1,
      summary: "Entry-level Python role. Focus: fundamentals, small coding, HR fit.",
      topicWeights: {
        "Python Basics": 30, "Control Flow": 10, "Collections": 10,
        "Functions": 10, "OOP": 10, "Coding Problems": 10,
        "Output-Based": 10, "HR & Behavioural": 10
      } },

    { id: "developer", name: "Python Developer", icon: "🐍", targetExp: 3,
      summary: "General Python engineer building applications and services.",
      topicWeights: {
        "Python Basics": 10, "OOP": 15, "Advanced Python": 15,
        "Coding Problems": 20, "Libraries": 10, "Database": 10,
        "APIs": 10, "Debugging": 5, "HR & Behavioural": 5
      } },

    { id: "backend", name: "Python Backend Developer", icon: "🖥️", targetExp: 4,
      summary: "FastAPI/Django/Flask backends, databases, APIs, auth.",
      topicWeights: {
        "OOP": 10, "Advanced Python": 10, "APIs": 20,
        "Database": 20, "Coding Problems": 15,
        "System Design": 10, "Security": 5, "Cloud": 5, "HR & Behavioural": 5
      } },

    { id: "django", name: "Django Developer", icon: "🎯", targetExp: 4,
      summary: "Django-centric web dev — ORM, views, DRF, deploy.",
      topicWeights: {
        "OOP": 15, "APIs": 25, "Database": 20, "Libraries": 10,
        "Coding Problems": 10, "Security": 5, "Testing": 5, "HR & Behavioural": 10
      } },

    { id: "fastapi", name: "FastAPI Developer", icon: "⚡", targetExp: 4,
      summary: "Async APIs, pydantic, background jobs, high-throughput services.",
      topicWeights: {
        "APIs": 25, "Advanced Python": 15, "Concurrency": 15,
        "Database": 15, "Coding Problems": 10, "Cloud": 10,
        "Testing": 5, "HR & Behavioural": 5
      } },

    { id: "automation", name: "Automation Engineer", icon: "🤖", targetExp: 3,
      summary: "Selenium, PyAutoGUI, scripts, DevOps glue, CI/CD.",
      topicWeights: {
        "Python Basics": 15, "Libraries": 25, "File Handling": 10,
        "DevOps": 20, "Coding Problems": 10, "Debugging": 10, "HR & Behavioural": 10
      } },

    { id: "analyst", name: "Data Analyst", icon: "📊", targetExp: 2,
      summary: "SQL + Pandas + visualisations. Answers business questions with data.",
      topicWeights: {
        "Python Basics": 15, "Libraries": 25, "Database": 25,
        "Data Engineering": 15, "Coding Problems": 10, "HR & Behavioural": 10
      } },

    { id: "scientist", name: "Data Scientist", icon: "🔬", targetExp: 4,
      summary: "ML modelling, feature engineering, evaluation, deployment.",
      topicWeights: {
        "Python Basics": 10, "AI/ML": 30, "Libraries": 15,
        "Data Engineering": 15, "Coding Problems": 15,
        "System Design": 10, "HR & Behavioural": 5
      } },

    { id: "dataeng", name: "Data Engineer", icon: "🚚", targetExp: 4,
      summary: "Pipelines, Spark, Airflow, Kafka, warehousing.",
      topicWeights: {
        "Data Engineering": 25, "Database": 20, "Database Deep-Dive": 15,
        "Cloud": 15, "Coding Problems": 10, "DevOps": 10, "HR & Behavioural": 5
      } },

    { id: "devops", name: "DevOps Engineer", icon: "⚙️", targetExp: 4,
      summary: "Docker, K8s, CI/CD, observability, IaC with Python glue.",
      topicWeights: {
        "DevOps": 30, "Cloud": 20, "Networking": 15,
        "Python Basics": 10, "Coding Problems": 10, "Security": 10, "HR & Behavioural": 5
      } },

    { id: "cloud", name: "Cloud Python Developer", icon: "☁️", targetExp: 4,
      summary: "AWS/GCP/Azure services, Lambda, S3, Dynamo, IaC.",
      topicWeights: {
        "Cloud": 30, "APIs": 15, "System Design": 15,
        "DevOps": 15, "Advanced Python": 10, "Security": 10, "HR & Behavioural": 5
      } },

    { id: "aiml", name: "AI/ML Engineer", icon: "🧠", targetExp: 4,
      summary: "Model training + serving, MLOps, monitoring drift.",
      topicWeights: {
        "AI/ML": 35, "Advanced Python": 10, "Data Engineering": 15,
        "Coding Problems": 10, "Cloud": 10, "System Design": 10, "HR & Behavioural": 10
      } },

    { id: "genai", name: "GenAI / LLM Engineer", icon: "🪄", targetExp: 4,
      summary: "RAG, agents, embeddings, vector DBs, prompt engineering.",
      topicWeights: {
        "LLM & AI Specialty": 35, "AI/ML": 15, "APIs": 15,
        "Cloud": 10, "System Design": 10, "Advanced Python": 10, "HR & Behavioural": 5
      } },

    { id: "lead", name: "Python Tech Lead", icon: "🧭", targetExp: 6,
      summary: "Owns a service, mentors, drives design + delivery.",
      topicWeights: {
        "System Design": 20, "Advanced Python": 15, "OOP": 10,
        "Coding Problems": 10, "Scenario-Based": 15, "APIs": 10,
        "Database": 10, "HR & Behavioural": 10
      } },

    { id: "architect", name: "Python Architect / Principal", icon: "🏛️", targetExp: 7,
      summary: "Multi-service architecture, trade-offs, org-level tech decisions.",
      topicWeights: {
        "System Design": 35, "Scenario-Based": 20, "Advanced Python": 10,
        "Security": 10, "Data Engineering": 10, "Cloud": 10, "HR & Behavioural": 5
      } }
  ];

  /* ---------- Role-based question picker ----------
     Uses the topic weights to sample a distributed set. */
  IV.pickByRole = function (roleId, totalCount) {
    var role = null;
    for (var i = 0; i < IV.roles.length; i++) if (IV.roles[i].id === roleId) { role = IV.roles[i]; break; }
    if (!role) return [];
    totalCount = totalCount || 20;

    // Turn weights into target counts
    var targets = {};
    var sumWeight = 0;
    Object.keys(role.topicWeights).forEach(function (k) { sumWeight += role.topicWeights[k]; });
    Object.keys(role.topicWeights).forEach(function (k) {
      targets[k] = Math.max(1, Math.round((role.topicWeights[k] / sumWeight) * totalCount));
    });

    // Pool candidates per topic, sorted by frequency + expLevel proximity
    var freqW = { extreme: 4, very: 3, often: 2, common: 1, rare: 0 };
    var picks = [];
    var pickedIndexes = {};
    Object.keys(targets).forEach(function (topic) {
      var pool = IV.questions.map(function (q, i) { return { q: q, index: i }; })
                             .filter(function (x) { return x.q.level === topic; });
      pool.sort(function (a, b) {
        var fa = (freqW[a.q.frequency] || 0), fb = (freqW[b.q.frequency] || 0);
        var expA = Math.abs((a.q.expLevel || 3) - role.targetExp);
        var expB = Math.abs((b.q.expLevel || 3) - role.targetExp);
        // Higher freq first, then closer expLevel, then random
        if (fb !== fa) return fb - fa;
        return expA - expB;
      });
      // Take target count, shuffle a bit
      var take = pool.slice(0, Math.min(targets[topic] * 2, pool.length));
      for (var i2 = take.length - 1; i2 > 0; i2--) {
        var j = Math.floor(Math.random() * (i2 + 1));
        var tmp = take[i2]; take[i2] = take[j]; take[j] = tmp;
      }
      take.slice(0, targets[topic]).forEach(function (p) {
        if (!pickedIndexes[p.index]) { picks.push(p); pickedIndexes[p.index] = true; }
      });
    });

    // Trim/pad to totalCount
    if (picks.length > totalCount) picks = picks.slice(0, totalCount);
    if (picks.length < totalCount) {
      // Fill from any high-frequency questions not yet picked
      var fill = IV.questions.map(function (q, i) { return { q: q, index: i }; })
                             .filter(function (x) { return !pickedIndexes[x.index]; })
                             .sort(function (a, b) { return (freqW[b.q.frequency] || 0) - (freqW[a.q.frequency] || 0); });
      picks = picks.concat(fill.slice(0, totalCount - picks.length));
    }
    return picks;
  };

  /* ---------- "Interview Tomorrow" time-boxed sessions ----------
     Uses target minutes to pick a proportional set. */
  IV.timePlans = [
    { minutes: 30,  questions: 15, note: "Rapid last-minute revision" },
    { minutes: 60,  questions: 25, note: "Solid warm-up session" },
    { minutes: 90,  questions: 40, note: "Full interview simulation" },
    { minutes: 120, questions: 55, note: "Deep prep, includes SD + scenarios" }
  ];
  /* Time-boxed pick — reuses role weights if roleId is given, else balanced defaults */
  IV.pickForTime = function (minutes, roleId) {
    var plan = null;
    for (var i = 0; i < IV.timePlans.length; i++) if (IV.timePlans[i].minutes === minutes) { plan = IV.timePlans[i]; break; }
    if (!plan) plan = { questions: Math.max(10, Math.round(minutes / 2)) };
    if (roleId) return IV.pickByRole(roleId, plan.questions);
    // Default distribution: balanced mid-level developer
    return IV.pickByRole("developer", plan.questions);
  };

  /* ---------- Production Scenarios (Spec #18) ---------- */
  IV.scenarios = [
    { id: "sc-cpu-100",
      title: "API pod running at 100% CPU",
      difficulty: "Advanced", expLevel: 5, topic: "Performance",
      context: "A user-facing FastAPI service is showing 100% CPU on 3 of 5 pods. Requests are timing out. Team pinged you at 2am.",
      symptom: "P99 latency jumped from 200ms to 8000ms. HPA is not scaling further.",
      steps: [
        { phase: "Detect",       action: "Check pod metrics (CPU/mem/GC). Look at APM traces. Are all pods bad or just some?" },
        { phase: "Investigate",  action: "Attach py-spy or run cProfile on one hot pod. Look for hot loops or new deploy commits." },
        { phase: "Mitigate",     action: "Scale replicas manually. Roll back the last deploy if the correlation is strong." },
        { phase: "Fix",          action: "Fix the O(n²) hot path (a JSON serializer running per-item). Replace with orjson or pre-computed cache." },
        { phase: "Prevent",      action: "Add CPU alert at 70%. Add a benchmark test that fails if per-request CPU exceeds X ms." },
        { phase: "Monitor",      action: "Track p99 + CPU/req in Grafana. Alert on regressions." },
        { phase: "Postmortem",   action: "Blameless doc: what happened, timeline, root cause, action items with owners." }
      ],
      keywords: ["py-spy", "cProfile", "hot loop", "rollback", "hpa", "p99", "alert", "postmortem"]
    },

    { id: "sc-mem-leak",
      title: "Memory keeps climbing until pod OOMKilled",
      difficulty: "Advanced", expLevel: 5, topic: "Performance",
      context: "A background worker leaks memory over 8 hours until Kubernetes kills it. Restart cycle is annoying.",
      symptom: "RSS grows linearly. GC runs but doesn't reclaim. OOMKilled every 8h.",
      steps: [
        { phase: "Detect",       action: "Confirm growth in Grafana. Check container memory limit vs actual." },
        { phase: "Investigate",  action: "Use tracemalloc or memray to snapshot top allocations. Suspect global caches, module-level state, unclosed sessions." },
        { phase: "Mitigate",     action: "Reduce memory limit for faster restarts OR add liveness probe. Buy time." },
        { phase: "Fix",          action: "Root cause: unbounded LRU-style dict on messages. Replace with functools.lru_cache(maxsize=1024) or explicit bounded cache." },
        { phase: "Prevent",      action: "Add memory-growth CI gate. Code review: no unbounded module-level caches." },
        { phase: "Monitor",      action: "Track container memory. Alert on RSS > 80% of limit for 15 min." },
        { phase: "Postmortem",   action: "Document: why did the cache grow? Add lint rule to catch `cache = {}` at module scope in critical services." }
      ],
      keywords: ["tracemalloc", "memray", "unbounded cache", "lru_cache", "OOMKilled", "liveness probe"]
    },

    { id: "sc-slow-api",
      title: "One endpoint suddenly returns in 5s (was 100ms)",
      difficulty: "Intermediate", expLevel: 4, topic: "Performance",
      context: "The /users/{id}/orders endpoint used to return in 100ms. Since the last release it takes 5 seconds.",
      symptom: "Only that endpoint is slow. DB CPU is normal. Payload size is normal.",
      steps: [
        { phase: "Detect",       action: "Look at APM trace for the endpoint. Compare before/after deploy." },
        { phase: "Investigate",  action: "See N+1 query pattern? Was eager loading removed? Was an index dropped?" },
        { phase: "Mitigate",     action: "Add an in-memory cache with short TTL as a stopgap." },
        { phase: "Fix",          action: "Add selectinload/joinedload back OR compose the query with a JOIN." },
        { phase: "Prevent",      action: "Add a test that asserts <= 3 DB queries per request. Enable ORM query logging in staging." },
        { phase: "Monitor",      action: "Add p95 alert per endpoint. Track query count per endpoint." },
        { phase: "Postmortem",   action: "Why was eager loading removed? Add PR-review checklist for query performance." }
      ],
      keywords: ["N+1", "eager loading", "joinedload", "selectinload", "query count", "index"]
    },

    { id: "sc-db-lock",
      title: "Database queries are all timing out",
      difficulty: "Advanced", expLevel: 5, topic: "Database",
      context: "Every service that talks to Postgres is failing. Errors: 'canceling statement due to statement timeout'.",
      symptom: "Deadlocks in pg_stat_activity. Long-running transactions holding locks.",
      steps: [
        { phase: "Detect",       action: "SELECT * FROM pg_stat_activity WHERE state != 'idle'. Find blocking chain." },
        { phase: "Investigate",  action: "Which query is holding the lock? Which transaction started it? Is a session leaking?" },
        { phase: "Mitigate",     action: "SELECT pg_cancel_backend(pid) or pg_terminate_backend(pid) for the blocker. Restart affected pods." },
        { phase: "Fix",          action: "Root: a batch job took a table lock and hung. Move batch off-peak. Chunk large transactions. Set statement_timeout on all sessions." },
        { phase: "Prevent",      action: "statement_timeout = 30s at session level. lock_timeout = 5s. Reject queries that don't fit." },
        { phase: "Monitor",      action: "Alert on lock wait > 10s or number of active queries > N." },
        { phase: "Postmortem",   action: "Add runbook for lock investigation. Add auto-kill for queries > 5 min." }
      ],
      keywords: ["pg_stat_activity", "statement_timeout", "lock_timeout", "pg_cancel_backend", "deadlock", "chunk"]
    },

    { id: "sc-traffic-spike",
      title: "10x traffic spike from a marketing campaign",
      difficulty: "Advanced", expLevel: 5, topic: "System Design",
      context: "Marketing launched a promo. Traffic went from 500 RPS to 5000 RPS. Service is buckling.",
      symptom: "Latency up, 503s from load balancer, DB near max_connections.",
      steps: [
        { phase: "Detect",       action: "Grafana: RPS, p99, error rate. Confirm the spike shape." },
        { phase: "Investigate",  action: "What's the bottleneck: CPU, DB connections, external API rate limit, or downstream service?" },
        { phase: "Mitigate",     action: "Scale replicas. Add PgBouncer for connection pooling. Turn on caching for hot reads. Add rate limits to protect downstream." },
        { phase: "Fix",          action: "Move hot reads to Redis with TTL. Use CDN for static assets. Pre-warm autoscaling before next campaign." },
        { phase: "Prevent",      action: "Capacity plan before every marketing launch. Load test at 3x expected." },
        { phase: "Monitor",      action: "Add saturation-based alerts. Track cache hit ratio." },
        { phase: "Postmortem",   action: "Cross-team review: marketing + eng share upcoming campaigns 1 week ahead." }
      ],
      keywords: ["pgbouncer", "connection pool", "cache", "cdn", "rate limit", "load test", "autoscale"]
    },

    { id: "sc-deploy-fail",
      title: "Rolling deploy stuck — new pods crash on start",
      difficulty: "Intermediate", expLevel: 4, topic: "DevOps",
      context: "Kubernetes rolling update is stuck. New pods hit CrashLoopBackOff.",
      symptom: "Old pods still serving. New pods die within 3 seconds of start.",
      steps: [
        { phase: "Detect",       action: "kubectl describe pod / kubectl logs — find the crash reason." },
        { phase: "Investigate",  action: "Config mismatch? Missing env var? DB schema not migrated? Failing health check?" },
        { phase: "Mitigate",     action: "kubectl rollout undo — revert to the previous ReplicaSet immediately." },
        { phase: "Fix",          action: "Root: DB migration for new version didn't run. Fix: run migrations pre-deploy, or make code backwards-compatible for one version." },
        { phase: "Prevent",      action: "CI gate: staging must run migrations + smoke tests before prod deploy. Use canary deploys." },
        { phase: "Monitor",      action: "Alert if rollout time exceeds N minutes." },
        { phase: "Postmortem",   action: "Document deploy checklist. Automate the DB migration step." }
      ],
      keywords: ["rollout undo", "crashloopbackoff", "migration", "canary", "smoke test", "health check"]
    },

    { id: "sc-queue-backlog",
      title: "Celery queue backlog growing — jobs waiting hours",
      difficulty: "Advanced", expLevel: 5, topic: "System Design",
      context: "Celery queue depth is 500k jobs. Users are complaining orders aren't emailed for hours.",
      symptom: "Job success rate is high, but throughput is low. Worker utilisation is 40%.",
      steps: [
        { phase: "Detect",       action: "Flower dashboard: queue length, worker count, task duration histogram." },
        { phase: "Investigate",  action: "Are tasks slow (network, DB)? Are workers under-scaled? Is there a poison message eating a worker?" },
        { phase: "Mitigate",     action: "Scale worker replicas immediately. Split urgent tasks to a higher-priority queue." },
        { phase: "Fix",          action: "Batch DB writes inside the task. Move heavy work to a dedicated queue with its own workers." },
        { phase: "Prevent",      action: "Track queue depth. Alert if > threshold for 5 min. Set task_time_limit to catch stuck tasks." },
        { phase: "Monitor",      action: "Grafana: queue depth per queue, tasks/min per worker." },
        { phase: "Postmortem",   action: "Add SLO for job P95 latency. Runbook for queue backlog." }
      ],
      keywords: ["celery", "worker", "queue depth", "priority queue", "task_time_limit", "flower"]
    },

    { id: "sc-3rd-party-down",
      title: "Third-party API is down — we're failing too",
      difficulty: "Intermediate", expLevel: 4, topic: "Reliability",
      context: "Payment provider is returning 500s. Our checkout flow is failing because we don't handle it gracefully.",
      symptom: "20% of checkouts erroring. No retry, no fallback, no user message.",
      steps: [
        { phase: "Detect",       action: "Alert triggered on checkout error rate. Confirm upstream via their status page." },
        { phase: "Investigate",  action: "Which endpoints fail? Which retryable? Which idempotent?" },
        { phase: "Mitigate",     action: "Feature flag off the payment step OR show 'try again later' banner. Do NOT lose the cart." },
        { phase: "Fix",          action: "Add exponential backoff + jitter, circuit breaker, and idempotency key for payment calls." },
        { phase: "Prevent",      action: "For every external call: timeout + retries + circuit breaker + fallback path." },
        { phase: "Monitor",      action: "Track external call error rate and latency per upstream." },
        { phase: "Postmortem",   action: "Update runbook per upstream. Establish SLO with upstream provider." }
      ],
      keywords: ["circuit breaker", "exponential backoff", "idempotency", "timeout", "fallback", "SLO"]
    },

    { id: "sc-cache-fail",
      title: "Redis went down — everything got slow",
      difficulty: "Advanced", expLevel: 5, topic: "Reliability",
      context: "Cache cluster hit a bug and failed over. During failover, all reads went to Postgres.",
      symptom: "DB CPU 100%. Latency 10x. Site slow for 20 minutes.",
      steps: [
        { phase: "Detect",       action: "Cache hit ratio dropped to 0%. DB load exploded. Correlation with cache failover." },
        { phase: "Investigate",  action: "Did we thundering-herd the DB? Do we have a stampede-protection strategy?" },
        { phase: "Mitigate",     action: "Rate-limit incoming traffic at LB. Increase DB read replicas." },
        { phase: "Fix",          action: "Add probabilistic early expiration, request coalescing (single-flight), and a small in-process LRU as second tier." },
        { phase: "Prevent",      action: "Chaos test: kill Redis in staging weekly. Design system to survive." },
        { phase: "Monitor",      action: "Alert if cache hit rate drops or DB CPU rises together." },
        { phase: "Postmortem",   action: "Update HA architecture doc. Multi-tier cache pattern." }
      ],
      keywords: ["thundering herd", "single-flight", "cache stampede", "read replica", "chaos test", "hit ratio"]
    },

    { id: "sc-race-condition",
      title: "Same user got charged twice",
      difficulty: "Advanced", expLevel: 5, topic: "Correctness",
      context: "Support tickets: 12 users say they were charged twice for the same order in 10 minutes.",
      symptom: "Order table has 2 rows for the same payment. Neither has an idempotency key.",
      steps: [
        { phase: "Detect",       action: "Query orders GROUP BY user_id + amount + timestamp → identify duplicates." },
        { phase: "Investigate",  action: "Frontend retried on timeout. Backend didn't dedupe. Two POSTs, two charges." },
        { phase: "Mitigate",     action: "Refund the duplicates. Notify affected users." },
        { phase: "Fix",          action: "Add Idempotency-Key header. Unique index on (user_id, idempotency_key) at DB." },
        { phase: "Prevent",      action: "Any money-moving endpoint: require idempotency key. Load test for the retry-on-timeout pattern." },
        { phase: "Monitor",      action: "Alert if duplicate detection triggers > threshold per hour." },
        { phase: "Postmortem",   action: "Money-safety checklist added to code review template." }
      ],
      keywords: ["idempotency", "unique index", "duplicate", "retry", "double charge", "at-least-once"]
    },

    { id: "sc-deadlock",
      title: "Two services keep deadlocking each other",
      difficulty: "Expert", expLevel: 6, topic: "Concurrency",
      context: "Service A calls B, B calls A on some events. Occasionally both freeze.",
      symptom: "Both services show waiting threads. Timeouts fire.",
      steps: [
        { phase: "Detect",       action: "Thread dump: py-spy dump. Both services block on I/O to each other." },
        { phase: "Investigate",  action: "Where is the cyclic call graph? Is it a lock cycle or a call cycle?" },
        { phase: "Mitigate",     action: "Increase timeouts short-term. Add correlation IDs to log both sides of the cycle." },
        { phase: "Fix",          action: "Break the cycle: introduce an event bus. A publishes, B consumes async — no back-call." },
        { phase: "Prevent",      action: "No sync cross-service calls except in strict tree topology. Sequence diagram in every design doc." },
        { phase: "Monitor",      action: "Detect cyclic traces in the tracing system." },
        { phase: "Postmortem",   action: "Architecture principle: no cyclic dependencies." }
      ],
      keywords: ["thread dump", "cyclic dependency", "event bus", "async", "correlation id", "sequence diagram"]
    },

    { id: "sc-security-leak",
      title: "Secret leaked in a public git commit",
      difficulty: "Expert", expLevel: 6, topic: "Security",
      context: "A dev accidentally committed AWS credentials to a public repo. Someone scanned and spun up EC2 instances on your bill.",
      symptom: "AWS bill alert. Unknown EC2 instances running in an unused region.",
      steps: [
        { phase: "Detect",       action: "GuardDuty alert. Billing anomaly. Public leak scanner (truffleHog) hit." },
        { phase: "Investigate",  action: "Which key? What did it have access to? What was accessed?" },
        { phase: "Mitigate",     action: "Revoke the key. Rotate all keys in that account. Terminate unknown resources. Add MFA." },
        { phase: "Fix",          action: "Remove from git history (BFG / git filter-repo). Move all secrets to AWS Secrets Manager." },
        { phase: "Prevent",      action: "Pre-commit hook: detect-secrets. CI scan on PRs. Never allow long-lived keys in code — use IAM roles." },
        { phase: "Monitor",      action: "Alert on new IAM users, root API calls, region anomalies." },
        { phase: "Postmortem",   action: "Full incident report to security team. Update onboarding to cover secrets handling." }
      ],
      keywords: ["truffleHog", "detect-secrets", "IAM role", "secrets manager", "MFA", "git filter-repo", "GuardDuty"]
    },

    { id: "sc-data-corrupt",
      title: "Bad ETL job wrote nulls into a critical column",
      difficulty: "Advanced", expLevel: 5, topic: "Data Engineering",
      context: "Overnight ETL wrote NULL to users.email for 30% of active users due to a bug. Emails are broken.",
      symptom: "Support tickets: 'my email is missing'. Marketing job failed at 6am.",
      steps: [
        { phase: "Detect",       action: "Query users where email IS NULL. Compare to yesterday's snapshot." },
        { phase: "Investigate",  action: "Which ETL run? Which pipeline? Was the raw source correct?" },
        { phase: "Mitigate",     action: "Restore from last-known-good snapshot / point-in-time recovery. Or backfill from source if it's authoritative." },
        { phase: "Fix",          action: "Fix ETL: never overwrite email with NULL. Use MERGE with COALESCE. Add explicit CHECK constraints." },
        { phase: "Prevent",      action: "ETL: dry-run mode + row-count diff before commit. Column-level assertions (dbt tests / Great Expectations)." },
        { phase: "Monitor",      action: "Data quality dashboard: null rate per critical column, per day." },
        { phase: "Postmortem",   action: "Add data contract with source system. Require sign-off for schema changes." }
      ],
      keywords: ["point-in-time recovery", "dbt tests", "Great Expectations", "COALESCE", "data contract", "row-count diff"]
    },

    { id: "sc-timeout-cascade",
      title: "One slow downstream is cascading into full outage",
      difficulty: "Advanced", expLevel: 5, topic: "Reliability",
      context: "Downstream recommendation service went slow. Now the whole homepage is failing.",
      symptom: "Requests queue up because they all wait for one slow call. Thread pool exhausted.",
      steps: [
        { phase: "Detect",       action: "APM: one downstream P99 spiked. Local thread pool saturated." },
        { phase: "Investigate",  action: "Is the downstream truly essential? Can it be degraded gracefully?" },
        { phase: "Mitigate",     action: "Add strict timeout on the call (200ms). Return a 'no recommendations' fallback if it fails." },
        { phase: "Fix",          action: "Circuit breaker: after N failures, short-circuit for M seconds. Return cached recommendations." },
        { phase: "Prevent",      action: "Rule: every RPC has a timeout tighter than the parent's SLA. Bulkhead: separate thread pools per dependency." },
        { phase: "Monitor",      action: "Alert on circuit-breaker trips. Track fallback rate." },
        { phase: "Postmortem",   action: "Design principle: graceful degradation — every non-critical path can be turned off." }
      ],
      keywords: ["circuit breaker", "timeout", "bulkhead", "graceful degradation", "fallback", "thread pool"]
    },

    { id: "sc-retry-storm",
      title: "Retry storm knocked out our own service",
      difficulty: "Advanced", expLevel: 5, topic: "Reliability",
      context: "Small blip in DB → clients retried aggressively → DB got hammered → total outage for 30 minutes.",
      symptom: "Traffic went from 500 RPS to 15000 RPS after the blip.",
      steps: [
        { phase: "Detect",       action: "Traffic pattern: linear rise after failures. Look at retry headers." },
        { phase: "Investigate",  action: "Are clients doing exponential backoff? Any jitter? Are they retrying non-idempotent calls?" },
        { phase: "Mitigate",     action: "Turn on rate limits at LB. Ask worst clients to back off." },
        { phase: "Fix",          action: "Exponential backoff + jitter on ALL client retries. Retry-After header from server on 429/503." },
        { phase: "Prevent",      action: "Test retry policies with fault injection." },
        { phase: "Monitor",      action: "Alert if RPS jumps > 5x baseline in < 1 min." },
        { phase: "Postmortem",   action: "Publish 'good citizen' client guidelines: backoff, jitter, respect 429/503." }
      ],
      keywords: ["exponential backoff", "jitter", "retry storm", "Retry-After", "rate limit", "fault injection"]
    },

    { id: "sc-worker-poison",
      title: "A poison message is killing every worker",
      difficulty: "Intermediate", expLevel: 4, topic: "Reliability",
      context: "One malformed message keeps crashing whichever worker picks it up. Queue never drains.",
      symptom: "Worker exits after ~5 seconds. Message goes back to queue. Next worker picks it up. Loop.",
      steps: [
        { phase: "Detect",       action: "Same task ID appears in error logs repeatedly. Delivery count > 3." },
        { phase: "Investigate",  action: "What crashes the parser? Unknown field? Encoding? Very large payload?" },
        { phase: "Mitigate",     action: "Move the message to a dead-letter queue. Unblock the main queue." },
        { phase: "Fix",          action: "Wrap parsing in try/except → send to DLQ if delivery_count > 3." },
        { phase: "Prevent",      action: "Schema validation before enqueue. Max message size at the broker level." },
        { phase: "Monitor",      action: "Alert on DLQ growth. Alert on high delivery-count messages." },
        { phase: "Postmortem",   action: "Runbook: how to inspect and replay DLQ." }
      ],
      keywords: ["poison message", "dead-letter queue", "DLQ", "delivery_count", "schema validation"]
    },

    { id: "sc-log-flood",
      title: "Log ingestion cost tripled overnight",
      difficulty: "Intermediate", expLevel: 4, topic: "Observability",
      context: "Ops raised: logging cost from CloudWatch went from $500/day to $1500/day. No traffic change.",
      symptom: "New logs at DEBUG level for a hot path.",
      steps: [
        { phase: "Detect",       action: "Cost report broken down by log group. One group dominates." },
        { phase: "Investigate",  action: "git log for recent logger changes. Someone set DEBUG in a hot path." },
        { phase: "Mitigate",     action: "Set that logger to INFO. Redeploy." },
        { phase: "Fix",          action: "Enforce log level per environment via env var, not source." },
        { phase: "Prevent",      action: "Sampling for very high-volume logs. Structured logs so heavy queries can filter." },
        { phase: "Monitor",      action: "Cost anomaly detection on log ingestion." },
        { phase: "Postmortem",   action: "Cost review as part of PR review for observability changes." }
      ],
      keywords: ["log level", "structured logs", "sampling", "cost anomaly", "cloudwatch"]
    },

    { id: "sc-timezone-bug",
      title: "Reports off by 5.5 hours for Indian users",
      difficulty: "Intermediate", expLevel: 4, topic: "Correctness",
      context: "Indian users report daily transaction summaries include the wrong day. Nightly job splits days incorrectly.",
      symptom: "Every user's Jan 1 summary is missing 5.5h of Dec 31 traffic.",
      steps: [
        { phase: "Detect",       action: "Compare raw event timestamps vs summary aggregates for a sample user." },
        { phase: "Investigate",  action: "Job aggregates by UTC date but bills by IST. Everything is naive datetime." },
        { phase: "Mitigate",     action: "Recompute the past 30 days of summaries in IST." },
        { phase: "Fix",          action: "Store all timestamps as UTC (aware). Compute per-user timezone at aggregation time." },
        { phase: "Prevent",      action: "Lint: forbid datetime.now() (naive). Only datetime.now(timezone.utc)." },
        { phase: "Monitor",      action: "Data quality dashboard: distribution of daily aggregates matches expected pattern." },
        { phase: "Postmortem",   action: "Add timezone-safety guide to onboarding." }
      ],
      keywords: ["timezone", "UTC", "IST", "aware datetime", "naive datetime", "aggregation"]
    },

    { id: "sc-slow-cold-start",
      title: "Lambda cold starts spiking to 8 seconds",
      difficulty: "Advanced", expLevel: 5, topic: "Cloud",
      context: "AWS Lambda handler cold start went from 300ms to 8s after adding TensorFlow.",
      symptom: "P99 spikes on new deployments and low-traffic periods. Users see timeouts.",
      steps: [
        { phase: "Detect",       action: "CloudWatch: Init Duration metric is high. Correlate with heavy imports." },
        { phase: "Investigate",  action: "Which imports are slow? python -X importtime shows heaviest." },
        { phase: "Mitigate",     action: "Enable Provisioned Concurrency during peak. Increase memory (more CPU too)." },
        { phase: "Fix",          action: "Move heavy imports inside handler if only sometimes needed. Or move ML to SageMaker/Runtime service, keep Lambda thin." },
        { phase: "Prevent",      action: "CI check on cold start init time. Threshold in project standards." },
        { phase: "Monitor",      action: "Alert on Init Duration > 2s p99." },
        { phase: "Postmortem",   action: "Architecture decision: what belongs in Lambda vs elsewhere." }
      ],
      keywords: ["cold start", "provisioned concurrency", "init duration", "importtime", "Lambda"]
    },

    { id: "sc-runaway-cost",
      title: "Postgres CPU 100% due to missing index",
      difficulty: "Advanced", expLevel: 5, topic: "Database",
      context: "A new feature runs a query 10k times/day. Turns out it does a full table scan on a 20M-row table.",
      symptom: "Postgres CPU 100%. Every query is slow, including unrelated ones.",
      steps: [
        { phase: "Detect",       action: "pg_stat_statements: top query by total time. See sequential scans on big table." },
        { phase: "Investigate",  action: "EXPLAIN ANALYZE the query. Find the sequential scan." },
        { phase: "Mitigate",     action: "Reject the offending endpoint temporarily. Increase read replicas." },
        { phase: "Fix",          action: "Add the right composite index. Rewrite query if it can't use the index." },
        { phase: "Prevent",      action: "Add pg_stat_statements to weekly review. EXPLAIN in code review for new queries." },
        { phase: "Monitor",      action: "Alert on sequential scans on tables > N rows." },
        { phase: "Postmortem",   action: "Publish schema change checklist for engineers." }
      ],
      keywords: ["EXPLAIN", "pg_stat_statements", "sequential scan", "composite index", "read replica"]
    }
  ];

  /* ---------- Deterministic Answer Evaluator (Spec #9) ----------
     Keyword-based, transparent, labeled as concept-match (NOT an LLM). */
  IV.evaluateAnswer = function (userText, expected) {
    // expected: array of keyword strings OR { keywords: [...], synonyms: {k: [alt,...]} }
    var keywords = Array.isArray(expected) ? expected : (expected && expected.keywords) || [];
    var synonyms = (expected && expected.synonyms) || {};
    if (!keywords.length) {
      return { supported: false, score: null, reason: "No expected keywords for this question — cannot auto-evaluate." };
    }
    function normalize(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9+#. ]/g, " ").replace(/\s+/g, " ").trim(); }
    var haystack = normalize(userText);
    var wordSet = new Set(haystack.split(" ").filter(Boolean));

    var matched = [], missing = [];
    keywords.forEach(function (kw) {
      var kwN = normalize(kw);
      var found = false;
      // 1) direct substring match
      if (haystack.indexOf(kwN) !== -1) found = true;
      // 2) any synonym?
      if (!found && synonyms[kw]) {
        for (var i = 0; i < synonyms[kw].length; i++) {
          if (haystack.indexOf(normalize(synonyms[kw][i])) !== -1) { found = true; break; }
        }
      }
      // 3) single-word token match (loose)
      if (!found && kwN.indexOf(" ") === -1 && wordSet.has(kwN)) found = true;
      if (found) matched.push(kw); else missing.push(kw);
    });

    var pct = Math.round((matched.length / keywords.length) * 100);
    var band = pct >= 85 ? "excellent" : pct >= 65 ? "strong" : pct >= 40 ? "partial" : "weak";
    var feedback =
      band === "excellent" ? "Excellent — you hit almost every concept the interviewer wants." :
      band === "strong"    ? "Strong answer — a couple of concepts are worth adding for a top score." :
      band === "partial"   ? "Partial — you're on the right track but missing key concepts. See below." :
                             "Weak — a full answer should mention the concepts listed below.";
    return {
      supported: true,
      score: pct,
      band: band,
      matched: matched,
      missing: missing,
      total: keywords.length,
      feedback: feedback,
      disclaimer: "This is a concept-keyword match, not a semantic AI evaluation. Use it as guidance, not a verdict."
    };
  };
})();
