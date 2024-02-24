'use strict';

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

// Selecting DOM Elements
const btnOpen = document.querySelector('.btn-open');
const factForm = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

// Create DOM elements: Render facts in list
factsList.innerHTML = '';

const createFactsList = function (dataArray) {
  const htmlArr = dataArray.map(
    fact => `
      <li class="fact">
        <p>
          ${fact.text}
          <a
            class="source"
            href=${fact.source}
            target="_blank"
            >(Source)</a
          >
        </p>
        <span class="tag" style="background-color: ${
          CATEGORIES.find(cat => cat.name === fact.category).color
        }"
          >${fact.category}</span
        >
        <div class="vote-buttons">
          <button>👍 ${fact.votesInteresting}</button>
          <button>🤯 ${fact.votesMindblowing}</button>
          <button>⛔️ ${fact.votesFalse}</button>
        </div>
      </li>
    `
  );
  const html = htmlArr.join('');
  factsList.insertAdjacentHTML('afterbegin', html);
};
// createFactsList(initialFacts);

// Load data from SUPABASE
const loadFacts = async function () {
  const response = await fetch(
    'https://cainhhxbrxmzynglcaut.supabase.co/rest/v1/facts',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhaW5oaHhicnhtenluZ2xjYXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2MjU1NzMsImV4cCI6MjAwMTIwMTU3M30.XH_2GMi2dTvJAGU0mErIOO90rlrw8yX_pkCnRO9j480',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhaW5oaHhicnhtenluZ2xjYXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2MjU1NzMsImV4cCI6MjAwMTIwMTU3M30.XH_2GMi2dTvJAGU0mErIOO90rlrw8yX_pkCnRO9j480',
      },
    }
  );
  const data = await response.json();
  // console.log(response);
  // console.log(data);
  createFactsList(data);
};
loadFacts();

//  Toggle form visibility
btnOpen.addEventListener('click', function () {
  if (factForm.classList.contains('hidden')) {
    factForm.classList.remove('hidden');
    btnOpen.textContent = 'Close';
  } else {
    factForm.classList.add('hidden');
    btnOpen.textContent = 'Share a fact';
  }
});

// console.dir(btnOpen);
