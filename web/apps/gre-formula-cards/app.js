/* Quant Formula Cards: the formulas and facts the GRE expects you to know without being given. */
(function () {
  'use strict';
  const items = (cards, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, cards, n).map((c) => {
      const others = SK.shuffle(r, cards.filter((x) => x.id !== c.id && x.back !== c.back));
      const same = others.filter((x) => x.tag === c.tag).concat(others.filter((x) => x.tag !== c.tag));
      return SK.shuffleItem(r, { id: 'fq-' + c.id, type: 'single', topic: c.tag, stem: c.front + ':', choices: [c.back].concat(same.slice(0, 3).map((x) => x.back)), answer: 0, explanation: c.back + (c.extra ? '. ' + c.extra : '') });
    });
  };
  const App = {
    about: 'The GRE gives no formula sheet. These 52 cards cover the formulas and facts you need: percents, interest, averages, divisibility, exponents, quadratics, triangles, circles, solids, coordinates, statistics, counting and probability. Each has a short example.',
    how: ['Learn with **Cards** a few minutes a day.', 'Test recall with **Quiz**: choose the right formula for each idea.', 'Filter by topic to focus on a weak area.'],
    tabs: [
      SK.cardsTab('cards', 'Cards', (ctx) => ctx.data.formulas, { newPerDay: 10 }),
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'Formula quiz', topics: SK.topicsOf(ctx.data.formulas.map((x) => ({ topic: x.tag }))), sizes: [10, 20, 52], make: (t, n, s) => items(ctx.data.formulas.filter((x) => t === 'All' || x.tag === t), n, s), seconds: (n) => n * 25 }); } },
    ],
    checks: { 'every card is complete and quizzes have four different formulas': (data, assert) => {
      for (const c of data.formulas) assert.ok(c.front && c.back && c.tag, c.id);
      for (let s = 1; s < 20; s++) for (const it of items(data.formulas, 20, s)) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
