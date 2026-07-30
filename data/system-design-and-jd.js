/* ============================================================
   Digital Python Notes — System Design tracks + JD Analyzer
   (Spec sections #19, #20)
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";
  var IV = window.DP_INTERVIEW;
  if (!IV) { console.warn("DP_INTERVIEW missing"); return; }

  /* ---------- System Design tracks by experience (Spec #19) ---------- */
  IV.systemDesignTracks = [
    { id: "sd-beg", band: "Beginner", expLevel: 2, icon: "🌱",
      title: "Foundations — Basic Application Architecture",
      audience: "0-2 years. First time thinking about how a real app is laid out.",
      focus: "One service, one DB. Understand tiers and where each piece runs.",
      questions: [
        { q: "Design a URL shortener (bit.ly)",
          hints: ["POST /shorten with target URL", "Store in DB with short code", "Redirect on GET /:code", "How to generate short codes: base62 encoding of an incrementing ID"],
          keywords: ["hash", "base62", "counter", "redirect 301", "DB primary key"] },
        { q: "Design a to-do list app with login",
          hints: ["User table + Task table with user_id foreign key", "Session cookie or JWT", "REST endpoints for CRUD"],
          keywords: ["foreign key", "session", "JWT", "REST", "CRUD"] },
        { q: "Design a book library management system",
          hints: ["Book, User, Loan tables", "Business rule: can't borrow if 3 open loans", "Track due dates"],
          keywords: ["schema", "constraint", "date", "many-to-many"] },
        { q: "Design a simple blog with comments",
          hints: ["Post + Comment tables", "Rendering: server-side templates OR API + SPA", "Pagination"],
          keywords: ["template", "SPA", "pagination", "REST"] },
        { q: "Design a movie rating website",
          hints: ["Movie, User, Rating tables", "Aggregate: AVG(rating) per movie", "Cache aggregate for hot movies"],
          keywords: ["aggregate", "cache", "index"] },
        { q: "Design a weather-alert email service",
          hints: ["Cron pulls weather API", "Compares vs user thresholds", "SMTP or SES sends email"],
          keywords: ["cron", "SMTP", "webhook", "threshold"] }
      ]
    },

    { id: "sd-mid", band: "Mid-level", expLevel: 4, icon: "🚀",
      title: "Service architecture — 3-5 years",
      audience: "3-5 years. Now designing multi-component services.",
      focus: "Service boundaries, cache, queue, background jobs, health.",
      questions: [
        { q: "Design a rate limiter",
          hints: ["Fixed window vs sliding window vs token bucket", "Store counters in Redis with TTL", "Per-IP or per-user or per-API-key", "Return 429 with Retry-After header"],
          keywords: ["token bucket", "sliding window", "Redis", "TTL", "429", "Retry-After"] },
        { q: "Design a caching layer for a REST API",
          hints: ["Cache key = endpoint + query params + user context", "TTL by resource type", "Invalidation on write", "Cache-Aside pattern"],
          keywords: ["cache-aside", "TTL", "invalidation", "stampede"] },
        { q: "Design a chat message API (WhatsApp-like, small scale)",
          hints: ["Message table with conversation_id, sender, content, ts", "Long-polling or WebSocket for real-time", "Read receipts", "Delivery vs read status"],
          keywords: ["WebSocket", "long-poll", "delivery status", "conversation"] },
        { q: "Design a background email-sending service",
          hints: ["Queue (Celery/RQ)", "Retry with exponential backoff", "Idempotency key", "Dead-letter queue for stuck jobs"],
          keywords: ["celery", "queue", "retry", "backoff", "DLQ", "idempotency"] },
        { q: "Design an image upload + resize pipeline",
          hints: ["Upload to S3", "SQS notification → worker resizes", "Store variants (thumb/medium/large)", "Serve via CDN"],
          keywords: ["S3", "SQS", "worker", "CDN", "variants"] },
        { q: "Design a leaderboard for an online game",
          hints: ["Redis sorted set (ZADD/ZRANGE)", "Score updates in O(log N)", "Top-K queries in O(log N + K)", "Persist snapshots to DB"],
          keywords: ["Redis ZSET", "O(log N)", "leaderboard", "snapshot"] },
        { q: "Design a URL health-check service",
          hints: ["Scheduler picks up sites to check", "Workers make HTTP requests", "Store history + latency", "Alert on 3 consecutive failures"],
          keywords: ["scheduler", "worker pool", "alert", "history"] },
        { q: "Design a coupon system for e-commerce",
          hints: ["Coupon table with rules (percent/fixed, expiry, per-user cap)", "Apply at checkout — validate all rules", "Track usage in a separate table for auditability"],
          keywords: ["rule engine", "audit", "per-user cap", "expiry"] }
      ]
    },

    { id: "sd-sen", band: "Senior", expLevel: 5, icon: "🏗️",
      title: "Scalable systems — 5-7 years",
      audience: "5-7 years. Design for 10k+ RPS, 10M+ users.",
      focus: "Sharding, replication, CDN, capacity planning, SLOs.",
      questions: [
        { q: "Design Twitter's home timeline",
          hints: ["Fan-out on write vs fan-out on read", "Celebrity problem (hybrid)", "Push to Redis lists per user", "Merge with pulled sources at read time"],
          keywords: ["fan-out on write", "fan-out on read", "celebrity", "Redis lists", "hybrid"] },
        { q: "Design a URL shortener at 100k QPS",
          hints: ["Distributed ID generator (Snowflake)", "Sharded key-value store", "Read cache with high hit ratio", "Anycast for global latency"],
          keywords: ["Snowflake", "sharding", "cache hit ratio", "anycast"] },
        { q: "Design a global search autocomplete (Google-style)",
          hints: ["Trie in memory per shard", "Top-K per prefix pre-computed", "Refresh async from search logs", "CDN edge cache for common prefixes"],
          keywords: ["trie", "top-K", "shard", "CDN", "prefix"] },
        { q: "Design a notification service (push, email, SMS)",
          hints: ["Ingest via HTTPS or Kafka", "User preferences per channel", "Fan-out to per-channel workers", "Retry with backoff, DLQ", "Circuit breaker on provider outage"],
          keywords: ["kafka", "fan-out", "circuit breaker", "DLQ", "preferences"] },
        { q: "Design an S3-like object store (single region)",
          hints: ["Metadata service (SQL) + object storage (blob)", "Erasure coding for durability", "Multi-part upload", "Read-through cache for hot objects"],
          keywords: ["erasure coding", "multipart", "metadata service", "hot objects"] },
        { q: "Design Uber-like driver-rider matching",
          hints: ["Driver locations in geospatial index (H3, S2, or Redis GEO)", "Match by radius + rating", "Dispatch service assigns", "Handle race: two riders one driver"],
          keywords: ["geospatial index", "H3", "S2", "dispatch", "race"] },
        { q: "Design Netflix video streaming",
          hints: ["Encode once, deliver many bitrates (HLS/DASH)", "Origin + regional caches + edge caches", "Adaptive bitrate", "Precache popular content on launch day"],
          keywords: ["HLS", "DASH", "adaptive bitrate", "CDN tiers", "precache"] },
        { q: "Design a distributed rate limiter (100 servers, one budget)",
          hints: ["Local counters + periodic sync to Redis", "OR Redis Lua script for atomic decrement", "Trade: accuracy vs latency"],
          keywords: ["Redis Lua", "local counter", "atomic", "accuracy vs latency"] }
      ]
    },

    { id: "sd-staff", band: "Staff / Lead", expLevel: 6, icon: "🧭",
      title: "Distributed systems — 7-10 years",
      audience: "7-10 years. Multi-service, cross-team, real trade-offs.",
      focus: "Consistency models, consensus, availability, cost-per-req.",
      questions: [
        { q: "Design a global distributed queue",
          hints: ["At-least-once vs exactly-once", "Partitioning", "Consumer groups", "Ordering per partition", "Kafka-style vs SQS-style"],
          keywords: ["at-least-once", "exactly-once", "partition", "consumer group", "ordering"] },
        { q: "Design a payment processing system",
          hints: ["Idempotency keys everywhere", "Saga pattern for multi-step", "Immutable event log", "Reconciliation vs upstream", "Fraud checks in-flight"],
          keywords: ["idempotency", "saga", "event sourcing", "reconciliation", "fraud"] },
        { q: "Design a distributed ID generator (Snowflake)",
          hints: ["64 bits: timestamp + machine + sequence", "Clock skew handling", "Sequence overflow", "Machine ID assignment via ZK or Consul"],
          keywords: ["snowflake", "clock skew", "sequence", "machine id", "zookeeper"] },
        { q: "Design a metrics ingestion pipeline (100M/sec)",
          hints: ["Kafka for ingest", "Stream aggregation (Flink/Kinesis)", "Time-series DB (Prometheus/InfluxDB)", "Downsample old data"],
          keywords: ["kafka", "flink", "time series", "downsample", "aggregation"] },
        { q: "Design a multi-region write-heavy system",
          hints: ["CRDT for conflict-free replication", "Or single-writer per key (Cosmos/DynamoDB)", "Latency vs consistency trade-off", "Conflict resolution strategy"],
          keywords: ["CRDT", "single-writer", "vector clock", "conflict resolution"] },
        { q: "Design a feature flag service at scale",
          hints: ["Config service + SDK", "Push updates via SSE/gRPC", "Percent rollouts", "Server-side + client-side evaluation", "Fail-open on outage"],
          keywords: ["feature flag", "SSE", "percent rollout", "fail-open"] }
      ]
    },

    { id: "sd-arch", band: "Architect / Principal", expLevel: 7, icon: "🏛️",
      title: "Architecture & trade-offs — 10+ years",
      audience: "10+ years. Org-wide decisions, not just single systems.",
      focus: "Migrations, cost, org structure, compliance, disaster recovery.",
      questions: [
        { q: "Migrate a monolith to microservices — plan the 24-month journey",
          hints: ["Strangler fig pattern", "Which service first (highest value + lowest risk)", "Team org (Conway)", "Data ownership per service", "Deprecation timeline"],
          keywords: ["strangler fig", "Conway", "data ownership", "deprecation"] },
        { q: "Design for regulatory compliance (GDPR + PCI-DSS)",
          hints: ["Data classification", "Data residency", "Right to be forgotten", "Audit trail immutable", "Encryption at rest + in transit + key rotation"],
          keywords: ["GDPR", "PCI-DSS", "residency", "right to be forgotten", "audit"] },
        { q: "Design a disaster recovery strategy — RTO 15 min, RPO 5 min",
          hints: ["Multi-region hot standby", "Async DB replication", "DNS failover", "Runbook + regular DR drills", "What breaks during failover"],
          keywords: ["RTO", "RPO", "hot standby", "DR drill", "failover"] },
        { q: "Reduce cloud bill by 40% without dropping SLAs",
          hints: ["Right-size instances", "Spot / Reserved / Savings Plans", "Data-tier changes (hot/warm/cold)", "Egress reduction", "Kill zombie resources"],
          keywords: ["right-size", "spot", "cold tier", "egress", "zombie"] },
        { q: "Design an internal developer platform (IDP)",
          hints: ["Golden paths per language/stack", "Self-service infra", "Observability out of the box", "Security policies enforced automatically", "Developer experience metrics"],
          keywords: ["golden path", "self-service", "policy", "DevEx"] },
        { q: "Choose CQRS + Event Sourcing vs traditional CRUD — when and why",
          hints: ["When: audit-heavy, high-write, temporal queries", "When NOT: simple CRUD apps, tight timelines", "Complexity cost", "Team readiness"],
          keywords: ["CQRS", "event sourcing", "audit", "temporal", "complexity cost"] }
      ]
    }
  ];

  /* ---------- JD Analyzer (Spec #20) ---------- */
  /* Simple, transparent keyword extraction — clearly not an LLM. */
  IV.jdKeywords = {
    frameworks: {
      "fastapi":       { role: "fastapi",   weight: 3, level: "APIs" },
      "django":        { role: "django",    weight: 3, level: "APIs" },
      "flask":         { role: "backend",   weight: 2, level: "APIs" },
      "starlette":     { role: "fastapi",   weight: 2, level: "APIs" },
      "drf":           { role: "django",    weight: 2, level: "APIs" }
    },
    databases: {
      "postgresql":    { role: "backend",   weight: 3, level: "Database" },
      "postgres":      { role: "backend",   weight: 3, level: "Database" },
      "mysql":         { role: "backend",   weight: 2, level: "Database" },
      "mongodb":       { role: "backend",   weight: 2, level: "Database" },
      "redis":         { role: "backend",   weight: 2, level: "Database" },
      "sqlalchemy":    { role: "backend",   weight: 2, level: "Database" },
      "orm":           { role: "backend",   weight: 1, level: "Database" },
      "elasticsearch": { role: "backend",   weight: 2, level: "Database" }
    },
    cloud: {
      "aws":           { role: "cloud",     weight: 3, level: "Cloud" },
      "lambda":        { role: "cloud",     weight: 2, level: "Cloud" },
      "s3":            { role: "cloud",     weight: 1, level: "Cloud" },
      "ec2":           { role: "cloud",     weight: 1, level: "Cloud" },
      "gcp":           { role: "cloud",     weight: 3, level: "Cloud" },
      "azure":         { role: "cloud",     weight: 3, level: "Cloud" },
      "kubernetes":    { role: "devops",    weight: 3, level: "DevOps" },
      "k8s":           { role: "devops",    weight: 3, level: "DevOps" },
      "docker":        { role: "devops",    weight: 2, level: "DevOps" },
      "terraform":     { role: "devops",    weight: 2, level: "DevOps" }
    },
    ci_cd: {
      "ci/cd":         { role: "devops",    weight: 2, level: "DevOps" },
      "jenkins":       { role: "devops",    weight: 2, level: "DevOps" },
      "github actions":{ role: "devops",    weight: 2, level: "DevOps" },
      "gitlab ci":     { role: "devops",    weight: 2, level: "DevOps" }
    },
    data: {
      "pandas":        { role: "analyst",   weight: 3, level: "Libraries" },
      "numpy":         { role: "scientist", weight: 2, level: "Libraries" },
      "spark":         { role: "dataeng",   weight: 3, level: "Data Engineering" },
      "pyspark":       { role: "dataeng",   weight: 3, level: "Data Engineering" },
      "airflow":       { role: "dataeng",   weight: 3, level: "Data Engineering" },
      "kafka":         { role: "dataeng",   weight: 2, level: "Data Engineering" },
      "etl":           { role: "dataeng",   weight: 2, level: "Data Engineering" },
      "dbt":           { role: "dataeng",   weight: 2, level: "Data Engineering" },
      "snowflake":     { role: "dataeng",   weight: 2, level: "Data Engineering" },
      "sql":           { role: "analyst",   weight: 1, level: "Database" }
    },
    ml: {
      "scikit-learn":  { role: "scientist", weight: 3, level: "AI/ML" },
      "sklearn":       { role: "scientist", weight: 3, level: "AI/ML" },
      "tensorflow":    { role: "aiml",      weight: 3, level: "AI/ML" },
      "pytorch":       { role: "aiml",      weight: 3, level: "AI/ML" },
      "machine learning":{ role: "aiml",    weight: 2, level: "AI/ML" },
      "deep learning": { role: "aiml",      weight: 3, level: "AI/ML" },
      "mlops":         { role: "aiml",      weight: 3, level: "AI/ML" }
    },
    genai: {
      "llm":           { role: "genai",     weight: 3, level: "LLM & AI Specialty" },
      "openai":        { role: "genai",     weight: 2, level: "LLM & AI Specialty" },
      "langchain":     { role: "genai",     weight: 3, level: "LLM & AI Specialty" },
      "rag":           { role: "genai",     weight: 3, level: "LLM & AI Specialty" },
      "embedding":     { role: "genai",     weight: 2, level: "LLM & AI Specialty" },
      "vector database":{ role: "genai",    weight: 3, level: "LLM & AI Specialty" },
      "pinecone":      { role: "genai",     weight: 2, level: "LLM & AI Specialty" },
      "chromadb":      { role: "genai",     weight: 2, level: "LLM & AI Specialty" },
      "bedrock":       { role: "genai",     weight: 2, level: "LLM & AI Specialty" }
    },
    concurrency: {
      "asyncio":       { role: "fastapi",   weight: 2, level: "Concurrency" },
      "async":         { role: "fastapi",   weight: 1, level: "Concurrency" },
      "celery":        { role: "backend",   weight: 2, level: "Advanced Python" },
      "multithreading":{ role: "backend",   weight: 1, level: "Concurrency" },
      "multiprocessing":{ role: "backend",  weight: 1, level: "Concurrency" }
    },
    system_design: {
      "microservices": { role: "architect", weight: 3, level: "System Design" },
      "scalable":      { role: "lead",      weight: 2, level: "System Design" },
      "distributed":   { role: "lead",      weight: 3, level: "System Design" },
      "high availability":{ role: "lead",   weight: 2, level: "System Design" },
      "system design": { role: "lead",      weight: 3, level: "System Design" }
    },
    testing: {
      "pytest":        { role: "developer", weight: 1, level: "Testing" },
      "unit test":     { role: "developer", weight: 1, level: "Testing" },
      "tdd":           { role: "developer", weight: 1, level: "Testing" }
    },
    misc: {
      "rest api":      { role: "backend",   weight: 1, level: "APIs" },
      "graphql":       { role: "backend",   weight: 2, level: "APIs" },
      "grpc":          { role: "backend",   weight: 2, level: "APIs" },
      "websocket":     { role: "backend",   weight: 1, level: "APIs" },
      "oauth":         { role: "backend",   weight: 1, level: "Security" },
      "jwt":           { role: "backend",   weight: 1, level: "Security" },
      "linux":         { role: "devops",    weight: 1, level: "DevOps" }
    }
  };
  // Flatten for scanning
  var _flat = {};
  Object.keys(IV.jdKeywords).forEach(function (cat) {
    Object.keys(IV.jdKeywords[cat]).forEach(function (k) {
      _flat[k] = Object.assign({ category: cat, keyword: k }, IV.jdKeywords[cat][k]);
    });
  });

  IV.analyzeJD = function (text) {
    if (!text || typeof text !== "string") return null;
    var lower = " " + text.toLowerCase().replace(/[^a-z0-9+#/\s.-]/g, " ").replace(/\s+/g, " ") + " ";
    var matched = [];
    var roleScores = {};
    var topicScores = {};
    var categorized = {};
    Object.keys(_flat).forEach(function (kw) {
      // Whole-word or bounded match
      var pattern = new RegExp("(^|[^a-z0-9])" + kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z0-9]|$)", "g");
      var m = lower.match(pattern);
      if (m && m.length) {
        var info = _flat[kw];
        var count = m.length;
        matched.push({ keyword: kw, count: count, role: info.role, level: info.level, category: info.category });
        var pts = count * info.weight;
        roleScores[info.role] = (roleScores[info.role] || 0) + pts;
        topicScores[info.level] = (topicScores[info.level] || 0) + pts;
        categorized[info.category] = categorized[info.category] || [];
        categorized[info.category].push({ keyword: kw, count: count });
      }
    });
    // Determine top role
    var recommendedRole = null, maxScore = 0;
    Object.keys(roleScores).forEach(function (r) { if (roleScores[r] > maxScore) { maxScore = roleScores[r]; recommendedRole = r; } });
    // Determine top 5 topics
    var topTopics = Object.keys(topicScores).sort(function (a, b) { return topicScores[b] - topicScores[a]; }).slice(0, 6);

    // Recommended questions from those top topics
    var recQs = [];
    if (topTopics.length) {
      topTopics.forEach(function (topic) {
        var poolSize = 4;
        var pool = IV.questions.map(function (q, i) { return { q: q, index: i }; })
                               .filter(function (x) { return x.q.level === topic; });
        var freqW = { extreme: 4, very: 3, often: 2, common: 1, rare: 0 };
        pool.sort(function (a, b) { return (freqW[b.q.frequency] || 0) - (freqW[a.q.frequency] || 0); });
        recQs = recQs.concat(pool.slice(0, poolSize));
      });
    }

    return {
      matched: matched.sort(function (a, b) { return b.count - a.count; }),
      totalKeywords: matched.length,
      roleScores: roleScores,
      topicScores: topicScores,
      recommendedRole: recommendedRole,
      topTopics: topTopics,
      categorized: categorized,
      recommendedQuestions: recQs,
      disclaimer: "Static keyword scan — not an AI. Best-fit role is computed from keyword weights."
    };
  };
})();
