export const NORMAL_DISTRIBUTION_STYLE = `
:root {
  --chapter-11: var(--path-d);
  --chapter-11-soft: #fff3ee;
}

.hero::before {
  width: 108px;
  background: linear-gradient(
    90deg,
    var(--chapter-3) 0 25%,
    var(--chapter-6) 25% 50%,
    var(--chapter-8) 50% 75%,
    var(--chapter-11) 75% 100%
  );
}

.quick-links {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.chapter-11-card {
  border-top-color: var(--chapter-11);
  background: var(--chapter-11-soft);
}

.chapter-header.chapter-11-card {
  border-top-color: var(--chapter-11);
  background: linear-gradient(90deg, var(--chapter-11-soft), #fff 62%);
}

@media (max-width: 720px) {
  .quick-links {
    grid-template-columns: 1fr;
  }
}
`;

const NORMAL_DISTRIBUTION_QUICK_LINK = `
<a class="quick-card chapter-11-card" href="#chapter-11">
<span class="chapter-number">Chapter 11</span>
<h3>The Normal Distribution</h3>
<p>Normal curves, the empirical rule, z-scores, outliers, distribution shape and comparative plots.</p>
</a>
`;

const NORMAL_DISTRIBUTION_SECTION = `
<section aria-labelledby="chapter-11-heading" class="section chapter-section" id="chapter-11">
<div class="chapter-header chapter-11-card">
<span class="chapter-number">Chapter 11</span>
<h2 id="chapter-11-heading">The Normal Distribution</h2>
<p>Recognise and interpret normal distributions, use the 68%-95%-99.7% empirical rule, calculate and compare z-scores, then revise the data-analysis skills that support the chapter.</p>
<div aria-label="Chapter 11 topics" class="topic-list">
<span class="topic-tag">The normal distribution</span>
<span class="topic-tag">The empirical rule</span>
<span class="topic-tag">z-scores</span>
<span class="topic-tag">Comparing z-scores</span>
<span class="topic-tag">Centre and spread</span>
<span class="topic-tag">Shape and outliers</span>
<span class="topic-tag">Comparing data displays</span>
</div>
</div>
<div class="resources-grid">
<article class="resource-group">
<h3>Normal curves and the empirical rule</h3>
<p>Use these to identify bell-shaped distributions and calculate proportions within one, two or three standard deviations of the mean.</p>
<a class="resource-link" href="https://mathspace.co/textbooks/syllabuses/Syllabus-786/topics/Topic-12842/subtopics/Subtopic-171745/" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Bell curves</span>
<span class="resource-detail">Properties of a normal distribution and the effect of the mean and standard deviation.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
<a class="resource-link" href="https://mathspace.co/textbooks/syllabuses/Syllabus-786/topics/Topic-12842/subtopics/Subtopic-171746/" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">The empirical rule</span>
<span class="resource-detail">Worked examples, a worksheet and practice using the 68%-95%-99.7% rule.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
</article>
<article class="resource-group">
<h3>z-scores and comparisons</h3>
<p>Use these to convert raw scores to z-scores and compare results from distributions with different means and standard deviations.</p>
<a class="resource-link" href="https://mathspace.co/textbooks/syllabuses/Syllabus-786/topics/Topic-12842/subtopics/Subtopic-171748/" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Introduction to z-scores</span>
<span class="resource-detail">Calculate and interpret a score's position relative to the mean.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
<a class="resource-link" href="https://mathspace.co/textbooks/syllabuses/Syllabus-786/topics/Topic-12842/subtopics/Subtopic-171749/" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Making comparisons between distributions</span>
<span class="resource-detail">Use z-scores as a common scale to compare performance across data sets.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
</article>
<article class="resource-group">
<h3>Normal distribution practice</h3>
<p>Use these for a broader sequence of videos, worked examples and self-marking questions.</p>
<a class="resource-link" href="https://classmathematics.com.au/resources/nsw/year-12/maths-standard-2/normal-distribution/" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Class Mathematics: Normal Distribution</span>
<span class="resource-detail">NSW Standard 2 practice on normal data, the empirical rule, z-scores and applications; some features require an account.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
<a class="resource-link" href="https://www.khanacademy.org/math/ap-statistics/density-curves-normal-distribution-ap/stats-normal-distributions" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Khan Academy: z-scores and normal distributions</span>
<span class="resource-detail">Free lessons and practice on z-scores, comparisons and the empirical rule.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
</article>
<article class="resource-group">
<h3>Data analysis revision</h3>
<p>Use these to revisit centre and spread, skewness, outliers, box plots and comparisons between data displays.</p>
<a class="resource-link" href="https://www.khanacademy.org/math/statistics-probability/data-display-statistics/box-and-whisker-plots-tutorial/a/box-and-whisker-plots" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Centre, spread, outliers and box plots</span>
<span class="resource-detail">Review the five-number summary, IQR, standard deviation and identifying outliers.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
<a class="resource-link" href="https://www.khanacademy.org/math/statistics-probability/displaying-describing-data/comparing-features-distributions/e/interpreting-and-comparing-data-distributions" rel="noopener noreferrer" target="_blank">
<span>
<span class="resource-name">Comparing data distributions</span>
<span class="resource-detail">Self-marking practice comparing shape, centre and spread across data displays.</span>
</span>
<span aria-hidden="true" class="link-arrow">↗</span>
</a>
</article>
</div>
</section>
`;

function replaceRequired(html, search, replacement) {
  if (!html.includes(search)) {
    throw new Error(`Revision page marker not found: ${search.slice(0, 80)}`);
  }

  return html.replace(search, replacement);
}

export function addNormalDistributionChapter(baseHtml) {
  let html = baseHtml;

  html = replaceRequired(
    html,
    "Revision Hub: Chapters 3, 6 and 8",
    "Revision Hub: Chapters 3, 6, 8 and 11",
  );

  html = replaceRequired(
    html,
    '<span class="pill">Chapter 8 · Sine and Cosine Rules</span>',
    '<span class="pill">Chapter 8 · Sine and Cosine Rules</span>\r\n<span class="pill">Chapter 11 &middot; The Normal Distribution</span>',
  );

  html = replaceRequired(
    html,
    '</div>\r\n</nav>\r\n<section aria-labelledby="school-heading"',
    `${NORMAL_DISTRIBUTION_QUICK_LINK}</div>\r\n</nav>\r\n<section aria-labelledby="school-heading"`,
  );

  html = replaceRequired(
    html,
    '<section aria-labelledby="exam-heading"',
    `${NORMAL_DISTRIBUTION_SECTION}<section aria-labelledby="exam-heading"`,
  );

  html = html.replaceAll("Chapters 3, 6 and 8", "Chapters 3, 6, 8 and 11");
  html = html.replaceAll("checked on 1 July 2026", "checked on 27 July 2026");

  return html;
}
